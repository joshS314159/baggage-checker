MODULES.Requester = (function Requester($, modules){
    'use strict';
    
    
    const logger = modules.Logger;
    
    
    function getRequest(urlEndpoint){
        return $.get(urlEndpoint);
    }
    
    
    
    // function postRequest(urlEndpoint, requestData){
    //     console.info("post request", urlEndpoint, requestData);
    //
    //     return $.post({
    //         url: urlEndpoint,
    //         data: requestData,
    //     });
    // }
    
    
    
    function exporter(){
        return {
            getRequest: getRequest,
        };
    }
    
    
    function main(){
        modules.Logger.moduleLoading("Requester");
        
        return exporter();
    }
    return main();
    
}($, MODULES));