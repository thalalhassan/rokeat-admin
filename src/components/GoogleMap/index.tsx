import React, { Component } from "react";

interface GoogleMapPropsInterface {
  options: any;
}

interface GoogleMapStateInterface {
  map: any;
}

class Map extends Component<GoogleMapPropsInterface, GoogleMapStateInterface> {
  constructor(props: GoogleMapPropsInterface) {
    super(props);
    this.state = {
      map: "",
    };
  }

  onScriptLoad() {
    if (!window.google) return;

    const mapDoc = document.getElementById("rokeat-google-map");

    if (!mapDoc) return;

    const googleMapInstance = new window.google.maps.Map(
      mapDoc,
      this.props.options
    );
    console.log("mapDoc", mapDoc);
    //adding markers by click
    googleMapInstance.addListener("click", (e: any) => {
      //Determine the location where the user has clicked.
      this.addMarker(e.latLng);
    });

    this.setState({
      ...this.state,
      map: googleMapInstance,
    });

    var marker = new window.google.maps.Marker({
      position: { lat: -33.8569, lng: 151.2152 },
      map: googleMapInstance,
      title: "Hello Sydney!",
    });
  }

  componentDidMount() {
    console.log("setting google");
    if (window.google) this.onScriptLoad();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "rokeat-google-map-script";
    script.src = `https://maps.google.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
    const xNode = document.getElementsByTagName("script")[0];

    xNode.parentNode?.insertBefore(script, xNode);

    script.addEventListener("load", (e) => {
      this.onScriptLoad();
    });
  }

  addMarker(latLng: any) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.state.map,
    });
  }

  render() {
    return <div className="w-full h-full map" id="rokeat-google-map" />;
  }
}

export default Map;
