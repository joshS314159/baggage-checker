(function DEV_MODULE($$){
    'use strict';
    
    function warning(){
        console.info("----------------- DEV MODE SET ----------");
    }
    
    
    
    function setDefaults(){
        $$.inputA.val(1);
        $$.inputB.val(15.5);
        $$.inputC.val(3);
    }
    
    function main(){
        warning();
        setDefaults();
    }
    return main();
    
    
    
    

    
}(MODULES.JqueryCache));


