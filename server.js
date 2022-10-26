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
        publisherId: { type: new GraphQLNonNull(GraphQLInt) },
        publisher: { 
            type : PublisherType,
            resolve: (game) => {
                return publishers.find(publisher => publisher.id == game.publisherId)
            }
        }
    })
})

const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    description: 'This represents a videogame publisher',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        games: {
            type: new GraphQLList(GameType),
            resolve: (publisher) => {
                return games.filter(game => game.publisherId == publisher.id)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        game: {
            type: GameType,
            description: 'A single game',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => games.find(game => game.id == args.id)
        },
        games: {
            type: new GraphQLList(GameType),
            description: 'List of published games',
            resolve: () => games
        },
        publisher: {
            type: PublisherType,
            description: 'A single publisher',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => publishers.find(publishers => publishers.id == args.id)
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            description: 'List of game publishers',
            resolve: () => publishers
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addGame: {
            type: GameType,
            description: 'Add a new published game',
            args : {
                name : { type: GraphQLNonNull(GraphQLString)},
                publisherId : { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const game = { 
                    id: games.length + 1,
                    name: args.name,
                    publisherId: args.publisherId
                }
                games.push(game)
                return game
            }
        },
        addPublisher: {
            type: PublisherType,
            description: 'Add an game publisher',
            args: {
              name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
              const publisher = { id: publishers.length + 1, name: args.name }
              publishers.push(publisher)
              return publisher
            }
          }
    })
})

const schema = new GraphQLSchema ({
    query: RootQueryType,
    mutation: RootMutationType
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5001., () => console.log('Server running'))