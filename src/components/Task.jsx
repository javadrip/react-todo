import { useState } from "react";
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

function Task({ task }) {
  const [isComplete, setIsComplete] = useState(false);

  const checkboxHandler = () => {
    setIsComplete(!isComplete);
  };

  return (
    <li className={isComplete ? style.liComplete : style.li}>
      <div className={style.row}>
        <input type="checkbox" onChange={checkboxHandler} />
        <p className={isComplete ? style.textComplete : style.text}>
          {task.text}
        </p>
      </div>
      <button>{<FaRegTrashAlt />}</button>
    </li>
  );
}

// Defined to remove the warning "'task' is missing in props validation" for props.task
Task.propTypes = {
  task: PropTypes.string.isRequired,
};

export default Task;
