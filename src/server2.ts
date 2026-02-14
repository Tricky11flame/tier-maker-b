// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import cors from 'cors';
// import { authenticate } from './middlewares/auth.ts'; 
// import { validate } from './middlewares/zod.ts';
// import { userSchema, boardSchema , columnSchema , taskSchema} from "./schema/zod.ts"

// const prisma = new PrismaClient();
// const app = express();
// app.use(cors());
// app.use(express.json());
// // -- USERS --
// app.post('/users', authenticate, validate(userSchema), async (req, res) => {
//   const user = await prisma.user.create({ data: { email: req.body.email } });
//   res.json({ id: user.id });
// });

// app.get('/users', authenticate, async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.get('/users/:id', authenticate, async (req, res) => {
//   const user = await prisma.user.findUnique({ where: { id: req.params.id as string } });
//   res.json(user);
// });

// app.put('/users/:id', authenticate, validate(userSchema), async (req, res) => {
//   const user = await prisma.user.update({
//     where: { id: req.params.id },
//     data: { email: req.body.email }
//   });
//   res.json(user);
// });

// app.delete('/users/:id', authenticate, async (req, res) => {
//   await prisma.user.delete({ where: { id: req.params.id as string } });
//   res.status(204).send();
// });

// // -- BOARD -- 
// app.post('/boards', authenticate, validate(boardSchema), async (req, res) => {
//   const board = await prisma.board.create({
//     data: {
//       name: req.body.name,
//       color: req.body.color,
//       userId: req.body.userId,
//       columnOrder: req.body.columnOrder || []
//     }
//   });
//   res.json({ id: board.id });
// });

// app.get('/boards', authenticate, async (req, res) => {
//   const boards = await prisma.board.findMany({ include: { columns: true } });
//   res.json(boards);
// });

// app.get('/boards/:id', authenticate, async (req, res) => {
//   const board = await prisma.board.findUnique({
//     where: { id: req.params.id },
//     include: { columns: { include: { tasks: true } } }
//   });
//   res.json(board);
// });

// app.put('/boards/:id', authenticate, validate(boardSchema.partial()), async (req, res) => {
//   const board = await prisma.board.update({
//     where: { id: req.params.id },
//     data: req.body
//   });
//   res.json(board);
// });

// app.delete('/boards/:id', authenticate, async (req, res) => {
//   await prisma.board.delete({ where: { id: req.params.id as string } });
//   res.status(204).send();
// });
// // -- COLS -- 
// app.post('/columns', authenticate, validate(columnSchema), async (req, res) => {
//   const column = await prisma.column.create({
//     data: {
//       title: req.body.title,
//       color: req.body.color,
//       boardId: req.body.boardId,
//       taskOrder: req.body.taskOrder || []
//     }
//   });
//   res.json({ id: column.id });
// });

// app.get('/columns', authenticate, async (req, res) => {
//   const columns = await prisma.column.findMany();
//   res.json(columns);
// });

// app.get('/columns/:id', authenticate, async (req, res) => {
//   const column = await prisma.column.findUnique({
//     where: { id: req.params.id },
//     include: { tasks: true }
//   });
//   res.json(column);
// });

// app.put('/columns/:id', authenticate, validate(columnSchema.partial()), async (req, res) => {
//   const column = await prisma.column.update({
//     where: { id: req.params.id as string },
//     data: req.body
//   });
//   res.json(column);
// });

// app.delete('/columns/:id', authenticate, async (req, res) => {
//   await prisma.column.delete({ where: { id: req.params.id as string} });
//   res.status(204).send();
// });
// // -- TASKS -- 
// app.post('/tasks', authenticate, validate(taskSchema), async (req, res) => {
//   const task = await prisma.task.create({
//     data: {
//       content: req.body.content,
//       columnId: req.body.columnId
//     }
//   });
//   res.json({ id: task.id });
// });

// app.get('/tasks', authenticate, async (req, res) => {
//   const tasks = await prisma.task.findMany();
//   res.json(tasks);
// });

// app.get('/tasks/:id', authenticate, async (req, res) => {
//   const task = await prisma.task.findUnique({ where: { id: req.params.id } });
//   res.json(task);
// });

// app.put('/tasks/:id', authenticate, validate(taskSchema.partial()), async (req, res) => {
//   const task = await prisma.task.update({
//     where: { id: req.params.id },
//     data: req.body
//   });
//   res.json(task);
// });

// app.delete('/tasks/:id', authenticate, async (req, res) => {
//   await prisma.task.delete({ where: { id: req.params.id as string } });
//   res.status(204).send();
// });
// /*
// I have these API's
// const authenticate = (req, res, next) => {
//   ...
//   next();
// };
// app.post('/api/boards', authenticate, async (req, res) => { ... });
// app.patch('/api/boards/:id/reorder-columns', authenticate, async (req, res) => { ... });
// app.patch('/api/tasks/move', authenticate, async (req, res) => { ... });
// */

// /*  I want these API's  that are in React 
// so i want respective API in my express.ts app   
//  getBoardsHook() : code for fetching list of tierboard or now what i call them as analysis boards  , a user has multiple boards // also send apt auth with the request since ofc the api are authenticated 
//  getBoardHook() : give user auths, identification and give board identity to get the full board details as output
//  setColumnOrderHook() : an api call that changes the order of the column 
//  setTopicHook(): an api call that changes order of topic be it in a column or be int a diff column
//  addTopicsHook( : add Topics to the defaultColumn of the boards -> they are later rearrnaged
//  addNewBoardHook() : add new board for a new name and new color
//  setBoardHook(): lets the user edit board name and board color
//  */