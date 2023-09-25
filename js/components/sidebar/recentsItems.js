class RecentsItems {

    constructor(){
        if(ManagerConstants.setRecentsItemsInit == false){
            //this.#Init();
            ManagerConstants.setRecentsItemsInit = true;
        }
    };

    #Init(){
        return this;
    };

}