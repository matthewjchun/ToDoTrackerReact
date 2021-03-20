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
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction';
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction';
import MoveUp_Transaction from './transactions/MoveUp_Transaction'
import MoveDown_Transaction from './transactions/MoveDown_Transaction'
import EditDesc_Transaction from './transactions/EditDesc_Transaction'
import EditDate_Transaction from './transactions/EditDate_Transaction'
import EditStatus_Transaction from './transactions/EditStatus_Transaction'
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

    localStorage.clear();

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

    this.tps.clearAllTransactions();
    let undo = document.getElementById("undo-button");
    undo.classList.add("disabled");
    let redo = document.getElementById("redo-button");
    redo.classList.add("disabled")

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

  addNewItemTransaction = () => {
    let trans = new AddNewItem_Transaction(this);
    this.tps.addTransaction(trans);

    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");


  }

  addNewItem = () => {
    let newItem = this.makeNewToDoListItem();
    // let toDoList = this.state.currentList
    let toDoList = [... this.state.currentList.items, newItem];
    let newList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: toDoList
    }
    const nextLists = this.state.toDoLists.map(testList =>
      (testList.id === this.state.currentList.id) ? newList : testList
    );
    console.log(nextLists);
    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: nextLists,
      currentList: newList,
      nextListItemId: this.state.nextListItemId+1
    }, console.log(this.state.toDoLists));
    // this.afterToDoListsChangeComplete);

  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }
  
  deleteItemTransaction = (id) => {
    let trans = new DeleteItem_Transaction(this, id);
    this.tps.addTransaction(trans);


    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");


  }


  deleteItem = (id) => {      // should delete the list, given the item id
    let toDoList = this.state.currentList;    // obtains the current list
    let indexOfItem = -1;
    
    for (let i = 0; (i < toDoList.items.length) && (indexOfItem < 0); i++){
      if (toDoList.items[i].id === id){
        indexOfItem = i;
      }
    }
    let itemsList1 = toDoList.items.slice(0, indexOfItem);
    let itemsList2 = toDoList.items.slice(indexOfItem+1);
    let itemsList = itemsList1.concat(itemsList2);

    let newList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: itemsList
    }

    
    const nextLists = this.state.toDoLists.map(testList =>
      (testList.id === this.state.currentList.id) ? newList : testList
    );


    this.setState({
      toDoLists: nextLists,
      currentList: newList
    }, this.afterToDoListsChangeComplete);
  }

  moveUpTransaction = (id) => {
    let trans = new MoveUp_Transaction(this, id);
    this.tps.addTransaction(trans);


    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");

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
    let itemsList1 = toDoList.items.slice(0,indexOfItem-1);
    itemsList1.push(swapee);
    itemsList1.push(victim);
    let itemsList2 = toDoList.items.slice(indexOfItem+1);
    let itemsList = itemsList1.concat(itemsList2);

    let newList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: itemsList
    }

    const nextLists = this.state.toDoLists.map(testList =>
      (testList.id === this.state.currentList.id) ? newList : testList
    );

    this.setState({
      toDoLists: nextLists,
      currentList: newList
    }, this.afterToDoListsChangeComplete);
  }

  moveDownTransaction = (id) => {
    let trans = new MoveDown_Transaction(this, id);
    this.tps.addTransaction(trans);

    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");
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

    let itemsList1 = toDoList.items.slice(0,indexOfItem);
    itemsList1.push(victim);
    itemsList1.push(swapee);

    let itemsList2 = toDoList.items.slice(indexOfItem+2);
    let itemsList = itemsList1.concat(itemsList2);
    console.log(itemsList);

    let newList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: itemsList
    }

    const nextLists = this.state.toDoLists.map(testList =>
      (testList.id === this.state.currentList.id) ? newList : testList
    );

    this.setState({
      toDoLists: nextLists,
      currentList: newList
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

handleNameUpdate = (name) => {
  let toDoList = this.state.currentList;

  toDoList.name = name;

  const nextLists = this.state.toDoLists.filter(testList =>
    testList.id !== toDoList.id
  );
  nextLists.unshift(toDoList);

  this.setState({
    currentList: toDoList,
    toDoLists: nextLists
  }, this.afterToDoListsChangeComplete)
    
}

// LIST EDITING CALLBACK HANDLERS //
  // DESCRIPTION START //
  editDescTransaction = (id, desc, oldDescription) => {
    let trans = new EditDesc_Transaction(this, id, desc, oldDescription);
    this.tps.addTransaction(trans);

    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");
  }

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
      currentList: toDoList
    }, this.afterToDoListsChangeComplete)

    this.loadToDoList(this.state.currentList)
  }
  // DESCRIPTION DONE //
  // DATE START //

  editDateTransaction = (id, date, oldDate) => {
    let trans = new EditDate_Transaction(this, id, date, oldDate);
    this.tps.addTransaction(trans);

    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");
  }

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

  editStatusTransaction = (id, status, oldStat) => {
    let trans = new EditStatus_Transaction(this, id, status, oldStat);
    this.tps.addTransaction(trans);

    let undo = document.getElementById("undo-button");
    undo.classList.remove("disabled");
  }

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

// UNDO / REDO WORK //

  undo = () => {
    let redo = document.getElementById("redo-button");
    let undo = document.getElementById("undo-button");
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
      if (!this.tps.hasTransactionToUndo()) {
          undo.classList.add("disabled");
      }
      redo.classList.remove("disabled");
    }
  } 

  redo = () => {
    let redo = document.getElementById("redo-button");
    let undo = document.getElementById("undo-button");
    if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();
        if (!this.tps.hasTransactionToRedo()) {
            redo.classList.add("disabled");
        }
        undo.classList.remove("disabled");
    }
  }

  keydownHandler = (e) => {
    if(e.keyCode == 90 && e.ctrlKey && this.tps.hasTransactionToUndo)
      this.undo();
    if(e.keyCode == 89 && e.ctrlKey && this.tps.hasTransactionToRedo)
      this.redo();
  }

// END OF UNDO / REDO //



  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  render() {
    let items = this.state.currentList.items;
    console.log(this.state.toDoLists)
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          nameUpdateCallback={this.handleNameUpdate}
          currentList={this.state.currentList}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
        />
        <Workspace 
          undo={this.undo}
          redo={this.redo}
          descUpdateCallback={this.editDescTransaction}
          dateUpdateCallback={this.editDateTransaction}
          statusUpdateCallback={this.editStatusTransaction}
          currentList={this.state.currentList}
          toDoLists={this.state.toDoLists}
          toDoListItems={items} 
          addNewListItemCallback={this.addNewItemTransaction}
          deleteListItemCallback={this.deleteItemTransaction}
          swapUpCallback={this.moveUpTransaction}
          swapDownCallback={this.moveDownTransaction}
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