import type { NextApiRequest, NextApiResponse } from "next";

import HttpStatusCode from "@/enums/HttpStatusCode";
import EntryModel from "@/models/Entry";

import { connect, disconnect } from "@/database/db";
import { seedData } from "@/database/seed-data";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (process.env.NODE_ENV === "production")
		return res.status(HttpStatusCode.UNAUTHORIZED_401).json({
			message: "No tienes acceso a este recurso",
		});

	await connect();

	await EntryModel.deleteMany();

	await EntryModel.insertMany(seedData.entries);

	await disconnect();

	res.status(HttpStatusCode.OK_200).json({
		name: "Proceso realizado correctamente",
	});
}
