const map = L.map('map').setView([30.3753, 69.3451],6);

const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

async function fetchPakBoundry(){
    let response = await fetch("./pakistan.geojson")
    let data = await response.json()
    let {features} = data
    features.forEach(feature => {
        let geojsonFeature = feature.geometry;
        let featureStyle = {
            color: "green",
            weight: 3
        }

        let border = L.geoJSON(geojsonFeature, {
            style: featureStyle
        }).addTo(map);
        map.fitBounds(border.getBounds());
    })

}

window.addEventListener("DOMContentLoaded",()=>{
    fetchPakBoundry();
})