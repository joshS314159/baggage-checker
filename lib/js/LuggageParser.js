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

    const cleanWhiteSpace = (str) => str.replace(/ /g,'');
    
    const cleanWhiteSpaceInArray = (arr) => arr.map(cleanWhiteSpace);

    const parseFloatsInArray = (arr) => arr.map(parseFloat);

    const wrapInJquery = (el) => $(el);

    const hasDataSortValueAttribute = (el) => el.attr('data-sort-value');

    const parseText = (el) => el.text();

    const splitStringOnChar = (char, str) => str.split(char);

    const splitStringOnX = _.partial(splitStringOnChar, "x", _);


    const parseDimensionsOnSite = (dimensions) => _.chain(dimensions)
                                .map(splitStringOnX)
                                .map(cleanWhiteSpaceInArray)
                                .map(parseFloatsInArray)
                                .value();


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


