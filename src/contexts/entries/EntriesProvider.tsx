import React, { FC, useReducer } from "react";
import { entriesReducer } from "@/contexts/entries/EntriesReducer";
import { EntriesContext } from "@/contexts/entries/EntriesContext";
import { Entry } from "@/interfaces/entry";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
	entries: Entry[];
}

export const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			createAt: Date.now(),
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae provident neque, repellat illum culpa officia expedita ullam at consequuntur esse inventore quibusdam tempore enim vel sequi nobis, voluptatum vitae voluptate.",
			status: "pending",
		},
		{
			_id: uuidv4(),
			createAt: Date.now(),
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae provident neque, repellat illum culpa officia expedita ullam at consequuntur esse inventore quibusdam tempore enim vel sequi nobis, voluptatum vitae voluptate.",
			status: "inProgress",
		},
		{
			_id: uuidv4(),
			createAt: Date.now(),
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae provident neque, repellat illum culpa officia expedita ullam at consequuntur esse inventore quibusdam tempore enim vel sequi nobis, voluptatum vitae voluptate.",
			status: "finished",
		},
	],
};

export const EntriesProvider: FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createAt: Date.now(),
			status: "pending",
		};

		dispatch({ type: "EntryAdd", payload: newEntry });
	};

	const updateEntry = (entry: Entry) => {
		dispatch({ type: "EntryUpdate", payload: entry });
	};

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
