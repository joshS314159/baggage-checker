MODULES.DomWriter = (function DomWriter($$, logger, modules){
    'use strict';


    
    const exporter = function exporter(){
        return {};
    }
    
    
    const main = function main(){
        logger.moduleLoad("DomReaderWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));