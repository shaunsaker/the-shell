import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('userFirstName', '')

export const useUserFirstName = () => useAtom(atom)
