MODULES.Requester = (function Requester($, logger, modules){
    'use strict';
        
    
    const getRequest = (urlEndpoint) => $.get(urlEndpoint);
    
    
    
    const exporter = () => ({
        getRequest: getRequest,
    });
    
    
    const main = () => {
        logger.moduleLoad("Requester");
        
        return exporter();
    }
    
    return main();
    
}($, MODULES.Logger, MODULES));