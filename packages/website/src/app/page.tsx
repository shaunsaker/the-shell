import { CallToAction } from '@/components/callToAction/CallToAction'
import { Faqs } from '@/components/faqs/Faqs'
import { Hero } from '@/components/hero/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/primaryFeatures/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/testimonials/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />

      <PrimaryFeatures />

      <SecondaryFeatures />

      <CallToAction />

      <Testimonials />

      <Pricing />

      <Faqs />
    </>
  )
}
