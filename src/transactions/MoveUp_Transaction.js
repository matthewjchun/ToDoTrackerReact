'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

/**
 * jsTPS_Transaction
 * 
 * This provides the basic structure for a transaction class. Note to use
 * jsTPS one should create objects that define these two methods, doTransaction
 * and undoTransaction, which will update the application state accordingly.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 1.0
 */
export default class MoveUp_Transaction extends jsTPS_Transaction{
    constructor(app, id){
        super();
        this.app = app;
        this.oldState = app.state;
        this.id = id;
    }
    
    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        this.app.swapItemUp(this.id);
    }
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        this.app.setState(this.oldState);
    }
}

