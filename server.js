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

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
