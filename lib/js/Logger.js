MODULES.Logger = (function Logger(modules){
    
    function moduleLoading(message){
        console.info("LOADING: ", message+".js");
    }
    
    function exporter(){
        return {
            moduleLoading: moduleLoading,
        };
    }
    
    function main(){
        moduleLoading("Logger");
        
        return exporter();
    }
    return main();
    
    


}(MODULES));


