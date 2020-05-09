const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Schema
const typeDefs = gql`
  type Launch {
    flight_number: String
    mission_name: String
    launch_year: String
  }

  type Query {
    launches: [Launch]
  }
`;

// Resolvers for fetching data from GQL
const resolvers = {
  Query: {
    launches: async () => {
      try {
        const users = await axios.get('https://api.spacexdata.com/v3/launches/')
        return users.data.map(({ flight_number, mission_name, launch_year }) => ({
          flight_number,
          mission_name,
          launch_year
        }))
      } catch (error) {
        throw error
      }
    }
  }
}

// Creating the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))