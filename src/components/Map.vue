<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
    import {bus} from '../main';

    export default {
        name: 'google-map',
        props: ['name','lat','lng','changeCoords'],
        data: function () {
            return {
                mapName: this.name + "-map",
                markerCoordinates: {
                    latitude: 51.69285,
                    longitude: 0.0433281
                },
                map: null,
                bounds: null,
                markers: [],
                directionsService: new google.maps.DirectionsService(),
                directionsDisplay: new google.maps.DirectionsRenderer(),
                startPoint: undefined,
                endPoint: new google.maps.LatLng(this.lat,this.lng),
            }
        },
        methods: {
            calcRoute() {
                const request = {
                    origin: this.startPoint,
                    destination: this.endPoint,
                    travelMode: 'DRIVING'
                };
                this.directionsService.route(request, (result, status) => {
                    if (status == 'OK') {
                        this.markers[0].setMap(null)
                        this.markers[1].setMap(null)
                        this.directionsDisplay.setDirections(result);
                        const secs = result.routes[0].legs[0].duration.value
                        const formatted = moment.utc(secs * 1000).format('HH:mm:ss');
                        bus.$emit('getDuration', {
                            duration: formatted,
                            coords: {
                                lat: result.request.destination.location.lat(),
                                lng: result.request.destination.location.lng()
                            }
                        })
                    }
                })
            },
            addMarker(location, index) {
                let marker = new google.maps.Marker({
                    position: location,
                    map: this.map
                });
                this.markers[index] = marker

                if (index){
                    this.map.fitBounds(this.bounds.extend(location))
                }
            }
        },
        mounted(){
            this.bounds = new google.maps.LatLngBounds();
            const coord = this.markerCoordinates
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const options = {
                center: position,
                zoom: 15
            }

            this.map = new google.maps.Map(document.getElementById(this.mapName), options);
            google.maps.event.addListener(this.map, 'click', e => {
                this.changeCoords(e.latLng);
                this.addMarker(e.latLng, 1);
                this.endPoint = e.latLng;
                this.calcRoute();
            });
            google.maps.event.addListenerOnce(this.map, 'idle', e=>{
                this.addMarker(position, 0)
                this.startPoint = position;
                this.addMarker(this.endPoint, 1);
                this.calcRoute();
            });
            this.directionsDisplay.setMap(this.map);

        }
    }

</script>


<style scoped>
    .google-map {
        width: 100%;
        height: 450px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 15px;
        background: gray;
    }
</style>
