# Git History Slimming — next-setup and nest-setup

`Done` · 2026-11-05 · fresh clone of next-setup 691 KB (was 19 MB `.git`), nest-setup 335 KB · commit IDs below predate the rewrite · backups in `Downloads/git-backups/`

## 1. Thesis / Problem Framing

next-setup's history is 74% dead weight: 20 login PNGs that lived for one day in July still ship with every clone. nest-setup is not bloated in size — only in a handful of one-word commit messages.

| Layer           | Question it answers                                   | Primary artifact                                   |
| --------------- | ----------------------------------------------------- | -------------------------------------------------- |
| Reachable blobs | What does every clone download?                       | `git rev-list --objects --all` + `git cat-file`    |
| Local store     | What sits in `.git` that no clone needs?              | `git count-objects -vH`, `git fsck --unreachable`  |
| Commit log      | Which commits carry no meaning?                       | `git log --format=%s`                              |
| Remote          | What GitHub serves after a rewrite                    | `origin/master`, `origin/development`, PR refs     |

**Measured state**

| Repo       | `.git` size | Commits (all refs) | Merges (PR / branch-sync) | Reachable blob bytes | Largest blob                         | Noise messages | Unreachable objects | Stashes |
| ---------- | ----------- | ------------------ | ------------------------- | -------------------- | ------------------------------------ | -------------- | ------------------- | ------- |
| next-setup | 19 MB       | 114                | 18 (11 / 5)               | 17.86 MB             | `public/images/login/frame.png` 3.6 MB | 2              | 100                 | 1       |
| nest-setup | 1.6 MB      | 57                 | 7 (6 / 1)                 | well under 1 MB      | `pnpm-lock.yaml` 272 KB              | 5              | 28                  | 0       |

In next-setup, 13.25 MB of the 17.86 MB sits in 22 blobs under `public/`, 20 of them login PNGs. Commit `3adae0e` ("Initial commit", 2026-07-05) added them; `2a0e0f0` ("m", same day) deleted them. Both `origin/master` and `origin/development` reach them. Locally, 867 loose objects (14.7 MB) were never packed.

No secrets in either history: no `.env`, key or `.pem` file was ever committed, and the only database URLs are the `postgres:…@localhost` placeholders in nest-setup's `.env.example` and a test.

## 2. The Canonical Atom — `HistoryFinding`

```ts
type FindingKind = "blob" | "message" | "local-object" | "ref";

interface HistoryFinding {
    repo: "next-setup" | "nest-setup";
    kind: FindingKind;
    target: string;
    value: "strip" | "rename" | "prune" | "keep";
    status: "proposed" | "applied" | "verified";
    evidence: string;
    confidence: "high" | "medium";
}
```

Invariants:

1. **Tips never change content.** After any rewrite, `git diff <old-tip> <new-tip>` is empty for every branch. Only history changes, never the code at the tip.
2. **A blob is stripped only if no branch tip contains its path.**
3. **No rewrite runs without a verified bundle backup** of every ref, stored outside the repo.
4. **Authors, dates and commit order survive.** Only the stripped paths, the renamed messages, and the commit IDs that follow from them change.
5. A `rename` carries its new message in this plan before it is applied.

**Ledger**

| Repo       | Kind         | Target                                                    | Value    | Evidence                                                         |
| ---------- | ------------ | --------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| next-setup | blob         | `public/images/` (20 PNGs, 13.25 MB)                      | `strip`  | Added `3adae0e`, deleted `2a0e0f0`; absent from both branch tips |
| next-setup | message      | `2a0e0f0` "m"                                             | `prune`  | Only deletes the images, so it is empty once they are stripped   |
| next-setup | message      | `7eea1ad` "m"                                             | `rename` | → `docs(claude): lead with the rules and drop the helper lists`  |
| next-setup | local-object | 867 loose objects, 50 unreachable commits, 164 reflog entries | `prune` | `git count-objects`, `git fsck --unreachable`               |
| next-setup | ref          | `stash@{0}` "latest" (2026-08-15, `.claude/CLAUDE.md` only) | D3     | Predates every current CLAUDE.md rewrite                          |
| nest-setup | message      | `ceccfa2` "m"                                             | D4       | → `docs(claude): drop the session prefix and the fixed folder tree` |
| nest-setup | message      | `56f2c39` "m"                                             | D4       | → `docs(claude): drop the copy-the-admin-module instruction`      |
| nest-setup | message      | `744ee35` "rem"                                           | D4       | → `refactor(common): remove the RequestWithUser interface`        |
| nest-setup | message      | `3b18d50` "m"                                             | D4       | → `feat(stats): add time filters, stats service and metric builder` |
| nest-setup | message      | `ed6d29f` "m"                                             | D4       | → `chore(prisma): stray edit to PrismaModule that dropped a comma` |
| nest-setup | local-object | 28 unreachable objects, 2 packs                           | `prune`  | `git fsck --unreachable`, `git count-objects`                     |
| both       | merge        | 6 "Merge branch 'development' of …" syncs                 | `keep`   | Removing them needs a rebase across PR merges; see §8             |

## 3. Atomic UI Hierarchy

No UI changes. The surfaces that show history:

| Component                        | Role                       | Reads after the rewrite                                                                           |
| -------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| GitHub branch and commit pages   | Browse history             | New commit IDs                                                                                     |
| GitHub PR pages (#1–#11 / #1–#7) | Review record              | The old commits. GitHub keeps `refs/pull/*`, so they still resolve there, but branch clones never fetch them |
| Local clones and agent sessions  | Day-to-day work            | Diverged history until reset to the new remote                                                     |

## 4. Pipeline Architecture

```
freeze ──► bundle backup ──► fresh scratch clone ──► git filter-repo ──► verify ──► force-push ──► re-sync clones ──► gc
 stop       --all refs,       git clone --no-local     strip paths,       tips equal,   --force-with-lease  reset --hard     local
 sessions   outside repo      (filter-repo needs one)  rename messages,   no image      master + development origin/…        repos
                                                       prune empty        objects left
```

**Deterministic spine:** backup, filtering, tree-equality check, size measurement and the lease-guarded push. Each step either passes its check or stops the run.

**Judgement skin:** the new commit messages (§2 ledger, D4) and whether nest-setup is rewritten at all. You sign off on these before Phase 2.

**Why `git filter-repo`:** it rewrites the commit IDs quoted inside other commit messages (2 next-setup commits quote IDs), prunes commits left empty, and leaves no `refs/original/` debris. It is not installed. `pip install --user git-filter-repo` works on this machine (Python 3.14.5), and that install is D1. The built-in `git filter-branch` is the fallback; it leaves the quoted IDs stale.

## 5. Minimal Additive Data Model

| Layer                          | Change                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------- |
| next-setup history             | `public/images/` gone from every commit; `2a0e0f0` pruned; `7eea1ad` renamed |
| next-setup commit IDs          | Every commit gets a new ID (the root commit changes)                         |
| nest-setup history (only if D4) | 5 messages renamed; IDs from `56f2c39` onward change                        |
| Local `.git` stores            | Reflogs expired, unreachable objects pruned, everything packed               |
| GitHub branches                | `master` and `development` force-pushed in each rewritten repo               |

**Does not change:** the files at either branch tip, authors, dates, branch names, the `contract:check` link between the repos (`openapi.json` is untouched), tags (there are none), or nest-setup's history if D4 is no.

## 6. Security & Limits

| Area          | Rule                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| Backups       | `git bundle create C:/Users/ADMIN/Downloads/git-backups/<repo>-2026-11-05.bundle --all`, then `git bundle verify`, before anything else |
| Concurrency   | No other Claude session or editor commits to the repo between freeze and re-sync                              |
| Push          | `--force-with-lease` per branch, so a push that raced in is never overwritten                                 |
| Protection    | If GitHub branch protection blocks force pushes on `master`, you lift it for the push; I do not change settings |
| Tooling       | `git-filter-repo` installs only with your approval (D1)                                                       |
| Scope         | Paths stripped: `public/images/` only. Nothing still present at a branch tip is ever stripped                 |
| Irreversible  | `gc --prune=now` and reflog expiry run only after the bundle verifies                                         |
| Checks        | No lint, type-check, test or build: tip trees are byte-identical, which the diff proves                       |

## 7. Vertical-Slice Build Order

**Phase 0 — Preconditions.** Settle the uncommitted deletions in next-setup (`app/api/register`, `app/api/session`, `.vscode/settings.json`, D2). Pull both repos, stop the other sessions, and write and verify the bundles.
Exit Criteria: clean trees; local `master` and `development` equal their `origin` counterparts; `git bundle verify` passes for both repos.

**Phase 1 — Local housekeeping, no rewrite.** Resolve the stash (D3), then `git reflog expire --expire=now --all`, `git gc --prune=now --aggressive` in both repos.
Exit Criteria: `git fsck --unreachable` prints nothing; `count-objects` shows 0 loose objects. next-setup is still around 14 MB here, because the PNGs are reachable and do not compress.

**Phase 2 — Rewrite next-setup in a scratch clone.** `git clone --no-local` into a temp folder, then one `git filter-repo` pass: `--invert-paths --path public/images/` plus a commit callback renaming `7eea1ad`.
Exit Criteria: `git diff` between old and new tips is empty for both branches; `git rev-list --objects --all | grep public/images` is empty; `2a0e0f0` is gone; commit count per branch drops by exactly one.

**Phase 3 — nest-setup rename (only if D4).** Same scratch-clone pass with the five renames and no path stripping.
Exit Criteria: tips equal; the five messages match the ledger; commit count unchanged.

**Phase 4 — Publish (needs D5).** Re-add `origin` in each scratch clone, then `git push --force-with-lease origin master development`.
Exit Criteria: GitHub shows the new tip IDs; a fresh `git clone` of next-setup measures under 2 MB of `.git`.

**Phase 5 — Re-sync.** In the working repos: `git fetch origin`, `git reset --hard origin/development`, align `master`, then `gc` again. Restart the other sessions.
Exit Criteria: `git status -sb` shows each branch even with `origin`; `.git` of next-setup under 2 MB.

## 8. Differentiator Matrix

| Idea                                                            | Impact                                                    | Effort | Notes                                                                 |
| --------------------------------------------------------------- | --------------------------------------------------------- | ------ | --------------------------------------------------------------------- |
| CI guard that fails on any committed file over 1 MB             | Stops the next 13 MB mistake at the PR                    | S      | One step in `.github/workflows/ci.yml`; hooks stay disabled           |
| Remove the 6 branch-sync merges                                 | Linear-looking history                                    | L      | Needs a rebase through 11 PR merges; conflict-prone for little gain   |
| Collapse each starter to one "initial" commit                   | Smallest possible repo; template-style                    | S      | Loses every commit message, PR link and blame line                    |
| Git LFS for future binary assets                                | Binaries never enter history again                        | M      | Adds an LFS setup step to every clone                                 |

**Top 2:** the CI size guard (cheap, and it prevents the problem rather than cleaning it up again) and keeping the merges, i.e. not doing the rebase. The size win is entirely in the PNGs.

## 9. Risks & Mitigations Register

| Risk                                                                                      | Mitigation                                                                                     |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| R1 — another session commits during the rewrite, and its work is lost or pushed onto the old history | Phase 0 freeze; `--force-with-lease` rejects a push that raced in                    |
| R2 — a bad filter removes something still in use                                          | Invariant 1: tip trees must be byte-identical before any push                                   |
| R3 — branch protection blocks the force push                                              | You lift it for Phase 4, or the run stops before publishing                                     |
| R4 — other clones keep the old history and later merge it back in, re-adding the PNGs     | Phase 5 resets every known clone; anyone else re-clones                                         |
| R5 — commit IDs quoted in messages or docs go stale                                       | filter-repo rewrites the 2 next-setup messages that quote IDs; no tracked next-setup file quotes one. nest-setup's plan doc quotes `ed6d29f` and `7af4134`, so D4 updates it |
| R6 — GitHub still stores the old objects behind PR refs                                   | Accepted: clones do not fetch `refs/pull/*`. Only GitHub Support can purge them, and nothing secret is involved |
| R7 — pruning destroys something needed later                                              | The verified bundles hold every ref, stash and reachable object from before the run            |

## 10. Recommendation & Open Decisions

**Recommendation:** run Phases 0–2 and 4–5 for next-setup only. That is one filter-repo pass stripping `public/images/` and renaming `7eea1ad`, and it should take `.git` from 19 MB to under 2 MB. Give nest-setup Phase 1 housekeeping only: at 1.6 MB it isn't bloated, and renaming five messages would force-push `master` and `development` for cosmetics. Add the CI size guard afterwards.

**Decisions (resolved 2026-11-05):**

1. **D1 — tooling:** install `git-filter-repo`.
2. **D2 — next-setup's uncommitted deletions:** committed.
3. **D3 — `stash@{0}`:** dropped (it stays in the backup bundle).
4. **D4 — nest-setup message rewrite:** yes, with the five messages in §2, so nest-setup also runs Phases 2–5.
5. **D5 — force push:** approved for both repos.

The CI size guard ships in the same push as the rewrite.
