import { configureServer } from './config/app';

const port = process.env.PORT || 3000;

async function startServer() {
  const app = await configureServer();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
