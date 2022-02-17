import '/source/scss/style.scss';
import { Storage } from '/source/js/storage.js';

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
const tasksStorage = new Storage();



const taskInput = document.querySelector('.main__input');
const taskContainer = document.querySelector('.main-field__container');
const tabsContainer = document.querySelector('.tabs-field__items');

const activeTabEl = document.querySelector('.tabs-field__item.active');
const completedTabEl = document.querySelector('.tabs-field__item.completed');
const clearTabEl = document.querySelector('.tabs-field__close-tab');


taskInput.addEventListener('keyup', addTask);
taskContainer.addEventListener('click', removeTask);
taskContainer.addEventListener('dblclick', editTask);
tabsContainer.addEventListener('click', chooseTab);

function addTask(event){
    if(event.code != 'Enter' || !this.value || this.value.match(/^\s*$/)) 
        return;
    
    const currentTaskStorage = tasksStorage.getCurrentStorage();
    //Проверка на наличие данной задачи
    if(currentTaskStorage.hasOwnProperty(this.value)){
        //Добавить класс для контейнера задачи
        const keys = Object.keys(currentTaskStorage);
        let index = keys.indexOf(this.value);
        taskContainer.children[index + 1].classList.add('duplicated');
        setTimeout(() => {taskContainer.children[index + 1].classList.remove('duplicated');}, 500)
        return;
    }

    //Создание элемента задачи
    const taskEl = createTaskElement(this.value)
    taskContainer.append(taskEl);

    //Отслеживание изменения чекбокса задачи
    const taskCheckEl = taskEl.querySelector('input[type="checkbox"]');
    taskCheckEl.addEventListener('change', onTaskCheckChange);

    //Добавление задачи в localStorage
    tasksStorage.addItem(this.value);

    taskInput.value = "";

    //Появление вкладки "Active"
    checkTabs();
}

function onTaskCheckChange(event){
    const taskTextEl = event.target.closest('.task-template__container').querySelector('.task-template__text');

    if(this.checked)
        taskTextEl.classList.add('completed');
    else
        taskTextEl.classList.remove('completed');

    tasksStorage.onItemCheck(taskTextEl.innerText, this.checked);

    checkTabs();
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
    taskTextEl.parentElement.append(editInput);
    editInput.focus();

    editInput.addEventListener('keyup', function(event){
        if(event.code == 'Escape'){
            this.blur();
        }
        
        if(event.code == 'Enter'){
            if(this.value.match(/^\s*$/))
                this.closest('.task-template').remove();
                // removeTask(event);
            
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

    const taskContainer = removeBut.closest('.main-field__task');

    moveTask(taskContainer, true);

    const removeTimerId = setTimeout(() => {
        taskContainer.remove();
        // clearTimeout(removeTimerId); //не работает
    }, parseFloat(getComputedStyle(taskContainer).transitionDuration) * 1000);

    tasksStorage.removeItem(taskContainer.querySelector('.task-template__text').innerText);

    checkTabs();
}

function moveTask(containerEl, hide = false){
    if(hide){
        containerEl.style.marginTop = '-135px';
        containerEl.style.opacity = '0.5';    
    } else{
        containerEl.style.marginTop = '-35px';
        containerEl.style.opacity = '1';    
    }
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

function checkCheckedItemsCount(){
    const storageObj = tasksStorage.getCurrentStorage();
    let result = {
        checked: 0,
        unchecked: 0
    };

    for(let check in storageObj){
        if(storageObj[check]){
            ++result.checked;
        } else{
            ++result.unchecked;
        }
    }

    return result;
}

function checkTabs(){
    if(activeTabEl.hidden){
        if(checkCheckedItemsCount().unchecked > 0){
            activeTabEl.hidden = false;
            animateTab(activeTabEl);
        }
    } else{
        if(checkCheckedItemsCount().unchecked == 0){
            animateTab(activeTabEl, true); //!
            activeTabEl.hidden = true;
        }
    }

    if(completedTabEl.hidden){
        if(checkCheckedItemsCount().checked > 0){
            completedTabEl.hidden = false;
            clearTabEl.hidden = false;
            animateTab(completedTabEl);
        }
    } else{
        if(checkCheckedItemsCount().checked == 0){
            completedTabEl.hidden = true;
            clearTabEl.hidden = true;
        }
    }
}

function chooseTab(event){
    const tab = event.target.closest('.tabs-field__item');
    
    if(!tab) 
        return;

    const tabWrapper = document.querySelector('.tabs-field__wrapper');
    const point = tab.getBoundingClientRect().x - tabsContainer.getBoundingClientRect().x;

    tabWrapper.style.left = point - 24 + 'px';


    const currentTaskStorage = tasksStorage.getCurrentStorage();

    if(tab.classList.contains('active')){
        let index = 0;
        for(let task in currentTaskStorage){
            if(currentTaskStorage[task]){
                moveTask(taskContainer.children[index + 1], true);
            } else{
                moveTask(taskContainer.children[index + 1]);
            }
            index++;
        }
    } else if(tab.classList.contains('completed')){
        let index = 0;
        for(let task in currentTaskStorage){
            if(!currentTaskStorage[task]){
                moveTask(taskContainer.children[index + 1], true);
            } else{
                moveTask(taskContainer.children[index + 1]);
            }
            index++;
        }
    } else if(tab.classList.contains('all')){
        for(let task of taskContainer.children){
            if(getComputedStyle(task).marginTop == "-135px"){
                moveTask(task);
            }
        }
    }
}

function animateTab(tabEl, reverse = false){
    if(reverse){
        tabEl.classList.add('appearing_rev');
        setTimeout(() => {tabEl.classList.remove('appearing_rev')}, 500);
    } else{
        tabEl.classList.add('appearing');
        setTimeout(() => {tabEl.classList.remove('appearing')}, 500);
    }
}