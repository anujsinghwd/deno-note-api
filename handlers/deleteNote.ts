import { Response, RouteParams } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { deleteNote, getNoteById } from "../services/notes.ts";

export default async ({
  params,
  response
}: {
  params: RouteParams;
  response: Response;
}) => {
  const noteId = Number(params.id);

  if (!noteId) {
    response.status = 400;
    response.body = { msg: "Invalid note id" };
    return;
  }

  const foundNote = await getNoteById(noteId);
  if (!foundNote) {
    response.status = 404;
    response.body = { msg: `Note with ID ${noteId} not found` };
    return;
  }

  await deleteNote(noteId);
  response.body = { msg: "Note deleted" };
};
