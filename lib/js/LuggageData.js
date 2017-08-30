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
    



    const findTable = (page) => {
        const tableWrapper = $('.table-responsive', page);
        const table = $('.table,table-striped,table-hover', tableWrapper);
        return table;
    }

    const getTableRows = (table) => {
        return $(table).children('tbody').children('tr');
    }

    const getColumnsInRow = (row) => $("td", row);

    const getElementText = (el) => $(el).text();

    const innerParser = (_, el) => getElementText(el);
    
    
    const outerParser = (row) => getColumnsInRow(row).map(innerParser);
    

    const isZeroLength = (a) => a.length === 0;
    

    const formatAsObject = (a) =>
        _.object(['airline', 'inches', 'centimeters', 'weightPounds'], a);
        

    const trim = (str) => str.trim();
    


    const cleanInches = (dirtyInches) => {
        const sides = dirtyInches.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }

    const cleanCentimeters = (dirtyCentimeters) => {
        const sides = dirtyCentimeters.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }

    const cleanWeight = (dirtyWeight) => 
        parseFloat(dirtyWeight.replace(" lbs.", ""));

    const poundsToKilograms = (pounds) => pounds * KILOS_IN_POUND;

    const weightsHandler = (objectData) => {
        const cleanedPounds = _.chain(objectData).pluck('weightPounds').map(cleanWeight).value();
        const cleanedKilograms = _.map(cleanedPounds, poundsToKilograms);
        const zippedWeights = _.chain(cleanedKilograms)
                               .zip(cleanedPounds)
                               .map(w => _.object(['kilograms', 'pounds'], w))
                               .value();
                       
        // logger.log(zippedWeights);
        return zippedWeights;
    }


    const dimensionsHandler = (objectData) => {
        const cleanedInches = _.chain(objectData).pluck('inches').map(cleanInches).value();
        const cleanedCentimeters = _.chain(objectData).pluck('centimeters').map(cleanCentimeters).value();

        const zippedDimensions = _.chain(cleanedCentimeters)
                                  .zip(cleanedInches)
                                  .map(d => _.object(['centimeters', 'inches'], d))
                                  .value();
               
        // logger.log(zippedDimensions);
        return zippedDimensions;
    }

    const airlineNamesHandler = (objectData) => {
        const names = _.chain(objectData).pluck('airline').map(trim).value();
        logger.debug(names);
        return names;
    }

    const parseTable = (table) => {
        const objectData = _.chain(table)
            .take(getTableRows)
            .map(outerParser)
            .reject(isZeroLength)
            .map(formatAsObject)
            .reject(o => o.inches.includes("linear")) //handle this separately @TODO
            .value();
    
        logger.debug(_.first(objectData));

        const names = airlineNamesHandler(objectData);

        const weights = weightsHandler(objectData);
        const dimensions = dimensionsHandler(objectData);

        const zippedData = _.chain(names)
                            .zip(weights, dimensions)
                            .map(d => _.object(['airline', 'weightLimits', 'dimensionLimits'], d))
                            .value();
        logger.debug(zippedData);
        return zippedData;

    }
    
    const getLuggageData = () => {
        return LUGGAGE_DATA.getData();
    }


    const pageDataHandler = (data) => {
        const table = findTable(data);
        const result = parseTable(table);
        LUGGAGE_DATA.setDataOnce(result);
    }
    
    
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
    
    const getAirlineLiterVolumes = () => {
        const volumes = getRawLiterVolumes();
        const airlineNames = getAirlineNames();
        return _.zipObject(['airlineName', airlineNames], ['litres', volumes]);
    }


    const getAirlineInchDimensions = function getAirlineInchDimensions(){
        const dimensions = getRawInchDimensions();
        const airlineNames = getAirlineNames();
        return _.zipObject(['airlineName', airlineNames], ['inches', dimensions]);
    }
    
  

    const throwError = (e) => {
        throw Error("something went wrong", e);
    }
    
    
    
    const requestLuggagePage = () => {
        getRequest(DIMENSIONS_URL)
            .done(pageDataHandler)
            .done(enableSubmitButton)
            .fail(throwError)
    }

    
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


