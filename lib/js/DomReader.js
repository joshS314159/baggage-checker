MODULES.DomReader = (function DomReader($$, logger, modules){
    'use strict';
    
    const getDirtyInput = () => [ $$.inputA, $$.inputB, $$.inputC ];
    
    const zeroIfFalsy = (val) => val || "0";
    
    const getElementValue = el => el.val();
    
    const cleanInput = (dirtyInput) => _.chain(dirtyInput)
                        .map(getElementValue)
                        .map(zeroIfFalsy)
                        .map(parseFloat)
                        .value();
    
    const getInputDimensions = _.compose(cleanInput, getDirtyInput);
    
    const multiply = (a,b) => a*b;
    
    const multiplyArray = (array) => _.foldl(array, multiply, 1);
        
    const getInputVolume = _.compose(multiplyArray, getInputDimensions);
    
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