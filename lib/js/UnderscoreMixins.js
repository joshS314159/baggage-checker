(function UnderscoreMixins(modules){
    'use strict';
    
    const _Compare_ = (function Compare(){
        const ENUMS = {
            GT: "GT",
            EQ: "EQ",
            LT: "LT",
        };
    
    
        function compareSingles(a,b){
            return (a < b) ? ENUMS.LT : 
                   (a > b) ? ENUMS.GT : 
                             ENUMS.EQ ;
        }
    
        function highestPrecedenceEnumInList(list){
            const containsFn = _.partial(_.contains, list);
            return containsFn(ENUMS.GT) ? ENUMS.GT :
                   containsFn(ENUMS.EQ) ? ENUMS.EQ :
                                          ENUMS.LT ;
        }
    
        function lowestPrecendenceEnumInList(list){
            const containsFn = _.partial(_.contains, list);
            return containsFn(ENUMS.LT) ? ENUMS.LT :
                   containsFn(ENUMS.EQ) ? ENUMS.EQ :
                                          ENUMS.GT ;        
        }
    
        function compareArrays(as,bs){
            return _.chain(as)
                    .zip(bs)
                    .map(arr => compare( _.first(arr), _.last(arr) ) )
                    .uniq()
                    .take(highestPrecedenceEnumInList)
                    .value();
        }
    
        function compare(a, b){
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
        
        function take(obj, interceptor) {
            return interceptor(obj);
        }
        return take;
    }());






    function initializeMixins(){
        _.mixin({
            compare: _Compare_,
            take: _Take_,
        });
    }
    
    function exporter(){
        return {};
    }
    
    
    
    
    function main(){
        modules.Logger.moduleLoading("Compare");
        initializeMixins();
        return exporter();
    }
    return main();
    
    
    
    
}(MODULES));