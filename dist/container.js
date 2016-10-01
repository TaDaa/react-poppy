var React = require('react');
module.exports = React.createClass({
    displayName: 'exports',

    'shouldComponentUpdate': function () {
        return !this.loaded && (this.loaded = true);
    },
    'render': function () {
        return React.createElement('div', { className: 'poppy-container', style: { position: 'absolute', display: 'inline', top: 0, pointerEvents: 'none', zIndex: 6000 } });
    }
});