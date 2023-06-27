import { ReactElement, ReactNode } from 'react'

type PageContentProps = {
  children?: ReactNode
}

export const PageContent = ({ children }: PageContentProps): ReactElement => {
  return <div className="h-full overflow-y-auto px-6 py-8 lg:px-8 lg:py-12">{children}</div>
}
