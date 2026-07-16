import express from 'express';
import cors from "cors";

import dotenv from 'dotenv'
dotenv.config()

const app = express();

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cors({
  origin: true,
  credentials: true,
}));

app.disable("x-powered-by");

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

import {error} from "./middleware/errorHandler";
import { router as loginRouter } from './routes/loginRouters';
import { router as userRouter } from './routes/userRoutes'
import { router as addressRouter} from './routes/addressRoutes'
import { router as cartRouter}  from './routes/cartRoutes';
import { router as productRouter } from './routes/productRoutes';
import { router as orderRouter } from './routes/ordersRoutes'
import { router as returnOrderRouter } from './routes/returnOrderRoutes'
import { router as couponRouter } from './routes/couponsRoutes';
import { router as reviewRouter} from './routes/reviewRoutes'
import { router as checkoutRouter} from './routes/checkoutRoutes';
import { router as downloadInvoicePDF } from './routes/invoiceRoutes';
import { router as importExcelFiles} from './routes/importUserExcelFileRoutes'
import { router as dashboardRoutes } from './routes/dashboardRoutes';

app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api', loginRouter)
app.use('/api', userRouter);
app.use('/api', addressRouter)
app.use('/api', cartRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter)
app.use('/api', returnOrderRouter)
app.use('/api', couponRouter)
app.use('/api', reviewRouter)
app.use('/api', checkoutRouter)
app.use('/api', downloadInvoicePDF)
app.use('/api', importExcelFiles)
app.use('/api', dashboardRoutes)

app.use(error)

// chat web socket 
import http from 'http' 
const server = http.createServer(app); 
import { WebSocketServer, WebSocket } from "ws"; 
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
  console.log("New client connected");

  ws.on('message', (message) => {
    try {
      const data = message.toString().trim();

      if (!data) {
        return ws.send("Error: message required");
      }

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`User says: ${data}`);
        }
      });

    } catch {
      ws.send("Error: something went wrong");
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.error("WebSocket error:", err);
  });
});

export { server };
