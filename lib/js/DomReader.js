MODULES.DomReader = (function DomReader($$, modules){
    'use strict';
    
    function getDirtyInput(){
        return [
            $$.inputA,
            $$.inputB,
            $$.inputC,
        ];
    }
    
    function cleanInput(dirtyInput){
        return _.chain(dirtyInput)
                .map(el => el.val() || "0")
                .map(str => parseInt(str))
                .value();
    }
    
    function getInputDimensions(){
        return cleanInput(getDirtyInput());
    }
    
    function multiply(a,b){
        return a*b;
    }
    
    function getInputVolume(){
        return _.foldl(getInputDimensions(), multiply, 1);
    }
    
    function exporter(){
        return {
            getInputDimensions: getInputDimensions,
            getInputVolume: getInputVolume,
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("DomReader");
        return exporter();
    }
    return main();
    
}(MODULES.JqueryCache, MODULES));