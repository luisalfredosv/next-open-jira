import HttpStatusCode from "@/enums/HttpStatusCode";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	res.status(HttpStatusCode.OK_200).json({ name: "John Doe" });
}
