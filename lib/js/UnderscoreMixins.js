(function UnderscoreMixins(logger, modules){
    'use strict';
    
    const _Compare_ = (function Compare(){
        const ENUMS = {
            GT: "GT",
            EQ: "EQ",
            LT: "LT",
        };
    
    
        const compareSingles = function compareSingles(a,b){
            return (a < b) ? ENUMS.LT : 
                   (a > b) ? ENUMS.GT : 
                             ENUMS.EQ ;
        }
    
        const highestPrecedenceEnumInList = function highestPrecedenceEnumInList(list){
            const containsFn = _.partial(_.contains, list);
            return containsFn(ENUMS.GT) ? ENUMS.GT :
                   containsFn(ENUMS.EQ) ? ENUMS.EQ :
                                          ENUMS.LT ;
        }
    
        const lowestPrecendenceEnumInList = function lowestPrecendenceEnumInList(list){
            const containsFn = _.partial(_.contains, list);
            return containsFn(ENUMS.LT) ? ENUMS.LT :
                   containsFn(ENUMS.EQ) ? ENUMS.EQ :
                                          ENUMS.GT ;        
        }
    
        const compareArrays = function compareArrays(as,bs){
            return _.chain(as)
                    .zip(bs)
                    .map(arr => compare( _.first(arr), _.last(arr) ) )
                    .uniq()
                    .take(highestPrecedenceEnumInList)
                    .value();
        }
    
        const compare = function compare(a, b){
            const isArray = _.isArray(a) && _.isArray(b);    
            const isUndefined = _.isUndefined(a) && _.isUndefined(b);
        
            return  isUndefined ? ENUMS              :
                    isArray     ? compareArrays(a,b) : 
                                  compareSingles(a,b);        
        }
        
        return compare;
    }());

    
    
    
    
    
    
    
    const _Take_ = (function Take(){
        // https://stackoverflow.com/a/3946398
        
        const take = function take(obj, interceptor) {
            return interceptor(obj);
        }
        return take;
    }());






    const initializeMixins = function initializeMixins(){
        _.mixin({
            compare: _Compare_,
            take: _Take_,
        });
    }
    
    const exporter = function exporter(){
        return {};
    }
    
    
    
    
    const main = function main(){
        logger.moduleLoad("Compare");
        initializeMixins();
        return exporter();
    }
    return main();
    
    
    
    
}(MODULES.Logger, MODULES));