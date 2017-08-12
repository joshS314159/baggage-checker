Modules.UserInput = (function UserInput($$, modules){
    
    
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
    
    function add(a,b){
        return a+b;
    }
    
    function arraySummation(arr){
        return _.foldl(arr, add, 0);
    }

    
    function getInputVolume(){
        return arraySummation(getInputDimensions());
    }
    
    
    
    
    function exporter(){
        return {
            dimensions: getInputDimensions,
            volume: getInputVolume,
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("UserInput");
        return exporter();
    }
    return main();
    
}(Modules.JqueryCache, Modules));