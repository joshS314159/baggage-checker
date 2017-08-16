MODULES.DomWriter = (function DomWriter($$, logger, modules){
    'use strict';

    const VOLUME_ELEMENT_KEY_ASSOCIATION = [{
            element: $$.luggageVolumeUndersizeResult,
            key: _.compare().LT,
        },{
            element: $$.luggageVolumeOversizeResult,
            key: _.compare().GT,
        },{
            element: $$.luggageVolumeEqualsizeResult,
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
    
    const formatEachKeyValue = function formatEachKeyValue(volumeResults){
        return _.chain(volumeResults)
                .map(toFixed1)
                .map(wrapInRowDiv)
                .foldl(concatString)
                .value();
    }
    
    const clearVolumes = function clearVolumes(){
        $$.luggageVolumeEqualsizeResult.empty()
        $$.luggageVolumeOversizeResult.empty()
        $$.luggageVolumeUndersizeResult.empty()
    }
    


    const updateVolumes = function updateVolumes(results){
        const htmlResults = _.mapObject(results, formatEachKeyValue);
        clearVolumes();
        
        _.each(VOLUME_ELEMENT_KEY_ASSOCIATION, (o) => o.element.append(htmlResults[o.key]));
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
        logger.moduleLoad("DomReaderWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));