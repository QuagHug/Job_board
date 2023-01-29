import express from "express";
import * as MDW from "../middlewares";
import { createJob, findManyJob, searchJob } from "../services";
import { formatJsonApiCollection, formatJsonApiResource } from "../utils/formatJson";

const jobRouter = express.Router();

jobRouter.get("/", 
    MDW.wrapper(findManyJob),
    formatJsonApiCollection
);

jobRouter.get("/search", 
    MDW.wrapper(searchJob),
    formatJsonApiCollection
);    

jobRouter.post("/", 
    MDW.wrapper(createJob),
);     


export default jobRouter;