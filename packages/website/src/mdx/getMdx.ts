import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export const getMdx = async (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8')
  const { data, content } = matter(fileContents)

  const source = await serialize(content)

  const mdx = {
    data,
    source,
  }

  return mdx
}
