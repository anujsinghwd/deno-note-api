import { Response } from "../deps.ts";
import { getNotes } from "../services/notes.ts";

export default async ({ response }: { response: Response }) => {
  response.body = await getNotes();
};
