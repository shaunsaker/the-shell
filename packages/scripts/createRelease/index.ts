import { execCommand } from '../utils/execCommand'
import { args } from './args'

const SHOW_LOGS = true

async function main() {
  const { release = '' } = await args()

  if (!release) {
    throw new Error('Please supply a release version!')
  }

  await execCommand('git checkout master', SHOW_LOGS)

  // update package.json version and create release commit and tag
  await execCommand(`npm version ${release}`, SHOW_LOGS)

  // push release tag
  await execCommand(`git push -u origin v${release}`, SHOW_LOGS)

  // push release commit
  await execCommand(`git push -f`, SHOW_LOGS)
}

main()
