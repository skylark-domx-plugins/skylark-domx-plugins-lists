/**
 * skylark-domx-plugins-lists - The skylark list plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-lists/
 * @license MIT
 */
!function(s,e){var l=e.define,require=e.require,t="function"==typeof l&&l.amd,i=!t&&"undefined"!=typeof exports;if(!t&&!l){var r={};l=e.define=function(s,e,l){"function"==typeof l?(r[s]={factory:l,deps:e.map(function(e){return function(s,e){if("."!==s[0])return s;var l=e.split("/"),t=s.split("/");l.pop();for(var i=0;i<t.length;i++)"."!=t[i]&&(".."==t[i]?l.pop():l.push(t[i]));return l.join("/")}(e,s)}),resolved:!1,exports:null},require(s)):r[s]={factory:null,resolved:!0,exports:l}},require=e.require=function(s){if(!r.hasOwnProperty(s))throw new Error("Module "+s+" has not been defined");var module=r[s];if(!module.resolved){var l=[];module.deps.forEach(function(s){l.push(require(s))}),module.exports=module.factory.apply(e,l)||null,module.resolved=!0}return module.exports}}if(!l)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(s,require){s("skylark-domx-plugins-lists/lists",["skylark-langx/skylark"],function(s){return s.attach("domx.plugins.lists",{})}),s("skylark-domx-plugins-lists/Group",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","./lists"],function(s,e,l,t,i){var r=t.Plugin.inherit({klassName:"Group",pluginName:"domx.lists.group",options:{multiSelect:!1,classes:{active:"active"},selectors:{item:"li"},item:{template:'<span><i class="glyphicon"></i><a href="javascript: void(0);"></a> </span>',checkable:!1,selectors:{icon:" > span > i",text:" > span > a"}},selected:0},state:{selected:Object},_construct:function(s,e){this.overrided(s,e);var t=this,i=this._velm=l(this._elm),r=this.options.selectors.item;this._$items=i.$(r),i.on("click",r,function(){var s=l(this);if(!s.hasClass("disabled")){var e=s.data("value");void 0===e&&(e=t._$items.index(this)),t.selected=e}return!1}),this.selected=this.options.selected},_refresh:function(e){this.overrided(e);var l=this;function t(e){return s.isNumber(e)?l._$items.eq(e):l._$items.filter('[data-value="'+e+'"]')}e.selected&&(this.options.multiSelect||(t(e.selected.oldValue).removeClass(l.options.classes.active),function(s){t(s).addClass(l.options.classes.active)}(e.selected.value)))}});return t.register(r),i.Group=r}),s("skylark-domx-plugins-lists/_MultitierList",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","skylark-domx-plugins-toggles/Collapsable","./lists","./Group"],function(s,e,l,t,i,r,a){var o=a.inherit({klassName:"_MultitierList",options:{multitier:{mode:"",levels:2,selectors:{children:"ul",hasChildren:":has(ul)",toggler:" > a"},classes:{collapsed:"",expanded:""},multiExpand:!0}},state:{selected:Object},_construct:function(l,t){this.overrided(l,t);var i=this.options.selectors.item,r=(this.options.multitier.mode,this.options.multitier.selectors.hasChildren,this.options.multitier.selectors.children),a=this.options.multitier.multiExpand,o=this.options.multitier.selectors.toggler;this._$items.has(r).find(o).on("click."+this.pluginName,function(l){l.preventDefault(),a&&s.scall(e(this).closest(i).siblings().removeClass("active").children(r+".in").plugin("domx.toggles.collapsable"),"hide"),e(this).closest(i).toggleClass("active").children(r).plugin("domx.toggles.collapsable").toggle()}),this._$items.filter(".active").has(r).children(r).addClass("collapse in"),this._$items.not(".active").has(r).children(r).addClass("collapse")}});return r._MultitierList=o}),s("skylark-domx-plugins-lists/Foldable",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","./lists","./_MultitierList"],function(s,e,l,t,i,r){var a=r.inherit({klassName:"Foldable",pluginName:"domx.lists.foldable"});return t.register(a),i.Foldable=a}),s("skylark-domx-plugins-lists/Cascadable",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","./lists","./_MultitierList"],function(s,e,l,t,i,r){var a=r.inherit({klassName:"Cascadable",pluginName:"domx.lists.cascadable"});return t.register(a),i.Cascadable=a}),s("skylark-domx-plugins-lists/Tree",["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","./lists","./_MultitierList"],function(s,e,l,t,i,r){var a=r.inherit({klassName:"Tree",pluginName:"domx.lists.tree"});return t.register(a),i.Cascade=a}),s("skylark-domx-plugins-lists/main",["./lists","./Foldable","./Cascadable","./Group","./Tree"],function(s){return s}),s("skylark-domx-plugins-lists",["skylark-domx-plugins-lists/main"],function(s){return s})}(l),!t){var a=require("skylark-langx-ns");i?module.exports=a:e.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-lists.js.map
