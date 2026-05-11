# GitHub Copilot Instructions

## Repository context

This repository is an Angular 21 training project.
Prefer small, focused, reviewable changes.

## Technology expectations

- Use the versions and tools already configured in `package.json`.
- Follow Angular 21 + TypeScript + RxJS project patterns.
- Use Angular Router and Forms patterns that match existing code.
- Use Vitest-compatible unit test syntax.
- Do not introduce new frameworks, libraries, or testing tools unless explicitly requested.

## General coding best practices

- Follow existing folder structure, naming conventions, and formatting style.
- Prefer readable, strict TypeScript patterns and explicit types for public APIs.
- Avoid `any` unless there is a clear, justified reason.
- Keep changes scoped to the request; avoid unrelated refactors.
- Do not change public behavior unless explicitly requested.
- Do not remove existing functionality to make tests pass.

## Angular unit testing guardrails

- Import `provideZonelessChangeDetection` only from `@angular/core`.
- Do not import `provideZonelessChangeDetection` from `@angular/core/testing`.
- Import `TestBed`, `ComponentFixture`, and `waitForAsync` from `@angular/core/testing`.
- Explicitly import Vitest globals from `vitest` (`vi`, `describe`, `it`, `expect`, `beforeEach`).
- Use `vi.spyOn()` and `vi.fn()` (not Jasmine `spyOn`, not Jest APIs).
- For standalone components, use `imports` rather than `declarations` in tests.
- Prefer behavior-focused assertions and avoid brittle selectors or implementation-detail assertions.
