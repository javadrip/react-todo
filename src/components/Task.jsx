import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

function Task({ task, toggleComplete }) {
  const toggleCompleteHandler = () => {
    toggleComplete(task);
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
      <button>{<FaRegTrashAlt />}</button>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  toggleComplete: PropTypes.func,
};

export default Task;
