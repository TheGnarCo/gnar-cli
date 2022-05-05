## PUBLISHING

### Overview

This package is published to two places: the NPM registry, and Homebrew. NPM is considered the source of truth for our "latest version".

The NPM version page can be found [here](https://www.npmjs.com/package/gnar-cli), and the repo containing the Homebrew Formula is [here](https://github.com/TheGnarCo/homebrew-gnar).

### Publishing a new Version

This repo uses a Github Workflow, `publish.yml`, to handle most of the tasks automatically.

In order to publish using the Github Workflow:

1. Create a pull request where you incremenet the `package.json` version. (This doesn't have to be the only thing in the PR, but I do recommend it be the only thing in the PR)
1. Merge this PR in to main. (Pushing this commit to main is what triggers the `publish` workflow. It won't get very far if there isn't an update to `package.json`. TODO: Make this cancel out earlier so we don't build and run tests!)
1. The Workflow will now do most of the NPM and git related work for you!

It will:

- Build and publish the new version to NPM
- Build and compress the Binary of the file
- Create a Github tag and release for the new version (complete with automatic changelog)
- Upload the compressed binary (along with its SHA) to the new release
- Create a new PR in the [Homebrew Formula](https://github.com/TheGnarCo/homebrew-gnar) repo with these changes
