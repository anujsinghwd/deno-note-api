import { Response } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { getNotes } from "../services/notes.ts";

export default async ({ response }: { response: Response }) => {
  response.body = await getNotes();
};
