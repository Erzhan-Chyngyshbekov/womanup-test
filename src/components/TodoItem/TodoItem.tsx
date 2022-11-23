import * as React from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import cn from "classnames";

import { db } from "../../firebase";
import { dateOverdue } from "../../helpers/date";
import { Todo } from "../../models/Todo";

import { EditTodoModal } from "../EditTodoModal";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";

import styles from "./TodoItem.module.less";

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const onOpenEditModal = () => {
    setVisible(true);
  };

  const onCloseEditModal = () => {
    setVisible(false);
  };

  const toggleComplete = async (todo: Todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const outDated = dateOverdue(todo.date);

  return (
    <div className={styles.wrapper}>
      {visible ? (
        <EditTodoModal onClose={onCloseEditModal} todo={todo} />
      ) : null}
      <div className={styles.content}>
        <input
          className={styles.checkbox}
          type="checkbox"
          disabled={outDated}
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo)}
        />
        <div className={styles.text}>
          <div
            className={cn(
              styles.title,
              todo.isCompleted ? styles["title--completed"] : ""
            )}
          >
            {todo.title}
          </div>
          <div
            className={cn(
              styles.description,
              todo.isCompleted ? styles["description--completed"] : ""
            )}
          >
            {todo.description}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div
          className={cn(styles.date, outDated ? styles["date--outdated"] : "")}
        >
          {todo.date}
          <div className={outDated ? "" : styles.expired}>expired</div>
        </div>
        <div className={styles.file}>
          <a href={todo.fileUrl}>Attached File</a>
        </div>
        <div className={styles.actions}>
          <img
            src={DeleteIcon}
            alt="delete"
            onClick={() => handleDelete(todo.id)}
          />
          <img src={EditIcon} alt="edit" onClick={onOpenEditModal} />
        </div>
      </div>
    </div>
  );
};
