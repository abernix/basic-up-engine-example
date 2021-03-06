import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";

import { schema } from "./schema";

const PORT = process.env.PORT || 3000;
const server = express();

// allow for any url to be GraphQL since this is a lambda function
server.post("*", bodyParser.json(), graphqlExpress({ schema, tracing: true }));
server.get("*", (...args) => {
  const [req] = args;
  return graphiqlExpress({ endpointURL: req.path })(...args);
});

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
});
