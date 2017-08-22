MODULES.LuggageData = (function DimensionScraper($, logger, modules){
    'use strict';
    
    const { getRequest } = modules.Requester;
    
    const DIMENSIONS_URL = "https://www.ebags.com/BuyingGuides/luggage-and-travel/carry-on-luggage-size";
    
    
    
    const LUGGAGE_DATA = (function LUGGAGE_DATA(){
        let DATA = null;
        
        const setData = _.once(function setData(data){
            DATA = data;
        });
        
        
        const getData = function getData(){
            return DATA;
        }
        
        const exporter = function exporter(){
            return {
                setData: setData,
                getData: getData,
            };
        }

        const main = function main(){
            return exporter();
        }
        return main();        
    }());
    



    const findTable = function findTable(page){
        const tableWrapper = $('.table-responsive', page);
        const table = $('.table,table-striped,table-hover', tableWrapper);
        return table;
    }

    const getTableRows = function getTableRows(table){
        return $(table).children('tbody').children('tr');
    }

    const getColumnsInRow = function getColumnsInRow(row){
        return $("td", row);
    }

    const getElementText = function getElementText(el){
        return $(el).text();
    }

    const innerParser = function innerParser(_, el){
        return getElementText(el);
    }

    const outerParser = function outerParser(row){
        return getColumnsInRow(row).map(innerParser);
    }

    const isZeroLength = function isZeroLength(a){
        return a.length === 0;
    }

    const formatAsObject = function formatAsObject(a){
        return _.object(['airline', 'inches', 'centimeters', 'weightPounds'], a);
    }


    const trim = function trim(str){
        return str.trim();
    }

    const cleanInches = function cleanInches(dirtyInches){
        const sides = dirtyInches.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }

    const cleanCentimeters = function cleanCentimeters(dirtyCentimeters){
        const sides = dirtyCentimeters.split("x");
        return _.chain(sides).map(trim).map(parseFloat).value();
    }

    const cleanWeight = function cleanWeight(dirtyWeight){
        return parseFloat(dirtyWeight.replace(" lbs.", ""));
    }

    const poundsToKilograms = function poundsToKilograms(pounds){
        const kgInPound = 0.45359237
        return pounds * kgInPound;
    }

    const weightsHandler = function weightsHandler(objectData){
        const cleanedPounds = _.chain(objectData).pluck('weightPounds').map(cleanWeight).value();
        const cleanedKilograms = _.map(cleanedPounds, poundsToKilograms);
        const zippedWeights = _.chain(cleanedKilograms)
                               .zip(cleanedPounds)
                               .map(w => _.object(['kilograms', 'pounds'], w))
                               .value();
                       
        // logger.log(zippedWeights);
        return zippedWeights;
    }


    const dimensionsHandler = function dimensionsHandler(objectData){
        const cleanedInches = _.chain(objectData).pluck('inches').map(cleanInches).value();
        const cleanedCentimeters = _.chain(objectData).pluck('centimeters').map(cleanCentimeters).value();

        const zippedDimensions = _.chain(cleanedCentimeters)
                                  .zip(cleanedInches)
                                  .map(d => _.object(['centimeters', 'inches'], d))
                                  .value();
               
        // logger.log(zippedDimensions);
        return zippedDimensions;
    }

    const airlineNamesHandler = function airlineNamesHandler(objectData){
        const names = _.chain(objectData).pluck('airline').map(trim).value();
        logger.debug(names);
        return names;
    }

    const parseTable = function parseTable(table){
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
    
    const getLuggageData = function getLuggageData(){
        return LUGGAGE_DATA.getData();
    }


    const pageDataHandler = function pageDataHandler(data){
        const table = findTable(data);
        const result = parseTable(table);
        LUGGAGE_DATA.setData(result);
    }
    
    
    const multiply = function multiply(a,b){
        return a*b;
    }
    
    
    const getRawVolumes = function getRawVolumes(units){
        return _.chain(getLuggageData())
                .pluck('dimensionLimits')
                .pluck(units)
                .map(array => _.foldl(array, multiply, 1))
                .value();
    }
    
    
    const centilitersToLiters = function centilitersToLiters(centiliter){
        return centiliter / 1000;
    }
    

    const getRawInchVolumes = _.partial(getRawVolumes, "inches");
    
    const getRawCentimeterVolumes = _.partial(getRawVolumes, "centimeters");
    
    const getRawLiterVolumes = function getRawLiterVolumes(){
        return _.map(getRawCentimeterVolumes(), centilitersToLiters);
    }
    
    
    const getRawDimensions = function getRawDimensions(units){
        return _.chain(getLuggageData())
                .pluck('dimensionLimits')
                .pluck(units)
                .value();
    }
    
    const getRawInchDimensions = _.partial(getRawDimensions, "inches");
    
    const getRawCentimeterDimensions = _.partial(getRawDimensions, "inches");
    
    const getAirlineNames = function getAirlineNames(){
        return _.pluck(LUGGAGE_DATA.getData(), 'airline');
    }
    
    const getAirlineLiterVolumes = function getAirlineLiterVolumes(){
        const volumes = getRawLiterVolumes();
        const airlineNames = getAirlineNames();
        return _.zipObject(['airlineName', airlineNames], ['litres', volumes]);
    }
    
  

    const throwError = function throwError(e){
        throw Error("something went wrong", e);
    }
    
    
    
    const requestLuggagePage = function requestLuggagePage(){
        getRequest(DIMENSIONS_URL)
            .done(pageDataHandler)
            .fail(throwError)
    }

    
    const initialize = function initialize(){
        logger.info("fetching luggage dimensions page at: ", DIMENSIONS_URL);
        requestLuggagePage();
    }
    
    
    
    const exporter = function exporter(){
        return {
            getLuggageData: getLuggageData,
            getRawInchVolumes: getRawInchVolumes,
            getRawCentimeterVolumes: getRawCentimeterVolumes,
            
            getRawLiterVolumes: getRawLiterVolumes,
            getAirlineLiterVolumes: getAirlineLiterVolumes,
            
            getRawInchDimensions: getRawInchDimensions,
            // LUGGAGE_DATA: LUGGAGE_DATA,
            getAirlineNames: getAirlineNames,
        };
    };
    

    const main = function main(){
        logger.moduleLoad("DimensionsScraper");
        
        initialize();
        return exporter();
    }
    return main();
    
}($, MODULES.Logger, MODULES));


