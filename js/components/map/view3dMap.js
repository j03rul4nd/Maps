class View3dMaps {
    isVisible = true;
    id = "View3dMaps";
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
    Show(){
        this.isVisible = true;
        $("#"+this.id).css("display","flex");
    }
    Hide(){
        this.isVisible = false;
        $("#"+this.id).css("display", "none");
    }
    componentHtml(){
        return `
        <img id="IconView3dMaps" src="./images/icons/binoculars.svg" alt="icon binoculars svg" />
        `;
    }

}