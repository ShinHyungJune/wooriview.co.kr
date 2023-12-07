export default ({ app }, inject) => {
    window.karrotPixel.init('1701914796237900001');

    inject('karrotPixel', {
        track: (eventName) => {
            window.karrotPixel.track(eventName);
        }
    });
};
