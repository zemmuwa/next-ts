import Head from 'next/head'
import Image from 'next/image'
// import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { PropsWithChildren, useContext, useMemo } from 'react'
import { ThemeProviderContext } from '../pages/provider/ThemeProvider'
import { useTheme } from '@mui/material'
import { useRouter } from 'next/router'
const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'
interface PropsLayout {
	home?: boolean
}

export default function Layout({
	children,
	home,
}: PropsWithChildren & PropsLayout) {
	const theme = useTheme()
	const colorMode = useContext(ThemeProviderContext)
	const router = useRouter()
	// const home = useMemo(() => !router.asPath.includes('auth'), [router])
	return (
		<Box sx={{ bgcolor: 'background.default' }}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			{home && (
				<header>
					<>
						<Image
							priority
							src="/images/profile.jpg"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt={name}
						/>
						<h1
							style={{ color: theme.palette.text.primary }}
							className={utilStyles.heading2Xl}
						>
							{name}
						</h1>
						<Box
							sx={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								bgcolor: 'background.default',
								color: 'text.primary',
								borderRadius: 1,
								p: 3,
							}}
						>
							{theme.palette.mode} mode
							<IconButton
								sx={{ ml: 1 }}
								onClick={colorMode.toggleColorMode}
								color="inherit"
							>
								{theme.palette.mode === 'dark' ? (
									<Brightness7Icon />
								) : (
									<Brightness4Icon />
								)}
							</IconButton>
						</Box>
					</>
				</header>
			)}
			<main>{children}</main>
			{!home && (
				<div>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</Box>
	)
}
