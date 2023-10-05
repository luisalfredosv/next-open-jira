import { connect, disconnect } from "@/database/db";
import HttpStatusCode from "@/enums/HttpStatusCode";
import EntryModel, { IEntry } from "@/models/Entry";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| IEntry[]
	| IEntry;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return await getEntries(res);
		case "POST":
			return await setEntry(req, res);

		default:
			return res
				.status(HttpStatusCode.BAD_REQUEST_400)
				.json({ message: "Método no disponible" });
	}
}

export const getEntries = async (res: NextApiResponse<Data>) => {
	await connect();
	const entries = await EntryModel.find().sort({ createAd: "ascending" });
	await disconnect();
	return res.status(HttpStatusCode.OK_200).json(entries);
};

export const setEntry = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { description = "" } = req.body;

	const newEntry = new EntryModel({
		description,
	});

	try {
		await connect();
		await newEntry.save();
		return res.status(HttpStatusCode.CREATED_201).json(newEntry);
	} catch (error) {
		return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({
			message: "Algo salió mal",
		});
	} finally {
		await disconnect();
	}
};
