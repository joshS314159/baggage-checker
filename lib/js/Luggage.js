MODULES.Luggage = (function Luggage($$, logger, modules){
    'use strict';
    
    
    
    const { dimensions, volumes } = modules.LuggageDimensions;
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    const { updateVolumes, calculatedVolumeFromInput } = modules.DomWriter;
    

    
    const sortFloat = function sortFloat(arr){
        return arr.sort((a,b) => a-b);
    }
    
    
    const filterByDimensions = function filterByDimensions(){
        const userDimensions = sortFloat(getInputDimensions());
        const sortedDimensions = _.map(dimensions, sortFloat);
        const compareWithInput = _.partial(_.compare, userDimensions);
        
        const result = _.groupBy(dimensions, compareWithInput);
        logger.log(result);
        return result;
        
        
        
    }
    

    
    
    const filterByVolume = function filterByVolume(){
        const userVolume = getInputVolume();
        const compareWithInput = _.partial(_.compare, userVolume);
        
        return _.groupBy(volumes, compareWithInput);
    }


    
    const submitResponder = function submitResponder(e){
        const filteredVolumes = filterByVolume();
        updateVolumes(filteredVolumes);
        calculatedVolumeFromInput(getInputVolume());
        filterByDimensions();
    }
    
    
    const stopEventBubbling = function stopEventBubbling(event, responder){
        logger.info("event: stopping bubbling");
        event.preventDefault();
        event.stopPropagation();
        responder();
    }
    
    
    const initializeListeners = function initializeListeners(){
        $$.submitButton.click(_.partial(stopEventBubbling, _, submitResponder));
    }
    
    const initialize = function initialize(){
        initializeListeners();
        // return parseDimensions(dimensions);
    }


    const exporter = function exporter(){
        return {
            // parseResults: initialize()
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("Luggage");
        initialize();
        return exporter();
    }
    return main();
    
    
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));

