class UIControllers {
    mapController;
    sidebar;
    marker;
    map;
    StatusView3dMap = false;
    StatusMapDrag = true;
    constructor(){
        if(ManagerConstants.setUIControllersInit == false){
            this.#Init();
            ManagerConstants.setUIControllersInit = true;
        }
    };
    #Init(){
        document.getElementById("main").innerHTML = this.#html();
        this.#mapGenerator();
        this.mapController = new MapController(this.map);
        this.sidebar = new Sidebar();

        this.#listennersMap();
        
    };
    #html(){
        return `
            <div id="map">
                <div id="conatin">
                    <!-- controller map -->
                    <div id="controller" ></div>

                    <!-- container sidebar-->
                    <div id="sidebar" ></div>
                </div>
                <div id="modal-changerMap"></div>
                <div id="modal-View3dMaps"></div>
            </div>
        `;
    };
    GetMyLocation(getContextPopUp){
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
        
            // Centra el mapa en las coordenadas del usuario y ajusta el zoom
            this.map.setView([lat, lng], 15); // Puedes ajustar el valor de zoom según tus preferencias
        
            // Establece las nuevas coordenadas del marcador y agrégalo al mapa
            this.marker.setLatLng([lat, lng]).addTo(this.map);
        
            if(getContextPopUp){
                // Puedes agregar un mensaje emergente al marcador si lo deseas
                this.marker.bindPopup(getContextPopUp).openPopup();
            }
        });
    };
    #mapGenerator(){
        L.DomUtil.disableTextSelection();        
        this.map = L.map('map', {attributionControl: false}).setView([0, 0], 13); // Crea un mapa con una vista inicial en coordenadas [0, 0] y un zoom de 13.
        
        // Agrega una capa de mapa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);


        var greenIcon = L.icon({
            iconUrl: './images/icons/markerUbi.svg',
        
            iconSize:     [48, 48], // size of the icon
            iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
           
            popupAnchor:  [0, -7] // point from which the popup should open relative to the iconAnchor
        });
        
        
        // Declara el marcador, pero no lo añade al mapa todavía
        this.marker = L.marker([51.5, -0.09], {icon: greenIcon});
        
        //marker location user
        let msgPopUp = '¡Tu ubicación actual!';
        this.GetMyLocation(msgPopUp);

       // this.blockMapp();
    
       
    };

    #blockMapp(){
        // Función para deshabilitar el dragging y el scrollWheelZoom
        function disableMapInteraction() {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
        }

        // Función para habilitar el dragging y el scrollWheelZoom
        function enableMapInteraction() {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
        }

        // Agregar event listeners a los elementos con un bucle
        const elementIds = [
            "sidebar",
        ];

        elementIds.forEach(function (elementId) {
            const element = document.getElementById(elementId);
            element.addEventListener('mouseover', disableMapInteraction);
            element.addEventListener('mouseout', enableMapInteraction);
        });

    };

    #listennersMap(){
        //enabled map
        let _me = this;
        $("#map").on("touchstart touchmove mousedown", function(){
            _me.StatusDragginMap(true);
        })
    }

    StatusDragginMap(status){
        if(typeof status != "undefined"){
            let mode = status;
            if(typeof status == "string"){
                mode = status.toLowerCase() !== 'true';
            }
            let view3dMap = this.StatusView3dMap;

            if(mode == true && view3dMap == false){
                this.enbledMapDraging();
            }else if(mode == false){
                this.disabledMapDraging();
            }
        }
    };
    enbledMapDraging(){
        if(this.StatusMapDrag != true){
            this.map.dragging.enable();
            this.StatusMapDrag = true;
            console.log("drag enabled map");
        }
    };
    disabledMapDraging(){
        if(this.StatusMapDrag){
            this.map.dragging.disable();
            this.StatusMapDrag = false;
            console.log("drag disabled map");
        }
    };
}
