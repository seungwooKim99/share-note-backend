import "./env";
import schema from "./schema";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import "./passport";
import { isAuthenticated } from "./middlewares";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema, context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server is Running on http://localhost:${PORT}`));