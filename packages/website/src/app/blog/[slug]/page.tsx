import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Button, SmallText } from 'components'
import Link from 'next/link'
import React from 'react'

import { getPost } from '@/blog/api/getPost'
import { getPosts } from '@/blog/api/getPosts'
import { Author } from '@/components/author/Author'
import { RenderMdx } from '@/components/renderMdx/RenderMdx'
import { Section } from '@/components/section/Section'
import { routes } from '@/routes'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map(post => ({
    slug: post.slug,
  }))
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPost(slug)

  return (
    <Section className="min-h-screen mt-[63px] items-center" variant="inverted" title={post.data.title}>
      <div className="flex flex-col gap-y-12">
        <Link href={routes.blog}>
          <Button className="pl-0" variant="light" icon={<ArrowLeftIcon />}>
            Go back
          </Button>
        </Link>

        <div>
          <SmallText>{post.data.date}</SmallText>

          <Author image={post.data.authorImage} name={post.data.authorName} title={post.data.authorTitle} />
        </div>

        <RenderMdx {...post.source} />
      </div>
    </Section>
  )
}
