import React,{useState} from "react";

const TodoList=()=>{

const[todos,setTodos]=useState([]);
const[inputValue,setInputValue]=useState('first one')

const handleChange=(e)=>{
  setInputValue(e.target.value);
}


const handleSubmit=()=>{
if (inputValue.trim() !=='') {
  setTodos([...todos,inputValue]);
  setInputValue('');
}
};
const deletefn=(index)=>{
 let temp= todos.filter((dummy,i)=> i!==index)
  setTodos(temp)
}



return(
  <>
<h3>Todo List</h3>

<input type="text"
value={inputValue}
onChange={handleChange}
/>


<button onClick={handleSubmit}> Add Todo</button>
<ul>
  {todos.map((todo,index)=>(
    <li key={index}> {todo} 
<button onClick={() => deletefn(index)}>Delete</button>
    </li>
   
 ) )}

</ul>


</>
)
}
export default TodoList;