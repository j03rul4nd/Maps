class UIControllers {
    mapController;
    sidebar;
    marker;
    map;
    constructor(){
        if(ManagerConstants.setUIControllersInit == false){
            this.#Init();
            ManagerConstants.setUIControllersInit = true;
        }
    };
    #Init(){
        document.getElementById("main").innerHTML = this.html();
        this.mapGenerator();
        this.mapController = new MapController(this.map);
        this.sidebar = new Sidebar();
    };
    html(){
        return `
            <div id="map">
                <div id="conatin">
                    <!-- controller map -->
                    <div id="controller" ></div>

                    <!-- container sidebar-->
                    <div id="sidebar" ></div>
                </div>
                <div id="modal-changerMap"></div>
            </div>
        `;
    };
    mapGenerator(){
        L.DomUtil.disableTextSelection();        
        this.map = L.map('map', {attributionControl: false}).setView([0, 0], 13); // Crea un mapa con una vista inicial en coordenadas [0, 0] y un zoom de 13.
        
        // Agrega una capa de mapa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
        
        // Declara el marcador, pero no lo añade al mapa todavía
        this.marker = L.marker([0, 0]);
        
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
        
            // Centra el mapa en las coordenadas del usuario y ajusta el zoom
            this.map.setView([lat, lng], 15); // Puedes ajustar el valor de zoom según tus preferencias
        
            // Establece las nuevas coordenadas del marcador y agrégalo al mapa
            this.marker.setLatLng([lat, lng]).addTo(this.map);
        
            // Puedes agregar un mensaje emergente al marcador si lo deseas
            this.marker.bindPopup('¡Tu ubicación actual!').openPopup();
        });

       // this.blockMapp();
    };

    blockMapp(){
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
}
