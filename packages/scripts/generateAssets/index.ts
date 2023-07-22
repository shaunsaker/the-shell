import * as path from 'path'

import { copyFile } from '../utils/copyFile'
import { createFavicon } from '../utils/createFavicon'
import { createPng } from '../utils/createPng'
import { ensureFileDirExists } from '../utils/ensureFileDirExists'

const CURRENT_WORKING_DIRECTORY = process.env.PWD || __dirname
const ROOT_PATH = path.join(CURRENT_WORKING_DIRECTORY, '..')
const APP_PATH = path.join(ROOT_PATH, './app')
const APP_PUBLIC_PATH = path.join(APP_PATH, './public')
const APP_ASSETS_PATH = path.join(APP_PATH, './src/assets')
const LOGO_PATH = path.join(ROOT_PATH, './common/logo.svg')

async function main(): Promise<void> {
  ensureFileDirExists(APP_PUBLIC_PATH)

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon.svg'),
  })

  ensureFileDirExists(APP_ASSETS_PATH)

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_ASSETS_PATH, './logo.svg'),
  })

  await createFavicon({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './favicon.ico'),
  })

  await createPng({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon-512.png'),
    size: 512,
  })

  await createPng({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon-192.png'),
    size: 192,
  })

  await createPng({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './apple-touch-icon.png'),
    size: 180,
  })
}

main()
