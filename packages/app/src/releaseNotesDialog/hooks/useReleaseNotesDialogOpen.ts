import { atom, useAtom } from 'jotai'

const releaseNotesDialogAtom = atom(false)

export const useReleaseNotesDialogOpen = () => useAtom(releaseNotesDialogAtom)
