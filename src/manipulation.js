fn.html = function(value) {
    var args = arguments,
        el;

    // add HTML into elements
    if (args.length === 1 && value !== undefined) {
        return this.empty().append(value);
    }
    // get HTML from element
    else if (args.length === 0 && (el = this[0])) {
        return el.innerHTML;
    }

    return this;
};

fn.append = function(appended) {
    var i = 0,
        length = this.length,
        setter;

    if (isString(appended) && rquickExpr.exec(appended)) {
        appended = jBone(appended);
    } else if (!isObject(appended)) {
        appended = document.createTextNode(appended);
    }

    if (appended instanceof jBone) {
        setter = function(el, i) {
            appended.forEach(function(node) {
                if (i) {
                    el.appendChild(node.cloneNode());
                } else {
                    el.appendChild(node);
                }
            });
        };
    } else if (appended instanceof Node) {
        setter = function(el) {
            el.appendChild(appended);
        };
    }

    for (; i < length; i++) {
        setter(this[i], i);
    }

    return this;
};

fn.appendTo = function(to) {
    jBone(to).append(this);

    return this;
};

fn.empty = function() {
    var i = 0,
        length = this.length,
        el;

    for (; i < length; i++) {
        el = this[i];

        while (el.lastChild) {
            el.removeChild(el.lastChild);
        }
    }

    return this;
};

fn.remove = function() {
    var i = 0,
        length = this.length,
        el;

    // remove all listners
    this.off();

    for (; i < length; i++) {
        el = this[i];

        // remove data and nodes
        delete el.jdata;
        el.parentNode && el.parentNode.removeChild(el);
    }

    return this;
};
