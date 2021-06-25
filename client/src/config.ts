// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'aodowt19o8'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`


export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-q3vavdua.us.auth0.com',            // Auth0 domain
  clientId: 'Mq7OAqD6fWmSOSozJsOqetxXPdk4gNYa',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
