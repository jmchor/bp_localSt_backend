import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { connectToMongoDB } from './db.js';
import { UserModel } from './models/User.model.js';

config();

const app = express();

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			const token = req.headers.authorization || '';
			if (!token) {
				return { req, user: null };
			}

			try {
				const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
				const currentUser = await UserModel.findById(decodedToken.userId);
				req.currentUser = currentUser;

				return { req };
			} catch (error) {
				console.error('Invalid token:', error);
				return { req, user: null };
			}
		},
	});

	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });

	await connectToMongoDB();

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	});
}

startServer().catch((error) => {
	console.error('Error starting server:', error);
});
