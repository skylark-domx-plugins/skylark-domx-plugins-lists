/**
 * skylark-domx-lists - The skylark list library for dom api extension.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-domx/skylark-domx-lists/
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

define('skylark-domx-lists/lists',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("domx.lists",{});
});
 define('skylark-domx-lists/Listing',[
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "skylark-domx-panels/Collapse",
  "./lists"
],function(langx,$,elmx,plugins,Collapse,lists){

    var Listing = plugins.Plugin.inherit({
        klassName : "Listing",

        pluginName : "lark.listing",

        options : {
        	multiSelect: false,
        	//multitier : false,

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

            tree : {
              classes : {
                expandIcon: 'glyphicon-plus',    // "glyphicon-chevron-down", 'glyphicon-folder-open'
                collapseIcon: 'glyphicon-minus', // "glyphicon-chevron-right", 'glyphicon-folder-close'
                children : ""                              // "list-group children"
              },
              templates : {
                treeIcon : "<i class=\"glyphicon\"></i>",
                itemGroup: ""

              },
              selectors : {
                treeIcon : " > i"
              }
            },

            accordion : {
              selectors : {
                toggler : " > a"
              }

            },
            popover : {
              selectors : {
                toggler : " > a"
              }

            }            
          },

        	toggle : false,
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

            var $this = velm,
                multitierMode = this.options.multitier.mode,
                hasChildrenSelector = this.options.multitier.selectors.hasChildren,
                childrenSelector = this.options.multitier.selectors.children,
                iconSelector = this.options.item.selectors.icon,
                textSelector = this.options.item.selectors.text,
                itemTemplate = this.options.item.template,                
                obj = this;


            if (multitierMode) {
            /*
              if (multitierMode == "tree") {
                   var treeIconTemplate = this.options.multitier.tree.templates.treeIcon,
                       treeIconSelector = this.options.multitier.tree.selectors.treeIcon,
                       expandIconClass = this.options.multitier.tree.classes.expandIcon,
                       collapseIconClass = this.options.multitier.tree.classes.collapseIcon;

                   this._$items.each(function(){
                     if($(this).is(hasChildrenSelector)) {
                        var children = $(this).find(childrenSelector);
                        $(children).remove();
                        text = $(this).text().trim();
                        $(this).html(treeIconTemplate+itemTemplate);
                        $(this).find(treeIconSelector).addClass(expandIconClass).on("click" + "." + self.pluginName, function(e) {
                            e.preventDefault();

                            $(this).toggleClass(expandIconClass).toggleClass(collapseIconClass);

                            $(this).closest("li").toggleClass("active").children("ul").collapse("toggle");

                            if ($toggle) {
                                $(this).closest("li").siblings().removeClass("active").children("ul.in").collapse("hide");
                            }
                        });

                        $(this).find(iconSelector).addClass('glyphicon-folder-open');
                        $(this).find(textSelector).text(text);
                        $(this).append(children);



                      }  else {
                        text = $(this).text().trim();
                        $(this).html(treeIconTemplate+itemTemplate);
                        $(this).find(iconSelector).addClass('glyphicon-file');
                        $(this).find(textSelector).text(text);
                    }

                   });
              } else if (multitierMode == "accordion" || multitierMode=="popover"  ) {
                var togglerSelector = self.options.multitier.accordion.selectors.toggler;

                this._$items.has(childrenSelector).find(togglerSelector).on("click" + "." + this.pluginName, function(e) {
                    e.preventDefault();

                    $(this).closest(itemSelector).toggleClass("active").children(childrenSelector).collapse("toggle");

                    if ($toggle) {
                        $(this).closest(itemSelector).siblings().removeClass("active").children(childrenSelector+".in").collapse("hide");
                    }
                });
              }
              */ 
              var multiExpand = self.options.multitier.multiExpand,
                  togglerSelector = self.options.multitier.selectors.toggler;

              this._$items.has(childrenSelector).find(togglerSelector).on("click" + "." + this.pluginName, function(e) {
                  e.preventDefault();

                  if (multiExpand) {
                      $(this).closest(itemSelector).siblings().removeClass("active").children(childrenSelector+".in").plugin("domx.collapse").hide();
                  }
                  $(this).closest(itemSelector).toggleClass("active").children(childrenSelector).plugin("domx.collapse").toggle();
              });

             this._$items.filter(".active").has(childrenSelector).children(childrenSelector).addClass("collapse in");
             this._$items.not(".active").has(childrenSelector).children(childrenSelector).addClass("collapse");
              
            }   
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


  plugins.register(Listing,"lark.listing");

  return lists.Listing = Listing;

});




define('skylark-domx-lists/main',[
    "./lists",
    "./Listing"
], function(lists) {
    return lists;
});
define('skylark-domx-lists', ['skylark-domx-lists/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-lists.js.map
