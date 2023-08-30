/* USERS */
export type User = {
  id: string
  createdAt: string
  email: string
  firstName: string
  lastName: string
  billingAddress?: {
    city: string
    country: string
    line1: string
    line2: string
    postalCode: string
    state: string
  }
  paymentMethod?: {
    brand: string
    expMonth: number
    expYear: number
    last4: string
  }
}

/* BILLING */
export type Customer = {
  id: string
  stripeCustomerId: string
}

export type Product = {
  id: string
  name: string
  description: string
  active: boolean
  image: string
  metadata?: { freeTrialDays: number } | Record<string, string>
}

export enum PricingType {
  OneTime = 'oneTime',
  Recurring = 'recurring',
}

export enum PricingPlanInterval {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export type Price = {
  id: string
  productId: string
  active: boolean
  currency: string
  type: PricingType
  interval: PricingPlanInterval
  intervalCount: number
  trialPeriodDays: number
  unitAmount: number
  metadata: Record<string, string>
}

export enum SubscriptionStatus {
  Trialing = 'trialing',
  Active = 'active',
  Canceled = 'canceled',
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  PastDue = 'past_due',
  Unpaid = 'unpaid',
  Paused = 'paused',
}

export type Subscription = {
  id: string
  userId: string
  priceId: string
  quantity: number
  status: SubscriptionStatus
  created: string
  trialStart: string
  trialEnd: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAt: string
  cancelAtPeriodEnd: boolean
  canceledAt: string
  endedAt: string
  metadata: Record<string, string>
}

/* TEAMS */
export type Team = {
  id: string
  name: string
  createdAt: string
  ownerId: string
}

export enum TeamMemberRole {
  Admin = 'admin',
  Member = 'member',
}

export enum TeamMemberStatus {
  Active = 'active',
  Invited = 'invited',
}

export type TeamMember = {
  id: string
  teamId: string
  userId: string | null // the userId is null if the user does not have an account yet
  firstName: string
  lastName: string
  createdAt: string
  email: string
  role: TeamMemberRole
  status: TeamMemberStatus
}

/* FUNCTIONS */
export enum Functions {
  createBillingPortalSession = 'createBillingPortalSessionFunction',
  createCheckoutSession = 'createCheckoutSessionFunction',
  deleteTeam = 'deleteTeamFunction',
  deleteUserAccount = 'deleteUserAccountFunction',
  inviteTeamMembers = 'inviteTeamMembersFunction',
  removeTeamMember = 'removeTeamMemberFunction',
  resendTeamInvite = 'resendTeamInviteFunction',
  updateSubscriptionQuantity = 'updateSubscriptionQuantityFunction',
}

export type FunctionsMap = {
  [Functions.createBillingPortalSession]: {
    data: {
      returnUrl: string
    }
    response: {
      url: string
    }
  }
  [Functions.createCheckoutSession]: {
    data: {
      priceId: string
      quantity: number
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, string>
    }
    response: {
      url: string
    }
  }
  [Functions.deleteTeam]: {
    data: {
      siteUrl: string
      teamId: string
    }
    response: {
      ok: true
    }
  }
  [Functions.deleteUserAccount]: {
    data: {
      siteUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.inviteTeamMembers]: {
    data: {
      siteUrl: string
      teamId: string
      emails: string[]
      redirectTo: string
    }
    response: {
      ok: true
    }
  }
  [Functions.removeTeamMember]: {
    data: {
      siteUrl: string
      teamId: string
      teamMemberId: string
    }
    response: {
      ok: true
    }
  }
  [Functions.resendTeamInvite]: {
    data: {
      teamId: string
      email: string
      redirectTo: string
    }
    response: {
      ok: true
    }
  }
  [Functions.updateSubscriptionQuantity]: {
    data: { quantity: number }
    response: {
      ok: true
    }
  }
}
