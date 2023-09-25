class MyTravels {

    constructor(){
        if(ManagerConstants.setMyTravelsInit == false){
            //this.#Init();
            ManagerConstants.setMyTravelsInit = true;
        }
    };

    #Init(){
        return this;
    };

}