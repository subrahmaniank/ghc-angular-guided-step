---
description: Generate, run, fix, and validate Angular unit tests for a component with at least 60% coverage.
agent: agent
---

# Generate Angular Unit Test

Generate or update a unit test for the Angular component provided as input.

Apply these skills when relevant:

- `/angular-component-unit-testing`
- `/angular-test-mocking-coverage`

Target component input:

```text
${input:componentName:Enter the Angular component class name or component file path, for example AppComponent or src/app/app.component.ts}
```

## Objective

Create or update the unit test for the target Angular component.

The completed work must:

- create or update the correct `*.spec.ts` file
- mock required services and tokens appropriately
- run the test coverage command
- fix test failures
- ensure at least 60% coverage for the target component or affected unit under test
- report the final result clearly

## Mandatory Agent Workflow

Complete the following workflow.

### 1. Resolve the target component

If the input is a file path, use that file directly.

If the input is a component class name, search the workspace for the matching Angular component.

Identify:

- component TypeScript file
- template file, if present
- style file, if relevant
- existing spec file, if present
- related dependencies used by the component

### 2. Inspect the component before writing tests

Before creating or changing the spec file, inspect the component implementation.

Look for:

- constructor dependencies
- `inject(...)` dependencies
- injected tokens
- Angular Router usage
- signals
- inputs
- outputs
- observables
- forms
- lifecycle hooks
- template bindings
- child components
- custom elements
- conditional rendering
- service side effects

Also check nearby existing tests for project-specific testing style.

### 3. Create or update the spec file

Create or update the unit test next to the component under test.

Use the existing naming convention, usually:

```text
<component-name>.spec.ts
```

Do not create unrelated files.

Do not modify production code unless there is a clear production bug and the user explicitly asks for that change.

### 4. Use the Angular testing skills

Use `/angular-component-unit-testing` for:

- Angular 21 TestBed setup
- standalone component imports
- zoneless change detection
- router setup
- DOM assertions
- signal assertions
- component behavior tests

Use `/angular-test-mocking-coverage` for:

- service mocks
- injected token mocks
- observable mocks
- router mocks
- failure diagnosis
- coverage improvement
- rerunning tests after fixes

### 5. Run the tests

After creating or modifying the spec file, run:

```bash
npm run test:coverage
```

### 6. Fix failures

If the test command fails:

1. Inspect the actual error output.
2. Identify the root cause.
3. Fix the test or test setup.
4. Do not weaken meaningful assertions just to make tests pass.
5. Do not delete useful tests to hide failures.
6. Rerun:

```bash
npm run test:coverage
```

Continue until the command passes or there is a clear remaining issue that cannot be fixed safely.

### Preventing common TestBed / TypeScript errors

When generating specs, follow these rules to avoid the two common failures seen in this workspace:

- Destructure only what you use. Do NOT declare unused locals (for example don't write `const { component, fixture } = ...` if `fixture` is unused). The Angular compiler flags unused locals (TS6133).
- Do not call `TestBed.configureTestingModule(...)` more than once inside the same `it` block. If you need multiple scenarios, split them into separate `it` tests. This avoids the "test module has already been instantiated" error.
- Always add `afterEach(() => TestBed.resetTestingModule());` to specs so testbed state is cleaned between tests.
- If you must reconfigure TestBed in the same test, call `TestBed.resetTestingModule()` before re-calling `configureTestingModule` (prefer splitting instead).
- Prefer returning only values consumers will use from helpers (e.g., return `{ fixture, component }` but destructure only `component` when the fixture isn't needed).
- After generating a spec, run `ng test --no-watch` (or `npm run test:coverage`) and fix TypeScript/Angular compiler errors before reporting success.

Canonical `createComponent` helper

Include a `createComponent` helper in generated specs and follow this pattern so tests remain consistent and avoid TestBed misuse:

```ts
async function createComponent(MyComponent: any, providers: any[] = []) {
	TestBed.configureTestingModule({
		imports: [MyComponent],
		providers: [...providers],
	}).overrideComponent(MyComponent, {
		set: { template: '', imports: [] },
	});

	await TestBed.compileComponents();
	const fixture = TestBed.createComponent(MyComponent);
	return { fixture, component: fixture.componentInstance };
}

afterEach(() => TestBed.resetTestingModule());
```

Usage guidance

- If a test only needs the instance, destructure only the `component`: `const { component } = await createComponent(HeaderComponent);`.
- For different input states (auth logged in/out, router states), create separate `it` tests so `TestBed` is configured per-test.
- When stubbing `viewChild` signals or DOM native methods, assign minimal safe stubs, for example:

```ts
(component as any).avatarDropdown = () => ({ nativeElement: { hide: vi.fn() } });
```

These rules are mandatory for generated specs in this repository to prevent TypeScript/Angular test-time errors and to keep tests deterministic.

### 7. Verify coverage

Confirm that coverage for the target component or affected unit under test is at least 60%.

If coverage is below 60%:

1. Inspect the uncovered lines, branches, or functions.
2. Add meaningful behavior-based tests.
3. Mock dependencies as needed.
4. Rerun:

```bash
npm run test:coverage
```

Do not add low-value tests only to inflate coverage.

### 8. Final response

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

- `<Passed | Failed | Could not run>`

Coverage:

- Target component coverage: `<coverage result>`
- Required minimum: 60%

Notes:

- `<brief explanation of important mocks, assertions, fixes, or remaining issues>`
```

Do not claim success unless the command actually passed and the coverage requirement was met.