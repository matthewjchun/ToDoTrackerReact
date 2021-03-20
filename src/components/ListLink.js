// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");

        this.state = {
            name: this.props.toDoList.name,
            editing: false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    editName = () => {
        this.setState({
            editing: true
        })
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleFinishName = () => {
        this.props.nameUpdateCallback(this.state.name);

        this.setState({
            editing: false
        });
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        if(this.props.activeList == true){
            if(this.state.editing){
                return (
                    <input 
                        className='todo-list-button-edit highlight'
                        type='text'
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        onBlur={this.handleFinishName}
                    >
                    </input>
                )
            }
            else{
                return (
                    <div 
                        className='todo-list-button highlight'
                        onClick={this.editName}
                    >
                        {this.props.toDoList.name}<br />
                    </div>
                )
            }
        }
        else{
            return (
                <div 
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                >
                    {this.props.toDoList.name}<br />
                </div>
            )
        }
    }
}

export default ListLink;