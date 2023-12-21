'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = MDXRemoteProps & ComponentPropsWithoutRef<'div'>

export const RenderMdx = ({ className = '', ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'prose dark:prose-invert prose-headings:font-display prose-headings:font-semibold prose-headings:text-theme-content prose-a:text-theme-brand hover:prose-a:text-theme-brand-emphasis dark:prose-headings:text-dark-theme-content',
        className,
      )}
    >
      <MDXRemote {...props} />
    </div>
  )
}
