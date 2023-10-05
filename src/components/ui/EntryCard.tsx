import { UiContext } from "@/contexts/iu/UiContext";
import { Entry } from "@/interfaces/entry";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { FC, DragEvent, useContext } from "react";
import styles from "./EntryCard.module.css";
import { useRouter } from "next/router";
import { timeAgo } from "@/utils/utils";

interface Props {
	entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UiContext);
	const router = useRouter();

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData("identification", entry._id);
		event.currentTarget.className = styles["dragged-entry"];
		startDragging();
	};

	const onDragEnd = () => {
		endDragging();
	};

	const gotToEdit = () => {
		router.push(`/entries/${entry._id}`);
	};

	return (
		<Card
			sx={{
				marginBottom: 1,
			}}
			draggable={true}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={gotToEdit}
		>
			<CardActionArea>
				<CardContent>
					<Typography
						sx={{
							whiteSpace: "pre-line",
						}}
					>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: "flex",
						justifyContent: "end",
						paddingRight: 2,
					}}
				>
					<Typography variant='body2'>
						Hace {timeAgo(entry.createAt)}{" "}
					</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
