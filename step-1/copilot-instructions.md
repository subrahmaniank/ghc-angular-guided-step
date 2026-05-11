# GitHub Copilot Instructions

## Repository Context

This repository is an Angular application used as a training codebase for learning GitHub Copilot.

The goal is not only to generate code, but to generate code that is:

- correct
- maintainable
- readable
- testable
- aligned with the existing project structure
- easy for a development team to review and learn from

When helping in this repository, prefer small, focused changes over large rewrites.

## Technology Stack

Use the versions and tools already configured in `package.json`.

Key technologies:

- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular Forms where applicable
- Angular CLI build and test commands
- Vitest-compatible test syntax
- Playwright for end-to-end, smoke, visual, and accessibility tests
- ESLint, Prettier, Stylelint, and Knip for quality checks
- Shoelace web components where already used

Do not introduce new frameworks, libraries, or testing tools unless explicitly requested.

## General Coding Guidelines

When generating or modifying code:

- Follow the existing folder structure and naming conventions.
- Prefer simple, readable Angular and TypeScript code.
- Use strict TypeScript-friendly patterns.
- Avoid `any` unless there is a clear reason and it is explained.
- Prefer explicit types for public APIs, inputs, outputs, and service methods.
- Do not change public behavior unless the task explicitly asks for it.
- Do not remove existing functionality to make a test pass.
- Do not make unrelated refactors.
- Keep changes scoped to the files relevant to the request.
- Preserve existing formatting conventions.
- Prefer Angular-native patterns over custom abstractions.

## Angular Guidelines

When working with Angular code:

- Prefer standalone components because Angular 21 applications commonly use standalone component patterns.
- For standalone components, use `imports` rather than `declarations` in tests and module setup.
- Use Angular dependency injection instead of manually constructing services unless the test specifically calls for isolated class testing.
- Use Angular signals, computed signals, and effects consistently with existing code.
- For signals, read values by invoking the signal, for example `name()`.
- Prefer template-driven or reactive forms according to the existing component style.
- Keep component logic focused on presentation and UI behavior.
- Move reusable business logic into services where appropriate.
- Do not place complex business logic directly in templates.
- Keep templates accessible and semantic.
- Avoid brittle selectors and implementation-specific DOM assumptions.

## Angular 21 and Vitest Testing Standards

Use these standards when creating or modifying Angular unit tests.

### Import Mapping and Dependency Rules

- Import `provideZonelessChangeDetection` only from `@angular/core`.
- Do not import `provideZonelessChangeDetection` from `@angular/core/testing`.
- Import `TestBed`, `ComponentFixture`, and `waitForAsync` from `@angular/core/testing`.
- Always explicitly import Vitest globals from `vitest`:
  - `vi`
  - `describe`
  - `it`
  - `expect`
  - `beforeEach`
- Use `vi.spyOn()` and `vi.fn()` exclusively.
- Avoid Jasmine-specific syntax such as `spyOn`.
- Do not introduce Jest-specific APIs.

Example:

```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';