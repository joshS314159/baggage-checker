(function DEV_MODULE($$, logger){
    'use strict';
    
    const warning = function warning(){
        logger.info("----------------- DEV MODE SET ----------");
    }
    
    
    
    const setDefaults = function setDefaults(){
        $$.inputA.val(1);
        $$.inputB.val(15.5);
        $$.inputC.val(3);
    }
    
    const main = function main(){
        logger.moduleLoad("DEV_MODULE");
        warning();
        setDefaults();
    }
    return main();
    
    
    
    

    
}(MODULES.JqueryCache, MODULES.Logger));


