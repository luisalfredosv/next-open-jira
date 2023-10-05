import mongoose from "mongoose";

/*
 * 0 = disconnect;
 * 1 = connected;
 * 2 = connecting;
 * 3 = disconnecting;
 */
const mongoConnection = {
	isConnected: 0,
};

export const connect = async () => {
	if (mongoConnection.isConnected) {
		console.log("[mongo] Ya estabamos conectados!");
		return;
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;

		if (mongoConnection.isConnected === 1) {
			console.log("[mongo] Usando conexión anterior!");
			return;
		}

		await mongoose.disconnect();
	}

	await mongoose.connect(process.env.MONGO_URI!, { retryWrites: true });
	mongoConnection.isConnected = 1;
	console.log("[mongo] Conectado!");
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === "development") return;

	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();

	mongoConnection.isConnected = 0;
	console.log("[mongo] desconectado!");
};
