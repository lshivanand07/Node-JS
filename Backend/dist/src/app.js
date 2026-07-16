"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.disable("x-powered-by");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const errorHandler_1 = require("./middleware/errorHandler");
const loginRouters_1 = require("./routes/loginRouters");
const userRoutes_1 = require("./routes/userRoutes");
const addressRoutes_1 = require("./routes/addressRoutes");
const cartRoutes_1 = require("./routes/cartRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const ordersRoutes_1 = require("./routes/ordersRoutes");
const returnOrderRoutes_1 = require("./routes/returnOrderRoutes");
const couponsRoutes_1 = require("./routes/couponsRoutes");
const reviewRoutes_1 = require("./routes/reviewRoutes");
const checkoutRoutes_1 = require("./routes/checkoutRoutes");
const invoiceRoutes_1 = require("./routes/invoiceRoutes");
const importUserExcelFileRoutes_1 = require("./routes/importUserExcelFileRoutes");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use('/api', loginRouters_1.router);
app.use('/api', userRoutes_1.router);
app.use('/api', addressRoutes_1.router);
app.use('/api', cartRoutes_1.router);
app.use('/api', productRoutes_1.router);
app.use('/api', ordersRoutes_1.router);
app.use('/api', returnOrderRoutes_1.router);
app.use('/api', couponsRoutes_1.router);
app.use('/api', reviewRoutes_1.router);
app.use('/api', checkoutRoutes_1.router);
app.use('/api', invoiceRoutes_1.router);
app.use('/api', importUserExcelFileRoutes_1.router);
app.use('/api', dashboardRoutes_1.router);
app.use(errorHandler_1.error);
// chat web socket 
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
exports.server = server;
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log("New client connected");
    ws.on('message', (message) => {
        try {
            const data = message.toString().trim();
            if (!data) {
                return ws.send("Error: message required");
            }
            wss.clients.forEach((client) => {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(`User says: ${data}`);
                }
            });
        }
        catch {
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
//# sourceMappingURL=app.js.map