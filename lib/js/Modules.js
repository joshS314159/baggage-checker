
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
        Requester: null,
        LuggageData: null,
        VolumeResultsWriter: null,
        DimensionResultsWriter: null,
        Main: null,
        DomWriter: null,
    });
    
    const exporter = function exporter(){
        return modules;
    }
    
    const main = function main(){        
        return exporter();
    }
    return main();
    
}());