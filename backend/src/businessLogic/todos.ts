import 'source-map-support/register'
import * as uuid from 'uuid'
import { TodosAccess } from '../dataLayer/TodosAccess'
import { TodosStorage } from '../dataLayer/TodosStorage'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'

//const logger = createLogger('todos')

const todosAccess = new TodosAccess()
const todosStorage = new TodosStorage()

export async function getTodos(userId: string): Promise<TodoItem[]> {
    return await todosAccess.getTodoItems(userId)
}

export async function createTodo(userId: string, createTodoRequest: CreateTodoRequest): Promise<TodoItem> {
    const itemId = uuid.v4();
    const createdAt = new Date().toISOString();

    const newItem = {
        todoId: itemId,
        userId: userId,
        createdAt: createdAt,
        done: false,
        attachmentUrl: null,
        ...createTodoRequest
    };
  
    await todosAccess.createTodoItem(newItem)
    return newItem
}

export async function updateTodo(userId: string, todoId: string, updateTodoRequest: UpdateTodoRequest): Promise<void> {
    await todosAccess.updateTodoItem(userId, todoId, updateTodoRequest as TodoUpdate)
    return
}

export async function deleteTodo(userId: string, todoId: string): Promise<void> {
    await todosAccess.deleteTodoItem(userId, todoId);
    return
}

export async function updateAttachmentUrl(userId: string, todoId: string): Promise<void> {
    const attachmentUrl = await todosStorage.getAttachmentUrl(todoId)
    await todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)
    return
}

export async function generateUploadUrl(attachmentId: string): Promise<string> {
    const uploadUrl = await todosStorage.getUploadUrl(attachmentId)
    return uploadUrl
}