// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleDeleteListItem = (id) => {
        this.props.deleteListItemCallback(id);
    }

    handleSwapUp = (id) => {
        this.props.swapUpCallback(id);
    }

    handleSwapDown = (id) => {
        this.props.swapDownCallback(id);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        if (this.props.index == 0){
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <div className='item-col task-col'>{listItem.description}</div>
                    <div className='item-col due-date-col'>{listItem.due_date}</div>
                    <div className='item-col status-col' className={statusType}>{listItem.status}</div>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowUp 
                            className='list-item-control todo-button disabled'
                            onClick={this.handleSwapUp.bind(this, listItem.id)} />
                        <KeyboardArrowDown 
                            className='list-item-control todo-button'
                            onClick={this.handleSwapDown.bind(this, listItem.id)} />
                        <Close 
                            className='list-item-control todo-button'
                            onClick={this.handleDeleteListItem.bind(this, listItem.id)} />
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }
        else if (this.props.index == this.props.listLength-1){
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <div className='item-col task-col'>{listItem.description}</div>
                    <div className='item-col due-date-col'>{listItem.due_date}</div>
                    <div className='item-col status-col' className={statusType}>{listItem.status}</div>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowUp 
                            // id={'swap-up-' + listItem.id}
                            className='list-item-control todo-button'
                            onClick={this.handleSwapUp.bind(this, listItem.id)} />
                        <KeyboardArrowDown 
                            className='list-item-control todo-button disabled'
                            onClick={this.handleSwapDown.bind(this, listItem.id)} />
                        <Close 
                            className='list-item-control todo-button'
                            onClick={this.handleDeleteListItem.bind(this, listItem.id)} />
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                    <div className='item-col task-col'>{listItem.description}</div>
                    <div className='item-col due-date-col'>{listItem.due_date}</div>
                    <div className='item-col status-col' className={statusType}>{listItem.status}</div>
                    <div className='item-col test-4-col'></div>
                    <div className='item-col list-controls-col'>
                        <KeyboardArrowUp 
                            // id={'swap-up-' + listItem.id}
                            className='list-item-control todo-button'
                            onClick={this.handleSwapUp.bind(this, listItem.id)} />
                        <KeyboardArrowDown 
                            className='list-item-control todo-button'
                            onClick={this.handleSwapDown.bind(this, listItem.id)} />
                        <Close 
                            className='list-item-control todo-button'
                            onClick={this.handleDeleteListItem.bind(this, listItem.id)} />
                        <div className='list-item-control'></div>
            <div className='list-item-control'></div>
                    </div>
                </div>
            )
        }

    }
}

export default ToDoItem;