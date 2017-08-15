
const MODULES = (function MODULES(){
    'use strict';
    
    const modules = Object.seal({
        Logger: null,
        Luggage: null,
        LuggageDimensions: null,
        LuggageParser: null,
        JqueryCache: null,
        DomWriter: null,
        DomReader: null,
        Globals: null,
        DimensionScraper: null,
        Requester: null,
    });
    
    function exporter(){
        return modules;
    }
    
    function main(){        
        return exporter();
    }
    return main();
    
}());