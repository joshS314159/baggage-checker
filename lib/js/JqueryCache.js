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
                undersizeResult: '#luggage_volume_undersize_results',
                oversizeResult: '#luggage_volume_oversize_results',
                equalsizeResult: '#luggage_volume_equals_results',
            },
            dimensions: {
                airlineName: '#luggage_dimensions_airline_name',
                undersizeResult: '#luggage_dimensions_undersize_results',
                oversizeResult: '#luggage_dimensions_oversize_results',
                equalsizeResult: '#luggage_dimensions_equals_results',
            },
        },
        userInputVolume: '#user_input_volume'
    }
    
    

    const lookupStringToJquery = function lookupStringToJquery(value, key){
        return _.isObject(value) ? lookupStringsToJquery(value) : $(value);
    }



    const lookupStringsToJquery = function lookupStringsToJquery(strings){
        return _.mapObject(strings, lookupStringToJquery);
    }
    

    
    const exporter = function exporter(){
        return lookupStringsToJquery(jqueryLookupStrings);
    }
    
    const main = function main(){
        logger.moduleLoad("JqueryCache");
        
        // initializeCache();
        return exporter();
    }
    return main();
    
}(MODULES.Logger, MODULES, _));


