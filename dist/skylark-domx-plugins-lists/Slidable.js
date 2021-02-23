/**
 * skylark-domx-plugins-lists - The skylark list plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-lists/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins","./lists"],function(t,i,s,e,n){"use strict";var o=e.Plugin.inherit({klassName:"Slidable",pluginName:"domx.plugins.lists.slidable",options:{container:null,slidesContainer:"div",titleElement:"h3",displayClass:"lark-domx-slidable-display",singleClass:"lark-domx-slidable-single",leftEdgeClass:"lark-domx-slidable-left",rightEdgeClass:"lark-domx-slidable-right",playingClass:"lark-domx-slidable-playing",controlsClass:"lark-domx-slidable-controls",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",displayTransition:!0,clearSlides:!0,toggleControlsOnReturn:!0,toggleControlsOnSlideClick:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!1,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,hidePageScrollbars:!1,indicatorContainer:"ol",activeIndicatorClass:"active",thumbnailProperty:"thumbnail",thumbnailIndicators:!0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(t){var i,e={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},n={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}};for(i in n)if(n.hasOwnProperty(i)&&void 0!==t.style[i]){e.transition=n[i],e.transition.name=i;break}function o(){var i,s,n=e.transition;document.body.appendChild(t),n&&(i=n.name.slice(0,-9)+"ransform",void 0!==t.style[i]&&(t.style[i]="translateZ(0)",s=window.getComputedStyle(t).getPropertyValue(n.prefix+"transform"),e.transform={prefix:n.prefix,name:i,translate:!0,translateZ:!!s&&"none"!==s})),void 0!==t.style.backgroundSize&&(e.backgroundSize={},t.style.backgroundSize="contain",e.backgroundSize.contain="contain"===window.getComputedStyle(t).getPropertyValue("background-size"),t.style.backgroundSize="cover",e.backgroundSize.cover="cover"===window.getComputedStyle(t).getPropertyValue("background-size")),document.body.removeChild(t)}return document.body?o():s(document).on("DOMContentLoaded",o),e}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame,_construct:function(t,i){if(this.overrided(t,i),this.list=this.options.items,this.options.container=this.elm(),this.num=this.list.length,this.initStartIndex(),!1===this.initWidget())return!1;this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),this.options.startSlideshow&&this.play()},createIndicator:function(t){this.gallery;var i,e,n=this.indicatorPrototype.cloneNode(!1),o=t.title,a=this.options.thumbnailProperty;return this.options.thumbnailIndicators&&(a&&(i=t[a]),void 0===i&&(e=t.getElementsByTagName&&s(t).find("img")[0])&&(i=e.src),i&&(n.style.backgroundImage='url("'+i+'")')),o&&(n.title=o),n},addIndicator:function(t){if(this.indicatorContainer.length){var i=this.createIndicator(this.list[t]);i.setAttribute("data-index",t),this.indicatorContainer[0].appendChild(i),this.indicators.push(i)}},setActiveIndicator:function(t){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.activeIndicator=s(this.indicators[t]),this.activeIndicator.addClass(this.options.activeIndicatorClass))},slide:function(t,i){window.clearTimeout(this.timeout);var s,e,n,o=this.index;if(o!==t&&1!==this.num){if(i||(i=this.options.transitionSpeed),this.support.transform){for(this.options.continuous||(t=this.circle(t)),s=Math.abs(o-t)/(o-t),this.options.continuous&&(e=s,(s=-this.positions[this.circle(t)]/this.slideWidth)!==e&&(t=-s*this.num+t)),n=Math.abs(o-t)-1;n;)n-=1,this.move(this.circle((t>o?t:o)-n-1),this.slideWidth*s,0);t=this.circle(t),this.move(o,this.slideWidth*s,i),this.move(t,0,i),this.options.continuous&&this.move(this.circle(t-s),-this.slideWidth*s,0)}else t=this.circle(t),this.animate(o*-this.slideWidth,t*-this.slideWidth,i);this.onslide(t)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(t){var i=this;window.clearTimeout(this.timeout),this.interval=t||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(t,s){i.animationFrameId=i.requestAnimationFrame.call(window,function(){i.slide(t,s)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.cancelAnimationFrame&&(this.cancelAnimationFrame.call(window,this.animationFrameId),this.animationFrameId=null),this.container.removeClass(this.options.playingClass)},add:function(t){var i;for(t.concat||(t=Array.prototype.slice.call(t)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(t),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),i=this.num-t.length;i<this.num;i+=1)this.addSlide(i),this.positionSlide(i);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.unloadAllSlides(),this.slides=[],this.indicatorContainer.empty(),this.indicators=[]},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass);var t=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(t.displayClass).removeClass(t.singleClass).removeClass(t.leftEdgeClass).removeClass(t.rightEdgeClass),t.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var t=this;this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,function i(s){s.target===t.container[0]&&(t.container.off(t.support.transition.end,i),t.handleClose())}),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(t){return(this.num+t%this.num)%this.num},move:function(t,i,s){this.translateX(t,i,s),this.positions[t]=i},translate:function(t,i,s,e){var n=this.slides[t].style,o=this.support.transition,a=this.support.transform;n[o.name+"Duration"]=e+"ms",n[a.name]="translate("+i+"px, "+s+"px)"+(a.translateZ?" translateZ(0)":"")},translateX:function(t,i,s){this.translate(t,i,0,s)},translateY:function(t,i,s){this.translate(t,0,i,s)},animate:function(t,i,s){if(s)var e=this,n=(new Date).getTime(),o=window.setInterval(function(){var a=(new Date).getTime()-n;if(a>s)return e.slidesContainer[0].style.left=i+"px",e.ontransitionend(),void window.clearInterval(o);e.slidesContainer[0].style.left=(i-t)*(Math.floor(a/s*100)/100)+t+"px"},4);else this.slidesContainer[0].style.left=i+"px"},preventDefault:function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},stopPropagation:function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(t){t.which&&1===t.which&&"VIDEO"!==t.target.nodeName&&"AUDIO"!==t.target.nodeName&&(t.preventDefault(),(t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchstart(t))},onmousemove:function(t){this.touchStart&&((t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchmove(t))},onmouseup:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},onmouseout:function(t){if(this.touchStart){var s=t.target,e=t.relatedTarget;e&&(e===s||i.contains(s,e))||this.onmouseup(t)}},ontouchstart:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i=(t.originalEvent||t).touches[0];this.touchStart={x:i.pageX,y:i.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,s,e=(t.originalEvent||t).touches[0],n=(t.originalEvent||t).scale,o=this.index;if(!(e.length>1||n&&1!==n))if(this.options.disableScroll&&t.preventDefault(),this.touchDelta={x:e.pageX-this.touchStart.x,y:e.pageY-this.touchStart.y},i=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(i)<Math.abs(this.touchDelta.y)),this.isScrolling)this.translateY(o,this.touchDelta.y+this.positions[o],0);else for(t.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?s=[this.circle(o+1),o,this.circle(o-1)]:(this.touchDelta.x=i/=!o&&i>0||o===this.num-1&&i<0?Math.abs(i)/this.slideWidth+1:1,s=[o],o&&s.push(o-1),o<this.num-1&&s.unshift(o+1));s.length;)o=s.pop(),this.translateX(o,i+this.positions[o],0)},ontouchend:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,s,e,n,o,a=this.index,l=this.options.transitionSpeed,h=this.slideWidth,r=Number(Date.now()-this.touchStart.time)<250,d=r&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>h/2,c=!a&&this.touchDelta.x>0||a===this.num-1&&this.touchDelta.x<0,u=!d&&this.options.closeOnSwipeUpOrDown&&(r&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(c=!1),i=this.touchDelta.x<0?-1:1,this.isScrolling?u?this.close():this.translateY(a,0,l):d&&!c?(s=a+i,e=a-i,n=h*i,o=-h*i,this.options.continuous?(this.move(this.circle(s),n,0),this.move(this.circle(a-2*i),o,0)):s>=0&&s<this.num&&this.move(s,n,0),this.move(a,this.positions[a]+n,l),this.move(this.circle(e),this.positions[this.circle(e)]+n,l),a=this.circle(e),this.onslide(a)):this.options.continuous?(this.move(this.circle(a-1),-h,l),this.move(a,0,l),this.move(this.circle(a+1),h,l)):(a&&this.move(a-1,-h,l),this.move(a,0,l),a<this.num-1&&this.move(a+1,h,l))},ontouchcancel:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},ontransitionend:function(t){var i=this.slides[this.index];t&&i!==t.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,i]))},oncomplete:function(t){var i,e=t.target||t.srcElement,n=e&&e.parentNode;e&&n&&(i=this.getNodeIndex(n),s(n).removeClass(this.options.slideLoadingClass),"error"===t.type?(s(n).addClass(this.options.slideErrorClass),this.elements[i]=3):this.elements[i]=2,e.clientHeight>this.container[0].clientHeight&&(e.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===n&&this.play(),this.setTimeout(this.options.onslidecomplete,[i,n]))},onload:function(t){this.oncomplete(t)},onerror:function(t){this.oncomplete(t)},onkeydown:function(t){switch(t.which||t.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(t),this.toggleControls());break;case 27:this.options.closeOnEscape&&(this.close(),t.stopImmediatePropagation());break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(t),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.next())}},handleClick:function(t){var i=this.options,e=t.target||t.srcElement,n=e.parentNode;if(n===this.indicatorContainer[0])return this.preventDefault(t),void this.slide(this.getNodeIndex(e));if(n.parentNode===this.indicatorContainer[0])return this.preventDefault(t),void this.slide(this.getNodeIndex(n));function o(t){return s(e).hasClass(t)||s(n).hasClass(t)}o(i.toggleClass)?(this.preventDefault(t),this.toggleControls()):o(i.prevClass)?(this.preventDefault(t),this.prev()):o(i.nextClass)?(this.preventDefault(t),this.next()):o(i.closeClass)?(this.preventDefault(t),this.close()):o(i.playPauseClass)?(this.preventDefault(t),this.toggleSlideshow()):n===this.slidesContainer[0]?i.closeOnSlideClick?(this.preventDefault(t),this.close()):i.toggleControlsOnSlideClick&&(this.preventDefault(t),this.toggleControls()):n.parentNode&&n.parentNode===this.slidesContainer[0]&&i.toggleControlsOnSlideClick&&(this.preventDefault(t),this.toggleControls())},onclick:function(t){if(!(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)))return this.handleClick(t);delete this.touchDelta},updateEdgeClasses:function(t){t?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),t===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(t){this.options.continuous||this.updateEdgeClasses(t),this.loadElements(t),this.options.unloadElements&&this.unloadElements(t),this.setTitle(t),this.setActiveIndicator(t)},onslide:function(t){this.index=t,this.handleSlide(t),this.setTimeout(this.options.onslide,[t,this.slides[t]])},setTitle:function(t){var i=this.slides[t].firstChild,s=i.title||i.alt,e=this.titleElement;e.length&&(this.titleElement.empty(),s&&e[0].appendChild(document.createTextNode(s)))},setTimeout:function(t,i,s){var e=this;return t&&window.setTimeout(function(){t.apply(e,i||[])},s||0)},createElement:function(t,i){var e=this.options.renderItem(t,i);return s(e).addClass(this.options.slideContentClass),e},loadElement:function(t){this.elements[t]||(this.slides[t].firstChild?this.elements[t]=s(this.slides[t]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[t]=1,s(this.slides[t]).addClass(this.options.slideLoadingClass),this.slides[t].appendChild(this.createElement(this.list[t],this.proxyListener))))},loadElements:function(t){var i,s=Math.min(this.num,2*this.options.preloadRange+1),e=t;for(i=0;i<s;i+=1)e+=i*(i%2==0?-1:1),e=this.circle(e),this.loadElement(e)},unloadElements:function(t){var i,s;for(i in this.elements)this.elements.hasOwnProperty(i)&&(s=Math.abs(t-i))>this.options.preloadRange&&s+this.options.preloadRange<this.num&&(this.unloadSlide(i),delete this.elements[i])},addSlide:function(t){var i=this.slidePrototype.cloneNode(!1);i.setAttribute("data-index",t),this.slidesContainer[0].appendChild(i),this.slides.push(i),this.addIndicator(t)},positionSlide:function(t){var i=this.slides[t];i.style.width=this.slideWidth+"px",this.support.transform&&(i.style.left=t*-this.slideWidth+"px",this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0))},initSlides:function(t){var i,e;for(t||(this.indicatorContainer=this.container.find(this.options.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),t||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),s(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,i=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].clientWidth,this.slideHeight=this.container[0].clientHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",i&&this.resetSlides(),e=0;e<this.num;e+=1)i&&this.addSlide(e),this.positionSlide(e);this.options.continuous&&this.support.transform&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transform||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},unloadSlide:function(t){var i,s;null!==(s=(i=this.slides[t]).firstChild)&&i.removeChild(s)},unloadAllSlides:function(){var t,i;for(t=0,i=this.slides.length;t<i;t++)this.unloadSlide(t)},toggleControls:function(){var t=this.options.controlsClass;this.container.hasClass(t)?this.container.removeClass(t):this.container.addClass(t)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(t){return parseInt(t.getAttribute("data-index"),10)},initStartIndex:function(){var t=this.options.index;this.index=this.circle(parseInt(t,10)||0)},initEventListeners:function(){var t=this,i=this.slidesContainer;function e(i){var s=t.support.transition&&t.support.transition.end===i.type?"transitionend":i.type;t["on"+s](i)}s(window).on("resize",e),s(document.body).on("keydown",e),this.container.on("click",e),this.support.touch?i.on("touchstart touchmove touchend touchcancel",e):this.options.emulateTouchEvents&&this.support.transition&&i.on("mousedown mousemove mouseup mouseout",e),this.support.transition&&i.on(this.support.transition.end,e),this.proxyListener=e},destroyEventListeners:function(){var t=this.slidesContainer,i=this.proxyListener;s(window).off("resize",i),s(document.body).off("keydown",i),this.container.off("click",i),this.support.touch?t.off("touchstart touchmove touchend touchcancel",i):this.options.emulateTouchEvents&&this.support.transition&&t.off("mousedown mousemove mouseup mouseout",i),this.support.transition&&t.off(this.support.transition.end,i)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var t=this;return this.container=s(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,function i(s){s.target===t.container[0]&&(t.container.off(t.support.transition.end,i),t.handleOpen())}):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(i){this.overrided(t.mixin({},SliderView.prototype.options,i)),this.num<3&&(this.options.continuous=!!this.options.continuous&&null),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}});return e.register(o),n.Slidable=o});
//# sourceMappingURL=sourcemaps/Slidable.js.map
