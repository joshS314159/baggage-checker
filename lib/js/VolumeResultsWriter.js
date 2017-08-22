MODULES.VolumeResultsWriter = (function VolumeResultsWriter($$, logger, modules){
    'use strict';
    
    
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
    
    const emptyRowDiv = function emptyRowDiv(){
        return wrapInRowDiv("");
    }
    
    const concatString = function concatString(a,b){
        return a+b;
    }
    
    
    
    const formatVolume = _.compose(wrapInRowDiv, toFixed1, o => o.litres, _.last);

    const formatAirlineName = _.compose(wrapInRowDiv, o => o.airlineName, _.last);
    
    
    
    const clearVolumeEntries = function clearVolumeEntries(){
        _.each($$.luggage.volume, el => el.empty());
    }


    


    const updateVolumes = function updateVolumes(results){
        clearVolumeEntries();
        
        const unmarkedSymbol = wrapInRowDiv("-");
        const markedSymbol = wrapInRowDiv("x");
        
        const markedFunctions = {
            [_.compare().LT]: (s) => $$.luggage.volume.undersizeResult.append(s),
            [_.compare().GT]: (s) => $$.luggage.volume.oversizeResult.append(s),
            [_.compare().EQ]: (s) => $$.luggage.volume.equalsizeResult.append(s),
        };
        
        _.each(results, value => {
            const inequality = _.first(value);
            const unmarkedKeys = _.omit(markedFunctions, inequality);
            const markedKey = markedFunctions[inequality];
                        
            $$.luggage.volume.airlineVolume.append( formatVolume(value) );
            $$.luggage.volume.airlineName.append( formatAirlineName(value) );

            _.each(unmarkedKeys, (val,key) => val(unmarkedSymbol));
            markedKey(markedSymbol);
        });
    }
    
    
    const calculatedVolumeFromInput = function calculatedVolumeFromInput(volume){
        $$.userInputVolume.html(wrapInSpan(volume));
    }
    
    const exporter = function exporter(){
        return {
            updateVolumes: updateVolumes,
            calculatedVolumeFromInput: calculatedVolumeFromInput,
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("VolumeResultsWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));