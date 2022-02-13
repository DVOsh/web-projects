import '/source/scss/style.scss';
import '/source/js/storage.js';

const taskItemHtml = `
<div class="task-template__container">
    <label class="task-template__check">
        <input type="checkbox">
        <span></span>
    </label>
    <div class="task-template__text"></div>
    <div class="task-template__remove"></div>
</div>
`;


const taskInput = document.querySelector('.main__input');
const taskContainer = document.querySelector('.main-field__container');


taskInput.addEventListener('keyup', addTask);
taskContainer.addEventListener('click', removeTask);
taskContainer.addEventListener('dblclick', editTask);

function addTask(event){
    if(event.code != 'Enter' || !this.value || this.value.match(/^\s*$/)) 
        return;
    
    //Создание элемента задачи
    const taskEl = createTaskElement(this.value)
    taskContainer.append(taskEl);

    //Отслеживание изменения чекбокса задачи
    const taskCheckEl = taskEl.querySelector('input[type="checkbox"]');
    taskCheckEl.addEventListener('change', onTaskCheckChange);


    taskInput.value = "";
    
}

function onTaskCheckChange(event){
    const taskTextEl = event.target.closest('.task-template__container').querySelector('.task-template__text');
    if(this.checked)
        taskTextEl.classList.add('completed');
    else
        taskTextEl.classList.remove('completed');
}

function editTask(event){
    const taskTextEl = event.target.closest('.task-template__text');

    if(!taskTextEl)
        return;
    
    const currentText = taskTextEl.innerText;

    const editInput = document.createElement('input');
    editInput.classList.add('edit-input');
    editInput.value = currentText;
    editInput.selectionStart = editInput.value.length;
    taskTextEl.append(editInput);
    editInput.focus();

    editInput.addEventListener('keyup', function(event){
        if(event.code == 'Escape'){
            this.remove();
        }
        
        if(event.code == 'Enter'){
            if(this.value.match(/^\s*$/))
                this.closest('.task-template').remove();
            
            taskTextEl.innerText = this.value;
            this.remove();
        }
    });
    editInput.onblur = function(event){
        this.remove();
    }
}

function removeTask(event){
    const removeBut = event.target.closest('.task-template__remove');

    if(!removeBut)
        return;

    removeBut.parentElement.parentElement.remove();
    
    //Анимация удаления (не получилась(()
    // const taskContainer = removeBut.parentElement.parentElement;

    // taskContainer.style.transformOrigin = 'top';
    // taskContainer.style.transform = 'scaleY(0)';
    // taskContainer.style.opacity = '0';

    // const removeTimerId = setTimeout(() => {
    //     taskContainer.remove();
    //     // clearTimeout(removeTimerId); //не работает
    // }, parseFloat(getComputedStyle(taskContainer).transitionDuration) * 1000);
}



function createTaskElement(text){
    const taskEl = document.createElement('div');
    taskEl.classList.add('main-field__task', 'task-template');
    taskEl.innerHTML = taskItemHtml;
    taskEl.querySelector('.task-template__text').innerText = text;
    taskEl.style.position = 'relative';
    taskEl.style.zIndex = window.getComputedStyle(taskContainer.lastElementChild).zIndex - 1;
    setTimeout(() => {taskEl.style.marginTop = "-35px"});

    return taskEl;
}