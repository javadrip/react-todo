import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";

const style = {
  li: `flex rounded justify-between bg-slate-200 p-4 my-2`,
  liComplete: `flex rounded justify-between bg-slate-400 p-4 my-2`,
  row: `flex items-center`,
  checkbox: `rounded w-6 h-6 flex items-center focus:text-slate-500 focus:ring-blue-500 border-slate-400 text-slate-500`,
  text: `ml-3 cursor-pointer rounded h-6 flex items-center`,
  textComplete: `ml-3 cursor-pointer rounded h-6 flex items-center line-through`,
  button: `cursor-pointer flex items-center`,
};

function Task({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const toggleCompleteHandler = () => {
    toggleComplete(task);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const textChangeHandler = e => {
    setEditedText(e.target.value);
    console.log(e.target.value);
  };

  const finishEditingHandler = () => {
    if (editedText === "") {
      alert("Please enter a task");
      return;
    }
    editTask({ ...task, text: editedText });
    setIsEditing(false);
  };

  const enterHandler = e => {
    if (e.key === "Enter") {
      // Enter key is pressed
      finishEditingHandler();
    }
  };

  const deleteTaskHandler = () => {
    deleteTask(task.id);
  };

  return (
    <li className={task.isComplete ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          type="checkbox"
          onChange={toggleCompleteHandler}
          checked={task.isComplete ? "checked" : ""}
          className={style.checkbox}
        />
        {isEditing ? (
          <input
            className={style.text}
            type="text"
            value={editedText}
            onChange={textChangeHandler}
            onBlur={finishEditingHandler}
            onKeyDown={enterHandler}
            autoFocus
          />
        ) : (
          <p
            className={task.isComplete ? style.textComplete : style.text}
            onClick={task.isComplete ? null : startEditingHandler}
          >
            {task.text}
          </p>
        )}
      </div>
      <button onClick={deleteTaskHandler}>{<FaRegTrashAlt />}</button>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  toggleComplete: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
};

export default Task;
