# Lean Copilot Instructions Proposal (Step 2)

This file proposes a lean `copilot-instructions.md` that avoids repeating workflow details already covered in:

- `step-2/prompts/generate-angular-unit-test.prompt.md`

## What can be removed from current instructions

Because the Step 2 prompt already defines these, remove them from Copilot instructions:

- step-by-step workflow for generating/updating tests
- explicit command execution flow (`npm run test:coverage` run and rerun loops)
- failure triage loop details
- coverage target and coverage verification workflow
- output/report formatting requirements
- broad repository/technology catalog that does not affect test correctness

## Lean instructions (proposed content)

Use this as the proposed minimal `copilot-instructions.md` content:

```md
# GitHub Copilot Instructions

## Scope

For Angular unit test tasks, follow the active prompt file and skills for workflow steps.
Keep changes small and scoped to the request.

## Core guardrails

- Follow existing project structure and naming conventions.
- Do not make unrelated refactors.
- Do not remove existing functionality to make tests pass.
- Do not introduce new frameworks or testing libraries.

## Angular + Vitest test rules

- Import `provideZonelessChangeDetection` only from `@angular/core`.
- Do not import `provideZonelessChangeDetection` from `@angular/core/testing`.
- Import `TestBed`, `ComponentFixture`, and `waitForAsync` from `@angular/core/testing`.
- Explicitly import Vitest globals from `vitest` (`vi`, `describe`, `it`, `expect`, `beforeEach`).
- Use `vi.spyOn()` and `vi.fn()` (not Jasmine `spyOn`, not Jest APIs).
- For standalone components, use `imports` rather than `declarations` in tests.

## Test quality

- Prefer behavior-focused assertions over implementation details.
- Avoid brittle selectors and fragile DOM assumptions.
```

## Why this split works

- Prompt file handles task workflow and command execution.
- Skills handle procedural testing/mocking guidance.
- Copilot instructions stay stable, short, and enforce only non-negotiable guardrails.
