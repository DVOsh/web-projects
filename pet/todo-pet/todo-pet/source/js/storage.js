localStorage.clear();

export class Storage{
    constructor(){
        this.storageObj = {};
        if(!localStorage['task-list']){
            localStorage.setItem('task-list', JSON.stringify(this.storageObj));
            console.log('Tasks local storage created');
        }
    }

    addItem(itemText){
        const currentStorage = this.getCurrentStorage();
        currentStorage[itemText] = false;
        localStorage.removeItem('task-list');
        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    editItem(itemIndex){
    }

    onItemCheck(itemKey, isChecked){
        const currentStorage = this.getCurrentStorage();
        currentStorage[itemKey] = isChecked;
        localStorage.removeItem('task-list');
        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));

    }

    removeItem(itemKey){
        const currentStorage = this.getCurrentStorage();
        delete currentStorage[itemKey];
        localStorage.removeItem('task-list');
        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    getCurrentStorage(){
        return JSON.parse(localStorage.getItem('task-list'));
    }
}