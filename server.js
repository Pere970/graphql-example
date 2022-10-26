const express = require('express')

const { graphqlHTTP } = require('express-graphql');
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const publishers = [
    { id: 1, name: 'Activision'},
    { id: 2, name: 'PlayStation Studios'},
    { id: 3, name: 'Nintendo'},
    { id: 4, name: 'Microsoft'}
]

const games = [
    { id: 1, name: 'Call of Duty', publisherId: 1},
    { id: 2, name: 'Destiny', publisherId: 1},
    { id: 3, name: 'The Last of Us', publisherId: 2},
    { id: 4, name: 'God of War', publisherId: 2},
    { id: 5, name: 'Pokemon', publisherId: 3},
    { id: 6, name: 'Super Mario Bros', publisherId: 3},
    { id: 7, name: 'Halo', publisherId: 4},
    { id: 8, name: 'Microsoft Flight Simulator', publisherId: 4}
]

const GameType = new GraphQLObjectType({
    name: 'Game',
    description: 'This represents a videogame',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        publisherId: { type: new GraphQLNonNull(GraphQLInt) }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        games: {
            type: new GraphQLList(GameType),
            description: 'List of published games',
            resolve: () => games
        }
    })
})

const schema = new GraphQLSchema ({
    query: RootQueryType
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5001., () => console.log('Server running'))