import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
//import * as AWS from 'aws-sdk';
//const AWSXRay = require('aws-xray-sdk');
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { getTodos } from '../../businessLogic/todos';


const logger = createLogger('GetToDos');
// const XAWS = AWSXRay.captureAWS(AWS);
// const docClient = new XAWS.DynamoDB.DocumentClient();
// const todoTable = process.env.TODO_TABLE;
// const todoIdIndex = process.env.TODO_ID_INDEX;


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  logger.info("---- Start Get ToDos ----");
  const userId = getUserId(event);

  const items = await getTodos(userId);

  logger.info("Get items: ", items);
  
  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
          items: items
      })
  }

}
