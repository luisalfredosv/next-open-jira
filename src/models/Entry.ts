import { Entry } from "@/interfaces/entry";
import mongoose, { Model, Schema } from "mongoose";

export interface IEntry extends Entry {}

const entrySchema = new Schema<IEntry>({
	description: {
		type: String,
		require: true,
	},

	createAt: {
		type: Number,
		default: Date.now,
	},

	status: {
		type: String,
		enum: {
			values: ["pending", "inProgress", "finished"],
		},
		default: "pending",
	},
});

const EntryModel: Model<IEntry> =
	mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
