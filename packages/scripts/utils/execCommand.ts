import spawnAsync from '@expo/spawn-async'

export const execCommand = async (command: string): Promise<void> => {
  const parts = command.split(' ')
  const process = parts[0]
  const args = [...parts.slice(1, parts.length)]

  const mainProcess = spawnAsync(process, args)

  await mainProcess
}
