import * as React from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import { AppTitle } from "../../components/AppTitle";
import { TodoForm } from "../../components/TodoForm";
import { TodoList } from "../../components/TodoList";

import { Todo } from "../../models/Todo";

import styles from "./MainPage.module.less";

export const MainPage: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[] | []>([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todosArray: any[] = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AppTitle />
      </div>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
};
