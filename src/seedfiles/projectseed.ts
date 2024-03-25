import { connectToMongoDB } from '../db.js';
import { ProjectModel } from '../models/Project.model.js';
import { UserModel } from '../models/User.model.js';
import { Packages, Project, User } from '../types.js';

const projectseed = async () => {
	try {
		// Connect to MongoDB
		await connectToMongoDB();

		// Define project data
		const projectData = {
			title: 'The Quest for Love',
			description:
				"Hark, ye noble souls! Behold, 'The Quest for Love' - a wondrous endeavor where knights and maidens seeketh companionship and kindred spirits. In this gallant realm, hearts shalt entwine amidst chivalrous feats and courtly dances. With swords sheathed and banners unfurled, join us on a journey through the medieval countryside, where love's fair flame doth burn brightest.",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			createdBy: '65ce6dfc6cbae46090324ccd', // assuming user._id is the ID of the user 'Johannes'
			frontend: {
				framework: 'reactts',
				gqlClient: true,
				packages: [
					Packages.ApolloClient,
					Packages.Graphql,
					Packages.Tsx,
					Packages.Tsup,
					Packages.Nodemon,
					Packages.TypesNodemon,
				],
			},
			backend: {
				environment: 'nodets',
				gqlServer: true,
				moduleType: 'module',
				packages: [Packages.Jsonwebtoken, Packages.Cors, Packages.Bcryptjs, Packages.Tsx],
				database: 'mongodb',
			},
		};

		// Create project

		const project = new ProjectModel(projectData);

		// Save project

		await project.save();

		console.log('Project created successfully:', project);
	} catch (error) {
		console.error('Error occurred during test:', error);
	}
};

void projectseed();
