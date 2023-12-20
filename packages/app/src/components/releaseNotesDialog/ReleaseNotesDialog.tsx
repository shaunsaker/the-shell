import { Button, Dialog, HeadingText, NumberedList } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { formatDate } from 'utils'

import changelog from '../../../../../CHANGELOG.md?raw'

// lovely overly specific hackiness to parse the changelog without having to render markdown
const VERSION = changelog
  .split('\n')[0]
  .split(' ')[1]
  .replace(/[\[\]]/g, '')
  .split('(')[0]
const RELEASE_DATE = formatDate(changelog.split('\n')[0].split(' ')[2].split('(')[1].replace(')', ''))
const FIXES: string[] = changelog
  .split('### Bug Fixes')[1]
  .split('### Features')[0]
  .split('\n')
  .slice(2, -1)
  .filter(Boolean)
  .map(fix => `${fix.replace('* ', '').split(' ([')[0]}.`)
const FEATURES: string[] = changelog
  .split('### Features')[1]
  .split('\n')
  .slice(2, -1)
  .filter(Boolean)
  .map(feature => `${feature.replace('* ', '').replaceAll('**', '').split(' ([')[0]}.`)

type Props = ComponentPropsWithoutRef<typeof Dialog>

export const ReleaseNotesDialog = ({ onClose, ...dialogProps }: Props) => {
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <Dialog.Header title="Release Notes" description={`v${VERSION} - ${RELEASE_DATE}`} />

      {FIXES.length ? (
        <div className="space-y-2">
          <HeadingText>Fixes</HeadingText>

          <NumberedList>
            {FIXES.map((fix, index) => (
              <NumberedList.Item key={fix} number={index + 1}>
                {fix}
              </NumberedList.Item>
            ))}
          </NumberedList>
        </div>
      ) : null}

      {FEATURES.length ? (
        <div className="space-y-2">
          <HeadingText>Features</HeadingText>

          <NumberedList>
            {FEATURES.map((feature, index) => (
              <NumberedList.Item key={feature} number={index + 1}>
                {feature}
              </NumberedList.Item>
            ))}
          </NumberedList>
        </div>
      ) : null}

      <Dialog.Actions>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  )
}
