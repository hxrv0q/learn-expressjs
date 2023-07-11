"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groceryRouter = (0, express_1.Router)();
const groceries = [
    {
        item: "milk",
        quantity: 1,
    },
    {
        item: "bread",
        quantity: 2,
    },
    {
        item: "eggs",
        quantity: 12,
    },
];
groceryRouter.get("/", (request, response) => {
    response.send(groceries);
});
groceryRouter.get("/:item", (request, response) => {
    const item = request.params.item;
    const grocery = groceries.find((grocery) => grocery.item === item);
    if (grocery) {
        return response.send(grocery);
    }
    return response.status(404).send("Grocery not found");
});
groceryRouter.post("/", (request, response) => {
    console.log(request.body);
    groceries.push(request.body);
    response.send(201);
});
groceryRouter.get("/shopping/cart/", (request, response) => {
    const { cart } = request.session;
    if (!cart) {
        return response.send('You have not cart session yet.');
    }
    return response.send(cart);
});
groceryRouter.post("/shopping/cart/item", (request, response) => {
    var _a;
    const { item, quantity } = request.body;
    const cartItem = { item, quantity };
    const { cart } = request.session;
    if (cart) {
        (_a = request.session.cart) === null || _a === void 0 ? void 0 : _a.items.push(cartItem);
    }
    else {
        request.session.cart = {
            items: [cartItem],
        };
    }
    return response.send(201);
});
exports.default = groceryRouter;
