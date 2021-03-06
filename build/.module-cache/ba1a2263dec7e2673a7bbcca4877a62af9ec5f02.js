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
		return (
			React.createElement("li", {key: todo.id}, 
				React.createElement("label", null, 
					todo.text
				), 
				React.createElement("button", {onClick: this._onDestroyClick}, "Destroy")
			)
			)
	},
	_onDestroyClick: function() {
		TodoActions.destroy(this.props.todo.id);
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
	getInitalState: function() {
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
		if(event.keycode === 13) {
			this.props.onSave(this.state.value);
			this.setState({
				value: ''
			});
		}
	}
});

var TodoApp = React.createClass({displayName: "TodoApp",
    getInitalState: function() {
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
    			React.createElement(TodoTextInput, {id: "new-todo", onSave: this._onSave}), 
    			React.createElement(MainSection, {allTodos: this.state.allTodos})
    		)
    	)
    },
    _onChange: function() {
    	this.setState(getTodoState());
    },
    _onSave: function(text) {
    	TodoActions.createTodo(text);
    }
})
