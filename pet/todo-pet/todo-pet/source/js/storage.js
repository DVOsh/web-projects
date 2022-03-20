localStorage.clear();

export class Storage{
    constructor(){
        this.storageObj = {

            // [Symbol.iterator](){
            //     next()
            // }
        };
        if(!localStorage['task-list']){
            localStorage.setItem('task-list', JSON.stringify(this.storageObj));
            console.log('Tasks local storage created');
        }
    }

    addItem(itemText){
        const currentStorage = this.getCurrentStorage();
        // currentStorage[itemText] = false;

        currentStorage[Date.now()] = {
            value: itemText,
            isChecked: false
        };

        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    editItem(oldValue, newValue){
        const currentStorage = this.getCurrentStorage();

        for(let item of Object.values(currentStorage)){
            if(item.value == oldValue)
                item.value = newValue;
        }

        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    onItemCheck(itemKey, isChecked){ //Найти по тексту и поставить значение isChecked
        const currentStorage = this.getCurrentStorage();

        for(let item of Object.values(currentStorage)){
            if(item.value == itemKey)
                item.isChecked = isChecked;
        }

        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    removeItem(itemKey){
        const currentStorage = this.getCurrentStorage();

        for(let item of Object.values(currentStorage)){ // Дупликация кода, переделать в ф-ю
            if(item.value == itemKey){
                const itemIndex = Object.values(currentStorage).indexOf(item);
                const itemName = Object.keys(currentStorage)[itemIndex];

                delete currentStorage[itemName];
            }
        }

        delete currentStorage[itemKey];
        localStorage.setItem('task-list', JSON.stringify(currentStorage, null, 2));
    }

    getCurrentStorage(){
        return JSON.parse(localStorage.getItem('task-list'));
    }

    getItem(key, storage){

    }
}