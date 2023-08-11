import fs from 'fs'
import path from 'path'
import colors from 'tailwindcss/colors'

import app from '../../common/app.json'
import themeColors from '../../common/themeColors.json'
import { args } from './args'
import { themeColorShadeMap } from './themeColorShadeMap'

const INVALID_COLORS = ['inherit', 'current', 'transparent', 'black', 'white']

const getHexColorFromThemeColor = (
  baseColors:
    | string
    | {
        [key: string]: string
      },
  themeColor: {
    color: string
    shade?: string
  },
): string => {
  if (typeof baseColors === 'string') {
    throw new Error(`baseColor ${baseColors} is not a valid color`)
  }

  if (themeColor.color === 'white') {
    return '#fff'
  }

  const color = baseColors[themeColor.shade as keyof typeof baseColors]

  return color
}

async function main(): Promise<void> {
  const { baseColor = app.baseColor, neutralColor = app.neutralColor } = await args()

  if (INVALID_COLORS.includes(baseColor)) {
    throw new Error(`baseColor ${baseColor} is not a valid color`)
  }

  if (INVALID_COLORS.includes(neutralColor)) {
    throw new Error(`neutralColor ${neutralColor} is not a valid color`)
  }

  const baseColors = colors[baseColor as keyof typeof colors]

  if (!baseColors) {
    throw new Error(`baseColor ${baseColor} is not a valid color`)
  }

  const neutralColors = colors[neutralColor as keyof typeof colors]

  if (!neutralColors) {
    throw new Error(`neutralColor ${neutralColor} is not a valid color`)
  }

  let figmaColors: any = {}

  // for each color in themeColorShadeMap, convert it to tailwind's color
  Object.keys(themeColors).forEach(themeKey => {
    type ThemeKey = keyof typeof themeColors

    Object.keys(themeColors[themeKey as ThemeKey]).forEach(usageKey => {
      type UsageKey = keyof (typeof themeColors)[ThemeKey]

      const figmaKey = `${themeKey}/${usageKey}`
      figmaColors[figmaKey] = {}

      Object.keys(themeColors[themeKey as ThemeKey][usageKey as UsageKey]).forEach(variantKey => {
        type VariantKey = keyof (typeof themeColors)[ThemeKey][UsageKey]

        const themeColor = themeColorShadeMap[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey]
        const color = getHexColorFromThemeColor(themeColor.color === 'base' ? baseColors : neutralColors, themeColor)

        themeColors[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey] = color

        // set the Figma color where the theme and usage keys are joined by a slash
        figmaColors[figmaKey][variantKey] = color
      })
    })
  })

  // append the default tailwind colors to the figmaColors
  figmaColors = {
    ...figmaColors,
    ...colors,
  }

  // finally, write the new themeColors to themeColors.json
  fs.writeFileSync(path.join(__dirname, '../../common/themeColors.json'), JSON.stringify(themeColors, null, 2))

  // and baseColor and neutralColor to app.json
  fs.writeFileSync(
    path.join(__dirname, '../../common/app.json'),
    JSON.stringify({ ...app, baseColor, neutralColor }, null, 2),
  )

  fs.writeFileSync(path.join(__dirname, '../../common/figmaColors.json'), JSON.stringify(figmaColors, null, 2))
}

main()
