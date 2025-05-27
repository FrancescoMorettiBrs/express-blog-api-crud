// IMPORTAZIONI //
import express from "express";
import router from "./routers/post.js";

// Creo l'applicazione web con express //
const app = express();

// Definisco la porta //
const port = 3000;

// Rendo pubblici i contenuti della cartella "public" //
app.use(express.static("public"));
app.use(express.json())

app.get("/", (req, res) => {
  const resData = {
    data: "Benvenuto nel mio blog, qui parliamo solo ed esclusivamente di Calcio!",
  };
  res.json(resData);
});

app.use("/post", router);

// Invoco la funzione di ascolto //
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
   