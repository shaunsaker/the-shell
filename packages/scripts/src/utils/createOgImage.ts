import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630
const ICON_SIZE = HEIGHT / 2

export const createOgImage = ({
  inputPath,
  outputPath,
  themeColor,
}: {
  inputPath: string
  outputPath: string
  themeColor: string
}) => {
  return sharp(inputPath)
    .flatten({ background: themeColor }) // add background color to the icon
    .resize({ width: ICON_SIZE, height: ICON_SIZE })
    .extend({
      top: Math.floor((HEIGHT - ICON_SIZE) / 2),
      bottom: Math.ceil((HEIGHT - ICON_SIZE) / 2),
      left: Math.floor((WIDTH - ICON_SIZE) / 2),
      right: Math.ceil((WIDTH - ICON_SIZE) / 2),
      background: themeColor, // add background color to the entire image
    })
    .png()
    .toFile(outputPath)
}
