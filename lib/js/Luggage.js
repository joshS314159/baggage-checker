MODULES.Luggage = (function Luggage($$, modules){
    
    const l = console.log;
    
    
    const { dimensions, volumes } = modules.LuggageDimensions;
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    const { updateVolumes, calculatedVolumeFromInput } = modules.DomWriter;
    const logger = modules.Logger;
    

    const myLuggage = [10,10,9].sort(sortFloat);
    
    function sortFloat(a,b){
        return a - b;
    }
    
    function sort(arr){
        return arr.sort(sortFloat);
    }
    
    
    function isUnderSize(l){
        return  (myLuggage[0] < l[0]) && 
                (myLuggage[1] < l[1]) && 
                (myLuggage[2] < l[2]);
    }
    
    
    function isUnderVolume(){
        return 
    }
    
    
    function addDimensions(){
        
    }
    
    
    function filterByVolume(){
        const userVolume = getInputVolume();
        const compareWithInput = _.partial(_.compare, userVolume);
        
        return _.groupBy(volumes, compareWithInput);
    }


    
    function submitResponder(e){
        const filteredVolumes = filterByVolume();
        updateVolumes(filteredVolumes);
        calculatedVolumeFromInput(getInputVolume());
    }
    
    
    function stopEventBubbling(event, responder){
        console.info("event: stopping bubbling");
        event.preventDefault();
        event.stopPropagation();
        responder();
    }
    
    
    function initializeListeners(){
        $$.submitButton.click(_.partial(stopEventBubbling, _, submitResponder));
    }
    
    function initialize(){
        initializeListeners();
        // return parseDimensions(dimensions);
    }


    function exporter(){
        return {
            // parseResults: initialize()
        };
    }
    
    
    function main(){
        logger.moduleLoading("Luggage");
        initialize();
        return exporter();
    }
    return main();
    
    
    
    
}(MODULES.JqueryCache, MODULES));

