MODULES.Requester = (function Requester($, logger, modules){
    'use strict';
        
    
    const getRequest = function getRequest(urlEndpoint){
        return $.get(urlEndpoint);
    }
    
    
    
    // const postRequest = function postRequest(urlEndpoint, requestData){
    //     logger.info("post request", urlEndpoint, requestData);
    //
    //     return $.post({
    //         url: urlEndpoint,
    //         data: requestData,
    //     });
    // }
    
    
    
    const exporter = function exporter(){
        return {
            getRequest: getRequest,
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("Requester");
        
        return exporter();
    }
    return main();
    
}($, MODULES.Logger, MODULES));