// 1. Implement Double Linked **LinkedList** data structure 
/// and then use it to implement **Stack**
/// and **Queue**

const createLinkedList = function () {
    
    let tail = null;    /// we are defining the pointers 
    let head = null;    ///
    
    const createListNodes = function (value) {
        return {
            value,
            next: null,
            prev: null,
        }
    };
    
    const isEmpty = function () {               //// function to check if LL is empty(using the pointers)
        if (head === null && tail === null) {
            return true;
        } else {
            return false;
        }
    };
    
    const getListHead = function () {           //// function to get the head node(using the pointers)
        return head;
    };
    
    const getListTail = function () {           //// function to get the tail node(using the pointers)
        return tail;
    };
    
    const insertAfter = function (node, value) {
        let newNode = createListNodes(value);

        if (isEmpty()) {                    //// when the LL is empty the head and tail become the newNode
            head = newNode;                 /// first corner case
            tail = newNode;
        } else if (tail === node) {           /// when you are inserting after the head
            newNode.prev = node;             /// second corner case
            node.next = newNode;
            tail = newNode;
        } else {                            //// General Case
            newNode.prev = node;            /// First two lines are to DEFINE what the newNode is pointing to
            newNode.next = node.next;

            node.next.prev = newNode;       /// Second two lines are to CHANGE what the 2 surrounding elements
            node.next = newNode;            /// are pointing to (need to point to newNode)

            /// it's important that the 2 groups of lines be in this order because
            /// the first lines use a reference to node.next, which will ultimately be changed to newNode

        }
        return newNode;
    };

    const insertBefore = function (node, value) {
        let newNode = createListNodes(value);

        if (isEmpty()) {                    /// Same corner case as above
            head = newNode;
            tail = newNode;
        } else if (head === node) {           /// symmetric corner case as above
            newNode.next = node;
            node.prev = newNode;
            head = newNode;
        } else {
            newNode.next = node;            /// symmetric corner case as above
            newNode.prev = node.prev;

            node.prev = newNode;            /// symmetric corner case as above
            node.prev.next = newNode;       
        }

        return newNode;
    };

    const push = function (value) {         /// This is a specific case of insert after where the tail == node
        return insertAfter(tail, value);
    };
    
    const unshift = function (value) {      /// This is a specific case of insert before where the node = head
        return insertBefore(head, value);
    };
    
    const remove = function (node) {
        
        if (head === tail) {                 /// If there is only one element that is both head and tail
            head = null;                    /// this covers also the case where the LL is empty
            tail = null;
            return node;
        } else if (head === node) {          /// Corner case when head == node
            node.next.prev = null;
            head = node.next;
        } else if (tail === node) {          /// Corner case when tail == node
            node.prev.next = null;
            tail = node.prev;
        } else {                            /// General case
            node.prev.next = node.next;
            node.next.prev = node.prev;                            
        }
        
        return node;
    };

    const pop = function () {               /// This is a specific case of remove where tail == node
        return remove(tail);
    };

    const shift = function () {             /// This is a specific case of remove where head == node
        return remove(head);
    };

    const find = function (value) {
        let node = head;                    /// you can start to search from the front or from the back
                                            /// here it's from the front/head
        while (node !== null) {
            if (node.value === value) {
                return node;
            }
            node = node.next;
        }
        return null;                        /// If you don't find it
    };



    const clear = function () {
        //// Check the presentation
        head = null;
        tail = null;
    };

    const valuesToString = function () {            //// Function that gets all the node.values in a string
        let arrOfStringValues = [];                 //// ready for printing

        let node = head;
        while (node !== null) {
            arrOfStringValues.push(node.value);
            node = node.next;
        }

        return arrOfStringValues.join(' ');
    };

    const getSize = function () {
        let node = head;
        let counter = 0;
        while (node !== null) {
            counter += 1;
            node = node.next;
        }
        return counter;
    };

    const detach = function (node) {
        if (node.next) {
            node.next.prev = null;
        }
        if (node.prev) {
            node.prev.next = null;
        }
        node.prev = null;
        node.next = null;
        return node; 
    };

    const attach = function (leftNode, rightNode) {
        if (leftNode === rightNode) {
            return;
        }
        leftNode.next = rightNode;
        rightNode.prev = leftNode;
    }

    const linkedList = {
        /// here you store the methods 
        isEmpty,
        getListHead,
        getListTail,
        insertAfter,
        insertBefore,
        push,
        unshift,
        remove,
        pop,
        shift,
        valuesToString,
        find,
        clear,
        getSize,
        detach,
        attach,
    };
    
    return linkedList  //// you return the main object that the function was aiming to create
}

const createStack = function() {
    let linkedList = createLinkedList();

    const isEmpty = function () {
        return linkedList.isEmpty();
    };

    const push = function (value) {
        return linkedList.push(value).value;
    };

    const pop = function () {
        let node = linkedList.pop();
        if (node === null) {
            return null;
        }
        return node.value;
    };

    const lastItem = function () {
        let node = linkedList.getListTail();
        if (node === null) {
            return null;
        }
        return node.value;     
    };

    const getSize = function () {
        return linkedList.getSize();
    };

    const stack = {                         //// you can use the linked list implementation to do this
        isEmpty,                            //// because in the closure of those functions is the object 
        push,                               //// linkedList that we used to call on the methods of the LinkedList
        pop, 
        lastItem,
        getSize,    //// here write the methods of the stack you want to expose 
    };

    return stack 
}

const createQueue = function () {
    let linkedList = createLinkedList();

    const isEmpty = function() {
        return linkedList.isEmpty();
    }

    const push = function(value) {
        let node = linkedList.push(value);
        return node.value;
    }

    const shift = function() {
        let node = linkedList.shift();
        if (node === null) {
            return null;
        }
        return node.value;
    }

    const firstItem = function() {
        let node = linkedList.getListHead();
        if (node === null) {
            return null;
        }
        return node.value
    }

    const getSize = function() {
        return linkedList.getSize();
    }

    const queue = {
        isEmpty,
        push,
        shift,
        firstItem,
        getSize,
    }
    return queue;
}

//// The implementation of the Linked List can be written better, there is some overlapping logic... just poor...

// Test on problems and then test on homework

/// add functionality (detach/attach, head/tail update etc)




