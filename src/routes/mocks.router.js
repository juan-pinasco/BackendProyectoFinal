import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

export const generateProducts = () => {
  const product = {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int(100),
    category: faker.commerce.department(),
  };
  return product;
};

router.get("/", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const productsMock = generateProducts();
    products.push(productsMock);
  }
  res.json(products);
});

export default router;
