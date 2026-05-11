---
description: Generate and validate Angular unit tests for a component using Step 3 skills.
agent: agent
---

# Generate Angular Unit Test

Generate or update a unit test for the Angular component provided as input.

Apply these skills:

- `/angular-component-unit-testing`
- `/angular-test-mocking-coverage`

Target component input:

```text
${input:componentName:Enter the Angular component class name or component file path, for example AppComponent or src/app/app.component.ts}
```

## Objective

Create or update the unit test for the target Angular component and complete validation until the work is in a shippable state.

Use skills as the source of truth for:

- Angular 21 + Vitest test setup patterns
- mocking and dependency handling
- test execution and rerun flow
- failure diagnosis and repair loop
- coverage threshold and improvement strategy
- final reporting format

## Mandatory Workflow

1. Resolve the target component.
   - If input is a file path, use it directly.
   - If input is a class name, locate the matching Angular component.
   - Identify component source files and existing spec file if present.

2. Inspect the component before writing tests.
   - Review template and component behavior.
   - Identify dependencies, inputs/outputs, signals, router usage, observables, forms, and side effects.
   - Check nearby tests for local conventions.

3. Create or update the spec file.
   - Place it next to the component.
   - Follow existing naming conventions.
   - Keep changes scoped; do not create unrelated files.

4. Execute the full validate/fix cycle.
   - Follow `/angular-test-mocking-coverage` for command execution, failure handling, and coverage validation.

5. Return final results.
   - Use the reporting format defined by `/angular-test-mocking-coverage`.

Do not duplicate skill-level implementation rules inside this prompt.
