
const MODULES = (function MODULES(){
    
    const modules = Object.seal({
        Logger: null,
        Luggage: null,
        LuggageDimensions: null,
        LuggageParser: null,
        JqueryCache: null,
        UserInput: null,
        DomWriter: null,
        DomReader: null,
        Globals: null,
    });
    
    function exporter(){
        return modules;
    }
    
    function main(){        
        return exporter();
    }
    return main();
    
}());