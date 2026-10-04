# Reqall Cursor plugin

## Installation

Copy or merge `rules/reqall.mdc` into your project at `.cursor/rules/reqall.mdc`. Merge `.cursor/mcp.json` into the project MCP configuration without overwriting existing servers. These rules guide the agent; they do not install discovery hooks.

The JavaScript `detectProject(cwd?, prompt?)` export uses the vendored canonical
project-name policy, not the older dependency's basename fallback. The existing
`loadConfig` export still delegates to `@reqall/core`. Neither export registers a
Cursor discovery hook; rules guide the agent when it does not have a host binding.

The policy source is synchronized from `ReqallSystem/core` and checked using the
cross-repository tools in `ReqallSystem/plugins`. Build before using JavaScript
exports (`npm run build`); tests and npm packaging build the runtime automatically.

## Project naming

Reuse a host-bound project throughout recall and persistence; explicit operation arguments (including SLEEP) remain authoritative. Otherwise use `REQALL_PROJECT_NAME` / existing host setting → network Git origin → explicitly labelled `project_name` or `project` → nearest `.reqall.yml` / `.reqall.yaml` → nearest `package.json` / `go.mod` / `Cargo.toml` → exact path relative to a known workspace → `.machine/<short-lower-hostname>/<os-user>`. Preserve explicit identifiers; never guess from a basename or an unlabelled slash token. Route account-wide preferences deliberately to `.user`.

The installed instruction assets embed the full offline policy, including metadata limits and Git compatibility. Canonical reference: https://github.com/ReqallSystem/plugins/blob/main/doc/PROJECT_NAMING.md

## Verification

Run `npm test` to check installed instructions and `npm pack --dry-run` coverage.
