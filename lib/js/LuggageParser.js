MODULES.LuggageParser = (function LuggageParser(logger, modules){
    'use strict';
    

    const fetchSite = function fetchSite(){
       // $.get('http://travel-made-simple.com/carry-on-size-chart/');
       //  return rp('http://www.google.com').then(data => {
       //      const parser = new DOMParser();
       //      const doc = parser.parseFromString(data, "text/html");
       //      return doc;
       //  } );
       //
       // , function (error, response, body) {
       //     logger.log('error:', error);
       //     logger.log('statusCode:', response && response.statusCode);
       //     logger.log('body:', body);
       // });
       //  .done(data => $.parseHTML(data) )
    }

    const cleanWhiteSpace = function cleanWhiteSpace(str){
        return str.replace(/ /g,'');
    }

    const cleanWhiteSpaceInArray = function cleanWhiteSpaceInArray(arr){
        return arr.map(cleanWhiteSpace);
    }

    const parseFloatsInArray = function parseFloatsInArray(arr){
        return arr.map(parseFloat);
    }

    const getImperialClass = function getImperialClass(){
        return $('.imperial');
    }

    const wrapInJquery = function wrapInJquery(el){
        return $(el);
    }

    const hasDataSortValueAttribute = function hasDataSortValueAttribute(el){
        return el.attr('data-sort-value');
    }

    const parseText = function parseText(el){
        return el.text();
    }

    const splitStringOnChar = function splitStringOnChar(char, str){
        return str.split(char);
    }

    const splitStringOnX = function splitStringOnX(str){
        return splitStringOnChar("x", str);
    }


    const parseDimensionsOnSite = function parseDimensionsOnSite(dimensions){
        return dimensions
            .map(splitStringOnX)
            .map(cleanWhiteSpaceInArray)
            .map(parseFloatsInArray);
    }


    const exporter = function exporter(){
        return {
            parseDimensions: parseDimensionsOnSite,
        }
    }

    const main = function main(){
        logger.moduleLoad("LuggageParser");
        return exporter();
    }
    return main();


}(MODULES.Logger, MODULES));


