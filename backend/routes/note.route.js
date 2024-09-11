// note.routes.js
import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updateNotePinned,
} from "../controller/note.controller.js";

const router = express.Router();

// Note routes
router.post("/add", verifyToken, addNote); // Adds a new note
router.post("/edit/:noteId", verifyToken, editNote); // Edits an existing note
router.get("/all", verifyToken, getAllNotes); // Retrieves all notes
router.delete("/delete/:noteId", verifyToken, deleteNote); // Deletes a note
router.put("/update-note-pinned/:noteId", verifyToken, updateNotePinned); // Updates pinned status of a note
router.get("/search", verifyToken, searchNote); // Searches notes

export default router;
