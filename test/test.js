(function() {


	function onWebEventReceived(entityID, message){   
		if (entityID == ThisWebEntity){
            print("Received Web Event form entity "+ entityID +" : " + message);
		}
	}


	
	this.preload = function(entityID) {
		ThisWebEntity = entityID;
        Entities.webEventReceived.connect(onWebEventReceived);
	};
	
	this.unload = function(entityID) {
		Entities.webEventReceived.disconnect(onWebEventReceived);
	};	
	
});