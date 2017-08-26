MODULES.DomWriter = (function DomWriter($$, logger, modules){
    'use strict';
    
    
    const modifyButtonState = function modifyButtonState(el, isDisable){
        return $(el).prop("disabled", isDisable);
    }
    
    
    const enableButton = function enableButton(el){
        return modifyButtonState(el, false);
    }
    
    const disableButton = function disableButton(el){
        return modifyButtonState(el, true);
    }


    const enableSubmitButton = function enableSubmitButton(){
        console.log($$)
        enableButton($$.submitButton);
    }
    
    
    const disableSubmitButton = function disableSubmitButton(){
        disableButton($$.submitButton);
    }
    
    

    
    const exporter = function exporter(){
        return {
            enableSubmitButton: enableSubmitButton,
            disableSubmitButton: disableSubmitButton,
        };
    }
    
    
    const main = function main(){
        logger.moduleLoad("DomReaderWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));