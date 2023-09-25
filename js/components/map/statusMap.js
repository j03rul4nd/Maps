class StatusMap {
    isVisible = true;
    id = "StatusMap";
    constructor(){
        if(ManagerConstants.setStatusMapInit == false){
            this.#Init();
            ManagerConstants.setStatusMapInit = true;
        }
    };

    #Init(){
        document.getElementById(this.id).innerHTML = this.ComponentHtml();
        this.InitTemp();
        this.IniteIconTemp();
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
    ComponentHtml(){
        return `
        <div id="IconTemp"></div>
        <div id="temp"></div>
        `
    }
    InitTemp(){
        $("#temp").html("26 c*");
    }
    IniteIconTemp(){
        let urlTemp = "./images/icons/moon.svg";
        $("#IconTemp").css("background-image", "url(" + urlTemp+")");
    }
}