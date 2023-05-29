/* eslint-disable no-console */
import { createRequire } from 'node:module'

import chalk from 'chalk'
import enquirer from 'enquirer'
import { execa } from 'execa'
import semver from 'semver'

const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)('../package.json').version

const preId =
  semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]
const inc = (i) => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const step = (msg) => console.log(chalk.cyan(msg))

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]

const release = async () => {
  console.log(`Current version: ${currentVersion}`)

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(i)})`)
      .concat(['custom']),
  })

  let targetVersion
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  process.env.TARGET_VERSION = targetVersion

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
    initial: true,
  })

  if (!yes) {
    return
  }

  // run tests before release
  step('\nRunning tests...')
  await run('vitest', ['--run'])

  // update all package versions and inter-dependencies
  step('\nUpdating version...')
  await run('npm', [
    'version',
    targetVersion,
    '-m',
    `build: release ${targetVersion}`,
    '--git-tag-version=false',
  ])

  // generate changelog
  await run(`npm`, ['run', 'changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await run('git', ['add', '-A'])
    await run('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // tag
  step('\nTag commit...')
  await run('git', ['tag', `v${targetVersion}`])
}

release().catch((err) => {
  console.error(err)
  process.exit(1)
})
