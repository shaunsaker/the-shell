import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button, Text } from '@tremor/react'
import { useLocation, useNavigate } from 'react-router-dom'

type Page = {
  name: string
  href: string
  isActive: (pathname: string) => boolean
}

type BreadcrumbsProps = {
  pages?: Page[]
}

export const Breadcrumbs = ({ pages }: BreadcrumbsProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {pages?.map((page, index) => {
          const isActive = page.isActive(location.pathname)

          return (
            <li key={page.name}>
              <div className="flex items-center space-x-4">
                <Button
                  variant="light"
                  color="gray"
                  disabled={isActive}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!isActive) {
                      navigate(page.href)
                    }
                  }}
                >
                  {page.name}
                </Button>

                {index !== pages.length - 1 && (
                  <Text>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Text>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
