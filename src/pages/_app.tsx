import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { darkTheme, lightTheme } from "@/themes/index";
import { UiProvider } from "@/contexts/iu/UiProvider";
import { EntriesProvider } from "@/contexts/entries/EntriesProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<EntriesProvider>
				<UiProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UiProvider>
			</EntriesProvider>
		</>
	);
}
