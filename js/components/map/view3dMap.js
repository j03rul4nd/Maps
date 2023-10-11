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
        document.getElementById(this.id).innerHTML = this.#componentHtml();
        document.getElementById(this.idModal).innerHTML = this.#ModalcomponentHtml();
        this.#setListeners();
        this.#generateMap3d(); // generate
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
    #componentHtml(){
        return `
        <img id="IconView3dMaps" src="./images/icons/binoculars.svg" alt="icon binoculars svg" draggable="false"/>
        `;
    };
    #ModalcomponentHtml(){
        return `
        <div id="bg-ModalView3dMaps">        
            <div id="Map-ModalView3dMaps">
                <div id="maperlab"></div>
            </div>
            <div id="ModalView3dMaps">
                    <div id="Close-View3dMaps"></div>
            </div>
        </div>
        `
    }
    #setListeners(){
        let _me = this;
        $("#"+this.id).on("click", function(){
            _me.StatusModal(true); 
        })

        //listeners modal
        $("#Close-View3dMaps").on("click", function(){
            _me.StatusModal(false); 
        })


        _me.#blockingMap();

    };
    #generateMap3d(){
        //maperlab
        let key = config.KeyMap;//get_your_own_OpIi9ZULNHzrESv6T2vL

        function obtenerUbicacion() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitud = position.coords.latitude;
                    const longitud = position.coords.longitude;
        
                    // Crea el mapa y utiliza la ubicación del usuario como centro
                    var mapl3d = new maplibregl.Map({
                        container: 'maperlab',
                        style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
                        center: [longitud, latitud], // Usamos la ubicación del usuario como centro
                        zoom: 17,
                        bearing: -12,
                        pitch: 60,
                        interactive: true
                    });

                    // pixels the map pans when the up or down arrow is clicked
                    var deltaDistance = 100;

                    // degrees the map rotates when the left or right arrow is clicked
                    var deltaDegrees = 25;

                    function easing(t) {
                        return t * (2 - t);
                    }

                    mapl3d.on('load', () => {
                        mapl3d.getCanvas().focus();
                        mapl3d.touchPitch.enable();

                        mapl3d.getCanvas().addEventListener( 'keydown',
                            (e) => {
                                e.preventDefault();
                                if (e.which === 38) {
                                    // up
                                    mapl3d.panBy([0, -deltaDistance], {
                                        easing
                                    });
                                } else if (e.which === 40) {
                                    // down
                                    mapl3d.panBy([0, deltaDistance], {
                                        easing
                                    });
                                } else if (e.which === 37) {
                                    // left
                                    mapl3d.easeTo({
                                        bearing: mapl3d.getBearing() - deltaDegrees,
                                        easing
                                    });
                                } else if (e.which === 39) {
                                    // right
                                    mapl3d.easeTo({
                                        bearing: mapl3d.getBearing() + deltaDegrees,
                                        easing
                                    });
                                }
                            },
                            true
                        );
                    });

                }, function(error) {
                    console.error("Error al obtener la ubicación del usuario: ", error);
                });
            } else {
                console.error("Geolocalización no está disponible en este navegador.");
            }
        }
        
        // Llama a la función para obtener la ubicación del usuario
        obtenerUbicacion();

    };
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
        controller.StatusView3dMap = false;
    };
    ShowModal(){
        $("#modal-View3dMaps").css("display", "flex");
       
        controller.StatusView3dMap = true;
    };
    #blockingMap(){
        $("#"+this.idModal).on("touchstart touchmove  mouseenter mouseover drag", function(){
            controller.StatusDragginMap(false);
        })

    };

}