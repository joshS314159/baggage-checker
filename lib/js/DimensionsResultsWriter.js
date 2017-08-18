MODULES.DimensionResultsWriter = (function DimensionResultsWriter($$, logger, modules){
    'use strict';

    const DIMENSIONS_ELEMENT_KEY_ASSOCIATION = [{
            element: $$.luggage.dimensions.undersizeResult,
            key: _.compare().LT,
        },{
            element: $$.luggage.dimensions.oversizeResult,
            key: _.compare().GT,
        },{
            element: $$.luggage.dimensions.equalsizeResult,
            key: _.compare().EQ,
        }
    ];
    
    
    const wrapInSpan = function wrapInSpan(htmlString){
        return `<span>${htmlString}</span>`;
    }
    
    const toFixed = function toFixed(num, fix){
        return num.toFixed(fix);
    }
    
    const toFixed1 = function toFixed1(num){
        return toFixed(num, 1);
    }
    
    const wrapInDiv = function wrapInDiv(classString, text, id){
        if(id){
            return `<div class="${classString} id="${id}">${text}</div>`;
        }else{
            return `<div class="${classString}">${text}</div>`;
        }
    }
    
    const wrapInRowDiv = function wrapInRowDiv(text){
        return wrapInDiv("row", text);
    }
    
    const concatString = function concatString(a,b){
        return a+b;
    }
    
    const dimensionsArrayToString = function dimensionsArrayToString(numbers){
        return _.foldl(numbers, (acc, n) => acc+" x "+n);
    }
    
    const formatEachKeyValue = function formatEachKeyValue(dimensionResults){
        return _.chain(dimensionResults)
                .map(dimensionsArrayToString)
                .map(wrapInRowDiv)
                .foldl(concatString)
                .value();
                
    }
    
    const clearDimensions = function clearDimensions(){
        $$.luggage.dimensions.equalsizeResult.empty()
        $$.luggage.dimensions.oversizeResult.empty()
        $$.luggage.dimensions.undersizeResult.empty()
    }
    
    

    const updateDimensions = function updateDimensions(results){
        const htmlResults = _.mapObject(results, formatEachKeyValue);

        clearDimensions();
        
        _.each(DIMENSIONS_ELEMENT_KEY_ASSOCIATION, (o) => o.element.append(htmlResults[o.key]));
    }
    

    
    const exporter = function exporter(){
        return {
            updateDimensions: updateDimensions,
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("DimensionResultsWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));