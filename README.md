

# Rokeat Admin App.
Admin app allows user to create a store and maintain it

# Clone the repo

git clone https://USER_NAME:ACCESS_TOKEN@github.com/thalalhassan/rokeat-admin.git

<!-- use development branch // Daily pull from this branch once merged -->
git checkout development
git pull origin development

<!-- create branches based on new task-->
git branch new_branch_name development
git checkout new_branch_name

<!-- create branches based on new task-->
Work on the changes 
For UI chagnes only use pages, components, styles folders

<!-- commit change and push-->
git add . 
git commit -m "what changes are you done" 
git push origin new_branch_name


# Start the App

Install > node 16.13.1 // refer https://github.com/nvm-sh/nvm

<!-- Global dependecies -->
npm install -g pnpm typescript 

<!-- Install app dependecies -->
pnpm install 

<!-- App run in development mode command -->
pnpm dev


# APP STACK 

## Postgres
## Nextjs

[Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
