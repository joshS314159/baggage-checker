MODULES.JqueryCache = (function JqueryCache(logger, modules, _){
    'use strict';

    const jqueryLookupStrings = {
        inputA: '#input_a',
        inputB: '#input_b',
        inputC: '#input_c',
        submitButton: '#submitButton',
        luggage: {
            volume: {
                airlineName: '#luggage_volume_airline_name',
                airlineVolume: '#luggage_volume_airline_volume',
                undersizeResult: '#luggage_volume_undersize_results',
                oversizeResult: '#luggage_volume_oversize_results',
                equalsizeResult: '#luggage_volume_equals_results',
            },
            dimensions: {
                airlineName: '#luggage_dimensions_airline_name',
                airlineDimensions: '#luggage_volume_airline_dimensions',
                undersizeResult: '#luggage_dimensions_undersize_results',
                oversizeResult: '#luggage_dimensions_oversize_results',
                equalsizeResult: '#luggage_dimensions_equals_results',
            },
        },
        userInputVolume: '#user_input_volume'
    }
    
    

    const lookupStringToJquery = (value, key) => 
        _.isObject(value) ? lookupStringsToJquery(value) : $(value);



    const lookupStringsToJquery = (strings) => 
        _.mapObject(strings, lookupStringToJquery);
    

    
    const exporter = () =>
        lookupStringsToJquery(jqueryLookupStrings);
    
    const main = () => {
        logger.moduleLoad("JqueryCache");
        
        // initializeCache();
        return exporter();
    }
    return main();
    
}(MODULES.Logger, MODULES, _));


