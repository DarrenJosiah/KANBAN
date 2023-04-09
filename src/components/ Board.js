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
    const [column, setColumn] = useState(null);

    function handleDrag(e) {
        setDraggedItem(e.target.textContent);
        // console.log(draggedItem);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(column) {
        setColumn(column);
        console.log("Drag enter column is " + column);
    }

    function handleDrop(e) {
        e.preventDefault();

        console.log('Dropped, draggedItem is ' + draggedItem);
        console.log('Dropped, column is ' + column);

        // Add item to dropped column
        let _array;
        switch (column) {
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
                _array = [...completeListArray];
                _array.unshift(draggedItem);
                setOnHoldListArray(_array);
                break;
        }
        
        // TODO – Remove text from old array
    }

  return (
    <div className='flex justify-evenly items-start flex-wrap'>
        {/* Backlog */}
        <div className="m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-orange-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Backlog
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                {backlogListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={handleDrag}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Backlog')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                })}
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* Progress */}
        <div className="sm:my-5 md:m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-blue-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Progress
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                {progressListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={handleDrag}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Progress')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                })}
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* Complete */}
        <div className="sm:my-5 md:m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-green-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                Complete
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                {completeListArray.map((task, index) => {
                    return (
                        <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                            draggable
                            onDragStart={handleDrag}
                            onDragOver={handleDragOver}
                            onDragEnter={() => handleDragEnter('Complete')}
                            onDrop={handleDrop}>
                            {task}
                        </p>
                    )
                })}
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
        {/* On Hold */}
        <div className="sm:my-5 md:m-5 w-screen max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="select-none text-center py-1 bg-red-500 rounded-lg mb-5 text-4xl font-bold tracking-tight text-gray-100 dark:text-white">
                On Hold
            </h5>
            <div className='max-h-96 overflow-y-auto'>
                {onHoldListArray.map((task, index) => {
                        return (
                            <p key={index} className="cursor-pointer mb-5 p-2 rounded-lg bg-gray-200 text-gray-900 mb-3 font-normal dark:text-gray-400"
                                draggable
                                onDragStart={handleDrag}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter('OnHold')}
                                onDrop={handleDrop}>
                                {task}
                            </p>
                        )
                })}
            </div>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                + Add Item
            </button>
        </div>
 
    </div>
  )
}

export default  Board