(function(){
    print("GENESIS STARTED!");
    var FACTOR = 1; //0.001; //Real scale = 1
    var PERSISTENCE = 90; //sec -1 is durable (lifetime)
    //=======================
    
    var STELLAR_CONTAINER = 6050 * FACTOR;
    var MAX_VISIBILITY_IN_FOG = 1100 * FACTOR;

    var STELLAR_MAX_SIZE = MAX_VISIBILITY_IN_FOG;
    var INTERSTELLAR_MIN_DIST_ALLOWED = MAX_VISIBILITY_IN_FOG; 
    var STELLAR_BUILDABLE_CONTAINER = STELLAR_CONTAINER - (MAX_VISIBILITY_IN_FOG/2);    

    var INTER_STELLAR_DISTANCE = MAX_VISIBILITY_IN_FOG * 2;


    //PLANET DISTIBUTION ADJUSTMENTS
    var NUMBER_OF_COMPLEX_SYSTEM = 77;// over 125
    var NBR_PLANET_PER_SYSTEM = 25;
    //##############################
    var planetType = [
         {
           "type": "Shape",
           "shape": "Cube",
           "url": "",
           "disform": false,
           "rotation": "none",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Sphere",
           "url": "",
           "disform": false,
           "rotation": "none",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Cube",
           "url": "",
           "disform": true,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Cube",
           "url": "",
           "disform": true,
           "rotation": "none",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Sphere",
           "url": "",
           "disform": true,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Tetrahedron",
           "url": "",
           "disform": false,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Octahedron",
           "url": "",
           "disform": false,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Icosahedron",
           "url": "",
           "disform": true,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Dodecahedron",
           "url": "",
           "disform": true,
           "rotation": "free",
           "astroid": false
         },
         {
           "type": "Shape",
           "shape": "Dodecahedron", //FALSE ASTROID To NOT CRASH THE SCRIPT FOR NOW.
           "url": "",
           "disform": true,
           "rotation": "free",
           "astroid": true 
         }         
        ];
    
    //##############################
    
    var planetarNamePattern = ["name", "numeric", "roman", "greek"];
    
    var star, position, name;
    var stellar = [];
    var stellarNamesDictionary = [
        "Agartha",
        "Alfheim",
        "Alomkik",
        "Awanak",
        "Arcadia",
        "Asgard",
        "Atlantis",
        "Avalon",
        "Ayotha",
        "Aztlan",
        "Baltia",
        "Brittia",
        "Affaron",
        "Elysia",
        "Eden",
        "Hesperia",
        "Gorias",
        "Finias",
        "Murias",
        "Falias",
        "Hawaiki",
        "Heaven",
        "Hell",
        "Hyperboria",
        "Irkalla",
        "Jabulsa",
        "Jotun",
        "Ketumati",
        "Kitezh",
        "Kolob",
        "Kunlun",
        "Lemuria",
        "Lintukoto",
        "Lyona",
        "Meropis",
        "Mictlan",
        "Naraka",
        "Nibiru",
        "Nifela",
        "Norum",
        "Nysa",
        "Olympus",
        "Pangaia",
        "Pleroma",
        "Pancron",
        "Cibola",
        "Samava",
        "Shamba",
        "Gomorrah",
        "Sudek",
        "Svarga",
        "Takama",
        "Tartarus",
        "Themis",
        "Thule",
        "Vakun",
        "Varaka",
        "Veruk",
        "Wothal",
        "Xanadu",
        "Xibala",
        "Zaraku",
        "Zeruza",
        "Zion",
        "Aikodir",
        "Aillon",
        "Bassu ",
        "Breavus",
        "Brecceh",
        "Chullond",
        "Crit",
        "Crubit",
        "Cruc",
        "Deashi",
        "Deos",
        "Dind",
        "Dori",
        "Eobi",
        "Erri",
        "Fillavia",
        "Flaccil",
        "Flaigath",
        "Fleoth ",
        "Fletinal",
        "Flidoth",
        "Flien ",
        "Hoisho",
        "Jaben",
        "Kual",
        "Lande",
        "Meotichu",
        "Modican",
        "Moldar",
        "Naffut ",
        "Nand",
        "Noirru",
        "Norre",
        "Odheth",
        "Olzudou",
        "Osir",
        "Othisciant",
        "Ovom",
        "Polles",
        "Sadesio",
        "Scul",
        "Sesterriac",
        "Shessor",
        "Shosnuc",
        "Shus",
        "Sovil",
        "Suth",
        "Troilzec",
        "Truthi",
        "Ulzer",
        "Urtu",
        "Vaffur",
        "Vuahperi",
        "Vurur",
        "Wasti",
        "Wurribor",
        "Yasni",
        "Yiruh",
        "Ystole",
        "Zassoth ",
        "Zolzelu"        
    ];

    stellarNames = shuffle(stellarNamesDictionary);
    
    print("SYSTEM GENESIS STARTED!");
    
    var starId, sytemData;
    var counter = 0;
    for (var zoneX = -2; zoneX < 3; zoneX++){
        for (var zoneY = -2; zoneY < 3; zoneY++){
            for (var zoneZ = -2; zoneZ < 3; zoneZ++){
                
                position = {"x": (zoneX * INTER_STELLAR_DISTANCE), "y": (zoneY * INTER_STELLAR_DISTANCE), "z": (zoneZ * INTER_STELLAR_DISTANCE)};

                name = "SYS_" + stellarNames[counter];
                star = {
                    "name": name,
                    "position": position
                    };

                starId = genStellar(star);
                
                sytemData = {
                    "name": name,
                    "position": position,
                    "id": starId
                    };
                
                stellar.push(sytemData);
                
                print("GENESIS: " + name);
                counter = counter + 1;
                
            }                           
        }           
    }
    
    print("SYSTEM GENESIS COMLETED!");

    print("PLANETAR GENESIS STARTED!");
    var planetNo = 0;
    
    var stellarDistribution = [];
    for (var syStelNo = 0; syStelNo < stellar.length; syStelNo++) {
        if (syStelNo < NUMBER_OF_COMPLEX_SYSTEM) {
            stellarDistribution.push("C");
        }else{
            stellarDistribution.push("R");
        } 
    }
    
    stellarDistribution = shuffle(stellarDistribution);
    //print(JSON.stringify(stellarDistribution));
 
    //PLANET GENERATION
    for (syStelNo = 0; syStelNo < stellar.length; syStelNo++) {
        if (stellarDistribution[syStelNo] == "C") {
            GenerateComplexSystem(stellar[syStelNo]);
        }else{
            GenerateRandomSystem(stellar[syStelNo]);
        } 
    }    

    function GenerateRandomSystem(systemInfo){
        var plPosition, nbrPl;
        var parentName = generatePlanetName();
        
        //SIZE DEFINITION
        var sizeDefinition = genSizeDefinition();
        
        var typeOfplanet = 999; // full random
        if (rnd() < 0.7) {
            typeOfplanet = 777; // random type astroid only
        } else {
            if (rnd() < 0.8) {
                typeOfplanet = Math.floor(Math.random() * planetType.length); // a specific type
            }
        }
        
        var alpha;
        for (nbrPl = 0; nbrPl < NBR_PLANET_PER_SYSTEM; nbrPl++) {
            if (nbrPl == 0){
                alpha = true;
            }else{
                alpha = false;
            }
             plPosition = {
                "x": systemInfo.position.x + (Math.random() * (STELLAR_MAX_SIZE * 2)) - STELLAR_MAX_SIZE, 
                "y": systemInfo.position.y + (Math.random() * (STELLAR_MAX_SIZE * 2)) - STELLAR_MAX_SIZE, 
                "z": systemInfo.position.z + (Math.random() * (STELLAR_MAX_SIZE * 2)) - STELLAR_MAX_SIZE 
            };
            
            CreatePlanet(plPosition, {"name": parentName, "namePattern": "name", "sequence": (nbrPl + 1), "sizeDefinition": sizeDefinition,"isAlpha": alpha, "typeOfplanet": typeOfplanet});
            
        }
    }

    function GenerateComplexSystem(systemInfo) {
        var plPosition, nbrPl, minumum;
        var parentName = generatePlanetName();
        var patt = shuffle(planetarNamePattern);
        var parentNamePattern = patt[0];
        
        var typeOfplanet = 999; // full random
        if (rnd() < 0.7) {
            typeOfplanet = 777; // random type astroid only
        } else {
            if (rnd() < 0.8) {
                typeOfplanet = Math.floor(Math.random() * planetType.length); // a specific type
            }
        }        
        
        //SIZE DEFINITION
        var sizeDefinition = genSizeDefinition();
        
        
        minumum = sizeDefinition.sizeMax;
        minumum = minumum + (minumum * Math.random());
        var rnd = Math.random();
        var azimuthMin = 0;
        var azimuthMax = 359;
        var elevationMin = -90;
        var elevationMax = 90;        
        if (rnd > 0.7) {
            azimuthMin = Math.floor(Math.random() * 360);
            azimuthMax = azimuthMin + Math.floor(Math.random() * (360 - azimuthMin)); 
        }
        if (rnd > 0.4) {
            elevationMin = -90 + Math.floor(Math.random() * 180);
            elevationMax = elevationMin + Math.floor(Math.random() * (180 - azimuthMin)); 
        }        
        
        var parentData = {
            "min": minumum,
            "max": MAX_VISIBILITY_IN_FOG * (0.6 + (Math.random() * 0.4)),
            "azimuthMin": azimuthMin,
            "azimuthMax": azimuthMax,
            "elevationMin": elevationMin,
            "elevationMax": elevationMax
        }
        var alpha;
        for (nbrPl = 0; nbrPl < NBR_PLANET_PER_SYSTEM; nbrPl++) {
            if (nbrPl == 0){
                alpha = true;
            }else{
                alpha = false;
            }
            plPosition = GetAplanetarPosition(systemInfo.position, parentData); //parentData call have infor about range of azimut and elevation
            
            CreatePlanet(plPosition, {"name": parentName, "namePattern": parentNamePattern, "sequence": (nbrPl + 1), "sizeDefinition": sizeDefinition, "isAlpha": alpha, "typeOfplanet": typeOfplanet});
            
        }
            
    }
    
    function genSizeDefinition() {
        
        var gDefAlphaFactor = 1;
        if (Math.random() > 0.7) {
            gDefAlphaFactor = 1 + Math.random();
        }
        
        var gDefSizeMin = 10 + (Math.random() * 90);
        var gDefSizeMax = gDefSizeMin + (Math.random() * (100 - gDefSizeMin));
        
        var definition = {
            "alphaFactor": gDefAlphaFactor,
            "sizeMin": gDefSizeMin * FACTOR,
            "sizeMax": gDefSizeMax * FACTOR,
        };
        return definition;
    }

    function genDisformationRatio() {
        var defRx = 0.2 + (Math.random() * 1.8);
        
        var nextPossible = 3 - defRx - 0.2;
        //if (nextPossible < 0.6) {nextPossible = 1;}
        
        var defRy = 0.2 + (Math.random() * (nextPossible - 0.2));
        
        var defRz = 3 - defRx - defRy;
        
        var mixer = [defRx, defRy, defRz];
        mixer = shuffle(mixer);

        return {"x": mixer[0], "y": mixer[1], "z": mixer[2]};
    }
    
    function CreatePlanet(planetPosition, parentSystemInfo){
        var stellarNo, zoneslist, planetName; 
        
        //List of zone where this planet is visible from
        zoneslist = [];
        for (stellarNo = 0; stellarNo < stellar.length; stellarNo++){
            if ((Math.abs(stellar[stellarNo].position.x - planetPosition.x) < (MAX_VISIBILITY_IN_FOG * 2)) && 
                (Math.abs(stellar[stellarNo].position.y - planetPosition.y) < (MAX_VISIBILITY_IN_FOG * 2)) && 
                (Math.abs(stellar[stellarNo].position.z - planetPosition.z) < (MAX_VISIBILITY_IN_FOG * 2))) {
                    zoneslist.push(stellar[stellarNo].id);
                    
            }  
        }
        //=========
        //Planet Name
        switch(parentSystemInfo.namePattern) {
          case "name":
            planetName = "[PL] " + parentSystemInfo.name + "-" + generatePlanetName();
            break;
          case "numeric":
            planetName = "[PL] " + parentSystemInfo.name + " " + parentSystemInfo.sequence;
            break;
          case "roman":
            planetName = "[PL] " + parentSystemInfo.name + " " + romanize(parentSystemInfo.sequence);
            break;
          case "greek":
            planetName = "[PL] " + parentSystemInfo.name + " (" + greek(parentSystemInfo.sequence) + ")";
            break;
          default:
            planetName = "[PL] " + parentSystemInfo.name + "-" + generatePlanetName();
        }
            
        //size computation
        var planetSize = parentSystemInfo.sizeDefinition.sizeMin + (Math.random() * ( parentSystemInfo.sizeDefinition.sizeMax - parentSystemInfo.sizeDefinition.sizeMin));
        if (parentSystemInfo.isAlpha == true) {
            planetSize = planetSize * parentSystemInfo.sizeDefinition.alphaFactor;
        }

        var thisPlanetType;
        if (parentSystemInfo.typeOfplanet == 999) {
            
            thisPlanetType = planetType[Math.floor(Math.random() * planetType.length)];
        }else{
            if (parentSystemInfo.typeOfplanet == 777) {
                do{
                    thisPlanetType = planetType[Math.floor(Math.random() * planetType.length)];
                }while(thisPlanetType.astroid != true)
            
            }else{
                thisPlanetType = planetType[parentSystemInfo.typeOfplanet];
            }              
        }
        
        //Disformation Ratio
        var disformation = {"x": 1, "y": 1, "z": 1};
        if (thisPlanetType.disform == true) {
            disformation = genDisformationRatio();
        }
        
        //Rotation
        var planetRotation = Quat.IDENTITY;
        if (thisPlanetType.rotation == "free") {
            planetRotation = Quat.fromVec3Degrees({"x": (Math.random() * 360), "y": (Math.random() * 360), "z": (Math.random() * 360)});    
        }
        if (thisPlanetType.rotation == "ortho") {
           planetRotation = Quat.fromVec3Degrees({"x": (90 * Math.floor((Math.random() * 4))), "y": (90 * Math.floor((Math.random() * 4))), "z": (90 * Math.floor((Math.random() * 4)))});
        }        
        
        //ICI ON GERE LE TYPE... qui va generé des entité different pour Shape and Model
        
        var marker = Entities.addEntity({
            "type": "Box",
            "name": planetName,
            "dimensions": {
                "x": planetSize * disformation.x,
                "y": planetSize * disformation.y,
                "z": planetSize * disformation.z
            },
            "position": planetPosition,
            "rotation": planetRotation,
            "renderWithZones": zoneslist,
            "color": {
                "red": 0.03,
                "green": 0.03,
                "blue": 0.03
            },
            "shape": "Cube"
        });
        
        planetNo = planetNo + 1;
        print("GENESIS: " + planetName + " (" + planetNo + ") GENERATED.");
        
    }
    
    print("PLANETAR GENESIS COMLETED!");
    print("GENESIS COMLETED!");
    
    function randomIntergerBetween(min, max) {  
        return Math.floor((Math.random() * (max - min + 1)) + min); 
    } 

    function randomFloatBetween(min, max) {  
        return (Math.random() * (max - min)) + min; 
    } 

    function GetAplanetarPosition(parentPos, parentDat) {
        
        var cx = parentPos.x;
        var cy = parentPos.y;
        var cz = parentPos.z;
        var distance, azimuth, elevation, x, y, z;

        distance = randomFloatBetween(parentDat.min, parentDat.max);
        azimuth = randomFloatBetween(parentDat.azimuthMin, parentDat.azimuthMax) * Math.PI / 180; //ENRICHED
        elevation = randomFloatBetween(parentDat.elevationMin, parentDat.elevationMax) * Math.PI / 180; //ENRICHED
        y = cy + (Math.sin(elevation) * distance);
        x = cx + (Math.sin(azimuth) * Math.cos(elevation) * distance);
        z = cz + (Math.cos(azimuth) * Math.cos(elevation) * distance);
            
        
        return {"x": x, "y": y, "z": z };
    }

    function genStellar(sys) {
        //#### generate SYS Zone ####
        var sysID = Entities.addEntity({
                "type": "Zone",
                "name": sys.name,
                "lifetime": PERSISTENCE,
                "position": sys.position,
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0,
                    "w": 1
                },
                "locked": true,
                "visible": true,
                "dimensions": {
                    "x": INTERSTELLAR_MIN_DIST_ALLOWED * 2,
                    "y": INTERSTELLAR_MIN_DIST_ALLOWED * 2,
                    "z": INTERSTELLAR_MIN_DIST_ALLOWED * 2
                },
                "canCastShadow": false,
                "grab": {
                    "grabbable": false
                },
                "shapeType": "box",
                "keyLightMode": "inherit",
                "ambientLightMode": "inherit",
                "skyboxMode": "inherit",
                "hazeMode": "inherit",
                "bloomMode": "inherit",
                "avatarPriority": "inherit",
                "screenshare": "inherit",    
                "ghostingAllowed": false,
                "flyingAllowed": true
                
            }); 
        
        return sysID;

    }
/*    
    function genCenterCoordinates(sysPosition, nbrCenter) {
        var range = STELLAR_PLANETAR_CONTAINER;
        if (nbrCenter == 1){
            range = 0;
        }
        var x = sysPosition.x + ((Math.random() * range * 2) - range);
        var y = sysPosition.y + ((Math.random() * range * 2) - range);
        var z = sysPosition.z + ((Math.random() * range * 2) - range);
        
        return {"x": x, "y": y, "z": z };
    }
*/    
    function shuffle(array){
        var shuffledArray = array;
        for (var i = shuffledArray.length - 1; i > 0; i--) {

            // pickup a random element
            var j = Math.floor(Math.random() * i);
            var temp = shuffledArray[i];

            // swap it with the current element
            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = temp;
        }
        return shuffledArray;
    }


    function generatePlanetName(){

        var voyelle = "aaaaaaaaaaaaaaaeeeeeeeeeeeeeeeiiiiiiiiiiiiiiiooooooooooooooouuuuuuuuuuuuuuuyyyyyyyyyyyyy";
        var voyelleFistLetter = "aaaaaaaaaaaaaaaeeeeeeeeeeeeeeeiiiiiiiiiiiiiiiooooooooooooooouuuuuuuuuuuuuuuyyyyyyyyyyyyy";
        var consonne = "bcdfghjklmnpqrstvwxz";

        var pattern = [
        "cvcvc",
        "vccvcv",
        "cvccvc",
        "vcv",
        "cvc",
        "cvcv",
        "vcvcv",
        "cvvc",
        "cvvcvvc",
        "cvcvvcv",
        "vcvcvvc",
        "cvcvccv",
        "vcvcv",
        "vcv",
        "cvc",
        "cvvc",
        "cvvcv",
        "cvvcvc",
        "cvcvcvvcv",
        "vcvcv",
        "cvcvvc",
        "cvvc"
        ];

        var namepat = pattern[Math.floor(Math.random() * pattern.length)];
        var name = "";	
        var curchar;
        for ( var i=0; i < namepat.length;i++){
            curchar = namepat.substr(i,1);
            if (curchar == "c"){
                name = name + consonne.substr(Math.floor(Math.random() * consonne.length),1);
            }else{
                if (i == 0){
                    name = name + voyelleFistLetter.substr(Math.floor(Math.random() * voyelleFistLetter.length),1);
                }else{
                    name = name + voyelle.substr(Math.floor(Math.random() * voyelle.length),1);
                }
                
            }
            
        }	
        
        name = capitalize(name);

        return name;
    }

    function capitalize(s){
        return s[0].toUpperCase() + s.slice(1);
    }

    function romanize(num) {
      var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
      for ( i in lookup ) {
        while ( num >= lookup[i] ) {
          roman += i;
          num -= lookup[i];
        }
      }
      return roman;
    }

    function greek(num){
        var greek = "";
        var letters = [
            "Alpha",
            "Beta",
            "Gamma",
            "Delta",
            "Epsilon",
            "Zeta",
            "Eta",
            "Theta",
            "Iota",
            "Kappa",
            "Lambda",
            "Mu",
            "Nu",
            "Xi",
            "Omicron",
            "Pi",
            "Rho",
            "Sigma",
            "Tau",
            "Upsilon",
            "Phi",
            "Khi",
            "Psi",
            "Omega"
        ];
        
        if (num > 24){
            greek = letters[num - 1 - 24] + " Minor";
        } else {
            greek = letters[num - 1];
        }
        
        return greek;
    }
   
})