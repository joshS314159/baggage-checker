MODULES.DomWriter = (function DomWriter($$, logger, modules){
    'use strict';
    
    
    const modifyButtonDisableState = (el, isDisable) => $(el).prop("disabled", isDisable);
    
    
    const enableButton = _.partial(modifyButtonDisableState, _, false);

    
    const disableButton = _.partial(modifyButtonDisableState, _, true);




    const enableSubmitButton = _.partial(enableButton, $$.submitButton);
    
    
    const disableSubmitButton = _.partial(disableButton, $$.submitButton);
    
    

    
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