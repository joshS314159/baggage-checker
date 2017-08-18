MODULES.DomReader = (function DomReader($$, logger, modules){
    'use strict';
    
    const getDirtyInput = function getDirtyInput(){
        return [
            $$.inputA,
            $$.inputB,
            $$.inputC,
        ];
    }
    
    const cleanInput = function cleanInput(dirtyInput){
        return _.chain(dirtyInput)
                .map(el => el.val() || "0")
                .map(str => parseFloat(str))
                .value();
    }
    
    const getInputDimensions = function getInputDimensions(){
        return cleanInput(getDirtyInput());
    }
    
    const multiply = function multiply(a,b){
        return a*b;
    }
    
    const getInputVolume = function getInputVolume(){
        return _.foldl(getInputDimensions(), multiply, 1);
    }
    
    const exporter = function exporter(){
        return {
            getInputDimensions: getInputDimensions,
            getInputVolume: getInputVolume,
        };
    }
    
    const main = function main(){
        logger.moduleLoad("DomReader");
        return exporter();
    }
    return main();
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));