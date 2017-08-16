MODULES.LuggageDimensions = (function LuggageDimensions(logger, modules){
    'use strict';
    
    
    const { parseDimensions } = modules.LuggageParser;

    const stringDimensions = [ 
            "21.5 x 15.5 x 9",
            "22 x 17.7 x 9.8",
            "21.5 x 15.5 x 9.5",
            "21.6 x 15.7 x 7.8",
            "22 x 14 x 10",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "21.6 x 15.7 x 7.8",
            "21.5 x 15.5 x 9",
            "21.5 x 15.5 x 9",
            "21 x 15 x 7",
            "21.5 x 13.5 x 10",
            "21.5 x 15.5 x 9.5",
            "21.7 x 13.8 x 9.9",
            "22 x 14 x 10",
            "21.5 x 15.5 x 8",
            "19.6 x 15.7 x 9.8",
            // "46.5 linear",
            "17 x 13 x 7",
            // "45 linear",
            "20 x 16 x 9",
            "24 x 17 x 10",
            "21.5 x 13.5 x 10",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "22 x 16 x 10",
            "21.6 x 15.7 x 7.8",
            "19.6 x 11.8 x 7.8",
            "19.5 x 15.5 x 10",
            "18.9 x 14.1 x 7.8",
            "21.5 x 15.5 x 9",
            // "45 linear",
            "21.6 x 13.7 x 7.8",
            "21.6 x 15.7 x 7.8",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "21.5 x 15.5 x 8",
            "23.6 x 15.7 x 11.8",
            "21.5 x 15.5 x 8",
            "22 x 18 x 10",
            "21.5 x 15.5 x 9",
            "21.6 x 15.7 x 7.8",
            // "45 linear",
            // "45 linear",
            "21.7 x 15.7 x 7.9",
            "22 x 14 x 9",
            "23 x 13 x 9",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "21.6 x 15.8 x 7.9",
            // "45 linear",
            "22 x 17.8 x 9.8",
            "21.5 x 15.5 x 8",
            "46 linear",
            "21.5 x 15.5 x 8",
            "21.5 x 15.5 x 8",
            // "45 linear",
            "22 x 17.5 x 9.5",
            "22 x 14 x 9",
            "22 x 17.7 x 9.8",
            "21.6 x 15.7 x 9",
            // "",
            "22 x 17.7 x 9.8",
            "22 x 15 x 8",
            "21.6 x 15.7 x 9",
            "19.6 x 15.7 x 9.8",
            "21.5 x 15.5 x 9",
            "22 x 14 x 9",
            "21.6 x 15.7 x 9",
            "22 x 18 x 10",
            "21.5 x 13.7 x 7.8",
            "24 x 16 x 10",
            "22 x 14 x 9",
            "21.6 x 15.7 x 7.8",
            "21.6 x 15.7 x 7.8",
            "22 x 16 x 10",
            "21.6 x 15.7 x 7.8",
            "22 x 14 x 9",
            "21.5 x 15.5 x 8",
            "21.6 x 13.7 x 9.8",
            "21.5 x 17.7 x 9.8",
            "21.6 x 15.7 x 7.8",
            "21.5 x 13.7 x 7.8",
            // "",
            "22 x 16 x 10",
            "21.7 x 13.7 x 10",
            "21.5 x 15.5 x 8",
            "22 x 17.7 x 9.8",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "21.5 x 13.7 x 9.8",
            "21.5 x 13.5 x 10",
            "21.5 x 15.7 x 7.8",
            "22 x 14 x 9",
            "22 x 14 x 9",
            "21 x 14 x 9",
            "21 x 14 x 8",
            "21.5 x 15.5 x 9",
            "21.5 x 15.7 x 9",
            "21.5 x 15.7 x 9",
        ];
    
    const dimensions = function dimensions(){
        return parseDimensions(stringDimensions);
    }
    
    
    const add = function add(a,b){
        return a+b;
    }
    
    const arraySummation = function arraySummation(arr){
        return _.foldl(arr, add, 0);
    }
    
    
    const volumes = function volumes(){
        return _.map(dimensions(), arraySummation);
    }
    
    const exporter = function exporter(){
        return {
            dimensions: dimensions(),
            volumes: volumes(),
        };
    }
    
    const main = function main(){
        logger.moduleLoad("LuggageDimensions");
        return exporter();
    }
    return main();
    
    


}(MODULES.Logger, MODULES));


