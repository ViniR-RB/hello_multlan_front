declare module "leaflet-routing-machine" {
  import * as L from "leaflet";

  namespace Routing {
    function control(options: any): L.RoutingControl;
  }

  namespace L {
    namespace Routing {
      function control(options: any): L.RoutingControl;

      interface RoutingControl extends L.Control {
        getPlan(): any;
        getWaypoints(): any[];
        setWaypoints(waypoints: L.LatLng[]): this;
        onAdd(map: L.Map): HTMLElement;
        onRemove(map: L.Map): void;
      }
    }
  }

  export = L.Routing;
}
