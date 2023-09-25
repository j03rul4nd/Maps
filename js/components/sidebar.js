class Sidebar {
    favItems;
    markerMyUbi;
    myTravels;
    recentsItems;
    search;
    sendError;
    shareUbi;
    userProfile;
    splitter;

    isVisible = false;

    contentId = "sidebar-content";

    constructor(){
        if(ManagerConstants.setSidebarInit == false){
            this.#Init();
            ManagerConstants.setSidebarInit = true;
        }
    };

    #Init(){
        document.getElementById("sidebar").innerHTML = this.#componentHtml();

        this.search = new Search();
        this.userProfile = new UserProfile();
        this.recentsItems = new RecentsItems();
        this.favItems = new FavItems();
        this.myTravels = new MyTravels();
        this.shareUbi = new ShareUbi();
        this.markerMyUbi = new MarkerMyUbi();
        this.sendError = new SendError();
        this.splitter = new Splitter();

       // this.blockMapp();

        // Agregar eventos de arrastre al sidebar
        this.sidebar = document.getElementById("sidebar");
        this.isDragging = false;
        this.startPosY = 0;
        this.currentTranslateY = 0;


        this.sidebar.addEventListener("all", this.startDrag.bind(this));

        // this.sidebar.addEventListener("mousedown", this.startDrag.bind(this));
        // document.addEventListener("mousemove", this.drag.bind(this));
        // document.addEventListener("mouseup", this.stopDrag.bind(this));

        // this.sidebar.addEventListener("touchstart", this.startDrag.bind(this));
        // document.addEventListener("touchmove", this.drag.bind(this));
        // document.addEventListener("touchend", this.stopDrag.bind(this));

        // Agregar eventos para mostrar/ocultar el sidebar
        const sidebarToggle = document.getElementById("splitter-sidebar");
        sidebarToggle.addEventListener("click", this.toggleSidebar.bind(this));

 
        return this;
    };
    #componentHtml(){
        return  ` 
                <div id="${this.contentId}">
                 
                    <!-- header -->
                    <div id="head-sidebar">

                        <!-- splitter -->
                        <div id="cntr-splitter-sidebar">
                            <div id="splitter-sidebar"></div>
                        </div>

                        <!-- search and user -->
                        <div id="cntr-SearchUser">

                            <!-- search -->
                            <div id="search"></div> 

                            <!-- user profile -->
                            <div id="userProfile"></div>

                        </div>

                    </div>

                    <!-- content -->
                    <div id="cntr-sidebar">

                        <!-- my fav -->
                        <div id="favItems"></div>

                        <!-- recent -->
                        <div id="recentsItems"></div>

                        <!-- my travels -->
                        <div id="myTravels"></div>

                        <!-- cntr tree Options: shared, my markers, error -->
                        <div id="cntr-treeOptions">

                            <!-- shared -->
                            <div id="shareUbi"></div>

                            <!-- my markers -->
                            <div id="markerMyUbi"></div>

                            <!-- error -->
                            <div id="sendError"></div>

                        </div>

                    </div>
                
                </div>

        `;
    };

    toggleSidebar() {
        if (this.isVisible) {
            this.isVisible = false;
            this.moveSidebar(0); // Oculta completamente el sidebar
        } else {
            this.isVisible = true;
            this.moveSidebar(-315); // Muestra el sidebar con 50px visibles
        }
    };

    startDrag(e) {
        this.isDragging = true;
        this.startPosY = e.clientY;
    };

    drag(e) {
        if (this.isDragging) {
            const deltaY = e.clientY - this.startPosY;
            this.currentTranslateY += deltaY;

            // Limitar la altura máxima y mínima del sidebar
            this.currentTranslateY = Math.max(-315, Math.min(0, this.currentTranslateY));

            this.moveSidebar(this.currentTranslateY);

            this.startPosY = e.clientY;
        }
    };

    stopDrag() {
        this.isDragging = false;
    };

    moveSidebar(translateY) {
        this.sidebar.style.transform = `translateY(${translateY}px)`;
    };



}

// //ejemplo de faceplate 
// class Faceplate {
//     facePlate = document.getElementById('FacePlate');
//     isVisible = false;
//     isDragExpanded = false;
//     isDragMinim = false;
//     isDragging = false;    
//     startY = 0;
//     startTranslateY = 0;

//     constructor(){
//         if (!ManagerStatusControl.isFaceplateInit) {
//             ManagerStatusControl.isFaceplateInit = true;
//             this.init();
//         }        
//     };
//     init(){
//         let _me = this;
//         $(".valueCustomPropertyName").kendoTextBox({
//             placeholder: "Value",
//         })
//         $("#iconcloseFacePlate").on("click", function (){
//             _me.hide();
//         })

//         $("#UpActionFaceplate").on("click", function () {
//             if (_me.isVisible) {
//                 if (!_me.isDragExpanded) {
//                     // Expande el faceplate solo si no está totalmente expandido
//                     _me.facePlate.style.transform = `translateY(-${_me.calculateExpandedPosition()}%)`;
//                     _me.isDragExpanded = true;
//                 } else {
//                     // Minimiza el faceplate
//                     // if(_me.isDragMinim){
//                     //     _me.facePlate.classList.add('super-minimized');
//                     // } else {
//                     //     _me.facePlate.classList.remove('super-minimized');
//                     // }
//                     _me.facePlate.style.transform = 'translateY(0)';
//                     _me.isDragExpanded = false;
//                 }
//             }
//         });

//         _me.facePlate.addEventListener('mousedown', _me.startDrag);
//         _me.facePlate.addEventListener('touchstart', _me.startDrag);

//         document.addEventListener('mousemove', _me.drag);
//         document.addEventListener('touchmove', _me.drag);

//         document.addEventListener('mouseup', _me.endDrag);
//         document.addEventListener('touchend', _me.endDrag);


//         document.documentElement.style.setProperty("--Default-FacePlate", "none");
//     };
//     show(){
//         document.documentElement.style.setProperty("--Default-FacePlate", "flex");
//         this.isVisible = true; 
//         uiControl.pad.hide(true);
//         uiControl.btnUpMap.ResponsiveBTNGrid();

//         if (panelGrid == undefined) {
//             panelGrid = document.getElementById("divMapGrid");
//         }
    
//         document.removeEventListener("mousemove", _resizeGrid, false);
    
//         panelGrid.addEventListener("mousedown", function (e) {
//             if (e.offsetY < BORDER_SIZE) {
//                 m_pos_grid = e.y;
//                 document.addEventListener("mousemove", _resizeGrid, false);
//             }
//         }, false);
    
//         document.addEventListener("mouseup", function () {
//             document.removeEventListener("mousemove", _resizeGrid, false);
//         }, false);


//     };
//     hide(){
//         document.documentElement.style.setProperty("--Default-FacePlate", "none");
//         this.isVisible = false; 
//         if(uiControl.pad){
//             let z = uiControl.pad.isVisible;
//             if(z && z == true){
//                 uiControl.pad.show();
//             }
//             else if(z && z == false){
//                 uiControl.pad.hide(true);
//             }else {
//                 uiControl.pad.hide(true);
//             }
//         }
//     };
//     calculateExpandedPosition() {
//         let faceplateHeight = 485; // Altura del faceplate en píxeles
//         let windowHeight = window.innerHeight;
//         let percentage = (faceplateHeight / windowHeight) * 100;
//         return percentage;
//     }
//     startDrag = (event) => {
//         this.isDragging = true;
//         this.startY = event.clientY || event.touches[0].clientY;
//         let transformMatrix = getComputedStyle( document.getElementById('FacePlate') ).transform;
//         this.startTranslateY = this.extractTranslateY(transformMatrix);
//     };
//     drag = (event) => {
//         if (!this.isDragging) return;
      
//         let currentY = event.clientY || event.touches[0].clientY;
//         let deltaY = currentY - this.startY;

//         let newTranslateY = Math.max(this.startTranslateY + deltaY, -930); 
//         this.facePlate.style.transform = `translateY(${newTranslateY}px)`;


//     };
//     endDrag = () => {
//         this.isDragging = false;

//         const translateY = this.extractTranslateY(getComputedStyle(this.facePlate).transform);
//         const expandedPosition = this.calculateExpandedPosition();

//         if (translateY <= -expandedPosition *  5  ) {
//             this.facePlate.classList.remove('super-minimized');
//             //this.facePlate.style.top = 'calc(100% - 228px)';
//             this.facePlate.style.transform = `translateY(-${expandedPosition}%)`; // maximizado
//             this.isDragExpanded = true; // Se marca como totalmente expandido
//             this.isDragMinim = false;
//         } 
//         else if (translateY >= 0 ) {// (translateY >= 0 && translateY <= -expandedPosition - 100) {
//             this.facePlate.classList.remove('super-minimized');
//             //this.facePlate.style.top = 'calc(100% - 228px)';
//             this.facePlate.style.transform = 'translateY(0)'; // minimizado
//             this.isDragExpanded = false; // Se marca como no expandido
//             this.isDragMinim = false;
//         }
//         // else if (translateY >= -expandedPosition - 100)  {
//         //     //this.facePlate.style.transform = `translateY(0px)`; // "super minimizado"
//         //     this.facePlate.classList.add('super-minimized'); // Agregar la clase CSS
//         //     this.isDragExpanded = false; 
//         //     this.isDragMinim = true; //super minimizado
//         //    // this.facePlate.style.top = 'calc(100% - 60px)';
//         // } 
//         else {
//             this.facePlate.classList.remove('super-minimized');
//            // this.facePlate.style.top = 'calc(100% - 228px)';
//             this.isDragMinim = false;
//             this.isDragExpanded = false; // No está totalmente expandido ni minimizado
//         }

//     };
//     extractTranslateY(transformMatrix) {
//         if(this.isVisible){
//             let matrix = transformMatrix.match(/^matrix\((.+)\)$/)[1].split(', ');
//             return parseFloat(matrix[5]);
//         }
//     };

// }
