# Line Endings

`pnpm format` used to detonate the working tree. A single run left 649 files reported as modified when only 9 had actually changed. Committing the noise cleared it for a day, then the next checkout brought it all back.

The cause was two settings pulling in opposite directions, with Git's index stat cache caught between them. This document records the diagnosis, the fix that was applied here, and the procedure for applying it to another repository.

## Symptoms

You have this problem if all of the following are true:

| Check                                     | Symptom                                                             |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `git status --porcelain \| grep -c '^ M'` | Hundreds of files                                                   |
| `git diff --name-only \| wc -l`           | A handful — the ones you actually edited                            |
| Any `git` command                         | `warning: LF will be replaced by CRLF the next time Git touches it` |
| `git update-index --refresh`              | Changes nothing                                                     |
| Committing the noise                      | Clears it, until the next checkout, stash, or branch switch         |

The tell is the disagreement between `status` and `diff`. They are asking different questions, and only one of them reads the file.

## Diagnosis

Two layers disagreed about what a line ending is:

| Layer                                                             | Wants                      |
| ----------------------------------------------------------------- | -------------------------- |
| `core.autocrlf = true`, with no `.gitattributes`                  | Working tree files in CRLF |
| `.editorconfig` `end_of_line = lf`, read by Prettier 3 by default | Files written as LF        |

Neither is wrong on its own. Together they produce a file that is rewritten on every format run, and a Git index that never catches up.

Tracing one file, `app/(public)/layout.tsx`:

1. The committed blob is **509 bytes, LF**. Every blob in this repository always was — there has never been a CRLF byte in the history.
2. `core.autocrlf = true` told Git to check the file out converted to CRLF, so Git wrote a 529-byte file and recorded `size: 529` in the index stat cache.
3. `pnpm format` rewrote the file as **509 bytes, LF**.
4. 509 no longer matched the cached 529, so `git status` reported the file as modified — **without ever comparing its contents**.
5. `git diff` did compare contents, normalised, found them identical, and reported nothing.

That accounts for the whole gap: 649 reported, 9 real, 640 phantom. The phantoms were byte-identical to `HEAD` the entire time.

### Why it kept coming back

`git update-index --refresh` cannot repair it. Refreshing the stat cache would record 509, but `autocrlf = true` insists the checked-out form is 529, so the entry stays dirty.

Committing _does_ clear it, because a commit writes fresh stat data — which is why a 25-file commit stuck. But the next `checkout`, `stash`, `merge`, or branch switch rewrites those files as CRLF, the next `pnpm format` flips them back to LF, and the count explodes again. The problem is a loop, not an event.

## The fix

Four steps. None of them rewrite history, and none of them touch a working tree file.

### 1. Pin line endings in the repository

`.gitattributes` at the repository root. This is the durable part — it is committed, so it binds every machine and every clone, and it overrides whatever `core.autocrlf` happens to be set to locally.

```
* text=auto eol=lf

*.png   binary
*.woff2 binary
```

`* text=auto eol=lf` means: normalise to LF in the object database, and check out as LF everywhere including Windows. The `binary` lines are defensive — this repository tracks only text today, but an asset added later must never be run through newline conversion.

### 2. Stop the conversion at the config level

```sh
git config core.autocrlf false
git config core.eol lf
```

Repository-local. `.gitattributes` already overrides both, but setting them explicitly silences the `LF will be replaced by CRLF` warning that otherwise prefixes the output of every Git command.

### 3. Flush the poisoned stat cache

```sh
git add --renormalize .
```

Contents are already LF everywhere, so this stages no content changes. It exists purely to rewrite the stat cache with the real file sizes.

It does, however, stage any genuine in-progress modifications as a side effect. Unstage them to restore your working state:

```sh
git restore --staged .
```

The stat cache survives the unstage. Only the staging area is reset.

### 4. State the Prettier setting explicitly

```json
{
    "endOfLine": "lf"
}
```

Prettier's default is already `lf`, and `.editorconfig` was supplying it too. Naming it in `.prettierrc` removes the dependence on config resolution — one less thing that can silently change under a version bump.

## Verification

Four checks, in order. All four passed here.

```sh
git status --porcelain | grep -c '^ M'
git diff --name-only | wc -l
```

These two numbers must now agree.

```sh
pnpm format
git status --porcelain | grep -c '^ M'
```

The count must not move. A full format run over the tree produced zero new modifications.

```sh
git ls-files --debug -- path/to/a/file | grep size
wc -c < path/to/a/file
```

The cached size must equal the real size. For `app/(public)/layout.tsx` this went from `529` against a 509-byte file to `509` against a 509-byte file.

```sh
rm path/to/an/unmodified/file && git checkout -- path/to/an/unmodified/file
tr -cd '\r' < path/to/an/unmodified/file | wc -c
```

Must print `0`. This is the one that proves the loop is broken: Git now writes LF on checkout, so Prettier has nothing left to flip.

## Applying this to another repository

The diagnosis is the same anywhere Windows meets a formatter. Run the two-line check first — if `status` and `diff` agree, you do not have this problem and nothing below applies.

```sh
echo "reported: $(git status --porcelain | grep -c '^ M')"
echo "real:     $(git diff --name-only | wc -l)"
```

If they disagree, then, from the repository root:

```sh
printf '* text=auto eol=lf\n' > .gitattributes
git config core.autocrlf false
git config core.eol lf
git add --renormalize .
git restore --staged .
```

Then re-run the two-line check and confirm the numbers match.

Three things to watch when you do this elsewhere:

**Commit `.gitattributes` on its own.** Keep it separate from the in-progress work it happens to be sitting next to, so the change is legible in the history and trivially revertible.

**Repositories whose history genuinely contains CRLF need one extra commit.** This one did not — every blob was already LF, so `--renormalize` staged nothing. Where CRLF was actually committed, `--renormalize` will stage real blob changes across a large number of files. Commit that as a single mechanical normalisation commit, touching nothing else, and be aware it is a rewrite point for anyone with open branches.

**Add the binary declarations before adding binary assets, not after.** `text=auto` detects binary content reliably, but an explicit declaration costs one line and removes the question.

**Each repository needs its own.** `.gitattributes` and `core.autocrlf` are per-repository. A monorepo needs one at the root; sibling repositories — such as `../backend` — each need their own.

## Addendum: applying it a second time

The procedure above was applied to `nest-setup` and re-checked against `next-setup`. Both are now clean. Two things surfaced that the original write-up does not cover.

### A repository that already has `.gitattributes` is not necessarily fixed

`next-setup` had `.gitattributes` committed and still held four CRLF files in the working tree: `.editorconfig`, `.husky/pre-commit`, `.husky/pre-push`, `.prettierignore`.

This is not a contradiction. `eol=lf` governs what Git **writes on checkout**; it does not reach back and rewrite files already sitting on disk. Those four were checked out under `autocrlf = true` before the attribute existed, and their stat cache entries still matched their CRLF sizes — so `git status` had no reason to read them and stayed silent. They were invisible until something touched them, at which point they would have re-entered the loop.

`git add --renormalize .` does not repair this either. It rewrites the stat cache from the file on disk; it never rewrites the file. The blob was already LF, so the command staged nothing and the CRLF file stayed exactly as it was.

The only thing that repairs the working tree is forcing a fresh checkout. After steps 1–3, sweep whatever is left:

```sh
git ls-files -z | xargs -0 grep -lUP '\r' | while read -r f; do
    rm "$f" && git checkout -- "$f"
done
```

Then confirm the sweep found everything:

```sh
git ls-files -z | xargs -0 grep -lUP '\r'
```

Must print nothing. `next-setup` needed this for 4 files, `nest-setup` for 13.

Use `grep -lUP '\r'`, not `grep -lU $'\r'`. Inside a command substitution the `$'\r'` form can collapse to an empty pattern, which matches every line of every file — it reports the entire repository as containing CRLF, and the result reads as catastrophic failure rather than as a quoting mistake.

### `core.autocrlf` can be set at the system level

Neither repository had `autocrlf` in its local or global config, yet both reported `true`:

```sh
git config --show-origin --get-all core.autocrlf
# file:C:/Program Files/Git/etc/gitconfig    true
```

It ships from the Git for Windows installer. This matters twice over. `git config --global core.autocrlf` prints nothing, so the setting looks absent while it is actively converting — the check has to be `--show-origin`, or the diagnosis stalls. And it applies to **every new clone on the machine**, including repositories with no `.gitattributes` yet, so a fresh clone starts in the broken state by default.

The repository-local `core.autocrlf false` is deliberately not committable. `.gitattributes` is what protects a fresh clone; the local config only silences the warning for whoever runs it.

### Result

|                               | `next-setup`       | `nest-setup`       |
| ----------------------------- | ------------------ | ------------------ |
| `.gitattributes`              | already present    | added              |
| `core.autocrlf` / `core.eol`  | overridden locally | overridden locally |
| `endOfLine` in `.prettierrc`  | added              | added              |
| Stale CRLF files swept        | 4                  | 13                 |
| Blobs needing renormalisation | 0                  | 0                  |

Every blob in both repositories was already LF, so no normalisation commit was needed in either — the extra-commit case described above still has not come up here.
