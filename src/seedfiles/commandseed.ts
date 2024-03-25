import mongoose from 'mongoose';
import { connectToMongoDB } from '../db';
import { generateInstallCommands } from '../scripts/installCommands';

const createCommands = async () => {
	try {
		await connectToMongoDB();

		await generateInstallCommands('65c9e64670feadd188b68170');
	} catch (error) {
		console.error('Error seeding project:', error);
	} finally {
		void mongoose.disconnect();
	}
};

void createCommands();
