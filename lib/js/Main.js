(function Main($$, logger, modules){
    'use strict';
    
    const { getRawLiterVolumes, 
            // getRawInchDimensions, 
            getAirlineInchDimensions,
            getAirlineLiterVolumes, } = modules.LuggageData;
                
    const { getInputDimensions, getInputVolume } = modules.DomReader;
    
    const { updateVolumes, calculatedVolumeFromInput } = modules.VolumeResultsWriter;
    
    const { updateDimensions } = modules.DimensionResultsWriter;
    

    
    const sortFloat = function sortFloat(arr){
        return arr.sort((a,b) => a-b);
    }
    
    
    const filterByDimension = function filterByDimensions(){
        const compareWithInput = _.partial( _.compare, getInputDimensions() );
        const airlineDimensions = getAirlineInchDimensions();

        return _.chain(airlineDimensions)
                .pluck('inches')
                .map(sortFloat)
                .map(compareWithInput)
                .zip(airlineDimensions)
                .value();
    }
    

    
    
    const filterByVolume = function filterByVolume(){
        const compareWithInput = _.partial( _.compare, getInputVolume() );
        const airlineVolumes = getAirlineLiterVolumes();
        
        return _.chain(airlineVolumes)
                .pluck('litres')
                .map(compareWithInput)
                .zip(airlineVolumes)
                .value();
    }
    
    
    const filterAndUpdateVolumes = function filterAndUpdateVolumes(){
        updateVolumes( filterByVolume() );
    }
    
    const filterAndUpdateDimensions = function filterAndUpdateDimensions(){
        updateDimensions( filterByDimension() );       
    }
    
    

    
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