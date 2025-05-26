// QUI imposto la logica delle funzioni per poi esportare nelle routes //
// Importo il mio array dal file data.js //
import { posts } from "../data.js";

// INDEX: lettura di tutti i post //
const index = (req, res) => {
  const postsFilter = req.query.tags;
  let result = posts;

  if (postsFilter !== undefined) {
    console.log(postsFilter);

    result = posts.filter((curPost) => curPost.tags.includes(postsFilter));
    console.log(result);
  }
  res.json({
    data: result,
    count: result.length,
  });
};
// SHOW: lettura di un singolo post //
const show = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((curPost) => curPost.id === postId);
  if (!post) {
    res.status(404);
    res.json({
      error: "Post non trovato",
    });
  } else {
    res.status(200);
    res.json({
      data: post,
    });
  }
};
// STORE: creazione di un post //
const store = (req, res) => {
  res.json({
    data: "Aggiungo un nuovo post",
  });
};
// UPDATE: modifica di un post //
const update = (req, res) => {
  const postId = req.params.id;
  res.json({
    data: `Modifico il post con id ${postId}`,
  });
};
// DESTROY: cancellazione di un post //
const destroy = (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex((curPost) => curPost.id === postId);
  if (index === -1) {
    res.status(404);
    res.json({
      error: "Post non trovato",
    });
  } else {
    posts.splice(index, 1);
    res.status(204);
    res.json({
      data: `Elimino il post con id ${postId}`,
    });
  }
};

// creo un oggetto che comprende tutte le mie funzioni e lo esporto //
const postController = {
  index,
  show,
  store,
  update,
  destroy,
};

export { postController };
