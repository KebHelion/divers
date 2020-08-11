//  AK_planetar_gravity.js
//
//  By Alezia Kurdis, June 2019.
//  Inpired from: gravity.js created by Alan-Michael Moody on july 24th 2017, (Apache License 2.0) Copyright 2017 High Fidelity, Inc.
//
//  Set a gravitational field (spheric) around any entity, so you can walk on this entity.
//  (The field is effective up to 1.2 its radius). 
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
(function() {

    var _entityID;
    var processInterval = null; 
    var gravityStatus = 0;
    
    this.preload = function (entityID) {
        _entityID = entityID;
        checkGravityField();
        var processInterval = Script.setInterval(function() {
            checkGravityField();
        }, 2000); //2 sec            
    };

    this.unload = function (entityID) {
        if (gravityStatus === 1) {
            clean();
        }
        if(processInterval !== null) {
            Script.clearInterval(processInterval);
        } 
    };

    function update(deltatime) {
        var planet = Entities.getEntityProperties(_entityID);
        var direction = Vec3.subtract(MyAvatar.position, planet.position);
        var localUp = Quat.getUp(MyAvatar.orientation);
        MyAvatar.orientation = Quat.normalize(Quat.multiply(Quat.rotationBetween(localUp, direction), MyAvatar.orientation));            
        if (!AvatarInputs.isHMD) {
            Camera.mode = "third person";
        }
        gravityStatus = 1;
    }

    function init() {
        Script.update.connect(update);
    }

    function clean() {
        Script.update.disconnect(update);
        MyAvatar.orientation = Quat.fromVec3Degrees({
            "x": 0,
            "y": 0,
            "z": 0
        });
        gravityStatus = 0;
    }

    function checkGravityField() {
        var myPlanet = Entities.getEntityProperties(_entityID);
        var planetGravityFieldRadius = ((myPlanet.dimensions.x/2)* 1.20) + 10;
        if (Vec3.distance(myPlanet.position, MyAvatar.position) <== planetGravityFieldRadius){
            if (gravityStatus === 0){
                init();    
            }
        }else{
            if (gravityStatus === 1){
                clean();
            }
        }
    }

    Script.scriptEnding.connect(clean);
});