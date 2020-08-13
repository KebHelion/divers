//#####################
// HYTRION SKY C
// Alezia Kurdis
// August 2020.
//#####################
(function(){ 
    var zoneID = Uuid.NULL;   
    var universeCenter;
    var universeDimension;
    var DEGREES_TO_RADIANS = Math.PI / 180.0;
    var UPDATE_TIMER_INTERVAL = 1000; // 1 sec (TO BE SET ##########################)
    var FOG_DENSITY_CYCLE_DURATION = 25200; //7h
    var SKYBOX_URL = "http://metaverse.bashora.com/scripts/hytrion_cloud/HYTRION_OUTERSPACE.jpg";
    var processTimer = 0;
    var YEAR_DURATION = 3600 * 19 * 36 * 10; //10 months of 36 days de 19h;
    var FOG_MAX_RANGE = 1800;
    var FOG_MIN_RANGE = 1400;

    this.preload = function(entityID) {
        if (zoneID == Uuid.NULL){
            if (positionIsInsideEntityBounds(entityID, MyAvatar.position)) {
                initiate(entityID);
            }
        }
    };

    this.enterEntity = function(entityID) {
        if (zoneID == Uuid.NULL){
            initiate(entityID);
        }
    };

    this.leaveEntity = function(entityID) {
        shutdown();
    };
    
    this.unload = function(entityID) {
        shutdown();
    };    

    function myTimer(deltaTime) {
        var today = new Date();
        if ((today.getTime() - processTimer) > UPDATE_TIMER_INTERVAL ) {

            updateSky();
            
            today = new Date();
            processTimer = today.getTime();
        }  
    }

    function shutdown() {
        if (zoneID != Uuid.NULL){

            Script.update.disconnect(myTimer);
        
            //Delete Zone
            Entities.deleteEntity(zoneID);
            zoneID = Uuid.NULL;
        }
    }

    function initiate(EntID) { 
        var myAvPos = MyAvatar.position;
        var properties = Entities.getEntityProperties(EntID, ["position", "dimensions"]);
        universeCenter = properties.position;
        universeDimension = properties.dimensions;

        //Create Zone
        var nova = {
            "type": "Zone",
            "name": "DEEPSPACE",
            "dimensions": {
                    "x": 2500, 
                    "y": 2500, 
                    "z": 2500
                },
            "position": myAvPos,
            "grab": {
                "grabbable": false,
                "equippableLeftRotation": {
                    "x": -0.0000152587890625,
                    "y": -0.0000152587890625,
                    "z": -0.0000152587890625,
                    "w": 1
                },
                "equippableRightRotation": {
                    "x": -0.0000152587890625,
                    "y": -0.0000152587890625,
                    "z": -0.0000152587890625,
                    "w": 1
                }
            },
            "shapeType": "box",
            "keyLight": {
                "color": {
                    "red": 250,
                    "green": 255,
                    "blue": 153
                },
                "intensity": 3,
                "direction": {
                    "x": 0,
                    "y": -1,
                    "z": 0
                },
                "castShadows": true,
                "shadowMaxDistance": 150
            },
            "ambientLight": {
                "ambientIntensity": 0.6000000238418579,
                "ambientURL": SKYBOX_URL
            },
            "skybox": {
                "url": SKYBOX_URL,
                "color": {
                    "red": 255,
                    "green": 255,
                    "blue": 255
                }
            },
            "haze": {
                "hazeColor": {
                    "red": 8,
                    "green": 25,
                    "blue": 69
                },
                "hazeGlareColor": {
                    "red": 247,
                    "green": 255,
                    "blue": 102
                },
                "hazeEnableGlare": true,
                "hazeGlareAngle": 25
            },
            "bloom": {
                "bloomIntensity": 0.5009999871253967,
                "bloomThreshold": 0.7059999704360962,
                "bloomSize": 0.890999972820282
            },
            "keyLightMode": "enabled",
            "ambientLightMode": "enabled",
            "skyboxMode": "enabled",
            "hazeMode": "enabled",
            "bloomMode": "enabled"
        };
        
        zoneID = Entities.addEntity(nova, "local");          
                
        updateSky();

		var today = new Date();
        processTimer = today.getTime();
        Script.update.connect(myTimer);        
    }
    
    function updateSky() {
        if (zoneID != Uuid.NULL){
            var myAvPos = MyAvatar.position;
            
            var DAY_DURATION = 68400;
            //SUN POSITION
            var azimuth = GetCurrentCycleValue(360, DAY_DURATION);
            var annualAxialTilt = 0.75 + (Math.cos((GetCurrentCycleValue(360, YEAR_DURATION) - 180) * DEGREES_TO_RADIANS)/4);
            var inclinaison = (90-(45 * annualAxialTilt)) - (((Math.cos(GetCurrentCycleValue(360, Math.floor(DAY_DURATION/2)) * DEGREES_TO_RADIANS)) * 45) * annualAxialTilt);
            var sunDirection = Quat.fromVec3Degrees({ "x": inclinaison, "y": azimuth, "z": 0 });

            var sunIntensity = 0.1 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 3.4);
            if (sunIntensity < 0.1) {sunIntensity = 0.1;}
            var ambientIntensity = 0.15 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 1.2);
            if (ambientIntensity < 0.02) {ambientIntensity = 0.02;}
            //var glareAngle = 20 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 10);
            var glareAngle = 8 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 22);
            if (glareAngle < 6) {glareAngle = 6;}

            var glareLighness = 0.70 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 0.20); 
            var sunLighness = 0.80 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 0.15);
            var hazeLighness = 0.10 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 0.2);
            if (hazeLighness < 0.01) {hazeLighness = 0.01;}

            //DENSITY
            var cycleDensity = GetCurrentCycleValue(20000, FOG_DENSITY_CYCLE_DURATION)/10000; //Return sometyhing between 0 and 2
            //var density = (0.5 * Math.cos(0.001 * ( Vec3.distance(myAvPos, universeCenter) - (Math.PI * cycleDensity)))) + 0.5;  // 1 being very dense, 0 being void //density to modulate
            var density = (0.5 * Math.cos((0.001 * Vec3.distance(myAvPos, universeCenter)) - (Math.PI * cycleDensity))) + 0.5; //Return somethig between 0 and 1
            //var nightCycleFogFactor = 0.8 - (Math.cos(azimuth * DEGREES_TO_RADIANS) * 0.2);
            //var hazeRange = FOG_MIN_RANGE + (Math.floor(density * (FOG_MAX_RANGE - FOG_MIN_RANGE)) * nightCycleFogFactor);
            var hazeRange = FOG_MIN_RANGE + Math.floor(density * (FOG_MAX_RANGE - FOG_MIN_RANGE));

           //HAZE
            var hazeSaturation = 1- Math.abs((myAvPos.y - universeCenter.y )/((universeDimension.y - 200)/2)); 
            var glaireAndSunSaturation = 1- Math.abs((myAvPos.z - universeCenter.z )/((universeDimension.z - 200)/2)); 

            //#############  HUE  #################
            //HUE circle over the hemivolume
            //var hue = Math.abs((myAvPos.x - universeCenter.x + ((universeDimension.x - 200)/2)))/((universeDimension.x - 200)/2);
            
            //HUE circle over the full volume
            //var hue = (myAvPos.x - universeCenter.x + ((universeDimension.x - 200)/2))/(universeDimension.x - 200);
            
            //HUE ramnge 160 to 270 from 0 to + or - (mirror)
            var hue = (160 + ((Math.abs((myAvPos.x - universeCenter.x))/((universeDimension.x - 200)/2)) * 110))/360;
            
            //#####################################
            
            var hazeColor = hslToRgb(hue, hazeSaturation, hazeLighness);
            var BGColor = hslToRgb(hue, hazeSaturation, (hazeLighness - 0.005));
            
            var antiHue = hue - 0.5;
            if (antiHue < 0){antiHue = antiHue + 1;}
            if (antiHue > 1){antiHue = antiHue - 1;}
            var sunColor = hslToRgb(antiHue, glaireAndSunSaturation, sunLighness);
            var glaireColor = hslToRgb(antiHue, glaireAndSunSaturation, glareLighness);            

            // print("Galaxy: UPDATING: " + zoneID);
            // print("Density: " + density);
            // print("hazeRange: " + hazeRange);
            // print("azimuth: " + azimuth);
            // print("annualAxialTilt: " + annualAxialTilt);
            // print("inclinaison: " + inclinaison);            
            // print("sunIntensity: " + sunIntensity);             
            // print("ambientIntensity: " + ambientIntensity);             
            // print("glareAngle: " + glareAngle);             
            // print("glareLighness: " + glareLighness);   
            // print("sunLighness: " + sunLighness);   
            // print("hazeLighness: " + hazeLighness);   
            // print("hazeSaturation: " + hazeSaturation);
            // print("glaireAndSunSaturation: " + glaireAndSunSaturation);            
            
            
            //UPDATE
            var propertiesToChanges = {
                "position": myAvPos,
                "rotation": sunDirection,
                "dimensions": {
                        "x": 2500, 
                        "y": 2500, 
                        "z": 2500
                    },                
                "keyLightMode": "enabled",
                "ambientLightMode": "enabled",
                "skyboxMode": "enabled",
                "hazeMode": "enabled",
                "bloomMode": "enabled",                
                "keyLight": {
                    "direction": {
                        "x": 0,
                        "y": -1,
                        "z": 0
                    },
                    "color": {
                        "red": sunColor[0],
                        "green": sunColor[1],
                        "blue": sunColor[2]
                    },
                    "intensity": sunIntensity
                },
                "ambientLight": {
                    "ambientIntensity": ambientIntensity,
                    "ambientURL": SKYBOX_URL                    
                },
                "skybox": {
                    "url": SKYBOX_URL,
                    "color": {
                        "red": BGColor[0],
                        "green": BGColor[1],
                        "blue": BGColor[2]
                    }
                },
                "haze": {
                    "hazeRange": hazeRange,
                    "hazeAltitudeEffect": false,
                    "hazeColor": {
                        "red": hazeColor[0],
                        "green": hazeColor[1],
                        "blue": hazeColor[2]
                    },
                    "hazeGlareColor": {
                        "red": glaireColor[0],
                        "green": glaireColor[1],
                        "blue": glaireColor[2]
                    },
                    "hazeEnableGlare": true,
                    "hazeGlareAngle": glareAngle
                },
                "bloom": {
                    "bloomIntensity": 0.5009999871253967,
                    "bloomThreshold": 0.7059999704360962,
                    "bloomSize": 0.890999972820282
                }                
            };
            
            var test = Entities.editEntity(zoneID, propertiesToChanges);            


            
        }
    } 


	/*
	* Return the current position in a cycle 
	* for specific time length
	*
    * @param   {number integer}  cyclelength       a cycle goes from 0 to cyclelength
	* @param   {number integer}  cycleduration     duration of a cycle in seconds.
    * @return  {number double}           		current position in the cycle (double)
	*/
    function GetCurrentCycleValue(cyclelength, cycleduration){
		var today = new Date();
		var TodaySec = today.getTime()/1000;
		var CurrentSec = TodaySec%cycleduration;
		
		return (CurrentSec/cycleduration)*cyclelength;
		
	}

	/*
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    function hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }


    function positionIsInsideEntityBounds(entityID, targetPosition) {
        targetPosition = targetPosition || MyAvatar.position;

        var properties = Entities.getEntityProperties(entityID, ["position", "dimensions", "rotation"]);
        var entityPosition = properties.position;
        var entityDimensions = properties.dimensions;
        var entityRotation = properties.rotation;

        var worldOffset = Vec3.subtract(targetPosition, entityPosition);
        targetPosition = Vec3.multiplyQbyV(Quat.inverse(entityRotation), worldOffset);

        var minX = -entityDimensions.x * HALF;
        var maxX = entityDimensions.x * HALF;
        var minY = -entityDimensions.y * HALF;
        var maxY = entityDimensions.y * HALF;
        var minZ = -entityDimensions.z * HALF;
        var maxZ = entityDimensions.z * HALF;

        return (targetPosition.x >= minX && targetPosition.x <= maxX
            && targetPosition.y >= minY && targetPosition.y <= maxY
            && targetPosition.z >= minZ && targetPosition.z <= maxZ);
    }
    
})