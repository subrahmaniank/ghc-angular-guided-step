---
description: Generate, run, fix, and validate Angular unit tests for a component with at least 60% coverage.
agent: agent
---

# Generate Angular Unit Test

Generate or update a unit test for the Angular component provided as input.

Target component input:

```text
${input:componentName:Enter the Angular component class name or component file path, for example AppComponent or src/app/app.component.ts}
```

## Objective

Create or update the unit test for the target Angular component, run the tests, fix issues, and ensure the relevant code coverage is at least 60%.

The generated test must follow this repository's Angular 21, Vitest, TestBed, standalone component, and zoneless testing standards.

## Mandatory Agent Workflow

You must complete all of the following steps.

1. Resolve the target component.
   - If the input is a file path, use that file directly.
   - If the input is a component class name, search the workspace for the matching component.
   - Identify the component TypeScript file, template file, style file, and existing spec file if present.

2. Inspect the component before writing tests.
   - Read the component TypeScript file.
   - Read the component template file if it exists.
   - Inspect constructor dependencies, injected services, tokens, signals, inputs, outputs, router usage, forms, observables, and lifecycle hooks.
   - Check nearby existing tests for project-specific style.

3. Create or update the spec file.
   - Place the unit test next to the component under test.
   - Use the existing naming convention, usually `*.spec.ts`.
   - Do not create unrelated files.
   - Do not change production code unless there is a clear production bug and the user explicitly approves it.

4. Mock dependencies appropriately.
   - Mock services required by the component.
   - Use Angular dependency injection providers for mocks.
   - Use `vi.fn()` and `vi.spyOn()` for mocks and spies.
   - Do not use Jasmine syntax such as `spyOn`.
   - Do not use Jest APIs.
   - Keep mocks minimal and behavior-focused.
   - Mock only what the component actually uses.

5. Run the tests.
   - After creating or modifying the test file, run:

```bash
npm run test:coverage
```

6. Fix failures.
   - If the test command fails, inspect the error.
   - Fix the test or test setup.
   - Do not weaken meaningful assertions just to make tests pass.
   - Do not delete useful tests to hide failures.
   - Rerun `npm run test:coverage`.

7. Verify coverage.
   - Confirm that coverage for the tested component, or the relevant affected unit under test, is at least 60%.
   - If coverage is below 60%, add meaningful tests until coverage reaches at least 60%.
   - Do not add low-value tests only to inflate coverage.
   - Prefer behavior-based tests.

8. Final response.
   - Include files created or modified.
   - Include the test command that was run.
   - Include pass/fail result.
   - Include observed coverage result.
   - If tests could not be run, clearly explain why.

## Angular 21 and Vitest Test Standards

Follow these rules for all generated tests.

### Imports

Use this import pattern when applicable:

```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
```

Rules:

- Import `provideZonelessChangeDetection` only from `@angular/core`.
- Import `TestBed`, `ComponentFixture`, and Angular testing utilities from `@angular/core/testing`.
- Always explicitly import Vitest globals from `vitest`.
- Use `vi.fn()` and `vi.spyOn()` exclusively for mocks and spies.
- Do not use Jasmine-specific APIs.
- Do not use Jest-specific APIs.

### TestBed Setup

For standalone Angular components:

```ts
await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [provideZonelessChangeDetection()],
}).compileComponents();
```

Rules:

- Put standalone components in the `imports` array.
- Do not put standalone components in the `declarations` array.
- Always include `provideZonelessChangeDetection()` in the `providers` array.
- Always call `await TestBed.compileComponents()` before `TestBed.createComponent`.
- Use `fixture.detectChanges()` after creating the component when lifecycle hooks or template rendering are relevant.
- Use `await fixture.whenStable()` when waiting for Angular rendering, signal updates, async tasks, or zoneless stabilization.

### Router Testing

If the component uses router functionality such as `router-outlet`, `routerLink`, `Router`, `ActivatedRoute`, route params, or current URL state:

- Import `provideRouter` from `@angular/router`.
- Prefer `provideRouter([])` for simple router setup.
- Add only the minimum routes required by the test.
- Do not manually mock the router unless the test specifically needs to verify router method calls.

Example:

```ts
import { provideRouter } from '@angular/router';

await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([]),
  ],
}).compileComponents();
```

### Service Mocking

When a component depends on services:

- Create small mock objects with only the methods and properties used by the component.
- Use `vi.fn()` for mocked methods.
- Register mocks through Angular providers.
- Use `TestBed.inject(ServiceName)` when retrieving an injected service is useful for spying or assertions.
- Clear mocks between tests using `vi.clearAllMocks()`.

Example:

```ts
const exampleServiceMock = {
  getItems: vi.fn(),
};

beforeEach(async () => {
  vi.clearAllMocks();

  exampleServiceMock.getItems.mockReturnValue(of([]));

  await TestBed.configureTestingModule({
    imports: [ComponentUnderTest],
    providers: [
      provideZonelessChangeDetection(),
      { provide: ExampleService, useValue: exampleServiceMock },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(ComponentUnderTest);
  component = fixture.componentInstance;
  fixture.detectChanges();
});
```

### Signals

When testing Angular signals:

- Read signal values by invoking the signal.
- Example: `component.currentUrl()`.
- After changing state that affects the template, call `fixture.detectChanges()`.
- Use `await fixture.whenStable()` when the DOM needs to reflect signal-driven updates.
- Prefer asserting user-visible behavior when possible.

### Observables

When mocking observables:

- Use `of(...)` for successful responses.
- Use `throwError(() => error)` for error cases.
- Avoid arbitrary sleeps or timers.
- Keep async behavior deterministic.

### DOM Assertions

Prefer user-visible and semantic assertions.

Good selectors include:

- headings
- buttons
- labels
- inputs
- forms
- links
- visible text
- ARIA roles or accessible labels when already present

Avoid asserting:

- Angular-generated attributes
- fragile CSS selectors
- layout-only classes
- private implementation details

### What to Test

Prefer tests that verify public behavior.

Good tests include:

- component creation
- public state
- signal values
- rendered user-visible content
- conditional rendering
- interactions
- emitted events
- calls to required services
- router behavior
- empty, loading, and error states

Avoid tests that directly test:

- private methods
- Angular framework internals
- implementation details that make refactoring difficult
- behavior unrelated to the component under test

## Reference Test Pattern

Use the following test as a model for structure, dependency mocking, router setup, zoneless testing, and meaningful assertions.

```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AnalyticsService } from '~core/services/analytics.service';
import { HeaderService } from '~core/services/ui/header.service';
import { SeoService } from '~core/services/seo.service';
import { ENVIRONMENT } from '~core/tokens/environment.token';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const headerServiceMock = {
    setCanonical: vi.fn(),
  };

  const seoServiceMock = {
    setBasicTags: vi.fn(),
  };

  const analyticsServiceMock = {
    loadGA4Script: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: HeaderService, useValue: headerServiceMock },
        { provide: SeoService, useValue: seoServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceMock },
        { provide: ENVIRONMENT, useValue: environment },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', async () => {
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });

  it('should call setBasicTags on construction', async () => {
    await fixture.whenStable();

    expect(seoServiceMock.setBasicTags).toHaveBeenCalled();
  });

  it('should expose isBrowser as a boolean', async () => {
    await fixture.whenStable();

    expect(typeof component.isBrowser).toBe('boolean');
  });

  it('should initialise currentUrl signal with the current router url', async () => {
    await fixture.whenStable();

    expect(component.currentUrl()).toBe('/');
  });

  it('should call setCanonical with the current url via canonicalEffect', async () => {
    await fixture.whenStable();

    expect(headerServiceMock.setCanonical).toHaveBeenCalledWith('/');
  });

  it('should render the router outlet', async () => {
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
```

Important lessons from this reference:

- Use `imports: [AppComponent]` for standalone components.
- Use `provideZonelessChangeDetection()`.
- Use `provideRouter([])` when router features are present.
- Mock required services through Angular providers.
- Use `vi.fn()` for mock methods.
- Use `vi.clearAllMocks()` before each test to prevent call history leaking between tests.
- Use `fixture.whenStable()` for zoneless stabilization.
- Test meaningful behavior such as service calls, signal state, and rendered router outlet.

## Coverage Requirement

The completed work must reach at least 60% coverage for the target component or the relevant affected unit under test.

If coverage is below 60% after the first test run:

1. Inspect the uncovered lines or branches.
2. Add meaningful tests for missing behavior.
3. Mock dependencies as needed.
4. Rerun:

```bash
npm run test:coverage
```

Continue until coverage is at least 60%, or explain the specific reason this could not be achieved.

## Final Answer Format

When finished, respond using this format:

```md
## Result

Created or updated:

- `<spec file path>`

Validated with:

```bash
npm run test:coverage
```

Status:

- Passed or failed

Coverage:

- Target component coverage: `<coverage result>`
- Required minimum: 60%

Notes:

- `<brief explanation of important mocks, assertions, or remaining issues>`
```

Do not claim success unless the command actually passed and the coverage requirement was met.