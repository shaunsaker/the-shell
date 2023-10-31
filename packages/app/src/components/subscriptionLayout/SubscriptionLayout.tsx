import { Loading } from 'components'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useHasActiveSubscription } from '@/billing/hooks/useHasActiveSubscription'
import { routes } from '@/router/routes'

export const SubscriptionLayout = () => {
  const { data: hasActiveSubscription, isLoading, isFetched } = useHasActiveSubscription()

  if (isLoading) {
    return <Loading />
  }

  if (isFetched && !hasActiveSubscription) {
    return <Navigate to={routes.settingsSubscription} />
  }

  return <Outlet />
}
