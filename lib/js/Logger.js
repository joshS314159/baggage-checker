MODULES.Logger = (function Logger(modules){
    'use strict';
    
    const IS_DEBUG = true;
    
    const history = [];
    
    const getHistory = function getHistory(){
        return history;
    }
    
    const addHistory = function addHistory(...args){
        history.push(args);
    }

    const info = function info(...args){
        console.info.apply(console, args);
        addHistory("info: ", args);
    }
    
    const log = function log(...args){
        console.log.apply(console, args);
        addHistory("log: ", args);
    }
    
    const error = function error(...args){        
        console.error.apply(console, args);
        addHistory("error: ", args);
    }
    
    const debug = function debug(...args){
        if(IS_DEBUG){
            console.log.apply(console, args);
            addHistory("debug: ", args);
        }
    }
    
    const moduleLoad = function moduleLoad(...args){
        // 1. Prepend log prefix log string
        args.unshift("LOADING: ");
        // 2. Pass along arguments to console.log
        console.log.apply(console, args);

        addHistory("moduleLoad: ", args);
    }
    
    const exporter = function exporter(){
        return {
            moduleLoad: moduleLoad,
            info: info,
            debug: debug,
            error: error,
            log: log,
            getHistory: getHistory,
        };
    }
    
    const main = function main(){
        moduleLoad("Logger");
        log("DEBUG MODE: ", IS_DEBUG);
        
        return exporter();
    }
    return main();
    
    


}(MODULES));


