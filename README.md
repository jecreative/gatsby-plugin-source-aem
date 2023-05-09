# Gatsby Plugin Source AEM

This Gatsby plugin sources data from Adobe Experience Manager (AEM), allowing you to build Gatsby sites with content managed in AEM.

## Installation

Install the plugin with npm or yarn:

```sh
npm install gatsby-plugin-source-aem
```

or

```sh
yarn add gatsby-plugin-source-aem
```

## Configuration

Add the plugin to your gatsby-config.js file and configure the plugin options:

```
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-source-aem",
      options: {
        serviceURL: "https://example.com/aem", // AEM instance URL
        endpoint: "/path/to/your/endpoint", // API endpoint for your AEM instance
        path: "src/data", // Destination path for AEM data
        persistedQueries: ["path/to/query1.graphql", "path/to/query2.graphql"], // List of GraphQL query files
        graphqlSchema: "path/to/schema.graphql", // Path to the GraphQL schema file
      },
    },
  ],
};
```

## Plugin Options

* `serviceURL`: The URL of your AEM instance.
* `endpoint`: The GraphQL endpoint for your AEM instance.
* `path`: The destination path/folder in AEM.
* `persistedQueries`: An array of file paths to your GraphQL queries.
* `graphqlSchema`: The file path to your GraphQL schema.

## Contributing

If you'd like to contribute to the development of this plugin, please submit a pull request or open an issue on the GitHub repository.


