import { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type PageLayoutProps = HTMLProps<HTMLDivElement>

export const PageLayout = ({ className = '', ...props }: PageLayoutProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'h-full overflow-y-auto px-6 py-8 lg:px-8 lg:py-12 bg-tremor-background-muted dark:bg-dark-tremor-background-muted',
        className,
      )}
      {...props}
    />
  )
}
