import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/contexts/entries/EntriesContext";
import { UiContext } from "@/contexts/iu/UiContext";

export const NewEntry = () => {
	const [touched, setTouched] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const { addNewEntry } = useContext(EntriesContext);

	const { setIsAddingEntry, isAddingEntry } = useContext(UiContext);

	const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onSave = () => {
		if (inputValue.length === 0) return;

		addNewEntry(inputValue);
		setTouched(false);
		setIsAddingEntry(false);
		setInputValue("");
	};

	return (
		<>
			<Box
				sx={{
					marginBottom: 2,
					paddingX: 1,
				}}
			>
				{isAddingEntry ? (
					<>
						<TextField
							fullWidth
							sx={{
								marginTop: 2,
								marginBottom: 1,
							}}
							placeholder='Nueva entrada'
							autoFocus
							multiline
							error={inputValue.length <= 0 && touched}
							label='Nueva entrada'
							helperText={
								inputValue.length <= 0 &&
								touched &&
								"Ingrese el valor"
							}
							value={inputValue}
							onChange={onTextFieldChanges}
							onBlur={() => setTouched(true)}
						></TextField>

						<Box
							sx={{
								marginTop: 1,
								marginBottom: 1,
							}}
							display={"flex"}
							justifyContent={"space-between"}
						>
							<Button
								variant='outlined'
								color='secondary'
								endIcon={<SaveOutlined />}
								onClick={onSave}
							>
								Guardar
							</Button>
							<Button
								variant='text'
								color='secondary'
								onClick={() => setIsAddingEntry(false)}
							>
								Cancelar
							</Button>
						</Box>
					</>
				) : (
					<Button
						startIcon={<AddCircleOutlineOutlined />}
						variant='outlined'
						fullWidth
						onClick={() => setIsAddingEntry(true)}
					>
						Agregar tarea
					</Button>
				)}
			</Box>
		</>
	);
};
