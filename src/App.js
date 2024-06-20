import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [inputList,setInputList]=useState({id:"",name:"",task:""});
  const [items,setItems]=useState([]);
  const [showupdate,setshowupdate]=useState(false);
  const [id,setid]=useState(0);
  function handlechange(e){
    
    setInputList((prev)=>(
      {...prev,
      [e.target.name]:e.target.value
      }
    )
    )
    
  }
  function takeTask(e){
    e.preventDefault();
    inputList.id= new Date().getTime().toString();
    setItems((olditems)=>{
      return [...olditems,inputList];}
  );
    setInputList({name:"",task:""});
   
  }
  const deleteItems=(id) =>{
    setItems((olditems)=>{
        return olditems.filter((arrElem,index)=>{
               return arrElem.id !== id;
        });
    });
};
const editItems=(id)=>{
  setshowupdate(true);
  
  let newitem= items.find((arrElem)=>{
    return arrElem.id===id
  })
  setid(newitem.id);
  setInputList({id:newitem.id,name:newitem.name,task:newitem.task});
};
const handleupdate=()=>{
  const index= items.map((item)=>{
    return item.id;
  }).indexOf(id);
  
  items[index].name=inputList.name;
  items[index].task=inputList.task;

  setshowupdate(false);
  setInputList({name:"",task:""});
}
  return (
    
    <div className="App">
      <form  onSubmit={takeTask}>
        <label htmlFor='name'>name</label>
        <input type='text' name='name' value={inputList.name} onChange={handlechange}/>
        <label htmlFor='task'>task</label>
        <select name='task' value={inputList.task} onChange={handlechange} >
          <option>none</option>
          <option >easy</option>
          <option>medium</option>
          <option>hard</option>
          <option>very hard</option>

        </select>
        <button type='submit'>Submit</button>
        {showupdate && <button onClick={handleupdate}>update</button>}
      </form>

      <ol>
         {/* <li>{inputList}</li> */}
         { items.map( ({id,name,task})=>{
                return (
                  <div key={id}>
                    <p>{name},{task}</p>
                    <button onClick={()=>{editItems(id)}}>Edit</button>
                    <button onClick={()=>{deleteItems(id)}}>delete</button>
                  </div>
                )
           })
          }
      </ol>
    </div>
  );
}

export default App;
