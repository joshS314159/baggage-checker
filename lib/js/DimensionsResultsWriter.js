MODULES.DimensionResultsWriter = (function DimensionResultsWriter($$, logger, modules){
    'use strict';

    'use strict';
    
    
    const wrapInSpan = function wrapInSpan(htmlString){
        return `<span>${htmlString}</span>`;
    }
    
    const toFixed = function toFixed(num, fix){
        return num.toFixed(fix);
    }
    
    // const toFixed1 = function toFixed1(num){
        // return toFixed(num, 1);
    // }

    const arrayDimensionsToString = function arrayDimensionsToString(array){
        return array.join(" x ");
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
    
    const emptyRowDiv = function emptyRowDiv(){
        return wrapInRowDiv("");
    }
    
    const concatString = function concatString(a,b){
        return a+b;
    }
    
    const clearDimensionsEntry = function clearDimensionsEntry(el){
        return el.empty();
    }
    
    const formatDimensions = _.compose(wrapInRowDiv, arrayDimensionsToString, o => o.inches, _.last);

    const formatAirlineName = _.compose(wrapInRowDiv, o => o.airlineName, _.last);
    
    
    
    const clearDimensionsEntries = function clearDimensionsEntries(){
        return _.map($$.luggage.dimensions, clearDimensionsEntry);
    }


    


    const updateDimensions = function updateDimensions(results){
        clearDimensionsEntries();
        console.log(results);
        
        const unmarkedSymbol = wrapInRowDiv("-");
        const markedSymbol = wrapInRowDiv("x");
        
        const markedFunctions = {
            [_.compare().LT]: (s) => $$.luggage.dimensions.undersizeResult.append(s),
            [_.compare().GT]: (s) => $$.luggage.dimensions.oversizeResult.append(s),
            [_.compare().EQ]: (s) => $$.luggage.dimensions.equalsizeResult.append(s),
        };
        
        _.each(results, value => {
            const inequality = _.first(value);
            const unmarkedKeys = _.omit(markedFunctions, inequality);
            const markedKey = markedFunctions[inequality];
                        
            const dimensionsElement = $$.luggage.dimensions.airlineDimensions.append( formatDimensions(value) );
            // console.log(dimensionsElement)
            const airlineNameElement = $$.luggage.dimensions.airlineName.append( formatAirlineName(value) );

            const unfitElements = _.map(unmarkedKeys, (val,key) => val(unmarkedSymbol));
            const fitElement = markedKey(markedSymbol);
        });
        
        return null;
    }
    
    
    const calculatedVolumeFromInput = function calculatedVolumeFromInput(volume){
        return $$.userInputVolume.html(wrapInSpan(volume));
    }
    
    const exporter = function exporter(){
        return {
            updateDimensions: updateDimensions,
            // calculatedVolumeFromInput: calculatedVolumeFromInput,
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("VolumeResultsWriter");
        
        return exporter();
    }
    return main();

    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));