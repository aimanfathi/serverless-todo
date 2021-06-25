import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import 'source-map-support/register'
// import * as AWS from 'aws-sdk';
// const AWSXRay = require('aws-xray-sdk');
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { updateTodo } from '../../businessLogic/todos';


const logger = createLogger('UpdateToDo');
// const XAWS = AWSXRay.captureAWS(AWS);
// const docClient = new XAWS.DynamoDB.DocumentClient();
// const todoTable = process.env.TODO_TABLE;


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  logger.info("---- Start Update ToDo ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  await updateTodo(userId, todoId, updatedTodo);

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
  
}
