import * as path from 'path'

import { copyFile } from '@/utils/copyFile'
import { createFavicon } from '@/utils/createFavicon'
import { createPng } from '@/utils/createPng'
import { ensureFileDirExists } from '@/utils/ensureFileDirExists'
import { log } from '@/utils/log'

const CURRENT_WORKING_DIRECTORY = process.env.PWD || __dirname
const ROOT_PATH = path.join(CURRENT_WORKING_DIRECTORY, '..')
const APP_PATH = path.join(ROOT_PATH, './app')
const APP_PUBLIC_PATH = path.join(APP_PATH, './public')
const APP_ASSETS_PATH = path.join(APP_PATH, './src/assets')
const COMPONENTS_PATH = path.join(ROOT_PATH, './components')
const COMPONENTS_ASSETS_PATH = path.join(COMPONENTS_PATH, './src/assets')
const WEBSITE_PATH = path.join(ROOT_PATH, './website')
const WEBSITE_PUBLIC_PATH = path.join(WEBSITE_PATH, './src/app')
const PATH_TO_CONFIG_MODULE = require.resolve('config')
const PATH_TO_CONFIG_FOLDER = path.join(PATH_TO_CONFIG_MODULE, '..')
const LOGO_PATH = path.join(PATH_TO_CONFIG_FOLDER, 'logo.svg')

async function main(): Promise<void> {
  log('Generating assets...')

  ensureFileDirExists(APP_PUBLIC_PATH)
  ensureFileDirExists(APP_ASSETS_PATH)

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_PUBLIC_PATH, './icon.svg'),
  })

  const APP_FAVICON_PATH = path.join(APP_PUBLIC_PATH, './favicon.ico')
  await createFavicon({
    inputPath: LOGO_PATH,
    outputPath: APP_FAVICON_PATH,
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

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(APP_ASSETS_PATH, './logo.svg'),
  })

  await copyFile({
    inputPath: LOGO_PATH,
    outputPath: path.join(COMPONENTS_ASSETS_PATH, './logo.svg'),
  })

  await copyFile({
    inputPath: APP_FAVICON_PATH,
    outputPath: path.join(WEBSITE_PUBLIC_PATH, './favicon.ico'),
  })

  log('Done ✅')
}

main()
