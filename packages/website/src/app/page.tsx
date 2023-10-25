import React from 'react'

import { getPrices } from '@/billing/api/getPrices'
import { getProducts } from '@/billing/api/getProducts'
import { CallToAction } from '@/components/callToAction/CallToAction'
import { Faqs } from '@/components/faqs/Faqs'
import { Hero } from '@/components/hero/Hero'
import { Pricing } from '@/components/pricing/Pricing'
import { PrimaryFeatures } from '@/components/primaryFeatures/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/secondaryFeatures/SecondaryFeatures'
import { Testimonials } from '@/components/testimonials/Testimonials'

export default async function Page() {
  const products = await getProducts()
  const prices = await getPrices()

  return (
    <>
      <Hero />

      <PrimaryFeatures />

      <SecondaryFeatures />

      <CallToAction />

      <Testimonials />

      <Pricing products={products} prices={prices} />

      <Faqs />
    </>
  )
}
