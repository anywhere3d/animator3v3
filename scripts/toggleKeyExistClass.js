//  toggleKeyExistClass.js

    function toggleKeyExistClass(){
    //  Remove class.
        if ( !animationDataKeyExist && $(outputTimerSelector).hasClass("key-exist") ) {
            debugMode && console.log("remove class key-exist:", $(outputTimerSelector).hasClass("key-exist") );
            $(outputTimerSelector).toggleClass("key-exist");
        }
    //  Add class.
        if ( animationDataKeyExist && !$(outputTimerSelector).hasClass("key-exist") ) {
            $(outputTimerSelector).toggleClass("key-exist");
            debugMode && console.log( "add class key-exist:", 
                $(outputTimerSelector).hasClass("key-exist"), 
                animation.currentTime.toFixed(2).replace(/\./, ":"), "sec." 
            );
        }
    }
