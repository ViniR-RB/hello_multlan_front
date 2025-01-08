// leaflet-routing-machine.d.ts
import * as L from "leaflet";

declare module "leaflet-routing-machine" {
  export namespace Routing {
    function control(options: RoutingControlOptions): RoutingControl;

    interface RoutingControlOptions {
      waypoints: L.LatLng[];
      routeWhileDragging?: boolean;
    }

    interface RoutingControl extends L.Control {
      getPlan(): unknown;
      getWaypoints(): L.LatLng[];
      setWaypoints(waypoints: L.LatLng[]): this;
    }
  }
}

declare module "leaflet" {
  namespace Routing {
    function control(
      options: Routing.RoutingControlOptions
    ): Routing.RoutingControl;
  }
}
