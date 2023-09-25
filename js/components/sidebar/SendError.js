class SendError {

    constructor(){
        if(ManagerConstants.setSendErrorInit == false){
           // this.#Init();
            ManagerConstants.setSendErrorInit = true;
        }
    };

    #Init(){
        return this;
    };

}