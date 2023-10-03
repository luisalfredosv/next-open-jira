export interface Entry {
	_id: string;
	description: string;
	createAt: number;
	status: EntryStatus;
}

export type EntryStatus = "pending" | "inProgress" | "finished";
