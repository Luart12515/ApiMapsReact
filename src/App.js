import React, { Component } from 'react';
import {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import CurrentLocation from './Map';

export class MapContainer extends Component {
    state={ //administracion de nuestro estado en el mapa 
        showingInfowindow: false, //Oculta o muestra nuestra informacion de nuestra ventana
        activeMarker:{}, //Activa los marcadores  
        selectedPlace:{} // Nos muestra la informacion del lugar 
    };
    //Controlador de eventos 
    onMarkerClick = (props, marker, e) =>  // Nos permite ver con mas detalle la informacion de la ubicacion cuando 
      //hacemos click en el marcador habriendo una ventana emergente
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfowindow:true 
        });


    onClose = props=> { // Cierra la ventana emergente, de la informacion habierta por el usuario cuando el usuario le da click 
        if(this.state.showingInfowindow){
            this.setState({
                showingInfowindow: false,
                activeMarker:null
            });
        }  
    };


    render() {
        return (
            // <Map
            //   google={this.props.google}
            //   zoom={18}
            //   style={mapStyles}
            //   //aqui estamos asignando la ubicacion del mapa 
            //   initialCenter={{ //Coordenadas por defecto (señuelo)
            //       lat: 20.617224, 
            //       lng: -100.391027
            //   }}
            //   >
            //     <Marker
            //         onClick={this.onMarkerClick}
            //         name={'Ubiccion de muestra (señuelo)'}
            //     />

            //     <InfoWindow
            //         marker={this.state.activeMarker}
            //         visible={this.state.showingInfowindow}
            //         onClose={this.onClose}
            //       >
            //         <div>
            //             <h4>
            //                 {this.state.selectedPlace.name}
            //             </h4>
            //         </div>
            //     </InfoWindow>
            // </Map>
            
            <CurrentLocation
              centerAroundCurrentLocation
              google={this.props.google}
             >
                <Marker onClick={this.onMarkerClick} name={'current location'} />
                
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                 >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </CurrentLocation>
        );
    }     
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-Be7WHRLCtND2Lkubs8jtewR_wfWYQp4'
})(MapContainer);
