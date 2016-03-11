# Airport-Locator
Airports in the US-area using the Google API

Basically calculated a percentage based on the Average on-time Arrivals and Departures at that particular airport
Based on the percentage we suggest the airport with several color coding in the GUI
Color indicators: Green, Yellow, Orange and Red. The pilots prefer to choose the airport based on the these factors

I have writing the java code based on the distance and availability. 

In GUI using Google Maps APIs, I have categorized the Airports based on several other features like: Average on-time departure and arrival. I have taken static data due to the limitation with creating the database and 
processing the Average on-time percentage. Done in basic JavaScript.
Based on this Avg on-time percentage I have classified several airports into color coding’s on to the Google maps.

Green indicators: Shows that the airport has high percentage of Avg on-Time arrivals and 
                  departures which states that these airports doesn’t have any delays. 
                  I have calculated the percentage and categorized it if its greater than 80% avg ontime (<80%)
Yellow indicators: These can be chosen by pilot as next 2nd  priority as they have the Average 
                    on-time in between 70% to 80%
Orange indicators: These can be chosen by pilot as 3rd priority as they have the Average on-
                  time in between 60% to 70%
Red indicators: These can be chosen by pilot as last priority as they have the Average on-time 
                departure and arrival in between less than 60%.
                
Limitations: 

 This GUI is not dynamic, for example here I am not considering the moving plane Geo-location 
(Latitude and Longitutde) which changes continuously due to time constraint.

 We can improve more by incorporating the actual dynamic features which I have written in Java into this GUI, 
by suggesting the pilot with airports. 

 Real-time statistics like Arrivals and departure delays can change dynamically. 
This part is also trivial complexity in consideration to time.

Update/Improvements as per 3/11/2016:
I have done few improvements to the GUI web page. I am able to locate the current location of the plane using the browser ‘navigator.geolocation.getCurrentPosition’ (may contain glitches so took static values). I have taken default static value for plane and tried to find the nearest available airport and it worked. I implemented the code in using Java Script (Refer Script.js file) and Google APIs.

Implementation Steps:
1.	Collected airport data and current plane data into file called airportdata.js
2.	Assigned all the airports with color icon like “green, Yellow, Orange and Red” based on several factors like Average on-time arrival time, Average on-time departure time and cumulative Average on-time based on flights the airport has.
3.	As we have current location of plane, based on the Geo-location (Latitude and Longitude) of nearest airport which are in “Green” indicator are suggested to the pilot.

Improvements:
•	Backend Database to store instead of static Airport and current plane locations
•	AJAX calls to make web page more responsive
•	REST APIs in node.js with MangoDB would help build robust application
•	Angular JS and Boostrap to make more colorful.


