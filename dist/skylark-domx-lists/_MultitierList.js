/**
 * skylark-domx-lists - The skylark list library for dom api extension.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-lists/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","skylark-domx-toggles/Collapsable","./lists","./Group"],function(s,e,t,l,i,o,a){var n=a.inherit({klassName:"_MultitierList",options:{multitier:{mode:"",levels:2,selectors:{children:"ul",hasChildren:":has(ul)",toggler:" > a"},classes:{collapsed:"",expanded:""},multiExpand:!0}},state:{selected:Object},_construct:function(t,l){this.overrided(t,l);var i=this.options.selectors.item,o=(this.options.multitier.mode,this.options.multitier.selectors.hasChildren,this.options.multitier.selectors.children),a=this.options.multitier.multiExpand,n=this.options.multitier.selectors.toggler;this._$items.has(o).find(n).on("click."+this.pluginName,function(t){t.preventDefault(),a&&s.scall(e(this).closest(i).siblings().removeClass("active").children(o+".in").plugin("domx.toggles.collapsable"),"hide"),e(this).closest(i).toggleClass("active").children(o).plugin("domx.toggles.collapsable").toggle()}),this._$items.filter(".active").has(o).children(o).addClass("collapse in"),this._$items.not(".active").has(o).children(o).addClass("collapse")}});return o._MultitierList=n});
//# sourceMappingURL=sourcemaps/_MultitierList.js.map
