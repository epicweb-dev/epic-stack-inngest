type NoteCreated = {
  data: {
    title: string;
    image_url: string | null;
  };
};

export type Events = {
  'note.created': NoteCreated;
};