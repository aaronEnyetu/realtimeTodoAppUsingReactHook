//In the beginning of this snippet, we are pulling in useState from the React library because we need it to manage the state within our functional components.
//we will use the useEffect state Hook to update the number of pending tasks whenever the DOM is re-rendered.
import React, { useState, useEffect } from 'react';
import './Todo.css';

//the Task component returns some JSX to define what each task element will look like
//update the Task component to receive a new prop and include a Complete button:
//updating the Task component to receive a removeTask prop and include an “X” button that deletes a task on click:
function Task({ task, index, completeTask, removeTask }) {
  return (
    <div className="task" style={{ textDecoration: task.completed ? 'line-through' : '' }}>
      {task.title}
      <button onClick={() => completeTask(index)}>Complete</button>
      <button style={{ background: 'red' }} onClick={() => removeTask(index)}>
        x
      </button>
    </div>
  );
}

//In the Todo component, the useState function returns an array with two elements.
//The first item being the current state value for the tasks and the second being a function that can be used to update the tasks:
function Todo() {
  //register a new state Hook for the pending tasks in the Todo component:
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: 'Do some gardening',
      completed: true,
    },
    {
      title: 'Do some house cleaning',
      completed: true,
    },
    {
      title: 'Do some coding',
      completed: false,
    },
  ]);
  //add an effect hook to update the state of tasksRemaining when the DOM re-renders:
  useEffect(() => {
    /* eslint-disable-line*/
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  });

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  //update the Todo component to define the completeTask method and pass it down as a prop to the Task component in the JSX:
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  //update the Todo component to register the removeTask method and pass it down as a prop to the Task component in the JSX:
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  //We finally return some JSX within the Todo component and nest the Task component.
  return (
    <div className="todo-container">
      <div className="header">TODO - ITEMS</div>
      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
            index={index}
            key={index}
          /> //added completeTask
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}
//the above code currently works with hard-coded data and has no way to receive input in realtime
//Let’s create a new functional component and call it CreateTask:

//The CreateTask component receives a prop addTask, which is basically the function that adds a new task to the tasks state on the Todo component.
//We want to define this function and also update the JSX of the Todo component so it includes the CreateTask component.
function CreateTask({ addTask }) {
  //Using useState, this component registers a state — value — and a function for updating it — setValue.
  const [value, setValue] = useState('');

  //The handleSubmit handler will prevent the default action that would normally be taken on the form and add a new Task using the latest value that is in the input field.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
export default Todo;
