class RecentsItems {

    constructor(){
        if(ManagerConstants.setRecentsItemsInit == false){
            //this.#Init();
            ManagerConstants.setRecentsItemsInit = true;
        }
    };

    #Init(){

        return this;
    };
    GenerateRecentSerch(location){
        return `
        <div class="recentSearch-item" id="RecentSearch_${location}">
            <div class="recentSearch-item-marquer">
                <div class="recentSearch-item-icon"></div>
            </div>
            <div class="recentSearch-item-caption">       
                <div class="recentSearch-item-text" id="locationSelectedRecentSearch_${location}"> ${location}</div>   
                <div class="recentSearch-item-cntr-interactions"> 
                        <div class="recentSearch-item-Favorites" id="FavItem_${location}" ></div>
                </div>  
            </div>  
        </div>`
    };

    addRecentSearch(location, lat, lng){       
        let _me = this;
        let mymap = controller.map; 

        let ContainerRecentSearching = document.getElementById("recentsItems");  
        let recentItems = ContainerRecentSearching.getElementsByClassName("recentSearch-item");            

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

        let favStatus = true;
        // Agrega el evento click para cambiar la imagen de fondo y añadir al contenedor
        let favItem = $(`#FavItem_${location}`);
        favItem.on('click', function () {
            if(favStatus){
                favItem.css("background-image", 'url(../images/InertHeart.svg)'); 
                controller.sidebar.favItems.addToContainerFav(location, lat, lng);
                favStatus = false;
            }else{
                controller.sidebar.favItems.deletteContainerFav(location);
                favStatus = true;
            }
        });

    };


}