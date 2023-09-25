class MyUbi {
    constructor(){
        if(ManagerConstants.setMyUbiInit == false){
           this.#Init();
            ManagerConstants.setMyUbiInit = true;
        }
    };

    #Init(){
        const self = this;
        document.getElementById("BTN-myUbi").innerHTML = this.ComponentHtml();
        
        $("#MyUbi").on("click", function(){
            if(controller.marker ){
                controller.map.setView(controller.marker.getLatLng(), 15);
            }
        })
        return this;
    };
    ComponentHtml(){
        return `
        <img id="MyUbi" src="./images/icons/map-arrow.svg" alt="icon arrow ubication map provider" />
        `
    }

}