import { List, Paper } from "@mui/material";
import React, { FC, useContext, useMemo, DragEvent } from "react";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces/entry";
import { EntriesContext } from "@/contexts/entries/EntriesContext";
import { UiContext } from "@/contexts/iu/UiContext";
import styles from "./EntryList.module.css";

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { isDragging, endDragging } = useContext(UiContext);

	const { entries, updateEntry } = useContext(EntriesContext);

	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries]
	);

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData("identification");

		const entry = entries.find((e) => e._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endDragging();
	};

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ""}
		>
			<Paper
				sx={{
					height: "calc(100vh - 250px)",
					overflow: "scroll",
					backgroundColor: "transparent",
					padding: "0.5px 5px",
					"&::-webkit-scrollbar": {
						width: "12px",
					},
					"&::-webkit-scrollbar-track": {
						WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
						borderRadius: "10px",
					},
					"&::-webkit-scrollbar-thumb": {
						borderRadius: "10px",
						WebkitBoxShadow:
							"inset 0 0 6px rgba(255, 255, 255, 0.3)",
					},
					"&::-webkit-scrollbar-corner": {
						background: "transparent",
					},
				}}
			>
				<List
					sx={{
						opacity: isDragging ? 0.1 : 1,
						transition: "all .3s",
					}}
				>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
