import 'reflect-metadata';
import { container } from "tsyringe";
import express, { urlencoded, Express } from "express";
import cors from 'cors';
import { createConnection, Connection } from "typeorm";
import { useExpressServer } from 'routing-controllers';
import { TaskController } from './src/controllers/TaskController';
import { UserController } from './src/controllers/UserController';
import { BookController } from './src/controllers/BookController';
import { PalController } from './src/controllers/PalController';

const { config } = require("./ormconfig");
const PORT = 3005;
const app: Express = express();
// let containers = [UserController, ProductController];
//===============================================
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(bodyParser.json());
// app.use(httpContext.middleware);

// console.log("ObservabilityMiddleware ==== ", ObservabilityMiddleware);
// app.post('/', (req, res) => {
  //   console.log("Express ==== ", req.body); // Log the request body
  //   // Your code to handle the request
  //   return res.send(req.body);
  // });
//=====================================

createConnection(config)
.then(async (connection) => {
  console.log("Connected to the database");
  container.resolve(TaskController);
  container.resolve(UserController);
  container.resolve(BookController);
  container.resolve(PalController);
  let containers = [UserController, BookController, PalController, TaskController];
 //================================================================ 
  // const app = createExpressServer({
  //   controllers: [UserController, ProductController], // Add your controllers here
  // });

  // app.use(express.json());

  // app.listen(PORT, () => {
  //   console.log(`Server is running on PORT ${PORT}`);
  // });

 //================================================================ 
useExpressServer(app,{
  // middlewares,

  controllers: containers,
  // controllers: [UserController],
  // defaultErrorHandler:false,
  // validation: {
  //   whitelist: true,
  //   forbidNonWhitelisted:true,
  //   forbidUnknownValues:true,
  // }
}).listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`);
})
 //================================================================ 

//  useExpressServer(app, {
//   controllers: [UserController], // we specify controllers we want to use
//   defaultErrorHandler: false
// }).listen(PORT, ()=>{
//   console.log(`Server is running on PORT ${PORT}`);
// })
//================================================================ 


})
.catch((error) => {
  console.error("Error connecting to the database:", error);
});

