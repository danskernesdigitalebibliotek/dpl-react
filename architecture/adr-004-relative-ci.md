# Architecture Decision Record: RelativeCI

## Context

Staying informed about how the size of the JavaScript we require browsers to
download to use the project plays an important part in ensuring a performant
solution.

We currently have no awareness of this in this project and the result surfaces
down the line when the project is integrated with [the CMS](dpl-cms), which is
tested with Lighthouse.

To address this we want a solution that will help us monitor the changes to the
size of the bundle we ship for each PR.

## Decision

We add integration to [RelativeCI](https://relative-ci.com/) to the project.
RelativeCI supports our primary use case and has a number of qualities which we
value:

- Support for GitHub actions and reporting as GitHub status checks
- [Support for fork-based development workflows](https://relative-ci.com/documentation/setup/agent/github-action/#workflow_run-event)
- A free tier for open source projects
- Other types of analysis e.g. duplicate packages, continual monitoring

## Alternatives considered

### [Bundlewatch](https://github.com/bundlewatch/bundlewatch)

Bundlewatch and its ancestor, [bundlesize](https://github.com/siddharthkp/bundlesize)
combine a CLI tool and a web app to provide bundle analysis and feedback on
GitHub as status checks.

These solutions no longer seem to be actively maintained. There are [several](https://github.com/bundlewatch/bundlewatch/issues/423)
[bugs](https://github.com/bundlewatch/bundlewatch/issues/422) that would affect
us and fixes remain unmerged. The project relies on a custom secret instead of
`GITHUB_TOKEN`. This makes supporting our fork-based development workflow
harder.

### [Bundle comparison](https://github.com/marketplace/actions/bundle-comparison)

This is a GitHub Action which can be used in configurations where statistics
for two bundles are compared e.g. for the base and head of a pull request. This
results in a table of changes displayed as a comment in the pull request.
This is managed using `GITHUB_TOKEN.`

## Status

Accepted.

## Consequences

- We can determine the effect of adding a new JavaScript library to our project
- We add another dependency to a third party system
