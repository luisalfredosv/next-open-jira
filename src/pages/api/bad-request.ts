import HttpStatusCode from "@/enums/HttpStatusCode";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { message = "Bad request" } = req.query;
	res.status(HttpStatusCode.BAD_REQUEST_400).json({
		message,
	});
}
