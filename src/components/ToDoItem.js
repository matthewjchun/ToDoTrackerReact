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

        this.state = {
            id: this.props.toDoListItem.id,
            oldDesc: this.props.toDoListItem.description,
            desc: this.props.toDoListItem.description,
            date: this.props.toDoListItem.due_date,
            status: this.props.toDoListItem.status,
            editDesc: false,
            editDate: false,
            editStatus: false
        }
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

    handleEditDesc = () => {
        this.setState({
            editDesc: true
        })
    }

    handleDescChange = (event) => {
        this.setState({
            desc: event.target.value
        });
        // console.log(this.state.oldDesc);
        // console.log(this.state.desc);
    }

    handleFinishDesc = () => {
        // console.log(this.state.oldDesc);
        this.props.descUpdateCallback(this.state.id, this.state.desc, this.state.oldDesc);

        this.setState({
            editDesc: false
        });
    }
// END OF DESCRIPTION EDITING //
// START OF DATE EDITING //

    handleEditDate = () => {
        this.setState({
            editDate: true
        })
    }

    handleDateChange = (event) => {
        this.setState({
            date: event.target.value
        });
    }

    handleFinishDate = () => {

        this.props.dateUpdateCallback(this.state.id, this.state.date);

        this.setState({
            editDate: false
        });
    }
// END OF DATE EDITING //
// START OF STATUS EDITING //
    handleEditStatus = () => {
        this.setState({
            editStatus: true
        });
    }

    handleStatusChange = (event) => {
        console.log(event.target.value)
        this.setState({
            status: event.target.value
        });
    }

    handleFinishStatus = () => {

        this.props.statusUpdateCallback(this.state.id, this.state.status);

        this.setState({
            editStatus: false
        });
    }
// END OF STATUS EDITING //
    

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        if (this.props.index == 0){
            if(this.state.editDesc){
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <input 
                            type='text' 
                            value={this.state.desc} 
                            className='item-col task-col' 
                            onChange={this.handleDescChange}
                            onBlur={this.handleFinishDesc}
                            >
                        </input>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editDate) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <input
                            type='date'
                            className='item-col due-date-col'
                            onChange={this.handleDateChange}
                            onBlur={this.handleFinishDate}
                        >
                        </input>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editStatus) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <select value={this.state.status} className='item-col status-col' name='status' onChange={this.handleStatusChange} onBlur={this.handleFinishStatus}>
                            <option value="complete">complete</option>
                            <option value="incomplete">incomplete</option>
                        </select>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col' onClick={this.handleEditDesc}>{this.state.desc}</div>
                        <div className='item-col due-date-col' onClick={this.handleEditDate}>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType} onClick={this.handleEditStatus}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
        }
        else if (this.props.index == this.props.listLength-1){
            if(this.state.editDesc){
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <input 
                            type='text' 
                            value={this.state.desc} 
                            className='item-col task-col' 
                            onChange={this.handleDescChange}
                            onBlur={this.handleFinishDesc}
                            >
                        </input>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editDate) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <input
                            type='date'
                            className='item-col due-date-col'
                            onChange={this.handleDateChange}
                            onBlur={this.handleFinishDate}
                        >
                        </input>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editStatus) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <select value={this.state.status} className='item-col status-col' name='status' onChange={this.handleStatusChange} onBlur={this.handleFinishStatus}>
                            <option value="complete">complete</option>
                            <option value="incomplete">incomplete</option>
                        </select>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col' onClick={this.handleEditDesc}>{this.state.desc}</div>
                        <div className='item-col due-date-col' onClick={this.handleEditDate}>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType} onClick={this.handleEditStatus}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
        }
        else{
            if(this.state.editDesc){
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <input 
                            type='text' 
                            value={this.state.desc} 
                            className='item-col task-col' 
                            onChange={this.handleDescChange}
                            onBlur={this.handleFinishDesc}
                            >
                        </input>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editDate) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <input
                            type='date'
                            className='item-col due-date-col'
                            onChange={this.handleDateChange}
                            onBlur={this.handleFinishDate}
                        >
                        </input>
                        <div className='item-col status-col' className={statusType}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else if (this.state.editStatus) {
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col'>{this.state.desc}</div>
                        <div className='item-col due-date-col'>{this.state.date}</div>
                        <select value={this.state.status} className='item-col status-col' name='status' onChange={this.handleStatusChange} onBlur={this.handleFinishStatus}>
                            <option value="complete">complete</option>
                            <option value="incomplete">incomplete</option>
                        </select>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button disabled'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div id={'todo-list-item-' + this.state.id} className='list-item-card'>
                        <div className='item-col task-col' onClick={this.handleEditDesc}>{this.state.desc}</div>
                        <div className='item-col due-date-col' onClick={this.handleEditDate}>{this.state.date}</div>
                        <div className='item-col status-col' className={statusType} onClick={this.handleEditStatus}>{this.state.status}</div>
                        <div className='item-col test-4-col'></div>
                        <div className='item-col list-controls-col'>
                            <KeyboardArrowUp 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapUp.bind(this, this.state.id)} />
                            <KeyboardArrowDown 
                                className='list-item-control todo-button'
                                onClick={this.handleSwapDown.bind(this, this.state.id)} />
                            <Close 
                                className='list-item-control todo-button'
                                onClick={this.handleDeleteListItem.bind(this, this.state.id)} />
                            <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default ToDoItem;