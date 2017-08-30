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

    const sortFloat = (arr) => 
        arr.sort(subtract);
    
    const compareWithInput = (inputFn, b) => 
        _.compare(inputFn(), b);
    
    const compareWithInputByDimensions = 
        _.partial(compareWithInput, getInputDimensions, _);
    
    const compareWithInputByVolume = 
        _.partial(compareWithInput, getInputVolume, _ );

                
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
    
    
    const filterAndUpdateVolumes = _.compose(
                                        updateVolumes, 
                                        filterByVolume,                                                                 getAirlineLiterVolumes);
    
    
    const filterAndUpdateDimensions = _.compose(
                                        updateDimensions, 
                                        filterByDimension, 
                                        getAirlineInchDimensions);
    

    
    const submitResponder = () => {
        filterAndUpdateVolumes();
        filterAndUpdateDimensions();
        calculatedVolumeFromInput(getInputVolume());
    }
    
    
    const stopEventBubbling = (event, responder) => {
        logger.debug("event: stopping bubbling");
        event.preventDefault();
        event.stopPropagation();
    }
    
    
    
    const safeSubmitResponder = (event) => {
        stopEventBubbling(event);
        submitResponder();
    }
    
    
    
    const initializeListeners = () => {
        
        $$.submitButton.click(safeSubmitResponder);
            
    }
    
    const initialize = () => {
        initializeListeners();
        // return parseDimensions(getRawInchDimensions());
    }


    const exporter = () => ({});
    
    const main = () => {
        logger.moduleLoad("Luggage");
        initialize();
        return exporter();
    }
    return main();
    
        
        
}(MODULES.JqueryCache, MODULES.Logger, MODULES));