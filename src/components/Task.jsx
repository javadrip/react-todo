import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {};

function Task(props) {
  return (
    <li className={style.li}>
      <div className={style.row}>
        <input type="checkbox" />
        <p className={style.task}>{props.task}</p>
        <button>{<FaRegTrashAlt />}</button>
      </div>
    </li>
  );
}

// Defined to remove the warning "'task' is missing in props validation" for props.task
Task.propTypes = {
  task: PropTypes.string.isRequired,
};

export default Task;
