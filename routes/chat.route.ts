import express from "express";
import * as MDW from "../middlewares";
import { findCandidateByChat, findMessage } from "../services";
import { formatJsonApiCollection, formatJsonApiResource } from "../utils/formatJson";

const chatRouter = express.Router();

chatRouter.get("/recruiter-chat", 
    MDW.wrapper(findCandidateByChat),
    formatJsonApiCollection
);

chatRouter.get("/recruiter-chat", 
    MDW.wrapper(findMessage),
    formatJsonApiCollection
);

export default chatRouter;