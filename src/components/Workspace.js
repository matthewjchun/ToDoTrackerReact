// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewListItem = () => {
        this.props.addNewListItemCallback();
    }

    handleDeleteListItemCallback = (id) => {
        this.props.deleteListItemCallback(id);
    }

    handleSwapUpCallback = (id) => {
        this.props.swapUpCallback(id);
    }

    handleSwapDownCallback = (id) => {
        this.props.swapDownCallback(id);
    }

    handleCloseList = () => {
        this.props.closeListCallback();
    }

    handleDeleteList = (toDoList) => {
        this.props.deleteListCallback(toDoList);
    }

    handleShowModal = () => {
        this.props.modalShowCallback();
    }

    handleUndo = () => {
        this.props.undo();
    }

    handleRedo = () => {
        this.props.redo();
    }

    render() {
        let currentList = this.props.currentList;

        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleUndo}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleRedo}/>
                        <AddBox 
                            id="add-item-button" 
                            className="list-item-control material-icons todo-button disabled" 
                            onClick={this.handleAddNewListItem}/>
                        <Delete
                            id="delete-list-button" 
                            className="list-item-control material-icons todo-button disabled"
                            onClick={this.handleShowModal}/>
                        <Close 
                            id="close-list-button" 
                            className="list-item-control material-icons todo-button disabled"
                            onClick={this.handleCloseList} />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem, itemIndex) => (
                        <ToDoItem
                            descUpdateCallback={this.props.descUpdateCallback}
                            dateUpdateCallback={this.props.dateUpdateCallback}
                            statusUpdateCallback={this.props.statusUpdateCallback}
                            currentList={this.props.currentList}
                            toDoLists={this.props.toDoLists}
                            listLength={this.props.toDoListItems.length}
                            index={itemIndex}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            deleteListItemCallback={this.handleDeleteListItemCallback}
                            swapUpCallback={this.handleSwapUpCallback}
                            swapDownCallback={this.handleSwapDownCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;