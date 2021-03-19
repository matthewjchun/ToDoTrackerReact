// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Modal from './components/Modal'         
import { TimerSharp } from '@material-ui/icons';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      modal: false,
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    let addButton = document.getElementById("add-list-button");
    addButton.classList.remove("add-list-but");
    addButton.classList.add("disabled");

    let addItem = document.getElementById("add-item-button");
    if(addItem.classList.contains("disabled")){
      addItem.classList.remove("disabled");      
    }
    let deleteList = document.getElementById("delete-list-button");
    if(deleteList.classList.contains("disabled")){
      deleteList.classList.remove("disabled");
    }
    let closeList = document.getElementById("close-list-button");
    if(closeList.classList.contains("disabled")){
      closeList.classList.remove("disabled");
    }

    console.log(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  addNewItem = () => {
    let newItem = this.makeNewToDoListItem();
    let toDoList = this.state.currentList;
    toDoList.items.push(newItem);

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }
  
  deleteItem = (id) => {      // should delete the list, given the item id
    let toDoList = this.state.currentList;    // obtains the current list
    let indexOfItem = -1;
    
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }
    toDoList.items.splice(indexOfItem, 1);

    this.setState({
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  swapItemUp = (id) => {
    let toDoList = this.state.currentList;    // get current list
    let indexOfItem = -1;                       // code to obtain the index of the item in the list
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }
    let swapee = toDoList.items[indexOfItem];
    let victim = toDoList.items[indexOfItem-1];
    toDoList.items[indexOfItem] = victim;
    toDoList.items[indexOfItem-1] = swapee;

    this.setState({
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  swapItemDown = (id) => {
    let toDoList = this.state.currentList;    // get current list
    let indexOfItem = -1;                       // code to obtain the index of the item in the list
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }
    let swapee = toDoList.items[indexOfItem];
    let victim = toDoList.items[indexOfItem+1];
    toDoList.items[indexOfItem] = victim;
    toDoList.items[indexOfItem+1] = swapee;

    this.setState({
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
  }

  deleteList = (toDoList) => {
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );

    let addButton = document.getElementById("add-list-button");
    addButton.classList.remove("disabled");
    addButton.classList.add("add-list-but");

    let addItem = document.getElementById("add-item-button");
    addItem.classList.add("disabled");
    let deleteList = document.getElementById("delete-list-button");
    deleteList.classList.add("disabled");
    let closeList = document.getElementById("close-list-button");
    closeList.classList.add("disabled");
    
    this.setState({
      toDoLists: nextLists,
      currentList: {items: []},
    });

    this.hideModal();
  }

  closeList = () => {
    let addButton = document.getElementById("add-list-button");
    addButton.classList.remove("disabled");
    addButton.classList.add("add-list-but");

    let addItem = document.getElementById("add-item-button");
    addItem.classList.add("disabled");
    let deleteList = document.getElementById("delete-list-button");
    deleteList.classList.add("disabled");
    let closeList = document.getElementById("close-list-button");
    closeList.classList.add("disabled");

    this.setState({
      currentList: {items: []}
    }, this.afterToDoListsChangeComplete);
  }

// MODAL WORK//

  showModal = () => {
    this.setState({
      modal: true 
    });
  };

  hideModal = () => {
    this.setState({ 
      modal: false 
    });
  };

// END OF MODAL WORK //
// LIST EDITING CALLBACK HANDLERS //
  // DESCRIPTION DONE //
  handleDescUpdate = (id, desc) => {
    let toDoList = this.state.currentList;    // obtains the current list
    let indexOfItem = -1;
    
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }

    let editedItem = toDoList.items[indexOfItem];
    editedItem.description = desc;

    this.setState({
      currentList: this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }
  // DESCRIPTION DONE //
  // DATE START //
  handleDateUpdate = (id, date) => {
    let toDoList = this.state.currentList;    // obtains the current list
    let indexOfItem = -1;
    
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }

    let editedItem = toDoList.items[indexOfItem];
    editedItem.due_date = date;

    this.setState({
      currentList: this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }
  // DATE DONE //
  // STATUS START //
  handleStatusUpdate = (id, status) => {
    let toDoList = this.state.currentList;    // obtains the current list
    let indexOfItem = -1;
    
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }

    let editedItem = toDoList.items[indexOfItem];
    editedItem.status = status;

    this.setState({
      currentList: this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }
  // STATUS DONE //
// LIST EDITING METHODS DONE //

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  render() {
    console.log("ray i love u im sorry");
    console.log(this.state.currentList);
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          currentList={this.state.currentList}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
        />
        <Workspace 
          descUpdateCallback={this.handleDescUpdate}
          dateUpdateCallback={this.handleDateUpdate}
          statusUpdateCallback={this.handleStatusUpdate}
          currentList={this.state.currentList}
          toDoLists={this.state.toDoLists}
          toDoListItems={items} 
          addNewListItemCallback={this.addNewItem}
          deleteListItemCallback={this.deleteItem}
          swapUpCallback={this.swapItemUp}
          swapDownCallback={this.swapItemDown}
          modalShowCallback={this.showModal}
          closeListCallback={this.closeList}
        />
        <Modal
          currentList={this.state.currentList}
          show={this.state.modal}
          handleClose={this.hideModal}
          handleDeleteList={this.deleteList}
        />
      </div>
    );
  }
}

export default App;