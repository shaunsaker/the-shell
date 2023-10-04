import yargs from 'yargs/yargs'

export const args = async () => {
  return await yargs(process.argv.slice(2)).options({
    release: {
      type: 'string',
      describe: 'createRelease: The release version to create following the pattern MAJOR.MINOR.PATCH, e.g. 1.1.2',
    },
  }).argv
}
