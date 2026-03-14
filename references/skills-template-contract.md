# Skills Template Contract

Use this contract for every file under `assets/templates/skills/`.

## Why

Ensure skills remain portable across agents, machines, and editors by avoiding vendor-specific command packaging formats.

## Required Front Matter

```yaml
---
name: <kebab-case-skill-name>
description: <one-line purpose>
version: <semver>
tags:
  - <tag>
  - <tag>
# optional:
# parameters:
#   <param-name>:
#     type: text|select|boolean|number
#     description: ...
#     required: true|false
#     default: ...
#     options: [...]
---
```

Field order must remain stable: `name`, `description`, `version`, `tags`, then optional `parameters`.

## Content Structure

Use a consistent section order:

1. `# <Skill Title>`
2. `## Inputs`
3. `## Procedure`
4. `## Output Format`
5. `## Rules`

Minor additions are allowed when necessary, but keep the base structure stable.

## Portability Rules

- Do not require a slash-command interface (for example `/skill-name`) to use the skill.
- Do not use packaging-only keys such as `packageId` and `packageVersion`.
- Keep instructions tool-agnostic and behavior-focused.
- Prefer placeholders (for example `{{scope}}`) over environment-specific paths.

## Project Header Alignment (Required During Scaffolding)

Before generating or updating skill files in a target repo, detect and align to the repo's existing skill-header style.

Alignment checklist:

- Description language and terminology (for example English vs Traditional Chinese)
- Parameter naming style (`scope` vs project-specific naming)
- Presence/absence of `parameters` block for simple skills
- Versioning policy for skills (for example default `1.0.0` or incremental)

If the target repo already has skills, new templates must follow that style unless the user explicitly asks to normalize it.

If no existing skills are present, use this contract's default front matter style.

## Skill Index Consistency

- `skills/README.md` should list every installed skill that AGENTS may route to.
- When scaffolding or updating skills, update the skill file first, then keep the index synchronized.
- Do not leave router-visible skills unlisted in the index.

## Compatibility Note

Existing templates that used `packageId/packageVersion` should be migrated to this contract.
Existing templates with mixed header styles should be normalized before broad rollout.
