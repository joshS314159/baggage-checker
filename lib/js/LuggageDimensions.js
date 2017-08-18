MODULES.LuggageDimensions = (function LuggageDimensions(logger, modules){
    'use strict';

    const exporter = function exporter(){
        return {};
    }
    
    const main = function main(){
        logger.moduleLoad("LuggageDimensions");
        return exporter();
    }
    return main();
    
    


}(MODULES.Logger, MODULES));


