"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const groceries_1 = __importDefault(require("./routes/groceries"));
const markets_1 = __importDefault(require("./routes/markets"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((request, response, next) => {
    console.log(`${request.method}:${request.url}`);
    next();
});
app.use("/api/v1/auth", auth_1.default);
app.use((request, response, next) => {
    if (request.session.user)
        return next();
    return response.status(401).send("You must be logged in to do that.");
});
app.use("/api/v1/groceries", groceries_1.default);
app.use("/api/v1/markets", markets_1.default);
app.listen(PORT, () => console.log(`Running Express Server on port ${PORT}`));
