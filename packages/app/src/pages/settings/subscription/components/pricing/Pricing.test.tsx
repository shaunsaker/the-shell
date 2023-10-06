import { fireEvent, render, screen } from '@testing-library/react'
import { PricingPlanInterval } from 'types'
import { describe, expect, it, vi } from 'vitest'

import { usePrices } from '@/billing/hooks/usePrices'
import { useProducts } from '@/billing/hooks/useProducts'
import { makePrice } from '@/billing/mocks/makePrice'
import { makeProduct } from '@/billing/mocks/makeProduct'
import { cleanUpAfterEach } from '@/test/cleanUpAfterEach'
import { MockAppProvider } from '@/test/MockAppProvider'
import { formatBillingInterval } from '@/utils/formatBillingInterval'

import { Pricing } from './Pricing'

const mocks = vi.hoisted(() => {
  return {
    usePrices: vi.fn<any, Partial<ReturnType<typeof usePrices>>>(() => ({ data: undefined, isLoading: false })),
    useProducts: vi.fn<any, Partial<ReturnType<typeof useProducts>>>(() => ({ data: undefined, isLoading: false })),
    createCheckoutSession: vi.fn(),
  }
})

vi.mock('@/billing/hooks/usePrices', () => ({
  usePrices: mocks.usePrices,
}))

vi.mock('@/billing/hooks/useProducts', () => ({
  useProducts: mocks.useProducts,
}))

vi.mock('@/billing/hooks/useCreateCheckoutSession', () => ({
  useCreateCheckoutSession: () => ({
    mutate: mocks.createCheckoutSession,
  }),
}))

describe('Pricing', () => {
  cleanUpAfterEach()

  it('renders ProductsNotFound', () => {
    render(
      <MockAppProvider>
        <Pricing />
      </MockAppProvider>,
    )

    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('renders the pricing cards', async () => {
    mocks.useProducts.mockReturnValue({ data: [makeProduct({})] })
    mocks.usePrices.mockReturnValue({ data: [makePrice({})] })

    render(
      <MockAppProvider>
        <Pricing />
      </MockAppProvider>,
    )

    expect(screen.queryByText('No products found')).not.toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })

  it('renders the correct prices', () => {
    mocks.useProducts.mockReturnValue({
      data: [
        makeProduct({
          id: '1',
        }),
        makeProduct({
          id: '2',
        }),
        makeProduct({
          id: '3',
        }),
      ],
    })

    mocks.usePrices.mockReturnValue({
      data: [
        makePrice({
          productId: '1',
          interval: PricingPlanInterval.Month,
          unitAmount: 1000,
        }),
        makePrice({
          productId: '2',
          interval: PricingPlanInterval.Month,
          unitAmount: 2000,
        }),
        makePrice({
          productId: '3',
          interval: PricingPlanInterval.Month,
          unitAmount: 3000,
        }),
        makePrice({
          productId: '1',
          interval: PricingPlanInterval.Year,
          unitAmount: 10000,
        }),
        makePrice({
          productId: '2',
          interval: PricingPlanInterval.Year,
          unitAmount: 20000,
        }),
        makePrice({
          productId: '3',
          interval: PricingPlanInterval.Year,
          unitAmount: 30000,
        }),
      ],
    })

    render(
      <MockAppProvider>
        <Pricing />
      </MockAppProvider>,
    )

    // test that the default Monthly prices are visible
    expect(screen.getByText('$10')).toBeInTheDocument()
    expect(screen.getByText('$20')).toBeInTheDocument()
    expect(screen.getByText('$30')).toBeInTheDocument()

    // test that the Yearly prices are not visible
    expect(screen.queryByText('$100')).not.toBeInTheDocument()
    expect(screen.queryByText('$200')).not.toBeInTheDocument()
    expect(screen.queryByText('$300')).not.toBeInTheDocument()

    // change the billing interval to Yearly
    fireEvent.click(screen.getByText(formatBillingInterval(PricingPlanInterval.Year)))

    // test that the Yearly prices are visible
    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('$200')).toBeInTheDocument()
    expect(screen.getByText('$300')).toBeInTheDocument()

    // test that the Monthly prices are not visible
    expect(screen.queryByText('$10')).not.toBeInTheDocument()
    expect(screen.queryByText('$20')).not.toBeInTheDocument()
    expect(screen.queryByText('$30')).not.toBeInTheDocument()
  })

  it('creates a checkout session', () => {
    mocks.useProducts.mockReturnValue({
      data: [
        makeProduct({
          id: '1',
        }),
        makeProduct({
          id: '2',
        }),
      ],
    })

    mocks.usePrices.mockReturnValue({
      data: [
        makePrice({
          id: '1',
          productId: '1',
          interval: PricingPlanInterval.Month,
          unitAmount: 1000,
        }),
        makePrice({
          id: '2',
          productId: '2',
          interval: PricingPlanInterval.Month,
          unitAmount: 1000,
        }),
      ],
    })

    render(
      <MockAppProvider>
        <Pricing />
      </MockAppProvider>,
    )

    const firstBuyButton = screen.getAllByText('Buy plan')[0]

    if (!firstBuyButton) {
      throw new Error('firstBuyButton is undefined')
    }

    fireEvent.click(firstBuyButton)

    expect(mocks.createCheckoutSession).toHaveBeenCalledWith({
      priceId: '1',
      quantity: 1,
    })

    const secondBuyButton = screen.getAllByText('Buy plan')[1]

    if (!secondBuyButton) {
      throw new Error('secondBuyButton is undefined')
    }

    fireEvent.click(secondBuyButton)

    expect(mocks.createCheckoutSession).toHaveBeenCalledWith({
      priceId: '2',
      quantity: 1,
    })
  })
})
