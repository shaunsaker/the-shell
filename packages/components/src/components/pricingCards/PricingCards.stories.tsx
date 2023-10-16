import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { PricingCards } from './PricingCards'

const meta = {
  title: 'PricingCards',
  component: PricingCards,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingCards>

export default meta

type BillingIntervalOption = ComponentProps<typeof PricingCards>['billingIntervalOptions'][0]
const billingIntervalOptions: BillingIntervalOption[] = [
  {
    value: 'monthly',
    label: 'Monthly',
  },
  {
    value: 'yearly',
    label: 'Yearly',
  },
]

type Product = ComponentProps<typeof PricingCards>['products'][0]
const products: Product[] = [
  {
    id: '1',
    title: 'Starter',
    description: 'For small teams',
    currency: 'USD',
    price: 1000,
    interval: 'month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    freeTrialDays: 30,
  },
  {
    id: '2',
    title: 'Pro',
    description: 'For medium teams',
    currency: 'USD',
    price: 2000,
    interval: 'month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    highlight: true,
  },
  {
    id: '3',
    title: 'Enterprise',
    description: 'For large teams',
    currency: 'USD',
    price: 3000,
    interval: 'month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  },
]

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    billingInterval: billingIntervalOptions[0].value,
    billingIntervalOptions,
    products,
    onBillingIntervalClick: (value: string) => {
      console.log(value)
    },
    onProductClick: (productId: string) => {
      console.log(productId)
    },
  },
}
