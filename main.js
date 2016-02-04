var TodoBox = React.createClass({
  loadTodosFromServer: function() {
    // TODO ajax call to server
    this.setState(function(state) {
      return {data: this.state.data};
    });
  },
  generateId: function() {
    return Math.floor(Math.random()*90000) + 10000;
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  addTodo: function(todo) {
    var todoList = this.state.data;
    todo.id = this.generateId().toString();
    this.setState({data: todoList.concat([todo])});
  },
  removeTodo: function(nodeId) {
    var todoList = this.state.data;
    var newTodoList = todoList.filter(function(todo) {
      return todo.id !== nodeId;
    });
    this.setState({data: newTodoList});
  },
  render: function() {
    return (
            <div className='todo-box'>
              <h1>TODO List</h1>
              <div>
                <div className='todo-header'>
                  <TodoNew onTodoSubmit={this.addTodo}></TodoNew>
                </div>
                <div className='todo-body'>
                  <TodoList onTodoDestory={this.removeTodo} data={this.state.data}></TodoList>
                </div>                
             </div>
           </div>
           )
  }
});

var TodoList = React.createClass({
  removeNode: function(nodeId) {
    this.props.onTodoDestory(nodeId);
  },
  render: function() {
    var todoNodes = this.props.data.map(function(todo) {
      return <TodoItem key={todo.id} nodeId={todo.id} onTodoDestory={this.removeNode}>{todo.task}</TodoItem>
    }, this);
    return (<ul className='todo-list list-group'>
              {todoNodes}
           </ul>)
  }
});

var TodoItem = React.createClass({
  getInitialState: function() {
    return {completed: false};
  },
  handleTodoCompletedChange: function() {
    this.setState({completed: !this.state.completed});
  },
  handleDestroyClicked: function(e) {
    e.preventDefault();
    this.props.onTodoDestory(this.props.nodeId);
  },
  render: function() {
    var completedClass = this.state.completed ? 'completed ' : ''
    return (
            <li className={completedClass + 'todo-item list-group-item'}>
                <div>
                  <input
                    name='checkbox'
                    className='todo-item-completed'
                    type='checkbox'
                    onChange={this.handleTodoCompletedChange}
                    />
                  <label className='todo-text' for='checkbox'>{this.props.children}</label>
                  <button type="button" className="destroy close" aria-label="Close" onClick={this.handleDestroyClicked}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
            </li>
          )
  }
});

var TodoNew = React.createClass({
    getInitialState: function() {
      return {text: ''};
    },
    handleKeyPress: function(e) {
      if(e.key === 'Enter') {
        this.props.onTodoSubmit({task: e.target.value, completed: false});
        e.target.value = '';
      }
    },
    render: function() {
      return <input
              className='todo-new form-control'
              type='text'
              placeholder='What do you want to do?'
              onKeyPress={this.handleKeyPress}
              />
    }
});

ReactDOM.render(<TodoBox></TodoBox>, document.querySelector('.todo-app'))
