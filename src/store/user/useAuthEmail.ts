import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('authEmail', '')

export const useAuthEmail = () => useAtom(atom)
