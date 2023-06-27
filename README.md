# Ultimate B2B SAAS Boilerplate

[![Build](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate/actions/workflows/build.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c8c1ba1d-4e53-4628-bbc5-dfb539f1fca1/deploy-status)](https://app.netlify.com/sites/stunning-manatee-5e7d37/deploys)

## What is it?

The ultimate boilerplate for building SaaS applications with React, Supabase, Stripe, Tailwind CSS and TypeScript. 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

You can see me in action [here](https://ultimate-b2b-saas-boilerplate.netlify.app/).

TODO: SS add a video of project setup in action

## What's in the box?

- [vite](https://vitejs.dev/) for blazingly fast development ⚡️
- [Typescript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) for the backend 💾
- [React](https://reactjs.org/)
- [jotai](https://jotai.org/) for state 👻
- [react-router-dom](https://reactrouter.com/en/main) with preconfigured Router 🕸
- [prettier](https://prettier.io/) for consistent formatting 🎨
- [eslint](https://eslint.org/) for linting 🕵️‍♂️
- [vitest](https://github.com/vitest-dev/vitest) for testing ⚡️
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for integration testing 🐙
- staged linting, thanks to [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) 🚫💩
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for svg support.
- a CI running `lint`, `test` and `build` on every commit thanks to [Github Actions](https://github.com/features/actions)

## Setup

OBVIOUS NOTE: Replace "PROJECT_NAME" with your own project's name 😉

1. Clone the project:

```
git clone https://github.com/shaunsaker/ultimate-b2b-saas-boilerplate.git PROJECT_NAME
cd PROJECT_NAME
yarn
```

1. [Create a Supabase account](https://supabase.com/dashboard/sign-up).

1. [Install Supabase](https://supabase.com/docs/guides/cli#installation).

1. Login to the Supabase cli

```
supabase login
```

1. Create a Supabase project:

```
supabase projects create PROJECT_NAME -i
```

1. Initialise the Supabase project:

TODO: SS how does this affect the checked in supabase folder

```
supabase init
```

1. Grab your Supabase project id:

```
supabase projects list
```

1. Link the local Supabase project to the remote:

```
supabase link --project-ref SUPABASE_PROJECT_ID
```

1. Start the Supabase container:

```
supabase start
```

1. Copy the env files:

```
cp .env.example .env.development && cp .env.example .env.production
```

1. Grab your local project url and anon key and pop them into `.env.development`:

```
supabase status
```

1. [Grab your remote project url and anon key](https://app.supabase.com/project/_/settings/api) and pop them into `.env.production`.

1. Setup your db (TODO: SS test that this works):

```
mv ./migrations/* ./supabase/migrations
yarn db:reset // this will apply the migrations above to your local db
yarn db:commit // this will apply the same changes to your remote db
```

1. Make it your own by updating `tailwind.config.js` with your theme colors.

1. [Make it your own by updating public assets](#generating-public-assets).

## Development

1. Start the Supabase container:

```
supabase start
```

1. Run the app:

```
yarn dev
```

## Database Migrations

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

## Deployment

I'd recommend using [Netlify](netlify.com) for deployment and connecting the site to your Github repo so that new deploys are triggered on every push to `master`.

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
