/**
 * init util
 *
 * need prototype.js(1.6)
 *
 * _root_title: tree's title
 * _data_url: the url of get the tree data
 * _target: href target frame name
 * _context_path: request.contextPath
 * _welcome: welcome page of main
 * _fav_url: history data url
 */
function XTreeUtil(_root_title, _data_url, _target, _context_path, _welcome, _fav_url) {
    this.treeContainer = 'tree-container';
    this.favContainer = 'fav-container';
    this.favUrl = _fav_url;
    this.rootTitle = _root_title;
    this.dataUrl = _data_url;
    this.welcome = _welcome;
    this.contextPath = _context_path;
    Ext.BLANK_IMAGE_URL = this.contextPath + "static/js/ext/images/default/s.gif";
    this.target = _target;
    Ext.QuickTips.init();
}

XTreeUtil.prototype.clearHistory = function(obj) {
    if (!confirm('确定要清空菜单历史记录吗？'))
        return;
    Ext.Ajax.request( {
        url :this.favUrl,
        success : function() {
            obj.fav.root.reload();
        },
        params : {
            clear :'true'
        }
    });
}

/**
 * init the tree panel
 */
XTreeUtil.prototype.init = function() {

    this.favLoader = new Ext.tree.TreeLoader( {
        dataUrl :this.favUrl + "&target=" + this.target,
        baseParams :this.target
    });

    this.favLoader.on('beforeload', function() {
        this.fav.body.mask('Loading', 'x-mask-loading');
    }, this);

    this.favLoader.on('load', function() {
        this.fav.body.unmask();
    }, this);

    this.fav = new Ext.tree.TreePanel( {
        id :this.favContainer,
        title :'操作历史记录',
        rootVisible :false,
        lines :false,
        autoScroll :true,
        animate :false,
        enableDD :false,
        useArrows :true,
        border :false,
        singleExpand :false,
        tools : [ {
            id :'refresh',
            qtip :'刷新',
            handler : function() {
                this.fav.root.reload();
            },
            scope :this
        }, {
            id :'close',
            qtip :'清空操作历史',
            handler : function() {
                this.clearHistory(this);
            },
            scope :this
        } ],
        root : {
            nodeType :'async',
            draggable :false,
            id :'source'
        },
        loader :this.favLoader
    });

    this.panel = new Ext.tree.TreePanel( {
        id :this.treeContainer,
        title :'功能菜单',
        rootVisible :false,
        lines :false,
        autoScroll :true,
        animate :false,
        enableDD :false,
        useArrows :true,
        border :false,
        singleExpand :false,
        tools : [ {
            id :'collapse',
            qtip :'收缩菜单',
            handler : function() {
                this.panel.collapseAll();
            },
            scope :this
        }, {
            id :'expand',
            qtip :'展开所有菜单',
            handler : function() {
                this.panel.expandAll();
            },
            scope :this
        } ],
        root :new Ext.tree.TreeNode('Tree Container Root')
    });

    this.objs = new Array();
    this.pids = new Object();
    new Ext.tree.TreeSorter(this.panel, {
        caseSensitive :false,
        dir :'asc',
        folderSort :true,
        property :'id'
    });

    // click event
    this.panel.on('click', function(node, e) {
        if (e != null) {
            e.stopEvent();
        }
        if (node.attributes.href != "") {
            document.getElementById(node.attributes.hrefTarget).src = node.attributes.href;
        }
    });
    this.fav.on('click', function(node, e) {
        if (e != null) {
            e.stopEvent();
        }
        if (node.attributes.href != "") {
            document.getElementById(node.attributes.hrefTarget).src = node.attributes.href;
        }
    });

    this.fav.on('expand', function(p) {
        p.root.reload();
    });

}

/**
 * Render tree to body element
 */
XTreeUtil.prototype.show = function() {
    this.accordion = new Ext.Panel( {
        title :this.rootTitle,
        region :'west',
        split :true,
        collapseMode :'mini',
        width :180,
        minSize :175,
        maxSize :400,
        collapsible :true,
        margins :'5 0 5 5',
        cmargins :'0 0 0 0',
        layout :'accordion',
        bodyStyle :'background-color:#DFE8F6',
        fill :false,
        layoutConfig : {
            autoWidth :false,
            hideCollapseTool :true
        },
        items : [ this.panel, this.fav ]
    });

    this.viewport = new Ext.Viewport( {
        layout :'border',
        items : [
            this.accordion,
            {
                region :'center',
                margins :'5 5 5 0',
                layout :'fit',
                border :true,
                autoScroll :false,

                items : [ {
                    baseCls :'x-plain',
                    layout :'fit',
                    bodyStyle :'padding:0px 0px 0px 0px',
                    items : [ {
                        autoScroll :false,
                        border :false,
                        html :'<iframe src="' + this.welcome + '" id="' + this.target + '" name="' + this.target
                            + '" frameborder="no" style="width:100%;height:99.9%"></iframe>'
                    } ]
                } ]
            } ]
    });

    this.loadTree();
}

/**
 * load tree data and show it
 */
XTreeUtil.prototype.loadTree = function(_selRoot) {
    var t = this;
    t.accordion.body.mask('Loading', 'x-mask-loading');
    Ext.Ajax.request( {
        url :t.dataUrl,
        success : function(req) {
            var obj = Ext.util.JSON.decode(req.responseText);
            for ( var i = 0; i < obj.length; i++) {
                t.add(obj[i]);
            }
            t.buildTree();
            t.accordion.body.unmask();
        }
    });
}

/**
 * Add one TreeNode, save to objs and pids
 */
XTreeUtil.prototype.add = function(_item) {
    var url = (_item.url == '' || _item.url == '.' || _item.url == '#') ? "" : (this.contextPath + _item.url);
    var tmp = new Ext.tree.TreeNode( {
        text :_item.name,
        draggable :false,
        href :url,
        hrefTarget :this.target,
        id :_item.id,
        cls :'cls',
        singleClickExpand :true
    });
    this.objs[this.objs.length] = tmp;
    this.pids[_item.id] = _item.pid;
}

/**
 * Build tree.
 */
XTreeUtil.prototype.buildTree = function() {
    var chd = new Array();
    for ( var i = 0; i < this.objs.length; i++) {
        chd[i] = false;
        this.objs[i].leaf = true;
    }

    for ( var i = 0; i < this.objs.length - 1; i++) {
        for ( var j = i + 1; j < this.objs.length; j++) {
            if (this.isParent(this.objs[i].id, this.objs[j].id)) {
                this.objs[i].appendChild(this.objs[j]);
                chd[j] = true;
                this.objs[i].leaf = false;
            } else if (this.isParent(this.objs[j].id, this.objs[i].id)) {
                this.objs[j].appendChild(this.objs[i]);
                chd[i] = true;
                this.objs[j].leaf = false;
            }
        }
    }

    // root.
    for ( var i = 0; i < chd.length; i++) {
        if (!chd[i]) {
            // those who has no parent.
            this.panel.getRootNode().appendChild(this.objs[i]);
        }
    }

}

/**
 * @return wether id1 is id2's parent.
 */
XTreeUtil.prototype.isParent = function(id1, id2) {
    var pid = this.pids[id2];
    if (id1 == pid) {
        return true;
    }
    return false;
}