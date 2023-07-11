import { Router } from "express";

const groceryRouter = Router();

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
  const {cart } = request.session;
  if (!cart) {
    return response.send('You have not cart session yet.');
  }

  return response.send(cart);
});

groceryRouter.post("/shopping/cart/item", (request, response) => {
  const { item, quantity } = request.body;
  const cartItem = { item, quantity };

  const { cart } = request.session;

  if (cart) {
    request.session.cart?.items.push(cartItem);
  } else {
    request.session.cart = {
      items: [cartItem],
    };
  }

  return response.send(201);
});

export default groceryRouter;
