# step 3 - skills-driven testing

* Use the Step 3 prompt file: `prompts/generate-angular-unit-test.prompt.md`.
* Ensure both skills are available to Copilot/agent:
  * `skills/angular-component-unit-testing/SKILL.md`
  * `skills/angular-test-mocking-coverage/SKILL.md`
* Run the prompt with a target component (example: `AppComponent` or `src/app/app.component.ts`).

Manual prompt text:

```
/generate-angular-unit-test componentName=card.component.ts
```
