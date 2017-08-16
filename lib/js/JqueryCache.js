MODULES.JqueryCache = (function JqueryCache(logger, modules){
    'use strict';

    const jqueryLookupStrings = {
        inputA: '#input_a',
        inputB: '#input_b',
        inputC: '#input_c',
        submitButton: '#submitButton',
        luggageVolumeUndersizeResult: '#luggage_volume_undersize_results',
        luggageVolumeOversizeResult: '#luggage_volume_oversize_results',
        luggageVolumeEqualsizeResult: '#luggage_volume_equals_results',
        userInputVolume: '#user_input_volume'
    };

    
    
    
    const stringToJquery = function stringToJquery(str){
        return $(str);
    }    
    
    const lookupStringsToJquery = function lookupStringsToJquery(){
        return _.mapObject(jqueryLookupStrings, stringToJquery);
    }
    
    
    
    
    const exporter = function exporter(){
        return lookupStringsToJquery();
    }
    
    const main = function main(){
        logger.moduleLoad("JqueryCache");
        
        // initializeCache();
        return exporter();
    }
    return main();
    
}(MODULES.Logger, MODULES));