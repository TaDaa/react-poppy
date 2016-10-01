//
//TODO cleanup and opensource
//TODO add groups
var SHOWING = {
    'NONE': 0,
    'MOUSEOVER': 1,
    'CONTENT': 2,
    'CLICK': 4,
    'PROPERTY': 8
},
    LEFT = 1,
    RIGHT = 2,
    TOP = 3,
    BOTTOM = 4;

var defaults = {
    //'onContentMouseLeave' : undefined,
    //'onContentMouseEnter' : undefined,
    'backgroundStyle': undefined,
    'arrowStyle': {},
    'foregroundStyle': undefined,
    'wrapperStyle': undefined,
    'content': '',
    'className': '',
    'title': '',
    'position': {
        'overflow': 'auto',
        'position': 'relative',
        'top': 0,
        'height': '100%',
        'left': 0,
        'width': '100%'
    },
    'constrainTo': 'parent',
    'persistOverContent': false,
    'showOnMouseEnter': true,
    'hideOnMouseLeave': true,
    'bindWindowResize': false,
    'bindScroll': false,
    //'hideOnClickOut' : false,
    'toggleOnClick': false,
    'constrainWidth': true,
    'constrainHeight': true,
    'track': false,
    //'constrainLeft' : true,
    //'constrainTop' : true,
    'arrowSize': 15,
    //'arrowPosition' : {},
    'region': undefined,
    'show': undefined,
    'showDelay': 300,
    'hideDelay': 320
},
    getDefaults = eval('(function () {return ' + JSON.stringify(defaults) + ';})');
(function (defaults) {
    var p, item;
    for (p in defaults) {
        item = defaults[p];
        if (item && typeof item === 'object') {
            defaults[p] = eval('(function (obj) {var result =' + JSON.stringify(item) + ',p; for (p in obj) {result[p]=obj[p]} return result;})');
        }
    }
})(defaults);

function assign_defaults(obja) {
    var _defaults = getDefaults(),
        val,
        d,
        p,
        q;
    for (p in obja) {
        if ((val = obja[p]) !== undefined && val !== null) {
            if (typeof val === 'object' && typeof (d = _defaults[p]) === 'object' && d) {
                for (q in val) {
                    d[q] = val[q];
                }
            } else {
                _defaults[p] = val;
            }
        }
    }
    return _defaults;
}

var React = require('react'),
    ReactDOM = require('react-dom'),
    Popover = React.createClass({
    displayName: 'Popover',

    'shouldComponentUpdate': function (props, state) {
        var last = this.state || {},
            position1 = last.position || {},
            position2 = state.position || {},
            result = this.minWidth !== position2.minWidth || this.minHeight !== position2.minHeight || this.maxWidth !== position2.maxWidth || last.content !== state.content || last.title !== state.title || this.maxHeight !== position2.maxHeight;
        return result;
    },
    'overflowStyle': {},
    'wrapperStyle': {},
    'render': function () {
        var state = this.state;
        if (!state) {
            return null;
        }
        var title = state.title,
            position = state.position,
            maxWidth = position.maxWidth,
            maxHeight = position.maxHeight,
            minWidth = position.minWidth,
            minHeight = position.minHeight,
            content = state.content,
            overflowStyle = this.overflowStyle,
            wrapperStyle = this.wrapperStyle;

        overflowStyle.overflow = content ? 'auto' : null;
        this.maxHeight = overflowStyle.maxHeight = wrapperStyle.maxHeight = maxHeight;
        this.maxWidth = overflowStyle.maxWidth = wrapperStyle.maxWidth = maxWidth;
        this.minHeight = overflowStyle.minHeight = wrapperStyle.minHeight = minHeight;
        this.minWidth = overflowStyle.minWidth = wrapperStyle.minWidth = minWidth;

        return React.createElement(
            'span',
            { className: "poppy " + (state.className || ''), onMouseOver: this._onEnter, onMouseOut: this._onExit },
            React.createElement(
                'span',
                { ref: 'inner', className: 'poppy-background' },
                React.createElement('div', { ref: 'arrow', className: 'poppy-arrow', style: state.arrowStyle }),
                React.createElement('div', { ref: 'wrapper', className: 'poppy-background-overlay', style: state.wrapperStyle })
            ),
            React.createElement(
                'div',
                { ref: 'content', className: 'poppy-content-wrapper', style: wrapperStyle },
                title ? React.createElement(
                    'div',
                    { ref: 'titleWrapper', className: 'poppy-title-wrapper' },
                    React.createElement(
                        'span',
                        { ref: 'title', className: 'poppy-title' },
                        state.title
                    )
                ) : null,
                React.createElement(
                    'div',
                    { ref: 'overflow', className: 'poppy-overflow', style: overflowStyle },
                    content ? React.createElement(
                        'div',
                        { ref: 'popover', className: 'poppy-content' },
                        ' ',
                        content || '',
                        ' '
                    ) : React.createElement('span', { ref: 'popover' })
                )
            )
        );
    },
    '_onEnter': function () {
        this.state.onEnterContent && this.state.onEnterContent(SHOWING.CONTENT);
    },
    '_onExit': function () {
        this.state.onLeaveContent && this.state.onLeaveContent(SHOWING.CONTENT);
    }
}),
    overlay_template = document.createElement('span');
overlay_template.innerHTML = '<div class="poppy-container" style="position:absolute;top:0px;display:inline;pointer-events:none;z-index:6000"></div>`';
overlay_template = overlay_template.lastChild;

module.exports = React.createClass({
    displayName: 'exports',

    'getInitialState': function () {
        var state = assign_defaults(this.props);
        this._lastTargetRect = { left: 0, top: 0, width: 0, height: 0 };
        this.settings = {
            arrowStyle: {
                width: defaults.arrowSize,
                height: defaults.arrowSize
            },
            constrainTo: defaults.constrainTo,
            showing: 0,
            showDelay: defaults.showDelay,
            hideDelay: defaults.hideDelay,
            //arrowSize:defaults.arrowSize,
            track: defaults.track,
            constrainHeight: defaults.constrainHeight,
            constrainWidth: defaults.constrainWidth,
            className: defaults.className,

            //showOnMouseEnter : defaults.showOnMouseEnter,
            //hideOnMouseLeave : defaults.hideOnMouseLeave,
            //toggleOnClick : defaults.toggleOnClick,
            //bindWindowResize : defaults.bindWindowResize,
            //persistOverContent : defaults.persistOverContent,
            //bindScrollContainer : defaults.bindScrollContainer

            title: ''
        };
        this.componentWillUpdate(this.props, state);
        return state;
    },
    'componentDidMount': function () {
        var me = this,
            settings = this.state.settings,
            target = ReactDOM.findDOMNode(this),
            window = target.ownerDocument.defaultView;

        me.setState({
            'target': target
        });
    },
    'componentWillUnmount': function () {
        var target = this.state.target,
            doc = target.ownerDocument,
            overlay = doc.body.querySelector('.ui-popover-overlay');
        window = doc.defaultView;

        if (this.settings && (target = this.settings.target)) {
            target.removeEventListener('mouseenter', this._onMouseEnter);
            target.removeEventListener('mouseleave', this._onMouseLeave);
            target.removeEventListener('click', this._onClick);
        }
        this.untrack();
        this._resize_timer && clearTimeout(this._resize_timer);
        this._show_timer && clearTimeout(this._show_timer);
        this._render_timer && clearTimeout(this._render_timer);
        this.overlay && this.overlay.parentNode.removeChild(this.popoverEl);
        this._init_timer && clearTimeout(this._init_timer);

        this.state.settings.bindWindowResize && window.removeEventListener('resize', this._onResize);
        this._boundScroll && this._boundScroll.removeEventListener('scroll', this._onScroll);
    },
    'componentWillUpdate': function (props, state) {
        this._updateSync(props, state);
        !this._render_timer && (this._render_timer = setTimeout(this._updateAsync, 16));
    },
    '_updateSync': function (props, state) {
        state = state || this.state;
        var settings = this.settings,
            bindWindowResize = props.bindWindowResize || false,
            target = state && state.target,
            ltarget = settings.target,
            track = props.track || false,
            view = target && target.ownerDocument.defaultView,
            bindScroll = props.bindScroll === true ? 'window' : props.bindScroll,
            boundScroll = this._boundScroll,
            scroller = settings.target ? this._upwardSelector(bindScroll, settings) : false;

        if (bindWindowResize !== settings.bindWindowResize) {
            if (bindWindowResize) {
                view && (view.addEventListener('resize', this._onResize), settings.bindWindowResize = true);
            } else {
                view && view.removeEventListener('resize', this._onResize);
                settings.bindWindowResize = false;
            }
        }

        if (scroller !== boundScroll) {
            if (boundScroll) {
                boundScroll.removeEventListener('scroll', this._onScroll);
                this._boundScroll = false;
            }
            if (scroller) {
                scroller.addEventListener('scroll', this._onScroll, true);
                this._boundScroll = scroller;
            }
        }

        if (track !== settings.track) {
            if (track) {
                settings.track = true;
                this.track();
            } else {
                settings.track = false;
                this.untrack();
            }
        }

        if (target && ltarget !== target) {
            target.addEventListener('mouseenter', this._onMouseEnter);
            target.addEventListener('mouseleave', this._onMouseLeave);
            target.addEventListener('click', this._onClick);
            settings.target = target;
            if (ltarget) {
                ltarget.removeEventListener('mouseenter', this._onMouseEnter);
                ltarget.removeEventListener('mouseleave', this._onMouseLeave);
                ltarget.removeEventListener('click', this._onClick);
            }
        }

        if (props.persistOverContent) {
            settings.persistOverContent = true;
            settings.onEnterContent = this.show;
            settings.onLeaveContent = this.hide;
        } else {
            settings.persistOverContent = false;
            settings.onEnterContent = false;
            settings.onLeaveContent = false;
        }

        settings.toggleOnClick = props.toggleOnClick !== undefined ? props.toggleOnClick : defaults.toggleOnClick;
        settings.showOnMouseEnter = props.showOnMouseEnter !== undefined ? props.showOnMouseEnter : defaults.showOnMouseEnter;
        settings.hideOnMouseLeave = props.hideOnMouseLeave !== undefined ? props.hideOnMouseLeave : defaults.hideOnMouseLeave;
        settings.constrainHeight = props.constrainHeight !== undefined ? props.constrainHeight : defaults.constrainHeight;
        settings.constrainWidth = props.constrainWidth !== undefined ? props.constrainWidth : defaults.constrainWidth;
    },
    '_updateAsync': function () {
        this._render_timer = undefined;

        if (!this.settings.target) {
            return;
        }

        var me = this,
            props = this.props,
            show = props.show,
            settings = this.settings,
            showing = settings.showing & SHOWING.PROPERTY,
            doc = settings.target.ownerDocument,
            body = doc.body,
            overlay = this._upwardSelector(".poppy-container"),
            popover = this.popover,
            arrowStyle = settings.arrowStyle,
            arrowSize = props.arrowSize !== undefined ? props.arrowSize : defaults.arrowSize,
            region = props.region;

        settings.constrainTo = props.constrainTo || defaults.constrainTo;

        settings.constrainTarget = this._upwardSelector(settings.constrainTo, settings);

        if (region && region !== settings.last_prop_region) {
            if (region === 'top') {
                settings.region = TOP;
            } else if (region === 'left') {
                settings.region = LEFT;
            } else if (region === 'right') {
                settings.region = RIGHT;
            } else if (region === 'bottom') {
                settings.region = BOTTOM;
            }
        } else if (!region) {
            settings.region = defaults.region;
        }

        settings.last_prop_region = region;
        settings.title = props.title || defaults.title;
        settings.content = props.content || defaults.content;
        settings.className = props.className || defaults.className;

        if (settings.arrowSize !== arrowSize) {
            settings.arrowSize = arrowSize;
            settings.arrowSize3_4 = arrowSize * .75;
            settings.arrowSize1_2 = arrowSize * .5;
            settings.arrowSize2_1 = arrowSize * 2;
            settings.arrowSize3_2 = arrowSize * 1.5;
            arrowStyle.height = arrowStyle.width = arrowSize;
        }

        this._adjustPosition(this.settings);

        if (!overlay || overlay === body) {
            body.appendChild(overlay = this.overlay = overlay_template.cloneNode(true));
        } else if (!this.overlay) {
            this.overlay = overlay;
        }

        if (!popover) {
            var test = document.createElement('div');
            popover = this.popover = ReactDOM.render(React.createElement(Popover, null), test);
            overlay.appendChild(test.lastChild);
        } else if (this.overlay.ownerDocument !== doc && this.popoverEl) {
            overlay.appendChild(this.popoverEl);
            this.overlay = overlay;
        }

        popover.setState(settings);
        if (!this.popoverEl) {
            this.popoverEl = ReactDOM.findDOMNode(popover);
        }

        if (this._init_timer) {
            cancelAnimationFrame(this._init_timer);
        }
        this._init_timer = requestAnimationFrame(function () {
            if (showing && !show) {
                me.hide(SHOWING.PROPERTY);
            } else if (!showing && show) {
                me.show(SHOWING.PROPERTY);
            }

            me._init_timer = false;
            me._updatePositions();
        });
    },
    '_onResize': function () {
        var me = this;
        if (this._resize_timer) {
            clearTimeout(this._resize_timer);
        }
        this._resize_timer = setTimeout(function () {
            me._resize_timer = undefined;
            me.setState({});
        }, 60);
    },
    '_onMouseEnter': function () {
        if (this.settings.showOnMouseEnter) {
            this.show(SHOWING.MOUSEOVER);
        }
    },
    '_onMouseLeave': function () {
        if (this.settings.hideOnMouseLeave) {
            this.hide(SHOWING.MOUSEOVER);
        }
    },
    '_onClick': function () {
        if (this.settings.toggleOnClick) {
            if (this.settings.showing & SHOWING.CLICK) {
                this.hide(SHOWING.CLICK);
            } else {
                this.show(SHOWING.CLICK);
            }
        }
    },
    '_adjustPosition': function (settings) {
        var rect = settings.target.getBoundingClientRect(),
            parentRect = settings.constrainTarget.getBoundingClientRect(),
            region = settings.region,
            leftSpace = settings.leftSpace = rect.left - parentRect.left,
            rightSpace = settings.rightSpace = parentRect.left + parentRect.width - (rect.left + rect.width),
            topSpace = settings.topSpace = rect.top - parentRect.top,
            bottomSpace = settings.bottomSpace = parentRect.top + parentRect.height - (rect.top + rect.height),
            arrowSize = settings.arrowSize,
            position = settings.position,
            half_size = settings.arrowSize3_4,
            constrainHeight = settings.constrainHeight,
            constrainWidth = settings.constrainWidth,
            double_size = arrowSize * 2;

        if (!position) {
            position = settings.position = {};
        }

        if (!region) {
            if (leftSpace > bottomSpace && leftSpace > topSpace && leftSpace >= rightSpace && topSpace > 30 && bottomSpace > 30) {
                region = settings.region = LEFT;
            } else if (rightSpace > bottomSpace && rightSpace > topSpace && topSpace > 30 && bottomSpace > 30) {
                region = settings.region = RIGHT;
            } else if (topSpace > bottomSpace) {
                region = settings.region = TOP;
            } else {
                region = settings.region = BOTTOM;
            }
        }

        if (region === LEFT) {
            position.minWidth = 0;
            position.minHeight = double_size;
            position.top = position.left = 0;
            constrainWidth && (position.maxWidth = Math.max(leftSpace - half_size - 25, double_size));
            constrainHeight && (position.maxHeight = Math.max(topSpace + bottomSpace + rect.height - 30, 5));
        } else if (region === RIGHT) {
            position.minWidth = 0;
            position.top = 0;
            position.minHeight = double_size;
            position.left = rect.left + rect.width + half_size;
            constrainWidth && (position.maxWidth = Math.max(rightSpace - half_size - 25, double_size));
            constrainHeight && (position.maxHeight = Math.max(topSpace + bottomSpace + rect.height - 30, 5));
        } else if (region === BOTTOM) {
            position.minHeight = 'auto';
            position.top = rect.top + rect.height + half_size;
            position.left = 0;
            position.minWidth = double_size;
            constrainHeight && (position.maxHeight = Math.max(bottomSpace - half_size - 5, 25));
            constrainWidth && (position.maxWidth = Math.max(leftSpace + rightSpace + rect.width - 30, 25));
        } else {
            position.minHeight = 'auto';
            position.top = position.left = 0;
            position.minWidth = double_size;
            constrainHeight && (position.maxHeight = Math.max(topSpace - half_size + 2, 25));
            constrainWidth && (position.maxWidth = Math.max(leftSpace + rightSpace + rect.width - 30, 25));
        }
    },
    '_onScroll': function () {
        !this._render_timer && this._updateAsync();
    },
    '_track_timer': undefined,
    '_doTrack': function () {
        this._track_timer = setTimeout(this._doTrack, 16);

        var settings = this.settings,
            target = settings.target;

        if (!target || !this.popover) {
            return;
        }

        var targetRect = target.getBoundingClientRect(),
            lastTargetRect = this._lastTargetRect;

        if (targetRect.top !== lastTargetRect.top || targetRect.left !== lastTargetRect.left || targetRect.width !== lastTargetRect.width || targetRect.height !== lastTargetRect.height || targetRect.ownerDocument !== this._lastTargetDoc) {
            this._lastTargetRect = targetRect;
            this._lastTargetDoc = targetRect.ownerDocument;
            !this._render_timer && this._updateAsync();
        }
    },
    'track': function () {
        if (!this._track_timer) {
            this._track_timer = setTimeout(this._doTrack, 16);
        }
        return this;
    },
    'untrack': function () {
        if (this._track_timer) {
            clearTimeout(this._track_timer);
            this._track_timer = false;
        }
        return this;
    },
    'refresh': function () {
        this.setState({});
        return this;
    },
    'hide': function (trigger) {
        var me = this,
            settings = this.settings,
            showing = settings.showing;
        if (!showing) {
            return;
        }

        if (showing & trigger) {
            settings.showing -= trigger;
        } else {
            return;
        }

        var node = this.popoverEl,
            style = node.style;
        this._show_timer && clearTimeout(this._show_timer);
        this._show_timer = setTimeout(function () {
            if (settings.showing) {
                return;
            }
            !node.$listener && node.addEventListener('transitionend', node.$listener = function () {
                node.removeEventListener('transitionend', node.$listener);
                node.$listener = false;
                !settings.showing && (node.style.visibility = 'hidden');
            });
            me._show_timer = undefined;
            style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
            if (settings.region === RIGHT) {
                style.transform = 'translateX(30px)translateY(0px)';
            } else if (settings.region === LEFT) {
                style.transform = 'translateX(-30px)translateY(0px)';
            } else if (settings.region === TOP) {
                style.transform = 'translateX(0px)translateY(-30px)';
            } else {
                style.transform = 'translateX(0px)translateY(30px)';
            }
            style.opacity = 0;
            me.props.onHide && me.props.onHide();
        }, settings.hideDelay);
    },
    'show': function (trigger) {
        var me = this,
            settings = this.settings,
            node = this.popoverEl,
            style = node.style,
            reset = true,
            was_showing = settings.showing;

        settings.showing |= trigger;
        if (was_showing) {
            return;
        } else if (this._show_timer) {
            clearTimeout(this._show_timer);
            this._show_timer = undefined;
            reset = false;
        }
        node.$listener && node.removeEventListener('transitionend', node.$listener);
        node.$listener = false;

        if (reset) {
            this._show_timer = setTimeout(function () {
                if (!settings.showing) {
                    return;
                }
                me.props.onShow && me.props.onShow();
                me._show_timer = undefined;
                style.transition = null;
                if (settings.region === RIGHT) {
                    style.transfrom = 'translateX(30px)translateY(0px)';
                } else if (settings.region === LEFT) {
                    style.transform = 'translateX(-30px)translateY(0px)';
                } else if (settings.region === TOP) {
                    style.transform = 'translateX(0px)translateY(-30px)';
                } else {
                    style.transform = 'translateX(0px)translateY(30px)';
                }
                me._show_timer = setTimeout(function () {
                    me._show_timer = undefined;
                    style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
                    style.visibility = null;
                    style.opacity = 1;
                    style.transform = 'translateX(0px)translateY(0px)';
                }, settings.showDelay);
            });
        } else {
            style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
            style.visibility = null;
            style.opacity = 1;
            style.transform = 'translateX(0px)translateY(0px)';
        }
    },
    '_upwardSelector': function (selector, settings) {
        var target = settings.target,
            parent,
            document = target.ownerDocument;

        if (!selector) {
            return selector;
        } else if (typeof selector === 'string') {
            if (selector === 'body') {
                return document.body;
            } else if (selector === 'parent') {
                return target && target.parentNode;
            } else if (selector === 'window') {
                return target && target.ownerDocument.defaultView;
            } else {
                while (target) {
                    if (target.matches && target.matches(selector)) {
                        return target;
                    }
                    target = target.parentNode;
                }
                return document.body;
            }
        } else if (target = ReactDOM.findDOMNode(selector)) {
            return target;
        }
        return selector;
    },
    '_updatePositions': function () {
        var target = this.settings.target;
        if (!target) {
            return;
        }
        var overflow = this.popover.refs.overflow,
            overflowStyle = overflow.style,
            overflowRect,
            popoverRect = this.popover.refs.popover.getBoundingClientRect(),
            wrapperStyle = this.popover.refs.wrapper.style,
            arrow = this.popover.refs.arrow,
            arrowelStyle = arrow.style,
            contentStyle = this.popover.refs.content.style,
            title = this.popover.refs.title,
            titleRect = title && title.getBoundingClientRect(),
            titleWrapper = this.popover.refs.titleWrapper,
            titleWrapperRect = titleWrapper && titleWrapper.getBoundingClientRect(),
            titleWidth = titleRect && titleRect.width || 0,
            titleHeight = titleRect && titleRect.height || 0,
            targetRect = target.getBoundingClientRect(),
            targetTop = targetRect.top,
            targetWidth = targetRect.width,
            halfTargetWidth = targetWidth / 2,
            targetHeight = targetRect.height,
            halfTargetHeight = targetHeight / 2,
            targetLeft = targetRect.left,
            settings = this.settings,
            parentRect = settings.constrainTarget.getBoundingClientRect(),
            offsetTop,
            offsetLeft,
            parentTop = offsetTop = parentRect.top,
            parentLeft = offsetLeft = parentRect.left,
            arrowLeft = offsetLeft | 0,
            arrowTop = offsetTop | 0,
            width,
            height,
            region = settings.region,
            spaceLeft = settings.leftSpace,
            spaceTop = settings.topSpace,
            arrowSize = settings.arrowSize | 0,
            size1_2 = settings.arrowSize1_2,
            size3_4 = settings.arrowSize3_4,
            size2_1 = settings.arrowSize2_1,
            size3_2 = settings.arrowSize3_2,
            arrowStyle = settings.arrowStyle,
            upperBounds,
            lowerBounds,
            x = settings.position.left,
            y = settings.position.top,
            c;

        overflowStyle.paddingTop = titleHeight + 'px';
        overflowStyle.maxHeight = Math.max(Math.round(this.settings.position.maxHeight - titleHeight), 0) + 'px';

        overflowRect = overflow.getBoundingClientRect();
        width = Math.max(overflowRect.width, titleWidth);
        height = overflowRect.height;

        if (!this.settings.target) {
            return;
        }
        if (region === TOP || region === BOTTOM) {
            lowerBounds = 5;
            upperBounds = parentLeft + parentRect.width - 5;
            offsetLeft = targetLeft + halfTargetWidth - width / 2;
            if (offsetLeft < lowerBounds) {
                offsetLeft = lowerBounds;
            }
            if ((c = targetLeft + targetWidth - size3_2) < lowerBounds) {
                offsetLeft = c;
            }
            if (offsetLeft > (c = upperBounds - width)) {
                offsetLeft = c;
            }
            if ((c = targetLeft + arrowSize) > upperBounds) {
                offsetLeft = c - width;
            }

            arrowLeft += spaceLeft + halfTargetWidth - arrowSize;
            arrowLeft = Math.max(Math.min(arrowLeft, offsetLeft + width - size2_1), offsetLeft) + size1_2;
            x = offsetLeft;
            if (region === TOP) {
                y = targetTop - height - size3_4 - 9;
                arrowTop = y + height - size1_2;
            } else {
                arrowTop = y - size1_2;
            }
        } else if (region === LEFT || region === RIGHT) {
            offsetTop += spaceTop + targetHeight - halfTargetHeight - height / 2;
            upperBounds = parentTop + parentRect.height - 5;
            lowerBounds = 5;

            if (offsetTop < lowerBounds) {
                offsetTop = lowerBounds;
            }
            if ((c = targetTop + targetHeight - size3_2) < lowerBounds) {
                offsetTop = c;
            }
            if (offsetTop > (c = upperBounds - height)) {
                offsetTop = c;
            }
            if ((c = targetTop + arrowSize) > upperBounds) {
                offsetTop = c - height;
            }
            arrowTop += spaceTop + halfTargetHeight - arrowSize;
            arrowTop = Math.max(Math.min(arrowTop, offsetTop + height - size2_1), offsetTop) + size1_2;
            y = offsetTop;
            if (region === LEFT) {
                x = targetLeft - width - size3_4 - 6;
                arrowLeft = x + width - size1_2 - 1;
            } else {
                x = targetLeft + targetWidth + size3_4;
                arrowLeft = x - size1_2 + 1;
            }
        }

        contentStyle.width = wrapperStyle.width = (width | 0) + 'px';
        arrowelStyle.top = (arrowTop | 0) + 'px';
        arrowelStyle.left = (arrowLeft | 0) + 'px';
        wrapperStyle.top = contentStyle.top = (y | 0) + 'px';
        wrapperStyle.left = contentStyle.left = (x | 0) + 'px';
        wrapperStyle.height = (height | 0) + 'px';

        this.settings.showing && (this.popoverEl.style.visiblity = null);
    },
    'render': function () {
        var children = this.props.children;
        if (typeof children === 'string') {
            children = React.createElement(
                'span',
                null,
                children
            );
        }
        return children || null;
    }
});