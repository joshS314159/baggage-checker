(function Main($$, logger, modules){
    'use strict';
    
    const { getRawLiterVolumes, 
            // getRawInchDimensions, 
            getAirlineInchDimensions,
            getAirlineLiterVolumes, } = modules.LuggageData;
                
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    
    const { updateVolumes, calculatedVolumeFromInput } = modules.VolumeResultsWriter;
    
    const { updateDimensions } = modules.DimensionResultsWriter;
    
    
    const subtract = (a,b) => a-b;

    const sortFloat = (arr) => arr.sort(subtract);
    
    const compareWithInput = (inputFn, b) => _.compare(inputFn(), b);
    
    const compareWithInputByDimensions = _.partial(compareWithInput, getInputDimensions, _);
    
    const compareWithInputByVolume = _.partial(compareWithInput, getInputVolume, _ );

                
    const filterByDimension = (airlineDimensions) =>  _.chain(airlineDimensions)
                                .pluck('inches')
                                .map(sortFloat)
                                .map(compareWithInputByDimensions)
                                .zip(airlineDimensions)
                                .value();
    
    const filterByVolume = (airlineVolumes) => _.chain(airlineVolumes)
                            .pluck('litres')
                            .map(compareWithInputByVolume)
                            .zip(airlineVolumes)
                            .value();
    
    
    const filterAndUpdateVolumes = _.compose(updateVolumes, filterByVolume, getAirlineLiterVolumes);
    
    const filterAndUpdateDimensions = _.compose(updateDimensions, filterByDimension, getAirlineInchDimensions);
    

    
    const submitResponder = function submitResponder(){
        filterAndUpdateVolumes();
        filterAndUpdateDimensions();
        calculatedVolumeFromInput(getInputVolume());
    }
    
    
    const stopEventBubbling = function stopEventBubbling(event, responder){
        logger.debug("event: stopping bubbling");
        event.preventDefault();
        event.stopPropagation();
    }
    
    
    const safeSubmitResponder = _.wrap(submitResponder, (func, event) => {
        stopEventBubbling(event);
        func();
    });
    
    
    const initializeListeners = function initializeListeners(){
        
        $$.submitButton.click(safeSubmitResponder);
            
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