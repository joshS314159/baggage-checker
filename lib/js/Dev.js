(function DEV_MODULE($$, logger){
    'use strict';
    
    const warning = () => {
        logger.info("----------------- DEV MODE SET ----------");
    }
    
    
    
    const setDefaults = () => {
        $$.inputA.val(1);
        $$.inputB.val(15.5);
        $$.inputC.val(3);
    }
    
    const main = () => {
        logger.moduleLoad("DEV_MODULE");
        warning();
        setDefaults();
    }
    return main();
    
    
    
    

    
}(MODULES.JqueryCache, MODULES.Logger));


