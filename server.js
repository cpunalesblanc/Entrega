const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS (para que el frontend pueda consumir el backend)
app.use(cors());

// Middleware para parsear JSON en solicitudes
app.use(express.json());
app.use(express.static(__dirname));

// Base de datos simulada de usuarios (contraseñas en texto claro para este ejemplo)
const usuarios = [
    {
      id: 1,
      username: 'user@test.com',
      password: 'user', // Contraseña en texto claro (esto no es seguro)
    },
  ];
  
  // Endpoint para login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Buscar al usuario por nombre de usuario
    const usuario = usuarios.find(user => user.username === username);
  
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  
    // Verificar si la contraseña coincide (sin hashing, comparación directa)
    if (usuario.password !== password) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  
    // Crear el token JWT si las credenciales son correctas
    const token = jsonwebtoken.sign(
      { userId: usuario.id, username: usuario.username },
      'secreto', // El secreto de la firma del JWT (debe ser seguro y privado)
      { expiresIn: '1h' } // El token expira en 1 hora
    );
  
    // Devolver el token al cliente
    return res.json({ token });
  });


// ---------- Rutas ---------
const CATEGORIES_URL = require('./api/cats/cat.json');
const PUBLISH_PRODUCT_URL = require('./api/sell/publish.json');
const PRODUCTS_URL = require('./api/cats_products/');
const PRODUCT_INFO_URL = require('./api/products/');
const PRODUCT_INFO_COMMENTS_URL = require('./api/products_comments/');
const CART_INFO_URL = require('./api/user_cart/');
const CART_BUY_URL = require('./api/cart/buy.json/');
const EXT_TYPE = ".json";


// Products
app.get('/api/products', (req, res) => {
  res.status(200).json(PRODUCT_INFO_URL);
});

// Products comments
app.get('/api/products_comments', (req, res) => {
  res.status(200).json(PRODUCT_INFO_COMMENTS_URL);
});

// Categorias
app.get('/api/cats', (req, res) => {
  res.status(200).json(CATEGORIES_URL);
});

// Categorias products
app.get('/api/cats_products', (req, res) => {
  res.status(200).json(PRODUCTS_URL);
});

// Cart
app.get('/api/user_cart', (req, res) => {
  res.status(200).json(CART_INFO_URL);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
