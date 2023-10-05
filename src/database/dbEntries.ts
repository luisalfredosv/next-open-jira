import { isValidObjectId } from "mongoose";
import { connect, disconnect } from "./db";
import EntryModel, { IEntry } from "@/models/Entry";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
	if (!isValidObjectId(id)) return null;

	await connect();
	const entry = await EntryModel.findById(id).lean();

	return JSON.parse(JSON.stringify(entry));
};
