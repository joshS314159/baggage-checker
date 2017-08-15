MODULES.Luggage = (function Luggage($$, modules){
    'use strict';
    
    
    const l = console.log;
    
    
    const { dimensions, volumes } = modules.LuggageDimensions;
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    const { updateVolumes, calculatedVolumeFromInput } = modules.DomWriter;
    const logger = modules.Logger;
    

    
    function sortFloat(arr){
        return arr.sort((a,b) => a-b);
    }
    
    
    function filterByDimensions(){
        const userDimensions = sortFloat(getInputDimensions());
        const sortedDimensions = _.map(dimensions, sortFloat);
        const compareWithInput = _.partial(_.compare, userDimensions);
        
        const result = _.groupBy(dimensions, compareWithInput);
        console.log(result);
        return result;
        
        
        
    }
    

    
    
    function filterByVolume(){
        const userVolume = getInputVolume();
        const compareWithInput = _.partial(_.compare, userVolume);
        
        return _.groupBy(volumes, compareWithInput);
    }


    
    function submitResponder(e){
        // const filteredVolumes = filterByVolume();
        // updateVolumes(filteredVolumes);
        // calculatedVolumeFromInput(getInputVolume());
        const t1 = performance.now();
        filterByDimensions();
        const t2 = performance.now();
        console.log(t2-t1, "ms");
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

