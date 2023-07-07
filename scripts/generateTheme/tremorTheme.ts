// maps each tremor color to the corresponding tailwind default color
// e.g. in app.json, if baseColor is "teal", tremor.brand.faint color will map to tailwind's teal-50 color
export const tremorTheme = {
  // light mode
  tremor: {
    brand: {
      faint: {
        color: 'base',
        shade: '50',
      },
      muted: {
        color: 'base',
        shade: '200',
      },
      subtle: {
        color: 'base',
        shade: '400',
      },
      DEFAULT: {
        color: 'base',
        shade: '500',
      },
      emphasis: {
        color: 'base',
        shade: '700',
      },
      inverted: { color: 'white' },
    },
    background: {
      muted: {
        color: 'neutral',
        shade: '50',
      },
      subtle: {
        color: 'neutral',
        shade: '100',
      },
      DEFAULT: { color: 'white' },
      emphasis: {
        color: 'neutral',
        shade: '700',
      },
    },
    border: {
      DEFAULT: {
        color: 'neutral',
        shade: '200',
      },
    },
    ring: {
      DEFAULT: {
        color: 'neutral',
        shade: '200',
      },
    },
    content: {
      subtle: {
        color: 'neutral',
        shade: '400',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '500',
      },
      emphasis: {
        color: 'neutral',
        shade: '700',
      },
      strong: {
        color: 'neutral',
        shade: '900',
      },
      inverted: { color: 'white' },
    },
  },
  // dark mode
  'dark-tremor': {
    brand: {
      faint: {
        color: 'base',
        shade: '900',
      },
      muted: {
        color: 'base',
        shade: '950',
      },
      subtle: {
        color: 'base',
        shade: '800',
      },
      DEFAULT: {
        color: 'base',
        shade: '500',
      },
      emphasis: {
        color: 'base',
        shade: '400',
      },
      inverted: {
        color: 'neutral',
        shade: '950',
      },
    },
    background: {
      muted: {
        color: 'neutral',
        shade: '900',
      },
      subtle: {
        color: 'neutral',
        shade: '800',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '900',
      },
      emphasis: {
        color: 'neutral',
        shade: '300',
      },
    },
    border: {
      DEFAULT: {
        color: 'neutral',
        shade: '800',
      },
    },
    ring: {
      DEFAULT: {
        color: 'neutral',
        shade: '800',
      },
    },
    content: {
      subtle: {
        color: 'neutral',
        shade: '500',
      },
      DEFAULT: {
        color: 'neutral',
        shade: '400',
      },
      emphasis: {
        color: 'neutral',
        shade: '200',
      },
      strong: {
        color: 'neutral',
        shade: '50',
      },
      inverted: {
        color: 'neutral',
        shade: '900',
      },
    },
  },
}
