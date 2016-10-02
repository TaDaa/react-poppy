#React-Poppy

React popover that scales, follows, scrolls, and grows

##Demos

* <a href="https://tadaa.github.io/demos/poppy/scroll.html" target="_blank">reposition on scroll events</a>

* <a href="https://tadaa.github.io/demos/poppy/interaction.html" target="_blank">interactions (hover to show, mouse over to keep popover open, toggle to open, grow based on content, scroll content)</a>

* <a href="https://tadaa.github.io/demos/poppy/statePosition.html" target="_blank">repositions on state change</a>

* <a href="https://tadaa.github.io/demos/poppy/track.html" target="_blank">can track elements (same as above demo except follows elements not modified by react state)</a>


##Properties
* children=[ReactElement] - the target element that the popover should follow and position around

* constrainTo=[element,ReactElement,querySelector='parent'] - used to calculate the bounding area that the popover should be contained in.  If using a string, the querySelector is matched upward from the popover's location in the DOM tree. Parent is a special selector that will use the React element containing the popover.

* show=[boolean=undefined] - forces the popover to show.  Show takes precedence over all other types of show/hide interactions.

* showDelay=[number=300] - amount of time that needs to pass before the popover begins to show.

* hideDelay=[number=320] - amount of time that needs to pass before the popover begins to hide.

* track=[boolean=false] - enables an internal timer to track the target element's position and size

* constrainHeight=[boolean=true] - limits the height to the constrainTo's available space

constrainWidth=[boolean=true] - limits the width to the constrainTo's available space

* arrowSize=[number=15] - changes the size of the arrow

* region=["left"|"right|"top|"bottom"|undefined] - forces popover placement in a particular region

* bindScroll=[boolean=false|querySelector] - binds the popover to the window scroll event if "true" or an element matching the querySelector traversing upwards from the popover target.

* bindWindowResize=[boolean=false] - binds the popover to the window resize event

* arrowStyle=[object={}] - arrowStyle override

* backgroundStyle=[object=undefined] - backgroundStyle override

* wrapperStyle=[object=undefined] - wrapperStyle verride

* titleStyle=[object=undefined] - titleStyle override

* className=[string=''] - className to apply to popover

* title=[string=''|ReactElement] - title to be used.

* showOnMouseEnter=[boolean=true] - popover will show when mouse enters target element

* hideOnMouseLeave=[boolean=true] - popover will hide when mouse leaves target element.

* toggleOnClick=[boolean=false] - popover will toggle show/hide when target element is clicked.  

* persistOverContent=[boolean=false] - popover will stay visible while the mouse is over the popover

* onHide=[function] - event called when the popover is hidden

* onShow=[function] - event called when the popover is shown


##Methods -- warning you should generally control these behaviors with props to keep behaviors consistent

* track() -  start tracking target element

* untrack() -  stop tracking target element

* show() - show popover 

* hide() - hide popover

* refresh() - redraw popover

