class FavItems {

    constructor(){
        if(ManagerConstants.setFavItemsInit == false){
           // this.#Init();
            ManagerConstants.setFavItemsInit = true;
        }
    };

    #Init(){

        return this;
    };
    GeneratefavItems(location){
        return `
        <div class="favItems-item" id="favItems_${location}">
            <div class="favItems-item-marquer">
                <div class="favItems-item-icon"></div>
            </div>
            <div class="favItems-item-caption">       
                <div class="favItems-item-text" id="locationSelectedfavItems_${location}"> ${location}</div>   
                <div class="favItems-item-cntr-interactions"> 
                        <div class="favItems-item-Favorites" id="favItems-FavItem_${location}" ></div>
                </div>  
            </div>  
        </div>`
    };
    addToContainerFav(location, lat, lng){
        let _me = this;
        let mymap = controller.map; 
        let ContainerFav = document.getElementById("favItems");  

        // Agrega la nueva ubicación reciente en la parte superior
        ContainerFav.insertAdjacentHTML("afterbegin", _me.GeneratefavItems(location));

        // Agrega el evento click para cambiar la vista del mapa
        document.querySelector('.favItems-item').addEventListener('click', function () {
            mymap.setView([lat, lng], 13);
        });

        // Agrega el evento click para cambiar la imagen de fondo y añadir al contenedor
        let favItem = $(`#favItems-FavItem_${location}`);
        
        favItem.on('click', function () {
            _me.deletteContainerFav(location);
        });
    };
    deletteContainerFav(location){
        $(`#favItems_${location}`).remove();
        $(`#FavItem_${location}`).css("background-image", 'url(../images/OutHeart.svg)'); 
    };

}