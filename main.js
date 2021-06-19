//onclick 'Save' btn
function saveTask() {
    event.preventDefault()
    const taskInput = document.getElementById("task").value
    const dateInput = document.getElementById("date").value
    const hourInput = document.getElementById("hour").value
    const userTask = {
        task: taskInput,
        date: dateInput,
        hour: hourInput
    }

    //get saved task from local storage and push the new tast to the array
    const savedTasksJson = localStorage.getItem("task")
    let savedTasksArray = savedTasksJson === null ? [] : JSON.parse(savedTasksJson)
    savedTasksArray.push(userTask)

    // Save tasks list array to localStorage
    const savedTasksArrayJson = JSON.stringify(savedTasksArray)
    localStorage.setItem("task", savedTasksArrayJson)

    // show saved note on screen
    loadNotes()


    //clean inputs area
    document.getElementById("task").value = ""
    document.getElementById("task").style.height = "46px"
    document.getElementById("date").value = ""
    document.getElementById("hour").value = ""
}


//on document loading
function loadNotes() {
    const savedTasksArrayJson = localStorage.getItem("task")
    const tasksAraay = JSON.parse(savedTasksArrayJson)

    let note = ""
    let index = 0

    const totalTasks = document.getElementById("totalTasks")
    totalTasks.innerHTML = tasksAraay.length

    for (const task of tasksAraay) {

        index = tasksAraay.indexOf(task)

        note += `
         <div class="noteTask animate fadeIn">
          <div class="noteArea">
            <img src="notebg.png" alt="">
            <textarea cols="18" rows="7" disabled>${task.task}</textarea>
            <p>${task.date} <br>
                ${task.hour}</p>
          </div>
          <span class="glyphicon glyphicon-remove " id="x_icon" onclick="remove(${index})"></span>
         </div>
        `

        const notesContainer = document.getElementById("notesContainer")
        notesContainer.innerHTML = note
    }
}




function remove(index) {

    //change the saved tasks JSON string to array
    const savedTasksArrayJson = localStorage.getItem("task")
    const tasksAraay = JSON.parse(savedTasksArrayJson)

    //delete task from array
    tasksAraay.splice(index, 1)

    // Save tasks list array to localStorage
    const savedTasksArrayJson1 = JSON.stringify(tasksAraay)
    localStorage.setItem("task", savedTasksArrayJson1)

    // show tasks after remove
    document.location.reload()
}

// auto grow textarea task input
function autoGrowTaskInput(element) {
    element.style.height = "20px"

    if (element.scrollHeight < 100) {
        element.style.height = (element.scrollHeight) + "px";
    }
    else {
        element.style.height = "100px"
    }
}