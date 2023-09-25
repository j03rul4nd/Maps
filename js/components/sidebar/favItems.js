class FavItems {

    constructor(){
        if(ManagerConstants.setFavItemsInit == false){
           // this.#Init();
            ManagerConstants.setFavItemsInit = true;
        }
    };

    #Init(){

        return this;
    };

}