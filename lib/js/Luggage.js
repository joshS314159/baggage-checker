Modules.Luggage = (function Luggage($$, modules){
    
    const l = console.log;
    
    
    const { dimensions, volumes } = modules.LuggageDimensions;
    const { getInputDimensions } = modules.InputReader;
    

    const myLuggage = [10,10,9].sort(sortFloat);
    
    function sortFloat(a,b){
        return a - b;
    }
    
    function sort(arr){
        return arr.sort(sortFloat);
    }
    
    
    function isUnderSize(l){
        return  (myLuggage[0] < l[0]) && 
                (myLuggage[1] < l[1]) && 
                (myLuggage[2] < l[2]);
    }
    
    
    function isUnderVolume(){
        return 
    }
    
    
    function addDimensions(){
        
    }
    
    function filterByVolume(){
        const userVolume = modules.UserInput.volume();
        return _.filter(volumes, v => userVolume < v);
    }

    
    function submitResponder(){
        console.log("Submit Pressed");
        console.log(getInputDimensions())
        const fits = filterByVolume();
        console.log(volumes.length)
        console.log(fits.length, fits)
    }
    
    
    function initializeListeners(){
        $$.submitButton.click(submitResponder);
    }
    
    function initialize(){
        initializeListeners();
        // return parseDimensions(dimensions);
    }


    function exporter(){
        return {
            parseResults: initialize()
        };
    }
    
    
    function main(){
        modules.Logger.moduleLoading("Luggage");
        initialize();
        return exporter();
    }
    return main();
    
    
    
    
}(Modules.JqueryCache, Modules));

