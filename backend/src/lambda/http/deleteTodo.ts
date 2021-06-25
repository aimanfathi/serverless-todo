import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import * as AWS from 'aws-sdk';
// const AWSXRay = require('aws-xray-sdk');
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { deleteTodo } from '../../businessLogic/todos';


const logger = createLogger('DeleteToDo');
// const XAWS = AWSXRay.captureAWS(AWS);
// const docClient = new XAWS.DynamoDB.DocumentClient();
// const todoTable = process.env.TODO_TABLE;


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  logger.info("---- Start Delete ToDo ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  await deleteTodo(userId, todoId);

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: ''
  }

}
