MODULES.JqueryCache = (function JqueryCache(modules){
    'use strict';
    
    
    const lookupOnLoad = false;
    
    
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

    
    
    
    function stringToJquery(str){
        return $(str);
    }    
    
    function lookupStringsToJquery(){
        return _.mapObject(jqueryLookupStrings, stringToJquery);
    }
    
    
    
    
    function exporter(){
        return lookupStringsToJquery();
    }
    
    function main(){
        modules.Logger.moduleLoading("JqueryCache");
        
        // initializeCache();
        return exporter();
    }
    return main();
    
}(MODULES));