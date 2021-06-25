import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import * as AWS from 'aws-sdk';
// const AWSXRay = require('aws-xray-sdk');
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { generateUploadUrl, updateAttachmentUrl } from '../../businessLogic/todos';


const logger = createLogger('GenUploadURL');
// const XAWS = AWSXRay.captureAWS(AWS);
// const docClient = new XAWS.DynamoDB.DocumentClient();
// const todoTable = process.env.TODO_TABLE;
// const bucketName = process.env.TODO_S3_BUCKET;
// const urlExpiration = +process.env.SIGNED_URL_EXPIRATION;

// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// });


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  logger.info("---- Start Generate Upload URL ----");
  logger.info("Event: ", event);

  const userId = getUserId(event);
  
  // Upload file to s3 and get uploadUrl
  const uploadUrl = await generateUploadUrl(todoId);
  logger.info("Upload URL: ", uploadUrl);

  // Save file to DynamoDB
  await updateAttachmentUrl(userId, todoId)


  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl
      })
  }

}
