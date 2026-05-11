Generate and validate unit tests for ProductCardComponent.

The component has:
- injected services
- router usage
- observable data
- conditional rendering
- no current spec file or weak coverage

The agent must:
1. Inspect the component and template.
2. Identify dependencies.
3. Create or update the spec file.
4. Mock services and tokens.
5. Configure TestBed correctly.
6. Run npm run test:coverage.
7. Fix test failures.
8. Add more tests if coverage is below 60%.
9. Report files changed, command run, status, and coverage.

``
Use angular-test-coverage-agent to audit all Angular components, create missing specs, update weak specs, run npm run test:coverage, fix failures, and ensure at least 60% coverage for the components worked on.
``