$(function(){
  
  function pageselectCallback(page_index, jq, pre_name) {
    var localurl = window.location.toString();
    pre_name = pre_name.length > 0 ? (pre_name + '.page') : 'page';
    var newlocal = new Uri(localurl).replaceQueryParam(pre_name, page_index + 1).toString();
    window.location = newlocal;
    return false;
  }

  $('.wp-pagination').each(function(){
    
    var settings = $(this).attr('title').split(/,/);
    //settings[0] total records
    //settings[1] current page
    //settings[2] items per page
    var pre_name = '';
    if (settings.length > 3) {
      pre_name = settings[3];
    }
    
    $(this).attr('title', '共' + settings[0] + '条记录，当前第' + (new Number(settings[1])) + '页，每页最大' + settings[2] + '条记录');
    
    $(this).pagination(settings[0], {
      current_page: settings[1] - 1,
      items_per_page: settings[2],
      num_display_entries: 8,
      num_edge_entries: 2,
      prev_text:"<",
      next_text:">",
      pre_name:pre_name,
      callback: pageselectCallback
    });
    
    
  });
  
  
});





/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 2.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
 (function($){
  /**
   * @class Class for calculating pagination values
   */
  $.PaginationCalculator = function(maxentries, opts) {
    this.maxentries = maxentries;
    this.opts = opts;
  }
  
  $.extend($.PaginationCalculator.prototype, {
    /**
     * Calculate the maximum number of pages
     * @method
     * @returns {Number}
     */
    numPages:function() {
      return Math.ceil(this.maxentries/this.opts.items_per_page);
    },
    /**
     * Calculate start and end point of pagination links depending on 
     * current_page and num_display_entries.
     * @returns {Array}
     */
    getInterval:function(current_page)  {
      var ne_half = Math.floor(this.opts.num_display_entries/2);
      var np = this.numPages();
      var upper_limit = np - this.opts.num_display_entries;
      var start = current_page > ne_half ? Math.max( Math.min(current_page - ne_half, upper_limit), 0 ) : 0;
      var end = current_page > ne_half?Math.min(current_page+ne_half + (this.opts.num_display_entries % 2), np):Math.min(this.opts.num_display_entries, np);
      return {start:start, end:end};
    }
  });
  
  // Initialize jQuery object container for pagination renderers
  $.PaginationRenderers = {}
  
  /**
   * @class Default renderer for rendering pagination links
   */
  $.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
    this.maxentries = maxentries;
    this.opts = opts;
    this.pc = new $.PaginationCalculator(maxentries, opts);
  }
  $.extend($.PaginationRenderers.defaultRenderer.prototype, {
    /**
     * Helper function for generating a single link (or a span tag if it's the current page)
     * @param {Number} page_id The page id for the new item
     * @param {Number} current_page 
     * @param {Object} appendopts Options for the new item: text and classes
     * @returns {jQuery} jQuery object containing the link
     */
    createLink:function(page_id, current_page, appendopts){
      var lnk, np = this.pc.numPages();
      page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
      appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
      if(page_id == current_page){
        lnk = $("<span class='current'>" + appendopts.text + "</span>");
      }
      else
      {
        lnk = $("<a>" + appendopts.text + "</a>")
          .attr('href', this.opts.link_to.replace(/__id__/,page_id));
      }
      if(appendopts.classes){ lnk.addClass(appendopts.classes); }
      lnk.data('page_id', page_id);
      return lnk;
    },
    // Generate a range of numeric links 
    appendRange:function(container, current_page, start, end, opts) {
      var i;
      for(i=start; i<end; i++) {
        this.createLink(i, current_page, opts).appendTo(container);
      }
    },
    getLinks:function(current_page, eventHandler) {
      var begin, end,
        interval = this.pc.getInterval(current_page),
        np = this.pc.numPages(),
        fragment = $("<div class='wp-inner'></div>");
      
      // Generate "Previous"-Link
      if(this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)){
        fragment.append(this.createLink(current_page-1, current_page, {text:this.opts.prev_text, classes:"prev"}));
      }
      // Generate starting points
      if (interval.start > 0 && this.opts.num_edge_entries > 0)
      {
        end = Math.min(this.opts.num_edge_entries, interval.start);
        this.appendRange(fragment, current_page, 0, end, {classes:'sp'});
        if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
        {
          $("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
        }
      }
      // Generate interval links
      this.appendRange(fragment, current_page, interval.start, interval.end);
      // Generate ending points
      if (interval.end < np && this.opts.num_edge_entries > 0)
      {
        if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
        {
          $("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
        }
        begin = Math.max(np-this.opts.num_edge_entries, interval.end);
        this.appendRange(fragment, current_page, begin, np, {classes:'ep'});
        
      }
      // Generate "Next"-Link
      if(this.opts.next_text && (current_page < np-1 || this.opts.next_show_always)){
        fragment.append(this.createLink(current_page+1, current_page, {text:this.opts.next_text, classes:"next"}));
      }
      $('a', fragment).click(eventHandler);
      return fragment;
    }
  });
  
  // Extend jQuery
  $.fn.pagination = function(maxentries, opts){
    
    // Initialize options with default values
    opts = $.extend({
      items_per_page:10,
      num_display_entries:11,
      current_page:0,
      num_edge_entries:0,
      link_to:"#",
      prev_text:"Prev",
      next_text:"Next",
      ellipse_text:"...",
      prev_show_always:true,
      next_show_always:true,
      renderer:"defaultRenderer",
      show_if_single_page:false,
      load_first_page:true,
      pre_name:'',
      callback:function(){return false;}
    },opts||{});
    
    var containers = this,
      renderer, links, current_page;
    
    /**
     * This is the event handling function for the pagination links. 
     * @param {int} page_id The new page number
     */
    function paginationClickHandler(evt){
      var links, 
        new_current_page = $(evt.target).data('page_id'),
        continuePropagation = selectPage(new_current_page);
      if (!continuePropagation) {
        evt.stopPropagation();
      }
      return continuePropagation;
    }
    
    /**
     * This is a utility function for the internal event handlers. 
     * It sets the new current page on the pagination container objects, 
     * generates a new HTMl fragment for the pagination links and calls
     * the callback function.
     */
    function selectPage(new_current_page) {
      // update the link display of a all containers
      containers.data('current_page', new_current_page);
      links = renderer.getLinks(new_current_page, paginationClickHandler);
      containers.empty();
      links.appendTo(containers);
      // call the callback and propagate the event if it does not return false
      var continuePropagation = opts.callback(new_current_page, containers, opts.pre_name);
      return continuePropagation;
    }
    
    // -----------------------------------
    // Initialize containers
    // -----------------------------------
    current_page = parseInt(opts.current_page);
    containers.data('current_page', current_page);
    // Create a sane value for maxentries and items_per_page
    maxentries = (!maxentries || maxentries < 0)?1:maxentries;
    opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
    
    if(!$.PaginationRenderers[opts.renderer])
    {
      throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
    }
    renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
    
    // Attach control events to the DOM elements
    var pc = new $.PaginationCalculator(maxentries, opts);
    var np = pc.numPages();
    containers.bind('setPage', {numPages:np}, function(evt, page_id) { 
        if(page_id >= 0 && page_id < evt.data.numPages) {
          selectPage(page_id); return false;
        }
    });
    containers.bind('prevPage', function(evt){
        var current_page = $(this).data('current_page');
        if (current_page > 0) {
          selectPage(current_page - 1);
        }
        return false;
    });
    containers.bind('nextPage', {numPages:np}, function(evt){
        var current_page = $(this).data('current_page');
        if(current_page < evt.data.numPages - 1) {
          selectPage(current_page + 1);
        }
        return false;
    });
    
    // When all initialisation is done, draw the links
    links = renderer.getLinks(current_page, paginationClickHandler);
    containers.empty();
    if(np > 1 || opts.show_if_single_page) {
      links.appendTo(containers);
    }
    // call callback function
    if(opts.load_first_page) {
      //commented for break away the location change;
      //opts.callback(current_page, containers, opts.pre_name);
    }
  } // End of $.fn.pagination block
  
})(jQuery);



/*! jsUri v1.1.1 | https://github.com/derek-watson/jsUri */
var Query=function(a){"use strict";var b=function(a){var b=[],c,d,e,f;if(typeof a=="undefined"||a===null||a==="")return b;a.indexOf("?")===0&&(a=a.substring(1)),d=a.toString().split(/[&;]/);for(c=0;c<d.length;c++)e=d[c],f=e.split("="),b.push([f[0],f[1]]);return b},c=b(a),d=function(){var a="",b,d;for(b=0;b<c.length;b++)d=c[b],a.length>0&&(a+="&"),a+=d.join("=");return a.length>0?"?"+a:a},e=function(a){a=decodeURIComponent(a),a=a.replace("+"," ");return a},f=function(a){var b,d;for(d=0;d<c.length;d++){b=c[d];if(e(a)===e(b[0]))return b[1]}},g=function(a){var b=[],d,f;for(d=0;d<c.length;d++)f=c[d],e(a)===e(f[0])&&b.push(f[1]);return b},h=function(a,b){var d=[],f,g,h,i;for(f=0;f<c.length;f++)g=c[f],h=e(g[0])===e(a),i=e(g[1])===e(b),(arguments.length===1&&!h||arguments.length===2&&!h&&!i)&&d.push(g);c=d;return this},i=function(a,b,d){arguments.length===3&&d!==-1?(d=Math.min(d,c.length),c.splice(d,0,[a,b])):arguments.length>0&&c.push([a,b]);return this},j=function(a,b,d){var f=-1,g,j;if(arguments.length===3){for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)&&decodeURIComponent(j[1])===e(d)){f=g;break}}h(a,d).addParam(a,b,f)}else{for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)){f=g;break}}h(a),i(a,b,f)}return this};return{getParamValue:f,getParamValues:g,deleteParam:h,addParam:i,replaceParam:j,toString:d}},Uri=function(a){"use strict";var b=!1,c=function(a){var c={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},d=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},f=c[b?"strict":"loose"].exec(a),g={},h=14;while(h--)g[d[h]]=f[h]||"";g[e.name]={},g[d[12]].replace(e.parser,function(a,b,c){b&&(g[e.name][b]=c)});return g},d=c(a||""),e=new Query(d.query),f=function(a){typeof a!="undefined"&&(d.protocol=a);return d.protocol},g=null,h=function(a){typeof a!="undefined"&&(g=a);return g===null?d.source.indexOf("//")!==-1:g},i=function(a){typeof a!="undefined"&&(d.userInfo=a);return d.userInfo},j=function(a){typeof a!="undefined"&&(d.host=a);return d.host},k=function(a){typeof a!="undefined"&&(d.port=a);return d.port},l=function(a){typeof a!="undefined"&&(d.path=a);return d.path},m=function(a){typeof a!="undefined"&&(e=new Query(a));return e},n=function(a){typeof a!="undefined"&&(d.anchor=a);return d.anchor},o=function(a){f(a);return this},p=function(a){h(a);return this},q=function(a){i(a);return this},r=function(a){j(a);return this},s=function(a){k(a);return this},t=function(a){l(a);return this},u=function(a){m(a);return this},v=function(a){n(a);return this},w=function(a){return m().getParamValue(a)},x=function(a){return m().getParamValues(a)},y=function(a,b){arguments.length===2?m().deleteParam(a,b):m().deleteParam(a);return this},z=function(a,b,c){arguments.length===3?m().addParam(a,b,c):m().addParam(a,b);return this},A=function(a,b,c){arguments.length===3?m().replaceParam(a,b,c):m().replaceParam(a,b);return this},B=function(){var a="",b=function(a){return a!==null&&a!==""};b(f())?(a+=f(),f().indexOf(":")!==f().length-1&&(a+=":"),a+="//"):h()&&b(j())&&(a+="//"),b(i())&&b(j())&&(a+=i(),i().indexOf("@")!==i().length-1&&(a+="@")),b(j())&&(a+=j(),b(k())&&(a+=":"+k())),b(l())?a+=l():b(j())&&(b(m().toString())||b(n()))&&(a+="/"),b(m().toString())&&(m().toString().indexOf("?")!==0&&(a+="?"),a+=m().toString()),b(n())&&(n().indexOf("#")!==0&&(a+="#"),a+=n());return a},C=function(){return new Uri(B())};return{protocol:f,hasAuthorityPrefix:h,userInfo:i,host:j,port:k,path:l,query:m,anchor:n,setProtocol:o,setHasAuthorityPrefix:p,setUserInfo:q,setHost:r,setPort:s,setPath:t,setQuery:u,setAnchor:v,getQueryParamValue:w,getQueryParamValues:x,deleteQueryParam:y,addQueryParam:z,replaceQueryParam:A,toString:B,clone:C}},jsUri=Uri;