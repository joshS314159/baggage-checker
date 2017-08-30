MODULES.DimensionResultsWriter = (function DimensionResultsWriter($$, logger, modules){
    'use strict';

    
    
    const wrapInSpan = (htmlString) => `<span>${htmlString}</span>`;
    
    const toFixed = (num, fix) => num.toFixed(fix);
    
    const toFixed1 = _.partial(toFixed, _, 1);
    

    const arrayDimensionsToString = 
        (array) => array.join(" x ");
    
    
    const buildIdTag = (id) => 
        id ? `id="${id}"` : ``; //empty ids not allowed
    
    
    const buildClassTag = (class_) => 
        `class="${class_}"`;
    

    const wrapInDiv = (class_, text, id) => 
        `<div ${buildClassTag(class_)} ${buildIdTag(id)}>${text}</div>`;
    
    
    const wrapInRowDiv = _.partial(wrapInDiv, "row", _);
    
    
    const emptyRowDiv = _.partial(wrapInRowDiv, "");
    
    
    
    const concatString = (a,b) => a+b;

    const clearDimensionsEntry = (el) => el.empty();
    
    const formatDimensions = _.compose(
                                 wrapInRowDiv
                                ,arrayDimensionsToString
                                ,_.property('inches')
                                ,_.last );

    const formatAirlineName = _.compose(
                                 wrapInRowDiv
                                ,_.property('airlineName')
                                ,_.last );
    
    
    
    const clearDimensionsEntries = () => 
        _.map($$.luggage.dimensions, clearDimensionsEntry);


    


    const updateDimensions = (results) => {
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
    
    
    const calculatedVolumeFromInput = (volume) => 
        $$.userInputVolume.html(wrapInSpan(volume));

    
    const exporter = () => ({
        updateDimensions: updateDimensions,
        // calculatedVolumeFromInput: calculatedVolumeFromInput,
    });
    
    
    const main = () => {
        logger.moduleLoad("VolumeResultsWriter");
        
        return exporter();
    }
    return main();

    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));