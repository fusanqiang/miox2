'use strict';

import prefixProperty from 'prefix-property';

const defaultEventFailureGracePeriod = 100;

export default async (element, expectedDuration, eventFailureGracePeriod) => {
    await new Promise(resolve => {
        const transitionend = getTransitionEndEvent();
        const gracePeriod = eventFailureGracePeriod !== undefined ?
            eventFailureGracePeriod :
            defaultEventFailureGracePeriod;
        let done = false;
        let forceEnd = false;

        element.addEventListener(transitionend, onTransitionEnd);

        setTimeout(() => {
            if (!done) {
                // forcing onTransitionEnd callback...
                forceEnd = true;
                onTransitionEnd();
            }else{
                resolve();
            }
        }, expectedDuration + gracePeriod);

        function onTransitionEnd(e) {
            if (forceEnd || e.target === element) {
                done = true;
                element.removeEventListener(transitionend, onTransitionEnd);
                resolve();
            }
        }
    });
}

const getTransitionEndEvent = (() => {
    let transitionEndEvent = null;
    return () =>
    transitionEndEvent || (transitionEndEvent = ({
        transition: 'transitionend',
        OTransition: 'otransitionend',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    })[prefixProperty('transition')]);
})();
