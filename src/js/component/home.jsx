import React, { useState } from "react";

const Home = () => {
	const[todo,setTodo] = useState("")
	const [todos,setTodos] = useState([])
	const[hover,setHover] = useState("")
	

	function handleSubmit(e){
		e.preventDefault()
		if(todo == "") return alert("Agregar tarea")
		else {const newTodo = {
			id: new Date().getTime(),
			text: todo,
			completed: 0,
		}
		setTodos([...todos].concat(newTodo))
		setTodo("")}
	}

	function deleteTodo(id){
		const updatedTodos = [...todos].filter((todo)=> todo.id !== id)
		setTodos(updatedTodos)
	}


	return (
		<div className="container bg-white bg-gradient my-5" onSubmit={handleSubmit} >
			<h1 className= "py-2" >TO-DO LIST</h1>
		<form >
		<input  className="form-control my-2" type = "text" onChange={e=> setTodo(e.target.value)} value={todo}/>
		 </form>
		<ul className="list-group shadow p-3 mb-5 bg-body rounded">

			  {todos.map((todo)=> <li className="list-group-item d-flex justify-content-between align-items-center" onMouseOver={()=>setHover(todo.id)} onMouseLeave={()=>setHover(null)} key ={todo.id}>
				<span>{todo.text}</span>
				{hover === todo.id && <span className="badge text-black rounded-pill"><i onClick={()=>deleteTodo(todo.id)} className ="fas fa-times"></i></span>}
			
			</li>)}
			
			{(todos.length !== 0) ?  <p className="text-start mt-3"><b>{todos.length} item left</b></p>: <p className="text-left"><b>"No hay tareas, añadir tareas"</b></p>}

		</ul>
		</div>
	);
	
};

export default Home;
