MODULES.DomWriter = (function DomWriter($$, modules){
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
    
    
    function wrapInSpan(htmlString){
        return `<span>${htmlString}</span>`;
    }
    
    function toFixed(num, fix){
        return num.toFixed(fix);
    }
    
    function toFixed1(num){
        return toFixed(num, 1);
    }
    
    function wrapInDiv(classString, text, id){
        if(id){
            return `<div class="${classString} id="${id}">${text}</div>`;
        }else{
            return `<div class="${classString}">${text}</div>`;
        }
    }
    
    function wrapInRowDiv(text){
        return wrapInDiv("row", text);
    }
    
    function concatString(a,b){
        return a+b;
    }
    
    function formatEachKeyValue(volumeResults){
        return _.chain(volumeResults)
                .map(toFixed1)
                .map(wrapInRowDiv)
                .foldl(concatString)
                .value();
    }
    
    function clearVolumes(){
        $$.luggageVolumeEqualsizeResult.empty()
        $$.luggageVolumeOversizeResult.empty()
        $$.luggageVolumeUndersizeResult.empty()
    }
    


    function updateVolumes(results){
        const htmlResults = _.mapObject(results, formatEachKeyValue);
        clearVolumes();
        
        _.each(VOLUME_ELEMENT_KEY_ASSOCIATION, (o) => o.element.append(htmlResults[o.key]));
    }
    
    
    function calculatedVolumeFromInput(volume){
        $$.userInputVolume.html(wrapInSpan(volume));
    }




    
    function exporter(){
        return {
            updateVolumes: updateVolumes,
            calculatedVolumeFromInput: calculatedVolumeFromInput,
        };
    }
    
    
    function main(){
        modules.Logger.moduleLoading("DomReaderWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES));