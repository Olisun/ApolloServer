const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Schema
const typeDefs = gql`
  type Launch {
    flight_number: String
    mission_name: String
    launch_year: String
    rocket: [RocketType]
  }

  type RocketType {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  type Query {
    launches: [Launch]
    rocket: [RocketType]
  }
`;

// Resolvers for fetching data from GQL
const resolvers = {
  Query: {
    launches: async () => {
      try {
        const launches = await axios.get('https://api.spacexdata.com/v3/launches/')
        return launches.data.map(({ flight_number, mission_name, launch_year, rocket }) => ({
          flight_number,
          mission_name,
          launch_year,
          rocket: rocket.rocket_id
        }))
      } catch (error) {
        throw error
      }
    }
  },
  // Launch: {
  //   rocket: async () => {
  //     try {
  //       const rocket = await axios.get('https://api.spacexdata.com/v3/rockets/')
  //       return rocket.data.filter(({ rocket_id, rocket_name, rocket_type }) => ({
  //         rocket_id,
  //         rocket_name,
  //         rocket_type,
  //       }))
  //     } catch (error) {
  //       throw error
  //     }
  //   }
  // }
}

// Creating the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))