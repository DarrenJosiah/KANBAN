import React, { useEffect, useState } from 'react'

function  Board() {

    const [backlogListArray, setBacklogListArray] = useState([])
    const [progressListArray, setProgressListArray] = useState([])
    const [completeListArray, setCompleteListArray] = useState([])
    const [onHoldListArray, setOnHoldListArray] = useState([])

    // Getters and setters
    function setLocalStorage() {
        let listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
        let arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
        arrayNames.forEach((arrayName, index) => {
            localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]))
        });
    }

    function getLocalStorage() {
        if (localStorage.getItem('backlogItems')) {
            console.log('Data found in local storage.');

            setBacklogListArray(JSON.parse(localStorage.backlogItems));
            setProgressListArray(JSON.parse(localStorage.progressItems));
            setCompleteListArray(JSON.parse(localStorage.completeItems));
            setOnHoldListArray(JSON.parse(localStorage.onHoldItems));
        } else {
            console.log('No data in local storage.');

            setBacklogListArray(['Make a video', 'Drink coffee during free time']);
            setProgressListArray(['Work on React projects', 'Listen to kpop']);
            setCompleteListArray(['Take a nap', 'Getting things done']);
            setOnHoldListArray(['Being weird']);
            
            setLocalStorage();
        }
    }

    useEffect (() => {
        getLocalStorage();
    }, []);


    // Drag and Drop (4) functionality
    const [draggedItem, setDraggedItem] = useState(null);
    const [initialColumn, setInitialColumn] = useState(null);
    const [droppedColumn, setDroppedColumn] = useState(null);

    function handleDrag(e, initialColumn) {
        setDraggedItem(e.target.textContent);
        setInitialColumn(initialColumn);
        console.log('Initial column is ' + initialColumn);
        console.log('Drag item is ' + draggedItem);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(droppedColumn) {
        setDroppedColumn(droppedColumn);
        console.log("Drag entered column is " + droppedColumn);
    }

    function handleDrop(e) {
        e.preventDefault();

        console.log('Dropped item is ' + draggedItem);
        console.log('Dropped column is ' + droppedColumn);
        console.log('Initial column is ' + initialColumn);

        if (initialColumn === droppedColumn) {
            console.log('Same column');
            return;
        }

        // Add item to new array
        let _array;
        switch (droppedColumn) {
            // Set new copy of array

            case 'Backlog':
                _array = [...backlogListArray];
                _array.unshift(draggedItem);
                setBacklogListArray(_array);
                break;

            case 'Progress':
                _array = [...progressListArray];
                _array.unshift(draggedItem);
                setProgressListArray(_array);
                break;

            case 'Complete':
                _array = [...completeListArray];
                _array.unshift(draggedItem);
                setCompleteListArray(_array);
                break;

            case 'OnHold':
                _array = [...onHoldListArray];
                _array.unshift(draggedItem);
                setOnHoldListArray(_array);
                break;
        }
        
        // Remove item from old array
        let _initialarray;
        switch (initialColumn) {
            case 'Backlog':
                _initialarray = backlogListArray.filter(a => a !== draggedItem);
                setBacklogListArray(_initialarray);
                break;

            case 'Progress':
                _initialarray = progressListArray.filter(a => a !== draggedItem);
                setProgressListArray(_initialarray);
                break;

            case 'Complete':
                _initialarray = completeListArray.filter(a => a !== draggedItem);
                setCompleteListArray(_initialarray);
                break;

            case 'OnHold':
                _initialarray = onHoldListArray.filter(a => a !== draggedItem);
                setOnHoldListArray(_initialarray);
                break;
        }


        // TODO - Set Local Storage
        // Arrays are in prev state still
        // this.setLocalStorage();
        // console.log(backlogListArray);
        // console.log(progressListArray);
        // console.log(completeListArray);
        // console.log(backlogListArray);
    }

  return (
    <div className='flex justify-evenly items-start flex-wrap'>
        {/* Backlog */}
        <div className="m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-orange-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Backlog
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                { backlogListArray.length > 0 ? backlogListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={e => handleDrag(e, 'Backlog')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Backlog')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                }) : 
                        <p className="italic cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-600 mb-3 font-extralight dark:text-gray-400"
                            onDragStart={e => handleDrag(e, 'Backlog')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Backlog')}
                            onDrop={handleDrop}>
                            Add item
                        </p>
                }
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* Progress */}
        <div className="m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-blue-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Progress
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                { progressListArray.length > 0 ? progressListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={e => handleDrag(e, 'Progress')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Progress')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                }) : 
                        <p className="italic cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-600 mb-3 font-extralight dark:text-gray-400"
                            onDragStart={e => handleDrag(e, 'Progress')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Progress')}
                            onDrop={handleDrop}>
                            Add item
                        </p>
                }
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* Complete */}
        <div className="m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-green-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Complete
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                { completeListArray.length > 0 ? completeListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={e => handleDrag(e, 'Complete')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Complete')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                }) : 
                        <p className="italic cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-600 mb-3 font-extralight dark:text-gray-400"
                            onDragStart={e => handleDrag(e, 'Complete')}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Complete')}
                            onDrop={handleDrop}>
                            Add item
                        </p>
                }
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* On Hold */}
        <div className="m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-red-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                On Hold
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                { onHoldListArray.length > 0 ? onHoldListArray.map((task, index) => {
                        return (
                            <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                                draggable
                                onDragStart={e => handleDrag(e, 'OnHold')}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter('OnHold')}
                                onDrop={handleDrop}>
                                {task}
                            </p>
                        )
                    }) : 
                            <p className="italic cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-600 mb-3 font-extralight dark:text-gray-400"
                                onDragStart={e => handleDrag(e, 'OnHold')}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter('OnHold')}
                                onDrop={handleDrop}>
                                Add item
                            </p>
                    }
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
    </div>
  )
}

export default  Board