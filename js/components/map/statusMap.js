/**
 * Clase StatusMap
 *
 * Esta clase representa un componente de mapa de estado.
 * Proporciona métodos para mostrar y ocultar el componente,
 * así como funciones para inicializar y actualizar su contenido.
 */
class StatusMap {
   /**
    * @property {boolean} isVisible - Indica si el componente es visible.
    */
    isVisible = true;
   /**
    * @property {string} id - El ID único del componente.
    */
    id = "StatusMap";
   /**
    * Constructor de la clase StatusMap.
    * Inicializa el componente si aún no se ha inicializado.
    */
    constructor(){
        if(ManagerConstants.setStatusMapInit == false){
            this.#Init();
            ManagerConstants.setStatusMapInit = true;
        }
    };
   /**
   * Inicializa el componente y su contenido.
   * @private
   * @returns {StatusMap} - La instancia de la clase.
   */
   async  #Init(){
        // Inicializa el contenido HTML del componente
        document.getElementById(this.id).innerHTML = this.#ComponentHtml();
        await this.#InitTemp();
        this.#IniteIconTemp();
        return this;
    };
   /**
   * Muestra el componente.
   */
    Show(){
        this.isVisible = true;
        $("#"+this.id).css("display","flex");
    }
   /**
   * Oculta el componente.
   */
    Hide(){
        this.isVisible = false;
        $("#"+this.id).css("display", "none");
    }
   /**
   * Genera el contenido HTML del componente.
   * @returns {string} - El HTML del componente.
   */
    #ComponentHtml(){
        return `
        <div id="IconTemp"></div>
        <div id="temp"></div>
        `
    }
   /**
   * Inicializa el elemento de temperatura en el componente.
   */
   async #InitTemp(){
        try {
            let temperature = await this.#GetTemp();
            $("#temp").html(`${temperature}°C`);
        } catch (error) {
            console.error('Error al obtener los datos de temperatura:', error);
            $("#temp").html(`26°C`);
        }
    }
   /**
   * Obtenemos la temperatura del usuario.
   */
    async #GetTemp(){
        return new Promise(async (resolve, reject) => {
            try {
                let position = await new Promise((geoResolve, geoReject) => {
                    navigator.geolocation.getCurrentPosition(geoResolve, geoReject);
                });

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

                let response = await fetch(apiUrl);
                let data = await response.json();

                // Aquí obtenemos la temperatura actual desde el JSON
                let temperaturaJSON = data.hourly.temperature_2m;
                
                // Divide la cadena en un array de temperaturas
                let temperaturasArray = temperaturaJSON.split(",");
                
                // La temperatura actual es la primera en la lista (índice 0)
                let temperaturaActual = parseFloat(temperaturasArray[0]);

                resolve(temperaturaActual);
            } catch (error) {
                console.error('Error al obtener los datos de temperatura:', error);
                reject("Error");
            }
        });
    }
   /**
   * Inicializa el icono de temperatura en el componente.
   */
    #IniteIconTemp(){

        let urlTemp = "./images/icons/moon.svg";

        const now = new Date();
        const hour = now.getHours() + now.getTimezoneOffset() / 60;

        // Si es de día
        if (hour >= 6 && hour <= 18) {
            urlTemp = "./images/icons/sun.svg";
        } else {
            urlTemp = "./images/icons/moon.svg";
        }

        $("#IconTemp").css("background-image", "url(" + urlTemp+")");
    }
}