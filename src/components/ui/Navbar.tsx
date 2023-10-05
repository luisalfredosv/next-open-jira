import {
	AppBar,
	IconButton,
	Link as MuiLink,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { useContext } from "react";
import { UiContext } from "@/contexts/iu/UiContext";
import NextLink from "next/link";

export const Navbar = () => {
	const { openSideMenu } = useContext(UiContext);

	return (
		<AppBar position='sticky'>
			<Toolbar>
				<IconButton size='large' edge='start' onClick={openSideMenu}>
					<MenuOutlined />
				</IconButton>

				<MuiLink
					component={NextLink}
					href='/'
					underline='none'
					color='white'
				>
					<Typography variant='h6'>NextOpen Jira</Typography>
				</MuiLink>
			</Toolbar>
		</AppBar>
	);
};
