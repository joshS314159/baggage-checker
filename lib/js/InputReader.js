Modules.InputReader = (function InputReader($$, modules){
    
    
    function getDirtyInput(){
        return [
            $$.inputA,
            $$.inputB,
            $$.inputC,
        ];
    }
    
    function cleanInput(dirtyInput){
        // console.log(dirtyInput)
        return _.chain(dirtyInput)
                .map(el => el.val() || "0")
                .map(str => parseInt(str))
                .value();
    }
    
    function getInputDimensions(){
        return cleanInput(getDirtyInput());
    }
    
    
    function exporter(){
        return {
            getInputDimensions: getInputDimensions,
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("InputReader");
        return exporter();
    }
    return main();
    
}(Modules.JqueryCache, Modules));