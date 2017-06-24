var React = require('react');

module.exports = class Container extends React.Component {
    shouldComponentUpdate () {
        return !this.loaded && (this.loaded = true);
    }
    render () {
        return <div className="poppy-container" style={{position:'absolute',display:'inline',top:0,pointerEvents:'none',zIndex:6000}}></div>
    }
};
