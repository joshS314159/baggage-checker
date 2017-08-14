MODULES.DomWriter = (function DomWriter($$, modules){
    

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


    function updateVolumes(results){
        const htmlResults = _.mapObject(results, formatEachKeyValue);

        const volumeElementKeyAssociation = [{
            element: $$.luggageVolumeUndersizeResult,
            key: "LT",
        },{
            element: $$.luggageVolumeOversizeResult,
            key: "GT",
        },{
            element: $$.luggageVolumeEqualsizeResult,
            key: "EQ",
        }];
        
        _.each(volumeElementKeyAssociation, (o) => o.element.append(htmlResults[o.key]));
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