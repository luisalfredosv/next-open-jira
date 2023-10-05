import { Entry } from "@/interfaces/entry";
import { createContext } from "react";

interface ContextProps {
	entries: Entry[];
	addNewEntry: (description: string) => void;
	updateEntry: (entry: Entry, showSnackbar: boolean) => void;
}

export const EntriesContext = createContext<ContextProps>({} as ContextProps);
