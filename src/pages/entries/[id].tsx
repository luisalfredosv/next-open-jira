import { Layout } from "@/components/layouts/Layout";
import {
	Card,
	Grid,
	CardContent,
	CardHeader,
	TextField,
	CardActions,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	capitalize,
	IconButton,
} from "@mui/material";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Entry, EntryStatus } from "@/interfaces/entry";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { EntriesContext } from "@/contexts/entries/EntriesContext";
import { IEntry } from "@/models/Entry";
import { useContext } from "react";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import { getEntryById } from "@/database/dbEntries";
import { timeAgo } from "@/utils/utils";
export const validStatus: EntryStatus[] = ["pending", "inProgress", "finished"];

export interface Props {
	entry: IEntry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
	const { updateEntry } = useContext(EntriesContext);

	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	);

	const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	};

	const onUpdateEntry = () => {
		if (inputValue.trim().length === 0) return;

		const updatedEntry: Entry = {
			...entry,
			status,
			description: inputValue,
		};

		updateEntry(updatedEntry, true);
	};

	return (
		<Layout title='Edit'>
			<>
				<Grid
					container
					justifyContent={"center"}
					sx={{
						marginTop: 2,
					}}
				>
					<Grid item xs={12} sm={8} md={6}>
						<Card>
							<CardHeader
								title={`Entrada: ${
									entry.description.substring(0, 10) + "..."
								}`}
								subheader={`Creada hace: ${timeAgo(
									entry.createAt
								)} minutos`}
							></CardHeader>

							<CardContent>
								<TextField
									sx={{
										marginTop: 2,
										marginBottom: 1,
									}}
									fullWidth
									placeholder='Nueva entrada'
									autoFocus
									multiline
									label='Nueva entrada'
									value={inputValue}
									onChange={onTextFieldChanges}
									helperText={
										isNotValid && "Ingrese un valor"
									}
									onBlur={() => setTouched(true)}
									error={isNotValid}
								></TextField>

								<FormControl>
									<FormLabel>Estado:</FormLabel>
									<RadioGroup
										row
										value={status}
										onChange={onStatusChange}
									>
										{validStatus.map((option) => (
											<FormControlLabel
												key={option}
												value={option}
												control={<Radio />}
												label={capitalize(option)}
											/>
										))}
									</RadioGroup>
								</FormControl>
							</CardContent>

							<CardActions>
								<Button
									startIcon={<SaveOutlined />}
									variant='contained'
									fullWidth
									disabled={inputValue.length <= 0}
									onClick={onUpdateEntry}
								>
									Guardar
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>

				<IconButton
					sx={{
						position: "fixed",
						bottom: 30,
						right: 30,
						backgroundColor: "error.dark",
					}}
				>
					<DeleteOutline />
				</IconButton>
			</>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	if (!isValidObjectId(id)) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const entry = await getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			entry,
		},
	};
};

export default EntryPage;
