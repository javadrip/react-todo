import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./components/Task";
import { db } from "./firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-500 to-blue-300`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  h3: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("Here is some key: " + import.meta.env.VITE_SOME_KEY);

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

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.h3}>To-do App</h3>
        <form className={style.form} action="">
          <input className={style.input} type="text" placeholder="Add task" />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </ul>
        <p className={style.count}>You have {tasks.length} tasks</p>
      </div>
    </div>
  );
}

export default App;
