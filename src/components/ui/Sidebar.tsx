import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import InboxOutlined from "@mui/icons-material/InboxOutlined";
import MailOutlineOutlined from "@mui/icons-material/MailOutlineOutlined";
import { UiContext } from "@/contexts/iu/UiContext";

const menuItems = ["Inicio", "Salir"];

export const Sidebar = () => {
	const { sideMenuOpen, closeSideMenu } = useContext(UiContext);

	return (
		<Drawer anchor='left' open={sideMenuOpen} onClose={closeSideMenu}>
			<Box
				sx={{
					width: 250,
				}}
			>
				<Box
					sx={{
						padding: "5px 10px",
					}}
				>
					<Typography variant='h4'>Menú</Typography>
				</Box>

				<List>
					{menuItems.map((text, idx) => (
						<ListItem key={idx}>
							<ListItemIcon>
								{idx % 2 ? (
									<InboxOutlined />
								) : (
									<MailOutlineOutlined />
								)}
								<ListItemText
									sx={{
										marginLeft: 1,
									}}
									primary={text}
								></ListItemText>
							</ListItemIcon>
						</ListItem>
					))}
				</List>
				<Divider />
			</Box>
		</Drawer>
	);
};
