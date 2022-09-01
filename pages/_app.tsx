import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../redux/index'
import ThemeProvider from './provider/ThemeProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemeProvider>
						<Component {...pageProps} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		</SessionProvider>
	)
}

export default MyApp
