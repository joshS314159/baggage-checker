(function UnderscoreMixins(modules){
    
    const { compareEnum } = modules.Globals;
    
    function compare(a, b){
        return (a < b) ? compareEnum.LT : 
               (a > b) ? compareEnum.GT : 
                         compareEnum.EQ ;
    }
    

    function initializeMixins(){
        _.mixin({
              compare: compare,
        });
    }
    
    function main(){
        modules.Logger.moduleLoading("UnderscoreMixins");
        initializeMixins();
    }
    main();
    
    
}(MODULES));