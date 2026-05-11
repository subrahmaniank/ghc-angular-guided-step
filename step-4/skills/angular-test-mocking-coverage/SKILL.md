---
name: angular-test-mocking-coverage
description: Use this skill when Angular unit tests require service mocks, injected token mocks, observable mocks, router mocks, Vitest spies, test failure repair, npm run test:coverage execution, or coverage improvement to at least 60%.
---

# Angular Test Mocking and Coverage Skill

Use this skill when the task involves Angular unit test dependencies, mocking, failing tests, or coverage improvement.

This skill is relevant for tasks such as:

- mocking Angular services
- mocking injected tokens
- mocking observables
- mocking router behavior
- using Vitest spies
- fixing failing unit tests
- diagnosing TestBed provider errors
- running `npm run test:coverage`
- improving coverage to at least 60%

## Primary Goal

Create or improve Angular unit tests by:

- mocking dependencies correctly
- keeping mocks minimal
- using Vitest APIs
- running the coverage command
- fixing test failures
- ensuring at least 60% coverage for the target component or affected unit under test

## Mandatory Test Command

After creating or modifying any `*.spec.ts` file, run:

```bash
npm run test:coverage
```

If the command fails:

1. Read the actual error output.
2. Identify the root cause.
3. Fix the test or test setup.
4. Rerun:

```bash
npm run test:coverage
```

Do not report the task as complete unless:

- the command passed, or
- terminal execution was unavailable, or
- a remaining failure is clearly explained with relevant error details.

## Coverage Requirement

The target component or affected unit under test must reach at least 60% coverage.

If coverage is below 60%:

1. Inspect the coverage output.
2. Identify uncovered lines, branches, or functions.
3. Add meaningful behavior-based tests.
4. Mock dependencies as needed.
5. Rerun:

```bash
npm run test:coverage
```

Do not add meaningless tests only to inflate coverage.

## Mocking Rules

When a component depends on services, tokens, or external dependencies:

- Mock dependencies using Angular providers.
- Mock only methods and properties the component actually uses.
- Keep mock objects small.
- Use `vi.fn()` for mocked methods.
- Use `vi.spyOn()` when spying on an injected instance.
- Use `vi.clearAllMocks()` before each test.
- Do not use Jasmine `spyOn`.
- Do not use Jest APIs.

Example:

```ts
const headerServiceMock = {
  setCanonical: vi.fn(),
};

const seoServiceMock = {
  setBasicTags: vi.fn(),
};

beforeEach(async () => {
  vi.clearAllMocks();

  await TestBed.configureTestingModule({
    imports: [ComponentUnderTest],
    providers: [
      provideZonelessChangeDetection(),
      { provide: HeaderService, useValue: headerServiceMock },
      { provide: SeoService, useValue: seoServiceMock },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(ComponentUnderTest);
  component = fixture.componentInstance;
  fixture.detectChanges();
});
```

## Mock Hygiene

Prevent test pollution.

Always clear mock call history before each test setup:

```ts
beforeEach(async () => {
  vi.clearAllMocks();

  await TestBed.configureTestingModule({
    imports: [ComponentUnderTest],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  fixture = TestBed.createComponent(ComponentUnderTest);
  component = fixture.componentInstance;
  fixture.detectChanges();
});
```

If mocks need default return values, set those defaults inside `beforeEach`.

Example:

```ts
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

## Injected Services

For constructor-injected services or services retrieved using `inject(...)`, provide test doubles through Angular dependency injection.

Example:

```ts
const exampleServiceMock = {
  getItems: vi.fn().mockReturnValue(of([])),
  saveItem: vi.fn(),
};

await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [
    provideZonelessChangeDetection(),
    { provide: ExampleService, useValue: exampleServiceMock },
  ],
}).compileComponents();
```

Use `TestBed.inject(ServiceName)` when retrieving an injected service is useful for spying or assertions.

Example:

```ts
const service = TestBed.inject(ExampleService);
const getItemsSpy = vi.spyOn(service, 'getItems').mockReturnValue(of([]));
```

## Injected Tokens

If a component uses injected tokens, provide them through TestBed.

Example:

```ts
await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [
    provideZonelessChangeDetection(),
    { provide: ENVIRONMENT, useValue: environment },
  ],
}).compileComponents();
```

If the real environment object is safe and already used by existing tests, reuse it.

If the test needs specific behavior, create a minimal mock token value.

## Observable Mocks

When mocking observable-returning service methods, use deterministic observables.

Use `of(...)` for successful responses:

```ts
exampleServiceMock.getItems.mockReturnValue(
  of([{ id: 1, name: 'Example' }]),
);
```

Use `throwError(() => error)` for error cases:

```ts
exampleServiceMock.getItems.mockReturnValue(
  throwError(() => new Error('Failed to load items')),
);
```

Rules:

- Keep observable behavior deterministic.
- Avoid arbitrary delays.
- Avoid sleeps and timers unless production code explicitly requires timer behavior.
- Test loading, success, empty, and error states when the component supports them.

## Router Dependencies

Prefer `provideRouter(...)` for router setup.

Example:

```ts
await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([]),
  ],
}).compileComponents();
```

Use a manual router mock only when the test verifies router method calls.

Example:

```ts
const routerMock = {
  navigate: vi.fn(),
};

await TestBed.configureTestingModule({
  imports: [ComponentUnderTest],
  providers: [
    provideZonelessChangeDetection(),
    { provide: Router, useValue: routerMock },
  ],
}).compileComponents();
```

## Service Call Assertions

Assert service interactions only when they are important behavior or side effects.

Good examples:

```ts
expect(seoServiceMock.setBasicTags).toHaveBeenCalled();
expect(headerServiceMock.setCanonical).toHaveBeenCalledWith('/');
expect(analyticsServiceMock.loadGA4Script).toHaveBeenCalled();
```

Avoid asserting every internal service call if it makes the test brittle.

## Failure Diagnosis Checklist

When a test fails, do not immediately weaken assertions.

Check these first:

- Is the component under test in `imports`?
- Is `provideZonelessChangeDetection()` configured?
- Does the component use router features requiring `provideRouter([])`?
- Are all injected services provided?
- Are all injected tokens provided?
- Does each mock include the methods the component actually calls?
- Does an observable mock need `of(...)` or `throwError(...)`?
- Is `fixture.detectChanges()` needed after a state change?
- Is `await fixture.whenStable()` needed before the assertion?
- Is the assertion testing behavior or implementation detail?
- Is the failure pointing to a real production bug?

Only change production code when there is clear evidence of a production bug and the user has asked for that change.

## Coverage Improvement Strategy

To reach at least 60% coverage, add tests in this order:

1. Component creation.
2. Important public state.
3. Signals.
4. Rendered user-visible output.
5. Conditional rendering.
6. User interactions.
7. Output events.
8. Required service interactions.
9. Observable success path.
10. Observable empty path.
11. Observable error path.
12. Router behavior.

Do not test private methods directly.

Do not test Angular internals.

## Final Reporting Requirements

When finished, report:

```md
## Result

Files changed:

- `<path to spec file>`

Command run:

```bash
npm run test:coverage
```

Status:

- `<Passed | Failed | Could not run>`

Coverage:

- Target coverage: `<actual coverage>`
- Required minimum: 60%

Notes:

- `<important mocks or fixes>`
- `<remaining issue if any>`
```

Do not claim the task passed unless the command actually passed and coverage is at least 60%.