# Launchpad

[![Development](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/development.yml/badge.svg?branch=develop)](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/development.yml)

---

## What is it?

The ultimate boilerplate for building SAAS applications with React, Typescript, Tailwind CSS, Firebase and Stripe 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

Transform `8 weeks` of staging into `1 hour` 🚀

You can see me in action [here](https://ultimate-b2b-saas-boilerplate.netlify.app/). // TODO: SS update this when we add the custom domain

---

## What's in the box?

- [React](https://reactjs.org/) ⚛️
- [Typescript](https://www.typescriptlang.org/) 📘
- [tailwindcss](https://tailwindcss.com/) for super easy styling 🎨
- [vite](https://vitejs.dev/) for blazingly fast development 🚀
- [Firebase](https://firebase.google.com/) for the backend and deployment ⚡️
- Auth flows, dashboard, settings, billing and team management ✅
- [Stripe](https://stripe.com/) integration ([that actually works](https://github.com/vercel/nextjs-subscription-payments/issues)) 💳
- A super simple, dark mode out of the box and accessible component library 🔀
- [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) 🎨
- Automatic light and dark modes 🌓
- Mobile friendly 📱
- Looks ~~good~~ **farking beautiful** out of the box ✨
- Almost perfect [Lighthouse](https://github.com/GoogleChrome/lighthouse) scores 🏆
- [framer-motion](framer.com/motion/) animations 🎬
- [Resend](https://resend.com/) for transactional emails ⚡️
- [React Email](https://react.email/) for quick and easy email staging ✉️❤️
- [react-router-dom](https://reactrouter.com/en/main) for routing with a pre-configured Router 🧭
- [react-query](https://tanstack.com/query/latest/) for declarative query management 🦅
- [jotai](https://jotai.org/) for super simple state management 👻
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
- [heroicons](https://heroicons.com/) for beautiful icons 🙂
- [Storybook](https://storybook.js.org/) deployed to [Chromatic](https://www.chromatic.com/) for UI staging

---

## Setup

### Prequisites

- [git](https://git-scm.com/downloads)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Node.js](https://nodejs.org/en)
- [Github account](https://github.com/signup)
- [Google account](https://accounts.google.com/signup/v2/createaccount)
- [Firebase cli](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- [Stripe account](https://dashboard.stripe.com/register)
- [Stripe cli](https://stripe.com/docs/stripe-cli#install)
- [Github cli](https://github.com/cli/cli#installation)
- [Sentry account](https://sentry.io/signup/)
- 2x [Resend accounts](https://resend.com/signup), one for staging and one for production
- [Mixpanel account](https://mixpanel.com/) with 2x projects, one for staging and one for production
- [Chromatic account](https://www.chromatic.com/)
- [Figma account](https://www.figma.com/)

### Environments

We support 3 environments out of the box:

- Development: Local development (Firebase emulator)
- Staging (`develop` branch): Remote development
- Production (releases from `master` branch): Live environment

### Basic Setup

1. Clone the repo and install dependencies:

```
git clone https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate.git PROJECT_NAME
cd PROJECT_NAME
yarn
```

2. Create a new repo in Github and push.

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

1. Update [app.json](./packages/config/src/app.json).

2. Generate your theme colors where `themeColor` and `neutralColor` are any of the [tailwind colors](https://tailwindcss.com/docs/customizing-colors):

```
cd ./packages/scripts
yarn build:theme --themeColor teal --neutralColor gray
```

3. Update [logo.svg](./packages/config/src/logo.svg) with your logo. If you don't have a logo, just grab an icon from https://heroicons.com/ and move on with life. It should be a **square svg**, size does not count in this case 😉 The outermost `fill` or `stroke` attribute should be set to `currentColor`.

4. Run the script:

```
yarn build:assets
```

And boom 💣🎆, you have all the optimised public assets you'll need 😎✅

---

### Setup Firebase

1. Login to the Firebase cli

```
cd ./packages/firebase
firebase login
```

2. Create two Firebase projects, one for staging and one for production.

```
firebase projects:create PROJECT_NAME-staging
firebase projects:create PROJECT_NAME-production
```

3. Enable Cloud Firestore for both projects by visiting https://console.firebase.google.com/project/PROJECT_NAME-staging/firestore and https://console.firebase.google.com/project/PROJECT_NAME-production/firestore and clicking "Create database". Feel free to "Start in production mode", the firebase rules and indices will be deployed automatically when you merge into `develop` (staging) or `master` (production).

4. [Enable the Blaze plan](https://console.firebase.google.com/project/_/usage/details) for both projects. This is required for Firebase Functions.

5. Link your Firebase projects to your local repo:

Note the first command is just to help firebase load the correct env variables in development.

```
firebase use --add PROJECT_NAME-staging --alias development
firebase use --add PROJECT_NAME-staging --alias staging
firebase use --add PROJECT_NAME-production --alias production
```

6. Get a Firebase token for Github Actions:

```
firebase login:ci
```

7. Push your Firebase token to Github so that Github Actions can deploy your app and functions to staging and production:

```
gh auth login
gh secret set FIREBASE_TOKEN --body VALUE
```

8. Create your `app` and `website` env files:

```
touch ./packages/app/.env.development
touch ./packages/app/.env.staging
touch ./packages/app/.env.production
touch ./packages/website/.env.development
touch ./packages/website/.env.staging
touch ./packages/website/.env.production
```

9. Create web apps for both of your projects by visiting https://console.firebase.google.com/project/PROJECT_NAME-staging/settings/general/web and https://console.firebase.google.com/project/PROJECT_NAME-production/settings/general/web and clicking "Add app". Copy the config for each app and paste them into [app/.env.development](packages/app/.env.development), [website/.env.development](packages/website/.env.development), [app/.env.staging](./packages/app/.env.staging), [wesbite/.env.staging](./packages/wesbite/.env.staging), [app/.env.production](./packages/app/.env.production) and [website/.env.production](./packages/website/.env.production).

10. [Enable Email/Password Sign-in](https://console.firebase.google.com/u/0/project/_/authentication/providers) by clicking on "Add new provider" => "Email/Password" => "Enable".

11. Set the emails Action URL by vising https://console.firebase.google.com/u/0/project/_/authentication/emails, clicking the edit icon, click "Customize action URL" and set it to DOMAIN_NAME/user-management.

12. Add `localhost` as an Authorized domain to your [projects](https://console.firebase.google.com/u/0/project/_/authentication/settings).

13. Connect your custom domain by visiting https://console.firebase.google.com/u/0/project/_/hosting/main, clicking "Add custom domain", adding your domain and following the instructions.

14. Create another site for your Storybook by visiting https://console.firebase.google.com/u/0/project/_/hosting/main, clicking "Add another site" and following the instructions. A good name for this site is `PROJECT_NAME-storybook`.

15. Create another site for your Website by visiting https://console.firebase.google.com/u/0/project/_/hosting/main, clicking "Add another site" and following the instructions. A good name for this site is `PROJECT_NAME-website`.

16. Update the [.firebaserc](./.firebaserc) with your project name by replacing "the-shell-development" with your PROJECT_NAME.

17. Download your Firebase service account for each project and add them to the [website](./packages/website) package as `service-account-staging.json` and `service-account-production.json`.

18. Add the paths to the service accounts to [website/.env.development](./packages/website/.env.development), [website/.env.staging](./packages/website/.env.staging) and [website/.env.production](./packages/website/.env.production) as `GOOGLE_APPLICATION_CREDENTIALS`.

19. Add the relavant app hosting url's to [website/.env.staging](./packages/website/.env.staging) and [website/.env.production](./packages/website/.env.production) as `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_SIGN_IN_URL` and `NEXT_PUBLIC_APP_SIGN_UP_URL`. Set the [website/.env.development](<(./packages/website/.env.development)>) `NEXT_PUBLIC_APP_URL` to `http://localhost:5173`, ie. the url you're serving the local `app` on.

---

### Setup Stripe

1. Enable Test mode in the [Stripe dashboard](https://dashboard.stripe.com/test/dashboard).

2. [Upgrade the Stripe API version](https://dashboard.stripe.com/test/developers) to the latest version, `2022-11-15`. By doing this, we ensure that our functions use the same version of Stripe.

3. Login into the Stripe cli:

```
stripe login
```

---

#### Stripe webhooks

The Stripe webhook will ensure that any activity in Stripe is updated in your Firebase db's, e.g. if a new customer is created in Stripe, add them to the customers collection in the Firebase db's.

##### Connect test Stripe webhook to development

The following steps will setup your Firebase development environment with your Stripe test environment.

1. Run the stripe webhook listener locally:

```
cd ./packages/functions
yarn dev:stripe
```

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [test Stripe API key](https://dashboard.stripe.com/test/apikeys) (Secret key).

4. Create [functions/.env.development](./packages/functions/.env.development).

```
cd ../../
touch ./packages/functions/.env.development
```

5. Add the secrets to [functions/.env.development](./packages/functions/.env.development).

---

##### Connect test Stripe webhook to staging

The following steps will setup your Firebase staging environment with your Stripe test environment.

1. In [test Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **staging** stripe-webhook firebase functions url, e.g. https://us-central1-PROJECT_NAME-staging.cloudfunctions.net/stripe-webhook, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Create [functions/.env.staging](./packages/functions/.env.staging).

```
touch ./packages/functions/.env.staging
```

4. Add the secrets to [functions/.env.staging](./packages/functions/.env.staging).

---

##### Connect live Stripe webhook to production

The following steps will setup your Firebase production environment with your Stripe live environment.

1. In [live Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **production** stripe-webhook firebase functions url, e.g. https://us-central1-PROJECT_NAME-production.cloudfunctions.net/stripe-webhook, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [live Stripe API key](https://dashboard.stripe.com/apikeys) (Secret key).

4. Create [functions/.env.production](./packages/functions/.env.production).

```
touch ./packages/functions/.env.production
```

5. Add the secrets to [functions/.env.production](./packages/functions/.env.production).

---

#### Creating products in Stripe

##### Team Plan

To enable the teams feature, users must have a subscription on the team plan. To create a team plan, simply add the `teamPlan` property to the relevant product's **metadata**:

```ts
{
  teamPlan: true
}
```

##### Feature List

When adding features that populate the pricing cards, we do not use Stripe's `Feature list` property but rather the product's **metadata** as follows:

```ts
{
  features: string[];
}
```

##### Free trials

We support free trials out of the box. To add a free trial to a product, simply add the `freeTrialDays` property to the relevant product's **metadata**:

```ts
{
  freeTrialDays: number
}
```

---

### Setup Sentry

1. Create a new React project in [Sentry](https://sentry.io/projects/new/).

2. Copy the `dsn` key. This is your `VITE_SENTRY_DSN`.

3. [Create a Sentry Auth Token](https://private-zj.sentry.io/settings/auth-tokens/new-token/). This is your `VITE_SENTRY_AUTH_TOKEN`.

4. Grab your "Organization Slug" from [Settings](https://sentry.io/settings/organization/). This is your `VITE_SENTRY_ORG`.

5. Grab your "Project Slug" from https://sentry.io/settings/projects/ and clicking on the project. In the url that loads next, e.g. https://SENTRY_ORG.sentry.io/settings/projects/X/, X is your `VITE_SENTRY_PROJECT`.

6. Add the secrets to [app/.env.staging](./packages/app/.env.staging) and [app/.env.production](./packages/app/.env.production).

7. Push the secrets to Github so that the deploy workflows can deploy sentry releases.

```
gh secret set SENTRY_AUTH_TOKEN --body VALUE
gh secret set SENTRY_ORG --body VALUE
gh secret set SENTRY_PROJECT --body VALUE
```

8. [Connect your Github repo to Sentry](https://private-zj.sentry.io/settings/integrations/github/).

### Setup Resend

1. Add an API key to each of your Resend accounts (staging and production).

2. Add the secrets to [functions/.env.development](./packages/functions/.env.development), [functions/.env.staging](./packages/functions/.env.staging) and [functions/.env.production](./packages/functions/.env.production).

3. Add your domain by visiting https://resend.com/domains, clicking "Add domain" and following the instructions.

---

### Setup Mixpanel

1. Grab your staging and production project tokens and them to the respective files at [app/.env.staging](./packages/app/.env.staging) and [app/.env.production](./packages/app/.env.production).

---

### Setup Chromatic

1. Setup your project at [Chromatic](https://www.chromatic.com/).

2. Push your Chromatic Project Token to Github so that the deploy workflows can deploy to Chromatic:

```
gh secret set CHROMATIC_PROJECT_TOKEN --body VALUE
```

### Setup Figma

1. [Duplicate](https://help.figma.com/hc/en-us/articles/360038511533-Duplicate-or-copy-files#:~:text=Right%2Dclick%20on%20the%20file,the%20original%20and%20the%20duplicate.) the [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) to your own workspace.

2. Follow the steps in [Figma Development](#figma).

3. Update the Logo component in Figma with your new logo.

### Setup automated releases

1. Create a [Github personal access token](https://github.com/settings/tokens/new) with the `repo` scope and push it to Github:

```
gh secret set GH_TOKEN --body VALUE
```

2. Send your env files to Github so that the deploy workflows can deploy to Firebase:

```
cat ./packages/app/.env.staging > .env.staging
echo >> .env.staging
cat ./packages/functions/.env.staging >> .env.staging
cat ./packages/app/.env.production > .env.production
echo >> .env.production
cat ./packages/functions/.env.production >> .env.production
gh secret set ENV_FILE_STAGING < .env.staging
gh secret set ENV_FILE_PRODUCTION < .env.production
rm .env.staging .env.production
```

That's it, you're done! Every time you push to `master`, a release will automatically be created and the app will be deployed to production.

### Deploy

Run an initial deploy to staging.

```
yarn activate-project staging
yarn deploy:staging
```

---

## Development

Run the following command to start the app development server, Storybook server, Firebase emulator and Stripe listener:

```
yarn dev
```

To start the email development server, run:

```
cd ./packages/emails
yarn dev:emails
```

---

### Figma

When updating your theme using the [generateTheme](./packages/scripts/src/generateTheme/index.ts) script, you'll need to update your color styles in Figma.

1. Copy the contents of [config/figmaColors.json](./packages/config/figmaColors.json) into this [tool](https://varundevpro.github.io/tailwind-plugin-helper-ui/).

2. Click "Generate File".

3. Using the Figma [Tailwind Color Palettes plugin](https://www.figma.com/community/plugin/853905984020840743/Tailwind-Color-Palettes), upload this generated file by clicking on the "Custom File" tab and setting the folder name as the existing "Tailwind" folder.

Your Figma component library will now be updated to the latest theme colors 🎉

---

### Testing

Our testing approach is to focus on testing user interactions and avoid testing implementation details. Unit tests are added for utils, util hooks and hooks that integrate with other hooks. Integration tests are added for components and their integration with api hooks. E2E tests are added for user flows.
