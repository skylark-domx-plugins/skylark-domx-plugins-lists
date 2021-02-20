/**
 * skylark-domx-plugins-lists - The skylark list plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-plugins-lists/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-plugins-lists/lists',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("domx.plugins.lists",{});
});
 define('skylark-domx-plugins-lists/Group',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "./lists"
],function(langx,$,elmx,plugins,lists){

    var Group = plugins.Plugin.inherit({
        klassName : "Group",

        pluginName : "domx.lists.group",

        options : {
        	multiSelect: false,

        	classes : {
          	active : "active"
        	},


        	selectors : {
          	item : "li",                   // ".list-group-item"

        	},

          item : {
            template : "<span><i class=\"glyphicon\"></i><a href=\"javascript: void(0);\"></a> </span>",
            checkable : false,
            selectors : {
              icon : " > span > i",
              text : " > span > a"
            }
          },

        	selected : 0
        },

        state : {
          selected : Object
        },

        _construct : function(elm,options) {
            this.overrided(elm,options);
            var self = this,
                velm = this._velm = elmx(this._elm),
                itemSelector = this.options.selectors.item;

            this._$items = velm.$(itemSelector);

            velm.on('click', itemSelector, function () {
                var veItem = elmx(this);

                if (!veItem.hasClass('disabled')) {
                  var value = veItem.data("value");
                  if (value === undefined) {
                    value = self._$items.index(this);
                  }
                  self.selected = value;
                }

                //veItem.blur();
                return false;
            });
            this.selected = this.options.selected;

        },

        _refresh : function(updates) {
          this.overrided(updates);
          var self  = this;

          function findItem(valueOrIdx) {
            var $item;
            if (langx.isNumber(valueOrIdx)) {
              $item = self._$items.eq(valueOrIdx);
            } else {
              $item = self._$items.filter('[data-value="' + valueOrIdx + '"]');
            }
            return $item;
          } 
                 
          function selectOneItem(valueOrIdx) {
            findItem(valueOrIdx).addClass(self.options.classes.active);
          }

          function unselectOneItem(valueOrIdx) {
            findItem(valueOrIdx).removeClass(self.options.classes.active);
          }

          if (updates["selected"]) {
            if (this.options.multiSelect) {
            } else {
              unselectOneItem(updates["selected"].oldValue);
              selectOneItem(updates["selected"].value);
            }

          }
        }

  });


  plugins.register(Group);

  return lists.Group = Group;

});




 define('skylark-domx-plugins-lists/_MultitierList',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "skylark-domx-plugins-toggles/Collapsable",
  "./lists",
  "./Group"
],function(langx,$,elmx,plugins,Collapsable,lists,Group){

    var _MultitierList = Group.inherit({
        klassName : "_MultitierList",

        options : {
          multitier : {
            mode   : "",  // "tree" or "accordion" or "popover"
            levels : 2,
            selectors :  {
              children : "ul",  // "> .list-group"
              hasChildren : ":has(ul)",
              toggler : " > a"
            },
            classes : {
              collapsed : "",
              expanded : ""
            },

            multiExpand : true,
          }
        },

        state : {
          selected : Object
        },

        _construct : function(elm,options) {
            this.overrided(elm,options);
            var self = this,
                itemSelector = this.options.selectors.item;

            var multitierMode = this.options.multitier.mode,
                hasChildrenSelector = this.options.multitier.selectors.hasChildren,
                childrenSelector = this.options.multitier.selectors.children;           


              var multiExpand = self.options.multitier.multiExpand,
                  togglerSelector = self.options.multitier.selectors.toggler;

              this._$items.has(childrenSelector).find(togglerSelector).on("click" + "." + this.pluginName, function(e) {
                  e.preventDefault();

                  if (multiExpand) {
                      langx.scall($(this).closest(itemSelector).siblings().removeClass("active").children(childrenSelector+".in").plugin("domx.toggles.collapsable"),"hide");
                  }
                  $(this).closest(itemSelector).toggleClass("active").children(childrenSelector).plugin("domx.toggles.collapsable").toggle();
              });

             this._$items.filter(".active").has(childrenSelector).children(childrenSelector).addClass("collapse in");
             this._$items.not(".active").has(childrenSelector).children(childrenSelector).addClass("collapse");
        }

  });


  return lists._MultitierList = _MultitierList;

});




 define('skylark-domx-plugins-lists/Foldable',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "./lists",
  "./_MultitierList"
],function(langx,$,elmx,plugins,lists,_MultitierList){

  var Foldable = _MultitierList.inherit({
    klassName : "Foldable",

    pluginName : "domx.lists.foldable"

  });

  plugins.register(Foldable);

  return lists.Foldable = Foldable;
});

 define('skylark-domx-plugins-lists/Cascadable',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "./lists",
  "./_MultitierList"
],function(langx,$,elmx,plugins,lists,_MultitierList){


  var Cascadable = _MultitierList.inherit({
    klassName : "Cascadable",

    pluginName : "domx.lists.cascadable"
  });


  plugins.register(Cascadable);

  return lists.Cascadable = Cascadable;	
});
 define('skylark-domx-plugins-lists/Tree',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "./lists",
  "./_MultitierList"
],function(langx,$,elmx,plugins,lists,_MultitierList){


  var Cascade = _MultitierList.inherit({
    klassName : "Tree",

    pluginName : "domx.lists.tree"
  });


  plugins.register(Cascade);

  return lists.Cascade = Cascade;	
});
define('skylark-domx-plugins-lists/main',[
    "./lists",
    "./Foldable",
    "./Cascadable",
    "./Group",
    "./Tree"
], function(lists) {
    return lists;
});
define('skylark-domx-plugins-lists', ['skylark-domx-plugins-lists/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-lists.js.map
