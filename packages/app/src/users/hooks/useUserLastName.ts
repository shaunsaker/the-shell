import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('userLastName', '')

export const useUserLastName = () => useAtom(atom)
