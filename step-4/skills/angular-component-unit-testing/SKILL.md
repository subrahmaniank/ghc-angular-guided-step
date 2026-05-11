---
name: angular-component-unit-testing
description: Use this skill when creating or updating Angular component unit tests for one component, including Angular 21 TestBed setup, standalone component imports, Vitest syntax, router testing, signals, DOM assertions, and zoneless change detection.
---

# Angular Component Unit Testing Skill

Use this skill when the task involves Angular component unit tests.

This skill is relevant for tasks such as:

- generating a component spec file
- updating an existing Angular component test
- fixing Angular TestBed setup
- testing standalone components
- testing Angular signals
- testing rendered DOM output
- testing router usage
- testing component lifecycle behavior
- testing component side effects
- improving Angular component test quality

## Primary Goal

Create Angular component unit tests that are:

- correct
- readable
- maintainable
- deterministic
- behavior-focused
- aligned with Angular 21
- compatible with Vitest
- compatible with zoneless change detection

Prefer public behavior over implementation details.

## Required Imports

Use this import pattern when applicable:

```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
```

Rules:

- Import `provideZonelessChangeDetection` only from `@angular/core`.
- Import `ComponentFixture`, `TestBed`, and Angular testing utilities from `@angular/core/testing`.
- Explicitly import Vitest globals from `vitest`.
- Use `vi.fn()` and `vi.spyOn()` for mocks and spies.
- Do not use Jasmine `spyOn`.
- Do not use Jest APIs.

## Required TestBed Pattern

For standalone Angular components, place the component under test in the `imports` array.

Use this pattern:

```ts
await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [provideZonelessChangeDetection()],
}).compileComponents();
```

Do not put standalone components in `declarations`.

Avoid this for standalone components:

```ts
await TestBed.configureTestingModule({
  declarations: [ComponentUnderTest],
}).compileComponents();
```

## Standard Component Spec Structure

Use this as the default structure:

```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentUnderTest } from './component-under-test';

describe('ComponentUnderTest', () => {
  let fixture: ComponentFixture<ComponentUnderTest>;
  let component: ComponentUnderTest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentUnderTest],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentUnderTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', async () => {
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });
});
```

## Compilation and Lifecycle Rules

Always follow these rules:

- Use `async` for `beforeEach` blocks that configure TestBed.
- Call `await TestBed.configureTestingModule(...).compileComponents()` before `TestBed.createComponent(...)`.
- Create the fixture with `TestBed.createComponent(ComponentUnderTest)`.
- Assign `fixture.componentInstance` to a typed `component` variable.
- Call `fixture.detectChanges()` after creating the component when lifecycle hooks or template rendering are relevant.
- Use `await fixture.whenStable()` before assertions that depend on rendering, signals, effects, async tasks, or lifecycle updates.

## Zoneless Change Detection

This project uses zoneless Angular testing.

Rules:

- Always include `provideZonelessChangeDetection()` in Angular component tests.
- Do not rely on Zone.js behavior.
- Use `fixture.detectChanges()` after state changes that affect the template.
- Use `await fixture.whenStable()` when waiting for the UI to stabilize.
- Avoid arbitrary timers, sleeps, or `setTimeout`.

## Router Testing

If the component uses any router features, configure router testing properly.

Router features include:

- `router-outlet`
- `routerLink`
- `Router`
- `ActivatedRoute`
- route params
- query params
- current URL state
- navigation logic

Use `provideRouter`.

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

Use the minimum route configuration required by the test.

Do not manually mock Angular Router unless the test specifically verifies router method calls such as `navigate`.

## Signals

When testing Angular signals:

- Read signal values by invoking the signal.
- Example: `component.currentUrl()`.
- After changing signal-driven state, call `fixture.detectChanges()`.
- Use `await fixture.whenStable()` when the DOM must reflect signal changes.
- Prefer testing rendered user-visible behavior when possible.

Example:

```ts
expect(component.currentUrl()).toBe('/');
```

## DOM Assertions

Prefer semantic, user-visible DOM assertions.

Good assertion targets include:

- headings
- buttons
- links
- labels
- inputs
- forms
- visible text
- router outlet for app shell components
- ARIA roles or accessible labels when already present

Examples:

```ts
const compiled = fixture.nativeElement as HTMLElement;

expect(compiled.textContent).toContain('Dashboard');
expect(compiled.querySelector('button')).toBeTruthy();
expect(compiled.querySelector('router-outlet')).toBeTruthy();
```

Avoid assertions against:

- Angular-generated attributes
- fragile CSS selectors
- layout-only classes
- deeply nested implementation-specific DOM
- styles that do not represent user-visible behavior

## What to Test

Prefer tests that verify public behavior.

Good tests include:

- component creation
- public component state
- signal values
- rendered user-visible content
- conditional rendering
- user interactions
- emitted events
- service calls caused by component behavior
- router behavior
- empty states
- loading states
- error states

Avoid tests that directly verify:

- private methods
- Angular framework internals
- brittle implementation details
- behavior unrelated to the component under test

## Reference Test Pattern

Use this as a reference pattern for Angular app shell tests with router, services, tokens, signals, and zoneless stabilization.

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

Important lessons from the reference:

- Use `imports: [AppComponent]` for standalone components.
- Use `provideZonelessChangeDetection()`.
- Use `provideRouter([])` when router features are present.
- Mock required services through Angular providers.
- Use `vi.fn()` for mock methods.
- Use `vi.clearAllMocks()` before each test.
- Use `fixture.whenStable()` for zoneless stabilization.
- Test meaningful behavior such as service calls, signal state, and rendered router outlet.

## Final Checklist

Before finishing an Angular component test:

- The component under test is in `imports`, not `declarations`.
- `provideZonelessChangeDetection()` is configured.
- Router dependencies use `provideRouter(...)`.
- Required services and tokens are provided.
- Vitest APIs are used instead of Jasmine or Jest APIs.
- `compileComponents()` is awaited before creating the component.
- `fixture.detectChanges()` is called after component creation.
- `fixture.whenStable()` is used before rendered or async assertions.
- Assertions verify public behavior.
- Tests are readable and maintainable.