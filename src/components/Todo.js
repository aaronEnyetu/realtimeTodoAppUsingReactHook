//In the beginning of this snippet, we are pulling in useState from the React library because we need it to manage the state within our functional components.

import React, { useState } from 'react';
import './Todo.css';

//the Task component returns some JSX to define what each task element will look like
function Task({ task }) {
  return (
    <div className="task" style={{ textDecoration: task.completed ? 'line-through' : '' }}>
      {task.title}
    </div>
  );
}

//In the Todo component, the useState function returns an array with two elements.
//The first item being the current state value for the tasks and the second being a function that can be used to update the tasks:
function Todo() {
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

  //We finally return some JSX within the Todo component and nest the Task component.
  return (
    <div className="todo-container">
      <div className="header"> TODO - ITEMS</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task task={task} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Todo;
