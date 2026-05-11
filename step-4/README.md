# step 4 - agent mode (repository-wide test generation)

Step 4 demonstrates using a dedicated agent to orchestrate end-to-end Angular unit test work across multiple components.

## Files in this step

- Agent: `agents/angular-test-coverage-agent.agent.md`
- Skills:
  - `skills/angular-test-audit-inventory/SKILL.md`
  - `skills/angular-component-unit-testing/SKILL.md`
  - `skills/angular-test-mocking-coverage/SKILL.md`

## Validation issues found (agent + skills)

- There is overlap between `angular-component-unit-testing` and `angular-test-mocking-coverage` (some guidance is repeated across both skills).
- The agent and skills both describe workflow stages (audit/create/fix/report), which can create duplicated instructions.
- The audit skill uses qualitative status labels (`exists-good-enough`, `exists-needs-update`) without strict scoring criteria, so classification can vary between runs.
- The coverage target is clear (60%), but scope is broad for repository-wide execution and may need batching guidance in usage prompts.
- The agent uses generic orchestration language while skills carry detailed implementation constraints; this is workable but can produce verbose outputs unless prompts enforce concise reporting.

## Responsibility split (recommended)

- Agent = orchestration only (audit -> prioritize -> implement -> validate -> report).
- Skills = implementation details (Angular test setup, mocking, failure repair, and coverage checks).

## Suggested manual prompt for Copilot Agent

```text
Use angular-test-coverage-agent to audit Angular components, create missing specs, update weak or failing specs, run npm run test:coverage, fix failures, and ensure at least 60% coverage for components worked on. Keep reporting concise: audit counts, files changed, command run, status, and coverage summary.
```

## Optional scoped prompt (single component)

```text
generate and validate unit tests for the project.
```
