// seed.ts
import mongoose from 'mongoose';
import { connectToMongoDB } from '../db.js';
import { UserModel } from '../models/User.model.js';
import { ProjectModel } from '../models/Project.model.js';
import { KanbanModel } from '../models/Kanban.model.js';
import { ArticleModel } from '../models/Article.model.js';

const seek = async () => {
	try {
		await connectToMongoDB();

		const oneProject = await ProjectModel.findById('65ce7135e121e74e37efbd01').populate({
			path: 'createdBy',
			model: UserModel,
			populate: {
				path: 'articles.authored',
				model: ArticleModel,
			},
		});

		console.log('project:', oneProject);
	} catch (error) {
		console.error('Error seeding user:', error);
	} finally {
		void mongoose.disconnect();
	}
};

void seek();
