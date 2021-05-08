import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

dotenv.config();

const startServer = async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	server.applyMiddleware({ app });

	await mongoose.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});

	app.listen({ port: 8000 }, () =>
		console.log(`Server ready at http://localhost:8000${server.graphqlPath}`)
	);
};

startServer();
