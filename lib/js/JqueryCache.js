Modules.JqueryCache = (function JqueryCache(modules){
    
    const lookupOnLoad = false;
    
    
    const jqueryLookupStrings = {
        inputA: '#input_a',
        inputB: '#input_b',
        inputC: '#input_c',
        submitButton: '#submitButton',
    }

    
    
    
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
    
}(Modules));