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
    
    function filterUnderVolume(){
        const userVolume = modules.UserInput.volume();
        return _.filter(volumes, v => userVolume < v);
    }
    
    function filterOverVolume(){
        const userVolume = modules.UserInput.volume();
        return _.filter(volumes, v => userVolume > v);
    }
    
    function filterEqualsVolume(){
        const userVolume = modules.UserInput.volume();
        return _.filter(volumes, v => userVolume === v);
    }
    
    function filterByVolume(){
        const sorted = {
            undersize: filterUnderVolume(),
            oversize: filterOverVolume(),
            equals: filterEqualsVolume(),
        };        
        return sorted;
    }
    
    
    function wrapInSpan(htmlString){
        return "<span>"+htmlString+"</span>";
    }
    
    function formatVolumeResultForDom(volumeResults){
        return wrapInSpan( _.foldl(volumeResults, (acc, v) => acc+"<br>"+v, "") );
    }
    
    function updateDomWithVolumes(results){
        $$.luggageVolumeUndersizeResult.html(results.undersize);
        $$.luggageVolumeOversizeResult.html(results.oversize);
        $$.luggageVolumeEqualsizeResult.html(results.equals);
    }


    
    function submitResponder(e){
        e.preventDefault();
        e.stopPropagation();
        
        const fits = _.mapObject(filterByVolume(), formatVolumeResultForDom);
        updateDomWithVolumes(fits);
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

