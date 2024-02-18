import { useState, useEffect } from "react"
import List from "./components/list";
import {v4 as uuidv4} from 'uuid'


export default function Main(){

    const [tasks,setTasks]=useState(()=>{
        const storedTodos = localStorage.getItem('tasks');
        if(!storedTodos){
            return []
        }else{
            return JSON.parse(storedTodos)
        }
    });
    const [tasksTitel, setTasksTitel] = useState('');
    

useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}, [tasks])

    const addTask = (e)=>{

        const storedTodos =JSON.parse(localStorage.getItem('tasks'))
        if(e.key === 'Enter' && e.target.value !=='' ){

            setTasks([
                ...storedTodos,{
                    id:uuidv4(),
                    title: tasksTitel,
                    status:false
                }
            ])
            setTasksTitel ('')
        }
    }
    const date = new Date();
    const monthNames = ['January','Fabruary','March','April','May','June','July','August','Setember'
,"October",'November',"December"]
    const month = monthNames[date.getMonth()]
    const day = date.getDate();
    const year = date.getFullYear();
    
    return( 
        <div className="container">
            <h1>Note your tasks</h1>
            <span>{day+" "+month+" "+year}</span>
            <div className="input-filed">
                <input type="text" 
                value={tasksTitel}
                onChange={event => setTasksTitel(event.target.value)}
                onKeyDown={addTask}/>
                <label> Task name </label>
            </div>
            <List tasks={tasks}/>
        </div>
    )
}



