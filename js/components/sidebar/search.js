class Search {
    isVisible = false;
    inputSearch;
    closeIcon;
    constructor(){
        if(ManagerConstants.setSearchInit == false){
            this.#Init();
            ManagerConstants.setSearchInit = true;
        }
    };
    #Init(){
        document.getElementById("search").innerHTML = this.componentHtml();

        this.inputSearch = document.getElementById("inputSearch");
        this.closeIcon = document.getElementById("close");

        let _me = this;
        $("#inputSearch").on("input", function(){
            _me.searching();
        });
        $("#inputSearch").on("keydown", function(event){
            if (event.which === 13){_me.getLoaction();}
        });
        $("#IconSearch").on("click", function(){
            _me.getLoaction();
        });
        $("#close").on("click", function(){
            _me.inputSearch.value = ""; // Limpiar el texto del input
            _me.closeIcon.style.display = "none"; 
        });
        $("#search").on("click", function(){
            let input = document.getElementById('inputSearch');
            input.focus();
            controller.StatusDragginMap(false);
        });

        return this
    };
    searching(){
        //fetch and databound search = () =>
       
        //btn close
        if (this.inputSearch.value.length > 0) {
            this.closeIcon.style.display = "block";
        } else {
            this.closeIcon.style.display = "none"; 
        }
        return this
    };
    componentHtml(){
        return `
            <img id="IconSearch" src="./images/icons/search.svg" alt="icon search svg" />
            <input type="text" placeholder="Buscar en Mapas" id="inputSearch">
            <img id="close" src="./images/icons/x-close.svg" alt="icon close search svg" />
        `;
    };
    getLoaction() {
        let _me = this;
        let mymap = controller.map; 
      //var localidad = "Barcelona"; document.getElementById('localidadInput').value;
      var location =  document.getElementById('inputSearch').value;
      
      let API_KEY = config.SearchKeyMap;
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            var lat = data.results[0].geometry.lat;
            var lng = data.results[0].geometry.lng;
            mymap.setView([lat, lng], 13);
            L.marker([lat, lng]).addTo(mymap)
              .bindPopup(`<b>${location}</b>`).openPopup();

            _me.addRecentSearch(location, lat, lng );
          } else {
            alert('Localidad no encontrada');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    GenerateRecentSerch(location){
        return `
        <div class="recentSearch-item" id="RecentSearch_${location}">
            <div class="recentSearch-item-marquer">
                <div class="recentSearch-item-icon"></div>
            </div>
            <div class="recentSearch-item-caption">       
                <div class="recentSearch-item-text" id="locationSelectedRecentSearch_${location}"> ${location}</div>   
                <div class="recentSearch-item-cntr-interactions"> 
                        <div class="recentSearch-item-Favorites" id="FavItem_${location}" >o</div>
                </div>  
            </div>  
        </div>`
    };

    addRecentSearch(location, lat, lng){       
        let _me = this;
        let mymap = controller.map; 

        let ContainerRecentSearching = document.getElementById("recentsItems");  
        let recentItems = ContainerRecentSearching.getElementsByClassName("recentSearch-item");     
        
        // Verificar si la ubicación ya existe en la lista
        for (let i = 0; i < recentItems.length; i++) {
            const item = recentItems[i].querySelector('.recentSearch-item-text');
            if (item.textContent === location) {
            // Si la ubicación ya existe, moverla al principio de la lista y actualizar el mapa
            ContainerRecentSearching.removeChild(recentItems[i]);
            ContainerRecentSearching.insertAdjacentHTML("afterbegin", _me.GenerateRecentSearch(location));
            mymap.setView([lat, lng], 13);
            return;
            }
        }

        // Si ya hay tres ubicaciones recientes, elimina la última
        if (recentItems.length >= 3) {
            ContainerRecentSearching.removeChild(recentItems[recentItems.length - 1]);
        }

        // Agrega la nueva ubicación reciente en la parte superior
        ContainerRecentSearching.insertAdjacentHTML("afterbegin", _me.GenerateRecentSerch(location));

        // Agrega el evento click para cambiar la vista del mapa
        document.querySelector('.recentSearch-item').addEventListener('click', function () {
            mymap.setView([lat, lng], 13);
        });

    };
};


