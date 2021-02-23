 define([
  "skylark-langx/langx",
  "skylark-domx-query",
  "skylark-domx-velm",
  "skylark-domx-plugins",
  "./lists",
  "./Group"
],function(langx,$,elmx,plugins,lists,Group){


  var Tiler = Group.inherit({
    klassName : "Tiler",

    pluginName : "domx.plugins.lists.tiler"
  });


  plugins.register(Tiler);

  return lists.Tiler = Tiler;	
});