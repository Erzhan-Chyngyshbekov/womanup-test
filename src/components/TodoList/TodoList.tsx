import * as React from "react";
import { Todo } from "../../models/Todo";
import { EditTodoModal } from "../EditTodoModal";
import { TodoItem } from "../TodoItem";

import styles from "./TodoList.module.less";

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className={styles.container}>
      {todos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};
