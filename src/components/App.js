import React from "react";
import "../styles/App.css";
import generateID from "../helper-functions/id-generator.js";

// const tasks = [
//   "buy milk",
//   "eat dinner",
//   "nail javascript",
//   "give feedback",
//   "find nemo"
// ];

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      tasksPending: this.tasks.length,
      tasks: [
      { id: generateID(), text: "buy milk", isDone: false },
      { id: generateID(), text: "eat dinner", isDone: false },
      { id: generateID(), text: "nail javascript", isDone: false },
      { id: generateID(), text: "give feedback", isDone: false },
      { id: generateID(), text: "find nemo", isDone: false }
    ]
    };
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStrikethrough = this.handleStrikethrough.bind(this);
  }

  handleStrikethrough(id) {
    const theOne = this.tasks.filter(task => {
      task.id = id;
    })
    theOne.isDone = true;
    // if (event.target.className === "toDo") {
    //   event.target.className = "done"; //event.target.className directly manimulates the DOM tree
    //   // this.setState({ tasksPending: this.state.tasksPending - 1 });
    // } else {
    //   event.target.className = "toDo"; 
    //   // this.setState({ tasksPending: this.state.tasksPending + 1 });
    // }
    // event.target.classList.toggle("done");
    // let remainingTasks = document.body.querySelectorAll("done");
    // console.log(remainingTasks.length);
    // this.setState({
    // tasksPending: this.state.tasksPending - 1
    // });

    // event.target.classList.toggle("done");
    // let remainingTasks = document.querySelectorAll("done")
    // console.log(remainingTasks)
    // this.setState({
    //   tasksPending: remainingTasks
    // });
  }

  handleNewInput = event => {
    return this.setState({ value: event.target.value });
  };

  handleClick() {
    let targetValue = this.state.value;
    if (targetValue === "") {
      return;
    }
    this.setState({
      value: targetValue,
      tasksPending: this.state.tasksPending + 1
    });
    this.tasks.push(this.state.value);
    this.setState({ value: "" });
    console.log(targetValue);
    // document.body.querySelector("input").value = "";
  }

  handleEnterPress(event) {
    if (event.target.value === "") {
      return;
    }
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.setState({
        value: event.target.value,
        tasksPending: this.state.tasksPending + 1
      });
      console.log(this.state.value);
      this.tasks.push(this.state.value);
      this.setState({ value: "" });
      event.target.value = "";
    }
  }

  render() {
    const TaskList = this.tasks.map(task => {
      return (
        <Item
          key={task.id}
          description={task}
          onClick={this.handleStrikethrough()}
          className={task.isDone ? "done": "toDo"}
          tasks={this.state.tasks}
        />
      );
    });

    return (
      <div id="container">
        <div className="form">
          <Input
            type="text"
            value={this.state.value}
            onKeyDown={this.handleEnterPress}
            placeholder="Enter task here..."
            onChange={this.handleNewInput}
          />
          <Button type="Button" onClick={this.handleClick} />
        </div>
        <div>
          <p className="info">Tasks pending: {this.state.tasksPending}</p>
        </div>
        <ul>{TaskList}</ul>
      </div>
    );
  }
}

function Input({ type, value, onKeyDown, placeholder, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function Button({ type, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      Add Task
    </button>
  );
}

function Item({ description, onClick, className }) {
  return (
    <li className={className} onClick={onClick}>
      {description}
    </li>
  );
}

function App() {
  return <ToDoList />;
}

export default App;
