import { ParagraphText, Title } from 'components'
import { app } from 'config'

import { routes } from '@/routes'

import { Columns } from '../columns/Columns'
import { Container } from '../container/Container'
import { Section } from '../section/Section'
import { Testimonial } from './Testimonial'

export function Testimonials() {
  return (
    <Section
      id={routes.testimonials.replace('/#', '')}
      aria-label={app.website.testimonials.title}
      className="bg-theme-background-muted dark:bg-dark-theme-background-muted"
    >
      <Container>
        <Title>{app.website.testimonials.title}</Title>

        <ParagraphText>{app.website.testimonials.subtitle}</ParagraphText>
      </Container>

      <Columns className="mt-16">
        {app.website.testimonials.testimonials.map((testimonial) => (
          <li key={testimonial.name} className="mb-8">
            <Testimonial
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
              image={testimonial.image}
            />
          </li>
        ))}
      </Columns>
    </Section>
  )
}
