import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button, SmallText } from 'components'
import { app } from 'config'
import Link from 'next/link'
import React from 'react'

import { getPost } from '@/blog/api/getPost'
import { Author } from '@/components/author/Author'
import { Container } from '@/components/container/Container'
import { RenderMdx } from '@/components/renderMdx/RenderMdx'
import { Section } from '@/components/section/Section'
import { routes } from '@/routes'

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPost(slug)

  return (
    <Section aria-label={app.website.blog.title} className="min-h-screen mt-[63px]">
      <Container className="items-start text-left">
        <Link href={routes.blog}>
          <Button className="pl-0" variant="light">
            <ArrowLeftIcon className="w-6 h-6" /> Go back
          </Button>
        </Link>

        <div className="mb-8">
          <SmallText>{post.data.date}</SmallText>

          <Author image={post.data.authorImage} name={post.data.authorName} title={post.data.authorTitle} />
        </div>

        <RenderMdx {...post.source} />
      </Container>
    </Section>
  )
}
