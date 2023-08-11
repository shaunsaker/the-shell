import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const PageLayout = ({ className = '', ...props }: Props): ReactElement => {
  return (
    <div
      className={twMerge(
        'bg-theme-background-muted dark:bg-dark-theme-background-muted h-full overflow-y-auto px-6 py-8 lg:px-8 lg:py-12',
        className,
      )}
      {...props}
    />
  )
}
