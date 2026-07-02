# .claude/ — Navigation Guide

This folder contains architecture rules for next-setup. **Start here to find what you need.**

---

## Which File Do I Read?

| **When** | **Read** | **For** |
|----------|----------|---------|
| First time in this repo | `CLAUDE.md` | Complete architecture overview, folder structure, core principles |
| Before writing code | `QUICK-REF.md` | Decision trees, layer checklist, type derivation rules |
| Code looks wrong | `GOTCHAS.md` | 10 concrete mistakes with examples, smell tests, when to flag me |
| In a rush / TL;DR | `instructions.md` | 1-page summary of non-negotiables, file-level checks |
| Using Copilot / need anchoring | `BEFORE-YOU-CODE.md` | Copy-paste prompts to ensure both Claude and Copilot follow rules |

---

## Quick Decision Tree

```
Are you starting fresh in this repo?
├─ YES → Read CLAUDE.md (start to finish)
└─ NO  → What's your situation?
    ├─ "I'm about to code" → Read QUICK-REF.md
    ├─ "I see something wrong" → Read GOTCHAS.md
    ├─ "I need a quick summary" → Read instructions.md
    ├─ "Copilot is here" → Copy from BEFORE-YOU-CODE.md
    └─ "I'm in a dispute about architecture" → Quote CLAUDE.md
```

---

## File Purposes at a Glance

**CLAUDE.md** — The source of truth. Non-negotiable folder structure, principles, layer separation, styling rules, tech stack. Everything else derives from this.

**QUICK-REF.md** — How to think. Decision trees, layer checklist, type derivation table. Use this to verify you're making the right choice before committing.

**GOTCHAS.md** — How not to think. 10 real mistakes with concrete examples, smell tests, and when to flag the agent. Use this for code review or mid-generation corrections.

**instructions.md** — One-page summary. Designed for both Claude and Copilot. Core rule + non-negotiables + file-level checks. Read when you need the essentials fast.

**BEFORE-YOU-CODE.md** — Copy-paste prompts. Two anchoring prompts (full + minimal) to paste before your request. Ensures consistent behavior across Claude and Copilot.

---

## Example Workflows

### Workflow 1: New to this repo

1. Read `CLAUDE.md` fully
2. Skim `QUICK-REF.md` decision trees
3. Bookmark `GOTCHAS.md` for later (refer when reviewing code)

### Workflow 2: Asking Copilot for code

1. Copy the **Minimal Anchoring Prompt** from `BEFORE-YOU-CODE.md`
2. Paste it at the start of your request
3. Describe your task
4. If Copilot slips, quote the relevant Gotcha

### Workflow 3: Code review before commit

1. Run the **Quick Smell Test** at the bottom of `GOTCHAS.md`
2. Verify against `QUICK-REF.md` checklist
3. If anything fails, ask the agent to fix it with: "What does GOTCHA #{number} say?"

### Workflow 4: Dispute over architecture

1. Quote the relevant principle from `CLAUDE.md`
2. Point to the rule in `QUICK-REF.md` or `GOTCHAS.md` with examples
3. The architecture is immutable; discussion ends there

---

## One Rule to Rule Them All

**Derive, never reconstruct.** If a library or framework generates a type, schema, validation result, or query shape, use that output directly. Do not rebuild it with `any`, `Record<>`, `as { ... }`, or a hand-written parallel type.

Everything else follows from this.

---

## TL;DR

- **First time?** Read CLAUDE.md.
- **About to code?** Read QUICK-REF.md.
- **Code looks wrong?** Read GOTCHAS.md.
- **In a rush?** Read instructions.md.
- **Using Copilot?** Copy from BEFORE-YOU-CODE.md.
