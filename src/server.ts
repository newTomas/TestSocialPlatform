import { createApp } from './app.js';
import { serverConfig } from './config/index.js'; // Наш конфиг для порта

const app = createApp();
const PORT = serverConfig.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
