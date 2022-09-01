import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import ConsumeApi from '../../../utils/consume-api/ConsumeApi'
import { json } from 'stream/consumers'
export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				let user = null
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				try {
					const res = await ConsumeApi<unknown>('auth/login', 'POST', {
						body: {
							password: credentials?.password,
							username: credentials?.username,
						},

						// headers: { 'Content-Type': 'application/json' },
					})
					console.log(res)
					// If no error and we have user data, return it
					if (res.success) {
						user = res.token
					}
					// Return null if user data could not be retrieved
				} catch (error) {
					console.log(error)
				}
				return { id: user }
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token }) {
			session.user.token = token.idToken || ''
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				token.idToken = user.id
			}
			return token
		},
	},
})
