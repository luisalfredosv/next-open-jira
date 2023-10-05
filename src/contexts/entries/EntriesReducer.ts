import { Entry } from "@/interfaces/entry";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
	| {
			type: "EntryAdd";
			payload: Entry;
	  }
	| {
			type: "EntryUpdate";
			payload: Entry;
	  }
	| {
			type: "RefreshUpdate";
			payload: Entry[];
	  };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case "EntryAdd":
			return {
				...state,
				entries: [...state.entries, action.payload],
			};
		case "EntryUpdate":
			return {
				...state,
				entries: state.entries.map((entry) => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status;
						entry.description = action.payload.description;
					}

					return entry;
				}),
			};

		case "RefreshUpdate":
			return {
				...state,
				entries: [...action.payload],
			};

		default:
			return state;
	}
};
