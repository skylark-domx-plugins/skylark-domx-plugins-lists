/**
 * skylark-domx-lists - The skylark list library for dom api extension.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-lists/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-domx-plugins","skylark-domx-panels/Collapse","./lists"],function(e,s,t,i,l,o){var a=i.Plugin.inherit({klassName:"Listing",pluginName:"lark.listing",options:{multiSelect:!1,multitier:{mode:"",levels:2,selectors:{children:"ul",hasChildren:":has(ul)",toggler:" > a"},classes:{collapsed:"",expanded:""},multiExpand:!0,tree:{classes:{expandIcon:"glyphicon-plus",collapseIcon:"glyphicon-minus",children:""},templates:{treeIcon:'<i class="glyphicon"></i>',itemGroup:""},selectors:{treeIcon:" > i"}},accordion:{selectors:{toggler:" > a"}},popover:{selectors:{toggler:" > a"}}},toggle:!1,classes:{active:"active"},selectors:{item:"li"},item:{template:'<span><i class="glyphicon"></i><a href="javascript: void(0);"></a> </span>',checkable:!1,selectors:{icon:" > span > i",text:" > span > a"}},selected:0},state:{selected:Object},_construct:function(e,i){this.overrided(e,i);var l=this,o=this._velm=t(this._elm),a=this.options.selectors.item;this._$items=o.$(a),o.on("click",a,function(){var e=t(this);if(!e.hasClass("disabled")){var s=e.data("value");void 0===s&&(s=l._$items.index(this)),l.selected=s}return!1}),this.selected=this.options.selected;var n=this.options.multitier.mode,c=(this.options.multitier.selectors.hasChildren,this.options.multitier.selectors.children);this.options.item.selectors.icon,this.options.item.selectors.text,this.options.item.template;if(n){var r=l.options.multitier.multiExpand,d=l.options.multitier.selectors.toggler;this._$items.has(c).find(d).on("click."+this.pluginName,function(e){e.preventDefault(),r&&s(this).closest(a).siblings().removeClass("active").children(c+".in").plugin("domx.collapse").hide(),s(this).closest(a).toggleClass("active").children(c).plugin("domx.collapse").toggle()}),this._$items.filter(".active").has(c).children(c).addClass("collapse in"),this._$items.not(".active").has(c).children(c).addClass("collapse")}},_refresh:function(s){this.overrided(s);var t=this;function i(s){return e.isNumber(s)?t._$items.eq(s):t._$items.filter('[data-value="'+s+'"]')}s.selected&&(this.options.multiSelect||(i(s.selected.oldValue).removeClass(t.options.classes.active),function(e){i(e).addClass(t.options.classes.active)}(s.selected.value)))}});return i.register(a,"lark.listing"),o.Listing=a});
//# sourceMappingURL=sourcemaps/Listing.js.map
