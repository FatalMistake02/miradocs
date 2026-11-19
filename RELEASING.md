# Publishing miradocs

Both npm packages are released together from `.github/workflows/release.yml`, following the same tag-based trusted publishing approach as rian. No npm publish token is stored in GitHub.

## One-time npm setup

npm requires a package to exist before you can add its trusted publisher. Bootstrap the first version of `miradocs` and `create-miradocs` with an interactive npm login and publish, then connect each package in its npm settings.

Use these trusted publisher settings for **both** packages:

| Field | Value |
| --- | --- |
| Provider | GitHub Actions |
| Organization or user | `FatalMistake02` |
| Repository | `miradocs` |
| Workflow filename | `release.yml` |
| Environment | Leave empty |
| Allowed actions | Allow direct publishing with `npm publish` |

The workflow file must already be pushed before configuring npm. New trusted publisher configurations must complete their first successful publish within two days. If a connection expires, recreate it before the next tag.

The GitHub repository and npm packages are public. Published npm packages contain only the files included by their package manifests. Trusted publication from this public repository can also generate npm provenance.

See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) and [npm trust](https://docs.npmjs.com/cli/v11/commands/npm-trust/) for npm account setup.

## Verify without publishing

Run the **Release** workflow manually in GitHub Actions. Manual runs test, build, pack, and install both packages, then upload the tarballs and checksums as workflow artifacts. They never publish to npm or create a GitHub release.

## Release from a tag

Push the commit you want to release, then create and push a version tag:

```sh
git tag v1.0.1
git push origin v1.0.1
```

The tag sets the versions of both packages and the starter's miradocs dependency during the release build. Tests and a fresh installation from the packed packages must pass before publishing. The framework is published first, followed by the creator. The private GitHub release receives both tarballs and checksums.

Stable tags such as `v1.0.1` publish to npm's `latest` channel. Prerelease tags such as `v1.1.0-beta.1` publish to `next` and create prereleases on GitHub. Tags must contain a complete version; build metadata is not supported.

## Documentation hosting

The same workflow builds the documentation from the tagged source and deploys it to [GitHub Pages](https://fatalmistake02.github.io/miradocs/) after a successful release, including prereleases. Manual workflow runs verify the Pages build without deploying it.

Enable GitHub Pages in the repository settings with **GitHub Actions** as the source. A private repository requires a plan that supports Pages, such as GitHub Pro. Configure the `github-pages` environment to allow release tags if deployment restrictions are enabled.

Local development keeps its root URL. The Pages build sets the `/miradocs/` base path and canonical site address separately. If the hosting address changes, set the repository variable `DOCS_SITE_URL` to the full site URL, including its path, and update the README link.

Each release uses a new version. A version already published to npm cannot be overwritten. Reruns skip a package only when its published integrity matches the tested tarball. If the first package published but the second failed, rerunning the same release can finish the second publish. A contents mismatch stops the release and requires a new version.
