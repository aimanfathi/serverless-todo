import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWSXRay from 'aws-xray-sdk'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { createLogger } from '../utils/logger'

const logger = createLogger('todosAccess')

const XAWS = AWSXRay.captureAWS(AWS)

export class TodosAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE,
        private readonly todoIdIndex = process.env.TODO_ID_INDEX
    ) {}


    async getTodoItems(userId: string): Promise<TodoItem[]> {
        const result = await this.docClient.query({
            TableName: this.todoTable,
            IndexName: this.todoIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();

        const items = result.Items
        return items as TodoItem[]
    }


    async createTodoItem(todoItem: TodoItem): Promise<void> {
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise();

        return
    }

    async updateTodoItem(userId: string, todoId: string, todoUpdate: TodoUpdate): Promise<void> {
        logger.info(`Updating todo item ${todoId} by user ${userId}`)
        logger.info('Update Object: ', {todoUpdate});

        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set done = :done',
            ExpressionAttributeValues: {
                ":done": todoUpdate.done
            }
        }).promise();

        return
    }

    async deleteTodoItem(userId: string, todoId: string): Promise<void> {
        logger.info(`Deleting todo item ${todoId} by user ${userId}`)

        await this.docClient.delete({
            TableName: this.todoTable,
            Key: {
              todoId,
              userId
            }
        }).promise();

        return
    }

    async updateAttachmentUrl(userId: string, todoId: string, attachmentUrl: string): Promise<void> {
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            }
        }).promise();

        return
    }

}