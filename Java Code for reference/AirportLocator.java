import java.util.*;
Class Airport {
    double latitude;
    double longitude;
    boolean isAvailable;
}
public class AirportLocator {
	public Airport getCloestAvailableAirport(Plane plane) {
		List<Airport> airportlst = getListFromGoogleAPI(plane.getCurrentLatitude(), plane.getcurrentLongitude()); //to get airport list with geolocation from google maps api
		
		//The sort method in return calls the comparator and returns a sorted list of airports based on their geolocation wrt plane location
		Collections.sort(airportlst,new GeoComp(plane.getCurrentLatitude(), plane.getcurrentLongitude())); 
		for (Airport a : airportlst) {
			if (a.isAvailable) {
				return a;
			}
		}
		throw new IllegalArgumentException("No Available Airport at this time");
	}
}