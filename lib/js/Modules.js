
const Modules = (function Modules(){
    
    const modules = Object.seal({
        Logger: null,
        Luggage: null,
        LuggageDimensions: null,
        LuggageParser: null,
        JqueryCache: null,
        InputReader: null,
        UserInput: null,
    });
    
    function exporter(){
        return modules;
    }
    
    function main(){        
        return exporter();
    }
    return main();
    
}());