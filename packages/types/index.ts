/* USERS */
export type BillingAddress = {
  city: string
  line1: string
  line2?: string
  state: string
  country: string
  postalCode: string
}

export type PaymentMethod = {
  brand: string
  expMonth: number
  expYear: number
  last4: string
}

export type User = {
  id: string
  createdAt: string
  email: string
  firstName: string
  lastName: string
  billingAddress?: BillingAddress
  paymentMethod?: PaymentMethod
}

/* SUBSCRIPTION */
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
  metadata?: { freeTrialDays: number; teamPlan: boolean } | Record<string, string>
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
  firstName: string | null // as above
  lastName: string | null // as above
  createdAt: string
  email: string
  role: TeamMemberRole
  status: TeamMemberStatus
}

export type TeamWithMembers = Team & {
  members: TeamMember[]
}

/* FUNCTIONS */
export enum Functions {
  changeUserEmail = 'changeUserEmailFunction',
  createBillingPortalSession = 'createBillingPortalSessionFunction',
  createCheckoutSession = 'createCheckoutSessionFunction',
  deleteTeam = 'deleteTeamFunction',
  deleteUserAccount = 'deleteUserAccountFunction',
  inviteTeamMembers = 'inviteTeamMembersFunction',
  removeTeamMember = 'removeTeamMemberFunction',
  requestResetPassword = 'requestResetPasswordFunction',
  sendChangeEmailVerification = 'sendChangeEmailVerificationFunction',
  sendEmailVerification = 'sendEmailVerificationFunction',
  updateSubscriptionQuantity = 'updateSubscriptionQuantityFunction',
}

export type FunctionsMap = {
  [Functions.changeUserEmail]: {
    data: {
      oldEmail: string
      newEmail: string
    }
    response: {
      ok: true
    }
  }
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
      teamId: string
    }
    response: {
      ok: true
    }
  }
  [Functions.deleteUserAccount]: {
    data: object
    response: {
      ok: true
    }
  }
  [Functions.inviteTeamMembers]: {
    data: {
      teamId: string
      emails: string[]
    }
    response: {
      ok: true
    }
  }
  [Functions.removeTeamMember]: {
    data: {
      teamId: string
      teamMemberId: string
    }
    response: {
      ok: true
    }
  }
  [Functions.requestResetPassword]: {
    data: {
      email: string
      newPassword: string
      redirectUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.sendChangeEmailVerification]: {
    data: {
      oldEmail: string
      newEmail: string
      redirectUrl: string
    }
    response: {
      ok: true
    }
  }
  [Functions.sendEmailVerification]: {
    data: {
      email: string
      redirectUrl: string
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
