class MarkerMyUbi {

    constructor(){
        if(ManagerConstants.setMarkerMyUbiInit == false){
            //this.#Init();
            ManagerConstants.setMarkerMyUbiInit = true;
        }
    };

    #Init(){
        return this;
    };

}