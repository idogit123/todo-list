let taskList = document.getElementById('task-list');
let addTaskButton = document.getElementById('add-task-button');
let trashButton = document.getElementById('trash-button');
let completeButton = document.getElementById('complete-button');
let taskNameInput = document.getElementById('task-name-input');
let confettiContainer = document.getElementById('confetti-container');
let elementsSelected = 0;

function addTaskButtonPressed() {
    if (addTaskButton.dataset.status == 'go-up') {
        let taskName = taskNameInput.value;
        
        if (taskNameInput.value.replace(/ /g, '').length == 0) {
            return;
        }

        taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.name = taskName;
        taskCard.dataset.status = 'none';

        cardStatus = document.createElement('div');
        cardStatus.className = 'card-status';
        cardStatus.onclick = function(event) {
            if (event.srcElement.parentNode.dataset.status == 'none') {
                event.srcElement.parentNode.dataset.status = 'selected';
                elementsSelected++;
            } else {
                event.srcElement.parentNode.dataset.status = 'none';
                elementsSelected--;
            }
            showCorrectActionButtons();
        }

        cardTitle = document.createElement('h2');
        cardTitle.className = 'card-title';
        cardTitle.innerHTML = taskName;

        taskCard.appendChild(cardTitle);
        taskCard.appendChild(cardStatus);
        taskList.appendChild(taskCard);
        taskCard.scrollIntoView(false);

        addTaskButton.dataset.status = 'active'
        taskNameInput.dataset.status = 'hidden';
        taskNameInput.value = '';
    } else {
        addTaskButton.dataset.status = 'go-up'
        taskNameInput.dataset.status = 'active';
    }
}

function showCorrectActionButtons() {
    if (elementsSelected > 0) {
        addTaskButton.dataset.status = 'hidden';
        trashButton.dataset.status = 'active';
        completeButton.dataset.status = 'active';
    } else {
        addTaskButton.dataset.status = 'active';
        trashButton.dataset.status = 'hidden';
        completeButton.dataset.status = 'hidden';
    }
}

function trashSelectedTasks() {
    let tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.dataset.status == 'selected') {
            taskList.removeChild(task);
            i--;
        }
    }
    elementsSelected = 0;
    showCorrectActionButtons();
}

function completeSelectedTasks() {
    let tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.dataset.status == 'selected') {
            taskList.removeChild(task);
            i--;
        }
    }
    elementsSelected = 0;
    showCorrectActionButtons();
    throwConfetti();
}

function throwConfetti() {
    confetti.start()
    setTimeout(function() {
        confetti.stop()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
}

/*

<div class="task-card" name="Task blueprint">
    <div class="card-status"><i class="fa-solid fa-circle"></i></div>
    <h2 class="card-title">Task blueprint</h2>
</div>


*/