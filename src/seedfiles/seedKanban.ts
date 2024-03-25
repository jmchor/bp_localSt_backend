// seed.ts
import mongoose from 'mongoose';
import { connectToMongoDB } from '../db/index.js';
import { ProjectModel } from '../models/Project.model.js';
import { KanbanModel } from './../models/Kanban.model';
import { KanbanInput } from '../types.js';

const seedKanban = async () => {
	try {
		await connectToMongoDB();

		const kanbanData: KanbanInput = {
			backlog: ['Codegen'],
			todo: ['Create all the seed files'],
			doing: ['getting Mongo to work'],
			done: ['Quite a few things'],
			project: '65ce7135e121e74e37efbd01', // Replace with a valid project ID
			createdBy: '65ce6dfc6cbae46090324ccd', // Replace with a valid user ID
		};
		// Add more sample data as needed
		const result = await KanbanModel.create(kanbanData); // Insert sample data

		console.log('Successfully seeded Kanban. ', result);

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ _id: '65ce7135e121e74e37efbd01' },
			{ kanban: result._id },
			{ new: true }
		);

		console.log('Seed data inserted successfully.');
	} catch (error) {
		console.error('Error seeding Kanban:', error);
	} finally {
		await mongoose.disconnect();
	}
};

void seedKanban();
