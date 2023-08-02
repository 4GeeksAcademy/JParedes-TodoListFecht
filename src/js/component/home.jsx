import React, { useEffect, useState } from "react";

const Home = () => {
	const[todo,setTodo] = useState("")
	const [todos,setTodos] = useState([])
	const[hover,setHover] = useState("")

 const getList = async () => {
	try {
	 // Realizar la solicitud GET usando fetch
	const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/jparedes");
	  
	 //Verificar si la respuesta está en el rango de 200-299 (éxito)
		if (!response.ok) {
			throw new Error('La solicitud no fue exitosa');
		}
	 // Analizar la respuesta como JSON y devolver los datos
	const data = await response.json();
	setTodos(data)
	return data;
	} catch (error) {
	// Manejar errores
	console.error('Error al obtener los datos:', error.message);
	throw error;
	}
	};

	  const updateList = async () => { if(todos.length > 0){
		try {
		  // Realizar la solicitud PUT usando fetch
		  const requestOptions = {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
			},
			body: JSON.stringify(todos), // Convertimos el objeto a JSON y lo enviamos como cuerpo de la solicitud
		  };
		  const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/jparedes",requestOptions);
	  
		  // Verificar si la respuesta está en el rango de 200-299 (éxito)
		  if (!response.ok) {
			throw new Error('La solicitud no fue exitosa');
		  }
	  
		  // Analizar la respuesta como JSON y devolver los datos
		  const data = await response.json();
		  return data;
		} catch (error) {
		  // Manejar errores
		  console.error('Error al obtener los datos:', error.message);
		  throw error;
		}
	  };
	}

	useEffect(()=>{
		getList()
	},[])

	useEffect(()=>{
		updateList()
	},[todos])

	function handleSubmit(e){
		e.preventDefault()
		if(todo == "") return alert("Agregar tarea")
		else {const newTodo = {
			id : new Date().getTime(),
			label: todo,
			done: false,
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

			  {todos && todos.length > 1 && todos.map((todo)=> <li key = {todo.id} className="list-group-item d-flex justify-content-between align-items-center" onMouseOver={()=>setHover(todo.id)} onMouseLeave={()=>setHover(null)}>
				<span>{todo.label}</span>
				{hover === todo.id && <span className="badge text-black rounded-pill"><i onClick={()=>deleteTodo(todo.id)} className ="fas fa-times"></i></span>}
			
			</li>)}
			
			{(todos.length !== 0) ?  <p className="text-start mt-3"><b>{todos.length} item left</b></p>: <p className="text-left"><b>"No hay tareas, añadir tareas"</b></p>}

		</ul>
		</div>
	);
	
};

export default Home;
