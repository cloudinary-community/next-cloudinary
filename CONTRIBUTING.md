# Contributing
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

## Issues

### Creating an Issue
If you find a bug or problem, or maybe the documentation just doesn't make sense, please create an Issue to document the concern.

### Description
Please be descriptive in your Issue. The more info you provide, the more likely someone will be able to help.

### Code Examples
If you're experiencing an issue with the code, the most helpful thing you can do is create an example where you can reproduce the problem. This can be an open-source GitHub repo, a private repo you can share with the maintainers, a [CodeSandbox](https://codesandbox.io/), or anything to show the issue live with code alongside it.

## Pull Requests

### Creating a Pull Request
If you're able to fix an active Issue, feel free to create a new Pull Request addressing the problem. There are no guarantees that the code will be merged in "as is", but chances are, if you're willing to work with the maintainers, everyone will be able to come up with a solution everyone can be happy with.

### Description
Please be descriptive in your Pull Request. Whether big or small, it's important to be able to see the context of a change throughout the history of a project.

### Linking Fixed Issues
If the Pull Request is addressing an Issue, please link that issue by specifying the `Fixes [Issue #]` syntax within the Pull Request.

### Getting Added to All Contributors in the README.md
Once your Pull Request is successfully merged, feel free to tag yourself using the [All Contributors syntax](https://allcontributors.org/docs/en/bot/usage), which will create a new Pull Request requesting to add you in.

```
@all-contributors please add <username> for <contributions>
```

If your Pull Request is merged in and you're not added, please let someone know if you don't want to tag yourself, as we want to recognize everyone for their help.

## Releases

Releases are fully automated with [semantic-release](https://github.com/semantic-release/semantic-release). Every push to `main` (or `beta`, for prereleases) analyzes the commits since the last release, bumps the version, updates `CHANGELOG.md`, publishes to npm, and creates a GitHub release - no manual steps, and no npm token involved (publishing uses npm's [Trusted Publishers](https://docs.npmjs.com/trusted-publishers/) / OIDC).

Because of this, commit messages (including squash-merge commit titles) need to follow the [Angular commit convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format) - `fix: ...`, `feat: ...`, `chore: ...`, and so on. The type determines whether a release happens and what kind:

* `fix:` triggers a patch release
* `feat:` triggers a minor release
* a `BREAKING CHANGE:` footer triggers a major release
* other types (`chore:`, `docs:`, `ci:`, etc.) don't trigger a release on their own
