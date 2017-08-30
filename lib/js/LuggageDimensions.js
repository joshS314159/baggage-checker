MODULES.LuggageDimensions = (function LuggageDimensions(logger, modules){
    'use strict';

    const exporter = () => ({});

    
    const main = () => {
        logger.moduleLoad("LuggageDimensions");
        return exporter();
    }
    return main();
    
    


}(MODULES.Logger, MODULES));


