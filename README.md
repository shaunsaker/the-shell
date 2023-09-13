# Ultimate B2B SAAS Boilerplate

[![Testing](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/testing.yml/badge.svg)](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/testing.yml)

---

## What is it?

The ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript. 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

Transform `6 weeks` of staging into `1 hour` 🚀

You can see me in action [here](https://ultimate-b2b-saas-boilerplate.netlify.app/).

---

## What's in the box?

- [Typescript](https://www.typescriptlang.org/) 📘
- [React](https://reactjs.org/) ⚛️
- [tailwindcss](https://tailwindcss.com/) for super easy styling 🎨
- [vite](https://vitejs.dev/) for blazingly fast staging 🚀
- [Firebase](https://firebase.google.com/) for the backend and deployment ⚡️
- Auth flows, dashboard, settings, billing and team management ✅
- [Stripe](https://stripe.com/) integration ([that actually works](https://github.com/vercel/nextjs-subscription-payments/issues)) 💳
- A super simple, dark mode out of the box and accessible component library 🔀
- [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) 🎨
- Automatic light and dark modes 🌓
- Mobile friendly 📱
- Looks ~~good~~ **farking beautiful** out of the box ✨
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

1. Update `./packages/common/app.json` with your app name, description and support email.

2. Generate your theme colors where `baseColor` and `themeColor` are any of the [tailwind colors](https://tailwindcss.com/docs/customizing-colors):

```
cd ./packages/scripts
yarn build:theme --baseColor teal --neutralColor gray
```

3. Update `./packages/common/logo.svg` and `./packages/common/logo-inverted.svg` with your logos. `logo-inverted` is simply a white version of your logo. If you don't have a logo, just grab an icon from https://heroicons.com/ and move on with life. It should be a **square svg**, size does not count in this case 😉

4. Run the script:

```
yarn build:assets
```

And boom 💣🎆, you have all the optimised public assets you'll need 😎✅

---

### Setup Firebase

1. _Manual Step_: Login to the Firebase cli

```
cd ./packages/firebase
firebase login
```

2. Create two Firebase projects, one for staging and one for production.

```
firebase projects:create PROJECT_NAME-staging
firebase projects:create PROJECT_NAME-production
```

3. _Manual Step_: Enable Cloud Firestore for both projects by visiting https://console.firebase.google.com/project/PROJECT_NAME-staging/firestore and https://console.firebase.google.com/project/PROJECT_NAME-production/firestore and clicking "Create database". Feel free to "Start in production mode".

4. [Enable the Blaze plan](https://console.firebase.google.com/project/_/usage/details) for both projects. This is required for Firebase Functions.

5. Link your Firebase projects to your local repo:

Note the first command is just to help firebase load the correct env variables in development.

```
firebase use --add PROJECT_NAME-staging --alias development
firebase use --add PROJECT_NAME-staging --alias staging
firebase use --add PROJECT_NAME-production --alias production
```

6. _Manual Step_: Get a Firebase token for Github Actions:

```
firebase login:ci
```

7. Push your Firebase token to Github so that Github Actions can deploy your app and functions to staging and production:

```
gh auth login
gh secret set FIREBASE_TOKEN --body VALUE
```

8. _Manual Step_: Create web apps for both of your projects by visiting https://console.firebase.google.com/project/PROJECT_NAME-staging/settings/general/web and https://console.firebase.google.com/project/PROJECT_NAME-production/settings/general/web and clicking "Add app". Copy the config for each app and paste them into `packages/app/.env.development`, `./packages/app/.env.staging` and `./packages/app/.env.production`.

9. _Manual Step_: [Enable Email/Password Sign-in](https://console.firebase.google.com/u/0/project/_/authentication/providers) by clicking on "Add new provider" => "Email/Password" => "Enable".

10. _Manual Step_: Set the emails Action URL by vising https://console.firebase.google.com/u/0/project/_/authentication/emails, clicking the edit icon, click "Customize action URL" and set it to DOMAIN_NAME/user-management.

---

### Setup Stripe

1. Enable Test mode in Stripe.

2. [Upgrade the Stripe API version](https://dashboard.stripe.com/test/developers) to the latest version. By doing this, we ensure that our functions use the same version of stripe.

---

#### Stripe webhooks

The Stripe webhook will ensure that any activity in Stripe is updated in your Firebase db's, e.g. if a new customer is created in Stripe, add them to customers in the Firebase db's.

##### Connect test Stripe webhook to development

The following steps will setup your Firebase development environment with your Stripe test environment.

1. Run the stripe webhook listener locally:

```
yarn dev:stripe
```

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [test Stripe API key](https://dashboard.stripe.com/test/apikeys) (Secret key).

4. Add the secrets to `./packages/functions/.env.development`.

---

##### Connect test Stripe webhook to staging

The following steps will setup your Firebase staging environment with your Stripe test environment.

1. In [test Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **staging** stripe-webhook firebase functions url, e.g. https://us-central1-PROJECT_NAME-staging.cloudfunctions.net/stripe-webhook, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [test Stripe API key](https://dashboard.stripe.com/test/apikeys) (Secret key).

4. Add the secrets to `./packages/functions/.env.staging`.

---

##### Connect live Stripe webhook to production

The following steps will setup your Firebase production environment with your Stripe live environment.

1. In [live Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **staging** stripe-webhook firebase functions url, e.g. https://us-central1-PROJECT_NAME-production.cloudfunctions.net/stripe-webhook, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [live Stripe API key](https://dashboard.stripe.com/apikeys) (Secret key).

4. Add the secrets to `./packages/functions/.env.production`.

---

#### Creating products in Stripe

##### Features

When adding features, we do not use Stripe's `Feature list` property but rather the product's **metadata** as follows:

```ts
{
  features: string[];
}
```

##### Free trials

We support free trials out of the box. To add a free trial to a product, simply add the `freeTrialDays` property to the relevant product's metadata:

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

6. Add the secrets to `packages/app/.env.local`, `packages/app/.env.staging` and `packages/app/.env.production`.

7. Push the secrets to Github.

```
gh auth login
gh secret set SENTRY_AUTH_TOKEN --body VALUE
gh secret set SENTRY_ORG --body VALUE
gh secret set SENTRY_PROJECT --body VALUE
```

8. [Connect your Github repo to Sentry](https://private-zj.sentry.io/settings/integrations/github/).

### Setup Resend

1. Add an API key to each of your Resend accounts (staging and production).

2. Add the secrets to `./packages/functions/.env.development`, `./packages/functions/.env.staging` and `./packages/functions/.env.production`.

---

### Setup Mixpanel

1. Grab your staging and production project tokens and them to the respective files at `packages/app/.env.development`, `./packages/app/.env.staging` and `./packages/app/.env.production`.

---

### Setup Chromatic

1. Setup your project at [Chromatic](https://www.chromatic.com/).

2. Push your Chromatic Project Token to Github:

```
gh secret set CHROMATIC_PROJECT_TOKEN --body VALUE
```

### Setup Figma

1. [Duplicate](https://help.figma.com/hc/en-us/articles/360038511533-Duplicate-or-copy-files#:~:text=Right%2Dclick%20on%20the%20file,the%20original%20and%20the%20duplicate.) the [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) to your own workspace.

2. Follow the steps in [Figma Development](#figma).

3. Update the Logo component in Figma with your new logo.

---

## Development

Run the following command to start the app development server and Firebase emulator:

```
yarn dev
```

---

### Figma

When updating your theme using the `./packages/scripts/generateTheme` script, you'll need to update your color styles in Figma.

1. Copy the contents of `./packages/scripts/figmaColors.json` into this [tool](https://varundevpro.github.io/tailwind-plugin-helper-ui/).

2. Click "Generate File".

3. Using the Figma [Tailwind Color Palettes plugin](https://www.figma.com/community/plugin/853905984020840743/Tailwind-Color-Palettes), upload this generated file by clicking on the "Custom File" tab and setting the folder name as the existing "Tailwind" folder.

Your Figma component library will now be updated to the latest theme colors 🎉
