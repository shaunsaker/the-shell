import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import Logo from '../../assets/logo.svg'
import { useNavigation } from '../../store/navigation/useNavigation'

export default function Sidebar() {
  const [navigation] = useNavigation()

  return (
    <div className="flex w-72 flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-teal-600 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Logo className="h-8 w-auto fill-white" />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={twMerge(
                        item.current ? 'bg-teal-700 text-white' : 'text-teal-200 hover:bg-teal-700 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}
                    >
                      <item.icon
                        className={twMerge(
                          item.current ? 'text-white' : 'text-teal-200 group-hover:text-white',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
