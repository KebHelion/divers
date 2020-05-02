(function() {


	function onWebEventReceived(entityID, message){   

            print("Received Web Event form entity "+ entityID +" : " + message);

	}


	
	this.preload = function(entityID) {

        Entities.webEventReceived.connect(onWebEventReceived);
	};
	
	this.unload = function(entityID) {
		Entities.webEventReceived.disconnect(onWebEventReceived);
	};	
	
});