import path from 'path'

import { getMdx } from '@/mdx/getMdx'
import { BlogPost } from '@/types'

import { BLOG_POSTS_FOLDER } from './getPosts'

const validatePostData = (data: any): data is BlogPost['data'] => {
  if (typeof data.image !== 'string') {
    return false
  }

  if (typeof data.date !== 'string') {
    return false
  }

  if (typeof data.title !== 'string') {
    return false
  }

  if (typeof data.description !== 'string') {
    return false
  }

  if (typeof data.authorImage !== 'string') {
    return false
  }

  if (typeof data.authorName !== 'string') {
    return false
  }

  if (typeof data.authorTitle !== 'string') {
    return false
  }

  return true
}

export const getPost = async (slug: string) => {
  const mdx = await getMdx(path.join(process.cwd(), `${BLOG_POSTS_FOLDER}/${slug}.mdx`))

  if (!validatePostData(mdx.data)) {
    throw new Error(`Invalid post data: ${JSON.stringify(mdx.data)}`)
  }

  const post: BlogPost = {
    ...mdx,
    slug,
    data: mdx.data,
  }

  return post
}
