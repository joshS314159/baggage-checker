(function DEV_MODULE($$){
    
    function warning(){
        console.info("----------------- DEV MODE SET ----------");
        console.info("----------------- DEV MODE SET ----------");
        console.info("----------------- DEV MODE SET ----------");
        console.info("----------------- DEV MODE SET ----------");
        console.info("----------------- DEV MODE SET ----------");
    }
    
    
    
    function setDefaults(){
        $$.inputA.val(1);
        $$.inputB.val(2);
        $$.inputC.val(3);
    }
    
    function main(){
        warning();
        setDefaults();
    }
    main();

    
}(Modules.JqueryCache));