let formaOriginal = [];
let formaCopia = [];
let formaColada = [];
const initDrawing = (googleMap) => {
    new goggle.maps.drawing.DrawingManager({
        map: map,

    });
}
function initMap() {
    map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 14,
        center: new google.maps.LatLng(-22.10452492070399, -50.211188118378004),
        scrollwhell: false,
        zoom: 14,
        maptypeId: google.maps.MapTypeId.ROADMAP
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
            ],
        },
        markerOptions: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: '#98878f',
            fillOpacity: 0.8,
            strokeColor: '#48d9ef',
            strokeWeight: 1,
        },
        circleOptions: {
            fillColor: "#48d9ef",
            fillOpacity: 0.5,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
            editable: true,
            draggable: true,
            strokeColor: '#9fdaae',
        },
        polygonOptions: {
            fillColor: "#16a835",
            fillOpacity: 0.5,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
            editable: true,
            draggable: false,
            strokeColor: '#9fdaae',
        },
        polylineOptions: {
            fillColor: "#a7804d",
            fillOpacity: 0.5,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
            editable: true,
            draggable: true,
            strokeColor: '#9fdaae',
        },
        rectangleOptions: {
            fillColor: "#54eb8b",
            fillOpacity: 0.5,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
            editable: true,
            draggable: true,
            strokeColor: '#9fdaae',
        },

    });

    drawingManager.setMap(map);


    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        formaOriginal.push(event);
        if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
            const center = event.overlay.getCenter();
            const radius = event.overlay.getRadius();
            const type = event.type;
            const objCircle = {
                center: center,
                radius: radius,
                type: type,
            }

            
        }
        if (event.type == google.maps.drawing.OverlayType.POLYGON) {
            const path = event.overlay.getPath().getArray();
            const type = event.type;
            const objPolygon = {
                path: path,
                type: type,
            }
            
        }
        if (event.type == google.maps.drawing.OverlayType.POLYLINE) {
            const path = event.overlay.getPath().getArray();
            console.log(path);
            const type = event.type;
            const objPolyline = {
                path: path,
                type: type,
            }
            
        }
        if (event.type == google.maps.drawing.OverlayType.RECTANGLE) {
            const bounds = event.overlay.getBounds();
            const type = event.type;
            const objRectangle = {
                bounds: bounds,
                type: type,
            }
            
        }
        if (event.type == google.maps.drawing.OverlayType.MARKER) {
            const position = event.overlay.getPosition();
            const type = event.type;
            const objMarker = {
                position: position,
                type: type,
            }
            
        }

        listaFormaOriginal();
    });
}
function gerar_cor(opacidade = 1) {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
function selecionaOriginal() {
    let lista = document.getElementById("ListaFormaOriginal");
    let id = lista.options[lista.selectedIndex].id;

    formaCopia.push(formaOriginal[id]);
    listaFormaCopia();



}
function selecionaCopia() {
    let lista = document.getElementById("ListaFormaCopia");

    let id = lista.options[lista.selectedIndex].id.substring(6);
    Copia(id);
    
}
function Copia(id) {

    if (formaCopia[id].type == 'circle') {
        const circle = new google.maps.Circle({
            type: formaCopia[id].type,
            center: formaCopia[id].overlay.getCenter(),
            radius: formaCopia[id].overlay.getRadius(),
            strokeColor: gerar_cor(),
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: gerar_cor(),
            fillOpacity: 0.35,
            map: map,
            editable: true,
            draggable: true,
        });
        formaColada.push(circle);
        circle.setMap(map);
    } else
        if (formaCopia[id].type == 'polygon') {
            const polygon = new google.maps.Polygon({
                type: formaCopia[id].type,
                paths: formaCopia[id].overlay.getPath(),
                strokeColor: gerar_cor(),
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: gerar_cor(),
                fillOpacity: 0.35,
                map: map,
                editable: true,
                draggable: true,
            });
            formaColada.push(polygon);
            polygon.setMap(map);
        } else
            if (formaCopia[id].type == 'polyline') {

                const polyline = new google.maps.Polyline({
                    type: formaCopia[id].type,
                    path: formaCopia[id].overlay.getPath(),
                    strokeColor: gerar_cor(),
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: gerar_cor(),
                    fillOpacity: 0.35,
                    map: map,
                    editable: true,
                    draggable: true,
                });
                formaColada.push(polyline);
                polyline.setMap(map);
            } else
                if (formaCopia[id].type == 'rectangle') {
                    const rectangle = new google.maps.Rectangle({
                        type: formaCopia[id].type,
                        bounds: formaCopia[id].overlay.getBounds(),
                        strokeColor: gerar_cor(),
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: gerar_cor(),
                        fillOpacity: 0.35,
                        map: map,
                        editable: true,
                        draggable: true,

                    });

                    formaColada.push(rectangle);

                    rectangle.setMap(map);
                } else
                    if (formaCopia[id].type == 'marker') {
                        const marker = new google.maps.Marker({
                            type: formaCopia[id].type,
                            position: formaCopia[id].overlay.getPosition(),
                            map: map,
                            draggable: true,
                        });
                        formaColada.push(marker);
                        marker.setMap(map);
                    }
    listaFormaColada();

}
function removeFormaOriginal() {
    let lista = document.getElementById("ListaFormaOriginal");
    let forma = lista.options[lista.selectedIndex].id;
    formaOriginal[forma].overlay.setMap(null);
    formaOriginal.splice(forma, 1);

    lista.removeChild(lista.options[lista.selectedIndex]);

    listaFormaOriginal();

}
function removeFormaCopia() {

    let lista = document.getElementById("ListaFormaCopia");
    let forma = lista.options[lista.selectedIndex].id.substring(6);
    formaCopia[forma].overlay.setMap(null);
    formaCopia.splice(forma, 1);

    lista.removeChild(lista.options[lista.selectedIndex]);
    listaFormaCopia();

}
function removeFormaColada() {
    let lista = document.getElementById("ListaFormaColada");
    let forma = lista.options[lista.selectedIndex].id.substring(6);
    formaColada[forma].setMap(null);
    formaColada.splice(forma, 1);

    lista.removeChild(lista.options[lista.selectedIndex]);
    listaFormaColada();

}
function listaFormaOriginal() {

    const lista = document.getElementById("ListaFormaOriginal");
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.lastChild);
    }
    for (let i = 0; i < formaOriginal.length; i++) {
        const option = document.createElement("option");
        option.id = i;

        option.innerHTML = i + 1 + "-" + formaOriginal[i].type;
        lista.appendChild(option);
    }
}
function listaFormaCopia() {

    const lista = document.getElementById("ListaFormaCopia");
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.lastChild);
    }
    for (let i = 0; i < formaCopia.length; i++) {
        const option = document.createElement("option");
        option.id = "Copia-" + i;
        option.innerHTML = i + 1 + "- copia de " + formaCopia[i].type;
        lista.appendChild(option);
    }

}
function listaFormaColada() {
    const lista = document.getElementById("ListaFormaColada");
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.lastChild);
    }
    for (let i = 0; i < formaColada.length; i++) {
        const option = document.createElement("option");
        option.id = "Colada" + i;
        option.innerHTML = i + 1 + "º " + formaColada[i].type + " colado";
        lista.appendChild(option);
    }
}
function limparFormasOriginais() {

    for (let i = 0; i < formaOriginal.length; i++) {
        formaOriginal[i].overlay.setMap(null);
    }
    formaOriginal = [];
    dadosForma = [];
    listaFormaOriginal();

}
function limparFormasCopia() {

    formaCopia = [];
    dadosCopia = [];
    listaFormaCopia();
}
function limparFormasColadas() {

    for (let i = 0; i < formaColada.length; i++) {
        formaColada[i].setMap(null);
    }
    formaColada = [];

    listaFormaColada();
}