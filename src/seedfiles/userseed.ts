// seed.ts
import mongoose from 'mongoose';
import { connectToMongoDB } from '../db/index.js';
import { UserModel } from '../models/User.model.js';
import { User } from '../types.js';

const seedUser = async () => {
	try {
		await connectToMongoDB();

		const userData: User = {
			username: 'exampleUser',
			email: 'example@example.com',
			passwordHash: 'hashedPassword', // Replace with your hashed password
			// You can optionally add projects and articles here based on your schema
		};

		console.log('Seeding user:', userData);

		const user = new UserModel(userData);
		await user.save();

		console.log('User created successfully:', user);
	} catch (error) {
		console.error('Error seeding user:', error);
	} finally {
		void mongoose.disconnect();
	}
};

void seedUser();
