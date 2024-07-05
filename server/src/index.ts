import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PORT } from './constant/index.js'
import { resolvers, typeDefs } from './schema/index.js'
const app = express()
const httpServer = http.createServer(app)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// export const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }
//   type City {
//     name: String
//     description: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//     cities: [City]
//   }
// `

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin'
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster'
//   }
// ]

// const cities = [
//   {
//     name: 'Ha Noi',
//     description: '123'
//   },
//   {
//     name: 'HCM',
//     description: '456'
//   }
// ]

// // Resolvers define how to fetch the types defined in your schema.
// // This resolver retrieves books from the "books" array above.
// export const resolvers = {
//   Query: {
//     books: () => books,
//     cities: () => cities
//   }
// }

const startServer = async () => {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  // Set up Apollo Server
  await server.start()
  app.use(cors(), bodyParser.json(), expressMiddleware(server))
  await new Promise((resolve: any) => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:4001`)
}
startServer()
