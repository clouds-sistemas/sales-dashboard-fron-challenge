import app from './server';

const port = process.env.PORT || 3333


app.listen(port, () => {
  console.log('🚀 Servidor rodando em http://localhost:3333');
});

