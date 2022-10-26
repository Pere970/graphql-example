# GraphQL Example
This is a GraphQL example built using NodeJS and ExpressJS. It creates a GraphQL server to query for videogames and its publishers.

## Development

requires

```
node >= 12.0
```

to install node modules

```
npm i
```

## Run App

After having installed all the modules, run the following command to run a GraphQL server and UI to interact with.

```
npm run devStart
```

It'll run a server on the port 5001 and it can be accessed via UI by going to 
```
localhost:5001/graphql
```

## Query Examples
To get all published games only returning its names:
```
{
    games{
        name
    }
}
```

To get all game publishers returning its names, ids and published games(only name):
```
{
    publishers{
        id,
        name,
        games{
            name
        }
    }
}
```

## Mutation Examples

To add a new game to the list and return the name:
```
mutation {
    addGame(
        name: "GAMENAME",
        publisherId: PUBLISHER_ID (INT)
        ){
            name
        }
}
```
