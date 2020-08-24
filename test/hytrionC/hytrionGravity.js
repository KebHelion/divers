//#####################
// HYTRION GRAVITY
// Alezia Kurdis
// August 2020.
//#####################
(function(){ 
    var isInitiated = false;
    var DEGREES_TO_RADIANS = Math.PI / 180.0;
    var HALF = 0.5;
    var UPDATE_TIMER_INTERVAL = 1500; // 1.5 sec 
    var processTimer = 0;
    
    var gravityCenter;
    var hmdMode = HMD.active;
    
    this.preload = function(entityID) {
        if (!isInitiated){
            if (positionIsInsidetheSphere(entityID, MyAvatar.position)) {
                initiate(entityID);
            }
        }       
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

    HMD.displayModeChanged.connect(function(isHMDMode) {
        hmdMode = isHMDMode;
    });    
    
    function myTimer(deltaTime) {
        var today = new Date();
        if ((today.getTime() - processTimer) > UPDATE_TIMER_INTERVAL ) {
            updateGravity();
            today = new Date();
            processTimer = today.getTime();
        }  
    }

    function shutdown() {
        if (!isInitiated){
            Script.update.disconnect(myTimer);
            //End effect
            MyAvatar.orientation = Quat.fromVec3Degrees({
                "x": 0,
                "y": 0,
                "z": 0
            });
            isInitiated = false;
        }
    }

    function initiate(EntID) {
        var properties = Entities.getEntityProperties(EntID, ["position", "dimensions"]);
        gravityCenter = properties.position;

        isInitiated = true; 
        updateGravity();
        
		var today = new Date();
        processTimer = today.getTime();
        Script.update.connect(myTimer);        
    }
    
    function updateGravity() {
        if (!isInitiated){

            var direction = Vec3.subtract(MyAvatar.position, gravityCenter);
            var localUp = Quat.getUp(MyAvatar.orientation);
            MyAvatar.orientation = Quat.normalize(Quat.multiply(Quat.rotationBetween(localUp, direction), MyAvatar.orientation)); 
            if (hmdMode == false) {
                Camera.mode = "third person";
            } else {
                Camera.mode = "first person look at";
            }           

        }
    } 

    function positionIsInsidetheSphere(entityID, targetPosition) {
        targetPosition = targetPosition || MyAvatar.position;
        var properties = Entities.getEntityProperties(entityID, ["position", "dimensions"]);
        var entityPosition = properties.position;
        var entityDimensions = properties.dimensions;
        var distance = Vec3.distance(targetPosition, entityPosition);
        if (distance < (entityDimensions.x * HALF)) {
            return true;
        } else {
            return false;
        }
    }

})