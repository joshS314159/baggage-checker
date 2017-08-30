MODULES.DomWriter = (function DomWriter($$, logger, modules){
    'use strict';
    
    
    const modifyButtonDisableState = (el, isDisable) => $(el).prop("disabled", isDisable);
    
    
    const enableButton = _.partial(modifyButtonDisableState, _, false);

    
    const disableButton = _.partial(modifyButtonDisableState, _, true);


    const enableSubmitButton = _.partial(enableButton, $$.submitButton);
    
    
    const disableSubmitButton = _.partial(disableButton, $$.submitButton);
    
    

    
    const exporter = () => ({
        enableSubmitButton: enableSubmitButton,
        disableSubmitButton: disableSubmitButton,
    });
    
    
    const main = () => {
        logger.moduleLoad("DomReaderWriter");
        
        return exporter();
    }
    return main();
    
    
}(MODULES.JqueryCache, MODULES.Logger, MODULES));