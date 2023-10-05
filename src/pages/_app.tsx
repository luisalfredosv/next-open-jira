import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { darkTheme, lightTheme } from "@/themes/index";
import { UiProvider } from "@/contexts/iu/UiProvider";
import { EntriesProvider } from "@/contexts/entries/EntriesProvider";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<SnackbarProvider maxSnack={3}>
				<EntriesProvider>
					<UiProvider>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UiProvider>
				</EntriesProvider>
			</SnackbarProvider>
		</>
	);
}
