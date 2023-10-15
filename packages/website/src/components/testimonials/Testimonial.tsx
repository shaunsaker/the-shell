import { Card, Heading, ParagraphText, Text } from 'components'
import Image from 'next/image'
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & {
  name: string
  title: string
  company: string
  testimonial: string
  image: string
}

export const Testimonial = ({
  className = '',
  name,
  title,
  company,
  testimonial,
  image,
  ...props
}: Props): ReactElement => {
  return (
    <Card className={twMerge('', className)} {...props}>
      <ParagraphText>{testimonial}</ParagraphText>

      <div className="relative mt-6 flex items-center justify-between border-t border-theme-border pt-6 dark:border-dark-theme-border">
        <div>
          <Heading>{name}</Heading>

          <Text className="mt-1">
            {title} at {company}
          </Text>
        </div>

        <div className="overflow-hidden rounded-full bg-theme-background dark:bg-dark-theme-background">
          <Image
            className="h-14 w-14 object-cover"
            src={image}
            alt={name}
            width={56}
            height={56}
          />
        </div>
      </div>
    </Card>
  )
}
