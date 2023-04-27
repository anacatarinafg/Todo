import { useEffect, useState } from "react";
import { IoIosDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "./App.css";

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState(""); // Do de date
  const [completedTodo, setCompletedTodo] = useState([]);

  const onAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoList = [...allTodos];
    updatedTodoList.push(newTodoItem);
    setAllTodos(updatedTodoList);
    localStorage.setItem("listOfTodos", JSON.stringify(updatedTodoList)); // stringify converts to a string
  };

  const onDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // remove the item

    localStorage.setItem("listOfTodos", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "/" + mm + "/" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedTodo = [...completedTodo];
    updatedCompletedTodo.push(filteredItem);
    setCompletedTodo(updatedCompletedTodo);
    onDeleteTodo(index);
    localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedTodo));
  };

  const onCompletedDeleteTodo = (index) => {
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1); // remove the item

    localStorage.setItem("completedTodo", JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("listOfTodos")); // parse converts to an array
    let completedTodos = JSON.parse(localStorage.getItem("completedTodo"));
    if (savedTodos) {
      setAllTodos(savedTodos);
    }
    if (completedTodos) {
      setCompletedTodo(completedTodos);
    }
  }, []);

  return (
    <main className="todo__box">
      <div className="todo__title">
        <h2>Notifications todo</h2>
      </div>
      <div className="button__wrapper">
        <button
          type="button"
          className={`isCompleted ${isCompleted === false && "active"}`}
          onClick={() => setIsCompleted(false)}
        >
          Todo
        </button>
        <button
          type="button"
          className={`isCompleted ${isCompleted === true && "active"}`}
          onClick={() => setIsCompleted(true)}
        >
          Completed
        </button>
      </div>

      {/* WE NEED TO LOOP THE SECTION */}
      {isCompleted === false &&
        allTodos.map((item, index) => {
          return (
            <section className="todo__section" key={index}>
              <div>
                <h1 className="todo__headline">{item.title}</h1>
                <p className="todo__description">{item.description}</p>
              </div>
              <div className="todo__icons">
                <span onClick={() => onDeleteTodo(index)}>
                  <MdDeleteForever />
                </span>
                <span onClick={() => handleComplete(index)}>
                  <IoIosDoneAll />
                </span>
              </div>
            </section>
          );
        })}

      {/* WE NEED TO LOOP THE SECTION */}
      {isCompleted === true &&
        completedTodo.map((item, index) => {
          return (
            <section className="todo__section" key={index}>
              <div>
                <h1 className="todo__headline">{item.title}</h1>
                <p className="todo__description">{item.description}</p>
                <p className="todo__date">Finished at: {item.completedOn}</p>
              </div>
              <div className="todo__icons">
                <span onClick={() => onCompletedDeleteTodo(index)}>
                  <MdDeleteForever className="todo__icons"/>
                </span>
              </div>
            </section>
          );
        })}

      {/* FORM */}
      <form className="form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="form__input"
          placeholder="Task name here..."
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="form__input"
          placeholder="Description..."
        />
        <div className="button__wrapper">
          <button type="button" className="form__button" onClick={onAddTodo}>
            Add task
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;
