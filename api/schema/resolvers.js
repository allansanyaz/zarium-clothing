// this file will resolve our graphQL queries and mutations
// it will return the information we need in a particular format
// we will need to also query the firebase database to get the information we need
import { getDatabase, ref, update, child, push } from "firebase/database";

// get the base URL of the database
const baseURL = "https://zarium-clothing-db-default-rtdb.firebaseio.com/";

// support function for getting the database
const getCollectionDB = async () => {
    // fetch the data from the realtime database
    const data = await fetch(`${baseURL}/collections.json`);
    // convert the data to json
    const dataJSON = await data.json();
    // return the data
    return dataJSON;
}

// define the resolver for the collections query
const resolvers = {
    Query: {
        // return all the collections
        collections: async () => {
            // get the collections from the database
            const collections = await getCollectionDB();
            // return the collections
            return collections;
        },
        // return a specific collection
        collection: async (_, args) => {
            // get the collections from the database
            const collections = await getCollectionDB();
            // filter the collection for the specific one we want
            const collection = collections.find(collection => collection.id === args.id);
            // return the collection
            return collection;
        },
        // return a specific collection by title
        getCollectionByTitle: async (_, args) => {
            // get the collections from the database
            const collections = await getCollectionDB();
            // filter the collection for the specific one we want
            const collection = collections.find(collection => collection.title === args.title);
            // return the collection
            return collection;
        },
    },

    Mutation: {
        // add an item to a collection
        addItemToCollection: async (_, args) => {
            // get the collection from the database
            let collections = await getCollectionDB();
            // use reduce to get the index of the collection from the respective database
            let collectionInsertionIndex = 0;
            const collectionIndex = collections.reduce((acc, collection, index) => {
                // check if the collection title matches the title passed in
                if (collection.title === args.title) {
                    // define index to insert the collection to in the database
                    collectionInsertionIndex = collection.items.length;
                    // return the index
                    return index;
                }
                // return the accumulator
                return acc;
            }, 0);
            // define the firebase db
            const db = getDatabase();
            // define the key for the new item to be added to the collection
            const newItemKey = push(child(ref(db), `collections/${collectionIndex}/items`)).key;
            // add the key to the items object
            args.item.id = newItemKey;
            // update the database with the new item
            await update(ref(db, `collections/${collectionIndex}/items/${collectionInsertionIndex}`), args.item);
            // get the updated collections from the database
            collections = await getCollectionDB();
            // return the updated collection
            const collection = collections.find(collection => collection.title === args.title);
            // return the collection
            return collection;
        },
    },
}

export default resolvers;
