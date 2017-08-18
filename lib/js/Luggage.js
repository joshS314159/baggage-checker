MODULES.Luggage = (function Luggage($$, logger, modules){
    'use strict';
    
    
    
    

    
    const { getRawLiterVolumes, getRawInchDimensions } = modules.LuggageData;
    
        console.log("LUGG DIM : ", getRawInchDimensions())
    
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    const { updateVolumes, calculatedVolumeFromInput } = modules.VolumeResultsWriter;
    const { updateDimensions } = modules.DimensionResultsWriter;
    

    
    const sortFloat = function sortFloat(arr){
        return arr.sort((a,b) => a-b);
    }
    
    
    const filterByDimension = function filterByDimensions(){
        const userDimensions = sortFloat(getInputDimensions());
        const sortedDimensions = _.map(getRawInchDimensions(), sortFloat);
        const compareWithInput = _.partial(_.compare, userDimensions);
        
        return _.groupBy(getRawInchDimensions(), compareWithInput);
    }
    

    
    
    const filterByVolume = function filterByVolume(){
        const userVolume = getInputVolume();
        const compareWithInput = _.partial(_.compare, userVolume);
        
        return _.groupBy(getRawLiterVolumes(), compareWithInput);
    }
    
    

    
    const submitResponder = function submitResponder(e){
        const filteredVolumes = filterByVolume();
        updateVolumes(filteredVolumes);
        
        calculatedVolumeFromInput(getInputVolume());
        
        
        const filterDimensions = filterByDimension();
        updateDimensions(filterDimensions);
    }
    
    
    const stopEventBubbling = function stopEventBubbling(event, responder){
        logger.debug("event: stopping bubbling");
        event.preventDefault();
        event.stopPropagation();
        responder();
    }
    
    
    const initializeListeners = function initializeListeners(){
        $$.submitButton.click(_.partial(stopEventBubbling, _, submitResponder));
    }
    
    const initialize = function initialize(){
        initializeListeners();
        // return parseDimensions(getRawInchDimensions());
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

