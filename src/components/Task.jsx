import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

function Task({ task, toggleComplete, deleteTask }) {
  const toggleCompleteHandler = () => {
    toggleComplete(task);
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
        />
        <p
          className={task.isComplete ? style.textComplete : style.text}
          onClick={toggleCompleteHandler}
        >
          {task.text}
        </p>
      </div>
      <button onClick={deleteTaskHandler}>{<FaRegTrashAlt />}</button>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  toggleComplete: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default Task;
