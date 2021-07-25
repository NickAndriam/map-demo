const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    myFavorites: [MyFavorites]
  }


  type MyFavorites {
    id: ID
    name: String
    address: String
    color: String
    lnglat: [Float]
  }

  type DeleteResponse {
      deleted: Boolean!
      totalBefore: Int
      totalAfter: Int
  }

  type Mutation {
      addNewFavorite(id: ID, name: String, address: String, color: String, lnglat: [Float] ): MyFavorites
      deleteFavorite(id: ID): DeleteResponse 
  }


  `;

module.exports = typeDefs;