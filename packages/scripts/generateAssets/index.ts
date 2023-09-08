import * as path from 'path'

import { copyFile } from '../utils/copyFile'
import { createFavicon } from '../utils/createFavicon'
import { createPng } from '../utils/createPng'
import { ensureFileDirExists } from '../utils/ensureFileDirExists'

const CURRENT_WORKING_DIRECTORY = process.env.PWD || __dirname
const ROOT_PATH = path.join(CURRENT_WORKING_DIRECTORY, '..')
const APP_PATH = path.join(ROOT_PATH, './app')
const APP_PUBLIC_PATH = path.join(APP_PATH, './public')
const LOGO_PATH = path.join(ROOT_PATH, './common/logo.svg')

async function main(): Promise<void> {
  ensureFileDirExists(APP_PUBLIC_PATH)

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon.svg'),
  })

  await createFavicon({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './favicon.ico'),
  })

  await createPng({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './apple-touch-icon.png'),
    size: 180,
  })

  await createPng({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon-emails.png'),
    size: 64,
  })
}

main()
