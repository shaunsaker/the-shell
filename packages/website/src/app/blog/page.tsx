import { ParagraphText, TitleText } from 'components'
import { app } from 'config'
import React from 'react'

import { getPosts } from '@/blog/api/getPosts'
import { BlogPost } from '@/components/blogPost/BlogPost'
import { Columns } from '@/components/columns/Columns'
import { Container } from '@/components/container/Container'
import { Section } from '@/components/section/Section'

export default async function Page() {
  const posts = await getPosts()

  return (
    <Section className="min-h-screen mt-[63px]">
      <Container>
        <TitleText>{app.website.blog.title}</TitleText>

        <ParagraphText>{app.website.blog.subtitle}</ParagraphText>
      </Container>

      <Columns className="mt-16">
        {posts.map(post => (
          <li key={post.slug} className="mb-8">
            <BlogPost {...post} />
          </li>
        ))}
      </Columns>
    </Section>
  )
}
