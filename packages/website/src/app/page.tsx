import { app } from 'config'

import { CallToAction } from '@/components/callToAction/CallToAction'
import { Faqs } from '@/components/faqs/Faqs'
import { Hero } from '@/components/hero/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/primaryFeatures/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/secondaryFeatures/SecondaryFeatures'
import { Testimonials } from '@/components/testimonials/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />

      {app.website.primaryFeatures.features.length && <PrimaryFeatures />}

      {app.website.secondaryFeatures.features.length && <SecondaryFeatures />}

      <CallToAction />

      {app.website.testimonials.testimonials.length && <Testimonials />}

      <Pricing />

      {app.website.faqs.questions.length && <Faqs />}
    </>
  )
}
