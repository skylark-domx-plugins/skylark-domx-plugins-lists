 define([
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
