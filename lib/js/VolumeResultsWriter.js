MODULES.VolumeResultsWriter = (function VolumeResultsWriter($$, logger, modules){
    'use strict';
    
    const MARKED_FUNCTIONS = {
        [_.compare().LT]: (s) => $$.luggage.volume.undersizeResult.append(s),
        [_.compare().GT]: (s) => $$.luggage.volume.oversizeResult.append(s),
        [_.compare().EQ]: (s) => $$.luggage.volume.equalsizeResult.append(s),
    };
    
    
    const wrapInSpan = (htmlString) => 
        `<span>${htmlString}</span>`;
    
    const toFixed = (num, fix) => 
        num.toFixed(fix);
    
    const toFixed1 = _.partial(toFixed, _, 1);
    
    const buildIdTag = (id) => 
        id ? `id="${id}"` : ``; //empty ids not allowed
    
    const buildClassTag = (class_) => 
        `class="${class_}"`;
    

    const wrapInDiv = (class_, text, id) => 
        `<div ${buildClassTag(class_)} ${buildIdTag(id)}>${text}</div>`;

    
    const wrapInRowDiv = _.partial(wrapInDiv, "row", _);
    
    const emptyRowDiv = _.partial(wrapInRowDiv, "");
    
    const concatString = (a,b) => `${a}${b}`;
    
    const clearEntry = (el) => el.empty();
    
    
    const formatVolume = _.compose(
                             wrapInRowDiv 
                            ,toFixed1 
                            ,_.property('litres')
                            ,_.last );


    const formatAirlineName = _.compose(
                                 wrapInRowDiv 
                                ,_.property('airlineName')
                                ,_.last );
    
    const clearEntries = (entries) => 
        _.map(entries, clearEntry);
    
    const clearVolumeEntries = _.partial(clearEntries, $$.luggage.volume);
    
    const hypenInDiv = _.partial(wrapInRowDiv, "-");
    
    const unmarkedSymbol = hypenInDiv;
    
    const xInDiv = _.partial(wrapInRowDiv, "x");
    
    const markedSymbol = xInDiv;


    const appendVolumeRowToColumn = (volume) =>
        $$.luggage.volume.airlineVolume.append(volume);
    
    const appendVolume = _.compose(
                             appendVolumeRowToColumn
                            ,formatVolume );
    
    const appendAirlineNameRowToColumn = airlineName =>
        $$.luggage.volume.airlineName.append(airlineName);

    
    const appendAirlineName = _.compose(
                                 appendAirlineNameRowToColumn
                                ,formatAirlineName );
    
    const getUnmarkedKeysAppendFn = (inequality) => 
        _.omit(MARKED_FUNCTIONS, inequality);
    
    
    const getMarkedKeyAppendFn = _.propertyOf(MARKED_FUNCTIONS)

    const appendUnmarkedSymbol = (appendFn,key) =>
        appendFn(unmarkedSymbol());
    
    const setUnmarkedColumns = (unmarkedKeysFn) => 
        _.map(unmarkedKeysFn, appendUnmarkedSymbol);
    
    const setMarkedColumn = (markedKeyFn) => 
        markedKeyFn(markedSymbol());
    
    
    const appendVolumeAndAirline = value => {
        appendVolume(value);
        appendAirlineName(value);
    }
    
    const parseInequalityFromInput = input => _.first(input);
    
    const setUnmarkedCategory = _.compose(
                                     setUnmarkedColumns 
                                    ,getUnmarkedKeysAppendFn
                                    ,parseInequalityFromInput );
    
    const setMarkedCategory = _.compose(
                                 setMarkedColumn
                                ,getMarkedKeyAppendFn
                                ,parseInequalityFromInput);
 
    const setFitCategory = (value) => {
        setUnmarkedCategory(value);
        setMarkedCategory(value);
    };
    
    const handleResult = (value) => {
        appendVolumeAndAirline(value);
        setFitCategory(value);
    };
    
    const updateVolumes = (results) => {
        clearVolumeEntries();
        _.each(results, handleResult);
    };
    
    

    
    const setInputVolumeHtml = (volume) => 
        $$.userInputVolume.html(volume);
    
    const calculatedVolumeFromInput = _.compose(
                                         setInputVolumeHtml 
                                        ,wrapInSpan
                                        ,toFixed1 );


    const exporter = () => ({
        updateVolumes: updateVolumes,
        calculatedVolumeFromInput: calculatedVolumeFromInput,
    });
    
    
    const main = () => {
        logger.moduleLoad("VolumeResultsWriter");
        
        return exporter();
    };
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));