(function(){
    print("GENESIS STARTED!");
    var FACTOR = 1; //Real scale
    //var FACTOR = 0.001; //Miniature scale for overview
    var PERSISTENCE = -1;//90; //sec -1 is durable (lifetime)
    //=======================
    
    var STELLAR_MAX_SIZE = 1500;

    var INTER_STELLAR_DISTANCE = STELLAR_MAX_SIZE;

    var STELLAR_ZONE_SIZE = STELLAR_MAX_SIZE * 3;

    var MAX_VISIBILITY_IN_FOG = STELLAR_ZONE_SIZE / 2;

    var CONTAINER_SIZE = (7 * STELLAR_MAX_SIZE) + (2 * MAX_VISIBILITY_IN_FOG);    

    //============= Stellar type definition ================
    var stellarType = [
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS6000.glb",
            "rotation": "FREE",
            "unicity": "AT_LEAST_ONE"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS6001.glb",
            "rotation": "FREE",
            "unicity": "AT_LEAST_ONE"
        },        
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS6002.glb",
            "rotation": "FREE",
            "unicity": "AT_LEAST_ONE"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS7000.glb",
            "rotation": "FREE",
            "unicity": "ONLY_ONE_IN_27"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS7001.glb",
            "rotation": "FREE",
            "unicity": "ONLY_ONE_IN_27"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS7002.glb",
            "rotation": "FREE",
            "unicity": "ONLY_ONE_IN_27"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS7003.glb",
            "rotation": "FREE",
            "unicity": "ONLY_ONE_IN_27"
        },
        {
            "modelUrl": "http://metaverse.bashora.com/objects/HYTRION/SYS/SYS7004.glb",
            "rotation": "FREE",
            "unicity": "ONLY_ONE_IN_27"
        }        
    ];
    
    //Reserving for specific system
        //loop in Stellar type and preassign them in a vector
    var reservations = [];
    for (var jx = 0; jx < 7; jx++ ) {
        for (var jy = 0; jy < 7; jy++ ) {
            for (var jz = 0; jz < 7; jz++ ) {
                reservations[(jx * 49) + (jy * 7) + jz] = -1;
            }
        }
    }
    print("RESERVATIONS BOOK READY!");
    var sysx, sysy, sysz;
    for (var i = 0; i < stellarType.length; i++ ){
        do {
            if (stellarType[i].unicity == "ONLY_ONE_IN_27") {
                sysx = Math.floor(Math.random() * 5)+1;
                sysy = Math.floor(Math.random() * 5)+1;
                sysz = Math.floor(Math.random() * 5)+1;
            } else {
                sysx = Math.floor(Math.random() * 7);
                sysy = Math.floor(Math.random() * 7);
                sysz = Math.floor(Math.random() * 7);
            }
        } while (reservations[(sysx * 49) + (sysy * 7) + sysz] != -1)
        reservations[(sysx * 49) + (sysy * 7) + sysz] = i;  
    }
        
    print("RESERVATIONS COMPLETED!");
    //##############################
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

    

    do {
        stellarNamesDictionary.push(generatePlanetName());
    } while (stellarNamesDictionary.length < 350)
    
    stellarNames = shuffle(stellarNamesDictionary);
    
    print("BIG BANG INITATED!");
    
    var position, name, star, ieme;
    var counter = 0;
    for (var zoneX = -3; zoneX < 4; zoneX++){
        for (var zoneY = -3; zoneY < 4; zoneY++){
            for (var zoneZ = -3; zoneZ < 4; zoneZ++){
                print("GENERATING SYSTEM NO: " + (((zoneX + 3) * 49) + ((zoneY + 3) * 7) + (zoneZ + 3)));
                position = {"x": (zoneX * INTER_STELLAR_DISTANCE), "y": (zoneY * INTER_STELLAR_DISTANCE), "z": (zoneZ * INTER_STELLAR_DISTANCE)};

                name = stellarNames[counter];
                
                star = {
                    "name": name,
                    "position": position,
                    "systype": -1,
                    "zoneId": Uuid.NULL
                    };
                    
                //Generate Zone
                star.zoneId = genStellarZone(star);
                
                //Generate the stellar
                if (reservations[((zoneX + 3) * 49) + ((zoneY + 3) * 7) + (zoneZ + 3)] == -1){
                    print("DO ENTERING");
                    do {
                        ieme = Math.floor(Math.random() * stellarType.length);
                        if (stellarType[ieme].unicity == "AT_LEAST_ONE"){
                            star.systype = ieme;
                        }
                    } while (star.systype == -1)
                    print("DO EXITED");    
                } else {
                    star.systype = reservations[((zoneX + 3) * 49) + ((zoneY + 3) * 7) + (zoneZ + 3)];
                }
                
                //generate a stellar entity
                generateConstellation(star);
                
                
                print("SYSTEM '" + name + "' ("+ (((zoneX + 3) * 49) + ((zoneY + 3) * 7) + (zoneZ + 3)) + ") COMPLETED.");
                counter = counter + 1;

            }                           
        }           
    }
    
    print("SYSTEM GENESIS COMLETED!");
    
    function generateConstellation(systemInfo){
        print("GENERATING SYSTEM PHYSICALLY");
        //Rotation
        var rotationMode = stellarType[systemInfo.systype].rotation;
        
        var planetRotation = Quat.IDENTITY;
        if (rotationMode == "FREE") {
            planetRotation = Quat.fromVec3Degrees({"x": (Math.random() * 360), "y": (Math.random() * 360), "z": (Math.random() * 360)});    
        }
        if (rotationMode == "ORTHO") {
           planetRotation = Quat.fromVec3Degrees({"x": (90 * Math.floor((Math.random() * 4))), "y": (90 * Math.floor((Math.random() * 4))), "z": (90 * Math.floor((Math.random() * 4)))});
        }        

        var thisPlanetID;
        thisPlanetID = Entities.addEntity({
            "type": "Model",
            "name": systemInfo.name,
            "position": systemInfo.position,
            "rotation": planetRotation,
            "renderWithZones": [systemInfo.zoneId],
            "modelURL": stellarType[systemInfo.systype].modelUrl,
            "shapeType": "static-mesh",
            "canCastShadow": true,
            "lifetime": PERSISTENCE,
            "grab": {
                "grabbable": false
            }
        });
        
        sleep(1000);
        
        var attrib = Entities.getEntityProperties(thisPlanetID, ["naturalDimensions"]);
        print(thisPlanetID + " = " + JSON.stringify(attrib.naturalDimensions));

        
        var max = attrib.naturalDimensions.x;
        if (attrib.naturalDimensions.y > max) {max = attrib.naturalDimensions.y;}
        if (attrib.naturalDimensions.z > max) {max = attrib.naturalDimensions.z;}
        var scaleFactor = STELLAR_MAX_SIZE / max;
        
        Entities.editEntity(thisPlanetID, {
            "dimensions": {
                "x": attrib.naturalDimensions.x * scaleFactor,
                "y": attrib.naturalDimensions.y * scaleFactor,
                "z": attrib.naturalDimensions.z * scaleFactor
            },                    
            "locked": true
        });

        
    }    


    print("=========================");
    print("STELLAR GENESIS COMLETED!");
    print("-------------------------");
    print("HYTRION ZONE MUST BE A CUBE OF THIS DIMENSION: " + CONTAINER_SIZE);
    print("MAXIMUM FOG RANGE MUST BE: " + MAX_VISIBILITY_IN_FOG); 
    print("GENESIS COMLETED!");
    print("#########################");
    
    function sleep(milliseconds) {
            var date = Date.now();
            var currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    
    function randomIntergerBetween(min, max) {  
        return Math.floor((Math.random() * (max - min + 1)) + min); 
    } 

    function randomFloatBetween(min, max) {  
        return (Math.random() * (max - min)) + min; 
    } 


    function genStellarZone(sys) {
        var sysID = Entities.addEntity({
                "type": "Zone",
                "name": "SYS_ZONE_" + sys.name,
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
                    "x": STELLAR_ZONE_SIZE,
                    "y": STELLAR_ZONE_SIZE,
                    "z": STELLAR_ZONE_SIZE
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

})