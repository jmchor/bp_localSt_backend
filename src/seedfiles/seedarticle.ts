import mongoose from 'mongoose';
import { connectToMongoDB } from '../db.js';
import { UserModel } from '../models/User.model.js';
import { ProjectModel } from '../models/Project.model.js';
import { KanbanModel } from '../models/Kanban.model.js';
import { ArticleInput } from '../types.js';
import { ArticleModel } from '../models/Article.model.js';

const seedArticles = async () => {
	try {
		await connectToMongoDB();

		const articleData: ArticleInput = {
			title: 'Sample Article 1',
			text: 'This is a sample article text.',
			imageUrl: 'https://example.com/sample-image.jpg',
			externalLink: 'https://example.com/sample-article',
			createdBy: '65ce6dfc6cbae46090324ccd', // Replace with a valid user ID
		};
		// Add more sample data as needed
		const result = await ArticleModel.create(articleData); // Insert sample data

		console.log('Article ID:', result._id);

		const updatedUser = await UserModel.findOneAndUpdate(
			{ _id: '65ce6dfc6cbae46090324ccd' }, // Replace with a valid user ID
			{ $push: { 'articles.authored': result._id } },
			{ new: true }
		);

		console.log('Seed data inserted successfully.');
	} catch (error) {
		console.error('Error seeding Articles:', error);
	} finally {
		await mongoose.disconnect();
	}
};

void seedArticles();
