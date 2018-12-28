import React from 'react';
import ReactDOM from 'react-dom';

//posicion del navegador. Asignacion de la posicion del usuario y una por defecto  

const mapStyles = {
    map: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
  };

  export class CurrentLocation extends React.Component{ //componente de estado 
        constructor(props){
            super(props);
            const {lat, lng} =this.props.initialCenter;
            this.state={
                currentLocation: {
                    lat: lat,
                    lng: lng
                }
            };
        }

        componentDidUpdate(prevProps, prevState) { //Creamos la instancia componentDid para apoyar el API ya que no sabemos si siempre este disponible al 100% 
            if (prevProps.google !== this.props.google) { //comprobacion que si el mapa ya esta cargado 
              this.loadMap();
            }
            if (prevState.currentLocation !== this.state.currentLocation) {//verifica que el navegador esta actualizando 
              this.recenterMap(); 
            }
        }

        recenterMap(){ // La llamaos cuando se acualiza el componente "currentLocation" 
            const map= this.map;
            const current =this.state.currentLocation;
            const google = this.props.google;
            const maps = google.maps;
            if (map){
                let center= new maps.LatLng(current.lat, current.lng);
                map.panTo(center); //cambia el centro del mapa ACTUALIZA EL MAPA    
            }
        }

        componentDidMount() { //Este componente sirve para manera las instancia creada a partir 
          //de haber cargado el mapa, estableciendo un cilo de vida con el metodo componentDidMount 
          //recuperando el la ubicacion actual
            if (this.props.centerAroundCurrentLocation) {
                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(pos => {
                        const coords = pos.coords;
                        this.setState({
                            currentLocation: {
                                lat: coords.latitude,
                                lng: coords.longitude
                            }
                        });
                    });
                }
            }
            this.loadMap();
          }
        
          loadMap(){ // Este comoponete indica en donde queremos colocar nuestro mapa 
            //Esto sucede despues del que componente haya tomado como referencia el componente DOOM 
                if (this.props && this.props.google) {
                   
                    const { google } = this.props;//comprueba si google esta disponible 
                    const maps = google.maps;
            
                    const mapRef = this.refs.map;
            
                    const node = ReactDOM.findDOMNode(mapRef); //Referencia al elemento DOM 
            
                    let { zoom } = this.props;
                    const { lat, lng } = this.state.currentLocation;
                    const center = new maps.LatLng(lat, lng);
                    const mapConfig = Object.assign(
                    {},
                    {
                        center: center,
                        zoom: zoom
                    }
                    );
            
                   this.map = new maps.Map(node, mapConfig); // maps.Map () es un constructor que crea una instancia del mapa
                    
                }
          }

          renderChildren() {//Para poder hacer que nuestro marcador este actualizado en nuestra posicion actual es necesario introducir el concepto herencia (padre e hijo)
                const { children } = this.props;
                if (!children) return;
                return React.Children.map(children, c => {
                    if (!c) return;
                    return React.cloneElement(c, {
                        map: this.map,
                        google: this.props.google,
                        mapCenter: this.state.currentLocation
                    });
                });
          }

          render() {
                const style = Object.assign({}, mapStyles.map);
                return (
                    <div>
                        <div style={style} ref="map">
                            Cargando mapa 
                        </div>
                        {this.renderChildren()}
                    </div>
                );
            }
  }
  
  export default CurrentLocation;
  
  CurrentLocation.defaultProps ={ //designacion de la localizacion por defecto 
      zoom: 18,
      initialCenter:{
            lat: 20.617224, 
            lng: -100.391027
      }, 
      centerAroundCurrentLocation: false,
      visible: true
  };
