'use client'

import { Background, ParagraphText, PricingCards, TitleText } from 'components'
import { app } from 'config'
import React, { ComponentProps, ComponentPropsWithoutRef, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { BillingInterval, Price, Product } from 'types'
import { formatBillingInterval, getPricingCardProducts, parseBillingInterval } from 'utils'

import { useCreateCheckoutSession } from '@/billing/hooks/useCreateCheckoutSession'
import { routes } from '@/routes'

import { Container } from '../container/Container'
import { HighlightedText } from '../highlightedText/HighlightedText'
import { Section } from '../section/Section'

const DEFAULT_QUANTITY = 1

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]

type Props = ComponentPropsWithoutRef<'section'> & {
  products: Product[]
  prices: Price[]
}

export const Pricing = ({ className = '', products, prices, ...props }: Props) => {
  // Note: we set the billingInterval in a useEffect when the prices updates
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(BillingInterval.Month)
  const [billingIntervalOptions, setBillingIntervalOptions] = useState<BillingIntervalOption[]>([])

  const { mutate: createCheckoutSession, isLoading: createCheckoutSessionLoading } = useCreateCheckoutSession()

  const pricingCardsProducts = useMemo(
    () => getPricingCardProducts({ billingInterval, products, prices, loading: createCheckoutSessionLoading }),
    [billingInterval, createCheckoutSessionLoading, prices, products],
  )

  useEffect(() => {
    // when the prices update, set the selected billing interval and billing interval options
    if (prices?.length) {
      // get the unique billing intervals from the prices
      const billingIntervalOptions = [...new Set(prices?.map(price => price.interval))].map(billingInterval => ({
        label: formatBillingInterval(billingInterval),
        value: billingInterval,
      }))

      setBillingIntervalOptions(billingIntervalOptions)

      // set the selected billing interval to the first one
      setBillingInterval(billingIntervalOptions[0].value)
    }
  }, [prices])

  return (
    <Section
      id={routes.pricing.replace('/#', '')}
      aria-label={app.website.pricing.title}
      className={twMerge('relative', className)}
      {...props}
    >
      <Background className="absolute inset-0" />

      <div className="relative">
        <Container className="mb-16">
          <TitleText className="text-white dark:text-white">
            {app.website.pricing.title.replace(app.website.pricing.titleHighlighted, '')}

            {app.website.pricing.titleHighlighted && (
              <HighlightedText className="text-white dark:text-white">
                {app.website.pricing.titleHighlighted}
              </HighlightedText>
            )}
          </TitleText>

          <ParagraphText className="text-white dark:text-white">{app.website.pricing.subtitle}</ParagraphText>
        </Container>

        <PricingCards
          billingInterval={billingInterval}
          billingIntervalOptions={billingIntervalOptions}
          products={pricingCardsProducts}
          onBillingIntervalClick={newBillingIntervalValue => {
            setBillingInterval(parseBillingInterval(newBillingIntervalValue))
          }}
          onProductClick={id => {
            createCheckoutSession({
              priceId: id,
              quantity: DEFAULT_QUANTITY,
            })
          }}
        />
      </div>
    </Section>
  )
}
