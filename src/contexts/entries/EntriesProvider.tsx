import React, { FC, useEffect, useReducer } from "react";
import { entriesReducer } from "@/contexts/entries/EntriesReducer";
import { EntriesContext } from "@/contexts/entries/EntriesContext";
import { Entry } from "@/interfaces/entry";
import api from "@/services/api";
import { useSnackbar } from "notistack";

export interface EntriesState {
	entries: Entry[];
}

export const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const snackbar = useSnackbar();

	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	const addNewEntry = async (description: string) => {
		try {
			const { data } = await api.post<Entry>("/entries", {
				description,
			});

			dispatch({ type: "EntryAdd", payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const updateEntry = async (
		{ _id, description, status }: Entry,
		showSnackbar: boolean = false
	) => {
		try {
			const { data } = await api.patch<Entry>(`/entries/${_id}`, {
				description,
				status,
			});

			dispatch({ type: "EntryUpdate", payload: data });

			if (showSnackbar) {
				snackbar.enqueueSnackbar("Entrada Actualizada", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const refreshEntries = async () => {
		const { data } = await api.get<Entry[]>("/entries");
		dispatch({ type: "RefreshUpdate", payload: data });
	};

	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider
			value={{
				...state,
				addNewEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
