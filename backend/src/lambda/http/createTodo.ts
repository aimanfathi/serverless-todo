import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
// import * as AWS from 'aws-sdk';
// const AWSXRay = require('aws-xray-sdk');
// import * as uuid from 'uuid';
import 'source-map-support/register';
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';


const logger = createLogger('CreateToDo');
// const XAWS = AWSXRay.captureAWS(AWS);
// const docClient = new XAWS.DynamoDB.DocumentClient();
// const todoTable = process.env.TODO_TABLE;


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body);

  // TODO: Implement creating a new TODO item
  logger.info("---- Start Create ToDo ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  const newItem = await createTodo(userId, newTodo)

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }

}
