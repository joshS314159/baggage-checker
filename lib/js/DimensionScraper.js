MODULES.DimensionScraper = (function DimensionScraper($, modules){
    'use strict';
    
    const { getRequest } = modules.Requester;
    
    const DIMENSIONS_URL = "https://www.ebags.com/BuyingGuides/luggage-and-travel/carry-on-luggage-size";
    
    
    function findTable(page){
        const tableWrapper = $('.table-responsive', page);
        const table = $('.table,table-striped,table-hover', tableWrapper);
        return table;
    }
    
    function getTableRows(table){
        return $(table).children('tbody').children('tr');
    }
    
    function getColumnsInRow(row){
        return $("td", row);
    }
    
    function getElementText(el){
        return $(el).text();
    }
    
    function innerParser(_, el){
        return getElementText(el);
    }
    
    function outerParser(row){
        return getColumnsInRow(row).map(innerParser);
    }
    
    function isZeroLength(a){
        return a.length === 0;
    }
    
    function formatAsObject(a){
        return _.object(['airline', 'inches', 'centimeters', 'weightPounds'], a);
    }
    
    
    function trim(str){
        return str.trim();
    }
    
    function cleanInches(dirtyInches){
        const sides = dirtyInches.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }
    
    function cleanCentimeters(dirtyCentimeters){
        const sides = dirtyCentimeters.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }
    
    function cleanWeight(dirtyWeight){
        return parseFloat(dirtyWeight.replace(" lbs.", ""));
    }
    
    function poundsToKilograms(pounds){
        const kgInPound = 0.45359237
        return pounds * kgInPound;
    }
    
    function weightsHandler(objectData){
        const cleanedPounds = _.chain(objectData).pluck('weightPounds').map(cleanWeight).value();
        const cleanedKilograms = _.map(cleanedPounds, poundsToKilograms);
        const zippedWeights = _.chain(cleanedKilograms)
                               .zip(cleanedPounds)
                               .map(w => _.object(['kilograms', 'pounds'], w))
                               .value();
                               
        console.log(zippedWeights);
        return zippedWeights;
    }
    
    
    function dimensionsHandler(objectData){
        const cleanedInches = _.chain(objectData).pluck('inches').map(cleanInches).value();
        const cleanedCentimeters = _.chain(objectData).pluck('centimeters').map(cleanCentimeters).value();

        const zippedDimensions = _.chain(cleanedCentimeters)
                                  .zip(cleanedInches)
                                  .map(d => _.object(['centimeters', 'inches'], d))
                                  .value();
                       
        console.log(zippedDimensions);
        return zippedDimensions;
    }

    function airlineNamesHandler(objectData){
        const names = _.chain(objectData).pluck('airline').map(trim).value();
        console.log(names);
        return names;
    }

    function parseTable(table){
        const objectData = _.chain(table)
            .take(getTableRows)
            .map(outerParser)
            .reject(isZeroLength)
            .map(formatAsObject)
            .reject(o => o.inches.includes("linear")) //handle this separately @TODO
            .value();
            
        console.log(_.first(objectData));
        
        const names = airlineNamesHandler(objectData);

        const weights = weightsHandler(objectData);
        const dimensions = dimensionsHandler(objectData);

        const zippedData = _.chain(names)
                            .zip(weights, dimensions)
                            .map(d => _.object(['airline', 'weightLimits', 'dimensionLimits'], d))
                            .value();
        console.log(zippedData);
    }
    

    
    


    function pageDataHandler(data){
        const table = findTable(data);
        const result = parseTable(table);
        console.log(result);
    }
    
    function throwError(e){
        throw Error("something went wrong", e);
    }
    
    function requestLuggagePage(){
        getRequest(DIMENSIONS_URL)
            .done(pageDataHandler)
            .fail(throwError)
    }
    
    

    
    function initialize(){
        console.info("fetching luggage dimensions page at: ", DIMENSIONS_URL);
        requestLuggagePage();
    }
    
    function exporter(){
        return {
            // getLuggagePage: getLuggagePage,
        };
    }
    
    function main(){
        modules.Logger.moduleLoading("DimensionsScraper");
        
        initialize();
        
        return exporter();
    }
    return main();
    
}($, MODULES));


