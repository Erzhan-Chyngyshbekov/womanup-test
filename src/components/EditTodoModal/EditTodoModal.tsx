import * as React from "react";
import { db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Todo } from "../../models/Todo";
import styles from "./EditTodoModal.module.less";

interface Props {
  onClose(): void;
  todo: Todo;
}

export const EditTodoModal: React.FC<Props> = ({ onClose, todo }) => {
  const [title, setTitle] = React.useState<string>(todo.title);
  const [description, setDescription] = React.useState<string>(
    todo.description
  );
  const [date, setDate] = React.useState<string>(todo.date);
  const [fileUrl, setFileUrl] = React.useState(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget as HTMLInputElement;
    const file: File | null = element.files[0];
    if (!file) {
      return;
    }
    const storageRef = ref(storage, file.name);
    const fileRef = uploadBytesResumable(storageRef, file);
    fileRef.on("state_changed", () => {
      getDownloadURL(fileRef.snapshot.ref).then((downloadURL) => {
        setFileUrl(downloadURL);
      });
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) {
      await updateDoc(doc(db, "todos", todo.id), {
        title,
        description,
        date,
        isCompleted: todo.isCompleted,
      });
      return onClose();
    }
    await updateDoc(doc(db, "todos", todo.id), {
      title,
      description,
      date,
      fileUrl,
      isCompleted: todo.isCompleted,
    });
    return onClose();
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div onClick={onClose} className={styles.overlay} />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            value={title}
            type="text"
            placeholder="Enter task title"
            required
            onChange={onTitleChange}
          />
          <input
            className={styles.input}
            value={description}
            type="text"
            placeholder="Enter task description"
            required
            onChange={onDescriptionChange}
          />
          <input
            className={styles.input}
            value={date}
            type="date"
            placeholder="YYYY-MM-DD"
            required
            onChange={onDateChange}
          />
          <input
            className={styles.input}
            type="file"
            // required
            onChange={onFileChange}
          />
          <div className={styles.buttons}>
            <button className={styles.addButton} type="submit">
              Update
            </button>
            <button
              className={styles.clearButton}
              type="reset"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
