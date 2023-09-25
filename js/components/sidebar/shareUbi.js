class ShareUbi {

    constructor(){
        if(ManagerConstants.setShareUbiInit == false){
           // this.#Init();
            ManagerConstants.setShareUbiInit = true;
        }
    };

    #Init(){
        return this;
    };

}