import { ChevronRightIcon } from '@heroicons/react/24/outline'

import app from '../../../../common/app.json'
import { NavigationItem } from '../../types'
import { Button } from '../button/Button'
import { Text } from '../text/Text'

type Props = {
  items: NavigationItem[]
  onClick: (href: string) => void
}

export const Breadcrumbs = ({ items, onClick }: Props) => {
  return (
    <nav className="flex" aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-4">
        {items?.map((item, index) => {
          const isActive = item.isActive
          const isLastBreadcrumb = index === items.length - 1

          return (
            <li key={item.name}>
              <div className="flex items-center space-x-4">
                <Button
                  variant="light"
                  color={app.neutralColor}
                  disabled={isActive || item.disabled}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!isActive && onClick) {
                      onClick(item.href)
                    }
                  }}
                >
                  {item.name}
                </Button>

                {!isLastBreadcrumb && (
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
