import { createApp } from './app.js';
import { serverConfig } from './config/index.js'; // Наш конфиг для порта
import prisma from './utils/prisma.utils.js';

const app = createApp();
const PORT = serverConfig.port;

await prisma.$connect().then(() => console.log(`Prisma connected`));

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
