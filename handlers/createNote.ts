import { Request, Response } from "../deps.ts";
import { createNote, getNoteByTitle } from "../services/notes.ts";

/**
 * Create New Note
 * @param {string} title
 * @param {string} description
 * @returns {Object} NoteId and Success Message
 */
export default async ({
  request,
  response,
}: { request: Request; response: Response }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid note data" };
    return;
  }

  const { title, description } = await (request.body()).value;

  if (!title || !description) {
    response.status = 422;
    response.body = {
      msg: "Incorrect note data. title and description are required",
    };
    return;
  }

  const foundNote = await getNoteByTitle(title);
  if (foundNote) {
    response.status = 400;
    response.body = { msg: `Note with title - ${title} found` };
    return;
  }

  const noteId = await createNote({ title, description });
  response.body = { msg: "Note created", noteId };
};
