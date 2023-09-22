"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const TaskController_1 = require("./controllers/TaskController");
const UserController_1 = require("./controllers/UserController");
const BookController_1 = require("./controllers/BookController");
const PalController_1 = require("./controllers/PalController");
const { config } = require("./../ormconfig");
const PORT = 3005;
const app = (0, express_1.default)();
// let containers = [UserController, ProductController];
//===============================================
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// app.use(bodyParser.json());
// app.use(httpContext.middleware);
// console.log("ObservabilityMiddleware ==== ", ObservabilityMiddleware);
// app.post('/', (req, res) => {
//   console.log("Express ==== ", req.body); // Log the request body
//   // Your code to handle the request
//   return res.send(req.body);
// });
//=====================================
(0, typeorm_1.createConnection)(config)
    .then(async (connection) => {
    console.log("Connected to the database");
    tsyringe_1.container.resolve(TaskController_1.TaskController);
    tsyringe_1.container.resolve(UserController_1.UserController);
    tsyringe_1.container.resolve(BookController_1.BookController);
    tsyringe_1.container.resolve(PalController_1.PalController);
    let containers = [UserController_1.UserController, BookController_1.BookController, PalController_1.PalController, TaskController_1.TaskController];
    //================================================================ 
    // const app = createExpressServer({
    //   controllers: [UserController, ProductController], // Add your controllers here
    // });
    // app.use(express.json());
    // app.listen(PORT, () => {
    //   console.log(`Server is running on PORT ${PORT}`);
    // });
    //================================================================ 
    (0, routing_controllers_1.useExpressServer)(app, {
        // middlewares,
        controllers: containers,
        // controllers: [UserController],
        // defaultErrorHandler:false,
        // validation: {
        //   whitelist: true,
        //   forbidNonWhitelisted:true,
        //   forbidUnknownValues:true,
        // }
    }).listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
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
    console.error("Error connecting to the database:", error);
});
