module.exports = class List {
    constructor() {
        this.list = {};
    }

    get length() {
        return Object.keys(this.list).length;
    }

    add(key, value){
        if (!this.isKeyExists(key)) {
            this.list[key] = value;
        } else {
            console.log("Failed to add to list.");
        }
    }

    remove(key){
        if (this.isKeyExists(key)){
            delete this.list[key];
        }
        else {
            console.log("Failed to remove from list.");
        }
    }

    isKeyExists(key){
        return this.list[key] !== undefined;
    }

    getAll(){
        const valuesStates = {};
        for (let key in this.list) {
            const value = this.list[key];
            valuesStates[key] = value.getState();
        }

        return valuesStates;
    }
};