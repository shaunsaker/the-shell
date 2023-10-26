import { Background, Columns, ParagraphText, TitleText } from 'components'
import React from 'react'

import { getPosts } from '@/blog/api/getPosts'
import { BlogPost } from '@/components/blogPost/BlogPost'
import { Container } from '@/components/container/Container'
import { Section } from '@/components/section/Section'

export default async function Page() {
  const posts = await getPosts()

  return (
    <Section className="min-h-screen mt-[63px] relative">
      <Background variant="inverted" className="absolute inset-0" />

      <Container>
        <TitleText>Latest from the blog</TitleText>

        <ParagraphText>
          The ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and
          TypeScript.
        </ParagraphText>
      </Container>

      <Columns className="mt-16 relative">
        {posts.map(post => (
          <li key={post.slug}>
            <BlogPost {...post} />
          </li>
        ))}
      </Columns>
    </Section>
  )
}
