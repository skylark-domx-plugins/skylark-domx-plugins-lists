/**
 * skylark-domx-lists - The skylark list library for dom api extension.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-lists/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","skylark-domx-panels/Panel","./lists","./Group"],function(e,s,i,t,l,n,o){var a=o.inherit({klassName:"_MultitierList",options:{multitier:{mode:"",levels:2,selectors:{children:"ul",hasChildren:":has(ul)",toggler:" > a"},classes:{collapsed:"",expanded:""},multiExpand:!0}},state:{selected:Object},_construct:function(e,i){this.overrided(e,i);var t=this.options.selectors.item,l=(this.options.multitier.mode,this.options.multitier.selectors.hasChildren,this.options.multitier.selectors.children),n=this.options.multitier.multiExpand,o=this.options.multitier.selectors.toggler;this._$items.has(l).find(o).on("click."+this.pluginName,function(e){e.preventDefault(),n&&s(this).closest(t).siblings().removeClass("active").children(l+".in").plugin("domx.panels.panel").hide(),s(this).closest(t).toggleClass("active").children(l).plugin("domx.panels.panel").toggle()}),this._$items.filter(".active").has(l).children(l).addClass("collapse in"),this._$items.not(".active").has(l).children(l).addClass("collapse")}});return n._MultitierList=a});
//# sourceMappingURL=sourcemaps/_MultitierList.js.map
