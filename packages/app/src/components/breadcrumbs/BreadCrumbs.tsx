import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { Button } from '../button/Button'
import { Text } from '../text/Text'

export type NavigationItem = {
  name: string
  href: string
  isActive: boolean
}

type Props = {
  items: NavigationItem[]
  onClick?: (href: string) => void
}

export const Breadcrumbs = ({ items, onClick }: Props) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items?.map((item, index) => {
          const isActive = item.isActive

          return (
            <li key={item.name}>
              <div className="flex items-center space-x-4">
                <Button
                  variant="light"
                  color="gray"
                  disabled={isActive}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!isActive && onClick) {
                      onClick(item.href)
                    }
                  }}
                >
                  {item.name}
                </Button>

                {index !== items.length - 1 && (
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
