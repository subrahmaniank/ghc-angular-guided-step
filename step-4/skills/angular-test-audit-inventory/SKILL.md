---
name: angular-test-audit-inventory
description: Use this skill when auditing an Angular repository for components, matching components to spec files, identifying missing or weak unit tests, prioritizing test creation, and planning component-level coverage work.
---

# Angular Test Audit Inventory Skill

Use this skill when the task involves auditing Angular components and deciding which unit tests need to be created, updated, or skipped.

This skill is relevant for tasks such as:

- find all Angular components
- check which components have spec files
- identify components missing tests
- identify weak component tests
- prioritize components for test creation
- prepare a component test inventory
- plan repository-wide Angular test coverage work

## Primary Goal

Build a clear inventory of Angular components and their unit test status.

The inventory should guide the agent to create or update tests component by component.

## Discovery Rules

Search for Angular component files using patterns such as:

```text
*.component.ts
```

For each component, identify:

- component class name
- component file
- template file
- style file, if relevant
- nearby spec file
- existing test coverage evidence, if available

Expected spec file naming is usually one of:

```text
<component-name>.spec.ts
<component-name>.component.spec.ts
```

or another naming convention already used in the repository.

## Component-to-Spec Mapping

For each component file:

```text
src/app/example/example.component.ts
```

Look for nearby spec files such as:

```text
src/app/example/example.component.spec.ts
```

Also inspect nearby tests when naming differs.

Do not assume a component is untested until checking:

- same directory
- nearby feature directory
- existing test naming conventions
- barrel or routed component specs, if used by the project

## Status Categories

Assign each component one of these statuses:

```text
missing
exists-good-enough
exists-needs-update
exists-failing-or-suspicious
skip-with-reason
```

Use `missing` when:

- no matching or nearby spec file exists

Use `exists-good-enough` when:

- a spec file exists
- it has meaningful behavior-based tests
- it mocks required dependencies correctly
- there is no obvious need for updates

Use `exists-needs-update` when:

- the spec only checks component creation
- important behavior is untested
- service side effects are untested
- router behavior is untested
- signals are untested
- conditional rendering is untested
- observable states are untested
- coverage is likely below target

Use `exists-failing-or-suspicious` when:

- imports look wrong
- TestBed setup looks outdated
- standalone components are placed in `declarations`
- Jasmine syntax is used in a Vitest project
- required providers appear missing
- test assertions are brittle or meaningless

Use `skip-with-reason` when:

- the file is not a real Angular component
- the component is generated or deprecated
- the component is test-host-only
- the component is intentionally excluded
- the component has no meaningful logic and the user’s scope says to skip it

## Prioritization Rules

When there are many components, prioritize in this order:

1. components with no spec file
2. components with only a creation test
3. routed/page components
4. components with service dependencies
5. components with router dependencies
6. components with observable logic
7. components with signals, computed signals, or effects
8. components with inputs and outputs
9. components with conditional rendering
10. shared UI components used in many places

## Audit Output Format

Use this internal planning table:

```md
| Component | Component file | Spec file | Status | Action needed | Reason |
|---|---|---|---|---|---|
| AppComponent | src/app/app.component.ts | src/app/app.component.spec.ts | exists-needs-update | update | Router and service side effects need assertions |
```

For the final user-facing response, summarize rather than dumping a huge table unless the user asks for the full inventory.

## Inspection Checklist

Before deciding that a spec is good enough, check whether the component has:

- injected services
- injected tokens
- router usage
- signals
- computed signals
- effects
- inputs
- outputs
- observables
- forms
- lifecycle hooks
- service side effects
- template conditional rendering
- user interactions
- emitted events
- custom elements
- child components

A spec is weak if it does not test the important public behavior of the component.

## Good-Enough Criteria

A component spec is usually good enough when it:

- creates the component successfully
- configures TestBed correctly
- provides required services and tokens
- uses Vitest APIs in this repository
- uses standalone component imports correctly
- tests important public state
- tests meaningful rendered output
- tests important service side effects
- tests router behavior if relevant
- tests observable states if relevant
- avoids brittle implementation details

## Handoff to Other Skills

After identifying a component that needs creation or updates:

Use `/angular-component-unit-testing` for:

- TestBed setup
- standalone component testing
- zoneless change detection
- router testing
- signal assertions
- DOM assertions
- user interactions

Use `/angular-test-mocking-coverage` for:

- service mocks
- token mocks
- observable mocks
- coverage improvement
- test execution
- failure diagnosis
- rerunning coverage

## Guardrails

Do not edit tests during the audit phase unless the agent has moved into the creation/update phase.

Do not create a massive unrelated refactor.

Do not modify production code unless a real production bug is found and the user explicitly asks for that change.

Prefer incremental component-by-component improvements.
