var React = require('react');
module.exports = React.createClass({
    'shouldComponentUpdate' : function () {
        return !this.loaded && (this.loaded = true);
    },
    'render' : function () {
        return <div className="poppy-container" style={{position:'absolute',display:'inline',top:0,pointerEvents:'none',zIndex:6000}}></div>
    }
});
