class ChangeMap {
    isVisible = false;
    map;
    constructor(map){
        if(ManagerConstants.setChangeMapInit == false){
            this.map = map;
            this.#Init();
            ManagerConstants.setChangeMapInit = true;
        }
    };
    #Init(){
        let _me = this;
        document.getElementById("ChangeMap").innerHTML = this.#ComponentControllerHtml();
        document.getElementById("modal-changerMap").innerHTML = this.#ComponentModalHtml();
        
        _me.InitController();
        _me.InitModal();
       
    };
    InitController(){
        let _me = this;
        $("#ChangeMap").on("touchstart", function(){
            _me.statusModal(_me.isVisible);
        });
    };
    InitModal(){
        let _me = this;
        $("#header-close-btn").on("click", function() {
            _me.hide();
        });

        // change map provider
        $("#applemap").on("click", function(){
            _me.changeMapProvider("OpenStreetMap");
        })
        $("#googlemap").on("click", function(){
            _me.changeMapProvider("GoogleMap");
        })
        $("#googleSatelital").on("click", function(){
            _me.changeMapProvider("GoogleSatellite");
        })
        $("#Transportemap").on("click", function(){
            _me.changeMapProvider("Wikimapia");
        })

        //default map provider
        _me.changeMapProvider("OpenStreetMap");

    };
    #ComponentControllerHtml(){
        return `
        <img id="IconChangeMap" src="./images/icons/map.svg" alt="icon change map provider" />
        `
    };
    #ComponentModalHtml(){
        return `
      
            <div id="header-modal-changerMap">
                <div id="header-titleMapChanger">Selecciona un mapa</div>
                <div id="header-close-btn">
                    <div id="header-iconCloseBtn"></div>
                </div>
            </div>
            <div id="ctnr-modal-ChangerMap">
                <div class="modal-CardMap" id="applemap">
                    <div class="modal-imgCardMap" id="img-applemap" ></div>
                    <div class="modal-bottomCardMap" >
                        <div class="modal-titleCardMap" id="txt-applemap">Apple Map</div>
                    </div>
                </div>
                <div class="modal-CardMap" id="googlemap">
                    <div class="modal-imgCardMap" id="img-googlemap" ></div>
                    <div class="modal-bottomCardMap" >
                        <div class="modal-titleCardMap" id="txt-googlemap">Google Map</div>
                    </div>
                </div>
                <div class="modal-CardMap" id="googleSatelital">
                    <div class="modal-imgCardMap" id="img-googleSatelital" ></div>
                    <div class="modal-bottomCardMap" >
                        <div class="modal-titleCardMap" id="txt-googleSatelital">Satélite</div>
                    </div>
                </div>
                <div class="modal-CardMap" id="Transportemap">
                    <div class="modal-imgCardMap" id="img-Transportemap" ></div>
                    <div class="modal-bottomCardMap" >
                        <div class="modal-titleCardMap" id="txt-Transportemap">Transporte público</div>
                    </div>
                </div>
            </div>
       
        `
    };
    statusModal(isVisible){
        if(isVisible){
            this.hide();
        }else{
            this.show();
        }
        let s = this.isVisible;
        console.log("estado actual del popup "+s);
    };
    hide(){
        this.isVisible = false;
        controller.mapController.isVisible = this.isVisible;
        $("#modal-changerMap").css("display", "none");
       
    };
    show(){
        this.isVisible = true;
        controller.mapController.isVisible = this.isVisible;
        $("#modal-changerMap").css("display", "flex");
        
    };
    changeMapProvider(mapProvider) {
        $(".modal-CardMap").removeClass("modal-selected");
        // Elimina la capa de mapa actual
        this.map.eachLayer((layer) => {
            this.map.removeLayer(layer);
        });

        switch (mapProvider) {
            case "GoogleMap":
                this.#googlestreets.addTo(this.map);               
                 $("#googlemap").addClass("modal-selected");
                break;
            case "OpenStreetMap":
                this.#openstreetmap.addTo(this.map);
                $("#applemap").addClass("modal-selected");
                break;
            case "GoogleHybrid":
                this.#googlehybrid.addTo(this.map);
                break;
            case "GoogleSatellite":
                this.#googlesat.addTo(this.map);
                $("#googleSatelital").addClass("modal-selected");
                break;
            case "GoogleTerrain":
                this.#googleterrain.addTo(this.map);
                break;
            case "BingMap":
                this.#bingmap.addTo(this.map);
                break;
            case "BingHybridMap":
                this.#binghybridmap.addTo(this.map);
                break;
            case "BingSatelliteMap":
                this.#bingsatellitemap.addTo(this.map);
                break;
            case "Wikimapia":
                this.#wikimapia.addTo(this.map);
                $("#Transportemap").addClass("modal-selected");
                break;
        }
    }
    // openstreetmap
    #openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        name: 'OpenStreetMap',
        isMapProvider: true,
        maxZoom: 19,
        noWrap: true
    });
    // googlemaps streets
    #googlestreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        name: 'GoogleStreets',
        isMapProvider: true,
        maxZoom: 24,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        noWrap: true
    });
    // googlemaps Hybrid
    #googlehybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        name: 'GoogleHybrid',
        isMapProvider: true,
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        noWrap: true
    });
    // googlemaps Satellite
    #googlesat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        name: 'GoogleSat',
        isMapProvider: true,
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        noWrap: true
    });
    // googlemaps Terrain
    #googleterrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        name: 'GoogleTerrain',
        isMapProvider: true,
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        noWrap: true
    });
    // BingMap
    #bingmap = L.tileLayer('http://ecn.t{s}.tiles.virtualearth.net/tiles/r{hash}.png?g=875&mkt=en-us&lbl=l1&stl=h&shading=hill&n=z', {
        name: 'BingMap',
        // Fix L.Util.template to use this
        hash: function (data) {
            var quadKey = '';
            for (var i = data.z; i > 0; i--) {
                var digit = '0';
                var mask = 1 << (i - 1);
                if ((data.x & mask) != 0) {
                    digit++;
                }
                if ((data.y & mask) != 0) {
                    digit++; digit++;
                }
                quadKey += digit;
            } //for i
            return quadKey;
        },
        subdomains: ['1', '2', '3', '4', '5', '6', '7'],
        isMapProvider: true,
        minZoom: 1,
        maxZoom: 20,
        noWrap: true
    });
    // BingHybridMap
    #binghybridmap = L.tileLayer('http://ecn.t{s}.tiles.virtualearth.net/tiles/h{hash}.jpeg?g=875&mkt=en-us&n=z', {
        name: 'BingHybridMap',
        // Fix L.Util.template to use this
        hash: function (data) {
            var quadKey = '';
            for (var i = data.z; i > 0; i--) {
                var digit = '0';
                var mask = 1 << (i - 1);
                if ((data.x & mask) != 0) {
                    digit++;
                }
                if ((data.y & mask) != 0) {
                    digit++; digit++;
                }
                quadKey += digit;
            } //for i
            return quadKey;
        },
        subdomains: ['1', '2', '3', '4', '5', '6', '7'],
        isMapProvider: true,
        minZoom: 1,
        maxZoom: 19,
        noWrap: true
    });
    //BingSatelliteMap
    #bingsatellitemap = L.tileLayer('http://ecn.t{s}.tiles.virtualearth.net/tiles/a{hash}.jpeg?g=875&mkt=en-us&n=z', {
        name: 'BingSatelliteMap',
        // Fix L.Util.template to use this
        hash: function (data) {
            var quadKey = '';
            for (var i = data.z; i > 0; i--) {
                var digit = '0';
                var mask = 1 << (i - 1);
                if ((data.x & mask) != 0) {
                    digit++;
                }
                if ((data.y & mask) != 0) {
                    digit++; digit++;
                }
                quadKey += digit;
            } //for i
            return quadKey;
        },
        subdomains: ['1', '2', '3', '4', '5', '6', '7'],
        isMapProvider: true,
        minZoom: 1,
        maxZoom: 19,
        noWrap: true
    });
    // wikimapia
    #wikimapia = L.tileLayer('http://{s}{hash}.wikimapia.org/?x={x}&y={y}&zoom={z}&r=7071412&type=&lng=1', {
        name: 'wikimapia',
        // Fix L.Util.template to use this
        hash: function (data) {
            return data.x % 4 + (data.y % 4) * 4;
        },
        subdomains: 'i',
        maxZoom: 22,
        isMapProvider: true,
        noWrap: true
    });

}