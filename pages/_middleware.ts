import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req, event) {
		if (req.nextauth?.token?.idToken && req.nextUrl.pathname.includes('auth')) {
			return NextResponse.redirect(new URL('/', req.url))
		}
		if (!req.nextauth?.token?.idToken && !req.nextUrl.pathname.includes('auth')) {
			return NextResponse.redirect(new URL('/auth/signin', req.url))
		}
		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: async () => {
				return true
			},
		},
	}
)
