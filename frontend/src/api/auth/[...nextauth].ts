import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { loginTest } from '../register';

export default NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          credentials: {
            email: { label: "Email", type: "text" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {



            const user = await loginTest(credentials)
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null or false then the credentials will be rejected
              return null
              // You can also Reject this callback with an Error or with a URL:
              // throw new Error('error message') // Redirect to error page
              // throw '/path/to/redirect'        // Redirect to a URL
            }
          }
        })
      ],
});
