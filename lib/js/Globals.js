MODULES.Globals = (function Globals(modules){
    'use strict';
    

    
    function exporter(){
        return {
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("Globals");
        
        return exporter();
    }
    return main();
    
}(MODULES));