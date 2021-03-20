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
export default class EditDesc_Transaction extends jsTPS_Transaction{
    constructor(app, id, desc, oldDesc){
        super();
        this.app = app;
        this.id = id;
        this.desc = desc;
        this.oldDesc = desc;
    }
    
    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction() {
        this.app.handleDescUpdate(this.id, this.desc);
    }
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction() {
        console.log("am i even called");
        console.log(this.desc);
        console.log(this.oldDesc)
        this.app.handleDescUpdate(this.id, this.oldDesc);
        console.log("HELLO");
    }
}

