// QUI imposto la logica delle funzioni per poi esportare nelle routes //
// Importo il mio array dal file data.js //
import { posts } from "../data.js";
// Creo una function per l'error 404 che si ripete più volte //
const sendNotFound = (res) => {
  res.status(404);
  return res.json({
    error: "Post non trovato",
  });
};

// INDEX: lettura di tutti i post //
const index = (req, res) => {
  const postsFilter = req.query.tags;
  let result = posts;

  if (postsFilter !== undefined) {
    result = posts.filter((curPost) => curPost.tags.includes(postsFilter));
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
    return sendNotFound(res);
  } else {
    res.status(200);
    res.json({
      data: post,
    });
  }
};
// STORE: creazione di un post //
const store = (req, res) => {
  const newPost = req.body;
  const lastPost = parseInt(posts[posts.length - 1].id);
  newPost.id = (lastPost + 1).toString();
  posts.push(newPost);
  console.log(newPost);

  res.status(201);
  res.json({
    data: newPost,
  });
};
// UPDATE: modifica di un post //
const update = (req, res) => {
  const postId = req.params.id;
  const updatedPostData = req.body;
  const post = posts.find((curPost) => curPost.id === postId);

  if (!post) {
    return sendNotFound(res);
  }

  post.titolo = updatedPostData.titolo;
  post.contenuto = updatedPostData.contenuto;
  post.tags = updatedPostData.tags;
  post.immagine = updatedPostData.immagine;
  console.log(post);

  res.json({
    data: post,
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
