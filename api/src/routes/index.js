const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Product, Category, Purchase } = require('../db');
const Stripe = require('stripe');
const countries = require('countryjs');

const router = Router();
const stripe = new Stripe('sk_test_51Le5DzE5V5AOBrk1ZDHfa6zzn4eJ5W2aIrB2XulRf7NyG9odUtyJpuXcQMZCDrBRnXei2b5Vi6gYJICjBNA7pQbB00aniY9lBf');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get('https://fakestoreapi.com/products');
  const apiInfo = await apiUrl.data.map(el => {
    return {
      id: el.id,
      name: el.title,
      stock: Math.floor(Math.random() * 100),
      price: el.price,
      rating: el.rating.count,
      image: el.image,
      description: el.description,
      category: el.category
    }
  });
  return apiInfo;
}

const getDbInfo = async () => {
  return await Product.findAll({
    include: {
      model: Category,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
}

const getAllProducts = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  return dbInfo.concat(apiInfo);
}

const saveCategories = async () => {
  const apiUrl = await axios.get('https://fakestoreapi.com/products/categories');
  await apiUrl.data.map(el => {
    Category.findOrCreate({
      where: { name: el }
    })
  });
}

router.get('/products', async (req, res) => {
  try {
    const name = req.query.name;
    let allProducts = await getAllProducts();
    if (name) {
      let productName = allProducts.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
      productName.length ?
      res.status(200).send(productName) :
      res.status(404).send('Product Not Found');
    } else {
      res.status(200).send(allProducts)
    }
  } catch(e) {
    console.log(e)
  }
})

router.get('/categories', async (req, res) => {
  await saveCategories();
  const savedCategories = await Category.findAll();
  res.send(savedCategories);
})

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = await getAllProducts();
  if (id) {
    let product = await products.filter(el => el.id == id);
    product.length ? 
    res.status(200).send(product) :
    res.status(404).send('Product Not Found');
  }
})

router.post('/product', async (req, res) => {
  let {
    name,
    stock,
    price,
    rating,
    image,
    description,
    category
  } = req.body;

  let createProduct = await Product.create({
    name,
    stock,
    price,
    rating,
    image,
    description
  })

  let categoryDb = await Category.findAll({
    where: { name: category }
  })

  createProduct.addCategory(categoryDb);
  res.send('Product Created');
})

router.post('/payment', async (req, res) => {
  try {
    const { id, amount } = req.body;
  
    await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'E-Commerce Product',
      payment_method: id,
      confirm: true
    })

    res.status(200).send('Succesfull Payment');
  } catch(error) {
    res.status(200).json(error.raw.message);
  }
})

router.get('/countries', async (req, res) => {
  const countriesData = countries.all().filter(el => el.name && el.provinces).map(el => { return { country: el.name, provinces: el.provinces } })
  res.status(200).json(countriesData);
})

router.post('/purchase', async (req, res) => {
  let {
    user,
    firstName,
    lastName,
    phoneNum,
    country,
    stateProvince,
    city,
    address,
    product,
    income,
    state
  } = req.body;

  await Purchase.create({
    user,
    firstName,
    lastName,
    phoneNum,
    country,
    stateProvince,
    city,
    address,
    product,
    income,
    state
  })

  res.send('Purchase Completed');
})

router.get('/purchases', async (req, res) => {
  let { user } = req.query;

  let data = await Purchase.findAll({
    where: { user: user }
  })

  if(data) {
    res.status(200).send(data);
  } else {
    res.status(404).send('Not Found');
  }
})

module.exports = router;