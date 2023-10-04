class View3dMaps {
    isVisible = true;
    id = "View3dMaps";
    idModal = "modal-View3dMaps"
    constructor(){
        if(ManagerConstants.setView3dMapsInit == false){
            this.#Init();
            ManagerConstants.setView3dMapsInit = true;
        }
    };

    #Init(){
        document.getElementById(this.id).innerHTML = this.componentHtml();
        document.getElementById(this.idModal).innerHTML = this.ModalcomponentHtml();
        this.setListeners();
        return this;
    };
    Show(){
        this.isVisible = true;
        $("#"+this.id).css("display","flex");
    };
    Hide(){
        this.isVisible = false;
        $("#"+this.id).css("display", "none");
    };
    componentHtml(){
        return `
        <img id="IconView3dMaps" src="./images/icons/binoculars.svg" alt="icon binoculars svg" />
        `;
    };
    ModalcomponentHtml(){
        return `
        <div id="bg-ModalView3dMaps">        
            <div id="Map-ModalView3dMaps"></div>
            <div id="ModalView3dMaps">
                    <div id="Close-View3dMaps"></div>
            </div>
        </div>
        `
    }
    setListeners(){
        let _me = this;
        $("#"+this.id).on("click", function(){
            _me.StatusModal(true); 
        })

        //listeners modal
        $("#Close-View3dMaps").on("click", function(){
            _me.StatusModal(false); 
        })
    }
    StatusModal(status){
        if(typeof status != "undefined"){
            let mode = status;
            if(typeof status == "string"){
                mode = status.toLowerCase() !== 'true';
            }
            if(mode){
                this.ShowModal();
            }else{
                this.HideModal();
            }
        }
    };
    HideModal(){
        $("#modal-View3dMaps").css("display", "none");
    };
    ShowModal(){
        $("#modal-View3dMaps").css("display", "flex");
    };

}