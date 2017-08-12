Modules.LuggageParser = (function LuggageParser(modules){


    function fetchSite(){
       // $.get('http://travel-made-simple.com/carry-on-size-chart/');
       //  return rp('http://www.google.com').then(data => {
       //      const parser = new DOMParser();
       //      const doc = parser.parseFromString(data, "text/html");
       //      return doc;
       //  } );
       //
       // , function (error, response, body) {
       //     console.log('error:', error);
       //     console.log('statusCode:', response && response.statusCode);
       //     console.log('body:', body);
       // });
       //  .done(data => $.parseHTML(data) )
    }

    function cleanWhiteSpace(str){
        return str.replace(/ /g,'');
    }

    function cleanWhiteSpaceInArray(arr){
        return arr.map(cleanWhiteSpace);
    }

    function parseFloatsInArray(arr){
        return arr.map(parseFloat);
    }

    function getImperialClass(){
        return $('.imperial');
    }

    function wrapInJquery(el){
        return $(el);
    }

    function hasDataSortValueAttribute(el){
        return el.attr('data-sort-value');
    }

    function parseText(el){
        return el.text();
    }

    function splitStringOnChar(char, str){
        return str.split(char);
    }

    function splitStringOnX(str){
        return splitStringOnChar("x", str);
    }


    function parseDimensionsOnSite(dimensions){
        return dimensions
            .map(splitStringOnX)
            .map(cleanWhiteSpaceInArray)
            .map(parseFloatsInArray);
    }


    function exporter(){
        return {
            parseDimensions: parseDimensionsOnSite,
        }
    }

    function main(){
        modules.Logger.moduleLoading("LuggageParser");
        return exporter();
    }
    return main();


}(Modules));


