## Extend gallery sample

![gallery-demo](https://user-images.githubusercontent.com/302314/44804882-10807480-ab99-11e8-8d1c-3c86c702523e.gif)

### Development

### .env file

Create a `.env` file at `./packages/server/` with the following structure:

```
EXTENSIONS_SOURCE="http://localhost:3001/extensions.json"
EXTEND_HOST_URL="https://sandbox.auth0-extend.com"
EXTEND_CONTAINER="your-container"
EXTEND_TOKEN="your-token"
```

#### Running the project

- Run `yarn install`
- Run `yarn start`
- Navigate to `http://localhost:3001/`
