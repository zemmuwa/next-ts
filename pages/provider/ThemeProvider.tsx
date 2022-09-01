import { createContext, useState, useMemo, PropsWithChildren } from 'react'
import {
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from '@mui/material/styles'
import Layout from '../../layouts/Layout'
import { PaletteMode } from '@mui/material'
export const ThemeProviderContext = createContext({ toggleColorMode: () => {} })
export default function ThemeProvider({ children }: PropsWithChildren) {
	const [mode, setMode] = useState<PaletteMode>('light')
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
			},
		}),
		[]
	)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	)
	return (
		<ThemeProviderContext.Provider value={colorMode}>
			<MuiThemeProvider theme={theme}>
				<Layout home>{children}</Layout>
			</MuiThemeProvider>
		</ThemeProviderContext.Provider>
	)
}
