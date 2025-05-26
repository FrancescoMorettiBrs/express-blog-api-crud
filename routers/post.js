// QUI importo la logica delle funzioni dal controller //
import express from "express";
import { postController } from "../controllers/postsController.js";

// Creo il router //
const router = express.Router();

// INDEX//
router.get("/", postController.index);
// SHOW //
router.get("/:id", postController.show);
// STORE //
router.post("/", postController.store);
// UPDATE //
router.put("/:id", postController.update);
// DESTROY //
router.delete("/:id", postController.destroy);

export default router;
