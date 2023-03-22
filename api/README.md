## The api is for GraphQL queries and mutations
### You can query either as follows depending on your needs

#### Querying for a single item
* Define variables first however
```
query ExampleQuery($id: ID, $title: String) {
  collections {
    id
    items {
      id
      name
      imageUrl
      price
    }
  }
  collection (id: $id) {
    id
    title
    items {
      id
      name
      imageUrl
      price
    }
  }
  getCollectionByTitle(title: $title) {
    title
    items {
      id
      name
      price
      imageUrl
    }
  }
}

mutation ($title: String!, $item: ItemInput!) {
  addItemToCollection(title: $title, item: $item) {
    title
    items {
      id
      imageUrl
      price
    }
  }
}

```