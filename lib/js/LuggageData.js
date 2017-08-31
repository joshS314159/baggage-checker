MODULES.LuggageData = (function LuggageData($, logger, modules){
    'use strict';
    
    const { getRequest } = modules.Requester;
    
    const { enableSubmitButton } = modules.DomWriter;
    
    const DIMENSIONS_URL = "https://www.ebags.com/BuyingGuides/luggage-and-travel/carry-on-luggage-size";
    const KILOS_IN_POUND = 0.45359237
    
    
    
    const LUGGAGE_DATA = (function LUGGAGE_DATA(){
        let DATA = null;
        
        const setData = (data) => {
            DATA = data;
        };
        
        const setDataOnce = _.once(setData);
        
        const getData = () => DATA;
        
        const exporter = function exporter(){
            return {
                setDataOnce: setDataOnce,
                getData: getData,
            };
        }

        const main = () => {
            return exporter();
        }
        return main();        
    }());
    


    const findTableWrapperInPage = (page) => 
        $('.table-responsive', page);
    
    const findTableInWrapper = (tableWrapper) => 
        $('.table,table-striped,table-hover', tableWrapper);
    
    const findTable = _.compose(findTableInWrapper, findTableWrapperInPage)

    const getTableBody = (table) => 
        $(table).children('tbody');
    
    const getRowsInTableBody = (tableBody) => 
        $(tableBody).children('tr');
    
    const getTableRows = _.compose(getRowsInTableBody, getTableBody);


    const getColumnsInRow = (row) => 
        $("td", row);

    const getElementText = (el) => 
        $(el).text();

    const innerParser = getElementText;
    
    const jquerytoArray = (j) => j.toArray();
    
    const mapInnerParser = _.partial( _.map, _, innerParser);
    
    const outerParser = _.compose(mapInnerParser, jquerytoArray, getColumnsInRow)
        

    const isZeroLength = (a) => 
        a.length === 0;
    

    const formatAsObject = (a) =>
        _.object(['airline', 'inches', 'centimeters', 'weightPounds'], a);
        

    const trim = (str) => str.trim();
    

    const splitStringOn = (string, on) => string.split(on);
    
    const splitStringOnX = _.partial(splitStringOn, _, "x");
    
    const mapParseFloat = _.partial( _.map, _, parseFloat);
        
    const mapTrim = _.partial( _.map, _, trim)   
    
    const cleanInches = _.compose(mapParseFloat, mapTrim, splitStringOnX);
    
    const cleanCentimeters = _.compose(mapParseFloat, mapTrim, splitStringOnX)

    const replace = (str, replace, with_) => str.replace(replace, with_);
    
    const cleanWeight = _.compose(parseFloat, _.partial(replace, _,"lbs", ""));

    const poundsToKilograms = (pounds) => 
        pounds * KILOS_IN_POUND;



    const parsePoundsForWeightsHandler = (objectData) =>
        _.chain(objectData).pluck('weightPounds').map(cleanWeight).value();
    
    
    const weightsHandler = (objectData) => {
        const pounds = parsePoundsForWeightsHandler(objectData);
        return _.chain(pounds)
         .map(poundsToKilograms)
         .zip(pounds)
         .map(w => _.object(['kilograms', 'pounds'], w))
         .value();
     }

    
     const mapCleanInches = _.partial( _.map, _, cleanInches);
     
     const pluckInches = _.partial( _.pluck, _, 'inches');
     
     const parseInchesForDimensionsHandler = _.compose(mapCleanInches, pluckInches)
         

     const dimensionsHandler = (objectData) => {
        const cleanedInches = parseInchesForDimensionsHandler(objectData);
        return  _.chain(objectData)
                 .pluck('centimeters')
                 .map(cleanCentimeters)
                 .zip(cleanedInches)
                 .map(d => _.object(['centimeters', 'inches'], d))
                 .value();
    }

    const airlineNamesHandler = (objectData) => 
        _.chain(objectData).pluck('airline').map(trim).value();
        
    
    const parseTableToObject = (table) => 
           _.chain(table)
            .take(getTableRows)
            .map(outerParser)
            .reject(isZeroLength)
            .map(formatAsObject)
            .reject(o => o.inches.includes("linear")) //handle this separately @TODO
            .value();


    const parseTable = (table) => {
        const objectData = parseTableToObject(table);
    
        const names = airlineNamesHandler(objectData);
        const weights = weightsHandler(objectData);
        const dimensions = dimensionsHandler(objectData);

        return _.chain(names)
                .zip(weights, dimensions)
                .map(d => _.object(['airline', 'weightLimits', 'dimensionLimits'], d))
                .value();
    }
    
    
    const getLuggageData = LUGGAGE_DATA.getData;
    
    const pageDataHandler = _.compose(LUGGAGE_DATA.setDataOnce, parseTable, findTable);
    
    const multiply = (a,b) => a*b;
    
    
    const getRawVolumes = (units) => 
        _.chain(getLuggageData())
         .pluck('dimensionLimits')
         .pluck(units)
         .map(array => _.foldl(array, multiply, 1))
         .value();
    
    
    const centilitersToLiters = (centiliter) => centiliter / 1000;

    
    const getRawInchVolumes = _.partial(getRawVolumes, "inches");
    
    const getRawCentimeterVolumes = _.partial(getRawVolumes, "centimeters");
    
    const getRawLiterVolumes = () => 
        _.map(getRawCentimeterVolumes(), centilitersToLiters);
    
    
    const getRawDimensions = (units) =>
        _.chain(getLuggageData())
         .pluck('dimensionLimits')
         .pluck(units)
         .value();
         
    
    const getRawInchDimensions = _.partial(getRawDimensions, "inches");
    
    const getRawCentimeterDimensions = _.partial(getRawDimensions, "inches");
    
    const getAirlineNames = () => 
        _.pluck(LUGGAGE_DATA.getData(), 'airline');
    
    
    const getAirlineLiterVolumes = () => 
        _.zipObject(['airlineName', getAirlineNames()], ['litres', getRawLiterVolumes()]);


    const getAirlineInchDimensions = () => 
        _.zipObject(['airlineName', getAirlineNames()], ['inches', getRawInchDimensions()]);
    
  

    const throwError = (e) => {
        throw Error("something went wrong", e);
    }
    
    
    
    const requestLuggagePage = () => 
        getRequest(DIMENSIONS_URL)
            .done(pageDataHandler)
            .done(enableSubmitButton)
            .fail(throwError)

    
    const initialize = () => {
        logger.info("fetching luggage dimensions page at: ", DIMENSIONS_URL);
        requestLuggagePage();
    }
    
    
    
    const exporter = () => ({
            getLuggageData: getLuggageData,
            getRawInchVolumes: getRawInchVolumes,
            getRawCentimeterVolumes: getRawCentimeterVolumes,
            
            getRawLiterVolumes: getRawLiterVolumes,
            getAirlineLiterVolumes: getAirlineLiterVolumes,
            
            getRawInchDimensions: getRawInchDimensions,
            getAirlineInchDimensions: getAirlineInchDimensions,
            // LUGGAGE_DATA: LUGGAGE_DATA,
            getAirlineNames: getAirlineNames,
        });
    

    const main = () => {
        logger.moduleLoad("DimensionsScraper");
        
        initialize();
        return exporter();
    }
    return main();
    
}($, MODULES.Logger, MODULES));


