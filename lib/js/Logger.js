MODULES.Logger = (function Logger(modules){
    
    function info(_){
        return console.info(arguments[0]);
    }
    
    function moduleLoading(message){
        console.info("LOADING: ", message+".js");
    }
    
    function exporter(){
        return {
            moduleLoading: moduleLoading,
            info: info,
        };
    }
    
    function main(){
        moduleLoading("Logger");
        
        return exporter();
    }
    return main();
    
    


}(MODULES));


