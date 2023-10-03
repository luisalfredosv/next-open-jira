import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { useContext } from "react";
import { UiContext } from "@/contexts/iu/UiContext";
export const Navbar = () => {
	const { openSideMenu } = useContext(UiContext);

	return (
		<AppBar position='sticky'>
			<Toolbar>
				<IconButton size='large' edge='start' onClick={openSideMenu}>
					<MenuOutlined></MenuOutlined>
				</IconButton>

				<Typography variant='h6'>NextOpen Jira</Typography>
			</Toolbar>
		</AppBar>
	);
};
