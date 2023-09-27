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
    #Init(){
        // Inicializa el contenido HTML del componente
        document.getElementById(this.id).innerHTML = this.#ComponentHtml();
        this.#InitTemp();
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
    #InitTemp(){
        $("#temp").html("26 C*");
    }
   /**
   * Inicializa el icono de temperatura en el componente.
   */
    #IniteIconTemp(){
        let urlTemp = "./images/icons/moon.svg";
        $("#IconTemp").css("background-image", "url(" + urlTemp+")");
    }
}