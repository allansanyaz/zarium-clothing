// Configuration information for the server
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

// import the typeDefs and resolvers
import typeDefs from "./schema/typedefs.js";
import resolvers from "./schema/resolvers.js";
// for the file system
import fs from "fs";
// imports for the firebase app
import { initializeApp } from "firebase/app";

const dataFileString = fs.readFileSync("../firebase-config.json", "utf8");
const firebaseConfigParams = JSON.parse(dataFileString);

// server configuration
const app = express();
// our httpServer handles incoming requests to our express app
// Below, we tell Apollo Serevr to "drain" this http server
// enabling our servers to shut down gracefully
const httpServer = http.createServer(app);

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: firebaseConfigParams.apiKey,
	authDomain: firebaseConfigParams.authDomain,
	projectId: firebaseConfigParams.projectId,
    databaseURL: firebaseConfigParams.databaseURL,
	storageBucket: firebaseConfigParams.storageBucket,
	messagingSenderId: firebaseConfigParams.messagingSenderId,
	appId: firebaseConfigParams.appId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Same ApolloServer initialization as before, plus the drain plugin
// for our http server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
        return {
            headers: req.headers,
            firebaseApp
        };
    }
});

// ensure we wait for our server to start before we start our app
await server.start();

// set up our express middleware to handle CORS, body parsing, and
// our expressMiddleware function

app.use(
  '/',
  cors(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an ApolloServer instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.toekn,
    }),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);