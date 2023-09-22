import express from "express";

const app = express();
const port = 9000;
app.use("/", (req, res) => {
  res.json({ message: "Hello From Express App" });
});

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});

// import 'reflect-metadata';
// import { container } from "tsyringe";
// import express, { urlencoded, Express } from "express";
// import cors from 'cors';
// import { createConnection, Connection } from "typeorm";
// import { useExpressServer } from 'routing-controllers';
// import { TaskController } from './controllers/TaskController';
// import { UserController } from './controllers/UserController';
// import { BookController } from './controllers/BookController';
// import { PalController } from './controllers/PalController';
// import { HomeController } from './controllers/HomeController';

// const { config } = require("./../ormconfig");
// const PORT = 3005;
// const app: Express = express();

// app.use(cors());

// createConnection(config)
// .then(async (connection) => {
//   console.log("Connected to the database ==== ");
//   container.resolve(TaskController);
//   container.resolve(UserController);
//   container.resolve(BookController);
//   container.resolve(PalController);
//   let containers = [HomeController];
//   // let containers = [HomeController,UserController, BookController, PalController, TaskController];
//  //================================================================ 
//   // const app = createExpressServer({
//   //   controllers: [UserController, ProductController], // Add your controllers here
//   // });

//   // app.use(express.json());

//   // app.listen(PORT, () => {
//   //   console.log(`Server is running on PORT ${PORT}`);
//   // });

//  //================================================================ 
// useExpressServer(app,{
//   // middlewares,

//   controllers: containers,
//   // controllers: [UserController],
//   // defaultErrorHandler:false,
//   // validation: {
//   //   whitelist: true,
//   //   forbidNonWhitelisted:true,
//   //   forbidUnknownValues:true,
//   // }
// }).listen(PORT, ()=>{
//   console.log(`Server is running on PORT ${PORT}`);
// })
//  //================================================================ 

// //  useExpressServer(app, {
// //   controllers: [UserController], // we specify controllers we want to use
// //   defaultErrorHandler: false
// // }).listen(PORT, ()=>{
// //   console.log(`Server is running on PORT ${PORT}`);
// // })
// //================================================================ 


// })
// .catch((error) => {
//   console.error("Error connecting to the database:", error);
// });

