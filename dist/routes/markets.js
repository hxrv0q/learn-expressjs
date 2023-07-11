"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketRouter = (0, express_1.Router)();
const supermarkets = [
    { id: 1, store: "Whole Foods", miles: 0.6 },
    { id: 2, store: "Trader Joes", miles: 1.2 },
    { id: 3, store: "Safeway", miles: 2.8 },
    { id: 4, store: "Berkeley Bowl", miles: 2.5 },
    { id: 5, store: "Target", miles: 3.5 },
    { id: 6, store: "Lucky", miles: 1.8 }
];
marketRouter.get("/", (request, response) => {
    const { miles } = request.query;
    const parsedMiles = parseFloat(miles);
    if (parsedMiles) {
        const nearbyMarkets = supermarkets.filter(supermarket => supermarket.miles <= parsedMiles);
        return response.send(nearbyMarkets);
    }
    return response.send(supermarkets);
});
exports.default = marketRouter;
