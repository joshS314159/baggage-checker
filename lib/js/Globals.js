MODULES.Globals = (function Globals(modules){
    
    
    function compareEnum(){
        return {
            LT: "LT",
            GT: "GT",
            EQ: "EQ",
        };
    }
    
    function exporter(){
        return {
            compareEnum: compareEnum(),
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("Globals");
        
        return exporter();
    }
    return main();
    
}(MODULES));