import { fetchData, persistData } from "./db.ts";
import { Note } from "../models/note.ts";

type NoteData = Pick<Note, "title" | "description">;

export const getNotes = async (): Promise<Note[]> => {
  const notes = await fetchData();

  // sort by title
  return notes.sort((a, b) => a.title.localeCompare(b.title));
};

export const getNoteById = async (
  noteId: number,
): Promise<Note | undefined> => {
  const notes = await fetchData();
  return notes.find(({ id }) => id === noteId);
};

export const getNoteByTitle = async (
  noteTitle: string,
): Promise<Note | undefined> => {
  const notes = await fetchData();
  return notes.find(({ title }) => title === noteTitle);
};

export const createNote = async (
  noteData: NoteData,
): Promise<number | string> => {
  const notes = await fetchData();

  const newNote: Note = {
    id: Number(notes.length + 1),
    title: String(noteData.title),
    description: String(noteData.description),
    added: new Date(),
  };

  await persistData([...notes, newNote]);
  return newNote.id;
};

export const deleteNote = async (noteId: number): Promise<void> => {
  const notes = await fetchData();
  const filteredNotes = notes.filter((note) => note.id !== noteId);
  persistData(filteredNotes);
};
