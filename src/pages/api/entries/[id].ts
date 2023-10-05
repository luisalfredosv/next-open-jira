import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "@/database/db";
import HttpStatusCode from "@/enums/HttpStatusCode";
import EntryModel, { IEntry } from "@/models/Entry";
import mongoose, { MongooseError } from "mongoose";

type Data =
	| {
			message: string;
	  }
	| IEntry;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id))
		return res.status(HttpStatusCode.BAD_REQUEST_400).json({
			message: "El id no es válido",
		});

	switch (req.method) {
		case "GET":
			return await getEntryById(req, res);
		case "PATCH":
			return await updateEntry(req, res);

		default:
			return res
				.status(HttpStatusCode.BAD_REQUEST_400)
				.json({ message: "Método no disponible" });
	}
}

const getEntryById = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	try {
		const { id } = req.query;
		await connect();

		const findEntry = await EntryModel.findById(id);

		if (!findEntry)
			return res
				.status(HttpStatusCode.NOT_FOUND_404)
				.json({ message: "No se encontró el recurso" });

		return res.status(HttpStatusCode.OK_200).json(findEntry!);
	} catch (error) {
		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
			.json({ message: "Ocurrió un error" });
	} finally {
		disconnect();
	}
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { id } = req.query;
		await connect();

		const entryToUpdate = await EntryModel.findById(id);

		if (!entryToUpdate)
			return res
				.status(HttpStatusCode.NOT_FOUND_404)
				.json({ message: "No se encontró el recurso" });

		const {
			description = entryToUpdate.description,
			status = entryToUpdate.status,
		} = req.body;

		const updatedEntry = await EntryModel.findByIdAndUpdate(
			id,
			{
				description,
				status,
			},
			{ runValidators: true, new: true }
		);

		return res.status(HttpStatusCode.OK_200).json(updatedEntry!);
	} catch (error) {
		if (error instanceof MongooseError) {
			return res
				.status(HttpStatusCode.BAD_REQUEST_400)
				.json({ message: error.message });
		}

		return res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
			.json({ message: "Ocurrió un error" });
	} finally {
		disconnect();
	}
};
