import express from 'express';
const PORT = 4000 || process.env.PORT;

(async () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`SERVER STARTED\nPORT: ${PORT}`);
  });
})().catch((err) => {
  console.error(`SERVER ERROR\n${err}`);
});
