//#####################
// HYTRION NAVIGATOR AND AMBIENT UNIVERSE SOUND
// Alezia Kurdis
// August 2020.
//#####################
(function(){ 
    var isInitiated = false;
    var universeDimension;
    var DEGREES_TO_RADIANS = Math.PI / 180.0;
    var HALF = 0.5;
    var UPDATE_TIMER_INTERVAL = 1000; // 1 sec 
    var processTimer = 0;

    var astrolithID = Uuid.NULL;
    var ASTROLITH_URL = "http://metaverse.bashora.com/scripts/hytrion_cloud/ASTROLITHE.png";
    
    var AIR_SOUND = "http://metaverse.bashora.com/scripts/hytrion_cloud/air.mp3";
    var airSound, injector;    
    var playing = 0;

    var UNIVERSE_SOUND = "http://metaverse.bashora.com/explore/limboAmbience.mp3"; //COPY IT LOCALLY ????????
    var UNIVERSE_SOUND_VOLUME_MAXIMUM = 0.2;
    var universeSound, universeSoundInjector;
    var univerSoundPlaying = 0;
    var blindspots = [
        {
            "name": "DEMO",
            "position": {
                "x": 0,
                "y": 10,
                "z": 5,
             },
            "occultationRadius": 40,
            "influenceRadius": 150
        }
    ];
    
   
    this.preload = function(entityID) {
        if (!isInitiated){
            if (positionIsInsideEntityBounds(entityID, MyAvatar.position)) {
                initiate(entityID);
            }
        }       
        airSound = SoundCache.getSound(AIR_SOUND);
        universeSound = SoundCache.getSound(UNIVERSE_SOUND);        
    };

    this.enterEntity = function(entityID) {
        if (!isInitiated){
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
            updateNavigation();
            today = new Date();
            processTimer = today.getTime();
        }  
    }

    function shutdown() {
        if (!isInitiated){
            Script.update.disconnect(myTimer);
            if (astrolithID != Uuid.NULL){
                Entities.deleteEntity(astrolithID);
                astrolithID = Uuid.NULL;
            }
            universeSoundInjector.stop();
        }
    }

    function initiate(EntID) {
        var properties = Entities.getEntityProperties(EntID, ["position", "dimensions"]);
        universeCenter = properties.position;
        universeDimension = properties.dimensions;

        isInitiated = true; 
 
        univerSoundPlaying = 0;
        
		var today = new Date();
        processTimer = today.getTime();
        Script.update.connect(myTimer);        
    }
    
    function updateNavigation() {
        if (!isInitiated){
            var myAvPos = MyAvatar.position;

            edgeOfUniverse();        

            var myVelocity = Vec3.length(MyAvatar.velocity);
            
            if (myVelocity > 10) {
                if (playing == 0){
                    injector = Audio.playSound(airSound, {
                        "loop": true,
                        "localOnly": true,
                        "volume": (myVelocity - 10)/50
                        });
                    playing = 1;
                } else {
                    //Audate volume
                    injector.setOptions({"volume": (myVelocity - 10)/50});
                }
            } else {
                if (playing != 0) {
                    injector.stop();
                    playing = 0;
                }
            }
      
            var myAvRot = MyAvatar.orientation;            
            var distanceAstrolith = 65;
            var radiusEffect = 50;//70; 
            if (myVelocity > 25){
                if (astrolithID == Uuid.NULL){
                    //Generate
                    astrolithID = Entities.addEntity({
                        "type": "ParticleEffect",
                        "name": "ASTROLITHES",
                        "dimensions": {
                            "x": radiusEffect,
                            "y": radiusEffect,
                            "z": radiusEffect
                        },
                        "position": Vec3.sum(myAvPos, Vec3.multiply( Vec3.normalize(MyAvatar.velocity), distanceAstrolith )),//Vec3.sum(myAvPos, Vec3.multiplyQbyV(myAvRot, { x: 0, y: 0, z: -distanceAstrolith })),
                        "rotation": myAvRot,
                        "grab": {
                            "grabbable": false
                        },
                        "shapeType": "ellipsoid",
                        "textures": ASTROLITH_URL,
                        "maxParticles": 1000,
                        "lifespan": 3,
                        "emitRate": 330,
                        "emitSpeed": 1,
                        "speedSpread": 1,
                        "emitOrientation": {
                            "x": 0,
                            "y": 0,
                            "z": 0,
                            "w": 1
                        },
                        "emitDimensions": {
                            "x": radiusEffect,
                            "y": radiusEffect,
                            "z": radiusEffect
                        },
                        "polarStart": 0,
                        "polarFinish": Math.PI,
                        "azimuthStart": -Math.PI,
                        "azimuthFinish": Math.PI,
                        "emitAcceleration": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "particleRadius": 0.2,
                        "radiusStart": 0.4,
                        "radiusFinish": 0.1,
                        "colorStart": {
                            "red": 255,
                            "green": 255,
                            "blue": 255
                        },
                        "colorFinish": {
                            "red": 255,
                            "green": 255,
                            "blue": 255
                        },
                        "alphaStart": 1,
                        "alpha": 1,
                        "alphaFinish": 0,
                        "emitterShouldTrail": true                        
                    }, "local");
                }else{
                    //Move it
                    Entities.editEntity(astrolithID, {"rotation": myAvRot, 
                        "position": Vec3.sum(myAvPos, Vec3.multiply( Vec3.normalize(MyAvatar.velocity), distanceAstrolith )) //Vec3.sum(myAvPos, Vec3.multiplyQbyV(myAvRot, { x: 0, y: 0, z: -distanceAstrolith }))
                        });
                }
            }else{
                if (astrolithID != Uuid.NULL){
                    //Delete it
                    Entities.deleteEntity(astrolithID);
                    astrolithID = Uuid.NULL;
                }
            }
            
            //######### UNIVERSE SOUD VOLUME MANAGEMENT ##############
            var universeVolume = UNIVERSE_SOUND_VOLUME_MAXIMUM;
            if (blindspots.length !== 0) {
                var volumeEval, distEval;
                for (var b = 0; b < blindspots.length; b++) {
                    distEval = Vec3.distance(blindspots[b].position, myAvPos);
                    volumeEval = universeVolume * ((distEval - blindspots[b].occultationRadius)/(blindspots[b].influenceRadius - blindspots[b].occultationRadius));
                    if (volumeEval < 0) { 
                        volumeEval = 0;
                    }
                    if (universeVolume > volumeEval) { 
                        universeVolume = volumeEval; 
                    }
                }
            }
            if (univerSoundPlaying == 1) {
                if (universeVolume > 0) {
                    universeSoundInjector.setOptions({"volume": universeVolume});
                } else {
                    universeSoundInjector.stop();
                    univerSoundPlaying = 0;
                }
            } else {
                if (universeVolume > 0) {
                    universeSoundInjector = Audio.playSound(universeSound, {
                            "loop": true,
                            "localOnly": true,
                            "volume": universeVolume;
                            });
                    univerSoundPlaying = 1;
                }   
            }
            // ######### END UNIVERSE SOUD VOLUME MANAGEMENT ########
        }
    } 

    function edgeOfUniverse() {
            //INFINIT AREA
            var myPosition = MyAvatar.position;
            var myRotation = MyAvatar.orientation;
            var isInTheEdge = 0;

            if (myPosition.x > universeCenter.x + (universeDimension.x/2) - 100) {
                myPosition.x = universeCenter.x - (universeDimension.x/2) + 101;
                isInTheEdge = 1;
            } else {
                if (myPosition.x < universeCenter.x - (universeDimension.x/2) + 100) {
                    myPosition.x = universeCenter.x + (universeDimension.x/2) - 101;
                    isInTheEdge = 1;
                }
            }
            if (myPosition.y > universeCenter.y + (universeDimension.y/2) - 100) {
                myPosition.y = universeCenter.y - (universeDimension.y/2) + 101;
                isInTheEdge = 1;
            } else {
                if (myPosition.y < universeCenter.y - (universeDimension.y/2) + 100) {
                    myPosition.y = universeCenter.y + (universeDimension.y/2) - 101;
                    isInTheEdge = 1;
                }
            }
            if (myPosition.z > universeCenter.z + (universeDimension.z/2) - 100) {
                myPosition.z = universeCenter.z - (universeDimension.z/2) + 101;
                isInTheEdge = 1;
            } else {
                if (myPosition.z < universeCenter.z - (universeDimension.z/2) + 100) {
                    myPosition.z = universeCenter.z + (universeDimension.z/2) - 101;
                    isInTheEdge = 1;
                }
            }

            if (isInTheEdge == 1) {
                MyAvatar.goToLocation( myPosition, true, myRotation);
            }
        
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