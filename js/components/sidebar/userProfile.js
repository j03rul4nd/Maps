class UserProfile {

    constructor(){
        if(ManagerConstants.setUserProfileInit == false){
           // this.#Init();
            ManagerConstants.setUserProfileInit = true;
        }
    };

    #Init(){
        return this;
    };

}