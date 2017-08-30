(function UnderscoreMixins(logger, modules){
    'use strict';
    
    const _Compare_ = (function Compare(){
        const ENUMS = {
            GT: "GT",
            EQ: "EQ",
            LT: "LT",
        };
    
    
        const compareSingles = (a,b) =>
            (a < b) ? ENUMS.LT : 
            (a > b) ? ENUMS.GT : 
                      ENUMS.EQ ;
    
    
        const highestPrecedenceEnumInList = (list) => 
            _.contains(list, ENUMS.GT) ? ENUMS.GT :
            _.contains(list, ENUMS.LT) ? ENUMS.LT :
                                         ENUMS.EQ ;
    
        const lowestPrecendenceEnumInList = (list) =>
            _.partial(list, ENUMS.LT) ? ENUMS.LT :
            _.partial(list, ENUMS.EQ) ? ENUMS.EQ :
                                        ENUMS.GT ;
                                    
        const compareArray = (array) => 
            compare( _.first(array), _.last(array) );
    
    
        const compareArrays = (as,bs) =>
            _.chain(as)
             .zip(bs)
             .map(compareArray)
             .uniq()
             .take(highestPrecedenceEnumInList)
             .value();

    
        const areArrays = (a,b) => 
             _.isArray(a) && _.isArray(b);
        
        const areUndefined = (a,b) => 
             _.isUndefined(a) || _.isUndefined(b);

        const compare = (a, b) =>
            areUndefined(a,b) ? ENUMS              :
            areArrays(a,b)    ? compareArrays(a,b) : 
                                compareSingles(a,b);

                                
        return compare;
    }());

    
    

    
    
    
    
    const _Take_ = (function Take(){
        // https://stackoverflow.com/a/3946398
        
        const take = (obj, interceptor) => interceptor(obj);
        
        return take;
    }());
    
    
    
    const _ZipObject_ = (function ZipObject(){
        
        // input: myKey, ["hello world!", "dank objects"]
        // output: [{myKey: "hello world!"}, {myKey: "dank objects"}]
        const setKeyToValues = (key, values) =>
            _.map(values, v => _.object([key], [v]) );
        
        
        
        // input: ["myKey", ["hello world!", "dank objects"]]
        // output: [{myKey: "hello world!"}, {myKey: "dank objects"}]
        const setKeyToValuesArray = (array) => 
            setKeyToValues( _.first(array), _.last(array) );
        
        
        
        // input: [["myKey", ["hello world!", "dank objects"]], 
        //         ["anotherKey", ["goodbye world!", "crappy objects"]]]
        // output: [[{myKey: "hello world!"}, {myKey: "dank objects"}],
        //           [{anotherKey: "goodbye world!"}, {anotherKey: "crappy objects"}] 
        const assignKeysToMultipleValues = (array) => 
            _.map(array, setKeyToValuesArray);
        
        
        
        // input: [{myKey: "hello world!"}, {anotherKey: "goodbye world!"}]
        // output: {myKey: "hello world!", anotherKey: "goodbye world!"}
        const combineObjects = (os) =>
            Object.assign(...os);
        
        // input: [[ {myKey: "hello world!", anotherKey: "goodbye world!"}, 
        //           {myKey: "dank objects", anotherKey: "crappy objects"} ], 
        //         [ {anotherKey: "goodbye world!"}, 
        //           {anotherKey: "crappy objects"} ] ]
        // output: [[{myKey: "hello world!"}, {anotherKey: "goodbye world!"} ], 
        //          [{myKey: "dank objects"}, {anotherKey: "crappy objects"} ]]
        const zipArrayAsArguments = (array) =>
            _.zip(...array);
        
        
        // input: ['myKey',['hello world!','dank objects'] ],
        //        ['anotherKey',['goodbye world!','crappy objects'] ]
        // output: [{myKey: "hello world!", anotherKey: "goodbye world!"}, 
        //          {myKey: "dank objects", anotherKey: "crappy objects"} ]
        const zipObject = (...args) => 
            _.chain(args)
             .take(assignKeysToMultipleValues)
             .take(zipArrayAsArguments)
             .map(combineObjects)
             .value();
        

        
        return zipObject;
        
        
    }());






    const initializeMixins = () => {
        _.mixin({
            compare: _Compare_,
            take: _Take_,
            zipObject: _ZipObject_,
        });
    }
    
    const exporter = () => ({});
    
    
    
    
    const main = () => {
        logger.moduleLoad("Compare");
        initializeMixins();
        return exporter();
    }
    return main();
    
    
    
    
}(MODULES.Logger, MODULES));

