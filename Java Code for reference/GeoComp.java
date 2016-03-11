import java.util.*;

Class Airport {
    double latitude;
    double longitude;
    boolean isAvailable;
}

public class GeoComp implements Comparator<Airport> { 
    private double curLat;
    private double curLong;
	
	//constructor to assign the current plane location
    public GeoComp(double curLat, double curLng) {
        this.curLat = curLat;
        this.curLong = curLng;
    } 
  
    @Override  
    public int compare(Airport airport1, Airport airport2) {
		//calculating the distance between plane and airport based on the lalitutde and longitude
        double distance1 =  CalcDistance.getDistance(curLat, curLong, airport1.getLatitude(), airport2.getLongitude()); 
        double distance2 =  CalcDistance.getDistance(curLat, curLong, airport2.getLatitude(), airport2.getLongitude()); 
		
		//comparing the distances of plane wrt to two airports and returning 1: airport1 is far, -1: airport2 is far and 0: equal distance
        if(distance1 > distance2){  
            return 1;  
        }else if(distance1 < distance2){  
            return -1;  
        }else{  
            return 0;  
        }  
    }  
}  