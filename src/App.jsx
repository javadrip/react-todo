import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./components/Task";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-500 to-blue-300`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  h1: `text-3xl font-bold text-center text-gray-800 p-4`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded`,
  count: `text-center p-2`,
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isUntouched, setIsUntouched] = useState(true);

  const inputHandler = e => {
    setInput(e.target.value);
  };

  const inputClickHandler = () => {
    if (tasks.length === 0) {
      setIsUntouched(true);
    }
  };
  // Create task in Firebase
  const addTask = async e => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a task");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      text: input,
      isComplete: false,
    });
    setInput("");
    setIsUntouched(false);
  };

  // Read tasks in Firebase
  useEffect(() => {
    const tasksQuery = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(tasksQuery, querySnapshot => {
      let tasksArray = [];
      querySnapshot.forEach(doc => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArray);
    });
    return () => unsubscribe();
  }, []);

  // Update task completion in Firebase
  const toggleComplete = async task => {
    await updateDoc(doc(db, "tasks", task.id), {
      isComplete: !task.isComplete,
    });
  };

  // Update task text in Firebase
  const editTask = async task => {
    await updateDoc(doc(db, "tasks", task.id), {
      text: task.text,
    });
  };

  // Delete task in Firebase
  const deleteTask = async id => {
    await deleteDoc(doc(db, "tasks", id));
    setIsUntouched(false);
  };

  const outstandingTasks = tasks.filter(task => !task.isComplete);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.h1}>Get 💩 done</h1>
        <form onSubmit={addTask} className={style.form} action="">
          <input
            value={input}
            onChange={inputHandler}
            onClick={inputClickHandler}
            className={style.input}
            type="text"
            placeholder="Add task"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </ul>
        {tasks.length === 0 && isUntouched === true && (
          <p className={style.count}>You have no 💩. Add some 💩💩💩.</p>
        )}
        {tasks.length > 0 && outstandingTasks.length > 0 && (
          <p className={style.count}>
            You have {outstandingTasks.length} outstanding 💩.
          </p>
        )}
        {tasks.length > 0 && outstandingTasks.length === 0 && (
          <p className={style.count}>You have no more outstanding 💩.</p>
        )}
        {tasks.length === 0 && isUntouched === false && (
          <p className={style.count}>
            You&apos;ve cleared all your 💩! You&apos;re on FAIARRR 🔥🔥🔥!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
