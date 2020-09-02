import { Router } from "./deps.ts";

import getNotes from "./handlers/getNotes.ts";
import createNote from "./handlers/createNote.ts";
import deleteNote from "./handlers/deleteNote.ts";

const router = new Router();

router
  .get("/notes", getNotes)
  .post("/notes", createNote)
  .delete("/notes/:id", deleteNote);

export default router;
