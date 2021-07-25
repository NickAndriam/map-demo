const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./queries')

let myFavorites = []

const resolvers = {
    Query: {
        myFavorites: () => myFavorites,
    },
    Mutation: {
        addNewFavorite(_, payload) {
            const newData = { ...payload }
            myFavorites.push(newData)
            return newData
        },
        deleteFavorite: (parent, { id }) => {
            let toDelete = myFavorites.find(favorite => favorite.id === id)
            let totalBefore = myFavorites.length
            let deleted = false
            if (toDelete) {
                myFavorites = myFavorites.filter(favorite => favorite.id !== id)
                deleted = true
            }
            let totalAfter = myFavorites.length
            return {
                deleted,
                totalBefore,
                totalAfter
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server is at ${url}`)
})


