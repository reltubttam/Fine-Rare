import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import * as resolvers from './resolvers';

const schemaText = readFileSync(`${__dirname}/schema.graphql`).toString();

const schema = buildSchema(schemaText);

export default createHandler({
  schema,
  rootValue: resolvers,
});
