# Gatsby Plugin Source AEM

Source data from Adobe Experience Manager (AEM) to build Gatsby sites using content managed in AEM with this plugin.

## 🚀 Installation

Install the plugin using npm or yarn:

```sh
npm install gatsby-plugin-source-aem
```

or

```sh
yarn add gatsby-plugin-source-aem
```

## 🛠 Configuration

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-source-aem',
      options: {
        serviceURL: 'https://publish-XXXXXX-XXXXXXX.adobeaemcloud.com', // Your AEM instance URL
        endpoint: '/content/cq:graphql/{YOUR-SITE}/endpoint', // GraphQL endpoint for your AEM instance
        path: 'your-site-project-folder', // The destination path/folder in AEM
        persistedQueries: ['your-persisted-query-name'], // GraphQL persisted query names published in AEM
        graphqlSchema: 'path/to/schema.graphql', // Path to the GraphQL schema file
      },
    },
  ],
};
```

## 📚 Plugin Options

- `serviceURL`: The URL of your AEM instance.
- `endpoint`: The GraphQL endpoint for your AEM instance.
- `path`: The destination path/folder in AEM.
- `persistedQueries`: Array of GraphQL persisted query names published in AEM.
- `graphqlSchema`: The file path for your GraphQL schema customization.

## ⚠️ Union Types Limitation

Currently, union types work only with content fragments that have a prefix of "Component" in their name. For example, a
valid content fragment name would be `Component: Hero`. This limitation applies specifically to union types, and
improvements are welcome.

Union types will only apply to those prefixed with "Component," which can then be referenced as a `unionType` in the
`schema.graphql` files like this:

```graphql
type Model implements Node {
  components: [Components]!
}
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this plugin's development, please submit a pull request or
open an issue on the [GitHub repository](https://github.com/jecreative/gatsby-plugin-source-aem).

```

```
