class StatusMap {

    constructor(){
        if(ManagerConstants.setStatusMapInit == false){
            this.#Init();
            ManagerConstants.setStatusMapInit = true;
        }
    };

    #Init(){
        document.getElementById("StatusMap").innerHTML = this.ComponentHtml();
        this.InitTemp();
        this.IniteIconTemp();
        return this;
    };
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