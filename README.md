# Ultimate B2B SAAS Boilerplate

[![Build](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c8c1ba1d-4e53-4628-bbc5-dfb539f1fca1/deploy-status)](https://app.netlify.com/sites/stunning-manatee-5e7d37/deploys)

---

## What is it?

The ultimate boilerplate for building SAAS applications with React, Supabase, Stripe, Tailwind CSS and TypeScript. 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

Transform `10 days` of development into `1 hour` 🚀

You can see me in action [here](https://ultimate-b2b-saas-boilerplate.netlify.app/).

TODO: SS add a video of project setup in action

---

## What's in the box?

- [vite](https://vitejs.dev/) for blazingly fast development 🚀
- [Typescript](https://www.typescriptlang.org/) 📘
- [Supabase](https://supabase.com/) for the backend ⚡️
- [Stripe](https://stripe.com/) integration ([that actually works](https://github.com/vercel/nextjs-subscription-payments/issues)) 💳
- [React](https://reactjs.org/) ⚛️
- [tailwindcss](https://tailwindcss.com/) for super easy styling 🎨
- Looks ~~good~~ **farking beautiful** out of the box ✨
- Automatic light and dark modes 🌓
- Mobile friendly 📱
- [Asset and theme generation](#generating-public-assets) 🖼️
- [tremor](https://www.tremor.so/) and [headless UI](https://headlessui.com/) components 🔀
- [jotai](https://jotai.org/) for super simple state management 👻
- [react-router-dom](https://reactrouter.com/en/main) for routing with a pre-configured Router 🧭
- Auth flows, dashboard and settings management ✅
- [framer-motion](framer.com/motion/) animations 🎬
- [Mixpanel](https://mixpanel.com/) for analytics 📊
- [Sentry](https://sentry.io/) for error logging 🪲
- [prettier](https://prettier.io/) for consistent formatting 💅
- [eslint](https://eslint.org/) for linting 🕵️‍♂️
- [vitest](https://github.com/vitest-dev/vitest) for testing 🔎
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for integration testing 🐙
- [Cypress](https://www.cypress.io/) for E2E testing 🌲
- [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) for staged linting 🚫💩
- [Github Actions](https://github.com/features/actions) for CI running `lint`, `test` and `build` on every commit 🔄
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for svg support 🔗

---

## Setup

Obvious note: Replace "PROJECT_NAME" with your own project's name 😉

1. Clone the project:

```
git clone https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate.git PROJECT_NAME
cd PROJECT_NAME
yarn
```

4. [Create a Supabase account](https://supabase.com/dashboard/sign-up).

5. [Install Supabase](https://supabase.com/docs/guides/cli#installation).

6. Login to the Supabase cli

```
supabase login
```

7. Create a Supabase project:

```
supabase projects create PROJECT_NAME -i
```

8. Initialise the Supabase project:

TODO: SS how does this affect the checked in migrations?

```
supabase init
```

9. Grab your Supabase project id:

```
supabase projects list
```

10. Link the local Supabase project to the remote:

```
supabase link --project-ref SUPABASE_PROJECT_ID
```

11. Start the Supabase container:

```
supabase start
```

12. Copy the env files:

```
cp .env.example .env.development && cp .env.example .env.production
```

13. Grab your `API URL` and `anon key` and pop them into `.env.development`:

```
supabase status
```

14. [Grab your production Project URL and anon API key](https://app.supabase.com/project/_/settings/api) and pop them into `.env.production`.

15. [Create a Stripe account](https://stripe.com/).

16. Enable Test mode in Stripe.

17. [Grab your test Stripe Secret key](https://dashboard.stripe.com/test/apikeys) and pop it into `.env.development` and `.env.production`. When you're ready to go live, you can add your live Secret key as `VITE_STRIPE_SECRET_KEY_LIVE` to `.env.production`.

18. [Connect your repo to Netlify](https://app.netlify.com/start).

// TODO: SS we can use the netlify cli for this

17. Add your`.env.production` file to your site in Netlify so that the production builds connects to your remote Supabase instance.

18. Add your [site url to Supabase](https://supabase.com/dashboard/project/_/auth/url-configuration) (for now just use your Netlify domain but when you add a custom domain, be sure to update this again).

19. Setup your remote Supabase db (TODO: SS test that this works):

```
mv ./migrations/* ./supabase/migrations // TODO: SS do we need this?
yarn db:reset // this will apply the migrations above to your local db
yarn db:commit // this will apply the same changes to your remote db
```

### Setup Stripe Webhook

The Stripe webhook will ensure that any activity in Stripe is updated in your Supabase db's, e.g. if a new customer is created in Stripe, add them to customers in the Supabase db's.

1. Copy the env files:

```
cp ./supabase/functions/stripe-webhook/.env.example ./supabase/functions/stripe-webhook/.env.development && cp ./supabase/functions/stripe-webhook/.env.example ./supabase/functions/stripe-webhook/.env.production
```

2. Grab your Stripe API key and pop it into `./supabase/functions/stripe-webhook/.env.development` and `./supabase/functions/stripe-webhook/.env.production`.

3. Run the Stripe listener once, copy the Stripe Webhook Signing Secret and pop it into `./supabase/functions/stripe-webhook/.env.development`.

4. Deploy stripe-webhook function to your remote Supabase instance:

```
yarn functions:deploy:stripe-webhook
```

5. The above command will a url where you can inspect your deployment. Visit that url and copy the `Endpoint URL`.

6. In [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks/create), paste the `Endpoint URL` above, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

7. Once your Stripe webhook is created, copy the Signing secret and pop it into `./supabase/functions/stripe-webhook/.env.production` as `STRIPE_WEBHOOK_SIGNING_SECRET`.

8. Deploy your production env file to Supabase:

```
supabase secrets set --env-file ./supabase/functions/stripe-webhook/.env.production
```

---

### Make it your own

4. Update the theme colors in `tailwind.config.js`.

5. [Generate public assets](#generating-public-assets).

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

4. Serve the stripe-webhook function locally to handle any Stripe api events:

```
functions:serve:stripe-webhook
```

5. Run the app:

```
yarn dev
```

### Database Migrations

It's considered best practice to first make db changes to your local db and then to push them to the remote. With Supabase, we do this with [migrations](https://supabase.com/docs/guides/getting-started/local-development#database-migrations). After making changes to your local database, to get the diff as a migration run:

```
yarn db:migration MIGRATION_NAME
```

You can then commit this to the remote db using:

```
yarn db:commit
```

If you applied changes to the remote db and need to apply them locally, you can do that using the command:

```
yarn db:pull
```

### Testing Stripe Webhooks Locally

1. Serve the `stripe-webhook` function locally:

```
yarn functions:serve:stripe-webhook
```

2. In another terminal, serve the stripe listener:

```
yarn stripe:listen
```

3. In another terminal, trigger a stripe webhook:

```
yarn stripe:trigger payment_intent.succeeded
``

---

## Generating Public Assets

After spending many hours building an app, I've found that having to manually generate public assets is one of the most annoying things ever! So I created a script to do this for you 😛 All you need to do is:

1. Update `./src/assets/logo.svg` with your logo. If you don't have a logo, just grab an icon from https://heroicons.com/ and move with life. It should be a **square svg**, size does not count in this case 😉
1. Customise `./package.json`.
1. Run the script:

```

yarn dev:node ./scripts/generateAssets

```

And boom 💣🎆, you have all the optimised public assets you'll need 😎✅

Here it is in action:

![Generating assets](https://github.com/shaunsaker/ultimate-react-boilerplate/blob/master/assets/generate-assets.gif?raw=true)
```
