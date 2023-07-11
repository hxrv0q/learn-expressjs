"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (request, response) => {
    const { username, password } = request.body;
    if (username && password) {
        if (request.session.user) {
            return response.send("You are already logged in.");
        }
        request.session.user = { username };
        return response.send(request.session);
    }
    return response.status(400).send("You must provide a username and password.");
});
authRouter.post("/logout", (request, response) => {
});
authRouter.post("/register", (request, response) => {
});
authRouter.get("/me", (request, response) => {
});
exports.default = authRouter;
