import {
  findAll,
  create,
  findById,
  update,
  deleteOne,
} from "../services/products.service.js";

//---> /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await findAll(req.query);
    //se redirija a handlebars "products"
    res.status(200).render("products", { products });
    //res.status(201).json({ message: "Products", products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//---> /api/products/verDetalle/:pid
export const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await findById(pid);
    /*  console.log(product); */
    if (!product) {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      /* res.status(200).json({ message: "Product", product }); */
      //render quiere decir que me rendiriza la pagina de handlebars "productID"
      res.status(200).render("productID", { product });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, stock, code, category } = req.body;
  if (!title || !description || !price || !stock || !code || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newProduct = await create(req.body);
    res.status(200).redirect("/api/products");
    /* res.status(200).json({ message: "Product created", product: newProduct }); */
  } catch (error) {
    res.status(500).json({ error });
  }
};

//le saque "router.put" y le puse "router.post" por que handlebars button tiene solo 2 metodos GET Y POST
export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await update(pid, req.body);
    res.status(200).redirect(`/api/products/verDetalle/${pid}`);
    /* res.status(200).json({ message: "Product updated", productUpdated }); */
  } catch (error) {
    res.status(500).json({ error });
  }
};

//le saque "router.delete" y le puse "router.get" por que handlebars button tiene solo 2 metodos GET Y POST
export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteProduct = await deleteOne(pid);
    res.status(200).redirect("/api/products");
    /* res.status(200).json({ message: "Product Delete", product: deleteProduct }); */
  } catch (error) {
    res.status(500).json({ error });
  }
};
