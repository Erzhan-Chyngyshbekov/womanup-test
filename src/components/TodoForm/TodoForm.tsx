import * as React from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import styles from "./TodoForm.module.less";

export const TodoForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
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

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "todos"), {
      title,
      description,
      date,
      fileUrl,
      isCompleted: false,
    });
  };

  const onFormClear = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setFileUrl(null);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter task title"
        required
        onChange={onTitleChange}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Enter task description"
        required
        onChange={onDescriptionChange}
      />
      <input
        className={styles.input}
        type="date"
        placeholder="YYYY-MM-DD"
        required
        onChange={onDateChange}
      />
      <input
        className={styles.input}
        type="file"
        required
        onChange={onFileChange}
      />
      <div className={styles.buttons}>
        <button className={styles.addButton} type="submit">
          Add
        </button>
        <button
          className={styles.clearButton}
          type="reset"
          onClick={onFormClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
