import { AiOutlinePlus } from "react-icons/ai";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-500 to-blue-300`,
};

function App() {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.h3}>To-do App</h3>
        <form className={style.form} action=""></form>
        <input className={style.input} type="text" placeholder="Add To-do" />
        <button className={style.button}>
          <AiOutlinePlus size={30} />
        </button>
      </div>
    </div>
  );
}

export default App;
