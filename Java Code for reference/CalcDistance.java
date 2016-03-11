import java.util.*;

public class CalcDistance {

    private double EARTH_RADIUS = 6368.159;
    private static double radiuscal(double d)
    {
       return d * Math.PI / 180.0;
    }
	
	//method to get the distance based on the latitude and longitude (math based on earth surface area)
    public static double getDistance(double lat1, double long1, double lat2, double long2)
    {
       double radiusLat1 = radiuscal(lat1);
       double radiusLat2 = radiuscal(lat2);
       double a1 = radiusLat1 - radiusLat2;
       double a2 = radiuscal(long1) - radiuscal(long2);

       double dist = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a1/2),2) +
        Math.cos(radiusLat1)*Math.cos(radiusLat2)*Math.pow(Math.sin(a2/2),2)));
       dist = dist * EARTH_RADIUS;
       dist = Math.round(dist * 100) / 100.0;
       return dist;
    }
}