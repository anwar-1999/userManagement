This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Node Version - 20.10.0
## React Version - 18
## Next Version - 14

Give npm i to install the Dependencies
-----------------------------
## Project Flow
- Intial page Give Enter
- Two Fields =>
  - Login =>
    Staticaly created user Credential
    *  Admin =>
       email: 'admin@gmail.com',
       password: 'admin123',       
    *  Manager =>
       email: 'manager@gmail.com',
       password: 'manager123',   
    *  User =>
       email: 'user@gmail.com',
       password: 'user123',   
  - Sign Up =>
    * we can create user and Assign the roles
- Login using the credentials
  * will move to Tenant Management Sreen
  * Staticaly 2 Tenants Will be there
  * Only Admin can add,Edit and Delete the Tenants rest of them won't
  * Forgot Password Link
    * By clicking We can change the Password 
    * OTP is 1234 by Default
  * Reset Password Button
    * By clicking We can change the I Logged user Password
  * By Clicking Logout Button redirect to login Page by loggedOut the user  