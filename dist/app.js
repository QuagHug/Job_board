"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const verification_route_1 = __importDefault(require("./routes/verification.route"));
const company_route_1 = __importDefault(require("./routes/company.route"));
const default_route_1 = __importDefault(require("./routes/default.route"));
const job_route_1 = __importDefault(require("./routes/job.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', default_route_1.default);
app.use('/jobs', job_route_1.default);
app.use('/companies', company_route_1.default);
app.use('/api', user_route_1.default);
app.use('/verification', verification_route_1.default);
const port = process.env.PORT || 4000;
app.listen({ port }, async () => {
    await mongoose_1.default.connect(process.env.DB_URI)
        .then(() => {
        console.table({
            dbtype: "mongodb",
            port,
            dbHost: "localhost"
        });
    })
        .catch(err => {
        throw err;
    });
});
//# sourceMappingURL=app.js.map