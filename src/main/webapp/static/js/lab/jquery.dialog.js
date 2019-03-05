/** jquery.box.js  */
;(function($) {

    if ($.fn.box) {
        return;
    }

// sum the layout box style definitions.
    function plus() {
        var value = 0, fnName;
        for (var i = 0; i < arguments.length; i++) {
            fnName = $.trim(arguments[i]);

            if (this[fnName]) {
                value += this[fnName]();
            }
        }

        return value;
    };


    $.fn.box = function() {
        var $this = this.eq(0);
        var map = {
            "ih": function() {
                delete this["ih"];
                return $this.height();
            },
            "iw": function() {
                delete this["iw"];
                return $this.width();
            },
            "oh": function() {
                delete this["oh"];
                return plus.call(this, "ih", "mt", "mb", "bt", "bb", "pt", "pb");
            },
            "ow": function() {
                delete this["ow"];
                return plus.call(this, "iw", "ml", "mr", "bl", "br", "pl", "pr");
            },
            "ml": function() {
                delete this["ml"];
                return (parseInt($this.css("margin-left")) || 0);
            },
            "mr": function() {
                delete this["mr"];
                return (parseInt($this.css("margin-right")) || 0);
            },
            "mt": function() {
                delete this["mt"];
                return (parseInt($this.css("margin-top")) || 0);
            },
            "mb": function() {
                delete this["mb"];
                return (parseInt($this.css("margin-bottom")) || 0);
            },
            "bl": function() {
                delete this["bl"];
                return (parseInt($this.css("border-left-width")) || 0);
            },
            "br": function() {
                delete this["br"];
                return (parseInt($this.css("border-right-width")) || 0);
            },
            "bt": function() {
                delete this["bt"];
                return (parseInt($this.css("border-top-width")) || 0);
            },
            "bb": function() {
                delete this["bb"];
                return (parseInt($this.css("border-bottom-width")) || 0);
            },
            "pl": function() {
                delete this["pl"];
                return (parseInt($this.css("padding-left")) || 0);
            },
            "pr": function() {
                delete this["pr"];
                return (parseInt($this.css("padding-right")) || 0);
            },
            "pt": function() {
                delete this["pt"];
                return (parseInt($this.css("padding-top")) || 0);
            },
            "pb": function() {
                delete this["pb"];
                return (parseInt($this.css("padding-bottom")) || 0);
            },
            "mlr": function() {
                delete this["mlr"];
                return plus.call(this, "ml", "mr");
            },
            "mtb": function() {
                delete this["mtb"];
                return plus.call(this, "mt", "mb");
            },
            "blr": function() {
                delete this["blr"];
                return plus.call(this, "bl", "br");
            },
            "btb": function() {
                delete this["btb"];
                return plus.call(this, "bt", "bb");
            },
            "plr": function() {
                delete this["plr"];
                return plus.call(this, "pl", "pr");
            },
            "ptb": function() {
                delete this["ptb"];
                return plus.call(this, "pt", "pb");
            },
            "l": function() {
                delete this["l"];
                return plus.call(this, "ml", "bl", "pl");
            },
            "r": function() {
                delete this["r"];
                return plus.call(this, "mr", "br", "pr");
            },
            "t": function() {
                delete this["t"];
                return plus.call(this, "mt", "bt", "pt");
            },
            "b": function() {
                delete this["b"];
                return plus.call(this, "mb", "bb", "pb");
            },
            "lr": function() {
                delete this["lr"];
                return plus.call(this, "ml", "mr", "bl", "br", "pl", "pr");
            },
            "tb": function() {
                delete this["tb"];
                return plus.call(this, "mt", "mb", "bt", "bb", "pt", "pb");
            }
        };

        return plus.apply(map, arguments);
    };


    $.fn.boxWidth = function(width) {
        if (typeof width == "undefined") {
            return this.is(":visible") ? this.box("ow") : 0;
        }
        else {
            return this.each(function() {
                var $this = $(this);
                $this.width(width - $this.box("lr"))
            });
        }
    };


    $.fn.boxHeight = function(height) {
        if (typeof height == "undefined") {
            return this.is(":visible") ? this.box("oh") : 0;
        }
        else {
            return this.each(function() {
                var $this = $(this);
                $this.height(height - $this.box("tb"))
            });
        }
    };

})(jQuery);






/** jquery.ibutton.js */
;(function($) {

    if ($.fn.iButton) {
        return;
    }

    $.fn.iButton = function(settings) {
        var defaults = {
            id: null,
            className: null,
            title: null,
            text: "",
            icon: null,
            disabled: null
        };

        // give settings to UI elements
        var opts = $.extend(defaults, settings);

        // elements used for generate a new jQuery objects
        var elements = [];
        for (i = 0; i < this.length; i++) {
            // if not a button, just backup it.
            if (!this.eq(i).is("input[type='button'], button")) {
                elements.push(this.eq(i)[0]);
                continue;
            }

            // if a button, do ibutton logic.
            var $this = this.eq(i),
                id = opts.id || $this.attr("id"),
            // "attrClassName" for fixing IE6/7 getAttribute("classname") bug.
                attrClassName = $this[0].attributes.classname ? $this[0].attributes.classname.value : null,
                cssClassName = $this.attr("class"),
                className = (opts.className || attrClassName || "i-button-default") +
                    (cssClassName ? " " + cssClassName : ""),
                title = opts.title || $this.attr("title"),
                text = opts.text || ($this.is("button") ? $this.text() : $this.val()),
                icon = opts.icon || $this.attr("icon"),
                disabled = (opts.disabled === null ? $this.attr("disabled") : opts.disabled);

            var $button = $(
                '<div tabindex="0"' + (id ? (' id="' + id + '"') : '') +
                    ' class="i-button ' + className + '"' +
                    (title ? (' title="' + title + '"') : '') +
                    (' data-disabled="' + (disabled ? 'true' : 'false') + '">') +
                    '<div class="i-button-state' + (disabled ? ' i-button-disabled' : '') + '">' +
                    (icon ? ('<div class="i-button-icon ' + icon +
                        (disabled ? (' ' + icon + '-disabled') : '') + '"></div>') : '') +
                    '<div class="i-button-inner">' +
                    '<div class="i-button-left' + (disabled ? ' i-button-left-disabled' : '') + '">' +
                    '<div class="i-button-text' + (disabled ? ' i-button-text-disabled' : '') + '">' +
                    text +
                    '</div>' +
                    '</div>' +
                    '<div class="i-button-right' + (disabled ? ' i-button-right-disabled' : '') + '"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            );

            // replace the native button to ibutton object.
            $this.replaceWith($button);
            elements.push($button[0]);

            // save icon setting
            if (icon) {
                $button.data("ibutton-icon", icon);
            }

            // bind button interactive effect.
            $button
                .hover(
                function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).addClass("i-button-hover");
                    $("div.i-button-left", $this).addClass("i-button-left-hover");
                    $("div.i-button-right", $this).addClass("i-button-right-hover");
                    $("div.i-button-text", $this).addClass("i-button-text-hover");
                    if (icon) {
                        $("div.i-button-icon", $this).addClass(icon + "-hover");
                    }
                },
                function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).removeClass("i-button-hover");
                    $("div.i-button-left", $this).removeClass("i-button-left-hover");
                    $("div.i-button-right", $this).removeClass("i-button-right-hover");
                    $("div.i-button-text", $this).removeClass("i-button-text-hover");
                    if (icon) {
                        $("div.i-button-icon", $this).removeClass(icon + "-hover");
                    }
                }
            )
                .focus(function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).addClass("i-button-focus");
                    $("div.i-button-left", $this).addClass("i-button-left-focus");
                    $("div.i-button-right", $this).addClass("i-button-right-focus");
                    $("div.i-button-text", $this).addClass("i-button-text-focus");
                    if (icon) {
                        $("div.i-button-icon", $this).addClass(icon + "-focus");
                    }
                })
                .bind("blur focusout", function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).removeClass("i-button-focus");
                    $("div.i-button-left", $this).removeClass("i-button-left-focus");
                    $("div.i-button-right", $this).removeClass("i-button-right-focus");
                    $("div.i-button-text", $this).removeClass("i-button-text-focus");
                    if (icon) {
                        $("div.i-button-icon", $this).removeClass(icon + "-focus");
                    }
                })
                .mousedown(function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).addClass("i-button-active");
                    $("div.i-button-left", $this).addClass("i-button-left-active");
                    $("div.i-button-right", $this).addClass("i-button-right-active");
                    $("div.i-button-text", $this).addClass("i-button-text-active");
                    if (icon) {
                        $("div.i-button-icon", $this).addClass(icon + "-active");
                    }
                })
                .bind("i-button-mouseup", function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    $("div.i-button-state", $this).removeClass("i-button-active");
                    $("div.i-button-left", $this).removeClass("i-button-left-active");
                    $("div.i-button-right", $this).removeClass("i-button-right-active");
                    $("div.i-button-text", $this).removeClass("i-button-text-active");
                    if (icon) {
                        $("div.i-button-icon", $this).removeClass(icon + "-active");
                    }
                })
                .keypress(function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    if (event.which == "13") {
                        event.preventDefault();
                        $this.trigger("click");
                    }
                })
                .keydown(function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    if (event.which == "32") {
                        $("div.i-button-state", $this).addClass("i-button-active");
                        $("div.i-button-left", $this).addClass("i-button-left-active");
                        $("div.i-button-right", $this).addClass("i-button-right-active");
                        $("div.i-button-text", $this).addClass("i-button-text-active");
                        if (icon) {
                            $("div.i-button-icon", $this).addClass(icon + "-active");
                        }
                    }
                })
                .keyup(function(event) {
                    var $this = $(this), icon = $this.data("ibutton-icon"),
                        disabled = $this.attr("data-disabled") == "true";
                    if (disabled) {
                        return;
                    }

                    if (event.which == "32") {
                        $("div.i-button-state", $this).removeClass("i-button-active");
                        $("div.i-button-left", $this).removeClass("i-button-left-active");
                        $("div.i-button-right", $this).removeClass("i-button-right-active");
                        $("div.i-button-text", $this).removeClass("i-button-text-active");
                        if (icon) {
                            $("div.i-button-icon", $this).removeClass(icon + "-active");
                        }
                        $this.trigger("click");
                    }
                })
                // unselected trick
                .bind("selectstart", function() {
                    return false;
                })
                .find("*").attr("unselectable", "on");
        }

        // generate a new jQuery objects.
        var $elements = $(elements);

        // inject jQuery click event to implement disabled logic
        var _click = $elements.click;
        $elements.click = function(fn) {
            _click.call(this, function(event) {
                var $this = $(this);
                if ($this.attr("data-disabled") == "false") {
                    fn.call(this, event);
                }
            });

            return this;
        };

        // iButton text method.
        $elements.text = function(value) {
            var $iButtons = this.filter("div.i-button");
            if ($iButtons.length && typeof value == "undefined") {
                return $("div.i-button-text", $iButtons.eq(0)).text();
            }
            else if ($iButtons.length && typeof value != "undefined") {
                $("div.i-button-text", $iButtons).text(value + "");
            }

            return this;
        };

        // iButton icon method.
        $elements.icon = function(value) {
            var $iButtons = this.filter("div.i-button");
            if (typeof value == "undefined" && $iButtons.length) {
                return $iButtons.eq(0).data("ibutton-icon");
            }
            else {
                for (var i = 0; i < $iButtons.length; i++) {
                    var $button = $iButtons.eq(i),
                        $icon = $("div.i-button-icon", $button),
                        icon = $button.data("ibutton-icon"),
                        disabled = $button.attr("data-disabled") == "true";

                    // set or remove icon
                    if (value) {
                        if ($icon.length) {
                            $icon.removeClass(icon + " " + icon + "-hover " + icon + "-focus " + icon + "-active " + icon + "-disabled");
                        }
                        else {
                            $icon = $('<div class="i-button-icon"></div>');
                            $("div.i-button-inner", $button).before($icon);
                        }

                        $icon.addClass(value + (disabled ? (" " + value + "-disabled") : ""));
                        if (!disabled) {
                            var $state = $("div.i-button-state", $button),
                                hovered = $state.hasClass("i-button-hover"),
                                focused = $state.hasClass("i-button-focus"),
                                actived = $state.hasClass("i-button-active");

                            $icon.addClass((hovered ? (value + "-hover") : "") +
                                (focused ? (" " + value + "-focus") : "") +
                                (actived ? (" " + value + "-active") : ""));
                        }
                        $button.data("ibutton-icon", value + "");
                    }
                    else {
                        if ($icon.length) {
                            $icon.remove();
                            $button.removeData("ibutton-icon");
                        }
                    }
                }
            }

            return this;
        };


        // iButton disabled method.
        $elements.disabled = function(value) {
            var $iButtons = this.filter("div.i-button");
            if (typeof value == "undefined" && $iButtons.length) {
                return $iButtons.eq(0).attr("data-disabled") == "true";
            }
            else {
                for (var i = 0; i < $iButtons.length; i++) {
                    var $button = $iButtons.eq(i), icon = $button.data("ibutton-icon");
                    if (value) {
                        $("div.i-button-state", $button)
                            .removeClass("i-button-hover i-button-focus i-button-active")
                            .addClass("i-button-disabled");
                        $("div.i-button-left", $button)
                            .removeClass("i-button-left-hover i-button-left-focus i-button-left-active")
                            .addClass("i-button-left-disabled");
                        $("div.i-button-right", $button)
                            .removeClass("i-button-right-hover i-button-right-focus i-button-right-active")
                            .addClass("i-button-right-disabled");
                        $("div.i-button-text", $button)
                            .removeClass("i-button-text-hover i-button-text-focus i-button-text-active")
                            .addClass("i-button-text-disabled");
                        if (icon) {
                            $("div.i-button-icon", $button)
                                .removeClass(icon + "-hover " + icon + "-focus " + icon + "-active")
                                .addClass(icon + "-disabled");
                        }
                        $button.attr("data-disabled", "true");
                    }
                    else {
                        $("div.i-button-state", $button).removeClass("i-button-disabled");
                        $("div.i-button-left", $button).removeClass("i-button-left-disabled");
                        $("div.i-button-right", $button).removeClass("i-button-right-disabled");
                        $("div.i-button-text", $button).removeClass("i-button-text-disabled");
                        if (icon) {
                            $("div.i-button-icon", $button).removeClass(icon + "-disabled");
                        }
                        $button.attr("data-disabled", "false");
                    }
                }
            }

            return this;
        };

        // return the generate new jQuery objects.
        return $elements;
    };

// tricky: document to handle mouse up event
    $(document).mouseup(function() {
        $("div.i-button").trigger("i-button-mouseup");
    });

})(jQuery);








/*
 * jquery.ishadow.js
 * Usage: $(selector).iShadow({position: "fixed", referPoint: "topleft"}
 * position: can be "fixed", or "absolute"
 * referPoint: can be "topleft", "topright", "bottomleft", or "bottomright"
 */

;(function($) {

    if ($.fn.removeShadow) {
        return;
    }

    var ieBug = $.browser.msie && parseFloat($.browser.version) < 7;

    $.fn.removeShadow = function() {
        return this.each(function() {
            var shadowId = $(this).data("iShadow");
            if (shadowId) {
                $("#" + shadowId).remove();
            }
        });
    };

    $.fn.iShadow = function(settings) {
        if ((ieBug && !document.getElementsByTagName("select").length && !document.getElementsByTagName("object").length) ||
            (!ieBug && !document.getElementsByTagName("embed").length && !document.getElementsByTagName("object").length)) {
            return this;
        }

        var defaults = {
            position: "fixed",
            referPoint: "topleft"
        };

        // merge current settings with defaults
        var opts = $.extend(defaults, settings);

        return this.each(function() {
            var $this = $(this), shadowId = $this.data("iShadow"), $iframe, position, iWidth, iHeight;

            // Create a shadow iframe in the first time. Next time, just get it directly.
            if (shadowId) {
                $iframe = $("#" + shadowId);
            }
            else {
                shadowId = "ishadow-" + new Date().getTime();
                $this.data("iShadow", shadowId);
                $iframe = $('<iframe id="' + shadowId + '" frameborder="0" tabindex="-1" src="about:blank" style="position:' + opts.position +
                    ';z-index:' + parseFloat($this.css("zIndex")).toString() + ';display:block;cursor:default;opacity:0;filter:alpha(opacity=0);"></iframe>')
                    .insertBefore($this);
                if (opts.position == "fixed") {
                    switch (opts.referPoint) {
                        case "topleft":
                            $iframe.css({"top": $this.css("top"), "left": $this.css("left")});
                            break;

                        case "topright":
                            $iframe.css({"top": $this.css("top"), "right": $this.css("right")});
                            break;

                        case "bottomleft":
                            $iframe.css({"bottom": $this.css("bottom"), "left": $this.css("left")});
                            break;

                        case "bottomright":
                            $iframe.css({"bottom": $this.css("bottom"), "right": $this.css("right")});
                            break;

                        default:
                            alert("iShadow: incorrect reference point!");
                            return;
                    }
                }
            }

            // adjust the shadow iframe's position
            if (opts.position == "absolute") {
                position = $this.position();
                $iframe.css({"left": position.left + "px", "top": position.top + "px"});
            }

            // caculate width and height for the shadow iframe element
            iWidth = $this.width() +
                (parseInt($this.css("padding-left")) || 0) +
                (parseInt($this.css("padding-right")) || 0) +
                (parseInt($this.css("border-left-width")) || 0) +
                (parseInt($this.css("border-right-width")) || 0);
            iHeight = $this.height() +
                (parseInt($this.css("padding-top")) || 0) +
                (parseInt($this.css("padding-bottom")) || 0) +
                (parseInt($this.css("border-top-width")) || 0) +
                (parseInt($this.css("border-bottom-width")) || 0);

            $iframe.css({"width": iWidth + "px", "height": iHeight + "px",
                "margin-top": $this.css("margin-top"), "margin-right": $this.css("margin-right"),
                "margin-bottom": $this.css("margin-bottom"), "margin-left": $this.css("margin-left")});
        });
    };})(jQuery);



/** jquery.scrollbarwidth.js */
;(function($) {
    if ($.scrollbarWidth) {
        return;
    }

    var scrollbarWidth = 0;
    $.scrollbarWidth = function() {
        if ( !scrollbarWidth ) {
            if ( $.browser.msie ) {
                var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                        .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
                    $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                        .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
                scrollbarWidth = $textarea1.width() - $textarea2.width();
                $textarea1.add($textarea2).remove();
            } else {
                var $div = $('<div />')
                    .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
                    .prependTo('body').append('<div />').find('div')
                    .css({ width: '100%', height: 200 });
                scrollbarWidth = 100 - $div.width();
                $div.parent().remove();
            }
        }
        return scrollbarWidth;
    };
})(jQuery);



/*
    jquery.dialog.js
	TODO: can be dragged, DOM-Drag
*/

;(function($) {

// if already load dialog, return directly
if ($.dialog) {
	return;
}

var $window = $(window), $document = $(document);
var ieBug = $.browser.msie && parseFloat($.browser.version) < 7;

// jQuery doesn't support a is string judgement, so I made it by myself.
function isString(obj) {
	return typeof obj == "string" || Object.prototype.toString.call(obj) === "[object String]";
}

// dialog list to manage the dialogs.
var dialogList = [];
dialogList.add = function($dialog) {
	this.push($dialog);
	return $dialog;
};

dialogList.remove = function($dialog) {
	var flag;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == $dialog) {
			flag = true;
		}
		if (flag) {
			this[i] = this[i + 1];
		}
	}

	if (flag) {
		this.length--;
	}

	return $dialog;
};

// manage the window resize event.
var resizeTimer;
$window.resize(function() {
	window.clearTimeout(resizeTimer);
	resizeTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].adjust(false);
		}
	}, 100);
});

// manage the window scroll event for ie6.
if (ieBug) {
var scrollTimer;
$window.scroll(function () {
	for (var i = 0; i < dialogList.length; i++) {
		dialogList[i].ieFixedHide();
	}

	window.clearTimeout(scrollTimer);
	scrollTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].ieFixedPos();
		}
	}, 400);
});
}

// handle escape key to close dialog one by one.
$document.keydown(function(event) {
	if (dialogList.length && event.keyCode == 27) {
		dialogList[dialogList.length - 1].close("cancel", event);
	}
});

// the basic dialog plugin
$.dialog = function(settings) {
	var initializing = true;
	var defaults = {
		id: "",
		className: "",
		tip: false,
		direction: "top",
		title: "",
		content: "",
		labClose: null,
		titleClose: "关闭",
		btns: [],
		defaultBtn: "",
		labAccept: "确定",
		labCancel: "取消",
		top: null,
		left: null,
		refer: null,
		fixed: true,
		scrollIntoView: true,
		contentWidth: null,
		contentHeight: null,
		contentBtnHelp: false,
		modal: true,
		onLoad: null,
		onBeforeAccept: null,
		onAccept: null,
		onBeforeCancel: null,
		onCancel: null,
		onBeforeClose: null,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);
	opts.top  = parseInt(opts.top);
	opts.left = parseInt(opts.left);
	opts.contentWidth  = parseInt(opts.contentWidth);
	opts.contentHeight = parseInt(opts.contentHeight);

	// build button html template.
	var mapBtns = {
		"accept": '<button class="dialog-button-accept">' + opts.labAccept + '</button>',
		"cancel": '<button class="dialog-button-cancel">' + opts.labCancel + '</button>'
	};
	var templateBtns = "";
	if (opts.btns.length) {
		templateBtns += '<div class="dialog-button-container">';
		for (var i = 0 ; i < opts.btns.length; i++) {
			templateBtns += mapBtns[opts.btns[i]];
		}
		templateBtns += '</div>';
	}

	// build mask html template.
	var templateMask =
		'<div' + (opts.id ? (' id="' + opts.id + '-mask"') : '') + ' class="jquery-dialog-mask ' +
				(!$("div.jquery-dialog-mask").length ? "jquery-dialog-mask-color" : "jquery-dialog-mask-transparent") +
				(opts.className ? (' ' + opts.className + '-mask"') : '"') + '></div>';

	// build dialog html template.
	var templateDialog =
		'<div style="top: -10000px; left: -10000px;"' + (opts.id ? (' id="' + opts.id + '"') : '') + ' class="jquery-dialog ' +
				(!opts.fixed || ieBug ? 'dialog-outer-absolute' : 'dialog-outer-fixed') +
				(opts.tip ? ' jquery-tip' : '') + (opts.className ? (' ' + opts.className + '"') : '"') + '>' +
			(opts.tip ? '<div class="dialog-tip-arrow dialog-tip-arrow-' + opts.direction.toLowerCase() + '"></div>' : '') +
			'<div class="dialog-top-container">' +
				'<div class="dialog-top-left-corner"></div>' +
				'<div class="dialog-top-border"></div>' +
				'<div class="dialog-top-right-corner"></div>' +
			'</div>' +

			'<div class="dialog-middle-container">' +
				'<div class="dialog-left-border"></div>' +

				'<div class="dialog-inner-container">' +
					'<div class="dialog-title-container">' +
						'<div class="dialog-title">' + opts.title + '</div>' +
						'<div tabindex="0" class="dialog-button-close" title="' + opts.titleClose + '">' +
							(opts.labClose || '') +
						'</div>' +
					'</div>' +

					'<div class="dialog-content-container"></div>' + templateBtns +
				'</div>' +

				'<div class="dialog-right-border"></div>' +
			'</div>' +

			'<div class="dialog-bottom-container">' +
				'<div class="dialog-bottom-left-corner"></div>' +
				'<div class="dialog-bottom-border"></div>' +
				'<div class="dialog-bottom-right-corner"></div>' +
			'</div>' +
		'</div>';

	// append mask and dialog into document.
	var $body = $(document.body), $dialogInserter = $("#jquery-dialog-inserter");
	if (!$dialogInserter.length) {
		$dialogInserter = $('<div id="jquery-dialog-inserter"></div>');
		$dialogInserter.prependTo($body);
	}

	var $dialog = dialogList.add($(templateDialog));
	$dialog.data("jquery-dialog", $dialog);
	if (opts.modal) {
		$dialog.data("jquery-dialog-mask", $(templateMask).insertBefore($dialogInserter));
	}

	// set dom content into dialog
	var isNode = opts.content && !isString(opts.content) && (opts.content.parentNode || opts.content.jquery);
	if (isNode) {
		var $node = $(opts.content);
		var data = {
			el: $node[0],
			html: $node.html(),
			parent: $node.parent()[0],
			display: $node.css("display"),
			position: $node.css("position")
		};
		if (data.parent) {
			$node.remove();
		}

		$dialog.data("dialog.history", data);
	}

	$("div.dialog-content-container", $dialog).append(isNode ? $(opts.content).eq(0) : opts.content.toString());
	$dialog.insertBefore($dialogInserter);
	if (isNode) {
		$(opts.content).show();
	}

	// this method can remove dialog without any callback.
	$dialog.destroy = function() {
		// remove mask from dom
		dialogList.remove(this);
		if (opts.modal) {
			this.data("jquery-dialog-mask").removeShadow().remove();
		}

		// restore content node.
		var data = this.data("dialog.history");
		if (data && data.el) {
			var $node = $(data.el).css({"display": data.display, "position": data.position});
			if (data.parent) {
				$node.html(data.html).appendTo(data.parent);
			}
			this.removeData("dialog.history");
		}

		// remove dialog from dom.
		this.remove();
	};

	// add dialog close method.
	$dialog.close = function(state, event) {
		event = $.extend(event, {"state": state});
		if ($.isFunction(opts.onBeforeClose) && opts.onBeforeClose.call($dialog, event) === false) {
			return false;
		}

		// call destroy method
		this.destroy();

		if ($.isFunction(opts.onClose)) {
			opts.onClose(event);
		}

		if (state == "accept") {
			if ($.isFunction(opts.onAccept)) {
				opts.onAccept(event);
			}
		}
		else if (state == "cancel") {
			if ($.isFunction(opts.onCancel)) {
				opts.onCancel(event);
			}
		}

		return true;
	};

	// add adjust dialog size method.
	$dialog.adjust = function() {
		// adjust mask size
		var $mask = this.data("jquery-dialog-mask");
		if ($mask) {
			if (ieBug) {
				$mask.css("position", "absolute")
				.height(Math.max($body.boxHeight(), $window.height()))
				.width(Math.max($body.boxWidth(), $window.width()))
				.iShadow({position: "absolute", referPoint: "topleft"});
			}
			else {
				$mask
				.iShadow({position: "fixed", referPoint: "topleft"});
			}
		}

		if ((typeof arguments[0] == "undefined") || initializing) {
			var $contentContainer = $("div.dialog-content-container", this);

			if (!initializing) {
				$contentContainer.css({height: "auto"});
			}
			var $leftBorder = $("div.dialog-left-border", this);
			var $rightBorder = $("div.dialog-right-border", this);
			var $topBorder = $("div.dialog-top-border", this);
			var $bottomBorder = $("div.dialog-bottom-border", this);

			var $topLeftCorner = $("div.dialog-top-left-corner", this);
			var $topRightCorner = $("div.dialog-top-right-corner", this);
			var $bottomLeftCorner = $("div.dialog-bottom-left-corner", this);
			var $bottomRightCorner = $("div.dialog-bottom-right-corner", this);

			var $topContainer = $("div.dialog-top-container", this);
			var $midderContainer = $("div.dialog-middle-container", this);
			var $bottomContainer = $("div.dialog-bottom-container", this);

			var $innerContainer = $("div.dialog-inner-container", this);
			var $titleContainer = $("div.dialog-title-container", this);
			var $title = $("div.dialog-title", this);
			var $buttonClose = $("div.dialog-button-close", this);
			var $buttonContainer = $("div.dialog-button-container", this);

			// give the content a width or height define.
			var contentWidth = Math.max(
					(opts.contentWidth > 0 ? opts.contentWidth : Math.min($contentContainer.boxWidth(), $window.width() - $.scrollbarWidth())),
					opts.btns.length * 150
				);
			$contentContainer.boxWidth(contentWidth);
			var contentHeight = opts.contentHeight > 0 ? opts.contentHeight : $contentContainer.boxHeight();
			$contentContainer.boxHeight(contentHeight);
			// translate buttons inside content to iButton default style.
			if (opts.contentBtnHelp && $.fn.iButton) {
				$("input[type='button'], button", $contentContainer).iButton();
			}

			// set the title-container and button-container are sync with content width
			var contentBoxWidth = $contentContainer.boxWidth();
			$titleContainer.boxWidth(contentBoxWidth);
			$buttonContainer.boxWidth(contentBoxWidth);

			// adjust title and button layout.
			$title.boxWidth($titleContainer.width() - $buttonClose.boxWidth());
			if (initializing && $.fn.iButton) {
				$("input[type='button'], button", $buttonContainer).iButton();
			}

			// set the top-border and bottom-border width.
			var innerContainerBoxWidth = contentBoxWidth + $innerContainer.box("lr");
			$innerContainer.boxWidth(innerContainerBoxWidth);
			$topBorder.boxWidth(innerContainerBoxWidth);
			$bottomBorder.boxWidth(innerContainerBoxWidth);

			// set the left-border and right-border height.
			var innerContainerBoxHeight = $innerContainer.box("tb") + $contentContainer.boxHeight() +
						$titleContainer.boxHeight() + $buttonContainer.boxHeight();
			$leftBorder.boxHeight(innerContainerBoxHeight);
			$rightBorder.boxHeight(innerContainerBoxHeight);

			// give the top-c, middle-c and bottom-c a fixed width and height.
			$topContainer.width($topLeftCorner.boxWidth() + $topBorder.boxWidth() + $topRightCorner.boxWidth());
			$bottomContainer.width($bottomLeftCorner.boxWidth() + $bottomBorder.boxWidth() + $bottomRightCorner.boxWidth());
			$midderContainer
				.height(innerContainerBoxHeight)
				.width($leftBorder.boxWidth() + $innerContainer.boxWidth() + $rightBorder.boxWidth());

			// give the dialog a fixed width
			this.width($topContainer.boxWidth());
		}


		// calculate the center top and center left position
		if (initializing || opts.fixed) {
			var centerTop  = Math.round(($window.height() - this.boxHeight()) / 2),
				centerLeft = Math.round(($window.width()  - this.boxWidth())  / 2);
		}

		// calculate the dialog top and left position.
		var top = null, left = null;
		// ie6 fixed position.
		if (ieBug && opts.fixed) {
			top  = $window.scrollTop()  + (isNaN(opts.top)  ? centerTop  : opts.top );
			left = $window.scrollLeft() + (isNaN(opts.left) ? centerLeft : opts.left);
		}
		// for unfixed refer position.
		else if (!opts.fixed && opts.refer) {
			var offset = $(opts.refer).offset();
			top  = offset.top  + (opts.top  || 0);
			left = offset.left + (opts.left || 0);
		}
		// for initialized unfixed dialog and always for fixed dialog
		else if (initializing || opts.fixed) {
			if (!opts.fixed) {
				centerTop  = $window.scrollTop()  + centerTop;
				centerLeft = $window.scrollLeft() + centerLeft;
			}
			top  = isNaN(opts.top)  ? centerTop  : opts.top;
			left = isNaN(opts.left) ? centerLeft : opts.left;
		}
		if (top !== null) {
			this.css({"top": top + "px", "left": left + "px"});
		}

		// scroll into view control.
		if (initializing && !opts.fixed && opts.scrollIntoView) {
			this.scrollIntoView();
		}
		// give default button focus
		if (initializing) {
			if (opts.defaultBtn == "accept") {
				$(".dialog-button-accept", $buttonContainer).eq(0).focus();
			}
			else if (opts.defaultBtn == "cancel") {
				$(".dialog-button-cancel", $buttonContainer).eq(0).focus();
			}
		}

		return this;
	};

	// scroll dialog into view method.
	$dialog.scrollIntoView = function() {
		var pos = this.position(), scrollTop = $window.scrollTop(), scrollLeft =  $window.scrollLeft();

		if (((pos.top  < scrollTop)  || (pos.top  > $window.height() + scrollTop)) ||
			((pos.left < scrollLeft) || (pos.left > $window.width()  + scrollLeft))) {
			this[0].scrollIntoView();
		}
	};

	// ie fixed top method.
	$dialog.ieFixedPos = function() {
		if (ieBug && opts.fixed) {
			var top  = isNaN(opts.top)  ? Math.round(($window.height() - this.boxHeight()) / 2) : opts.top;
			var left = isNaN(opts.left) ? Math.round(($window.width()  - this.boxWidth())  / 2) : opts.left;
			this.css({"top": top + $window.scrollTop() + "px",
					  "left": left + $window.scrollLeft() + "px"});
		}

		return this;
	};

	// ie fixed hide method
	$dialog.ieFixedHide = function() {
		if (ieBug && opts.fixed) {
			this.css({"top": "-10000px", "left": "-10000px"});
		}

		return this;
	}

	/*
	 init position and size for dialog.
	*/
	$dialog.adjust(false);

	/*
	 add event handlers for dialog.
	*/
	$dialog
	.mouseover(function(event) {
		var $target = $(event.target);
		var fromElement = event.fromElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.addClass("dialog-button-close-hover");
		}
	})
	.mouseout(function(event) {
		var $target = $(event.target);
		var toElement = event.toElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.removeClass("dialog-button-close-hover");
		}
	})
	.click(function(event) {
		var $target = $(event.target),
			$btnAccept = $target.closest(".dialog-button-accept"),
			$btnCancel = $target.closest(".dialog-button-cancel");
		if ($btnAccept.length && $btnAccept.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeAccept) &&
				opts.onBeforeAccept.call($dialog, $.extend(event, {"state": "accept"})) === false) {
				return;
			}

			$dialog.trigger("accept");
		}
		else if ($btnCancel.length && $btnCancel.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeCancel) &&
				opts.onBeforeCancel.call($dialog, $.extend(event, {"state": "cancel"})) === false) {
				return;
			}

			$dialog.trigger("cancel");
		}
		else if ($target.is("div.dialog-button-close")) {
			$dialog.close("cancel");
		}
	})
	.bind("accept", function() {
		$dialog.close("accept");
	})
	.bind("cancel", function() {
		$dialog.close("cancel");
	});


	if ($.isFunction(opts.onLoad)) {
		opts.onLoad.call($dialog);
	}
	initializing = false;
	return $dialog;
};


/* the jquery inform dialog */
$.inform = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		delay: 2000,
		easyClose: true,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	var $inform = $.dialog({
		className: "jquery-inform",
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});

	// bind close handler.
	var timer;
	if (opts.delay > 0) {
		timer = window.setTimeout(close, opts.delay);
	}
	if (opts.easyClose) {
		$document.bind("mouseup", close);
	}

	// close by timeout or click event.
	function close() {
		try{ $inform.close(); }catch(e){};
		window.clearTimeout(timer);
		if (opts.easyClose) {
			$document.unbind("mouseup", close);
		}
	};

	return $inform;
};


/* the jquery confirm dialog */
$.alert = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labClose: "确定",
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-alert",
		btns: ["accept"],
		defaultBtn: "accept",
		labAccept: opts.labClose,
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});
};

/* the jquery confirm dialog */
$.confirm = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labConfirm: "确定",
		labCancel: "取消",
		defaultBtn: "accept",
		onConfirm: null,
		onCancel: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-confirm",
		btns: ["accept", "cancel"],
		defaultBtn: opts.defaultBtn,
		labAccept: opts.labConfirm,
		labCancel: opts.labCancel,
		title: opts.title,
		content: content,
		onAccept: opts.onConfirm,
		onCancel: opts.onCancel
	});
};



/*
 * jQuery tip plugins
 */

// wrap the browser default getClientRects method to cross browser function.
function getClientRects(target) {

	// create new wrapped rect objects.
	var rects = target.getClientRects();
	var newRects = [{"top":    rects[0].top,    "right": rects[0].right,
				     "bottom": rects[0].bottom, "left":  rects[0].left}];
	for (var i = 1, j = 0; i < rects.length; i++) {
		if (rects[i]) {
			// unit rects for IE6/IE7
			if ((newRects[j].right == rects[i].left &&
				newRects[j].bottom - newRects[j].top > Math.abs(newRects[j].top - rects[i].top)) ||
				(newRects[j].left == newRects[j].right)) {
				newRects[j].top    = Math.min(newRects[j].top,    rects[i].top);
				newRects[j].right  = Math.max(newRects[j].right,  rects[i].right);
				newRects[j].bottom = Math.max(newRects[j].bottom, rects[i].bottom);
				newRects[j].left   = Math.min(newRects[j].left,   rects[i].left);
			}
			else {
				newRects.push({"top":    rects[i].top,    "right": rects[i].right,
							   "bottom": rects[i].bottom, "left":  rects[i].left});
				j++;
			}
		}
	}

	// convert float position value to integer value for Firefox
	for (var i = 0; i < newRects.length; i++) {
		newRects[i].top    = Math.round(newRects[i].top);
		newRects[i].right  = Math.round(newRects[i].right);
		newRects[i].bottom = Math.round(newRects[i].bottom);
		newRects[i].left   = Math.round(newRects[i].left);
	}

	return newRects;
}

/*
 * Extend a custom hover rect event plugin.
 * Because jQuery hover event doesn't work well for jQuery tip.
 */
$.fn.hoverrect = function(mouseenter, mouseleave) {
	var pos = {x: 0, y: 0}, lastRect = {top: null, right: null, bottom: null, left: null};

	return this
	.mousemove(function(event) {
		if (pos.x == event.clientX && pos.y == event.clientY) {
			return;
		}

		pos.x = event.clientX;
		pos.y = event.clientY;

		// check rect by current mouse position.
		var rects = getClientRects(this), rect;
		for (var i = 0; i < rects.length; i++) {
			if (rects[i].left <= pos.x && rects[i].right  >= pos.x &&
				rects[i].top  <= pos.y && rects[i].bottom >= pos.y) {
				rect = rects[i];
				break;
			}
		}

		// rect which unders current mouse position has changed.
		if (rect && (lastRect.top !== rect.top || lastRect.right !== rect.right ||
					lastRect.bottom !== rect.bottom || lastRect.left !== rect.left)) {

			// mouse leave the last rect.
			if (lastRect.top !== null) {
				event.clientRect = lastRect;
				event.type = "mouseleaverect";
				if ($.isFunction(mouseleave)) {
					mouseleave.call(this, event);
				}
			}

			// mouse enter a new rect.
			lastRect = rect;
			event.clientRect = rect;
			event.type = "mouseenterrect";
			if ($.isFunction(mouseenter)) {
				mouseenter.call(this, event);
			}
		}
	})
	.mouseleave(function(event) {
		// mouse leave the last rect.
		event.clientRect = lastRect;
		event.type = "mouseleaverect";
		lastRect = {top: null, right: null, bottom: null, left: null};
		if ($.isFunction(mouseleave)) {
			mouseleave.call(this, event);
		}
	});
};


// build the tip arrow class string
function buildArrowClass(direction) {
	return "dialog-tip-arrow dialog-tip-arrow-" + direction;
}


// calculate the tip location
function calcTipPos(align, referRect, tipRect, offset) {
	var top = 0, left = 0;

	if (align == "top") {
		top  = Math.round(referRect.top - tipRect.height - offset.y);
		left = Math.round(referRect.left + (referRect.width - tipRect.width) / 2 + offset.x);
	}
	else if (align == "bottom") {
		top  = Math.round(referRect.top + referRect.height + offset.y);
		left = Math.round(referRect.left + (referRect.width - tipRect.width) / 2 + offset.x);
	}
	else if (align == "left") {
		top  = Math.round(referRect.top + (referRect.height - tipRect.height) / 2 + offset.y);
		left = Math.round(referRect.left - tipRect.width - offset.x);
	}
	else if (align == "right") {
		top  = Math.round(referRect.top + (referRect.height - tipRect.height) / 2 + offset.y);
		left = Math.round(referRect.left + referRect.width + offset.x);
	}

	return {top: top, left: left};
}


// alignTipToRect shared with $.tip() and $.fn.tip().
function alignTipToRect($tip, rect, opts) {
	// get below help data info.
	var docElem = document.documentElement, body = document.body, $body = $(body);
	var winHeight = $window.height();
	var winWidth  = $window.width();
	var scrollTop  = window.pageYOffset || docElem.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft;
	var clientTop  = docElem.clientTop  || body.clientTop  || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	// fill the referRect object.
	var referRect = {
		top: Math.round(rect.top   + scrollTop  - clientTop),
		left: Math.round(rect.left + scrollLeft - clientLeft),
		width: Math.round(rect.right - rect.left),
		height: Math.round(rect.bottom - rect.top)
	};

	// fill the tipRect object.
	var tipRect = {
		width: Math.round($tip.width()),
		height: Math.round($tip.height())
	};

	// fill the offset object.
	var offset = {x: opts.offsetX, y: opts.offsetY};

	// calculate the tip position by rectRect, tipRect and offset.
	var position = calcTipPos(opts.align, referRect, tipRect, offset);

	// get the scope top, left, bottom, right
	var scopeTop    = (opts.scope === "viewport" ? scrollTop  : 0) + 1;
	var scopeLeft   = (opts.scope === "viewport" ? scrollLeft : 0) + 1;
	var scopeBottom = (opts.scope === "viewport" ? winHeight + scrollTop  : Math.max($body.boxHeight(), winHeight)) - 1;
	var scopeRight  = (opts.scope === "viewport" ? winWidth  + scrollLeft : Math.max($body.boxWidth(),  winWidth))  - 1;

	// reset arrow class by align option.
	var $arrow = $tip.find(".dialog-tip-arrow"), arrow = $arrow[0];
	arrow.className = buildArrowClass(alignMap[opts.align]);

	// the tip outside scope top, align to bottom
	if (opts.align == "top" && position.top < scopeTop) {
		position = calcTipPos("bottom", referRect, tipRect, offset);
		arrow.className = buildArrowClass("top");
	}
	// the tip outside scope bottom, align to top
	else if (opts.align == "bottom" && (position.top + tipRect.height) > scopeBottom) {
		position = calcTipPos("top", referRect, tipRect, offset);
		arrow.className = buildArrowClass("bottom");
	}
	// the tip outside scope left, align to right
	else if (opts.align == "left" && position.left < scopeLeft) {
		position = calcTipPos("right", referRect, tipRect, offset);
		arrow.className = buildArrowClass("left");
	}
	// the tip outside scope right, align to left
	else if (opts.align == "right" && (position.left + tipRect.width) > scopeRight) {
		position = calcTipPos("left", referRect, tipRect, offset);
		arrow.className = buildArrowClass("right");
	}

	// limit the tip and tip-arrow position.
	var minTop  = scrollTop  + 1,
		minLeft = scrollLeft + 1,
		maxTop  = winHeight  + scrollTop  - tipRect.height - 1,
		maxLeft = winWidth   + scrollLeft - tipRect.width  - 1,
		tipTop  = position.top,
		tipLeft = position.left;

	// set the tip arrow position.
	if (opts.align == "top" || opts.align == "bottom") {
		tipLeft = Math.max(Math.min(tipLeft, maxLeft), minLeft);
		$arrow.css({"left": Math.round((tipRect.width - $arrow.width()) / 2) - (tipLeft - position.left) + "px"});
	}
	else if (opts.align == "left" || opts.align == "right") {
		tipTop = Math.max(Math.min(tipTop, maxTop), minTop);
		$arrow.css({"top": Math.round((tipRect.height - $arrow.height()) / 2) - (tipTop - position.top) + "px"});
	}

	// set the tip dialog position.
	$tip.css({"top": tipTop + "px", "left": tipLeft + "px"});
}


// setTipContent shared with $.tip() and $.fn.tip().
function setTipContent($tip, content) {
	var top  = $tip.css("top");
	var left = $tip.css("left");
	$tip.css({"top": "-10000px", "left": "-10000px"}).show();
	$tip.find(".dialog-content-container").html(content).css("width", "auto");
	$tip.find(".dialog-inner-container").css("width", "auto");
	$tip.find(".dialog-middle-container").css("width", "auto");
	$tip.css("width", "auto");
	$tip.adjust();
	$tip.css({"top": top, "left": left});
}


// $.tip(): jQuery tip plugin.
var alignMap = {"top": "bottom", "right": "left", "bottom": "top", "left": "right"};
$.tip = function(settings) {
	var defaults = {
		id: "",
		className: "",
		title: "",
		content: "",
		labClose: null,
		titleClose: "关闭",
		btns: [],
		defaultBtn: "",
		labAccept: "确定",
		labCancel: "取消",
		contentWidth: null,
		contentHeight: null,
		contentBtnHelp: false,
		modal: false,
		onLoad: null,
		onBeforeAccept: null,
		onAccept: null,
		onBeforeCancel: null,
		onCancel: null,
		onBeforeClose: null,
		onClose: null
	};

	var opts = $.extend(defaults, settings);

	// create the tip widget.
	var $tip = $.dialog({
		tip: true,
		fixed: false,
		scrollIntoView: false,
		top: -10000,
		left: -10000,
		id: opts.id,
		className: opts.className,
		title: opts.title,
		content: opts.content,
		labClose: opts.labClose,
		titleClose: opts.titleClose,
		btns: opts.btns,
		defaultBtn: opts.defaultBtn,
		labAccept: opts.labAccept,
		labCancel: opts.labCancel,
		contentWidth: opts.contentWidth,
		contentHeight: opts.contentHeight,
		contentBtnHelp: opts.contentBtnHelp,
		modal: opts.modal,
		onLoad: opts.onLoad,
		onBeforeAccept: opts.onBeforeAccept,
		onAccept: opts.onAccept,
		onBeforeCancel: opts.onBeforeCancel,
		onCancel: opts.onCancel,
		onBeforeClose: opts.onBeforeClose,
		onClose: opts.onClose
	})
	.hide();


	/*
	 * tip.align(): adjust tip position.
	 */
	$tip.align = function(settings) {
		if (!this.is(":visible")) {
			return this;
		}

		// fill the options object.
		var opts;
		if (typeof settings === "undefined") {
			opts = this.data("tip-settings");
		}
		else {
			var defaults = {
				scope: "viewport",
				align: "bottom",
				refer: null,
				referRect: null,
				offsetX: 0,
				offsetY: 0
			};

			// align setting.
			opts = $.extend(defaults, settings);

			// tip align map object.
			opts.align = opts.align.toLowerCase();
			if (!alignMap[opts.align]) {
				opts.align = defaults.align;
			}

			// save current setting to tip's data.
			this.data("tip-settings", opts);
		}

		// align the tip.
		alignTipToRect(this, opts.referRect ? opts.referRect : getClientRects($(opts.refer)[0])[0], opts);

		return this;
	};


	/*
	 * tip.content(): get or set content of tip widget.
	 */
	$tip.content = function(content) {
		if (typeof content == "undefined") {
			return this.find(".dialog-content-container").html();
		}
		else {
			var isVisible = this.is(":visible");

			setTipContent(this, content);

			// align tip position or restore hide states.
			if (!isVisible) {
				this.hide();
			}
			return this;
		}
	};

	return $tip;
};


/*
 * $(selector).tip: jQuery tip plugin.
 */
$.fn.tip = function(settings) {
	var defaults = {
		hover: true,
		enterable: false,
		enterableDelay: 100,
		show: null,
		hide: null,
		scope: "viewport",
		align: "bottom",
		offsetX: 0,
		offsetY: 0,
		id: "",
		className: "",
		content: "",
		contentWidth: null,
		contentHeight: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// tip align map object.
	opts.align = opts.align.toLowerCase();
	if (!alignMap[opts.align]) {
		opts.align = defaults.align;
	}

	// handler code.
	return this.each(function() {

		// initialize the tip widget.
		var $refer = $(this),
			$tip = $refer.data("tip");
		if ($tip) {
			return;
		}

		// create the tip widget and save it to its data "tip".
		$tip = $.dialog({
			tip: true,
			modal: false,
			fixed: false,
			top: -10000,
			left: -10000,
			id: opts.id,
			className: opts.className,
			content: opts.content,
			contentWidth: opts.contentWidth,
			contentHeight: opts.contentHeight
		})
		.hide();
		$refer.data("tip", $tip);

		// auto hover show up.
		if (opts.hover) {

			// tip hide and show event handler.
			function hideTip(event) {
				if ($.isFunction(opts.hide)) {
					opts.hide.call($tip, event);
				}
				else {
					$tip.hide();
				}
			}

			function showTip(event) {
				$tip.data("tip-refer-rect", event.clientRect);
				if ($.isFunction(opts.show)) {
					opts.show.call($tip, event);
				}
				else {
					$tip.show();
				}
				$tip.data("tip-refer-rect", null);
			}

			// timer for tip enterable feature.
			var timer = null;
			function cancelledHideTip() {
				if (timer) {
					window.clearTimeout(timer);
					timer = null;
					return true;
				}
				else {
					return false;
				}
			}
			function delayedHideTip(event) {
				timer = window.setTimeout(function() {
					timer = null;
					hideTip(event);
				}, opts.enterableDelay);
			}

			// hover to show the tip.
			if (opts.enterable) {
				$tip.hover(cancelledHideTip, delayedHideTip);
			}
			$refer.hoverrect(
				function(event) {
					if (!cancelledHideTip()) {
						showTip(event);
					}
				},
				function(event) {
					if (opts.enterable) {
						delayedHideTip(event);
					}
					else {
						hideTip(event);
					}
				}
			);
		}


		/*
		 * fn.tip.algin(): adjust tip position.
		 */
		$tip.align = function () {
			if (!this.is(":visible")) {
				return this;
			}

			var rect = this.data("tip-refer-rect");
			if (!rect) {
				rect = getClientRects($refer[0])[0];
			}

			// align the tip.
			alignTipToRect(this, rect, opts);

			return this;
		};


		/*
		 * fn.tip.show(): inject code to the default jQuery show method.
		 */
		var funShow = $tip.show;
		$tip.show = function(speed) {
			funShow.call(this);
			this.align();

			// for speed animation effect.
			if (speed || speed === 0) {
				this.hide();
				funShow.apply(this, arguments);
			}
			return this;
		};


		/*
		 * fn.tip.fadeIn(): inject code to the default jQuery fadeIn method.
		 */
		var funFadeIn = $tip.fadeIn;
		$tip.fadeIn = function() {
			funShow.call(this);
			this.align().hide();

			funFadeIn.apply(this, arguments);
			return this;
		};


		/*
		 * fn.tip.content(): get or set content of tip widget.
		 */
		$tip.content = function(content) {
			if (typeof content == "undefined") {
				return this.find(".dialog-content-container").html();
			}
			else {
				var isVisible = this.is(":visible");

				setTipContent(this, content);

				// align tip position or restore hide states.
				if (isVisible) {
					this.align();
				}
				else {
					this.hide();
				}
				return this;
			}
		};
	});
};

})(jQuery);
