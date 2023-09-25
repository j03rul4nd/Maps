class MapController {
    isVisible = false;
    changerMap;
    view3dMaps;
    statusMap;
    myUbi;
    map;

    constructor(map){
        if(ManagerConstants.setMapControllerInit == false){
            this.#Init(map);
            ManagerConstants.setMapControllerInit = true;
        }
    };
    #Init(map){
        document.getElementById("controller").innerHTML = this.componentHtml();
        this.map = map;
        this.changerMap = new ChangeMap(this.map);
        this.view3dMaps =  new View3dMaps();
        this.statusMap =  new StatusMap();
        this.myUbi =  new MyUbi();
    };
    componentHtml(){
        return ` 
            <div id="cntr-map-main"> 
                <div id="cntr-map-sec"> 
                   <div id="ChangeMap"></div>
                   <div id="BTN-myUbi"></div>
                </div>            
            </div>        
 
            <div id="cntr-map-bottom">
                <div id="View3dMaps"></div>
                <div id="StatusMap"></div>
             </div>
        `;
    };

};