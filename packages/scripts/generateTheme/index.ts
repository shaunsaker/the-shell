import { app, themeColors } from 'common'
import fs from 'fs'
import path from 'path'
import colors from 'tailwindcss/colors'

import { args } from './args'
import { tremorTheme } from './tremorTheme'

const INVALID_COLORS = ['inherit', 'current', 'transparent', 'black', 'white']

const getTailwindColorFromTremorThemeColor = (
  baseColors:
    | string
    | {
        [key: string]: string
      },
  tremorThemeColor: {
    color: string
    shade?: string
  },
): string => {
  if (typeof baseColors === 'string') {
    throw new Error(`baseColor ${baseColors} is not a valid color`)
  }

  if (tremorThemeColor.color === 'white') {
    return '#fff'
  }

  const color = baseColors[tremorThemeColor.shade as keyof typeof baseColors]

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

  // for each color in tremorTheme, convert it to tailwind's color
  Object.keys(themeColors).forEach(themeKey => {
    type ThemeKey = keyof typeof themeColors

    Object.keys(themeColors[themeKey as ThemeKey]).forEach(usageKey => {
      type UsageKey = keyof (typeof themeColors)[ThemeKey]

      Object.keys(themeColors[themeKey as ThemeKey][usageKey as UsageKey]).forEach(variantKey => {
        type VariantKey = keyof (typeof themeColors)[ThemeKey][UsageKey]

        const tremorThemeColor = tremorTheme[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey]
        const color = getTailwindColorFromTremorThemeColor(
          tremorThemeColor.color === 'base' ? baseColors : neutralColors,
          tremorThemeColor,
        )

        themeColors[themeKey as ThemeKey][usageKey as UsageKey][variantKey as VariantKey] = color
      })
    })
  })

  // finally, write the new themeColors to themeColors.json
  console.log(path.join(__dirname, '../../themeColors.json'))
  fs.writeFileSync(path.join(__dirname, '../../common/themeColors.json'), JSON.stringify(themeColors, null, 2))

  // and baseColor and neutralColor to app.json
  fs.writeFileSync(
    path.join(__dirname, '../../common/app.json'),
    JSON.stringify({ ...app, baseColor, neutralColor }, null, 2),
  )
}

main()
