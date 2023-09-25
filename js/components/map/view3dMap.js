class View3dMaps {

    constructor(){
        if(ManagerConstants.setView3dMapsInit == false){
            this.#Init();
            ManagerConstants.setView3dMapsInit = true;
        }
    };

    #Init(){
        document.getElementById("View3dMaps").innerHTML = this.componentHtml();
        return this;
    };
    componentHtml(){
        return `
        <img id="IconView3dMaps" src="./images/icons/binoculars.svg" alt="icon binoculars svg" />
        `;
    }

}