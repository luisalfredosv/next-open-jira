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

interface Props {
	entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UiContext);

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData("identification", entry._id);
		startDragging();
	};

	const onDragEnd = () => {
		endDragging();
	};

	return (
		<Card
			sx={{
				marginBottom: 1,
			}}
			draggable={true}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
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
					<Typography variant='body2'>Hace 30 min </Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
