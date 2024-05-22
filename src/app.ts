import { OrderRoutes } from './app/modules/order/order.route';
import express, { Application, Request, Response } from 'express'

import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//Application
app.use('/api/products', ProductRoutes)
app.use("/api/orders", OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// Route not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
