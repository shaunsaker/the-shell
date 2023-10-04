import { execCommand } from '../utils/execCommand'
import { args } from './args'

async function main() {
  const { release = '' } = await args()

  if (!release) {
    throw new Error('Please supply a release version!')
  }

  // ensure we have no uncommitted changes
  try {
    await execCommand('git diff --exit-code')
  } catch (error) {
    throw new Error('Please commit all changes before creating a release!')
  }

  await execCommand('git checkout master')

  // create release branch
  await execCommand(`git checkout -b release/${release}`)

  // update package.json version
  await execCommand(`npm version ${release}`, { cwd: '../..' })

  // push release branch
  await execCommand(`git push -u origin release/${release}`)

  // push release tag
  await execCommand(`git push -u origin v${release}`)
}

main()
