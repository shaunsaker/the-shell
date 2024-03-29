import path from 'path'
import React from 'react'

import { RenderMdx } from '@/components/renderMdx/RenderMdx'
import { Section } from '@/components/section/Section'
import { getMdx } from '@/mdx/getMdx'

export default async function PrivacyPage() {
  const mdx = await getMdx(path.join(process.cwd(), 'src/app/privacy/page.mdx'))

  return (
    <Section className="min-h-screen mt-[63px] items-center" variant="inverted" title="Privacy">
      <RenderMdx className="mt-16" {...mdx.source} />
    </Section>
  )
}
