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

        $("#close").on("click", function(){
            _me.inputSearch.value = ""; // Limpiar el texto del input
            _me.closeIcon.style.display = "none"; 
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

};


