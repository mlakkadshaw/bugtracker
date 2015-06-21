var TodoStore = require('./todostore.js');
var TodoActions = require('./todoactions.js');
var React = require('react');
var ReactPropTypes = React.PropTypes;

function getTodoState() {
    return {
      allTodos: TodoStore.getAll()
    }
}

var TodoItem = React.createClass({displayName: "TodoItem",
	render: function() {
		var todo = this.props.todo;
    var className = 'normal';
    if(todo.complete) {
      className = 'strike';
    }

		return (
			React.createElement("li", {key: todo.id}, 
        React.createElement("input", {type: "checkbox", onChange: this._markUnmark}), 
				React.createElement("label", {className: className}, 
					todo.text
				), 
				React.createElement("button", {onClick: this._onDestroyClick}, "Destroy")
			)
			)
	},
	_onDestroyClick: function() {
		TodoActions.destroy(this.props.todo.id);
	},
  _markUnmark: function(event) {
    if(event.target.checked) {
      TodoActions.markAsComplete(this.props.todo.id);
    } else {
      TodoActions.unmarkAsComplete(this.props.todo.id);
    }
  }
});

var MainSection = React.createClass({displayName: "MainSection",
	render: function() {
		var allItems = this.props.allTodos;
		var todos = [];
		for(var key in allItems) {
			todos.push(React.createElement(TodoItem, {todo: allItems[key]}));
		}
		return (
			React.createElement("section", {id: "main"}, 
				React.createElement("ul", {id: "todo-list"}, 
					todos
				)
			)
			);
	}
})

var TodoTextInput = React.createClass({displayName: "TodoTextInput",
	propTypes: {
		id: ReactPropTypes.string,
		onSave: ReactPropTypes.func.isRequired,
		value: ReactPropTypes.string
	},
  getInitialState: function() {
		return {
			value: this.props.value || ''
		}
	},
	render: function() {
		return (React.createElement("input", {
			type: "text", 
			id: this.props.id, 
			onChange: this._onChange, 
			onKeyDown: this._onKeyDown, 
			value: this.state.value}));
	},
	_onChange: function(event) {
		this.setState({
			value: event.target.value
		})
	},
	_onKeyDown: function(event) {
		if(event.keyCode === 13) {
			this.props.onSave(this.state.value);
			this.setState({
				value: ''
			});
		}
	}
});

var TodoItemCount = React.createClass({displayName: "TodoItemCount",
  render: function() {
      var allTodos = this.props.allTodos;
      var count = 0;
      for(key in allTodos) {
        if(!allTodos[key].complete) {
          count++;
        }
      }
      return (
        React.createElement("div", null, 
        "Avalaible ToDo: ", React.createElement("label", null, count)
        )
      )
  }
});

var TodoApp = React.createClass({displayName: "TodoApp",
  getInitialState: function() {
        return getTodoState();
    },
    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },
    render: function() {
    	return (
    		React.createElement("div", null, 
          React.createElement(TodoItemCount, {allTodos: this.state.allTodos}), 
    			React.createElement(TodoTextInput, {id: "new-todo", onSave: this._onSave}), 
    			React.createElement(MainSection, {allTodos: this.state.allTodos})
    		)
    	)
    },
    _onChange: function() {
    	this.setState(getTodoState());
    },
    _onSave: function(text) {
    	TodoActions.create(text);
    }
});

module.exports = TodoApp;
