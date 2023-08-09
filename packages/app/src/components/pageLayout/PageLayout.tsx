import { HTMLProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type PageLayoutProps = HTMLProps<HTMLDivElement>

export const PageLayout = ({ className = '', ...props }: PageLayoutProps): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-tremor-background-muted dark:bg-dark-tremor-background-muted h-full overflow-y-auto px-6 py-8 lg:px-8 lg:py-12',
        className,
      )}
      {...props}
    />
  )
}
