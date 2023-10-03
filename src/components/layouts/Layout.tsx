import Head from "next/head";
import { FC } from "react";

import { Box } from "@mui/material";
import { Sidebar } from "@/components/ui/Sidebar";
import { Navbar } from "@/components/ui/Navbar";

interface Props {
	title?: string;
	children: JSX.Element;
}

export const Layout: FC<Props> = ({ title = "NextOpenJira", children }) => {
	return (
		<Box
			sx={{
				flexGrow: 1,
			}}
		>
			<Head>
				<title>{title}</title>
			</Head>

			<Navbar />
			<Sidebar />

			<Box
				sx={{
					padding: "10px 20px",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
