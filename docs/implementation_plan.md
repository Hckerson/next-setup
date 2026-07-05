# Refactor TypeScript Interfaces

This plan addresses layout and redundancy issues in the TypeScript interface structure, fixing duplicate definitions and creating cleaner inheritance chains between base types and their extensions.

## User Review Required

> [!IMPORTANT]
> The biggest challenge is that types are currently split between `lib/types/` and `lib/interface/`. While I am fixing the inheritance duplications within the files, I recommend that we eventually consolidate these folders so that e.g. `lib/types/user.ts` holds all user-related interfaces and types. Currently, this plan focuses exclusively on fixing the interface structures _in place_ to keep the PR focused. Let me know if you would prefer a full consolidation into a single folder as part of this step.

## Proposed Changes

### `lib/interface/user.ts` & `lib/interface/school.ts` (User Models & Duplications)

- **Fix `Guardian` Extension Override**: `Guardian` extends `BaseUser` but manually re-declares `phoneNumber: string`, leading to type duplication (and errors in strict TS). I'll refactor it as `interface Guardian extends Omit<BaseUser, "phoneNumber"> { phoneNumber: string; }`.
- **Resolve `User.competition` TODO**: `User` has `competition?: { wins: number; submissions: number; }` with a comment to use `Pick<CompetitionAnalysis, 'wins' | 'submissions'>`. I will rename `submission` to `submissions` in `CompetitionAnalysis` (in `school.ts`), then apply the requested `Pick` utility to `User`.
- **Consolidate Metrics**: `UserStats` and `EngagementMetrics` have duplicated fields (`sparksCollected`, `competitionsEntered`, `submissions`). I will create a shared `BaseMetrics` interface that both can extend to stay DRY.

### `lib/interface/interface.ts` (Redundant Re-Declarations)

- **Unify Link Models**: `SideLinks` and `QuickActions` are structurally identical except `SideLinks` restricts the `link` property to a specific union type. I will refactor `SideLinks` to `interface SideLinks extends Omit<QuickActions, 'link'> { link: Links; }` to establish a base-extension relationship.
- **MetricCardItems**: Will be updated to explicitly extend `StatLabel` and `BaseImage` rather than independently redefining the `label` property that belongs to `StatLabel`.

### `lib/interface/contest.ts` (Contest / Contests Alignment)

- The structures for `Contest` and `Contests` are deeply intertwined but use `EventData` differently (`Contests` extends it, `Contest` wraps it). I will ensure `EventData` accurately represents the shared base layer between both data models and remove any loose re-declarations.
- Ensure `RecommendedProfile` in `user.ts` is extending `Contest` securely without missing metadata.

## Open Questions

- Do you want me to also merge the files in `lib/interface/` into `lib/types/` as part of this reconstruct, or keep them separate for now?

## Verification Plan

### Automated Tests

- Run `pnpm run build` to verify Next.js type checking passes.
- Verify `placeholder-data.ts` and `mapped-data.ts` adapt properly to `CompetitionAnalysis`'s property renaming.
