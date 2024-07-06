import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import CircumIcon from "@klarr-agency/circum-icons-react";

function App() {
  const [todo, setTodo] = useState(""); // this todo is for input todo
  const [todos, setTodos] = useState([]); // this todos for arrays of todos

  useEffect(()=>{
    
  let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])

  const saveToLS =(params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (id) => {
    const t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);

    saveToLS()
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <div className="addtodo">
          <h1 className='text-xl font-bold'>Add a Todo</h1>
          <input onChange={handleChange} value={todo} type="text" className='w-80 my-5' />
          <button onClick={handleAdd} className='bg-violet-500 hover:bg-violet-700 p-3 py-1 text-white rounded-md mx-6'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo flex my-3 w-1/2 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(item.id)} className='bg-violet-500 hover:bg-violet-700 p-3 py-1  text-white rounded-md mx-1'>Edit</button>
                <button onClick={() => handleDelete(item.id)} className='bg-violet-500 hover:bg-violet-700 p-3 py-1  text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
