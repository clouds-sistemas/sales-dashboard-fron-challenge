import express from 'express';
import cors from 'cors';

import salesRouter from '../src/sales/sales.routes'

const app = express();
app.use(cors());

app.use('/api/v1/sales', salesRouter);
// app.use("*", (request, response) => response.status(404).json({ error: "Página não encontrada" }))


export default app;