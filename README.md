# Ultimate B2B SAAS Boilerplate

[![Build](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c8c1ba1d-4e53-4628-bbc5-dfb539f1fca1/deploy-status)](https://app.netlify.com/sites/stunning-manatee-5e7d37/deploys)

---

## What is it?

The ultimate boilerplate for building SAAS applications with React, Supabase, Stripe, Tailwind CSS and TypeScript. 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

Transform `15 days` of development into `1 hour` 🚀

You can see me in action [here](https://ultimate-b2b-saas-boilerplate.netlify.app/).

TODO: SS add a video of project setup in action

---

## What's in the box?

- [Typescript](https://www.typescriptlang.org/) 📘
- [React](https://reactjs.org/) ⚛️
- [tailwindcss](https://tailwindcss.com/) for super easy styling 🎨
- [vite](https://vitejs.dev/) for blazingly fast development 🚀
- [Supabase](https://supabase.com/) for the backend ⚡️
- Auth flows, dashboard and settings management ✅
- [Stripe](https://stripe.com/) integration ([that actually works](https://github.com/vercel/nextjs-subscription-payments/issues)) 💳
- [Netlify](https://www.netlify.com/) deployment 🛰️
- [react-router-dom](https://reactrouter.com/en/main) for routing with a pre-configured Router 🧭
- [react-query](https://tanstack.com/query/latest/) for declarative query management 🦅
- [jotai](https://jotai.org/) for super simple state management 👻
- [tremor](https://www.tremor.so/) and [headless UI](https://headlessui.com/) components 🔀
- [framer-motion](framer.com/motion/) animations 🎬
- Automatic light and dark modes 🌓
- Mobile friendly 📱
- Looks ~~good~~ **farking beautiful** out of the box ✨
- [Mixpanel](https://mixpanel.com/) for analytics 📊
- [Sentry](https://sentry.io/) for error logging 🪲
- [prettier](https://prettier.io/) for consistent formatting 💅
- [eslint](https://eslint.org/) for linting 🕵️‍♂️
- [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) for staged linting 🚫💩
- [Github Actions](https://github.com/features/actions) for CI running `lint`, `test` and `build` on every commit 🔄
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for integration testing 🐙
- [Cypress](https://www.cypress.io/) for E2E testing 🌲
- [vitest](https://github.com/vitest-dev/vitest) for testing 🔎
- [Asset and theme generation](#generating-public-assets) 🖼️
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for svg support 🔗
- [react-hot-toast](https://react-hot-toast.com/) for easy to use toast notifications 🍞

---

## Setup

### Prequisites

- [git](https://git-scm.com/downloads)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Node.js](https://nodejs.org/en)
- [Supabase account](https://supabase.com/dashboard/sign-up)
- [Supabase cli](https://supabase.com/docs/guides/cli#installation)
- [Stripe account](https://dashboard.stripe.com/register)
- [Stripe cli](https://stripe.com/docs/stripe-cli#install)
- [Netlify account](https://app.netlify.com/teams/shaunsaker/overview)
- [Github cli](https://github.com/cli/cli#installation)

### Basic Setup

1. Clone the project:

```
git clone https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate.git PROJECT_NAME
cd PROJECT_NAME
yarn
```

2. Create a new project in Github and push.

```
git add .
git commit -m "Init"
git remote add origin NEW_GITHUB_REMOTE
git push -u origin master
```

3. The default branch, `master` will be used for production deployments. Therefore, we need to create a branch for staging, e.g. `develop`:

```
git checkout -b develop
git push -u origin develop
```

---

### Make it your own

1. Update `app.json` with your app name, description and support email.

2. Generate your theme colors where `baseColor` and `themeColor` are any of the [tailwind colors](https://tailwindcss.com/docs/customizing-colors):

```
yarn gen:theme --baseColor teal --neutralColor gray
```

3. Update `./src/assets/logo.svg` with your logo. If you don't have a logo, just grab an icon from https://heroicons.com/ and move on with life. It should be a **square svg**, size does not count in this case 😉

4. Run the script:

```
yarn gen:assets
```

And boom 💣🎆, you have all the optimised public assets you'll need 😎✅

Here it is in action:

![Generating assets](https://github.com/shaunsaker/ultimate-react-boilerplate/blob/master/assets/generate-assets.gif?raw=true)

---

### Setup Supabase

1. Login to the Supabase cli

```
supabase login
```

2. Create Supabase projects for staging and production:

```
supabase projects create PROJECT_NAME-staging -i
supabase projects create PROJECT_NAME-production -i
```

Note your staging and production project ids and db passwords, you will use them later.

3. Start the Supabase container:

```
supabase start
```

4. Copy the env files:

```
cp .env.example .env.local
```

7. Grab your Supabase local `API URL` and `anon key` and pop them into `.env.local`:

```
supabase status
```

8. Setup your local Supabase db:

```
yarn db:reset
```

9. [Create a Supabase access token](https://supabase.com/dashboard/account/tokens).

10. Add your Supabase access token (obtained above) and db passwords and project ids (obtained in step 2) to your Github repo:

```
gh auth login
gh secret set SUPABASE_ACCESS_TOKEN --body "VALUE"
gh secret set SUPABASE_DB_PASSWORD_STAGING --body "VALUE"
gh secret set SUPABASE_PROJECT_ID_STAGING --body "VALUE"
gh secret set SUPABASE_DB_PASSWORD_PRODUCTION --body "VALUE"
gh secret set SUPABASE_PROJECT_ID_PRODUCTION --body "VALUE"
```

---

### Setup Stripe

1. Enable Test mode in Stripe.

2. [Upgrade the Stripe API version](https://dashboard.stripe.com/test/developers) to the latest version. By doing this, we ensure that our functions use the same version of stripe.

---

#### Stripe webhooks

The Stripe webhook will ensure that any activity in Stripe is updated in your Supabase db's, e.g. if a new customer is created in Stripe, add them to customers in the Supabase db's.

1. Copy the env files:

```
cp ./supabase/functions/.env.example ./supabase/functions/.env.local
```

2. Grab your [test Stripe API key](https://dashboard.stripe.com/test/apikeys) (Secret key) and pop it into `./supabase/functions/.env.local`

---

##### Connect test Stripe webhook to local

Run the local Stripe listener once, copy the Stripe Webhook Signing Secret and pop it into `./supabase/functions/.env.local`.

```
yarn stripe:listen
```

---

##### Connect test Stripe webhook to staging

The following steps will setup your Supabase staging environment with your Stripe test environment.

1. Grab your SUPABASE_STAGING_PROJECT_ID for use in the next step:

```
supabase projects list
```

2. Deploy stripe-webhook function to your Supabase remote staging instance:

```
yarn functions:deploy:stripe-webhook --project-ref SUPABASE_STAGING_PROJECT_ID
```

3. The above command will generate a url where you can inspect your deployment. Visit that url and copy the `Endpoint URL`.

4. In [test Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste the `Endpoint URL` above, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

5. Once your Stripe webhook is created, copy the Signing secret.

6. Add the `STRIPE_API_KEY_STAGING` (from `./supabase/functions/.env.local`) and `STRIPE_WEBHOOK_SIGNING_SECRET_STAGING` (from above) secrets to your Github repo:

```
gh auth login
gh secret set STRIPE_API_KEY_STAGING --body "VALUE"
gh secret set STRIPE_WEBHOOK_SIGNING_SECRET_STAGING --body "VALUE"
```

---

##### Connect live Stripe webhook to production

The following steps will setup your Supabase production environment with your Stripe live environment.

1. Grab your SUPABASE_PRODUCTION_PROJECT_ID for use in the next step:

```
supabase projects list
```

2. Deploy stripe-webhook function to your Supabase remote production instance:

```
yarn functions:deploy:stripe-webhook --project-ref SUPABASE_PRODUCTION_PROJECT_ID
```

3. The above command will generate a url where you can inspect your deployment. Visit that url and copy the `Endpoint URL`.

4. In [live Stripe webhooks](https://dashboard.stripe.com/webhooks/create), paste the `Endpoint URL` above, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

5. Once your Stripe webhook is created, copy the Signing secret.

6. Copy your [live Stripe API key](https://dashboard.stripe.com/apikeys) (Secret key).

7. Add the `STRIPE_API_KEY_PRODUCTION` (from above) and `STRIPE_WEBHOOK_SIGNING_SECRET_PRODUCTION` (from above) secrets to your Github repo:

```
gh auth login
gh secret set STRIPE_API_KEY_PRODUCTION --body "VALUE"
gh secret set STRIPE_WEBHOOK_SIGNING_SECRET_PRODUCTION --body "VALUE"
```

---

#### Creating products in Stripe

Before creating products in Stripe, ensure that you're running the stripe listener and supabase functions locally so that your local db is populated with the same Stripe products and prices.

When adding features, we do not use Stripe's `Feature list` property but rather the product's **metadata** as follows:

```ts
{
  features: string[];
}
```

---

### Setup Netlify

1. Create a new site on Netlify and connect your repo to it:

```
netlify init
```

3. From the above command, grab your `URL`and add it to your [site url in Supabase](https://supabase.com/dashboard/project/_/auth/url-configuration). Note: When you add a custom domain to Netlify, you will need to update this again.

4. In the Netlify UI (https://app.netlify.com/sites/NETLIFY_SITE_URL/configuration/deploys#branches-and-deploy-contexts), enable Branch deploys for the `develop` branch.

5. Grab your Supabase **staging** `Project URL` and `anon key` from the [Supabase api settings](https://supabase.com/dashboard/project/_/settings/api) and push them to Netlify (to be used in the staging deployment):

```
yarn netlify env:set VITE_SUPABASE_URL STAGING_PROJECT URL --context branch-deploy
yarn netlify env:set VITE_SUPABASE_ANON_KEY STAGING_ANON_KEY --context branch-deploy
```

6. Grab your Supabase **production** `Project URL` and `anon key` from the [Supabase api settings](https://supabase.com/dashboard/project/_/settings/api) and push them to Netlify (to be used in the production deployment):

```
yarn netlify env:set VITE_SUPABASE_URL API PRODUCTION_PROJECT_URL --context production
yarn netlify env:set VITE_SUPABASE_ANON_KEY PRODCUTION_ANON_KEY --context production
```

Now every time you push to `master`, production will be built and when you push to `develop`, staging will be built 🎉

---

## Development

1. Start the Supabase container:

```
supabase start
```

2. Open the Supabase dashboard by clicking the `Studio URL` from the output above.

3. Start the Stripe listener so that api events from products/subscriptions/customers created/updated in Stripe are forwarded to your local supabase instance:

```
yarn stripe:listen
```

4. Serve the Supabase functions locally:

```
yarn functions:serve
```

5. Run the app:

```
yarn dev
```

---

### Database migrations

It's considered best practice to first make db changes to your local db and then to push them to the remote. With Supabase, we do this with [migrations](https://supabase.com/docs/guides/getting-started/local-development#database-migrations). After making changes to your local database, to get the diff as a migration run:

```
yarn db:migration MIGRATION_NAME
```

Your Github actions will take care of applying the migration to staging and production once it's merged into `develop` and `master` respectively.

---
