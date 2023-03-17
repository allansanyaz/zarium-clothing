// This will hold the types of information we need
// We will want to grab the whole collections, a specific collection, and a specific collection by title
// We will also want to be able to add a collection, update a collection, and delete a collection

const typeDefs = `#graphql
    type Query {
        collections: [Collection!]!
        collection(id: ID!): Collection
        getCollectionByTitle(title: String): Collection
    }

    type Collection {
        id: ID!
        title: String!
        items: [Item!]!
    }

    type Item {
        id: ID!
        name: String!
        imageUrl: String!
        price: Float!
    }

    type Mutation {
        addItemToCollection(title: String!, item: ItemInput!): Collection
    }

    input ItemInput {
        id: ID!
        name: String!
        imageUrl: String!
        price: Float!
    }
`;

export default typeDefs;
