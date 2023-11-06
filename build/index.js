var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// node_modules/postal-mime/dist/postal-mime.js
var require_postal_mime = __commonJS({
  "node_modules/postal-mime/dist/postal-mime.js"(exports, module) {
    !function(e3, r2) {
      "object" == typeof exports && "object" == typeof module ? module.exports = r2() : "function" == typeof define && define.amd ? define([], r2) : "object" == typeof exports ? exports.postalMime = r2() : e3.postalMime = r2();
    }(self, () => (() => {
      "use strict";
      var e3 = { d: (r3, t3) => {
        for (var a2 in t3)
          e3.o(t3, a2) && !e3.o(r3, a2) && Object.defineProperty(r3, a2, { enumerable: true, get: t3[a2] });
      }, o: (e4, r3) => Object.prototype.hasOwnProperty.call(e4, r3), r: (e4) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
      } }, r2 = {};
      e3.r(r2), e3.d(r2, { default: () => T });
      const t2 = new TextEncoder(), a = /* @__PURE__ */ new Map(), s3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o3 = new Uint8Array(256);
      for (var i2 = 0; i2 < s3.length; i2++)
        o3[s3.charCodeAt(i2)] = i2;
      function n2(e4) {
        let r3 = 3 * Math.ceil(e4.length / 4);
        const t3 = e4.length;
        let a2 = 0;
        e4.length % 4 == 3 ? r3-- : e4.length % 4 == 2 ? r3 -= 2 : "=" === e4[e4.length - 1] && (r3--, "=" === e4[e4.length - 2] && r3--);
        const s4 = new ArrayBuffer(r3), i3 = new Uint8Array(s4);
        for (let r4 = 0; r4 < t3; r4 += 4) {
          let t4 = o3[e4.charCodeAt(r4)], s5 = o3[e4.charCodeAt(r4 + 1)], n3 = o3[e4.charCodeAt(r4 + 2)], l4 = o3[e4.charCodeAt(r4 + 3)];
          i3[a2++] = t4 << 2 | s5 >> 4, i3[a2++] = (15 & s5) << 4 | n3 >> 2, i3[a2++] = (3 & n3) << 6 | 63 & l4;
        }
        return s4;
      }
      function l3(e4) {
        if (e4 = e4 || "utf8", a.has(e4))
          return a.get(e4);
        let r3;
        try {
          r3 = new TextDecoder(e4);
        } catch (r4) {
          if ("utf8" === e4)
            throw r4;
          return l3();
        }
        return a.set(e4, r3), r3;
      }
      async function c3(e4) {
        if ("arrayBuffer" in e4)
          return await e4.arrayBuffer();
        const r3 = new FileReader();
        return new Promise((t3, a2) => {
          r3.onload = function(e5) {
            t3(e5.target.result);
          }, r3.onerror = function(e5) {
            a2(r3.error);
          }, r3.readAsArrayBuffer(e4);
        });
      }
      function u(e4) {
        return (e4 >= 48 && e4 <= 57 || e4 >= 97 && e4 <= 102 || e4 >= 65 && e4 <= 70) && String.fromCharCode(e4);
      }
      function p2(e4) {
        return (e4 || "").toString().replace(/(=\?([^?]+)\?[Bb]\?[^?]*\?=)\s*(?==\?([^?]+)\?[Bb]\?[^?]*\?=)/g, (e5, r3, t3, a2) => t3 === a2 ? r3 + "__\0JOIN\0__" : e5).replace(/(=\?([^?]+)\?[Qq]\?[^?]*\?=)\s*(?==\?([^?]+)\?[Qq]\?[^?]*\?=)/g, (e5, r3, t3, a2) => t3 === a2 ? r3 + "__\0JOIN\0__" : e5).replace(/(\?=)?__\x00JOIN\x00__(=\?([^?]+)\?[QqBb]\?)?/g, "").replace(/(=\?[^?]+\?[QqBb]\?[^?]*\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]*\?=)/g, "$1").replace(/=\?([\w_\-*]+)\?([QqBb])\?([^?]*)\?=/g, (e5, r3, a2, s4) => function(e6, r4, a3) {
          let s5, o4 = e6.indexOf("*");
          if (o4 >= 0 && (e6 = e6.substr(0, o4)), "Q" === (r4 = r4.toUpperCase())) {
            a3 = a3.replace(/=\s+([0-9a-fA-F])/g, "=$1").replace(/[_\s]/g, " ");
            let e7 = t2.encode(a3), r5 = [];
            for (let t3 = 0, a4 = e7.length; t3 < a4; t3++) {
              let s6 = e7[t3];
              if (t3 <= a4 - 2 && 61 === s6) {
                let a5 = u(e7[t3 + 1]), s7 = u(e7[t3 + 2]);
                if (a5 && s7) {
                  let e8 = parseInt(a5 + s7, 16);
                  r5.push(e8), t3 += 2;
                  continue;
                }
              }
              r5.push(s6);
            }
            s5 = new ArrayBuffer(r5.length);
            let o5 = new DataView(s5);
            for (let e8 = 0, t3 = r5.length; e8 < t3; e8++)
              o5.setUint8(e8, r5[e8]);
          } else
            s5 = "B" === r4 ? n2(a3.replace(/[^a-zA-Z0-9\+\/=]+/g, "")) : t2.encode(a3);
          return l3(e6).decode(s5);
        }(r3, a2, s4));
      }
      class h {
        constructor() {
          this.chunks = [];
        }
        update(e4) {
          this.chunks.push(e4), this.chunks.push("\n");
        }
        finalize() {
          return c3(new Blob(this.chunks, { type: "application/octet-stream" }));
        }
      }
      class d2 {
        constructor(e4) {
          e4 = e4 || {}, this.decoder = e4.decoder || new TextDecoder(), this.maxChunkSize = 102400, this.chunks = [], this.remainder = "";
        }
        update(e4) {
          let r3 = this.decoder.decode(e4);
          if (/[^a-zA-Z0-9+\/]/.test(r3) && (r3 = r3.replace(/[^a-zA-Z0-9+\/]+/g, "")), this.remainder += r3, this.remainder.length >= this.maxChunkSize) {
            let e5, r4 = 4 * Math.floor(this.remainder.length / 4);
            r4 === this.remainder.length ? (e5 = this.remainder, this.remainder = "") : (e5 = this.remainder.substr(0, r4), this.remainder = this.remainder.substr(r4)), e5.length && this.chunks.push(n2(e5));
          }
        }
        finalize() {
          return this.remainder && !/^=+$/.test(this.remainder) && this.chunks.push(n2(this.remainder)), c3(new Blob(this.chunks, { type: "application/octet-stream" }));
        }
      }
      class g {
        constructor(e4) {
          e4 = e4 || {}, this.decoder = e4.decoder || new TextDecoder(), this.maxChunkSize = 102400, this.remainder = "", this.chunks = [];
        }
        decodeQPBytes(e4) {
          let r3 = new ArrayBuffer(e4.length), t3 = new DataView(r3);
          for (let r4 = 0, a2 = e4.length; r4 < a2; r4++)
            t3.setUint8(r4, parseInt(e4[r4], 16));
          return r3;
        }
        decodeChunks(e4) {
          let r3 = (e4 = e4.replace(/=\r?\n/g, "")).split(/(?==)/), t3 = [];
          for (let e5 of r3)
            "=" === e5.charAt(0) ? 3 !== e5.length ? e5.length > 3 && (t3.push(e5.substr(1, 2)), this.chunks.push(this.decodeQPBytes(t3)), t3 = [], e5 = e5.substr(3), this.chunks.push(e5)) : t3.push(e5.substr(1)) : (t3.length && (this.chunks.push(this.decodeQPBytes(t3)), t3 = []), this.chunks.push(e5));
          t3.length && (this.chunks.push(this.decodeQPBytes(t3)), t3 = []);
        }
        update(e4) {
          let r3 = this.decoder.decode(e4) + "\n";
          if (r3 = this.remainder + r3, r3.length < this.maxChunkSize)
            return void (this.remainder = r3);
          this.remainder = "";
          let t3 = r3.match(/=[a-fA-F0-9]?$/);
          if (t3) {
            if (0 === t3.index)
              return void (this.remainder = r3);
            this.remainder = r3.substr(t3.index), r3 = r3.substr(0, t3.index);
          }
          this.decodeChunks(r3);
        }
        finalize() {
          return this.remainder.length && (this.decodeChunks(this.remainder), this.remainder = ""), c3(new Blob(this.chunks, { type: "application/octet-stream" }));
        }
      }
      class m {
        constructor(e4) {
          e4 = e4 || {}, this.postalMime = e4.postalMime, this.root = !!e4.parentNode, this.childNodes = [], e4.parentNode && e4.parentNode.childNodes.push(this), this.state = "header", this.headerLines = [], this.decoders = /* @__PURE__ */ new Map(), this.contentType = { value: "text/plain", default: true }, this.contentTransferEncoding = { value: "8bit" }, this.contentDisposition = { value: "" }, this.headers = [], this.contentDecoder = false;
        }
        setupContentDecoder(e4) {
          /base64/i.test(e4) ? this.contentDecoder = new d2() : /quoted-printable/i.test(e4) ? this.contentDecoder = new g({ decoder: l3(this.contentType.parsed.params.charset) }) : this.contentDecoder = new h();
        }
        async finalize() {
          if ("finished" === this.state)
            return;
          "header" === this.state && this.processHeaders();
          let e4 = this.postalMime.boundaries;
          for (let r3 = e4.length - 1; r3 >= 0; r3--)
            if (e4[r3].node === this) {
              e4.splice(r3, 1);
              break;
            }
          await this.finalizeChildNodes(), this.content = this.contentDecoder ? await this.contentDecoder.finalize() : null, this.state = "finished";
        }
        async finalizeChildNodes() {
          for (let e4 of this.childNodes)
            await e4.finalize();
        }
        parseStructuredHeader(e4) {
          let r3, a2 = { value: false, params: {} }, s4 = false, o4 = "", i3 = "value", n3 = false, c4 = false;
          for (let t3 = 0, l4 = e4.length; t3 < l4; t3++)
            switch (r3 = e4.charAt(t3), i3) {
              case "key":
                if ("=" === r3) {
                  s4 = o4.trim().toLowerCase(), i3 = "value", o4 = "";
                  break;
                }
                o4 += r3;
                break;
              case "value":
                if (c4)
                  o4 += r3;
                else {
                  if ("\\" === r3) {
                    c4 = true;
                    continue;
                  }
                  n3 && r3 === n3 ? n3 = false : n3 || '"' !== r3 ? n3 || ";" !== r3 ? o4 += r3 : (false === s4 ? a2.value = o4.trim() : a2.params[s4] = o4.trim(), i3 = "key", o4 = "") : n3 = r3;
                }
                c4 = false;
            }
          return o4 = o4.trim(), "value" === i3 ? false === s4 ? a2.value = o4 : a2.params[s4] = o4 : o4 && (a2.params[o4.toLowerCase()] = ""), a2.value && (a2.value = a2.value.toLowerCase()), function(e5) {
            let r4 = /* @__PURE__ */ new Map();
            Object.keys(e5.params).forEach((t3) => {
              let a3 = t3.match(/\*((\d+)\*?)?$/);
              if (!a3)
                return;
              let s5, o5 = t3.substr(0, a3.index).toLowerCase(), i4 = Number(a3[2]) || 0;
              r4.has(o5) ? s5 = r4.get(o5) : (s5 = { charset: false, values: [] }, r4.set(o5, s5));
              let n4 = e5.params[t3];
              0 === i4 && "*" === a3[0].charAt(a3[0].length - 1) && (a3 = n4.match(/^([^']*)'[^']*'(.*)$/)) && (s5.charset = a3[1] || "utf-8", n4 = a3[2]), s5.values.push({ nr: i4, value: n4 }), delete e5.params[t3];
            }), r4.forEach((r5, a3) => {
              e5.params[a3] = function(e6, r6) {
                r6 = r6 || "utf-8";
                let a4 = [];
                for (let r7 = 0; r7 < e6.length; r7++) {
                  let s6 = e6.charAt(r7);
                  if ("%" === s6 && /^[a-f0-9]{2}/i.test(e6.substr(r7 + 1, 2))) {
                    let t3 = e6.substr(r7 + 1, 2);
                    r7 += 2, a4.push(parseInt(t3, 16));
                  } else if (s6.charCodeAt(0) > 126) {
                    s6 = t2.encode(s6);
                    for (let e7 = 0; e7 < s6.length; e7++)
                      a4.push(s6[e7]);
                  } else
                    a4.push(s6.charCodeAt(0));
                }
                const s5 = new ArrayBuffer(a4.length), o5 = new DataView(s5);
                for (let e7 = 0, r7 = a4.length; e7 < r7; e7++)
                  o5.setUint8(e7, a4[e7]);
                return l3(r6).decode(s5);
              }(r5.values.sort((e6, r6) => e6.nr - r6.nr).map((e6) => e6.value).join(""), r5.charset);
            });
          }(a2), a2;
        }
        decodeFlowedText(e4, r3) {
          return e4.split(/\r?\n/).reduce((e5, t3) => / $/.test(e5) && !/(^|\n)-- $/.test(e5) ? r3 ? e5.slice(0, -1) + t3 : e5 + t3 : e5 + "\n" + t3).replace(/^ /gm, "");
        }
        getTextContent() {
          if (!this.content)
            return "";
          let e4 = l3(this.contentType.parsed.params.charset).decode(this.content);
          return /^flowed$/i.test(this.contentType.parsed.params.format) && (e4 = this.decodeFlowedText(e4, /^yes$/i.test(this.contentType.parsed.params.delsp))), e4;
        }
        processHeaders() {
          for (let e4 = this.headerLines.length - 1; e4 >= 0; e4--) {
            let r3 = this.headerLines[e4];
            if (e4 && /^\s/.test(r3))
              this.headerLines[e4 - 1] += "\n" + r3, this.headerLines.splice(e4, 1);
            else {
              r3 = r3.replace(/\s+/g, " ");
              let e5 = r3.indexOf(":"), t3 = e5 < 0 ? r3.trim() : r3.substr(0, e5).trim(), a2 = e5 < 0 ? "" : r3.substr(e5 + 1).trim();
              switch (this.headers.push({ key: t3.toLowerCase(), originalKey: t3, value: a2 }), t3.toLowerCase()) {
                case "content-type":
                  this.contentType.default && (this.contentType = { value: a2, parsed: {} });
                  break;
                case "content-transfer-encoding":
                  this.contentTransferEncoding = { value: a2, parsed: {} };
                  break;
                case "content-disposition":
                  this.contentDisposition = { value: a2, parsed: {} };
                  break;
                case "content-id":
                  this.contentId = a2;
              }
            }
          }
          this.contentType.parsed = this.parseStructuredHeader(this.contentType.value), this.contentType.multipart = !!/^multipart\//i.test(this.contentType.parsed.value) && this.contentType.parsed.value.substr(this.contentType.parsed.value.indexOf("/") + 1), this.contentType.multipart && this.contentType.parsed.params.boundary && this.postalMime.boundaries.push({ value: t2.encode(this.contentType.parsed.params.boundary), node: this }), this.contentDisposition.parsed = this.parseStructuredHeader(this.contentDisposition.value), this.contentTransferEncoding.encoding = this.contentTransferEncoding.value.toLowerCase().split(/[^\w-]/).shift(), this.setupContentDecoder(this.contentTransferEncoding.encoding);
        }
        feed(e4) {
          switch (this.state) {
            case "header":
              if (!e4.length)
                return this.state = "body", this.processHeaders();
              this.headerLines.push(l3().decode(e4));
              break;
            case "body":
              this.contentDecoder.update(e4);
          }
        }
      }
      const f = { "&AElig": "\xC6", "&AElig;": "\xC6", "&AMP": "&", "&AMP;": "&", "&Aacute": "\xC1", "&Aacute;": "\xC1", "&Abreve;": "\u0102", "&Acirc": "\xC2", "&Acirc;": "\xC2", "&Acy;": "\u0410", "&Afr;": "\u{1D504}", "&Agrave": "\xC0", "&Agrave;": "\xC0", "&Alpha;": "\u0391", "&Amacr;": "\u0100", "&And;": "\u2A53", "&Aogon;": "\u0104", "&Aopf;": "\u{1D538}", "&ApplyFunction;": "\u2061", "&Aring": "\xC5", "&Aring;": "\xC5", "&Ascr;": "\u{1D49C}", "&Assign;": "\u2254", "&Atilde": "\xC3", "&Atilde;": "\xC3", "&Auml": "\xC4", "&Auml;": "\xC4", "&Backslash;": "\u2216", "&Barv;": "\u2AE7", "&Barwed;": "\u2306", "&Bcy;": "\u0411", "&Because;": "\u2235", "&Bernoullis;": "\u212C", "&Beta;": "\u0392", "&Bfr;": "\u{1D505}", "&Bopf;": "\u{1D539}", "&Breve;": "\u02D8", "&Bscr;": "\u212C", "&Bumpeq;": "\u224E", "&CHcy;": "\u0427", "&COPY": "\xA9", "&COPY;": "\xA9", "&Cacute;": "\u0106", "&Cap;": "\u22D2", "&CapitalDifferentialD;": "\u2145", "&Cayleys;": "\u212D", "&Ccaron;": "\u010C", "&Ccedil": "\xC7", "&Ccedil;": "\xC7", "&Ccirc;": "\u0108", "&Cconint;": "\u2230", "&Cdot;": "\u010A", "&Cedilla;": "\xB8", "&CenterDot;": "\xB7", "&Cfr;": "\u212D", "&Chi;": "\u03A7", "&CircleDot;": "\u2299", "&CircleMinus;": "\u2296", "&CirclePlus;": "\u2295", "&CircleTimes;": "\u2297", "&ClockwiseContourIntegral;": "\u2232", "&CloseCurlyDoubleQuote;": "\u201D", "&CloseCurlyQuote;": "\u2019", "&Colon;": "\u2237", "&Colone;": "\u2A74", "&Congruent;": "\u2261", "&Conint;": "\u222F", "&ContourIntegral;": "\u222E", "&Copf;": "\u2102", "&Coproduct;": "\u2210", "&CounterClockwiseContourIntegral;": "\u2233", "&Cross;": "\u2A2F", "&Cscr;": "\u{1D49E}", "&Cup;": "\u22D3", "&CupCap;": "\u224D", "&DD;": "\u2145", "&DDotrahd;": "\u2911", "&DJcy;": "\u0402", "&DScy;": "\u0405", "&DZcy;": "\u040F", "&Dagger;": "\u2021", "&Darr;": "\u21A1", "&Dashv;": "\u2AE4", "&Dcaron;": "\u010E", "&Dcy;": "\u0414", "&Del;": "\u2207", "&Delta;": "\u0394", "&Dfr;": "\u{1D507}", "&DiacriticalAcute;": "\xB4", "&DiacriticalDot;": "\u02D9", "&DiacriticalDoubleAcute;": "\u02DD", "&DiacriticalGrave;": "`", "&DiacriticalTilde;": "\u02DC", "&Diamond;": "\u22C4", "&DifferentialD;": "\u2146", "&Dopf;": "\u{1D53B}", "&Dot;": "\xA8", "&DotDot;": "\u20DC", "&DotEqual;": "\u2250", "&DoubleContourIntegral;": "\u222F", "&DoubleDot;": "\xA8", "&DoubleDownArrow;": "\u21D3", "&DoubleLeftArrow;": "\u21D0", "&DoubleLeftRightArrow;": "\u21D4", "&DoubleLeftTee;": "\u2AE4", "&DoubleLongLeftArrow;": "\u27F8", "&DoubleLongLeftRightArrow;": "\u27FA", "&DoubleLongRightArrow;": "\u27F9", "&DoubleRightArrow;": "\u21D2", "&DoubleRightTee;": "\u22A8", "&DoubleUpArrow;": "\u21D1", "&DoubleUpDownArrow;": "\u21D5", "&DoubleVerticalBar;": "\u2225", "&DownArrow;": "\u2193", "&DownArrowBar;": "\u2913", "&DownArrowUpArrow;": "\u21F5", "&DownBreve;": "\u0311", "&DownLeftRightVector;": "\u2950", "&DownLeftTeeVector;": "\u295E", "&DownLeftVector;": "\u21BD", "&DownLeftVectorBar;": "\u2956", "&DownRightTeeVector;": "\u295F", "&DownRightVector;": "\u21C1", "&DownRightVectorBar;": "\u2957", "&DownTee;": "\u22A4", "&DownTeeArrow;": "\u21A7", "&Downarrow;": "\u21D3", "&Dscr;": "\u{1D49F}", "&Dstrok;": "\u0110", "&ENG;": "\u014A", "&ETH": "\xD0", "&ETH;": "\xD0", "&Eacute": "\xC9", "&Eacute;": "\xC9", "&Ecaron;": "\u011A", "&Ecirc": "\xCA", "&Ecirc;": "\xCA", "&Ecy;": "\u042D", "&Edot;": "\u0116", "&Efr;": "\u{1D508}", "&Egrave": "\xC8", "&Egrave;": "\xC8", "&Element;": "\u2208", "&Emacr;": "\u0112", "&EmptySmallSquare;": "\u25FB", "&EmptyVerySmallSquare;": "\u25AB", "&Eogon;": "\u0118", "&Eopf;": "\u{1D53C}", "&Epsilon;": "\u0395", "&Equal;": "\u2A75", "&EqualTilde;": "\u2242", "&Equilibrium;": "\u21CC", "&Escr;": "\u2130", "&Esim;": "\u2A73", "&Eta;": "\u0397", "&Euml": "\xCB", "&Euml;": "\xCB", "&Exists;": "\u2203", "&ExponentialE;": "\u2147", "&Fcy;": "\u0424", "&Ffr;": "\u{1D509}", "&FilledSmallSquare;": "\u25FC", "&FilledVerySmallSquare;": "\u25AA", "&Fopf;": "\u{1D53D}", "&ForAll;": "\u2200", "&Fouriertrf;": "\u2131", "&Fscr;": "\u2131", "&GJcy;": "\u0403", "&GT": ">", "&GT;": ">", "&Gamma;": "\u0393", "&Gammad;": "\u03DC", "&Gbreve;": "\u011E", "&Gcedil;": "\u0122", "&Gcirc;": "\u011C", "&Gcy;": "\u0413", "&Gdot;": "\u0120", "&Gfr;": "\u{1D50A}", "&Gg;": "\u22D9", "&Gopf;": "\u{1D53E}", "&GreaterEqual;": "\u2265", "&GreaterEqualLess;": "\u22DB", "&GreaterFullEqual;": "\u2267", "&GreaterGreater;": "\u2AA2", "&GreaterLess;": "\u2277", "&GreaterSlantEqual;": "\u2A7E", "&GreaterTilde;": "\u2273", "&Gscr;": "\u{1D4A2}", "&Gt;": "\u226B", "&HARDcy;": "\u042A", "&Hacek;": "\u02C7", "&Hat;": "^", "&Hcirc;": "\u0124", "&Hfr;": "\u210C", "&HilbertSpace;": "\u210B", "&Hopf;": "\u210D", "&HorizontalLine;": "\u2500", "&Hscr;": "\u210B", "&Hstrok;": "\u0126", "&HumpDownHump;": "\u224E", "&HumpEqual;": "\u224F", "&IEcy;": "\u0415", "&IJlig;": "\u0132", "&IOcy;": "\u0401", "&Iacute": "\xCD", "&Iacute;": "\xCD", "&Icirc": "\xCE", "&Icirc;": "\xCE", "&Icy;": "\u0418", "&Idot;": "\u0130", "&Ifr;": "\u2111", "&Igrave": "\xCC", "&Igrave;": "\xCC", "&Im;": "\u2111", "&Imacr;": "\u012A", "&ImaginaryI;": "\u2148", "&Implies;": "\u21D2", "&Int;": "\u222C", "&Integral;": "\u222B", "&Intersection;": "\u22C2", "&InvisibleComma;": "\u2063", "&InvisibleTimes;": "\u2062", "&Iogon;": "\u012E", "&Iopf;": "\u{1D540}", "&Iota;": "\u0399", "&Iscr;": "\u2110", "&Itilde;": "\u0128", "&Iukcy;": "\u0406", "&Iuml": "\xCF", "&Iuml;": "\xCF", "&Jcirc;": "\u0134", "&Jcy;": "\u0419", "&Jfr;": "\u{1D50D}", "&Jopf;": "\u{1D541}", "&Jscr;": "\u{1D4A5}", "&Jsercy;": "\u0408", "&Jukcy;": "\u0404", "&KHcy;": "\u0425", "&KJcy;": "\u040C", "&Kappa;": "\u039A", "&Kcedil;": "\u0136", "&Kcy;": "\u041A", "&Kfr;": "\u{1D50E}", "&Kopf;": "\u{1D542}", "&Kscr;": "\u{1D4A6}", "&LJcy;": "\u0409", "&LT": "<", "&LT;": "<", "&Lacute;": "\u0139", "&Lambda;": "\u039B", "&Lang;": "\u27EA", "&Laplacetrf;": "\u2112", "&Larr;": "\u219E", "&Lcaron;": "\u013D", "&Lcedil;": "\u013B", "&Lcy;": "\u041B", "&LeftAngleBracket;": "\u27E8", "&LeftArrow;": "\u2190", "&LeftArrowBar;": "\u21E4", "&LeftArrowRightArrow;": "\u21C6", "&LeftCeiling;": "\u2308", "&LeftDoubleBracket;": "\u27E6", "&LeftDownTeeVector;": "\u2961", "&LeftDownVector;": "\u21C3", "&LeftDownVectorBar;": "\u2959", "&LeftFloor;": "\u230A", "&LeftRightArrow;": "\u2194", "&LeftRightVector;": "\u294E", "&LeftTee;": "\u22A3", "&LeftTeeArrow;": "\u21A4", "&LeftTeeVector;": "\u295A", "&LeftTriangle;": "\u22B2", "&LeftTriangleBar;": "\u29CF", "&LeftTriangleEqual;": "\u22B4", "&LeftUpDownVector;": "\u2951", "&LeftUpTeeVector;": "\u2960", "&LeftUpVector;": "\u21BF", "&LeftUpVectorBar;": "\u2958", "&LeftVector;": "\u21BC", "&LeftVectorBar;": "\u2952", "&Leftarrow;": "\u21D0", "&Leftrightarrow;": "\u21D4", "&LessEqualGreater;": "\u22DA", "&LessFullEqual;": "\u2266", "&LessGreater;": "\u2276", "&LessLess;": "\u2AA1", "&LessSlantEqual;": "\u2A7D", "&LessTilde;": "\u2272", "&Lfr;": "\u{1D50F}", "&Ll;": "\u22D8", "&Lleftarrow;": "\u21DA", "&Lmidot;": "\u013F", "&LongLeftArrow;": "\u27F5", "&LongLeftRightArrow;": "\u27F7", "&LongRightArrow;": "\u27F6", "&Longleftarrow;": "\u27F8", "&Longleftrightarrow;": "\u27FA", "&Longrightarrow;": "\u27F9", "&Lopf;": "\u{1D543}", "&LowerLeftArrow;": "\u2199", "&LowerRightArrow;": "\u2198", "&Lscr;": "\u2112", "&Lsh;": "\u21B0", "&Lstrok;": "\u0141", "&Lt;": "\u226A", "&Map;": "\u2905", "&Mcy;": "\u041C", "&MediumSpace;": "\u205F", "&Mellintrf;": "\u2133", "&Mfr;": "\u{1D510}", "&MinusPlus;": "\u2213", "&Mopf;": "\u{1D544}", "&Mscr;": "\u2133", "&Mu;": "\u039C", "&NJcy;": "\u040A", "&Nacute;": "\u0143", "&Ncaron;": "\u0147", "&Ncedil;": "\u0145", "&Ncy;": "\u041D", "&NegativeMediumSpace;": "\u200B", "&NegativeThickSpace;": "\u200B", "&NegativeThinSpace;": "\u200B", "&NegativeVeryThinSpace;": "\u200B", "&NestedGreaterGreater;": "\u226B", "&NestedLessLess;": "\u226A", "&NewLine;": "\n", "&Nfr;": "\u{1D511}", "&NoBreak;": "\u2060", "&NonBreakingSpace;": "\xA0", "&Nopf;": "\u2115", "&Not;": "\u2AEC", "&NotCongruent;": "\u2262", "&NotCupCap;": "\u226D", "&NotDoubleVerticalBar;": "\u2226", "&NotElement;": "\u2209", "&NotEqual;": "\u2260", "&NotEqualTilde;": "\u2242\u0338", "&NotExists;": "\u2204", "&NotGreater;": "\u226F", "&NotGreaterEqual;": "\u2271", "&NotGreaterFullEqual;": "\u2267\u0338", "&NotGreaterGreater;": "\u226B\u0338", "&NotGreaterLess;": "\u2279", "&NotGreaterSlantEqual;": "\u2A7E\u0338", "&NotGreaterTilde;": "\u2275", "&NotHumpDownHump;": "\u224E\u0338", "&NotHumpEqual;": "\u224F\u0338", "&NotLeftTriangle;": "\u22EA", "&NotLeftTriangleBar;": "\u29CF\u0338", "&NotLeftTriangleEqual;": "\u22EC", "&NotLess;": "\u226E", "&NotLessEqual;": "\u2270", "&NotLessGreater;": "\u2278", "&NotLessLess;": "\u226A\u0338", "&NotLessSlantEqual;": "\u2A7D\u0338", "&NotLessTilde;": "\u2274", "&NotNestedGreaterGreater;": "\u2AA2\u0338", "&NotNestedLessLess;": "\u2AA1\u0338", "&NotPrecedes;": "\u2280", "&NotPrecedesEqual;": "\u2AAF\u0338", "&NotPrecedesSlantEqual;": "\u22E0", "&NotReverseElement;": "\u220C", "&NotRightTriangle;": "\u22EB", "&NotRightTriangleBar;": "\u29D0\u0338", "&NotRightTriangleEqual;": "\u22ED", "&NotSquareSubset;": "\u228F\u0338", "&NotSquareSubsetEqual;": "\u22E2", "&NotSquareSuperset;": "\u2290\u0338", "&NotSquareSupersetEqual;": "\u22E3", "&NotSubset;": "\u2282\u20D2", "&NotSubsetEqual;": "\u2288", "&NotSucceeds;": "\u2281", "&NotSucceedsEqual;": "\u2AB0\u0338", "&NotSucceedsSlantEqual;": "\u22E1", "&NotSucceedsTilde;": "\u227F\u0338", "&NotSuperset;": "\u2283\u20D2", "&NotSupersetEqual;": "\u2289", "&NotTilde;": "\u2241", "&NotTildeEqual;": "\u2244", "&NotTildeFullEqual;": "\u2247", "&NotTildeTilde;": "\u2249", "&NotVerticalBar;": "\u2224", "&Nscr;": "\u{1D4A9}", "&Ntilde": "\xD1", "&Ntilde;": "\xD1", "&Nu;": "\u039D", "&OElig;": "\u0152", "&Oacute": "\xD3", "&Oacute;": "\xD3", "&Ocirc": "\xD4", "&Ocirc;": "\xD4", "&Ocy;": "\u041E", "&Odblac;": "\u0150", "&Ofr;": "\u{1D512}", "&Ograve": "\xD2", "&Ograve;": "\xD2", "&Omacr;": "\u014C", "&Omega;": "\u03A9", "&Omicron;": "\u039F", "&Oopf;": "\u{1D546}", "&OpenCurlyDoubleQuote;": "\u201C", "&OpenCurlyQuote;": "\u2018", "&Or;": "\u2A54", "&Oscr;": "\u{1D4AA}", "&Oslash": "\xD8", "&Oslash;": "\xD8", "&Otilde": "\xD5", "&Otilde;": "\xD5", "&Otimes;": "\u2A37", "&Ouml": "\xD6", "&Ouml;": "\xD6", "&OverBar;": "\u203E", "&OverBrace;": "\u23DE", "&OverBracket;": "\u23B4", "&OverParenthesis;": "\u23DC", "&PartialD;": "\u2202", "&Pcy;": "\u041F", "&Pfr;": "\u{1D513}", "&Phi;": "\u03A6", "&Pi;": "\u03A0", "&PlusMinus;": "\xB1", "&Poincareplane;": "\u210C", "&Popf;": "\u2119", "&Pr;": "\u2ABB", "&Precedes;": "\u227A", "&PrecedesEqual;": "\u2AAF", "&PrecedesSlantEqual;": "\u227C", "&PrecedesTilde;": "\u227E", "&Prime;": "\u2033", "&Product;": "\u220F", "&Proportion;": "\u2237", "&Proportional;": "\u221D", "&Pscr;": "\u{1D4AB}", "&Psi;": "\u03A8", "&QUOT": '"', "&QUOT;": '"', "&Qfr;": "\u{1D514}", "&Qopf;": "\u211A", "&Qscr;": "\u{1D4AC}", "&RBarr;": "\u2910", "&REG": "\xAE", "&REG;": "\xAE", "&Racute;": "\u0154", "&Rang;": "\u27EB", "&Rarr;": "\u21A0", "&Rarrtl;": "\u2916", "&Rcaron;": "\u0158", "&Rcedil;": "\u0156", "&Rcy;": "\u0420", "&Re;": "\u211C", "&ReverseElement;": "\u220B", "&ReverseEquilibrium;": "\u21CB", "&ReverseUpEquilibrium;": "\u296F", "&Rfr;": "\u211C", "&Rho;": "\u03A1", "&RightAngleBracket;": "\u27E9", "&RightArrow;": "\u2192", "&RightArrowBar;": "\u21E5", "&RightArrowLeftArrow;": "\u21C4", "&RightCeiling;": "\u2309", "&RightDoubleBracket;": "\u27E7", "&RightDownTeeVector;": "\u295D", "&RightDownVector;": "\u21C2", "&RightDownVectorBar;": "\u2955", "&RightFloor;": "\u230B", "&RightTee;": "\u22A2", "&RightTeeArrow;": "\u21A6", "&RightTeeVector;": "\u295B", "&RightTriangle;": "\u22B3", "&RightTriangleBar;": "\u29D0", "&RightTriangleEqual;": "\u22B5", "&RightUpDownVector;": "\u294F", "&RightUpTeeVector;": "\u295C", "&RightUpVector;": "\u21BE", "&RightUpVectorBar;": "\u2954", "&RightVector;": "\u21C0", "&RightVectorBar;": "\u2953", "&Rightarrow;": "\u21D2", "&Ropf;": "\u211D", "&RoundImplies;": "\u2970", "&Rrightarrow;": "\u21DB", "&Rscr;": "\u211B", "&Rsh;": "\u21B1", "&RuleDelayed;": "\u29F4", "&SHCHcy;": "\u0429", "&SHcy;": "\u0428", "&SOFTcy;": "\u042C", "&Sacute;": "\u015A", "&Sc;": "\u2ABC", "&Scaron;": "\u0160", "&Scedil;": "\u015E", "&Scirc;": "\u015C", "&Scy;": "\u0421", "&Sfr;": "\u{1D516}", "&ShortDownArrow;": "\u2193", "&ShortLeftArrow;": "\u2190", "&ShortRightArrow;": "\u2192", "&ShortUpArrow;": "\u2191", "&Sigma;": "\u03A3", "&SmallCircle;": "\u2218", "&Sopf;": "\u{1D54A}", "&Sqrt;": "\u221A", "&Square;": "\u25A1", "&SquareIntersection;": "\u2293", "&SquareSubset;": "\u228F", "&SquareSubsetEqual;": "\u2291", "&SquareSuperset;": "\u2290", "&SquareSupersetEqual;": "\u2292", "&SquareUnion;": "\u2294", "&Sscr;": "\u{1D4AE}", "&Star;": "\u22C6", "&Sub;": "\u22D0", "&Subset;": "\u22D0", "&SubsetEqual;": "\u2286", "&Succeeds;": "\u227B", "&SucceedsEqual;": "\u2AB0", "&SucceedsSlantEqual;": "\u227D", "&SucceedsTilde;": "\u227F", "&SuchThat;": "\u220B", "&Sum;": "\u2211", "&Sup;": "\u22D1", "&Superset;": "\u2283", "&SupersetEqual;": "\u2287", "&Supset;": "\u22D1", "&THORN": "\xDE", "&THORN;": "\xDE", "&TRADE;": "\u2122", "&TSHcy;": "\u040B", "&TScy;": "\u0426", "&Tab;": "	", "&Tau;": "\u03A4", "&Tcaron;": "\u0164", "&Tcedil;": "\u0162", "&Tcy;": "\u0422", "&Tfr;": "\u{1D517}", "&Therefore;": "\u2234", "&Theta;": "\u0398", "&ThickSpace;": "\u205F\u200A", "&ThinSpace;": "\u2009", "&Tilde;": "\u223C", "&TildeEqual;": "\u2243", "&TildeFullEqual;": "\u2245", "&TildeTilde;": "\u2248", "&Topf;": "\u{1D54B}", "&TripleDot;": "\u20DB", "&Tscr;": "\u{1D4AF}", "&Tstrok;": "\u0166", "&Uacute": "\xDA", "&Uacute;": "\xDA", "&Uarr;": "\u219F", "&Uarrocir;": "\u2949", "&Ubrcy;": "\u040E", "&Ubreve;": "\u016C", "&Ucirc": "\xDB", "&Ucirc;": "\xDB", "&Ucy;": "\u0423", "&Udblac;": "\u0170", "&Ufr;": "\u{1D518}", "&Ugrave": "\xD9", "&Ugrave;": "\xD9", "&Umacr;": "\u016A", "&UnderBar;": "_", "&UnderBrace;": "\u23DF", "&UnderBracket;": "\u23B5", "&UnderParenthesis;": "\u23DD", "&Union;": "\u22C3", "&UnionPlus;": "\u228E", "&Uogon;": "\u0172", "&Uopf;": "\u{1D54C}", "&UpArrow;": "\u2191", "&UpArrowBar;": "\u2912", "&UpArrowDownArrow;": "\u21C5", "&UpDownArrow;": "\u2195", "&UpEquilibrium;": "\u296E", "&UpTee;": "\u22A5", "&UpTeeArrow;": "\u21A5", "&Uparrow;": "\u21D1", "&Updownarrow;": "\u21D5", "&UpperLeftArrow;": "\u2196", "&UpperRightArrow;": "\u2197", "&Upsi;": "\u03D2", "&Upsilon;": "\u03A5", "&Uring;": "\u016E", "&Uscr;": "\u{1D4B0}", "&Utilde;": "\u0168", "&Uuml": "\xDC", "&Uuml;": "\xDC", "&VDash;": "\u22AB", "&Vbar;": "\u2AEB", "&Vcy;": "\u0412", "&Vdash;": "\u22A9", "&Vdashl;": "\u2AE6", "&Vee;": "\u22C1", "&Verbar;": "\u2016", "&Vert;": "\u2016", "&VerticalBar;": "\u2223", "&VerticalLine;": "|", "&VerticalSeparator;": "\u2758", "&VerticalTilde;": "\u2240", "&VeryThinSpace;": "\u200A", "&Vfr;": "\u{1D519}", "&Vopf;": "\u{1D54D}", "&Vscr;": "\u{1D4B1}", "&Vvdash;": "\u22AA", "&Wcirc;": "\u0174", "&Wedge;": "\u22C0", "&Wfr;": "\u{1D51A}", "&Wopf;": "\u{1D54E}", "&Wscr;": "\u{1D4B2}", "&Xfr;": "\u{1D51B}", "&Xi;": "\u039E", "&Xopf;": "\u{1D54F}", "&Xscr;": "\u{1D4B3}", "&YAcy;": "\u042F", "&YIcy;": "\u0407", "&YUcy;": "\u042E", "&Yacute": "\xDD", "&Yacute;": "\xDD", "&Ycirc;": "\u0176", "&Ycy;": "\u042B", "&Yfr;": "\u{1D51C}", "&Yopf;": "\u{1D550}", "&Yscr;": "\u{1D4B4}", "&Yuml;": "\u0178", "&ZHcy;": "\u0416", "&Zacute;": "\u0179", "&Zcaron;": "\u017D", "&Zcy;": "\u0417", "&Zdot;": "\u017B", "&ZeroWidthSpace;": "\u200B", "&Zeta;": "\u0396", "&Zfr;": "\u2128", "&Zopf;": "\u2124", "&Zscr;": "\u{1D4B5}", "&aacute": "\xE1", "&aacute;": "\xE1", "&abreve;": "\u0103", "&ac;": "\u223E", "&acE;": "\u223E\u0333", "&acd;": "\u223F", "&acirc": "\xE2", "&acirc;": "\xE2", "&acute": "\xB4", "&acute;": "\xB4", "&acy;": "\u0430", "&aelig": "\xE6", "&aelig;": "\xE6", "&af;": "\u2061", "&afr;": "\u{1D51E}", "&agrave": "\xE0", "&agrave;": "\xE0", "&alefsym;": "\u2135", "&aleph;": "\u2135", "&alpha;": "\u03B1", "&amacr;": "\u0101", "&amalg;": "\u2A3F", "&amp": "&", "&amp;": "&", "&and;": "\u2227", "&andand;": "\u2A55", "&andd;": "\u2A5C", "&andslope;": "\u2A58", "&andv;": "\u2A5A", "&ang;": "\u2220", "&ange;": "\u29A4", "&angle;": "\u2220", "&angmsd;": "\u2221", "&angmsdaa;": "\u29A8", "&angmsdab;": "\u29A9", "&angmsdac;": "\u29AA", "&angmsdad;": "\u29AB", "&angmsdae;": "\u29AC", "&angmsdaf;": "\u29AD", "&angmsdag;": "\u29AE", "&angmsdah;": "\u29AF", "&angrt;": "\u221F", "&angrtvb;": "\u22BE", "&angrtvbd;": "\u299D", "&angsph;": "\u2222", "&angst;": "\xC5", "&angzarr;": "\u237C", "&aogon;": "\u0105", "&aopf;": "\u{1D552}", "&ap;": "\u2248", "&apE;": "\u2A70", "&apacir;": "\u2A6F", "&ape;": "\u224A", "&apid;": "\u224B", "&apos;": "'", "&approx;": "\u2248", "&approxeq;": "\u224A", "&aring": "\xE5", "&aring;": "\xE5", "&ascr;": "\u{1D4B6}", "&ast;": "*", "&asymp;": "\u2248", "&asympeq;": "\u224D", "&atilde": "\xE3", "&atilde;": "\xE3", "&auml": "\xE4", "&auml;": "\xE4", "&awconint;": "\u2233", "&awint;": "\u2A11", "&bNot;": "\u2AED", "&backcong;": "\u224C", "&backepsilon;": "\u03F6", "&backprime;": "\u2035", "&backsim;": "\u223D", "&backsimeq;": "\u22CD", "&barvee;": "\u22BD", "&barwed;": "\u2305", "&barwedge;": "\u2305", "&bbrk;": "\u23B5", "&bbrktbrk;": "\u23B6", "&bcong;": "\u224C", "&bcy;": "\u0431", "&bdquo;": "\u201E", "&becaus;": "\u2235", "&because;": "\u2235", "&bemptyv;": "\u29B0", "&bepsi;": "\u03F6", "&bernou;": "\u212C", "&beta;": "\u03B2", "&beth;": "\u2136", "&between;": "\u226C", "&bfr;": "\u{1D51F}", "&bigcap;": "\u22C2", "&bigcirc;": "\u25EF", "&bigcup;": "\u22C3", "&bigodot;": "\u2A00", "&bigoplus;": "\u2A01", "&bigotimes;": "\u2A02", "&bigsqcup;": "\u2A06", "&bigstar;": "\u2605", "&bigtriangledown;": "\u25BD", "&bigtriangleup;": "\u25B3", "&biguplus;": "\u2A04", "&bigvee;": "\u22C1", "&bigwedge;": "\u22C0", "&bkarow;": "\u290D", "&blacklozenge;": "\u29EB", "&blacksquare;": "\u25AA", "&blacktriangle;": "\u25B4", "&blacktriangledown;": "\u25BE", "&blacktriangleleft;": "\u25C2", "&blacktriangleright;": "\u25B8", "&blank;": "\u2423", "&blk12;": "\u2592", "&blk14;": "\u2591", "&blk34;": "\u2593", "&block;": "\u2588", "&bne;": "=\u20E5", "&bnequiv;": "\u2261\u20E5", "&bnot;": "\u2310", "&bopf;": "\u{1D553}", "&bot;": "\u22A5", "&bottom;": "\u22A5", "&bowtie;": "\u22C8", "&boxDL;": "\u2557", "&boxDR;": "\u2554", "&boxDl;": "\u2556", "&boxDr;": "\u2553", "&boxH;": "\u2550", "&boxHD;": "\u2566", "&boxHU;": "\u2569", "&boxHd;": "\u2564", "&boxHu;": "\u2567", "&boxUL;": "\u255D", "&boxUR;": "\u255A", "&boxUl;": "\u255C", "&boxUr;": "\u2559", "&boxV;": "\u2551", "&boxVH;": "\u256C", "&boxVL;": "\u2563", "&boxVR;": "\u2560", "&boxVh;": "\u256B", "&boxVl;": "\u2562", "&boxVr;": "\u255F", "&boxbox;": "\u29C9", "&boxdL;": "\u2555", "&boxdR;": "\u2552", "&boxdl;": "\u2510", "&boxdr;": "\u250C", "&boxh;": "\u2500", "&boxhD;": "\u2565", "&boxhU;": "\u2568", "&boxhd;": "\u252C", "&boxhu;": "\u2534", "&boxminus;": "\u229F", "&boxplus;": "\u229E", "&boxtimes;": "\u22A0", "&boxuL;": "\u255B", "&boxuR;": "\u2558", "&boxul;": "\u2518", "&boxur;": "\u2514", "&boxv;": "\u2502", "&boxvH;": "\u256A", "&boxvL;": "\u2561", "&boxvR;": "\u255E", "&boxvh;": "\u253C", "&boxvl;": "\u2524", "&boxvr;": "\u251C", "&bprime;": "\u2035", "&breve;": "\u02D8", "&brvbar": "\xA6", "&brvbar;": "\xA6", "&bscr;": "\u{1D4B7}", "&bsemi;": "\u204F", "&bsim;": "\u223D", "&bsime;": "\u22CD", "&bsol;": "\\", "&bsolb;": "\u29C5", "&bsolhsub;": "\u27C8", "&bull;": "\u2022", "&bullet;": "\u2022", "&bump;": "\u224E", "&bumpE;": "\u2AAE", "&bumpe;": "\u224F", "&bumpeq;": "\u224F", "&cacute;": "\u0107", "&cap;": "\u2229", "&capand;": "\u2A44", "&capbrcup;": "\u2A49", "&capcap;": "\u2A4B", "&capcup;": "\u2A47", "&capdot;": "\u2A40", "&caps;": "\u2229\uFE00", "&caret;": "\u2041", "&caron;": "\u02C7", "&ccaps;": "\u2A4D", "&ccaron;": "\u010D", "&ccedil": "\xE7", "&ccedil;": "\xE7", "&ccirc;": "\u0109", "&ccups;": "\u2A4C", "&ccupssm;": "\u2A50", "&cdot;": "\u010B", "&cedil": "\xB8", "&cedil;": "\xB8", "&cemptyv;": "\u29B2", "&cent": "\xA2", "&cent;": "\xA2", "&centerdot;": "\xB7", "&cfr;": "\u{1D520}", "&chcy;": "\u0447", "&check;": "\u2713", "&checkmark;": "\u2713", "&chi;": "\u03C7", "&cir;": "\u25CB", "&cirE;": "\u29C3", "&circ;": "\u02C6", "&circeq;": "\u2257", "&circlearrowleft;": "\u21BA", "&circlearrowright;": "\u21BB", "&circledR;": "\xAE", "&circledS;": "\u24C8", "&circledast;": "\u229B", "&circledcirc;": "\u229A", "&circleddash;": "\u229D", "&cire;": "\u2257", "&cirfnint;": "\u2A10", "&cirmid;": "\u2AEF", "&cirscir;": "\u29C2", "&clubs;": "\u2663", "&clubsuit;": "\u2663", "&colon;": ":", "&colone;": "\u2254", "&coloneq;": "\u2254", "&comma;": ",", "&commat;": "@", "&comp;": "\u2201", "&compfn;": "\u2218", "&complement;": "\u2201", "&complexes;": "\u2102", "&cong;": "\u2245", "&congdot;": "\u2A6D", "&conint;": "\u222E", "&copf;": "\u{1D554}", "&coprod;": "\u2210", "&copy": "\xA9", "&copy;": "\xA9", "&copysr;": "\u2117", "&crarr;": "\u21B5", "&cross;": "\u2717", "&cscr;": "\u{1D4B8}", "&csub;": "\u2ACF", "&csube;": "\u2AD1", "&csup;": "\u2AD0", "&csupe;": "\u2AD2", "&ctdot;": "\u22EF", "&cudarrl;": "\u2938", "&cudarrr;": "\u2935", "&cuepr;": "\u22DE", "&cuesc;": "\u22DF", "&cularr;": "\u21B6", "&cularrp;": "\u293D", "&cup;": "\u222A", "&cupbrcap;": "\u2A48", "&cupcap;": "\u2A46", "&cupcup;": "\u2A4A", "&cupdot;": "\u228D", "&cupor;": "\u2A45", "&cups;": "\u222A\uFE00", "&curarr;": "\u21B7", "&curarrm;": "\u293C", "&curlyeqprec;": "\u22DE", "&curlyeqsucc;": "\u22DF", "&curlyvee;": "\u22CE", "&curlywedge;": "\u22CF", "&curren": "\xA4", "&curren;": "\xA4", "&curvearrowleft;": "\u21B6", "&curvearrowright;": "\u21B7", "&cuvee;": "\u22CE", "&cuwed;": "\u22CF", "&cwconint;": "\u2232", "&cwint;": "\u2231", "&cylcty;": "\u232D", "&dArr;": "\u21D3", "&dHar;": "\u2965", "&dagger;": "\u2020", "&daleth;": "\u2138", "&darr;": "\u2193", "&dash;": "\u2010", "&dashv;": "\u22A3", "&dbkarow;": "\u290F", "&dblac;": "\u02DD", "&dcaron;": "\u010F", "&dcy;": "\u0434", "&dd;": "\u2146", "&ddagger;": "\u2021", "&ddarr;": "\u21CA", "&ddotseq;": "\u2A77", "&deg": "\xB0", "&deg;": "\xB0", "&delta;": "\u03B4", "&demptyv;": "\u29B1", "&dfisht;": "\u297F", "&dfr;": "\u{1D521}", "&dharl;": "\u21C3", "&dharr;": "\u21C2", "&diam;": "\u22C4", "&diamond;": "\u22C4", "&diamondsuit;": "\u2666", "&diams;": "\u2666", "&die;": "\xA8", "&digamma;": "\u03DD", "&disin;": "\u22F2", "&div;": "\xF7", "&divide": "\xF7", "&divide;": "\xF7", "&divideontimes;": "\u22C7", "&divonx;": "\u22C7", "&djcy;": "\u0452", "&dlcorn;": "\u231E", "&dlcrop;": "\u230D", "&dollar;": "$", "&dopf;": "\u{1D555}", "&dot;": "\u02D9", "&doteq;": "\u2250", "&doteqdot;": "\u2251", "&dotminus;": "\u2238", "&dotplus;": "\u2214", "&dotsquare;": "\u22A1", "&doublebarwedge;": "\u2306", "&downarrow;": "\u2193", "&downdownarrows;": "\u21CA", "&downharpoonleft;": "\u21C3", "&downharpoonright;": "\u21C2", "&drbkarow;": "\u2910", "&drcorn;": "\u231F", "&drcrop;": "\u230C", "&dscr;": "\u{1D4B9}", "&dscy;": "\u0455", "&dsol;": "\u29F6", "&dstrok;": "\u0111", "&dtdot;": "\u22F1", "&dtri;": "\u25BF", "&dtrif;": "\u25BE", "&duarr;": "\u21F5", "&duhar;": "\u296F", "&dwangle;": "\u29A6", "&dzcy;": "\u045F", "&dzigrarr;": "\u27FF", "&eDDot;": "\u2A77", "&eDot;": "\u2251", "&eacute": "\xE9", "&eacute;": "\xE9", "&easter;": "\u2A6E", "&ecaron;": "\u011B", "&ecir;": "\u2256", "&ecirc": "\xEA", "&ecirc;": "\xEA", "&ecolon;": "\u2255", "&ecy;": "\u044D", "&edot;": "\u0117", "&ee;": "\u2147", "&efDot;": "\u2252", "&efr;": "\u{1D522}", "&eg;": "\u2A9A", "&egrave": "\xE8", "&egrave;": "\xE8", "&egs;": "\u2A96", "&egsdot;": "\u2A98", "&el;": "\u2A99", "&elinters;": "\u23E7", "&ell;": "\u2113", "&els;": "\u2A95", "&elsdot;": "\u2A97", "&emacr;": "\u0113", "&empty;": "\u2205", "&emptyset;": "\u2205", "&emptyv;": "\u2205", "&emsp13;": "\u2004", "&emsp14;": "\u2005", "&emsp;": "\u2003", "&eng;": "\u014B", "&ensp;": "\u2002", "&eogon;": "\u0119", "&eopf;": "\u{1D556}", "&epar;": "\u22D5", "&eparsl;": "\u29E3", "&eplus;": "\u2A71", "&epsi;": "\u03B5", "&epsilon;": "\u03B5", "&epsiv;": "\u03F5", "&eqcirc;": "\u2256", "&eqcolon;": "\u2255", "&eqsim;": "\u2242", "&eqslantgtr;": "\u2A96", "&eqslantless;": "\u2A95", "&equals;": "=", "&equest;": "\u225F", "&equiv;": "\u2261", "&equivDD;": "\u2A78", "&eqvparsl;": "\u29E5", "&erDot;": "\u2253", "&erarr;": "\u2971", "&escr;": "\u212F", "&esdot;": "\u2250", "&esim;": "\u2242", "&eta;": "\u03B7", "&eth": "\xF0", "&eth;": "\xF0", "&euml": "\xEB", "&euml;": "\xEB", "&euro;": "\u20AC", "&excl;": "!", "&exist;": "\u2203", "&expectation;": "\u2130", "&exponentiale;": "\u2147", "&fallingdotseq;": "\u2252", "&fcy;": "\u0444", "&female;": "\u2640", "&ffilig;": "\uFB03", "&fflig;": "\uFB00", "&ffllig;": "\uFB04", "&ffr;": "\u{1D523}", "&filig;": "\uFB01", "&fjlig;": "fj", "&flat;": "\u266D", "&fllig;": "\uFB02", "&fltns;": "\u25B1", "&fnof;": "\u0192", "&fopf;": "\u{1D557}", "&forall;": "\u2200", "&fork;": "\u22D4", "&forkv;": "\u2AD9", "&fpartint;": "\u2A0D", "&frac12": "\xBD", "&frac12;": "\xBD", "&frac13;": "\u2153", "&frac14": "\xBC", "&frac14;": "\xBC", "&frac15;": "\u2155", "&frac16;": "\u2159", "&frac18;": "\u215B", "&frac23;": "\u2154", "&frac25;": "\u2156", "&frac34": "\xBE", "&frac34;": "\xBE", "&frac35;": "\u2157", "&frac38;": "\u215C", "&frac45;": "\u2158", "&frac56;": "\u215A", "&frac58;": "\u215D", "&frac78;": "\u215E", "&frasl;": "\u2044", "&frown;": "\u2322", "&fscr;": "\u{1D4BB}", "&gE;": "\u2267", "&gEl;": "\u2A8C", "&gacute;": "\u01F5", "&gamma;": "\u03B3", "&gammad;": "\u03DD", "&gap;": "\u2A86", "&gbreve;": "\u011F", "&gcirc;": "\u011D", "&gcy;": "\u0433", "&gdot;": "\u0121", "&ge;": "\u2265", "&gel;": "\u22DB", "&geq;": "\u2265", "&geqq;": "\u2267", "&geqslant;": "\u2A7E", "&ges;": "\u2A7E", "&gescc;": "\u2AA9", "&gesdot;": "\u2A80", "&gesdoto;": "\u2A82", "&gesdotol;": "\u2A84", "&gesl;": "\u22DB\uFE00", "&gesles;": "\u2A94", "&gfr;": "\u{1D524}", "&gg;": "\u226B", "&ggg;": "\u22D9", "&gimel;": "\u2137", "&gjcy;": "\u0453", "&gl;": "\u2277", "&glE;": "\u2A92", "&gla;": "\u2AA5", "&glj;": "\u2AA4", "&gnE;": "\u2269", "&gnap;": "\u2A8A", "&gnapprox;": "\u2A8A", "&gne;": "\u2A88", "&gneq;": "\u2A88", "&gneqq;": "\u2269", "&gnsim;": "\u22E7", "&gopf;": "\u{1D558}", "&grave;": "`", "&gscr;": "\u210A", "&gsim;": "\u2273", "&gsime;": "\u2A8E", "&gsiml;": "\u2A90", "&gt": ">", "&gt;": ">", "&gtcc;": "\u2AA7", "&gtcir;": "\u2A7A", "&gtdot;": "\u22D7", "&gtlPar;": "\u2995", "&gtquest;": "\u2A7C", "&gtrapprox;": "\u2A86", "&gtrarr;": "\u2978", "&gtrdot;": "\u22D7", "&gtreqless;": "\u22DB", "&gtreqqless;": "\u2A8C", "&gtrless;": "\u2277", "&gtrsim;": "\u2273", "&gvertneqq;": "\u2269\uFE00", "&gvnE;": "\u2269\uFE00", "&hArr;": "\u21D4", "&hairsp;": "\u200A", "&half;": "\xBD", "&hamilt;": "\u210B", "&hardcy;": "\u044A", "&harr;": "\u2194", "&harrcir;": "\u2948", "&harrw;": "\u21AD", "&hbar;": "\u210F", "&hcirc;": "\u0125", "&hearts;": "\u2665", "&heartsuit;": "\u2665", "&hellip;": "\u2026", "&hercon;": "\u22B9", "&hfr;": "\u{1D525}", "&hksearow;": "\u2925", "&hkswarow;": "\u2926", "&hoarr;": "\u21FF", "&homtht;": "\u223B", "&hookleftarrow;": "\u21A9", "&hookrightarrow;": "\u21AA", "&hopf;": "\u{1D559}", "&horbar;": "\u2015", "&hscr;": "\u{1D4BD}", "&hslash;": "\u210F", "&hstrok;": "\u0127", "&hybull;": "\u2043", "&hyphen;": "\u2010", "&iacute": "\xED", "&iacute;": "\xED", "&ic;": "\u2063", "&icirc": "\xEE", "&icirc;": "\xEE", "&icy;": "\u0438", "&iecy;": "\u0435", "&iexcl": "\xA1", "&iexcl;": "\xA1", "&iff;": "\u21D4", "&ifr;": "\u{1D526}", "&igrave": "\xEC", "&igrave;": "\xEC", "&ii;": "\u2148", "&iiiint;": "\u2A0C", "&iiint;": "\u222D", "&iinfin;": "\u29DC", "&iiota;": "\u2129", "&ijlig;": "\u0133", "&imacr;": "\u012B", "&image;": "\u2111", "&imagline;": "\u2110", "&imagpart;": "\u2111", "&imath;": "\u0131", "&imof;": "\u22B7", "&imped;": "\u01B5", "&in;": "\u2208", "&incare;": "\u2105", "&infin;": "\u221E", "&infintie;": "\u29DD", "&inodot;": "\u0131", "&int;": "\u222B", "&intcal;": "\u22BA", "&integers;": "\u2124", "&intercal;": "\u22BA", "&intlarhk;": "\u2A17", "&intprod;": "\u2A3C", "&iocy;": "\u0451", "&iogon;": "\u012F", "&iopf;": "\u{1D55A}", "&iota;": "\u03B9", "&iprod;": "\u2A3C", "&iquest": "\xBF", "&iquest;": "\xBF", "&iscr;": "\u{1D4BE}", "&isin;": "\u2208", "&isinE;": "\u22F9", "&isindot;": "\u22F5", "&isins;": "\u22F4", "&isinsv;": "\u22F3", "&isinv;": "\u2208", "&it;": "\u2062", "&itilde;": "\u0129", "&iukcy;": "\u0456", "&iuml": "\xEF", "&iuml;": "\xEF", "&jcirc;": "\u0135", "&jcy;": "\u0439", "&jfr;": "\u{1D527}", "&jmath;": "\u0237", "&jopf;": "\u{1D55B}", "&jscr;": "\u{1D4BF}", "&jsercy;": "\u0458", "&jukcy;": "\u0454", "&kappa;": "\u03BA", "&kappav;": "\u03F0", "&kcedil;": "\u0137", "&kcy;": "\u043A", "&kfr;": "\u{1D528}", "&kgreen;": "\u0138", "&khcy;": "\u0445", "&kjcy;": "\u045C", "&kopf;": "\u{1D55C}", "&kscr;": "\u{1D4C0}", "&lAarr;": "\u21DA", "&lArr;": "\u21D0", "&lAtail;": "\u291B", "&lBarr;": "\u290E", "&lE;": "\u2266", "&lEg;": "\u2A8B", "&lHar;": "\u2962", "&lacute;": "\u013A", "&laemptyv;": "\u29B4", "&lagran;": "\u2112", "&lambda;": "\u03BB", "&lang;": "\u27E8", "&langd;": "\u2991", "&langle;": "\u27E8", "&lap;": "\u2A85", "&laquo": "\xAB", "&laquo;": "\xAB", "&larr;": "\u2190", "&larrb;": "\u21E4", "&larrbfs;": "\u291F", "&larrfs;": "\u291D", "&larrhk;": "\u21A9", "&larrlp;": "\u21AB", "&larrpl;": "\u2939", "&larrsim;": "\u2973", "&larrtl;": "\u21A2", "&lat;": "\u2AAB", "&latail;": "\u2919", "&late;": "\u2AAD", "&lates;": "\u2AAD\uFE00", "&lbarr;": "\u290C", "&lbbrk;": "\u2772", "&lbrace;": "{", "&lbrack;": "[", "&lbrke;": "\u298B", "&lbrksld;": "\u298F", "&lbrkslu;": "\u298D", "&lcaron;": "\u013E", "&lcedil;": "\u013C", "&lceil;": "\u2308", "&lcub;": "{", "&lcy;": "\u043B", "&ldca;": "\u2936", "&ldquo;": "\u201C", "&ldquor;": "\u201E", "&ldrdhar;": "\u2967", "&ldrushar;": "\u294B", "&ldsh;": "\u21B2", "&le;": "\u2264", "&leftarrow;": "\u2190", "&leftarrowtail;": "\u21A2", "&leftharpoondown;": "\u21BD", "&leftharpoonup;": "\u21BC", "&leftleftarrows;": "\u21C7", "&leftrightarrow;": "\u2194", "&leftrightarrows;": "\u21C6", "&leftrightharpoons;": "\u21CB", "&leftrightsquigarrow;": "\u21AD", "&leftthreetimes;": "\u22CB", "&leg;": "\u22DA", "&leq;": "\u2264", "&leqq;": "\u2266", "&leqslant;": "\u2A7D", "&les;": "\u2A7D", "&lescc;": "\u2AA8", "&lesdot;": "\u2A7F", "&lesdoto;": "\u2A81", "&lesdotor;": "\u2A83", "&lesg;": "\u22DA\uFE00", "&lesges;": "\u2A93", "&lessapprox;": "\u2A85", "&lessdot;": "\u22D6", "&lesseqgtr;": "\u22DA", "&lesseqqgtr;": "\u2A8B", "&lessgtr;": "\u2276", "&lesssim;": "\u2272", "&lfisht;": "\u297C", "&lfloor;": "\u230A", "&lfr;": "\u{1D529}", "&lg;": "\u2276", "&lgE;": "\u2A91", "&lhard;": "\u21BD", "&lharu;": "\u21BC", "&lharul;": "\u296A", "&lhblk;": "\u2584", "&ljcy;": "\u0459", "&ll;": "\u226A", "&llarr;": "\u21C7", "&llcorner;": "\u231E", "&llhard;": "\u296B", "&lltri;": "\u25FA", "&lmidot;": "\u0140", "&lmoust;": "\u23B0", "&lmoustache;": "\u23B0", "&lnE;": "\u2268", "&lnap;": "\u2A89", "&lnapprox;": "\u2A89", "&lne;": "\u2A87", "&lneq;": "\u2A87", "&lneqq;": "\u2268", "&lnsim;": "\u22E6", "&loang;": "\u27EC", "&loarr;": "\u21FD", "&lobrk;": "\u27E6", "&longleftarrow;": "\u27F5", "&longleftrightarrow;": "\u27F7", "&longmapsto;": "\u27FC", "&longrightarrow;": "\u27F6", "&looparrowleft;": "\u21AB", "&looparrowright;": "\u21AC", "&lopar;": "\u2985", "&lopf;": "\u{1D55D}", "&loplus;": "\u2A2D", "&lotimes;": "\u2A34", "&lowast;": "\u2217", "&lowbar;": "_", "&loz;": "\u25CA", "&lozenge;": "\u25CA", "&lozf;": "\u29EB", "&lpar;": "(", "&lparlt;": "\u2993", "&lrarr;": "\u21C6", "&lrcorner;": "\u231F", "&lrhar;": "\u21CB", "&lrhard;": "\u296D", "&lrm;": "\u200E", "&lrtri;": "\u22BF", "&lsaquo;": "\u2039", "&lscr;": "\u{1D4C1}", "&lsh;": "\u21B0", "&lsim;": "\u2272", "&lsime;": "\u2A8D", "&lsimg;": "\u2A8F", "&lsqb;": "[", "&lsquo;": "\u2018", "&lsquor;": "\u201A", "&lstrok;": "\u0142", "&lt": "<", "&lt;": "<", "&ltcc;": "\u2AA6", "&ltcir;": "\u2A79", "&ltdot;": "\u22D6", "&lthree;": "\u22CB", "&ltimes;": "\u22C9", "&ltlarr;": "\u2976", "&ltquest;": "\u2A7B", "&ltrPar;": "\u2996", "&ltri;": "\u25C3", "&ltrie;": "\u22B4", "&ltrif;": "\u25C2", "&lurdshar;": "\u294A", "&luruhar;": "\u2966", "&lvertneqq;": "\u2268\uFE00", "&lvnE;": "\u2268\uFE00", "&mDDot;": "\u223A", "&macr": "\xAF", "&macr;": "\xAF", "&male;": "\u2642", "&malt;": "\u2720", "&maltese;": "\u2720", "&map;": "\u21A6", "&mapsto;": "\u21A6", "&mapstodown;": "\u21A7", "&mapstoleft;": "\u21A4", "&mapstoup;": "\u21A5", "&marker;": "\u25AE", "&mcomma;": "\u2A29", "&mcy;": "\u043C", "&mdash;": "\u2014", "&measuredangle;": "\u2221", "&mfr;": "\u{1D52A}", "&mho;": "\u2127", "&micro": "\xB5", "&micro;": "\xB5", "&mid;": "\u2223", "&midast;": "*", "&midcir;": "\u2AF0", "&middot": "\xB7", "&middot;": "\xB7", "&minus;": "\u2212", "&minusb;": "\u229F", "&minusd;": "\u2238", "&minusdu;": "\u2A2A", "&mlcp;": "\u2ADB", "&mldr;": "\u2026", "&mnplus;": "\u2213", "&models;": "\u22A7", "&mopf;": "\u{1D55E}", "&mp;": "\u2213", "&mscr;": "\u{1D4C2}", "&mstpos;": "\u223E", "&mu;": "\u03BC", "&multimap;": "\u22B8", "&mumap;": "\u22B8", "&nGg;": "\u22D9\u0338", "&nGt;": "\u226B\u20D2", "&nGtv;": "\u226B\u0338", "&nLeftarrow;": "\u21CD", "&nLeftrightarrow;": "\u21CE", "&nLl;": "\u22D8\u0338", "&nLt;": "\u226A\u20D2", "&nLtv;": "\u226A\u0338", "&nRightarrow;": "\u21CF", "&nVDash;": "\u22AF", "&nVdash;": "\u22AE", "&nabla;": "\u2207", "&nacute;": "\u0144", "&nang;": "\u2220\u20D2", "&nap;": "\u2249", "&napE;": "\u2A70\u0338", "&napid;": "\u224B\u0338", "&napos;": "\u0149", "&napprox;": "\u2249", "&natur;": "\u266E", "&natural;": "\u266E", "&naturals;": "\u2115", "&nbsp": "\xA0", "&nbsp;": "\xA0", "&nbump;": "\u224E\u0338", "&nbumpe;": "\u224F\u0338", "&ncap;": "\u2A43", "&ncaron;": "\u0148", "&ncedil;": "\u0146", "&ncong;": "\u2247", "&ncongdot;": "\u2A6D\u0338", "&ncup;": "\u2A42", "&ncy;": "\u043D", "&ndash;": "\u2013", "&ne;": "\u2260", "&neArr;": "\u21D7", "&nearhk;": "\u2924", "&nearr;": "\u2197", "&nearrow;": "\u2197", "&nedot;": "\u2250\u0338", "&nequiv;": "\u2262", "&nesear;": "\u2928", "&nesim;": "\u2242\u0338", "&nexist;": "\u2204", "&nexists;": "\u2204", "&nfr;": "\u{1D52B}", "&ngE;": "\u2267\u0338", "&nge;": "\u2271", "&ngeq;": "\u2271", "&ngeqq;": "\u2267\u0338", "&ngeqslant;": "\u2A7E\u0338", "&nges;": "\u2A7E\u0338", "&ngsim;": "\u2275", "&ngt;": "\u226F", "&ngtr;": "\u226F", "&nhArr;": "\u21CE", "&nharr;": "\u21AE", "&nhpar;": "\u2AF2", "&ni;": "\u220B", "&nis;": "\u22FC", "&nisd;": "\u22FA", "&niv;": "\u220B", "&njcy;": "\u045A", "&nlArr;": "\u21CD", "&nlE;": "\u2266\u0338", "&nlarr;": "\u219A", "&nldr;": "\u2025", "&nle;": "\u2270", "&nleftarrow;": "\u219A", "&nleftrightarrow;": "\u21AE", "&nleq;": "\u2270", "&nleqq;": "\u2266\u0338", "&nleqslant;": "\u2A7D\u0338", "&nles;": "\u2A7D\u0338", "&nless;": "\u226E", "&nlsim;": "\u2274", "&nlt;": "\u226E", "&nltri;": "\u22EA", "&nltrie;": "\u22EC", "&nmid;": "\u2224", "&nopf;": "\u{1D55F}", "&not": "\xAC", "&not;": "\xAC", "&notin;": "\u2209", "&notinE;": "\u22F9\u0338", "&notindot;": "\u22F5\u0338", "&notinva;": "\u2209", "&notinvb;": "\u22F7", "&notinvc;": "\u22F6", "&notni;": "\u220C", "&notniva;": "\u220C", "&notnivb;": "\u22FE", "&notnivc;": "\u22FD", "&npar;": "\u2226", "&nparallel;": "\u2226", "&nparsl;": "\u2AFD\u20E5", "&npart;": "\u2202\u0338", "&npolint;": "\u2A14", "&npr;": "\u2280", "&nprcue;": "\u22E0", "&npre;": "\u2AAF\u0338", "&nprec;": "\u2280", "&npreceq;": "\u2AAF\u0338", "&nrArr;": "\u21CF", "&nrarr;": "\u219B", "&nrarrc;": "\u2933\u0338", "&nrarrw;": "\u219D\u0338", "&nrightarrow;": "\u219B", "&nrtri;": "\u22EB", "&nrtrie;": "\u22ED", "&nsc;": "\u2281", "&nsccue;": "\u22E1", "&nsce;": "\u2AB0\u0338", "&nscr;": "\u{1D4C3}", "&nshortmid;": "\u2224", "&nshortparallel;": "\u2226", "&nsim;": "\u2241", "&nsime;": "\u2244", "&nsimeq;": "\u2244", "&nsmid;": "\u2224", "&nspar;": "\u2226", "&nsqsube;": "\u22E2", "&nsqsupe;": "\u22E3", "&nsub;": "\u2284", "&nsubE;": "\u2AC5\u0338", "&nsube;": "\u2288", "&nsubset;": "\u2282\u20D2", "&nsubseteq;": "\u2288", "&nsubseteqq;": "\u2AC5\u0338", "&nsucc;": "\u2281", "&nsucceq;": "\u2AB0\u0338", "&nsup;": "\u2285", "&nsupE;": "\u2AC6\u0338", "&nsupe;": "\u2289", "&nsupset;": "\u2283\u20D2", "&nsupseteq;": "\u2289", "&nsupseteqq;": "\u2AC6\u0338", "&ntgl;": "\u2279", "&ntilde": "\xF1", "&ntilde;": "\xF1", "&ntlg;": "\u2278", "&ntriangleleft;": "\u22EA", "&ntrianglelefteq;": "\u22EC", "&ntriangleright;": "\u22EB", "&ntrianglerighteq;": "\u22ED", "&nu;": "\u03BD", "&num;": "#", "&numero;": "\u2116", "&numsp;": "\u2007", "&nvDash;": "\u22AD", "&nvHarr;": "\u2904", "&nvap;": "\u224D\u20D2", "&nvdash;": "\u22AC", "&nvge;": "\u2265\u20D2", "&nvgt;": ">\u20D2", "&nvinfin;": "\u29DE", "&nvlArr;": "\u2902", "&nvle;": "\u2264\u20D2", "&nvlt;": "<\u20D2", "&nvltrie;": "\u22B4\u20D2", "&nvrArr;": "\u2903", "&nvrtrie;": "\u22B5\u20D2", "&nvsim;": "\u223C\u20D2", "&nwArr;": "\u21D6", "&nwarhk;": "\u2923", "&nwarr;": "\u2196", "&nwarrow;": "\u2196", "&nwnear;": "\u2927", "&oS;": "\u24C8", "&oacute": "\xF3", "&oacute;": "\xF3", "&oast;": "\u229B", "&ocir;": "\u229A", "&ocirc": "\xF4", "&ocirc;": "\xF4", "&ocy;": "\u043E", "&odash;": "\u229D", "&odblac;": "\u0151", "&odiv;": "\u2A38", "&odot;": "\u2299", "&odsold;": "\u29BC", "&oelig;": "\u0153", "&ofcir;": "\u29BF", "&ofr;": "\u{1D52C}", "&ogon;": "\u02DB", "&ograve": "\xF2", "&ograve;": "\xF2", "&ogt;": "\u29C1", "&ohbar;": "\u29B5", "&ohm;": "\u03A9", "&oint;": "\u222E", "&olarr;": "\u21BA", "&olcir;": "\u29BE", "&olcross;": "\u29BB", "&oline;": "\u203E", "&olt;": "\u29C0", "&omacr;": "\u014D", "&omega;": "\u03C9", "&omicron;": "\u03BF", "&omid;": "\u29B6", "&ominus;": "\u2296", "&oopf;": "\u{1D560}", "&opar;": "\u29B7", "&operp;": "\u29B9", "&oplus;": "\u2295", "&or;": "\u2228", "&orarr;": "\u21BB", "&ord;": "\u2A5D", "&order;": "\u2134", "&orderof;": "\u2134", "&ordf": "\xAA", "&ordf;": "\xAA", "&ordm": "\xBA", "&ordm;": "\xBA", "&origof;": "\u22B6", "&oror;": "\u2A56", "&orslope;": "\u2A57", "&orv;": "\u2A5B", "&oscr;": "\u2134", "&oslash": "\xF8", "&oslash;": "\xF8", "&osol;": "\u2298", "&otilde": "\xF5", "&otilde;": "\xF5", "&otimes;": "\u2297", "&otimesas;": "\u2A36", "&ouml": "\xF6", "&ouml;": "\xF6", "&ovbar;": "\u233D", "&par;": "\u2225", "&para": "\xB6", "&para;": "\xB6", "&parallel;": "\u2225", "&parsim;": "\u2AF3", "&parsl;": "\u2AFD", "&part;": "\u2202", "&pcy;": "\u043F", "&percnt;": "%", "&period;": ".", "&permil;": "\u2030", "&perp;": "\u22A5", "&pertenk;": "\u2031", "&pfr;": "\u{1D52D}", "&phi;": "\u03C6", "&phiv;": "\u03D5", "&phmmat;": "\u2133", "&phone;": "\u260E", "&pi;": "\u03C0", "&pitchfork;": "\u22D4", "&piv;": "\u03D6", "&planck;": "\u210F", "&planckh;": "\u210E", "&plankv;": "\u210F", "&plus;": "+", "&plusacir;": "\u2A23", "&plusb;": "\u229E", "&pluscir;": "\u2A22", "&plusdo;": "\u2214", "&plusdu;": "\u2A25", "&pluse;": "\u2A72", "&plusmn": "\xB1", "&plusmn;": "\xB1", "&plussim;": "\u2A26", "&plustwo;": "\u2A27", "&pm;": "\xB1", "&pointint;": "\u2A15", "&popf;": "\u{1D561}", "&pound": "\xA3", "&pound;": "\xA3", "&pr;": "\u227A", "&prE;": "\u2AB3", "&prap;": "\u2AB7", "&prcue;": "\u227C", "&pre;": "\u2AAF", "&prec;": "\u227A", "&precapprox;": "\u2AB7", "&preccurlyeq;": "\u227C", "&preceq;": "\u2AAF", "&precnapprox;": "\u2AB9", "&precneqq;": "\u2AB5", "&precnsim;": "\u22E8", "&precsim;": "\u227E", "&prime;": "\u2032", "&primes;": "\u2119", "&prnE;": "\u2AB5", "&prnap;": "\u2AB9", "&prnsim;": "\u22E8", "&prod;": "\u220F", "&profalar;": "\u232E", "&profline;": "\u2312", "&profsurf;": "\u2313", "&prop;": "\u221D", "&propto;": "\u221D", "&prsim;": "\u227E", "&prurel;": "\u22B0", "&pscr;": "\u{1D4C5}", "&psi;": "\u03C8", "&puncsp;": "\u2008", "&qfr;": "\u{1D52E}", "&qint;": "\u2A0C", "&qopf;": "\u{1D562}", "&qprime;": "\u2057", "&qscr;": "\u{1D4C6}", "&quaternions;": "\u210D", "&quatint;": "\u2A16", "&quest;": "?", "&questeq;": "\u225F", "&quot": '"', "&quot;": '"', "&rAarr;": "\u21DB", "&rArr;": "\u21D2", "&rAtail;": "\u291C", "&rBarr;": "\u290F", "&rHar;": "\u2964", "&race;": "\u223D\u0331", "&racute;": "\u0155", "&radic;": "\u221A", "&raemptyv;": "\u29B3", "&rang;": "\u27E9", "&rangd;": "\u2992", "&range;": "\u29A5", "&rangle;": "\u27E9", "&raquo": "\xBB", "&raquo;": "\xBB", "&rarr;": "\u2192", "&rarrap;": "\u2975", "&rarrb;": "\u21E5", "&rarrbfs;": "\u2920", "&rarrc;": "\u2933", "&rarrfs;": "\u291E", "&rarrhk;": "\u21AA", "&rarrlp;": "\u21AC", "&rarrpl;": "\u2945", "&rarrsim;": "\u2974", "&rarrtl;": "\u21A3", "&rarrw;": "\u219D", "&ratail;": "\u291A", "&ratio;": "\u2236", "&rationals;": "\u211A", "&rbarr;": "\u290D", "&rbbrk;": "\u2773", "&rbrace;": "}", "&rbrack;": "]", "&rbrke;": "\u298C", "&rbrksld;": "\u298E", "&rbrkslu;": "\u2990", "&rcaron;": "\u0159", "&rcedil;": "\u0157", "&rceil;": "\u2309", "&rcub;": "}", "&rcy;": "\u0440", "&rdca;": "\u2937", "&rdldhar;": "\u2969", "&rdquo;": "\u201D", "&rdquor;": "\u201D", "&rdsh;": "\u21B3", "&real;": "\u211C", "&realine;": "\u211B", "&realpart;": "\u211C", "&reals;": "\u211D", "&rect;": "\u25AD", "&reg": "\xAE", "&reg;": "\xAE", "&rfisht;": "\u297D", "&rfloor;": "\u230B", "&rfr;": "\u{1D52F}", "&rhard;": "\u21C1", "&rharu;": "\u21C0", "&rharul;": "\u296C", "&rho;": "\u03C1", "&rhov;": "\u03F1", "&rightarrow;": "\u2192", "&rightarrowtail;": "\u21A3", "&rightharpoondown;": "\u21C1", "&rightharpoonup;": "\u21C0", "&rightleftarrows;": "\u21C4", "&rightleftharpoons;": "\u21CC", "&rightrightarrows;": "\u21C9", "&rightsquigarrow;": "\u219D", "&rightthreetimes;": "\u22CC", "&ring;": "\u02DA", "&risingdotseq;": "\u2253", "&rlarr;": "\u21C4", "&rlhar;": "\u21CC", "&rlm;": "\u200F", "&rmoust;": "\u23B1", "&rmoustache;": "\u23B1", "&rnmid;": "\u2AEE", "&roang;": "\u27ED", "&roarr;": "\u21FE", "&robrk;": "\u27E7", "&ropar;": "\u2986", "&ropf;": "\u{1D563}", "&roplus;": "\u2A2E", "&rotimes;": "\u2A35", "&rpar;": ")", "&rpargt;": "\u2994", "&rppolint;": "\u2A12", "&rrarr;": "\u21C9", "&rsaquo;": "\u203A", "&rscr;": "\u{1D4C7}", "&rsh;": "\u21B1", "&rsqb;": "]", "&rsquo;": "\u2019", "&rsquor;": "\u2019", "&rthree;": "\u22CC", "&rtimes;": "\u22CA", "&rtri;": "\u25B9", "&rtrie;": "\u22B5", "&rtrif;": "\u25B8", "&rtriltri;": "\u29CE", "&ruluhar;": "\u2968", "&rx;": "\u211E", "&sacute;": "\u015B", "&sbquo;": "\u201A", "&sc;": "\u227B", "&scE;": "\u2AB4", "&scap;": "\u2AB8", "&scaron;": "\u0161", "&sccue;": "\u227D", "&sce;": "\u2AB0", "&scedil;": "\u015F", "&scirc;": "\u015D", "&scnE;": "\u2AB6", "&scnap;": "\u2ABA", "&scnsim;": "\u22E9", "&scpolint;": "\u2A13", "&scsim;": "\u227F", "&scy;": "\u0441", "&sdot;": "\u22C5", "&sdotb;": "\u22A1", "&sdote;": "\u2A66", "&seArr;": "\u21D8", "&searhk;": "\u2925", "&searr;": "\u2198", "&searrow;": "\u2198", "&sect": "\xA7", "&sect;": "\xA7", "&semi;": ";", "&seswar;": "\u2929", "&setminus;": "\u2216", "&setmn;": "\u2216", "&sext;": "\u2736", "&sfr;": "\u{1D530}", "&sfrown;": "\u2322", "&sharp;": "\u266F", "&shchcy;": "\u0449", "&shcy;": "\u0448", "&shortmid;": "\u2223", "&shortparallel;": "\u2225", "&shy": "\xAD", "&shy;": "\xAD", "&sigma;": "\u03C3", "&sigmaf;": "\u03C2", "&sigmav;": "\u03C2", "&sim;": "\u223C", "&simdot;": "\u2A6A", "&sime;": "\u2243", "&simeq;": "\u2243", "&simg;": "\u2A9E", "&simgE;": "\u2AA0", "&siml;": "\u2A9D", "&simlE;": "\u2A9F", "&simne;": "\u2246", "&simplus;": "\u2A24", "&simrarr;": "\u2972", "&slarr;": "\u2190", "&smallsetminus;": "\u2216", "&smashp;": "\u2A33", "&smeparsl;": "\u29E4", "&smid;": "\u2223", "&smile;": "\u2323", "&smt;": "\u2AAA", "&smte;": "\u2AAC", "&smtes;": "\u2AAC\uFE00", "&softcy;": "\u044C", "&sol;": "/", "&solb;": "\u29C4", "&solbar;": "\u233F", "&sopf;": "\u{1D564}", "&spades;": "\u2660", "&spadesuit;": "\u2660", "&spar;": "\u2225", "&sqcap;": "\u2293", "&sqcaps;": "\u2293\uFE00", "&sqcup;": "\u2294", "&sqcups;": "\u2294\uFE00", "&sqsub;": "\u228F", "&sqsube;": "\u2291", "&sqsubset;": "\u228F", "&sqsubseteq;": "\u2291", "&sqsup;": "\u2290", "&sqsupe;": "\u2292", "&sqsupset;": "\u2290", "&sqsupseteq;": "\u2292", "&squ;": "\u25A1", "&square;": "\u25A1", "&squarf;": "\u25AA", "&squf;": "\u25AA", "&srarr;": "\u2192", "&sscr;": "\u{1D4C8}", "&ssetmn;": "\u2216", "&ssmile;": "\u2323", "&sstarf;": "\u22C6", "&star;": "\u2606", "&starf;": "\u2605", "&straightepsilon;": "\u03F5", "&straightphi;": "\u03D5", "&strns;": "\xAF", "&sub;": "\u2282", "&subE;": "\u2AC5", "&subdot;": "\u2ABD", "&sube;": "\u2286", "&subedot;": "\u2AC3", "&submult;": "\u2AC1", "&subnE;": "\u2ACB", "&subne;": "\u228A", "&subplus;": "\u2ABF", "&subrarr;": "\u2979", "&subset;": "\u2282", "&subseteq;": "\u2286", "&subseteqq;": "\u2AC5", "&subsetneq;": "\u228A", "&subsetneqq;": "\u2ACB", "&subsim;": "\u2AC7", "&subsub;": "\u2AD5", "&subsup;": "\u2AD3", "&succ;": "\u227B", "&succapprox;": "\u2AB8", "&succcurlyeq;": "\u227D", "&succeq;": "\u2AB0", "&succnapprox;": "\u2ABA", "&succneqq;": "\u2AB6", "&succnsim;": "\u22E9", "&succsim;": "\u227F", "&sum;": "\u2211", "&sung;": "\u266A", "&sup1": "\xB9", "&sup1;": "\xB9", "&sup2": "\xB2", "&sup2;": "\xB2", "&sup3": "\xB3", "&sup3;": "\xB3", "&sup;": "\u2283", "&supE;": "\u2AC6", "&supdot;": "\u2ABE", "&supdsub;": "\u2AD8", "&supe;": "\u2287", "&supedot;": "\u2AC4", "&suphsol;": "\u27C9", "&suphsub;": "\u2AD7", "&suplarr;": "\u297B", "&supmult;": "\u2AC2", "&supnE;": "\u2ACC", "&supne;": "\u228B", "&supplus;": "\u2AC0", "&supset;": "\u2283", "&supseteq;": "\u2287", "&supseteqq;": "\u2AC6", "&supsetneq;": "\u228B", "&supsetneqq;": "\u2ACC", "&supsim;": "\u2AC8", "&supsub;": "\u2AD4", "&supsup;": "\u2AD6", "&swArr;": "\u21D9", "&swarhk;": "\u2926", "&swarr;": "\u2199", "&swarrow;": "\u2199", "&swnwar;": "\u292A", "&szlig": "\xDF", "&szlig;": "\xDF", "&target;": "\u2316", "&tau;": "\u03C4", "&tbrk;": "\u23B4", "&tcaron;": "\u0165", "&tcedil;": "\u0163", "&tcy;": "\u0442", "&tdot;": "\u20DB", "&telrec;": "\u2315", "&tfr;": "\u{1D531}", "&there4;": "\u2234", "&therefore;": "\u2234", "&theta;": "\u03B8", "&thetasym;": "\u03D1", "&thetav;": "\u03D1", "&thickapprox;": "\u2248", "&thicksim;": "\u223C", "&thinsp;": "\u2009", "&thkap;": "\u2248", "&thksim;": "\u223C", "&thorn": "\xFE", "&thorn;": "\xFE", "&tilde;": "\u02DC", "&times": "\xD7", "&times;": "\xD7", "&timesb;": "\u22A0", "&timesbar;": "\u2A31", "&timesd;": "\u2A30", "&tint;": "\u222D", "&toea;": "\u2928", "&top;": "\u22A4", "&topbot;": "\u2336", "&topcir;": "\u2AF1", "&topf;": "\u{1D565}", "&topfork;": "\u2ADA", "&tosa;": "\u2929", "&tprime;": "\u2034", "&trade;": "\u2122", "&triangle;": "\u25B5", "&triangledown;": "\u25BF", "&triangleleft;": "\u25C3", "&trianglelefteq;": "\u22B4", "&triangleq;": "\u225C", "&triangleright;": "\u25B9", "&trianglerighteq;": "\u22B5", "&tridot;": "\u25EC", "&trie;": "\u225C", "&triminus;": "\u2A3A", "&triplus;": "\u2A39", "&trisb;": "\u29CD", "&tritime;": "\u2A3B", "&trpezium;": "\u23E2", "&tscr;": "\u{1D4C9}", "&tscy;": "\u0446", "&tshcy;": "\u045B", "&tstrok;": "\u0167", "&twixt;": "\u226C", "&twoheadleftarrow;": "\u219E", "&twoheadrightarrow;": "\u21A0", "&uArr;": "\u21D1", "&uHar;": "\u2963", "&uacute": "\xFA", "&uacute;": "\xFA", "&uarr;": "\u2191", "&ubrcy;": "\u045E", "&ubreve;": "\u016D", "&ucirc": "\xFB", "&ucirc;": "\xFB", "&ucy;": "\u0443", "&udarr;": "\u21C5", "&udblac;": "\u0171", "&udhar;": "\u296E", "&ufisht;": "\u297E", "&ufr;": "\u{1D532}", "&ugrave": "\xF9", "&ugrave;": "\xF9", "&uharl;": "\u21BF", "&uharr;": "\u21BE", "&uhblk;": "\u2580", "&ulcorn;": "\u231C", "&ulcorner;": "\u231C", "&ulcrop;": "\u230F", "&ultri;": "\u25F8", "&umacr;": "\u016B", "&uml": "\xA8", "&uml;": "\xA8", "&uogon;": "\u0173", "&uopf;": "\u{1D566}", "&uparrow;": "\u2191", "&updownarrow;": "\u2195", "&upharpoonleft;": "\u21BF", "&upharpoonright;": "\u21BE", "&uplus;": "\u228E", "&upsi;": "\u03C5", "&upsih;": "\u03D2", "&upsilon;": "\u03C5", "&upuparrows;": "\u21C8", "&urcorn;": "\u231D", "&urcorner;": "\u231D", "&urcrop;": "\u230E", "&uring;": "\u016F", "&urtri;": "\u25F9", "&uscr;": "\u{1D4CA}", "&utdot;": "\u22F0", "&utilde;": "\u0169", "&utri;": "\u25B5", "&utrif;": "\u25B4", "&uuarr;": "\u21C8", "&uuml": "\xFC", "&uuml;": "\xFC", "&uwangle;": "\u29A7", "&vArr;": "\u21D5", "&vBar;": "\u2AE8", "&vBarv;": "\u2AE9", "&vDash;": "\u22A8", "&vangrt;": "\u299C", "&varepsilon;": "\u03F5", "&varkappa;": "\u03F0", "&varnothing;": "\u2205", "&varphi;": "\u03D5", "&varpi;": "\u03D6", "&varpropto;": "\u221D", "&varr;": "\u2195", "&varrho;": "\u03F1", "&varsigma;": "\u03C2", "&varsubsetneq;": "\u228A\uFE00", "&varsubsetneqq;": "\u2ACB\uFE00", "&varsupsetneq;": "\u228B\uFE00", "&varsupsetneqq;": "\u2ACC\uFE00", "&vartheta;": "\u03D1", "&vartriangleleft;": "\u22B2", "&vartriangleright;": "\u22B3", "&vcy;": "\u0432", "&vdash;": "\u22A2", "&vee;": "\u2228", "&veebar;": "\u22BB", "&veeeq;": "\u225A", "&vellip;": "\u22EE", "&verbar;": "|", "&vert;": "|", "&vfr;": "\u{1D533}", "&vltri;": "\u22B2", "&vnsub;": "\u2282\u20D2", "&vnsup;": "\u2283\u20D2", "&vopf;": "\u{1D567}", "&vprop;": "\u221D", "&vrtri;": "\u22B3", "&vscr;": "\u{1D4CB}", "&vsubnE;": "\u2ACB\uFE00", "&vsubne;": "\u228A\uFE00", "&vsupnE;": "\u2ACC\uFE00", "&vsupne;": "\u228B\uFE00", "&vzigzag;": "\u299A", "&wcirc;": "\u0175", "&wedbar;": "\u2A5F", "&wedge;": "\u2227", "&wedgeq;": "\u2259", "&weierp;": "\u2118", "&wfr;": "\u{1D534}", "&wopf;": "\u{1D568}", "&wp;": "\u2118", "&wr;": "\u2240", "&wreath;": "\u2240", "&wscr;": "\u{1D4CC}", "&xcap;": "\u22C2", "&xcirc;": "\u25EF", "&xcup;": "\u22C3", "&xdtri;": "\u25BD", "&xfr;": "\u{1D535}", "&xhArr;": "\u27FA", "&xharr;": "\u27F7", "&xi;": "\u03BE", "&xlArr;": "\u27F8", "&xlarr;": "\u27F5", "&xmap;": "\u27FC", "&xnis;": "\u22FB", "&xodot;": "\u2A00", "&xopf;": "\u{1D569}", "&xoplus;": "\u2A01", "&xotime;": "\u2A02", "&xrArr;": "\u27F9", "&xrarr;": "\u27F6", "&xscr;": "\u{1D4CD}", "&xsqcup;": "\u2A06", "&xuplus;": "\u2A04", "&xutri;": "\u25B3", "&xvee;": "\u22C1", "&xwedge;": "\u22C0", "&yacute": "\xFD", "&yacute;": "\xFD", "&yacy;": "\u044F", "&ycirc;": "\u0177", "&ycy;": "\u044B", "&yen": "\xA5", "&yen;": "\xA5", "&yfr;": "\u{1D536}", "&yicy;": "\u0457", "&yopf;": "\u{1D56A}", "&yscr;": "\u{1D4CE}", "&yucy;": "\u044E", "&yuml": "\xFF", "&yuml;": "\xFF", "&zacute;": "\u017A", "&zcaron;": "\u017E", "&zcy;": "\u0437", "&zdot;": "\u017C", "&zeetrf;": "\u2128", "&zeta;": "\u03B6", "&zfr;": "\u{1D537}", "&zhcy;": "\u0436", "&zigrarr;": "\u21DD", "&zopf;": "\u{1D56B}", "&zscr;": "\u{1D4CF}", "&zwj;": "\u200D", "&zwnj;": "\u200C" };
      function b(e4) {
        return e4.trim().replace(/[<>"'?&]/g, (e5) => {
          let r3 = e5.charCodeAt(0).toString(16);
          return r3.length < 2 && (r3 = "0" + r3), "&#x" + r3.toUpperCase() + ";";
        });
      }
      function v(e4) {
        return [].concat(e4.name || []).concat(e4.name ? `<${e4.address}>` : e4.address).join(" ");
      }
      function y(e4) {
        let r3 = [], t3 = (e5, a2) => {
          if (a2 && r3.push(", "), e5.group) {
            let a3 = `${e5.name}:`, s4 = ";";
            r3.push(a3), e5.group.forEach(t3), r3.push(s4);
          } else
            r3.push(v(e5));
        };
        return e4.forEach(t3), r3.join("");
      }
      function w(e4) {
        return `<a href="mailto:${b(e4.address)}" class="postal-email-address">${b(e4.name || `<${e4.address}>`)}</a>`;
      }
      function q(e4) {
        let r3 = [], t3 = (e5, a2) => {
          if (a2 && r3.push('<span class="postal-email-address-separator">, </span>'), e5.group) {
            let a3 = `<span class="postal-email-address-group">${b(e5.name)}:</span>`, s4 = '<span class="postal-email-address-group">;</span>';
            r3.push(a3), e5.group.forEach(t3), r3.push(s4);
          } else
            r3.push(w(e5));
        };
        return e4.forEach(t3), r3.join(" ");
      }
      function k(e4) {
        let r3 = [];
        if (e4.from && r3.push({ key: "From", val: v(e4.from) }), e4.subject && r3.push({ key: "Subject", val: e4.subject }), e4.date) {
          let t4 = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false }, a3 = "undefined" == typeof Intl ? e4.date : new Intl.DateTimeFormat("default", t4).format(new Date(e4.date));
          r3.push({ key: "Date", val: a3 });
        }
        e4.to && e4.to.length && r3.push({ key: "To", val: y(e4.to) }), e4.cc && e4.cc.length && r3.push({ key: "Cc", val: y(e4.cc) }), e4.bcc && e4.bcc.length && r3.push({ key: "Bcc", val: y(e4.bcc) });
        let t3 = r3.map((e5) => e5.key.length).reduce((e5, r4) => r4 > e5 ? r4 : e5, 0);
        r3 = r3.flatMap((e5) => {
          let r4 = t3 - e5.key.length, a3 = `${e5.key}: ${" ".repeat(r4)}`, s5 = `${" ".repeat(e5.key.length + 1)} ${" ".repeat(r4)}`;
          return function(e6, r5, t4) {
            r5 = r5 || 76;
            let a4, s6, o4 = 0, i3 = (e6 = (e6 || "").toString()).length, n3 = "";
            for (; o4 < i3; ) {
              if (a4 = e6.substr(o4, r5), a4.length < r5) {
                n3 += a4;
                break;
              }
              (s6 = a4.match(/^[^\n\r]*(\r?\n|\r)/)) ? (a4 = s6[0], n3 += a4, o4 += a4.length) : ((s6 = a4.match(/(\s+)[^\s]*$/)) && s6[0].length - (s6[1] || "").length < a4.length ? a4 = a4.substr(0, a4.length - (s6[0].length - (s6[1] || "").length)) : (s6 = e6.substr(o4 + a4.length).match(/^[^\s]+(\s*)/)) && (a4 += s6[0].substr(0, s6[0].length - 0)), n3 += a4, o4 += a4.length, o4 < i3 && (n3 += "\r\n"));
            }
            return n3;
          }(e5.val, 80).split(/\r?\n/).map((e6) => e6.trim()).map((e6, r5) => `${r5 ? s5 : a3}${e6}`);
        });
        let a2 = r3.map((e5) => e5.length).reduce((e5, r4) => r4 > e5 ? r4 : e5, 0), s4 = "-".repeat(a2);
        return `
${s4}
${r3.join("\n")}
${s4}
`;
      }
      function x(e4) {
        let r3 = [];
        if (e4.from && r3.push(`<div class="postal-email-header-key">From</div><div class="postal-email-header-value">${w(e4.from)}</div>`), e4.subject && r3.push(`<div class="postal-email-header-key">Subject</div><div class="postal-email-header-value postal-email-header-subject">${b(e4.subject)}</div>`), e4.date) {
          let t3 = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false }, a2 = "undefined" == typeof Intl ? e4.date : new Intl.DateTimeFormat("default", t3).format(new Date(e4.date));
          r3.push(`<div class="postal-email-header-key">Date</div><div class="postal-email-header-value postal-email-header-date" data-date="${b(e4.date)}">${b(a2)}</div>`);
        }
        return e4.to && e4.to.length && r3.push(`<div class="postal-email-header-key">To</div><div class="postal-email-header-value">${q(e4.to)}</div>`), e4.cc && e4.cc.length && r3.push(`<div class="postal-email-header-key">Cc</div><div class="postal-email-header-value">${q(e4.cc)}</div>`), e4.bcc && e4.bcc.length && r3.push(`<div class="postal-email-header-key">Bcc</div><div class="postal-email-header-value">${q(e4.bcc)}</div>`), `<div class="postal-email-header">${r3.length ? '<div class="postal-email-header-row">' : ""}${r3.join('</div>\n<div class="postal-email-header-row">')}${r3.length ? "</div>" : ""}</div>`;
      }
      class E {
        constructor(e4) {
          this.str = (e4 || "").toString(), this.operatorCurrent = "", this.operatorExpecting = "", this.node = null, this.escaped = false, this.list = [], this.operators = { '"': '"', "(": ")", "<": ">", ",": "", ":": ";", ";": "" };
        }
        tokenize() {
          let e4, r3 = [];
          for (let r4 = 0, t3 = this.str.length; r4 < t3; r4++)
            e4 = this.str.charAt(r4), this.checkChar(e4);
          return this.list.forEach((e5) => {
            e5.value = (e5.value || "").toString().trim(), e5.value && r3.push(e5);
          }), r3;
        }
        checkChar(e4) {
          if (this.escaped)
            ;
          else {
            if (e4 === this.operatorExpecting)
              return this.node = { type: "operator", value: e4 }, this.list.push(this.node), this.node = null, this.operatorExpecting = "", void (this.escaped = false);
            if (!this.operatorExpecting && e4 in this.operators)
              return this.node = { type: "operator", value: e4 }, this.list.push(this.node), this.node = null, this.operatorExpecting = this.operators[e4], void (this.escaped = false);
            if (['"', "'"].includes(this.operatorExpecting) && "\\" === e4)
              return void (this.escaped = true);
          }
          this.node || (this.node = { type: "text", value: "" }, this.list.push(this.node)), "\n" === e4 && (e4 = " "), (e4.charCodeAt(0) >= 33 || [" ", "	"].includes(e4)) && (this.node.value += e4), this.escaped = false;
        }
      }
      const D = function e4(r3, t3) {
        t3 = t3 || {};
        let a2 = new E(r3).tokenize(), s4 = [], o4 = [], i3 = [];
        if (a2.forEach((e5) => {
          "operator" !== e5.type || "," !== e5.value && ";" !== e5.value ? o4.push(e5) : (o4.length && s4.push(o4), o4 = []);
        }), o4.length && s4.push(o4), s4.forEach((r4) => {
          r4 = function(r5) {
            let t4, a3, s5, o5, i4 = false, n3 = "text", l4 = [], c4 = { address: [], comment: [], group: [], text: [] };
            for (s5 = 0, o5 = r5.length; s5 < o5; s5++)
              if (t4 = r5[s5], "operator" === t4.type)
                switch (t4.value) {
                  case "<":
                    n3 = "address";
                    break;
                  case "(":
                    n3 = "comment";
                    break;
                  case ":":
                    n3 = "group", i4 = true;
                    break;
                  default:
                    n3 = "text";
                }
              else
                t4.value && ("address" === n3 && (t4.value = t4.value.replace(/^[^<]*<\s*/, "")), c4[n3].push(t4.value));
            if (!c4.text.length && c4.comment.length && (c4.text = c4.comment, c4.comment = []), i4)
              c4.text = c4.text.join(" "), l4.push({ name: p2(c4.text || a3 && a3.name), group: c4.group.length ? e4(c4.group.join(",")) : [] });
            else {
              if (!c4.address.length && c4.text.length) {
                for (s5 = c4.text.length - 1; s5 >= 0; s5--)
                  if (c4.text[s5].match(/^[^@\s]+@[^@\s]+$/)) {
                    c4.address = c4.text.splice(s5, 1);
                    break;
                  }
                let e5 = function(e6) {
                  return c4.address.length ? e6 : (c4.address = [e6.trim()], " ");
                };
                if (!c4.address.length)
                  for (s5 = c4.text.length - 1; s5 >= 0 && (c4.text[s5] = c4.text[s5].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, e5).trim(), !c4.address.length); s5--)
                    ;
              }
              if (!c4.text.length && c4.comment.length && (c4.text = c4.comment, c4.comment = []), c4.address.length > 1 && (c4.text = c4.text.concat(c4.address.splice(1))), c4.text = c4.text.join(" "), c4.address = c4.address.join(" "), !c4.address && i4)
                return [];
              a3 = { address: c4.address || c4.text || "", name: p2(c4.text || c4.address || "") }, a3.address === a3.name && ((a3.address || "").match(/@/) ? a3.name = "" : a3.address = ""), l4.push(a3);
            }
            return l4;
          }(r4), r4.length && (i3 = i3.concat(r4));
        }), t3.flatten) {
          let e5 = [], r4 = (t4) => {
            t4.forEach((t5) => {
              if (t5.group)
                return r4(t5.group);
              e5.push(t5);
            });
          };
          return r4(i3), e5;
        }
        return i3;
      };
      class T {
        constructor() {
          this.root = this.currentNode = new m({ postalMime: this }), this.boundaries = [], this.textContent = {}, this.attachments = [], this.started = false;
        }
        async finalize() {
          await this.root.finalize();
        }
        async processLine(e4, r3) {
          let t3 = this.boundaries;
          if (t3.length && e4.length > 2 && 45 === e4[0] && 45 === e4[1])
            for (let a2 = t3.length - 1; a2 >= 0; a2--) {
              let s4 = t3[a2];
              if (e4.length !== s4.value.length + 2 && e4.length !== s4.value.length + 4)
                continue;
              let o4 = e4.length === s4.value.length + 4;
              if (o4 && (45 !== e4[e4.length - 2] || 45 !== e4[e4.length - 1]))
                continue;
              let i3 = true;
              for (let r4 = 0; r4 < s4.value.length; r4++)
                if (e4[r4 + 2] !== s4.value[r4]) {
                  i3 = false;
                  break;
                }
              if (i3)
                return o4 ? (await s4.node.finalize(), this.currentNode = s4.node.parentNode || this.root) : (await s4.node.finalizeChildNodes(), this.currentNode = new m({ postalMime: this, parentNode: s4.node })), r3 ? this.finalize() : void 0;
            }
          if (this.currentNode.feed(e4), r3)
            return this.finalize();
        }
        readLine() {
          let e4 = this.readPos, r3 = this.readPos, t3 = () => ({ bytes: new Uint8Array(this.buf, e4, r3 - e4), done: this.readPos >= this.av.length });
          for (; this.readPos < this.av.length; ) {
            const e5 = this.av[this.readPos++];
            if (13 !== e5 && 10 !== e5 && (r3 = this.readPos), 10 === e5)
              return t3();
          }
          return t3();
        }
        async processNodeTree() {
          let e4 = {}, r3 = /* @__PURE__ */ new Set(), t3 = this.textMap = /* @__PURE__ */ new Map(), a2 = async (e5, s4, o4) => {
            if (s4 = s4 || false, o4 = o4 || false, e5.contentType.multipart)
              "alternative" === e5.contentType.multipart ? s4 = e5 : "related" === e5.contentType.multipart && (o4 = e5);
            else if ("message/rfc822" === e5.contentType.parsed.value && "attachment" !== e5.contentDisposition.parsed.value) {
              const a3 = new T();
              e5.subMessage = await a3.parse(e5.content), t3.has(e5) || t3.set(e5, {});
              let s5 = t3.get(e5);
              !e5.subMessage.text && e5.subMessage.html || (s5.plain = s5.plain || [], s5.plain.push({ type: "subMessage", value: e5.subMessage }), r3.add("plain")), e5.subMessage.html && (s5.html = s5.html || [], s5.html.push({ type: "subMessage", value: e5.subMessage }), r3.add("html")), a3.textMap && a3.textMap.forEach((e6, r4) => {
                t3.set(r4, e6);
              });
              for (let r4 of e5.subMessage.attachments || [])
                this.attachments.push(r4);
            } else if (!/^text\//i.test(e5.contentType.parsed.value) && "message/delivery-status" !== e5.contentType.parsed.value || "attachment" === e5.contentDisposition.parsed.value) {
              if (e5.content) {
                let r4 = { filename: p2(e5.contentDisposition.parsed.params.filename || e5.contentType.parsed.params.name || null), mimeType: e5.contentType.parsed.value, disposition: e5.contentDisposition.parsed.value || null };
                o4 && e5.contentId && (r4.related = true), e5.contentId && (r4.contentId = e5.contentId), r4.content = e5.content, this.attachments.push(r4);
              }
            } else {
              let a3 = e5.contentType.parsed.value.substr(e5.contentType.parsed.value.indexOf("/") + 1);
              "message/delivery-status" === e5.contentType.parsed.value && (a3 = "plain");
              let o5 = s4 || e5;
              t3.has(o5) || t3.set(o5, {});
              let i3 = t3.get(o5);
              i3[a3] = i3[a3] || [], i3[a3].push({ type: "text", value: e5.getTextContent() }), r3.add(a3);
            }
            for (let r4 of e5.childNodes)
              await a2(r4, s4, o4);
          };
          await a2(this.root, false, []), t3.forEach((t4) => {
            r3.forEach((r4) => {
              if (e4[r4] || (e4[r4] = []), t4[r4])
                t4[r4].forEach((t5) => {
                  switch (t5.type) {
                    case "text":
                      e4[r4].push(t5.value);
                      break;
                    case "subMessage":
                      switch (r4) {
                        case "html":
                          e4[r4].push(x(t5.value));
                          break;
                        case "plain":
                          e4[r4].push(k(t5.value));
                      }
                  }
                });
              else {
                let a3;
                switch (r4) {
                  case "html":
                    a3 = "plain";
                    break;
                  case "plain":
                    a3 = "html";
                }
                (t4[a3] || []).forEach((t5) => {
                  switch (t5.type) {
                    case "text":
                      switch (r4) {
                        case "html":
                          e4[r4].push("<div>" + b(t5.value).replace(/\n/g, "<br />") + "</div>");
                          break;
                        case "plain":
                          e4[r4].push(function(e5) {
                            return e5.replace(/&(#\d+|#x[a-f0-9]+|[a-z]+\d*);?/gi, (e6, r5) => {
                              if ("string" == typeof f[e6])
                                return f[e6];
                              if ("#" !== r5.charAt(0) || ";" !== e6.charAt(e6.length - 1))
                                return e6;
                              let t6;
                              t6 = "x" === r5.charAt(1) ? parseInt(r5.substr(2), 16) : parseInt(r5.substr(1), 10);
                              var a4 = "";
                              return t6 >= 55296 && t6 <= 57343 || t6 > 1114111 ? "\uFFFD" : (t6 > 65535 && (t6 -= 65536, a4 += String.fromCharCode(t6 >>> 10 & 1023 | 55296), t6 = 56320 | 1023 & t6), a4 += String.fromCharCode(t6));
                            });
                          }(t5.value.replace(/\r?\n/g, "").replace(/<\!\-\-.*?\-\->/gi, " ").replace(/<br\b[^>]*>/gi, "\n").replace(/<\/?(p|div|table|tr|td|th)\b[^>]*>/gi, "\n\n").replace(/<script\b[^>]*>.*?<\/script\b[^>]*>/gi, " ").replace(/^.*<body\b[^>]*>/i, "").replace(/^.*<\/head\b[^>]*>/i, "").replace(/^.*<\!doctype\b[^>]*>/i, "").replace(/<\/body\b[^>]*>.*$/i, "").replace(/<\/html\b[^>]*>.*$/i, "").replace(/<a\b[^>]*href\s*=\s*["']?([^\s"']+)[^>]*>/gi, " ($1) ").replace(/<\/?(span|em|i|strong|b|u|a)\b[^>]*>/gi, "").replace(/<li\b[^>]*>[\n\u0001\s]*/gi, "* ").replace(/<hr\b[^>]*>/g, "\n-------------\n").replace(/<[^>]*>/g, " ").replace(/\u0001/g, "\n").replace(/[ \t]+/g, " ").replace(/^\s+$/gm, "").replace(/\n\n+/g, "\n\n").replace(/^\n+/, "\n").replace(/\n+$/, "\n")));
                      }
                      break;
                    case "subMessage":
                      switch (r4) {
                        case "html":
                          e4[r4].push(x(t5.value));
                          break;
                        case "plain":
                          e4[r4].push(k(t5.value));
                      }
                  }
                });
              }
            });
          }), Object.keys(e4).forEach((r4) => {
            e4[r4] = e4[r4].join("\n");
          }), this.textContent = e4;
        }
        async parse(e4) {
          if (this.started)
            throw new Error("Can not reuse parser, create a new PostalMime object");
          for (this.started = true, "string" == typeof (e4 = e4 || ArrayBuffer(0)) && (e4 = t2.encode(e4)), (e4 instanceof Blob || "[object Blob]" === Object.prototype.toString.call(e4)) && (e4 = await c3(e4)), e4.buffer instanceof ArrayBuffer && (e4 = new Uint8Array(e4).buffer), this.buf = e4, this.av = new Uint8Array(e4), this.readPos = 0; this.readPos < this.av.length; ) {
            const e5 = this.readLine();
            await this.processLine(e5.bytes, e5.done);
          }
          await this.processNodeTree();
          let r3 = { headers: this.root.headers.map((e5) => ({ key: e5.key, value: e5.value })).reverse() };
          for (let e5 of ["from", "sender", "reply-to"]) {
            let t3 = this.root.headers.find((r4) => r4.key === e5);
            if (t3 && t3.value) {
              let a3 = D(t3.value);
              a3 && a3.length && (r3[e5.replace(/\-(.)/g, (e6, r4) => r4.toUpperCase())] = a3[0]);
            }
          }
          for (let e5 of ["delivered-to", "return-path"]) {
            let t3 = this.root.headers.find((r4) => r4.key === e5);
            if (t3 && t3.value) {
              let a3 = D(t3.value);
              a3 && a3.length && a3[0].address && (r3[e5.replace(/\-(.)/g, (e6, r4) => r4.toUpperCase())] = a3[0].address);
            }
          }
          for (let e5 of ["to", "cc", "bcc"]) {
            let t3 = this.root.headers.filter((r4) => r4.key === e5), a3 = [];
            t3.filter((e6) => e6 && e6.value).map((e6) => D(e6.value)).forEach((e6) => a3 = a3.concat(e6 || [])), a3 && a3.length && (r3[e5] = a3);
          }
          for (let e5 of ["subject", "message-id", "in-reply-to", "references"]) {
            let t3 = this.root.headers.find((r4) => r4.key === e5);
            t3 && t3.value && (r3[e5.replace(/\-(.)/g, (e6, r4) => r4.toUpperCase())] = p2(t3.value));
          }
          let a2 = this.root.headers.find((e5) => "date" === e5.key);
          if (a2) {
            let e5 = new Date(a2.value);
            e5 = e5 && "Invalid Date" !== e5.toString() ? e5.toISOString() : a2.value, r3.date = e5;
          }
          return this.textContent && this.textContent.html && (r3.html = this.textContent.html), this.textContent && this.textContent.plain && (r3.text = this.textContent.plain), r3.attachments = this.attachments, r3;
        }
      }
      return r2;
    })());
  }
});

// node_modules/itty-router/index.mjs
var e = ({ base: e3 = "", routes: t2 = [] } = {}) => ({ __proto__: new Proxy({}, { get: (o3, s3, r2, n2) => (o4, ...a) => t2.push([s3.toUpperCase(), RegExp(`^${(n2 = (e3 + o4).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), a, n2]) && r2 }), routes: t2, async handle(e4, ...o3) {
  let s3, r2, n2 = new URL(e4.url), a = e4.query = { __proto__: null };
  for (let [e5, t3] of n2.searchParams)
    a[e5] = void 0 === a[e5] ? t3 : [a[e5], t3].flat();
  for (let [a2, c3, l3, i2] of t2)
    if ((a2 === e4.method || "ALL" === a2) && (r2 = n2.pathname.match(c3))) {
      e4.params = r2.groups || {}, e4.route = i2;
      for (let t3 of l3)
        if (void 0 !== (s3 = await t3(e4.proxy || e4, ...o3)))
          return s3;
    }
} });
var o = (e3 = "text/plain; charset=utf-8", t2) => (o3, s3) => {
  const { headers: r2 = {}, ...n2 } = s3 || {};
  return "Response" === o3?.constructor.name ? o3 : new Response(t2 ? t2(o3) : o3, { headers: { "content-type": e3, ...r2 }, ...n2 });
};
var s = o("application/json; charset=utf-8", JSON.stringify);
var c = o("text/plain; charset=utf-8", String);
var l = o("text/html");
var i = o("image/jpeg");
var p = o("image/png");
var d = o("image/webp");

// node_modules/domelementtype/lib/esm/index.js
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
var Root = ElementType.Root;
var Text = ElementType.Text;
var Directive = ElementType.Directive;
var Comment = ElementType.Comment;
var Script = ElementType.Script;
var Style = ElementType.Style;
var Tag = ElementType.Tag;
var CDATA = ElementType.CDATA;
var Doctype = ElementType.Doctype;

// node_modules/domhandler/lib/esm/node.js
var Node = class {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev) {
    this.prev = prev;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next) {
    this.next = next;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
};
var DataNode = class extends Node {
  /**
   * @param data The content of the data node
   */
  constructor(data) {
    super();
    this.data = data;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data) {
    this.data = data;
  }
};
var Text2 = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
};
var Comment2 = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
};
var ProcessingInstruction = class extends DataNode {
  constructor(name2, data) {
    super(data);
    this.name = name2;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
};
var NodeWithChildren = class extends Node {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children) {
    super();
    this.children = children;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var _a2;
    return (_a2 = this.children[0]) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
};
var CDATA2 = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
};
var Document = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
};
var Element = class extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(name2, attribs, children = [], type = name2 === "script" ? ElementType.Script : name2 === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    this.name = name2;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name2) {
    this.name = name2;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name2) => {
      var _a2, _b;
      return {
        name: name2,
        value: this.attribs[name2],
        namespace: (_a2 = this["x-attribsNamespace"]) === null || _a2 === void 0 ? void 0 : _a2[name2],
        prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name2]
      };
    });
  }
};
function isTag2(node) {
  return isTag(node);
}
function isCDATA(node) {
  return node.type === ElementType.CDATA;
}
function isText(node) {
  return node.type === ElementType.Text;
}
function isComment(node) {
  return node.type === ElementType.Comment;
}
function isDirective(node) {
  return node.type === ElementType.Directive;
}
function isDocument(node) {
  return node.type === ElementType.Root;
}
function cloneNode(node, recursive = false) {
  let result;
  if (isText(node)) {
    result = new Text2(node.data);
  } else if (isComment(node)) {
    result = new Comment2(node.data);
  } else if (isTag2(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new Element(node.name, { ...node.attribs }, children);
    children.forEach((child) => child.parent = clone);
    if (node.namespace != null) {
      clone.namespace = node.namespace;
    }
    if (node["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
    }
    if (node["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
    }
    result = clone;
  } else if (isCDATA(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new CDATA2(children);
    children.forEach((child) => child.parent = clone);
    result = clone;
  } else if (isDocument(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new Document(children);
    children.forEach((child) => child.parent = clone);
    if (node["x-mode"]) {
      clone["x-mode"] = node["x-mode"];
    }
    result = clone;
  } else if (isDirective(node)) {
    const instruction = new ProcessingInstruction(node.name, node.data);
    if (node["x-name"] != null) {
      instruction["x-name"] = node["x-name"];
      instruction["x-publicId"] = node["x-publicId"];
      instruction["x-systemId"] = node["x-systemId"];
    }
    result = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node.type}`);
  }
  result.startIndex = node.startIndex;
  result.endIndex = node.endIndex;
  if (node.sourceCodeLocation != null) {
    result.sourceCodeLocation = node.sourceCodeLocation;
  }
  return result;
}
function cloneChildren(childs) {
  const children = childs.map((child) => cloneNode(child, true));
  for (let i2 = 1; i2 < children.length; i2++) {
    children[i2].prev = children[i2 - 1];
    children[i2 - 1].next = children[i2];
  }
  return children;
}

// node_modules/domhandler/lib/esm/index.js
var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
var DomHandler = class {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    if (typeof callback === "object") {
      options = callback;
      callback = void 0;
    }
    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options !== null && options !== void 0 ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }
  onparserinit(parser) {
    this.parser = parser;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(elem);
  }
  onopentag(name2, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element(name2, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node = new Text2(data);
      this.addNode(node);
      this.lastNode = node;
    }
  }
  oncomment(data) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }
    const node = new Comment2(data);
    this.addNode(node);
    this.lastNode = node;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text = new Text2("");
    const node = new CDATA2([text]);
    this.addNode(node);
    text.parent = node;
    this.lastNode = text;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name2, data) {
    const node = new ProcessingInstruction(name2, data);
    this.addNode(node);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices) {
      node.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node.endIndex = this.parser.endIndex;
    }
    parent.children.push(node);
    if (previousSibling) {
      node.prev = previousSibling;
      previousSibling.next = node;
    }
    node.parent = parent;
    this.lastNode = null;
  }
};

// node_modules/leac/lib/leac.mjs
var e2 = /\n/g;
function n(n2) {
  const o3 = [...n2.matchAll(e2)].map((e3) => e3.index || 0);
  o3.unshift(-1);
  const s3 = t(o3, 0, o3.length);
  return (e3) => r(s3, e3);
}
function t(e3, n2, r2) {
  if (r2 - n2 == 1)
    return { offset: e3[n2], index: n2 + 1 };
  const o3 = Math.ceil((n2 + r2) / 2), s3 = t(e3, n2, o3), l3 = t(e3, o3, r2);
  return { offset: s3.offset, low: s3, high: l3 };
}
function r(e3, n2) {
  return function(e4) {
    return Object.prototype.hasOwnProperty.call(e4, "index");
  }(e3) ? { line: e3.index, column: n2 - e3.offset } : r(e3.high.offset < n2 ? e3.high : e3.low, n2);
}
function o2(e3, t2 = "", r2 = {}) {
  const o3 = "string" != typeof t2 ? t2 : r2, l3 = "string" == typeof t2 ? t2 : "", c3 = e3.map(s2), f = !!o3.lineNumbers;
  return function(e4, t3 = 0) {
    const r3 = f ? n(e4) : () => ({ line: 0, column: 0 });
    let o4 = t3;
    const s3 = [];
    e:
      for (; o4 < e4.length; ) {
        let n2 = false;
        for (const t4 of c3) {
          t4.regex.lastIndex = o4;
          const c4 = t4.regex.exec(e4);
          if (c4 && c4[0].length > 0) {
            if (!t4.discard) {
              const e5 = r3(o4), n3 = "string" == typeof t4.replace ? c4[0].replace(new RegExp(t4.regex.source, t4.regex.flags), t4.replace) : c4[0];
              s3.push({ state: l3, name: t4.name, text: n3, offset: o4, len: c4[0].length, line: e5.line, column: e5.column });
            }
            if (o4 = t4.regex.lastIndex, n2 = true, t4.push) {
              const n3 = t4.push(e4, o4);
              s3.push(...n3.tokens), o4 = n3.offset;
            }
            if (t4.pop)
              break e;
            break;
          }
        }
        if (!n2)
          break;
      }
    return { tokens: s3, offset: o4, complete: e4.length <= o4 };
  };
}
function s2(e3, n2) {
  return { ...e3, regex: l2(e3, n2) };
}
function l2(e3, n2) {
  if (0 === e3.name.length)
    throw new Error(`Rule #${n2} has empty name, which is not allowed.`);
  if (function(e4) {
    return Object.prototype.hasOwnProperty.call(e4, "regex");
  }(e3))
    return function(e4) {
      if (e4.global)
        throw new Error(`Regular expression /${e4.source}/${e4.flags} contains the global flag, which is not allowed.`);
      return e4.sticky ? e4 : new RegExp(e4.source, e4.flags + "y");
    }(e3.regex);
  if (function(e4) {
    return Object.prototype.hasOwnProperty.call(e4, "str");
  }(e3)) {
    if (0 === e3.str.length)
      throw new Error(`Rule #${n2} ("${e3.name}") has empty "str" property, which is not allowed.`);
    return new RegExp(c2(e3.str), "y");
  }
  return new RegExp(c2(e3.name), "y");
}
function c2(e3) {
  return e3.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, "\\$&");
}

// node_modules/peberminta/lib/core.mjs
function token(onToken, onEnd) {
  return (data, i2) => {
    let position = i2;
    let value = void 0;
    if (i2 < data.tokens.length) {
      value = onToken(data.tokens[i2], data, i2);
      if (value !== void 0) {
        position++;
      }
    } else {
      onEnd?.(data, i2);
    }
    return value === void 0 ? { matched: false } : {
      matched: true,
      position,
      value
    };
  };
}
function mapInner(r2, f) {
  return r2.matched ? {
    matched: true,
    position: r2.position,
    value: f(r2.value, r2.position)
  } : r2;
}
function mapOuter(r2, f) {
  return r2.matched ? f(r2) : r2;
}
function map(p2, mapper) {
  return (data, i2) => mapInner(p2(data, i2), (v, j) => mapper(v, data, i2, j));
}
function option(p2, def) {
  return (data, i2) => {
    const r2 = p2(data, i2);
    return r2.matched ? r2 : {
      matched: true,
      position: i2,
      value: def
    };
  };
}
function choice(...ps) {
  return (data, i2) => {
    for (const p2 of ps) {
      const result = p2(data, i2);
      if (result.matched) {
        return result;
      }
    }
    return { matched: false };
  };
}
function otherwise(pa, pb) {
  return (data, i2) => {
    const r1 = pa(data, i2);
    return r1.matched ? r1 : pb(data, i2);
  };
}
function takeWhile(p2, test) {
  return (data, i2) => {
    const values = [];
    let success = true;
    do {
      const r2 = p2(data, i2);
      if (r2.matched && test(r2.value, values.length + 1, data, i2, r2.position)) {
        values.push(r2.value);
        i2 = r2.position;
      } else {
        success = false;
      }
    } while (success);
    return {
      matched: true,
      position: i2,
      value: values
    };
  };
}
function many(p2) {
  return takeWhile(p2, () => true);
}
function many1(p2) {
  return ab(p2, many(p2), (head, tail) => [head, ...tail]);
}
function ab(pa, pb, join) {
  return (data, i2) => mapOuter(pa(data, i2), (ma) => mapInner(pb(data, ma.position), (vb, j) => join(ma.value, vb, data, i2, j)));
}
function left(pa, pb) {
  return ab(pa, pb, (va) => va);
}
function right(pa, pb) {
  return ab(pa, pb, (va, vb) => vb);
}
function abc(pa, pb, pc, join) {
  return (data, i2) => mapOuter(pa(data, i2), (ma) => mapOuter(pb(data, ma.position), (mb) => mapInner(pc(data, mb.position), (vc, j) => join(ma.value, mb.value, vc, data, i2, j))));
}
function middle(pa, pb, pc) {
  return abc(pa, pb, pc, (ra, rb) => rb);
}
function all(...ps) {
  return (data, i2) => {
    const result = [];
    let position = i2;
    for (const p2 of ps) {
      const r1 = p2(data, position);
      if (r1.matched) {
        result.push(r1.value);
        position = r1.position;
      } else {
        return { matched: false };
      }
    }
    return {
      matched: true,
      position,
      value: result
    };
  };
}
function flatten(...ps) {
  return flatten1(all(...ps));
}
function flatten1(p2) {
  return map(p2, (vs) => vs.flatMap((v) => v));
}
function chainReduce(acc, f) {
  return (data, i2) => {
    let loop = true;
    let acc1 = acc;
    let pos = i2;
    do {
      const r2 = f(acc1, data, pos)(data, pos);
      if (r2.matched) {
        acc1 = r2.value;
        pos = r2.position;
      } else {
        loop = false;
      }
    } while (loop);
    return {
      matched: true,
      position: pos,
      value: acc1
    };
  };
}
function reduceLeft(acc, p2, reducer) {
  return chainReduce(acc, (acc2) => map(p2, (v, data, i2, j) => reducer(acc2, v, data, i2, j)));
}
function leftAssoc2(pLeft, pOper, pRight) {
  return chain(pLeft, (v0) => reduceLeft(v0, ab(pOper, pRight, (f, y) => [f, y]), (acc, [f, y]) => f(acc, y)));
}
function chain(p2, f) {
  return (data, i2) => mapOuter(p2(data, i2), (m1) => f(m1.value, data, i2, m1.position)(data, m1.position));
}

// node_modules/parseley/lib/parseley.mjs
var ws = `(?:[ \\t\\r\\n\\f]*)`;
var nl = `(?:\\n|\\r\\n|\\r|\\f)`;
var nonascii = `[^\\x00-\\x7F]`;
var unicode = `(?:\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?)`;
var escape = `(?:\\\\[^\\n\\r\\f0-9a-f])`;
var nmstart = `(?:[_a-z]|${nonascii}|${unicode}|${escape})`;
var nmchar = `(?:[_a-z0-9-]|${nonascii}|${unicode}|${escape})`;
var name = `(?:${nmchar}+)`;
var ident = `(?:[-]?${nmstart}${nmchar}*)`;
var string1 = `'([^\\n\\r\\f\\\\']|\\\\${nl}|${nonascii}|${unicode}|${escape})*'`;
var string2 = `"([^\\n\\r\\f\\\\"]|\\\\${nl}|${nonascii}|${unicode}|${escape})*"`;
var lexSelector = o2([
  { name: "ws", regex: new RegExp(ws) },
  { name: "hash", regex: new RegExp(`#${name}`, "i") },
  { name: "ident", regex: new RegExp(ident, "i") },
  { name: "str1", regex: new RegExp(string1, "i") },
  { name: "str2", regex: new RegExp(string2, "i") },
  { name: "*" },
  { name: "." },
  { name: "," },
  { name: "[" },
  { name: "]" },
  { name: "=" },
  { name: ">" },
  { name: "|" },
  { name: "+" },
  { name: "~" },
  { name: "^" },
  { name: "$" }
]);
var lexEscapedString = o2([
  { name: "unicode", regex: new RegExp(unicode, "i") },
  { name: "escape", regex: new RegExp(escape, "i") },
  { name: "any", regex: new RegExp("[\\s\\S]", "i") }
]);
function sumSpec([a0, a1, a2], [b0, b1, b2]) {
  return [a0 + b0, a1 + b1, a2 + b2];
}
function sumAllSpec(ss) {
  return ss.reduce(sumSpec, [0, 0, 0]);
}
var unicodeEscapedSequence_ = token((t2) => t2.name === "unicode" ? String.fromCodePoint(parseInt(t2.text.slice(1), 16)) : void 0);
var escapedSequence_ = token((t2) => t2.name === "escape" ? t2.text.slice(1) : void 0);
var anyChar_ = token((t2) => t2.name === "any" ? t2.text : void 0);
var escapedString_ = map(many(choice(unicodeEscapedSequence_, escapedSequence_, anyChar_)), (cs) => cs.join(""));
function unescape(escapedString) {
  const lexerResult = lexEscapedString(escapedString);
  const result = escapedString_({ tokens: lexerResult.tokens, options: void 0 }, 0);
  return result.value;
}
function literal(name2) {
  return token((t2) => t2.name === name2 ? true : void 0);
}
var whitespace_ = token((t2) => t2.name === "ws" ? null : void 0);
var optionalWhitespace_ = option(whitespace_, null);
function optionallySpaced(parser) {
  return middle(optionalWhitespace_, parser, optionalWhitespace_);
}
var identifier_ = token((t2) => t2.name === "ident" ? unescape(t2.text) : void 0);
var hashId_ = token((t2) => t2.name === "hash" ? unescape(t2.text.slice(1)) : void 0);
var string_ = token((t2) => t2.name.startsWith("str") ? unescape(t2.text.slice(1, -1)) : void 0);
var namespace_ = left(option(identifier_, ""), literal("|"));
var qualifiedName_ = otherwise(ab(namespace_, identifier_, (ns, name2) => ({ name: name2, namespace: ns })), map(identifier_, (name2) => ({ name: name2, namespace: null })));
var uniSelector_ = otherwise(ab(namespace_, literal("*"), (ns) => ({ type: "universal", namespace: ns, specificity: [0, 0, 0] })), map(literal("*"), () => ({ type: "universal", namespace: null, specificity: [0, 0, 0] })));
var tagSelector_ = map(qualifiedName_, ({ name: name2, namespace }) => ({
  type: "tag",
  name: name2,
  namespace,
  specificity: [0, 0, 1]
}));
var classSelector_ = ab(literal("."), identifier_, (fullstop, name2) => ({
  type: "class",
  name: name2,
  specificity: [0, 1, 0]
}));
var idSelector_ = map(hashId_, (name2) => ({
  type: "id",
  name: name2,
  specificity: [1, 0, 0]
}));
var attrModifier_ = token((t2) => {
  if (t2.name === "ident") {
    if (t2.text === "i" || t2.text === "I") {
      return "i";
    }
    if (t2.text === "s" || t2.text === "S") {
      return "s";
    }
  }
  return void 0;
});
var attrValue_ = otherwise(ab(string_, option(right(optionalWhitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })), ab(identifier_, option(right(whitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })));
var attrMatcher_ = choice(map(literal("="), () => "="), ab(literal("~"), literal("="), () => "~="), ab(literal("|"), literal("="), () => "|="), ab(literal("^"), literal("="), () => "^="), ab(literal("$"), literal("="), () => "$="), ab(literal("*"), literal("="), () => "*="));
var attrPresenceSelector_ = abc(literal("["), optionallySpaced(qualifiedName_), literal("]"), (lbr, { name: name2, namespace }) => ({
  type: "attrPresence",
  name: name2,
  namespace,
  specificity: [0, 1, 0]
}));
var attrValueSelector_ = middle(literal("["), abc(optionallySpaced(qualifiedName_), attrMatcher_, optionallySpaced(attrValue_), ({ name: name2, namespace }, matcher, { value, modifier }) => ({
  type: "attrValue",
  name: name2,
  namespace,
  matcher,
  value,
  modifier,
  specificity: [0, 1, 0]
})), literal("]"));
var attrSelector_ = otherwise(attrPresenceSelector_, attrValueSelector_);
var typeSelector_ = otherwise(uniSelector_, tagSelector_);
var subclassSelector_ = choice(idSelector_, classSelector_, attrSelector_);
var compoundSelector_ = map(otherwise(flatten(typeSelector_, many(subclassSelector_)), many1(subclassSelector_)), (ss) => {
  return {
    type: "compound",
    list: ss,
    specificity: sumAllSpec(ss.map((s3) => s3.specificity))
  };
});
var combinator_ = choice(map(literal(">"), () => ">"), map(literal("+"), () => "+"), map(literal("~"), () => "~"), ab(literal("|"), literal("|"), () => "||"));
var combinatorSeparator_ = otherwise(optionallySpaced(combinator_), map(whitespace_, () => " "));
var complexSelector_ = leftAssoc2(compoundSelector_, map(combinatorSeparator_, (c3) => (left2, right2) => ({
  type: "compound",
  list: [...right2.list, { type: "combinator", combinator: c3, left: left2, specificity: left2.specificity }],
  specificity: sumSpec(left2.specificity, right2.specificity)
})), compoundSelector_);
var listSelector_ = leftAssoc2(map(complexSelector_, (s3) => ({ type: "list", list: [s3] })), map(optionallySpaced(literal(",")), () => (acc, next) => ({ type: "list", list: [...acc.list, next] })), complexSelector_);
function parse_(parser, str) {
  if (!(typeof str === "string" || str instanceof String)) {
    throw new Error("Expected a selector string. Actual input is not a string!");
  }
  const lexerResult = lexSelector(str);
  if (!lexerResult.complete) {
    throw new Error(`The input "${str}" was only partially tokenized, stopped at offset ${lexerResult.offset}!
` + prettyPrintPosition(str, lexerResult.offset));
  }
  const result = optionallySpaced(parser)({ tokens: lexerResult.tokens, options: void 0 }, 0);
  if (!result.matched) {
    throw new Error(`No match for "${str}" input!`);
  }
  if (result.position < lexerResult.tokens.length) {
    const token2 = lexerResult.tokens[result.position];
    throw new Error(`The input "${str}" was only partially parsed, stopped at offset ${token2.offset}!
` + prettyPrintPosition(str, token2.offset, token2.len));
  }
  return result.value;
}
function prettyPrintPosition(str, offset, len = 1) {
  return `${str.replace(/(\t)|(\r)|(\n)/g, (m, t2, r2) => t2 ? "\u2409" : r2 ? "\u240D" : "\u240A")}
${"".padEnd(offset)}${"^".repeat(len)}`;
}
function parse1(str) {
  return parse_(complexSelector_, str);
}
function serialize(selector) {
  if (!selector.type) {
    throw new Error("This is not an AST node.");
  }
  switch (selector.type) {
    case "universal":
      return _serNs(selector.namespace) + "*";
    case "tag":
      return _serNs(selector.namespace) + _serIdent(selector.name);
    case "class":
      return "." + _serIdent(selector.name);
    case "id":
      return "#" + _serIdent(selector.name);
    case "attrPresence":
      return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}]`;
    case "attrValue":
      return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}${selector.matcher}"${_serStr(selector.value)}"${selector.modifier ? selector.modifier : ""}]`;
    case "combinator":
      return serialize(selector.left) + selector.combinator;
    case "compound":
      return selector.list.reduce((acc, node) => {
        if (node.type === "combinator") {
          return serialize(node) + acc;
        } else {
          return acc + serialize(node);
        }
      }, "");
    case "list":
      return selector.list.map(serialize).join(",");
  }
}
function _serNs(ns) {
  return ns || ns === "" ? _serIdent(ns) + "|" : "";
}
function _codePoint(char) {
  return `\\${char.codePointAt(0).toString(16)} `;
}
function _serIdent(str) {
  return str.replace(
    /(^[0-9])|(^-[0-9])|(^-$)|([-0-9a-zA-Z_]|[^\x00-\x7F])|(\x00)|([\x01-\x1f]|\x7f)|([\s\S])/g,
    (m, d1, d2, hy, safe, nl2, ctrl, other) => d1 ? _codePoint(d1) : d2 ? "-" + _codePoint(d2.slice(1)) : hy ? "\\-" : safe ? safe : nl2 ? "\uFFFD" : ctrl ? _codePoint(ctrl) : "\\" + other
  );
}
function _serStr(str) {
  return str.replace(
    /(")|(\\)|(\x00)|([\x01-\x1f]|\x7f)/g,
    (m, dq, bs, nl2, ctrl) => dq ? '\\"' : bs ? "\\\\" : nl2 ? "\uFFFD" : _codePoint(ctrl)
  );
}
function normalize(selector) {
  if (!selector.type) {
    throw new Error("This is not an AST node.");
  }
  switch (selector.type) {
    case "compound": {
      selector.list.forEach(normalize);
      selector.list.sort((a, b) => _compareArrays(_getSelectorPriority(a), _getSelectorPriority(b)));
      break;
    }
    case "combinator": {
      normalize(selector.left);
      break;
    }
    case "list": {
      selector.list.forEach(normalize);
      selector.list.sort((a, b) => serialize(a) < serialize(b) ? -1 : 1);
      break;
    }
  }
  return selector;
}
function _getSelectorPriority(selector) {
  switch (selector.type) {
    case "universal":
      return [1];
    case "tag":
      return [1];
    case "id":
      return [2];
    case "class":
      return [3, selector.name];
    case "attrPresence":
      return [4, serialize(selector)];
    case "attrValue":
      return [5, serialize(selector)];
    case "combinator":
      return [15, serialize(selector)];
  }
}
function compareSpecificity(a, b) {
  return _compareArrays(a, b);
}
function _compareArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error("Arguments must be arrays.");
  }
  const shorter = a.length < b.length ? a.length : b.length;
  for (let i2 = 0; i2 < shorter; i2++) {
    if (a[i2] === b[i2]) {
      continue;
    }
    return a[i2] < b[i2] ? -1 : 1;
  }
  return a.length - b.length;
}

// node_modules/selderee/lib/selderee.mjs
var DecisionTree = class {
  constructor(input) {
    this.branches = weave(toAstTerminalPairs(input));
  }
  build(builder) {
    return builder(this.branches);
  }
};
function toAstTerminalPairs(array) {
  const len = array.length;
  const results = new Array(len);
  for (let i2 = 0; i2 < len; i2++) {
    const [selectorString, val] = array[i2];
    const ast = preprocess(parse1(selectorString));
    results[i2] = {
      ast,
      terminal: {
        type: "terminal",
        valueContainer: { index: i2, value: val, specificity: ast.specificity }
      }
    };
  }
  return results;
}
function preprocess(ast) {
  reduceSelectorVariants(ast);
  normalize(ast);
  return ast;
}
function reduceSelectorVariants(ast) {
  const newList = [];
  ast.list.forEach((sel) => {
    switch (sel.type) {
      case "class":
        newList.push({
          matcher: "~=",
          modifier: null,
          name: "class",
          namespace: null,
          specificity: sel.specificity,
          type: "attrValue",
          value: sel.name
        });
        break;
      case "id":
        newList.push({
          matcher: "=",
          modifier: null,
          name: "id",
          namespace: null,
          specificity: sel.specificity,
          type: "attrValue",
          value: sel.name
        });
        break;
      case "combinator":
        reduceSelectorVariants(sel.left);
        newList.push(sel);
        break;
      case "universal":
        break;
      default:
        newList.push(sel);
        break;
    }
  });
  ast.list = newList;
}
function weave(items) {
  const branches = [];
  while (items.length) {
    const topKind = findTopKey(items, (sel) => true, getSelectorKind);
    const { matches, nonmatches, empty } = breakByKind(items, topKind);
    items = nonmatches;
    if (matches.length) {
      branches.push(branchOfKind(topKind, matches));
    }
    if (empty.length) {
      branches.push(...terminate(empty));
    }
  }
  return branches;
}
function terminate(items) {
  const results = [];
  for (const item of items) {
    const terminal = item.terminal;
    if (terminal.type === "terminal") {
      results.push(terminal);
    } else {
      const { matches, rest } = partition(terminal.cont, (node) => node.type === "terminal");
      matches.forEach((node) => results.push(node));
      if (rest.length) {
        terminal.cont = rest;
        results.push(terminal);
      }
    }
  }
  return results;
}
function breakByKind(items, selectedKind) {
  const matches = [];
  const nonmatches = [];
  const empty = [];
  for (const item of items) {
    const simpsels = item.ast.list;
    if (simpsels.length) {
      const isMatch = simpsels.some((node) => getSelectorKind(node) === selectedKind);
      (isMatch ? matches : nonmatches).push(item);
    } else {
      empty.push(item);
    }
  }
  return { matches, nonmatches, empty };
}
function getSelectorKind(sel) {
  switch (sel.type) {
    case "attrPresence":
      return `attrPresence ${sel.name}`;
    case "attrValue":
      return `attrValue ${sel.name}`;
    case "combinator":
      return `combinator ${sel.combinator}`;
    default:
      return sel.type;
  }
}
function branchOfKind(kind, items) {
  if (kind === "tag") {
    return tagNameBranch(items);
  }
  if (kind.startsWith("attrValue ")) {
    return attrValueBranch(kind.substring(10), items);
  }
  if (kind.startsWith("attrPresence ")) {
    return attrPresenceBranch(kind.substring(13), items);
  }
  if (kind === "combinator >") {
    return combinatorBranch(">", items);
  }
  if (kind === "combinator +") {
    return combinatorBranch("+", items);
  }
  throw new Error(`Unsupported selector kind: ${kind}`);
}
function tagNameBranch(items) {
  const groups = spliceAndGroup(items, (x) => x.type === "tag", (x) => x.name);
  const variants = Object.entries(groups).map(([name2, group]) => ({
    type: "variant",
    value: name2,
    cont: weave(group.items)
  }));
  return {
    type: "tagName",
    variants
  };
}
function attrPresenceBranch(name2, items) {
  for (const item of items) {
    spliceSimpleSelector(item, (x) => x.type === "attrPresence" && x.name === name2);
  }
  return {
    type: "attrPresence",
    name: name2,
    cont: weave(items)
  };
}
function attrValueBranch(name2, items) {
  const groups = spliceAndGroup(items, (x) => x.type === "attrValue" && x.name === name2, (x) => `${x.matcher} ${x.modifier || ""} ${x.value}`);
  const matchers = [];
  for (const group of Object.values(groups)) {
    const sel = group.oneSimpleSelector;
    const predicate = getAttrPredicate(sel);
    const continuation = weave(group.items);
    matchers.push({
      type: "matcher",
      matcher: sel.matcher,
      modifier: sel.modifier,
      value: sel.value,
      predicate,
      cont: continuation
    });
  }
  return {
    type: "attrValue",
    name: name2,
    matchers
  };
}
function getAttrPredicate(sel) {
  if (sel.modifier === "i") {
    const expected = sel.value.toLowerCase();
    switch (sel.matcher) {
      case "=":
        return (actual) => expected === actual.toLowerCase();
      case "~=":
        return (actual) => actual.toLowerCase().split(/[ \t]+/).includes(expected);
      case "^=":
        return (actual) => actual.toLowerCase().startsWith(expected);
      case "$=":
        return (actual) => actual.toLowerCase().endsWith(expected);
      case "*=":
        return (actual) => actual.toLowerCase().includes(expected);
      case "|=":
        return (actual) => {
          const lower = actual.toLowerCase();
          return expected === lower || lower.startsWith(expected) && lower[expected.length] === "-";
        };
    }
  } else {
    const expected = sel.value;
    switch (sel.matcher) {
      case "=":
        return (actual) => expected === actual;
      case "~=":
        return (actual) => actual.split(/[ \t]+/).includes(expected);
      case "^=":
        return (actual) => actual.startsWith(expected);
      case "$=":
        return (actual) => actual.endsWith(expected);
      case "*=":
        return (actual) => actual.includes(expected);
      case "|=":
        return (actual) => expected === actual || actual.startsWith(expected) && actual[expected.length] === "-";
    }
  }
}
function combinatorBranch(combinator, items) {
  const groups = spliceAndGroup(items, (x) => x.type === "combinator" && x.combinator === combinator, (x) => serialize(x.left));
  const leftItems = [];
  for (const group of Object.values(groups)) {
    const rightCont = weave(group.items);
    const leftAst = group.oneSimpleSelector.left;
    leftItems.push({
      ast: leftAst,
      terminal: { type: "popElement", cont: rightCont }
    });
  }
  return {
    type: "pushElement",
    combinator,
    cont: weave(leftItems)
  };
}
function spliceAndGroup(items, predicate, keyCallback) {
  const groups = {};
  while (items.length) {
    const bestKey = findTopKey(items, predicate, keyCallback);
    const bestKeyPredicate = (sel) => predicate(sel) && keyCallback(sel) === bestKey;
    const hasBestKeyPredicate = (item) => item.ast.list.some(bestKeyPredicate);
    const { matches, rest } = partition1(items, hasBestKeyPredicate);
    let oneSimpleSelector = null;
    for (const item of matches) {
      const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);
      if (!oneSimpleSelector) {
        oneSimpleSelector = splicedNode;
      }
    }
    if (oneSimpleSelector == null) {
      throw new Error("No simple selector is found.");
    }
    groups[bestKey] = { oneSimpleSelector, items: matches };
    items = rest;
  }
  return groups;
}
function spliceSimpleSelector(item, predicate) {
  const simpsels = item.ast.list;
  const matches = new Array(simpsels.length);
  let firstIndex = -1;
  for (let i2 = simpsels.length; i2-- > 0; ) {
    if (predicate(simpsels[i2])) {
      matches[i2] = true;
      firstIndex = i2;
    }
  }
  if (firstIndex == -1) {
    throw new Error(`Couldn't find the required simple selector.`);
  }
  const result = simpsels[firstIndex];
  item.ast.list = simpsels.filter((sel, i2) => !matches[i2]);
  return result;
}
function findTopKey(items, predicate, keyCallback) {
  const candidates = {};
  for (const item of items) {
    const candidates1 = {};
    for (const node of item.ast.list.filter(predicate)) {
      candidates1[keyCallback(node)] = true;
    }
    for (const key of Object.keys(candidates1)) {
      if (candidates[key]) {
        candidates[key]++;
      } else {
        candidates[key] = 1;
      }
    }
  }
  let topKind = "";
  let topCounter = 0;
  for (const entry of Object.entries(candidates)) {
    if (entry[1] > topCounter) {
      topKind = entry[0];
      topCounter = entry[1];
    }
  }
  return topKind;
}
function partition(src, predicate) {
  const matches = [];
  const rest = [];
  for (const x of src) {
    if (predicate(x)) {
      matches.push(x);
    } else {
      rest.push(x);
    }
  }
  return { matches, rest };
}
function partition1(src, predicate) {
  const matches = [];
  const rest = [];
  for (const x of src) {
    if (predicate(x)) {
      matches.push(x);
    } else {
      rest.push(x);
    }
  }
  return { matches, rest };
}
var Picker = class {
  constructor(f) {
    this.f = f;
  }
  pickAll(el) {
    return this.f(el);
  }
  pick1(el, preferFirst = false) {
    const results = this.f(el);
    const len = results.length;
    if (len === 0) {
      return null;
    }
    if (len === 1) {
      return results[0].value;
    }
    const comparator = preferFirst ? comparatorPreferFirst : comparatorPreferLast;
    let result = results[0];
    for (let i2 = 1; i2 < len; i2++) {
      const next = results[i2];
      if (comparator(result, next)) {
        result = next;
      }
    }
    return result.value;
  }
};
function comparatorPreferFirst(acc, next) {
  const diff = compareSpecificity(next.specificity, acc.specificity);
  return diff > 0 || diff === 0 && next.index < acc.index;
}
function comparatorPreferLast(acc, next) {
  const diff = compareSpecificity(next.specificity, acc.specificity);
  return diff > 0 || diff === 0 && next.index > acc.index;
}

// node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs
function hp2Builder(nodes) {
  return new Picker(handleArray(nodes));
}
function handleArray(nodes) {
  const matchers = nodes.map(handleNode);
  return (el, ...tail) => matchers.flatMap((m) => m(el, ...tail));
}
function handleNode(node) {
  switch (node.type) {
    case "terminal": {
      const result = [node.valueContainer];
      return (el, ...tail) => result;
    }
    case "tagName":
      return handleTagName(node);
    case "attrValue":
      return handleAttrValueName(node);
    case "attrPresence":
      return handleAttrPresenceName(node);
    case "pushElement":
      return handlePushElementNode(node);
    case "popElement":
      return handlePopElementNode(node);
  }
}
function handleTagName(node) {
  const variants = {};
  for (const variant of node.variants) {
    variants[variant.value] = handleArray(variant.cont);
  }
  return (el, ...tail) => {
    const continuation = variants[el.name];
    return continuation ? continuation(el, ...tail) : [];
  };
}
function handleAttrPresenceName(node) {
  const attrName = node.name;
  const continuation = handleArray(node.cont);
  return (el, ...tail) => Object.prototype.hasOwnProperty.call(el.attribs, attrName) ? continuation(el, ...tail) : [];
}
function handleAttrValueName(node) {
  const callbacks = [];
  for (const matcher of node.matchers) {
    const predicate = matcher.predicate;
    const continuation = handleArray(matcher.cont);
    callbacks.push((attr, el, ...tail) => predicate(attr) ? continuation(el, ...tail) : []);
  }
  const attrName = node.name;
  return (el, ...tail) => {
    const attr = el.attribs[attrName];
    return attr || attr === "" ? callbacks.flatMap((cb) => cb(attr, el, ...tail)) : [];
  };
}
function handlePushElementNode(node) {
  const continuation = handleArray(node.cont);
  const leftElementGetter = node.combinator === "+" ? getPrecedingElement : getParentElement;
  return (el, ...tail) => {
    const next = leftElementGetter(el);
    if (next === null) {
      return [];
    }
    return continuation(next, el, ...tail);
  };
}
var getPrecedingElement = (el) => {
  const prev = el.prev;
  if (prev === null) {
    return null;
  }
  return isTag2(prev) ? prev : getPrecedingElement(prev);
};
var getParentElement = (el) => {
  const parent = el.parent;
  return parent && isTag2(parent) ? parent : null;
};
function handlePopElementNode(node) {
  const continuation = handleArray(node.cont);
  return (el, next, ...tail) => continuation(next, ...tail);
}

// node_modules/entities/lib/esm/generated/decode-data-html.js
var decode_data_html_default = new Uint16Array(
  // prettier-ignore
  '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c3) => c3.charCodeAt(0))
);

// node_modules/entities/lib/esm/generated/decode-data-xml.js
var decode_data_xml_default = new Uint16Array(
  // prettier-ignore
  "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c3) => c3.charCodeAt(0))
);

// node_modules/entities/lib/esm/decode_codepoint.js
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a2;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}

// node_modules/entities/lib/esm/decode.js
var CharCodes;
(function(CharCodes3) {
  CharCodes3[CharCodes3["NUM"] = 35] = "NUM";
  CharCodes3[CharCodes3["SEMI"] = 59] = "SEMI";
  CharCodes3[CharCodes3["EQUALS"] = 61] = "EQUALS";
  CharCodes3[CharCodes3["ZERO"] = 48] = "ZERO";
  CharCodes3[CharCodes3["NINE"] = 57] = "NINE";
  CharCodes3[CharCodes3["LOWER_A"] = 97] = "LOWER_A";
  CharCodes3[CharCodes3["LOWER_F"] = 102] = "LOWER_F";
  CharCodes3[CharCodes3["LOWER_X"] = 120] = "LOWER_X";
  CharCodes3[CharCodes3["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes3[CharCodes3["UPPER_A"] = 65] = "UPPER_A";
  CharCodes3[CharCodes3["UPPER_F"] = 70] = "UPPER_F";
  CharCodes3[CharCodes3["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);

// node_modules/htmlparser2/lib/esm/Tokenizer.js
var CharCodes2;
(function(CharCodes3) {
  CharCodes3[CharCodes3["Tab"] = 9] = "Tab";
  CharCodes3[CharCodes3["NewLine"] = 10] = "NewLine";
  CharCodes3[CharCodes3["FormFeed"] = 12] = "FormFeed";
  CharCodes3[CharCodes3["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes3[CharCodes3["Space"] = 32] = "Space";
  CharCodes3[CharCodes3["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes3[CharCodes3["Number"] = 35] = "Number";
  CharCodes3[CharCodes3["Amp"] = 38] = "Amp";
  CharCodes3[CharCodes3["SingleQuote"] = 39] = "SingleQuote";
  CharCodes3[CharCodes3["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes3[CharCodes3["Dash"] = 45] = "Dash";
  CharCodes3[CharCodes3["Slash"] = 47] = "Slash";
  CharCodes3[CharCodes3["Zero"] = 48] = "Zero";
  CharCodes3[CharCodes3["Nine"] = 57] = "Nine";
  CharCodes3[CharCodes3["Semi"] = 59] = "Semi";
  CharCodes3[CharCodes3["Lt"] = 60] = "Lt";
  CharCodes3[CharCodes3["Eq"] = 61] = "Eq";
  CharCodes3[CharCodes3["Gt"] = 62] = "Gt";
  CharCodes3[CharCodes3["Questionmark"] = 63] = "Questionmark";
  CharCodes3[CharCodes3["UpperA"] = 65] = "UpperA";
  CharCodes3[CharCodes3["LowerA"] = 97] = "LowerA";
  CharCodes3[CharCodes3["UpperF"] = 70] = "UpperF";
  CharCodes3[CharCodes3["LowerF"] = 102] = "LowerF";
  CharCodes3[CharCodes3["UpperZ"] = 90] = "UpperZ";
  CharCodes3[CharCodes3["LowerZ"] = 122] = "LowerZ";
  CharCodes3[CharCodes3["LowerX"] = 120] = "LowerX";
  CharCodes3[CharCodes3["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes2 || (CharCodes2 = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
  State2[State2["InCommentLike"] = 21] = "InCommentLike";
  State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State2[State2["SpecialStartSequence"] = 23] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 24] = "InSpecialTag";
  State2[State2["BeforeEntity"] = 25] = "BeforeEntity";
  State2[State2["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
  State2[State2["InNamedEntity"] = 27] = "InNamedEntity";
  State2[State2["InNumericEntity"] = 28] = "InNumericEntity";
  State2[State2["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c3) {
  return c3 === CharCodes2.Space || c3 === CharCodes2.NewLine || c3 === CharCodes2.Tab || c3 === CharCodes2.FormFeed || c3 === CharCodes2.CarriageReturn;
}
function isEndOfTagSection(c3) {
  return c3 === CharCodes2.Slash || c3 === CharCodes2.Gt || isWhitespace(c3);
}
function isNumber2(c3) {
  return c3 >= CharCodes2.Zero && c3 <= CharCodes2.Nine;
}
function isASCIIAlpha(c3) {
  return c3 >= CharCodes2.LowerA && c3 <= CharCodes2.LowerZ || c3 >= CharCodes2.UpperA && c3 <= CharCodes2.UpperZ;
}
function isHexDigit(c3) {
  return c3 >= CharCodes2.UpperA && c3 <= CharCodes2.UpperF || c3 >= CharCodes2.LowerA && c3 <= CharCodes2.LowerF;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
var Tokenizer = class {
  constructor({ xmlMode = false, decodeEntities = true }, cbs) {
    this.cbs = cbs;
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    this.trieIndex = 0;
    this.trieCurrent = 0;
    this.entityResult = 0;
    this.entityExcess = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityTrie = xmlMode ? decode_data_xml_default : decode_data_html_default;
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.currentSequence = void 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(c3) {
    if (c3 === CharCodes2.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes2.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c3 === CharCodes2.Amp) {
      this.state = State.BeforeEntity;
    }
  }
  stateSpecialStartSequence(c3) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c3)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c3 | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c3);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(c3) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c3 === CharCodes2.Gt || isWhitespace(c3)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c3);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c3 | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c3 === CharCodes2.Amp) {
          this.state = State.BeforeEntity;
        }
      } else if (this.fastForwardTo(CharCodes2.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c3 === CharCodes2.Lt);
    }
  }
  stateCDATASequence(c3) {
    if (c3 === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State.InDeclaration;
      this.stateInDeclaration(c3);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c3) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c3) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c3) {
    if (c3 === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c3 !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(c3) {
    return this.xmlMode ? !isEndOfTagSection(c3) : isASCIIAlpha(c3);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State.SpecialStartSequence;
  }
  stateBeforeTagName(c3) {
    if (c3 === CharCodes2.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c3 === CharCodes2.Questionmark) {
      this.state = State.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c3)) {
      const lower = c3 | 32;
      this.sectionStart = this.index;
      if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
        this.startSpecial(Sequences.TitleEnd, 3);
      } else {
        this.state = !this.xmlMode && lower === Sequences.ScriptEnd[2] ? State.BeforeSpecialS : State.InTagName;
      }
    } else if (c3 === CharCodes2.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c3);
    }
  }
  stateInTagName(c3) {
    if (isEndOfTagSection(c3)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c3);
    }
  }
  stateBeforeClosingTagName(c3) {
    if (isWhitespace(c3)) {
    } else if (c3 === CharCodes2.Gt) {
      this.state = State.Text;
    } else {
      this.state = this.isTagStartChar(c3) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c3) {
    if (c3 === CharCodes2.Gt || isWhitespace(c3)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c3);
    }
  }
  stateAfterClosingTagName(c3) {
    if (c3 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c3) {
    if (c3 === CharCodes2.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State.Text;
      }
      this.baseState = this.state;
      this.sectionStart = this.index + 1;
    } else if (c3 === CharCodes2.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c3)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c3) {
    if (c3 === CharCodes2.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace(c3)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c3);
    }
  }
  stateInAttributeName(c3) {
    if (c3 === CharCodes2.Eq || isEndOfTagSection(c3)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c3);
    }
  }
  stateAfterAttributeName(c3) {
    if (c3 === CharCodes2.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c3 === CharCodes2.Slash || c3 === CharCodes2.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c3);
    } else if (!isWhitespace(c3)) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c3) {
    if (c3 === CharCodes2.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c3 === CharCodes2.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c3)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c3);
    }
  }
  handleInAttributeValue(c3, quote) {
    if (c3 === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes2.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c3 === CharCodes2.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateInAttributeValueDoubleQuotes(c3) {
    this.handleInAttributeValue(c3, CharCodes2.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c3) {
    this.handleInAttributeValue(c3, CharCodes2.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c3) {
    if (isWhitespace(c3) || c3 === CharCodes2.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c3);
    } else if (this.decodeEntities && c3 === CharCodes2.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateBeforeDeclaration(c3) {
    if (c3 === CharCodes2.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c3 === CharCodes2.Dash ? State.BeforeComment : State.InDeclaration;
    }
  }
  stateInDeclaration(c3) {
    if (c3 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c3) {
    if (c3 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c3) {
    if (c3 === CharCodes2.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InDeclaration;
    }
  }
  stateInSpecialComment(c3) {
    if (c3 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c3) {
    const lower = c3 | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State.InTagName;
      this.stateInTagName(c3);
    }
  }
  stateBeforeEntity(c3) {
    this.entityExcess = 1;
    this.entityResult = 0;
    if (c3 === CharCodes2.Number) {
      this.state = State.BeforeNumericEntity;
    } else if (c3 === CharCodes2.Amp) {
    } else {
      this.trieIndex = 0;
      this.trieCurrent = this.entityTrie[0];
      this.state = State.InNamedEntity;
      this.stateInNamedEntity(c3);
    }
  }
  stateInNamedEntity(c3) {
    this.entityExcess += 1;
    this.trieIndex = determineBranch(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c3);
    if (this.trieIndex < 0) {
      this.emitNamedEntity();
      this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const masked = this.trieCurrent & BinTrieFlags.VALUE_LENGTH;
    if (masked) {
      const valueLength = (masked >> 14) - 1;
      if (!this.allowLegacyEntity() && c3 !== CharCodes2.Semi) {
        this.trieIndex += valueLength;
      } else {
        const entityStart = this.index - this.entityExcess + 1;
        if (entityStart > this.sectionStart) {
          this.emitPartial(this.sectionStart, entityStart);
        }
        this.entityResult = this.trieIndex;
        this.trieIndex += valueLength;
        this.entityExcess = 0;
        this.sectionStart = this.index + 1;
        if (valueLength === 0) {
          this.emitNamedEntity();
        }
      }
    }
  }
  emitNamedEntity() {
    this.state = this.baseState;
    if (this.entityResult === 0) {
      return;
    }
    const valueLength = (this.entityTrie[this.entityResult] & BinTrieFlags.VALUE_LENGTH) >> 14;
    switch (valueLength) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~BinTrieFlags.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
      }
    }
  }
  stateBeforeNumericEntity(c3) {
    if ((c3 | 32) === CharCodes2.LowerX) {
      this.entityExcess++;
      this.state = State.InHexEntity;
    } else {
      this.state = State.InNumericEntity;
      this.stateInNumericEntity(c3);
    }
  }
  emitNumericEntity(strict) {
    const entityStart = this.index - this.entityExcess - 1;
    const numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
    if (numberStart !== this.index) {
      if (entityStart > this.sectionStart) {
        this.emitPartial(this.sectionStart, entityStart);
      }
      this.sectionStart = this.index + Number(strict);
      this.emitCodePoint(replaceCodePoint(this.entityResult));
    }
    this.state = this.baseState;
  }
  stateInNumericEntity(c3) {
    if (c3 === CharCodes2.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber2(c3)) {
      this.entityResult = this.entityResult * 10 + (c3 - CharCodes2.Zero);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  stateInHexEntity(c3) {
    if (c3 === CharCodes2.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber2(c3)) {
      this.entityResult = this.entityResult * 16 + (c3 - CharCodes2.Zero);
      this.entityExcess++;
    } else if (isHexDigit(c3)) {
      this.entityResult = this.entityResult * 16 + ((c3 | 32) - CharCodes2.LowerA + 10);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === State.Text || this.baseState === State.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c3 = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c3);
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c3);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c3);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c3);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c3);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c3);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c3);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c3);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c3);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c3);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c3);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c3);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c3);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c3);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c3);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c3);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c3);
          break;
        }
        case State.BeforeSpecialS: {
          this.stateBeforeSpecialS(c3);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c3);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c3);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c3);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c3);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c3);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c3);
          break;
        }
        case State.InNamedEntity: {
          this.stateInNamedEntity(c3);
          break;
        }
        case State.BeforeEntity: {
          this.stateBeforeEntity(c3);
          break;
        }
        case State.InHexEntity: {
          this.stateInHexEntity(c3);
          break;
        }
        case State.InNumericEntity: {
          this.stateInNumericEntity(c3);
          break;
        }
        default: {
          this.stateBeforeNumericEntity(c3);
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InNamedEntity) {
      this.emitNamedEntity();
    }
    if (this.sectionStart < this.index) {
      this.handleTrailingData();
    }
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.state === State.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State.InNumericEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InHexEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) {
    } else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitPartial(start, endIndex) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribdata(start, endIndex);
    } else {
      this.cbs.ontext(start, endIndex);
    }
  }
  emitCodePoint(cp) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribentity(cp);
    } else {
      this.cbs.ontextentity(cp);
    }
  }
};

// node_modules/htmlparser2/lib/esm/Parser.js
var formTags = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
var pTag = /* @__PURE__ */ new Set(["p"]);
var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
var openImpliesClose = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pTag],
  ["h1", pTag],
  ["h2", pTag],
  ["h3", pTag],
  ["h4", pTag],
  ["h5", pTag],
  ["h6", pTag],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
var voidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
var htmlIntegrationElements = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]);
var reNameEnd = /\s|\//;
var Parser = class {
  constructor(cbs, options = {}) {
    var _a2, _b, _c, _d, _e;
    this.options = options;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.foreignContext = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
    this.lowerCaseTagNames = (_a2 = options.lowerCaseTags) !== null && _a2 !== void 0 ? _a2 : !options.xmlMode;
    this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
    this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer)(this.options, this);
    (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(start, endIndex) {
    var _a2, _b;
    const data = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, data);
    this.startIndex = endIndex;
  }
  /** @internal */
  ontextentity(cp) {
    var _a2, _b;
    const index = this.tokenizer.getSectionStart();
    this.endIndex = index - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, fromCodePoint(cp));
    this.startIndex = index;
  }
  isVoidElement(name2) {
    return !this.options.xmlMode && voidElements.has(name2);
  }
  /** @internal */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name2 = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    this.emitOpenTag(name2);
  }
  emitOpenTag(name2) {
    var _a2, _b, _c, _d;
    this.openTagStart = this.startIndex;
    this.tagname = name2;
    const impliesClose = !this.options.xmlMode && openImpliesClose.get(name2);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[this.stack.length - 1])) {
        const element = this.stack.pop();
        (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, true);
      }
    }
    if (!this.isVoidElement(name2)) {
      this.stack.push(name2);
      if (foreignContextElements.has(name2)) {
        this.foreignContext.push(true);
      } else if (htmlIntegrationElements.has(name2)) {
        this.foreignContext.push(false);
      }
    }
    (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name2);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a2, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a2 = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a2, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /** @internal */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onclosetag(start, endIndex) {
    var _a2, _b, _c, _d, _e, _f;
    this.endIndex = endIndex;
    let name2 = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    if (foreignContextElements.has(name2) || htmlIntegrationElements.has(name2)) {
      this.foreignContext.pop();
    }
    if (!this.isVoidElement(name2)) {
      const pos = this.stack.lastIndexOf(name2);
      if (pos !== -1) {
        if (this.cbs.onclosetag) {
          let count = this.stack.length - pos;
          while (count--) {
            this.cbs.onclosetag(this.stack.pop(), count !== 0);
          }
        } else
          this.stack.length = pos;
      } else if (!this.options.xmlMode && name2 === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (!this.options.xmlMode && name2 === "br") {
      (_b = (_a2 = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a2, "br");
      (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
      (_f = (_e = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a2, _b;
    const name2 = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[this.stack.length - 1] === name2) {
      (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, name2, !isOpenImplied);
      this.stack.pop();
    }
  }
  /** @internal */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name2 = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name2.toLowerCase() : name2;
  }
  /** @internal */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /** @internal */
  onattribentity(cp) {
    this.attribvalue += fromCodePoint(cp);
  }
  /** @internal */
  onattribend(quote, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a2, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index = value.search(reNameEnd);
    let name2 = index < 0 ? value : value.substr(0, index);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    return name2;
  }
  /** @internal */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name2 = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name2}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name2 = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name2}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncomment(start, endIndex, offset) {
    var _a2, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a2, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncdata(start, endIndex, offset) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (this.options.xmlMode || this.options.recognizeCDATA) {
      (_b = (_a2 = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a2);
      (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
      (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
    } else {
      (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
      (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a2, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true))
        ;
    }
    (_b = (_a2 = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a2);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a2, _b, _c, _d;
    (_b = (_a2 = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a2);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
    this.buffers.length = 0;
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(data) {
    this.reset();
    this.end(data);
  }
  getSlice(start, end) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
    while (end - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice += this.buffers[0].slice(0, end - this.bufferOffset);
    }
    return slice;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(chunk) {
    this.write(chunk);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(chunk) {
    this.end(chunk);
  }
};

// node_modules/entities/lib/esm/generated/encode-html.js
function restoreDiff(arr) {
  for (let i2 = 1; i2 < arr.length; i2++) {
    arr[i2][0] += arr[i2 - 1][0] + 1;
  }
  return arr;
}
var encode_html_default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

// node_modules/entities/lib/esm/escape.js
var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c3, index) => (c3.charCodeAt(index) & 64512) === 55296 ? (c3.charCodeAt(index) - 55296) * 1024 + c3.charCodeAt(index + 1) - 56320 + 65536 : c3.charCodeAt(index)
  )
);
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match;
  while ((match = xmlReplacer.exec(str)) !== null) {
    const i2 = match.index;
    const char = str.charCodeAt(i2);
    const next = xmlCodeMap.get(char);
    if (next !== void 0) {
      ret += str.substring(lastIdx, i2) + next;
      lastIdx = i2 + 1;
    } else {
      ret += `${str.substring(lastIdx, i2)}&#x${getCodePoint(str, i2).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
function getEscaper(regex, map2) {
  return function escape3(data) {
    let match;
    let lastIdx = 0;
    let result = "";
    while (match = regex.exec(data)) {
      if (lastIdx !== match.index) {
        result += data.substring(lastIdx, match.index);
      }
      result += map2.get(match[0].charCodeAt(0));
      lastIdx = match.index + 1;
    }
    return result + data.substring(lastIdx);
  };
}
var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));

// node_modules/entities/lib/esm/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// node_modules/dom-serializer/lib/esm/foreignNames.js
var elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((val) => [val.toLowerCase(), val]));
var attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((val) => [val.toLowerCase(), val]));

// node_modules/dom-serializer/lib/esm/index.js
var unencodedElements = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function replaceQuotes(value) {
  return value.replace(/"/g, "&quot;");
}
function formatAttributes(attributes, opts) {
  var _a2;
  if (!attributes)
    return;
  const encode = ((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes).map((key) => {
    var _a3, _b;
    const value = (_a3 = attributes[key]) !== null && _a3 !== void 0 ? _a3 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode(value)}"`;
  }).join(" ");
}
var singleTag = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function render(node, options = {}) {
  const nodes = "length" in node ? node : [node];
  let output = "";
  for (let i2 = 0; i2 < nodes.length; i2++) {
    output += renderNode(nodes[i2], options);
  }
  return output;
}
function renderNode(node, options) {
  switch (node.type) {
    case Root:
      return render(node.children, options);
    case Doctype:
    case Directive:
      return renderDirective(node);
    case Comment:
      return renderComment(node);
    case CDATA:
      return renderCdata(node);
    case Script:
    case Style:
    case Tag:
      return renderTag(node, options);
    case Text:
      return renderText(node, options);
  }
}
var foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
  var _a2;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a2 = elementNames.get(elem.name)) !== null && _a2 !== void 0 ? _a2 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = { ...opts, xmlMode: false };
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = { ...opts, xmlMode: "foreign" };
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    opts.selfClosingTags !== false
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    opts.selfClosingTags && singleTag.has(elem.name)
  ))) {
    if (!opts.xmlMode)
      tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
}
function renderDirective(elem) {
  return `<${elem.data}>`;
}
function renderText(elem, opts) {
  var _a2;
  let data = elem.data || "";
  if (((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
  }
  return data;
}
function renderCdata(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
  return `<!--${elem.data}-->`;
}

// node_modules/domutils/lib/esm/helpers.js
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));

// node_modules/htmlparser2/lib/esm/index.js
function parseDocument(data, options) {
  const handler = new DomHandler(void 0, options);
  new Parser(handler, options).end(data);
  return handler.root;
}

// node_modules/html-to-text/lib/html-to-text.mjs
var import_deepmerge = __toESM(require_cjs(), 1);
function limitedDepthRecursive(n2, f, g = () => void 0) {
  if (n2 === void 0) {
    const f1 = function(...args) {
      return f(f1, ...args);
    };
    return f1;
  }
  if (n2 >= 0) {
    return function(...args) {
      return f(limitedDepthRecursive(n2 - 1, f, g), ...args);
    };
  }
  return g;
}
function trimCharacter(str, char) {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === char) {
    ++start;
  }
  while (end > start && str[end - 1] === char) {
    --end;
  }
  return start > 0 || end < str.length ? str.substring(start, end) : str;
}
function trimCharacterEnd(str, char) {
  let end = str.length;
  while (end > 0 && str[end - 1] === char) {
    --end;
  }
  return end < str.length ? str.substring(0, end) : str;
}
function unicodeEscape(str) {
  return str.replace(/[\s\S]/g, (c3) => "\\u" + c3.charCodeAt().toString(16).padStart(4, "0"));
}
function mergeDuplicatesPreferLast(items, getKey) {
  const map2 = /* @__PURE__ */ new Map();
  for (let i2 = items.length; i2-- > 0; ) {
    const item = items[i2];
    const key = getKey(item);
    map2.set(
      key,
      map2.has(key) ? (0, import_deepmerge.default)(item, map2.get(key), { arrayMerge: overwriteMerge$1 }) : item
    );
  }
  return [...map2.values()].reverse();
}
var overwriteMerge$1 = (acc, src, options) => [...src];
function get(obj, path) {
  for (const key of path) {
    if (!obj) {
      return void 0;
    }
    obj = obj[key];
  }
  return obj;
}
function numberToLetterSequence(num, baseChar = "a", base = 26) {
  const digits = [];
  do {
    num -= 1;
    digits.push(num % base);
    num = num / base >> 0;
  } while (num > 0);
  const baseCode = baseChar.charCodeAt(0);
  return digits.reverse().map((n2) => String.fromCharCode(baseCode + n2)).join("");
}
var I = ["I", "X", "C", "M"];
var V = ["V", "L", "D"];
function numberToRoman(num) {
  return [...num + ""].map((n2) => +n2).reverse().map((v, i2) => v % 5 < 4 ? (v < 5 ? "" : V[i2]) + I[i2].repeat(v % 5) : I[i2] + (v < 5 ? V[i2] : I[i2 + 1])).reverse().join("");
}
var InlineTextBuilder = class {
  /**
   * Creates an instance of InlineTextBuilder.
   *
   * If `maxLineLength` is not provided then it is either `options.wordwrap` or unlimited.
   *
   * @param { Options } options           HtmlToText options.
   * @param { number }  [ maxLineLength ] This builder will try to wrap text to fit this line length.
   */
  constructor(options, maxLineLength = void 0) {
    this.lines = [];
    this.nextLineWords = [];
    this.maxLineLength = maxLineLength || options.wordwrap || Number.MAX_VALUE;
    this.nextLineAvailableChars = this.maxLineLength;
    this.wrapCharacters = get(options, ["longWordSplit", "wrapCharacters"]) || [];
    this.forceWrapOnLimit = get(options, ["longWordSplit", "forceWrapOnLimit"]) || false;
    this.stashedSpace = false;
    this.wordBreakOpportunity = false;
  }
  /**
   * Add a new word.
   *
   * @param { string } word A word to add.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  pushWord(word, noWrap = false) {
    if (this.nextLineAvailableChars <= 0 && !noWrap) {
      this.startNewLine();
    }
    const isLineStart = this.nextLineWords.length === 0;
    const cost = word.length + (isLineStart ? 0 : 1);
    if (cost <= this.nextLineAvailableChars || noWrap) {
      this.nextLineWords.push(word);
      this.nextLineAvailableChars -= cost;
    } else {
      const [first, ...rest] = this.splitLongWord(word);
      if (!isLineStart) {
        this.startNewLine();
      }
      this.nextLineWords.push(first);
      this.nextLineAvailableChars -= first.length;
      for (const part of rest) {
        this.startNewLine();
        this.nextLineWords.push(part);
        this.nextLineAvailableChars -= part.length;
      }
    }
  }
  /**
   * Pop a word from the currently built line.
   * This doesn't affect completed lines.
   *
   * @returns { string }
   */
  popWord() {
    const lastWord = this.nextLineWords.pop();
    if (lastWord !== void 0) {
      const isLineStart = this.nextLineWords.length === 0;
      const cost = lastWord.length + (isLineStart ? 0 : 1);
      this.nextLineAvailableChars += cost;
    }
    return lastWord;
  }
  /**
   * Concat a word to the last word already in the builder.
   * Adds a new word in case there are no words yet in the last line.
   *
   * @param { string } word A word to be concatenated.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  concatWord(word, noWrap = false) {
    if (this.wordBreakOpportunity && word.length > this.nextLineAvailableChars) {
      this.pushWord(word, noWrap);
      this.wordBreakOpportunity = false;
    } else {
      const lastWord = this.popWord();
      this.pushWord(lastWord ? lastWord.concat(word) : word, noWrap);
    }
  }
  /**
   * Add current line (and more empty lines if provided argument > 1) to the list of complete lines and start a new one.
   *
   * @param { number } n Number of line breaks that will be added to the resulting string.
   */
  startNewLine(n2 = 1) {
    this.lines.push(this.nextLineWords);
    if (n2 > 1) {
      this.lines.push(...Array.from({ length: n2 - 1 }, () => []));
    }
    this.nextLineWords = [];
    this.nextLineAvailableChars = this.maxLineLength;
  }
  /**
   * No words in this builder.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this.lines.length === 0 && this.nextLineWords.length === 0;
  }
  clear() {
    this.lines.length = 0;
    this.nextLineWords.length = 0;
    this.nextLineAvailableChars = this.maxLineLength;
  }
  /**
   * Join all lines of words inside the InlineTextBuilder into a complete string.
   *
   * @returns { string }
   */
  toString() {
    return [...this.lines, this.nextLineWords].map((words) => words.join(" ")).join("\n");
  }
  /**
   * Split a long word up to fit within the word wrap limit.
   * Use either a character to split looking back from the word wrap limit,
   * or truncate to the word wrap limit.
   *
   * @param   { string }   word Input word.
   * @returns { string[] }      Parts of the word.
   */
  splitLongWord(word) {
    const parts = [];
    let idx = 0;
    while (word.length > this.maxLineLength) {
      const firstLine = word.substring(0, this.maxLineLength);
      const remainingChars = word.substring(this.maxLineLength);
      const splitIndex = firstLine.lastIndexOf(this.wrapCharacters[idx]);
      if (splitIndex > -1) {
        word = firstLine.substring(splitIndex + 1) + remainingChars;
        parts.push(firstLine.substring(0, splitIndex + 1));
      } else {
        idx++;
        if (idx < this.wrapCharacters.length) {
          word = firstLine + remainingChars;
        } else {
          if (this.forceWrapOnLimit) {
            parts.push(firstLine);
            word = remainingChars;
            if (word.length > this.maxLineLength) {
              continue;
            }
          } else {
            word = firstLine + remainingChars;
          }
          break;
        }
      }
    }
    parts.push(word);
    return parts;
  }
};
var StackItem = class {
  constructor(next = null) {
    this.next = next;
  }
  getRoot() {
    return this.next ? this.next : this;
  }
};
var BlockStackItem = class extends StackItem {
  constructor(options, next = null, leadingLineBreaks = 1, maxLineLength = void 0) {
    super(next);
    this.leadingLineBreaks = leadingLineBreaks;
    this.inlineTextBuilder = new InlineTextBuilder(options, maxLineLength);
    this.rawText = "";
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
};
var ListStackItem = class extends BlockStackItem {
  constructor(options, next = null, {
    interRowLineBreaks = 1,
    leadingLineBreaks = 2,
    maxLineLength = void 0,
    maxPrefixLength = 0,
    prefixAlign = "left"
  } = {}) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.maxPrefixLength = maxPrefixLength;
    this.prefixAlign = prefixAlign;
    this.interRowLineBreaks = interRowLineBreaks;
  }
};
var ListItemStackItem = class extends BlockStackItem {
  constructor(options, next = null, {
    leadingLineBreaks = 1,
    maxLineLength = void 0,
    prefix = ""
  } = {}) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.prefix = prefix;
  }
};
var TableStackItem = class extends StackItem {
  constructor(next = null) {
    super(next);
    this.rows = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
};
var TableRowStackItem = class extends StackItem {
  constructor(next = null) {
    super(next);
    this.cells = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
};
var TableCellStackItem = class extends StackItem {
  constructor(options, next = null, maxColumnWidth = void 0) {
    super(next);
    this.inlineTextBuilder = new InlineTextBuilder(options, maxColumnWidth);
    this.rawText = "";
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
};
var TransformerStackItem = class extends StackItem {
  constructor(next = null, transform) {
    super(next);
    this.transform = transform;
  }
};
function charactersToCodes(str) {
  return [...str].map((c3) => "\\u" + c3.charCodeAt(0).toString(16).padStart(4, "0")).join("");
}
var WhitespaceProcessor = class {
  /**
   * Creates an instance of WhitespaceProcessor.
   *
   * @param { Options } options    HtmlToText options.
   * @memberof WhitespaceProcessor
   */
  constructor(options) {
    this.whitespaceChars = options.preserveNewlines ? options.whitespaceCharacters.replace(/\n/g, "") : options.whitespaceCharacters;
    const whitespaceCodes = charactersToCodes(this.whitespaceChars);
    this.leadingWhitespaceRe = new RegExp(`^[${whitespaceCodes}]`);
    this.trailingWhitespaceRe = new RegExp(`[${whitespaceCodes}]$`);
    this.allWhitespaceOrEmptyRe = new RegExp(`^[${whitespaceCodes}]*$`);
    this.newlineOrNonWhitespaceRe = new RegExp(`(\\n|[^\\n${whitespaceCodes}])`, "g");
    this.newlineOrNonNewlineStringRe = new RegExp(`(\\n|[^\\n]+)`, "g");
    if (options.preserveNewlines) {
      const wordOrNewlineRe = new RegExp(`\\n|[^\\n${whitespaceCodes}]+`, "gm");
      this.shrinkWrapAdd = function(text, inlineTextBuilder, transform = (str) => str, noWrap = false) {
        if (!text) {
          return;
        }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordOrNewlineRe.exec(text);
        if (m) {
          anyMatch = true;
          if (m[0] === "\n") {
            inlineTextBuilder.startNewLine();
          } else if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordOrNewlineRe.exec(text)) !== null) {
            if (m[0] === "\n") {
              inlineTextBuilder.startNewLine();
            } else {
              inlineTextBuilder.pushWord(transform(m[0]), noWrap);
            }
          }
        }
        inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text);
      };
    } else {
      const wordRe = new RegExp(`[^${whitespaceCodes}]+`, "g");
      this.shrinkWrapAdd = function(text, inlineTextBuilder, transform = (str) => str, noWrap = false) {
        if (!text) {
          return;
        }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordRe.exec(text);
        if (m) {
          anyMatch = true;
          if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordRe.exec(text)) !== null) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          }
        }
        inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text);
      };
    }
  }
  /**
   * Add text with only minimal processing.
   * Everything between newlines considered a single word.
   * No whitespace is trimmed.
   * Not affected by preserveNewlines option - `\n` always starts a new line.
   *
   * `noWrap` argument is `true` by default - this won't start a new line
   * even if there is not enough space left in the current line.
   *
   * @param { string }            text              Input text.
   * @param { InlineTextBuilder } inlineTextBuilder A builder to receive processed text.
   * @param { boolean }           [noWrap] Don't wrap text even if the line is too long.
   */
  addLiteral(text, inlineTextBuilder, noWrap = true) {
    if (!text) {
      return;
    }
    const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
    let anyMatch = false;
    let m = this.newlineOrNonNewlineStringRe.exec(text);
    if (m) {
      anyMatch = true;
      if (m[0] === "\n") {
        inlineTextBuilder.startNewLine();
      } else if (previouslyStashedSpace) {
        inlineTextBuilder.pushWord(m[0], noWrap);
      } else {
        inlineTextBuilder.concatWord(m[0], noWrap);
      }
      while ((m = this.newlineOrNonNewlineStringRe.exec(text)) !== null) {
        if (m[0] === "\n") {
          inlineTextBuilder.startNewLine();
        } else {
          inlineTextBuilder.pushWord(m[0], noWrap);
        }
      }
    }
    inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch;
  }
  /**
   * Test whether the given text starts with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testLeadingWhitespace(text) {
    return this.leadingWhitespaceRe.test(text);
  }
  /**
   * Test whether the given text ends with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testTrailingWhitespace(text) {
    return this.trailingWhitespaceRe.test(text);
  }
  /**
   * Test whether the given text contains any non-whitespace characters.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testContainsWords(text) {
    return !this.allWhitespaceOrEmptyRe.test(text);
  }
  /**
   * Return the number of newlines if there are no words.
   *
   * If any word is found then return zero regardless of the actual number of newlines.
   *
   * @param   { string }  text  Input string.
   * @returns { number }
   */
  countNewlinesNoWords(text) {
    this.newlineOrNonWhitespaceRe.lastIndex = 0;
    let counter = 0;
    let match;
    while ((match = this.newlineOrNonWhitespaceRe.exec(text)) !== null) {
      if (match[0] === "\n") {
        counter++;
      } else {
        return 0;
      }
    }
    return counter;
  }
};
var BlockTextBuilder = class {
  /**
   * Creates an instance of BlockTextBuilder.
   *
   * @param { Options } options HtmlToText options.
   * @param { import('selderee').Picker<DomNode, TagDefinition> } picker Selectors decision tree picker.
   * @param { any} [metadata] Optional metadata for HTML document, for use in formatters.
   */
  constructor(options, picker, metadata = void 0) {
    this.options = options;
    this.picker = picker;
    this.metadata = metadata;
    this.whitespaceProcessor = new WhitespaceProcessor(options);
    this._stackItem = new BlockStackItem(options);
    this._wordTransformer = void 0;
  }
  /**
   * Put a word-by-word transform function onto the transformations stack.
   *
   * Mainly used for uppercasing. Can be bypassed to add unformatted text such as URLs.
   *
   * Word transformations applied before wrapping.
   *
   * @param { (str: string) => string } wordTransform Word transformation function.
   */
  pushWordTransform(wordTransform) {
    this._wordTransformer = new TransformerStackItem(this._wordTransformer, wordTransform);
  }
  /**
   * Remove a function from the word transformations stack.
   *
   * @returns { (str: string) => string } A function that was removed.
   */
  popWordTransform() {
    if (!this._wordTransformer) {
      return void 0;
    }
    const transform = this._wordTransformer.transform;
    this._wordTransformer = this._wordTransformer.next;
    return transform;
  }
  /**
   * Ignore wordwrap option in followup inline additions and disable automatic wrapping.
   */
  startNoWrap() {
    this._stackItem.isNoWrap = true;
  }
  /**
   * Return automatic wrapping to behavior defined by options.
   */
  stopNoWrap() {
    this._stackItem.isNoWrap = false;
  }
  /** @returns { (str: string) => string } */
  _getCombinedWordTransformer() {
    const wt = this._wordTransformer ? (str) => applyTransformer(str, this._wordTransformer) : void 0;
    const ce = this.options.encodeCharacters;
    return wt ? ce ? (str) => ce(wt(str)) : wt : ce;
  }
  _popStackItem() {
    const item = this._stackItem;
    this._stackItem = item.next;
    return item;
  }
  /**
   * Add a line break into currently built block.
   */
  addLineBreak() {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += "\n";
    } else {
      this._stackItem.inlineTextBuilder.startNewLine();
    }
  }
  /**
   * Allow to break line in case directly following text will not fit.
   */
  addWordBreakOpportunity() {
    if (this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem) {
      this._stackItem.inlineTextBuilder.wordBreakOpportunity = true;
    }
  }
  /**
   * Add a node inline into the currently built block.
   *
   * @param { string } str
   * Text content of a node to add.
   *
   * @param { object } [param1]
   * Object holding the parameters of the operation.
   *
   * @param { boolean } [param1.noWordTransform]
   * Ignore word transformers if there are any.
   * Don't encode characters as well.
   * (Use this for things like URL addresses).
   */
  addInline(str, { noWordTransform = false } = {}) {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }
    if (str.length === 0 || // empty string
    this._stackItem.stashedLineBreaks && // stashed linebreaks make whitespace irrelevant
    !this.whitespaceProcessor.testContainsWords(str)) {
      return;
    }
    if (this.options.preserveNewlines) {
      const newlinesNumber = this.whitespaceProcessor.countNewlinesNoWords(str);
      if (newlinesNumber > 0) {
        this._stackItem.inlineTextBuilder.startNewLine(newlinesNumber);
        return;
      }
    }
    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.shrinkWrapAdd(
      str,
      this._stackItem.inlineTextBuilder,
      noWordTransform ? void 0 : this._getCombinedWordTransformer(),
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }
  /**
   * Add a string inline into the currently built block.
   *
   * Use this for markup elements that don't have to adhere
   * to text layout rules.
   *
   * @param { string } str Text to add.
   */
  addLiteral(str) {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (str.length === 0) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }
    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.addLiteral(
      str,
      this._stackItem.inlineTextBuilder,
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }
  /**
   * Start building a new block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any preceding block.
   *
   * @param { number }  [param0.reservedLineLength]
   * Reserve this number of characters on each line for block markup.
   *
   * @param { boolean } [param0.isPre]
   * Should HTML whitespace be preserved inside this block.
   */
  openBlock({ leadingLineBreaks = 1, reservedLineLength = 0, isPre = false } = {}) {
    const maxLineLength = Math.max(20, this._stackItem.inlineTextBuilder.maxLineLength - reservedLineLength);
    this._stackItem = new BlockStackItem(
      this.options,
      this._stackItem,
      leadingLineBreaks,
      maxLineLength
    );
    if (isPre) {
      this._stackItem.isPre = true;
    }
  }
  /**
   * Finalize currently built block, add it's content to the parent block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any following block.
   *
   * @param { (str: string) => string } [param0.blockTransform]
   * A function to transform the block text before adding to the parent block.
   * This happens after word wrap and should be used in combination with reserved line length
   * in order to keep line lengths correct.
   * Used for whole block markup.
   */
  closeBlock({ trailingLineBreaks = 1, blockTransform = void 0 } = {}) {
    const block = this._popStackItem();
    const blockText = blockTransform ? blockTransform(getText(block)) : getText(block);
    addText(this._stackItem, blockText, block.leadingLineBreaks, Math.max(block.stashedLineBreaks, trailingLineBreaks));
  }
  /**
   * Start building a new list.
   *
   * @param { object } [param0]
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.maxPrefixLength]
   * Length of the longest list item prefix.
   * If not supplied or too small then list items won't be aligned properly.
   *
   * @param { 'left' | 'right' } [param0.prefixAlign]
   * Specify how prefixes of different lengths have to be aligned
   * within a column.
   *
   * @param { number } [param0.interRowLineBreaks]
   * Minimum number of line breaks between list items.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any preceding block.
   */
  openList({ maxPrefixLength = 0, prefixAlign = "left", interRowLineBreaks = 1, leadingLineBreaks = 2 } = {}) {
    this._stackItem = new ListStackItem(this.options, this._stackItem, {
      interRowLineBreaks,
      leadingLineBreaks,
      maxLineLength: this._stackItem.inlineTextBuilder.maxLineLength,
      maxPrefixLength,
      prefixAlign
    });
  }
  /**
   * Start building a new list item.
   *
   * @param {object} param0
   * Object holding the parameters of the list item.
   *
   * @param { string } [param0.prefix]
   * Prefix for this list item (item number, bullet point, etc).
   */
  openListItem({ prefix = "" } = {}) {
    if (!(this._stackItem instanceof ListStackItem)) {
      throw new Error("Can't add a list item to something that is not a list! Check the formatter.");
    }
    const list = this._stackItem;
    const prefixLength = Math.max(prefix.length, list.maxPrefixLength);
    const maxLineLength = Math.max(20, list.inlineTextBuilder.maxLineLength - prefixLength);
    this._stackItem = new ListItemStackItem(this.options, list, {
      prefix,
      maxLineLength,
      leadingLineBreaks: list.interRowLineBreaks
    });
  }
  /**
   * Finalize currently built list item, add it's content to the parent list.
   */
  closeListItem() {
    const listItem = this._popStackItem();
    const list = listItem.next;
    const prefixLength = Math.max(listItem.prefix.length, list.maxPrefixLength);
    const spacing = "\n" + " ".repeat(prefixLength);
    const prefix = list.prefixAlign === "right" ? listItem.prefix.padStart(prefixLength) : listItem.prefix.padEnd(prefixLength);
    const text = prefix + getText(listItem).replace(/\n/g, spacing);
    addText(
      list,
      text,
      listItem.leadingLineBreaks,
      Math.max(listItem.stashedLineBreaks, list.interRowLineBreaks)
    );
  }
  /**
   * Finalize currently built list, add it's content to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any following block.
   */
  closeList({ trailingLineBreaks = 2 } = {}) {
    const list = this._popStackItem();
    const text = getText(list);
    if (text) {
      addText(this._stackItem, text, list.leadingLineBreaks, trailingLineBreaks);
    }
  }
  /**
   * Start building a table.
   */
  openTable() {
    this._stackItem = new TableStackItem(this._stackItem);
  }
  /**
   * Start building a table row.
   */
  openTableRow() {
    if (!(this._stackItem instanceof TableStackItem)) {
      throw new Error("Can't add a table row to something that is not a table! Check the formatter.");
    }
    this._stackItem = new TableRowStackItem(this._stackItem);
  }
  /**
   * Start building a table cell.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.maxColumnWidth]
   * Wrap cell content to this width. Fall back to global wordwrap value if undefined.
   */
  openTableCell({ maxColumnWidth = void 0 } = {}) {
    if (!(this._stackItem instanceof TableRowStackItem)) {
      throw new Error("Can't add a table cell to something that is not a table row! Check the formatter.");
    }
    this._stackItem = new TableCellStackItem(this.options, this._stackItem, maxColumnWidth);
  }
  /**
   * Finalize currently built table cell and add it to parent table row's cells.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.colspan] How many columns this cell should occupy.
   * @param { number } [param0.rowspan] How many rows this cell should occupy.
   */
  closeTableCell({ colspan = 1, rowspan = 1 } = {}) {
    const cell = this._popStackItem();
    const text = trimCharacter(getText(cell), "\n");
    cell.next.cells.push({ colspan, rowspan, text });
  }
  /**
   * Finalize currently built table row and add it to parent table's rows.
   */
  closeTableRow() {
    const row = this._popStackItem();
    row.next.rows.push(row.cells);
  }
  /**
   * Finalize currently built table and add the rendered text to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the table.
   *
   * @param { TablePrinter } param0.tableToString
   * A function to convert a table of stringified cells into a complete table.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This table should have at least this number of line breaks to separate if from any preceding block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This table should have at least this number of line breaks to separate it from any following block.
   */
  closeTable({ tableToString: tableToString2, leadingLineBreaks = 2, trailingLineBreaks = 2 }) {
    const table = this._popStackItem();
    const output = tableToString2(table.rows);
    if (output) {
      addText(this._stackItem, output, leadingLineBreaks, trailingLineBreaks);
    }
  }
  /**
   * Return the rendered text content of this builder.
   *
   * @returns { string }
   */
  toString() {
    return getText(this._stackItem.getRoot());
  }
};
function getText(stackItem) {
  if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
    throw new Error("Only blocks, list items and table cells can be requested for text contents.");
  }
  return stackItem.inlineTextBuilder.isEmpty() ? stackItem.rawText : stackItem.rawText + stackItem.inlineTextBuilder.toString();
}
function addText(stackItem, text, leadingLineBreaks, trailingLineBreaks) {
  if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
    throw new Error("Only blocks, list items and table cells can contain text.");
  }
  const parentText = getText(stackItem);
  const lineBreaks = Math.max(stackItem.stashedLineBreaks, leadingLineBreaks);
  stackItem.inlineTextBuilder.clear();
  if (parentText) {
    stackItem.rawText = parentText + "\n".repeat(lineBreaks) + text;
  } else {
    stackItem.rawText = text;
    stackItem.leadingLineBreaks = lineBreaks;
  }
  stackItem.stashedLineBreaks = trailingLineBreaks;
}
function applyTransformer(str, transformer) {
  return transformer ? applyTransformer(transformer.transform(str), transformer.next) : str;
}
function compile$1(options = {}) {
  const selectorsWithoutFormat = options.selectors.filter((s3) => !s3.format);
  if (selectorsWithoutFormat.length) {
    throw new Error(
      "Following selectors have no specified format: " + selectorsWithoutFormat.map((s3) => `\`${s3.selector}\``).join(", ")
    );
  }
  const picker = new DecisionTree(
    options.selectors.map((s3) => [s3.selector, s3])
  ).build(hp2Builder);
  if (typeof options.encodeCharacters !== "function") {
    options.encodeCharacters = makeReplacerFromDict(options.encodeCharacters);
  }
  const baseSelectorsPicker = new DecisionTree(
    options.baseElements.selectors.map((s3, i2) => [s3, i2 + 1])
  ).build(hp2Builder);
  function findBaseElements(dom) {
    return findBases(dom, options, baseSelectorsPicker);
  }
  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk,
    function(dom, builder) {
      builder.addInline(options.limits.ellipsis || "");
    }
  );
  return function(html, metadata = void 0) {
    return process(html, metadata, options, picker, findBaseElements, limitedWalk);
  };
}
function process(html, metadata, options, picker, findBaseElements, walk) {
  const maxInputLength = options.limits.maxInputLength;
  if (maxInputLength && html && html.length > maxInputLength) {
    console.warn(
      `Input length ${html.length} is above allowed limit of ${maxInputLength}. Truncating without ellipsis.`
    );
    html = html.substring(0, maxInputLength);
  }
  const document = parseDocument(html, { decodeEntities: options.decodeEntities });
  const bases = findBaseElements(document.children);
  const builder = new BlockTextBuilder(options, picker, metadata);
  walk(bases, builder);
  return builder.toString();
}
function findBases(dom, options, baseSelectorsPicker) {
  const results = [];
  function recursiveWalk2(walk, dom2) {
    dom2 = dom2.slice(0, options.limits.maxChildNodes);
    for (const elem of dom2) {
      if (elem.type !== "tag") {
        continue;
      }
      const pickedSelectorIndex = baseSelectorsPicker.pick1(elem);
      if (pickedSelectorIndex > 0) {
        results.push({ selectorIndex: pickedSelectorIndex, element: elem });
      } else if (elem.children) {
        walk(elem.children);
      }
      if (results.length >= options.limits.maxBaseElements) {
        return;
      }
    }
  }
  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk2
  );
  limitedWalk(dom);
  if (options.baseElements.orderBy !== "occurrence") {
    results.sort((a, b) => a.selectorIndex - b.selectorIndex);
  }
  return options.baseElements.returnDomByDefault && results.length === 0 ? dom : results.map((x) => x.element);
}
function recursiveWalk(walk, dom, builder) {
  if (!dom) {
    return;
  }
  const options = builder.options;
  const tooManyChildNodes = dom.length > options.limits.maxChildNodes;
  if (tooManyChildNodes) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    dom.push({
      data: options.limits.ellipsis,
      type: "text"
    });
  }
  for (const elem of dom) {
    switch (elem.type) {
      case "text": {
        builder.addInline(elem.data);
        break;
      }
      case "tag": {
        const tagDefinition = builder.picker.pick1(elem);
        const format = options.formatters[tagDefinition.format];
        format(elem, walk, builder, tagDefinition.options || {});
        break;
      }
    }
  }
  return;
}
function makeReplacerFromDict(dict) {
  if (!dict || Object.keys(dict).length === 0) {
    return void 0;
  }
  const entries = Object.entries(dict).filter(([, v]) => v !== false);
  const regex = new RegExp(
    entries.map(([c3]) => `(${unicodeEscape([...c3][0])})`).join("|"),
    "g"
  );
  const values = entries.map(([, v]) => v);
  const replacer = (m, ...cgs) => values[cgs.findIndex((cg) => cg)];
  return (str) => str.replace(regex, replacer);
}
function formatSkip(elem, walk, builder, formatOptions) {
}
function formatInlineString(elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.string || "");
}
function formatBlockString(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addLiteral(formatOptions.string || "");
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInline(elem, walk, builder, formatOptions) {
  walk(elem.children, builder);
}
function formatBlock$1(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function renderOpenTag(elem) {
  const attrs = elem.attribs && elem.attribs.length ? " " + Object.entries(elem.attribs).map(([k, v]) => v === "" ? k : `${k}=${v.replace(/"/g, "&quot;")}`).join(" ") : "";
  return `<${elem.name}${attrs}>`;
}
function renderCloseTag(elem) {
  return `</${elem.name}>`;
}
function formatInlineTag(elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
}
function formatBlockTag(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInlineHtml(elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(
    render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
}
function formatBlockHtml(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(
    render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInlineSurround(elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.prefix || "");
  walk(elem.children, builder);
  builder.addLiteral(formatOptions.suffix || "");
}
var genericFormatters = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  block: formatBlock$1,
  blockHtml: formatBlockHtml,
  blockString: formatBlockString,
  blockTag: formatBlockTag,
  inline: formatInline,
  inlineHtml: formatInlineHtml,
  inlineString: formatInlineString,
  inlineSurround: formatInlineSurround,
  inlineTag: formatInlineTag,
  skip: formatSkip
});
function getRow(matrix, j) {
  if (!matrix[j]) {
    matrix[j] = [];
  }
  return matrix[j];
}
function findFirstVacantIndex(row, x = 0) {
  while (row[x]) {
    x++;
  }
  return x;
}
function transposeInPlace(matrix, maxSize) {
  for (let i2 = 0; i2 < maxSize; i2++) {
    const rowI = getRow(matrix, i2);
    for (let j = 0; j < i2; j++) {
      const rowJ = getRow(matrix, j);
      if (rowI[j] || rowJ[i2]) {
        const temp = rowI[j];
        rowI[j] = rowJ[i2];
        rowJ[i2] = temp;
      }
    }
  }
}
function putCellIntoLayout(cell, layout, baseRow, baseCol) {
  for (let r2 = 0; r2 < cell.rowspan; r2++) {
    const layoutRow = getRow(layout, baseRow + r2);
    for (let c3 = 0; c3 < cell.colspan; c3++) {
      layoutRow[baseCol + c3] = cell;
    }
  }
}
function getOrInitOffset(offsets, index) {
  if (offsets[index] === void 0) {
    offsets[index] = index === 0 ? 0 : 1 + getOrInitOffset(offsets, index - 1);
  }
  return offsets[index];
}
function updateOffset(offsets, base, span, value) {
  offsets[base + span] = Math.max(
    getOrInitOffset(offsets, base + span),
    getOrInitOffset(offsets, base) + value
  );
}
function tableToString(tableRows, rowSpacing, colSpacing) {
  const layout = [];
  let colNumber = 0;
  const rowNumber = tableRows.length;
  const rowOffsets = [0];
  for (let j = 0; j < rowNumber; j++) {
    const layoutRow = getRow(layout, j);
    const cells = tableRows[j];
    let x = 0;
    for (let i2 = 0; i2 < cells.length; i2++) {
      const cell = cells[i2];
      x = findFirstVacantIndex(layoutRow, x);
      putCellIntoLayout(cell, layout, j, x);
      x += cell.colspan;
      cell.lines = cell.text.split("\n");
      const cellHeight = cell.lines.length;
      updateOffset(rowOffsets, j, cell.rowspan, cellHeight + rowSpacing);
    }
    colNumber = layoutRow.length > colNumber ? layoutRow.length : colNumber;
  }
  transposeInPlace(layout, rowNumber > colNumber ? rowNumber : colNumber);
  const outputLines = [];
  const colOffsets = [0];
  for (let x = 0; x < colNumber; x++) {
    let y = 0;
    let cell;
    const rowsInThisColumn = Math.min(rowNumber, layout[x].length);
    while (y < rowsInThisColumn) {
      cell = layout[x][y];
      if (cell) {
        if (!cell.rendered) {
          let cellWidth = 0;
          for (let j = 0; j < cell.lines.length; j++) {
            const line = cell.lines[j];
            const lineOffset = rowOffsets[y] + j;
            outputLines[lineOffset] = (outputLines[lineOffset] || "").padEnd(colOffsets[x]) + line;
            cellWidth = line.length > cellWidth ? line.length : cellWidth;
          }
          updateOffset(colOffsets, x, cell.colspan, cellWidth + colSpacing);
          cell.rendered = true;
        }
        y += cell.rowspan;
      } else {
        const lineOffset = rowOffsets[y];
        outputLines[lineOffset] = outputLines[lineOffset] || "";
        y++;
      }
    }
  }
  return outputLines.join("\n");
}
function formatLineBreak(elem, walk, builder, formatOptions) {
  builder.addLineBreak();
}
function formatWbr(elem, walk, builder, formatOptions) {
  builder.addWordBreakOpportunity();
}
function formatHorizontalLine(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addInline("-".repeat(formatOptions.length || builder.options.wordwrap || 40));
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatParagraph(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatPre(elem, walk, builder, formatOptions) {
  builder.openBlock({
    isPre: true,
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2
  });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatHeading(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  if (formatOptions.uppercase !== false) {
    builder.pushWordTransform((str) => str.toUpperCase());
    walk(elem.children, builder);
    builder.popWordTransform();
  } else {
    walk(elem.children, builder);
  }
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatBlockquote(elem, walk, builder, formatOptions) {
  builder.openBlock({
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2,
    reservedLineLength: 2
  });
  walk(elem.children, builder);
  builder.closeBlock({
    trailingLineBreaks: formatOptions.trailingLineBreaks || 2,
    blockTransform: (str) => (formatOptions.trimEmptyLines !== false ? trimCharacter(str, "\n") : str).split("\n").map((line) => "> " + line).join("\n")
  });
}
function withBrackets(str, brackets) {
  if (!brackets) {
    return str;
  }
  const lbr = typeof brackets[0] === "string" ? brackets[0] : "[";
  const rbr = typeof brackets[1] === "string" ? brackets[1] : "]";
  return lbr + str + rbr;
}
function pathRewrite(path, rewriter, baseUrl, metadata, elem) {
  const modifiedPath = typeof rewriter === "function" ? rewriter(path, metadata, elem) : path;
  return modifiedPath[0] === "/" && baseUrl ? trimCharacterEnd(baseUrl, "/") + modifiedPath : modifiedPath;
}
function formatImage(elem, walk, builder, formatOptions) {
  const attribs = elem.attribs || {};
  const alt = attribs.alt ? attribs.alt : "";
  const src = !attribs.src ? "" : pathRewrite(attribs.src, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
  const text = !src ? alt : !alt ? withBrackets(src, formatOptions.linkBrackets) : alt + " " + withBrackets(src, formatOptions.linkBrackets);
  builder.addInline(text, { noWordTransform: true });
}
function formatAnchor(elem, walk, builder, formatOptions) {
  function getHref() {
    if (formatOptions.ignoreHref) {
      return "";
    }
    if (!elem.attribs || !elem.attribs.href) {
      return "";
    }
    let href2 = elem.attribs.href.replace(/^mailto:/, "");
    if (formatOptions.noAnchorUrl && href2[0] === "#") {
      return "";
    }
    href2 = pathRewrite(href2, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
    return href2;
  }
  const href = getHref();
  if (!href) {
    walk(elem.children, builder);
  } else {
    let text = "";
    builder.pushWordTransform(
      (str) => {
        if (str) {
          text += str;
        }
        return str;
      }
    );
    walk(elem.children, builder);
    builder.popWordTransform();
    const hideSameLink = formatOptions.hideLinkHrefIfSameAsText && href === text;
    if (!hideSameLink) {
      builder.addInline(
        !text ? href : " " + withBrackets(href, formatOptions.linkBrackets),
        { noWordTransform: true }
      );
    }
  }
}
function formatList(elem, walk, builder, formatOptions, nextPrefixCallback) {
  const isNestedList = get(elem, ["parent", "name"]) === "li";
  let maxPrefixLength = 0;
  const listItems = (elem.children || []).filter((child) => child.type !== "text" || !/^\s*$/.test(child.data)).map(function(child) {
    if (child.name !== "li") {
      return { node: child, prefix: "" };
    }
    const prefix = isNestedList ? nextPrefixCallback().trimStart() : nextPrefixCallback();
    if (prefix.length > maxPrefixLength) {
      maxPrefixLength = prefix.length;
    }
    return { node: child, prefix };
  });
  if (!listItems.length) {
    return;
  }
  builder.openList({
    interRowLineBreaks: 1,
    leadingLineBreaks: isNestedList ? 1 : formatOptions.leadingLineBreaks || 2,
    maxPrefixLength,
    prefixAlign: "left"
  });
  for (const { node, prefix } of listItems) {
    builder.openListItem({ prefix });
    walk([node], builder);
    builder.closeListItem();
  }
  builder.closeList({ trailingLineBreaks: isNestedList ? 1 : formatOptions.trailingLineBreaks || 2 });
}
function formatUnorderedList(elem, walk, builder, formatOptions) {
  const prefix = formatOptions.itemPrefix || " * ";
  return formatList(elem, walk, builder, formatOptions, () => prefix);
}
function formatOrderedList(elem, walk, builder, formatOptions) {
  let nextIndex = Number(elem.attribs.start || "1");
  const indexFunction = getOrderedListIndexFunction(elem.attribs.type);
  const nextPrefixCallback = () => " " + indexFunction(nextIndex++) + ". ";
  return formatList(elem, walk, builder, formatOptions, nextPrefixCallback);
}
function getOrderedListIndexFunction(olType = "1") {
  switch (olType) {
    case "a":
      return (i2) => numberToLetterSequence(i2, "a");
    case "A":
      return (i2) => numberToLetterSequence(i2, "A");
    case "i":
      return (i2) => numberToRoman(i2).toLowerCase();
    case "I":
      return (i2) => numberToRoman(i2);
    case "1":
    default:
      return (i2) => i2.toString();
  }
}
function splitClassesAndIds(selectors) {
  const classes = [];
  const ids = [];
  for (const selector of selectors) {
    if (selector.startsWith(".")) {
      classes.push(selector.substring(1));
    } else if (selector.startsWith("#")) {
      ids.push(selector.substring(1));
    }
  }
  return { classes, ids };
}
function isDataTable(attr, tables) {
  if (tables === true) {
    return true;
  }
  if (!attr) {
    return false;
  }
  const { classes, ids } = splitClassesAndIds(tables);
  const attrClasses = (attr["class"] || "").split(" ");
  const attrIds = (attr["id"] || "").split(" ");
  return attrClasses.some((x) => classes.includes(x)) || attrIds.some((x) => ids.includes(x));
}
function formatTable(elem, walk, builder, formatOptions) {
  return isDataTable(elem.attribs, builder.options.tables) ? formatDataTable(elem, walk, builder, formatOptions) : formatBlock(elem, walk, builder, formatOptions);
}
function formatBlock(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks });
}
function formatDataTable(elem, walk, builder, formatOptions) {
  builder.openTable();
  elem.children.forEach(walkTable);
  builder.closeTable({
    tableToString: (rows) => tableToString(rows, formatOptions.rowSpacing ?? 0, formatOptions.colSpacing ?? 3),
    leadingLineBreaks: formatOptions.leadingLineBreaks,
    trailingLineBreaks: formatOptions.trailingLineBreaks
  });
  function formatCell(cellNode) {
    const colspan = +get(cellNode, ["attribs", "colspan"]) || 1;
    const rowspan = +get(cellNode, ["attribs", "rowspan"]) || 1;
    builder.openTableCell({ maxColumnWidth: formatOptions.maxColumnWidth });
    walk(cellNode.children, builder);
    builder.closeTableCell({ colspan, rowspan });
  }
  function walkTable(elem2) {
    if (elem2.type !== "tag") {
      return;
    }
    const formatHeaderCell = formatOptions.uppercaseHeaderCells !== false ? (cellNode) => {
      builder.pushWordTransform((str) => str.toUpperCase());
      formatCell(cellNode);
      builder.popWordTransform();
    } : formatCell;
    switch (elem2.name) {
      case "thead":
      case "tbody":
      case "tfoot":
      case "center":
        elem2.children.forEach(walkTable);
        return;
      case "tr": {
        builder.openTableRow();
        for (const childOfTr of elem2.children) {
          if (childOfTr.type !== "tag") {
            continue;
          }
          switch (childOfTr.name) {
            case "th": {
              formatHeaderCell(childOfTr);
              break;
            }
            case "td": {
              formatCell(childOfTr);
              break;
            }
          }
        }
        builder.closeTableRow();
        break;
      }
    }
  }
}
var textFormatters = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  anchor: formatAnchor,
  blockquote: formatBlockquote,
  dataTable: formatDataTable,
  heading: formatHeading,
  horizontalLine: formatHorizontalLine,
  image: formatImage,
  lineBreak: formatLineBreak,
  orderedList: formatOrderedList,
  paragraph: formatParagraph,
  pre: formatPre,
  table: formatTable,
  unorderedList: formatUnorderedList,
  wbr: formatWbr
});
var DEFAULT_OPTIONS = {
  baseElements: {
    selectors: ["body"],
    orderBy: "selectors",
    // 'selectors' | 'occurrence'
    returnDomByDefault: true
  },
  decodeEntities: true,
  encodeCharacters: {},
  formatters: {},
  limits: {
    ellipsis: "...",
    maxBaseElements: void 0,
    maxChildNodes: void 0,
    maxDepth: void 0,
    maxInputLength: 1 << 24
    // 16_777_216
  },
  longWordSplit: {
    forceWrapOnLimit: false,
    wrapCharacters: []
  },
  preserveNewlines: false,
  selectors: [
    { selector: "*", format: "inline" },
    {
      selector: "a",
      format: "anchor",
      options: {
        baseUrl: null,
        hideLinkHrefIfSameAsText: false,
        ignoreHref: false,
        linkBrackets: ["[", "]"],
        noAnchorUrl: true
      }
    },
    { selector: "article", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "aside", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "blockquote",
      format: "blockquote",
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2, trimEmptyLines: true }
    },
    { selector: "br", format: "lineBreak" },
    { selector: "div", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "footer", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "form", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "h1", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h2", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h3", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h4", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h5", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h6", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "header", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "hr",
      format: "horizontalLine",
      options: { leadingLineBreaks: 2, length: void 0, trailingLineBreaks: 2 }
    },
    {
      selector: "img",
      format: "image",
      options: { baseUrl: null, linkBrackets: ["[", "]"] }
    },
    { selector: "main", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "nav", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "ol",
      format: "orderedList",
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: "p", format: "paragraph", options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: "pre", format: "pre", options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: "section", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "table",
      format: "table",
      options: {
        colSpacing: 3,
        leadingLineBreaks: 2,
        maxColumnWidth: 60,
        rowSpacing: 0,
        trailingLineBreaks: 2,
        uppercaseHeaderCells: true
      }
    },
    {
      selector: "ul",
      format: "unorderedList",
      options: { itemPrefix: " * ", leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: "wbr", format: "wbr" }
  ],
  tables: [],
  // deprecated
  whitespaceCharacters: " 	\r\n\f\u200B",
  wordwrap: 80
};
var concatMerge = (acc, src, options) => [...acc, ...src];
var overwriteMerge = (acc, src, options) => [...src];
var selectorsMerge = (acc, src, options) => acc.some((s3) => typeof s3 === "object") ? concatMerge(acc, src) : overwriteMerge(acc, src);
function compile(options = {}) {
  options = (0, import_deepmerge.default)(
    DEFAULT_OPTIONS,
    options,
    {
      arrayMerge: overwriteMerge,
      customMerge: (key) => key === "selectors" ? selectorsMerge : void 0
    }
  );
  options.formatters = Object.assign({}, genericFormatters, textFormatters, options.formatters);
  options.selectors = mergeDuplicatesPreferLast(options.selectors, (s3) => s3.selector);
  handleDeprecatedOptions(options);
  return compile$1(options);
}
function convert(html, options = {}, metadata = void 0) {
  return compile(options)(html, metadata);
}
function handleDeprecatedOptions(options) {
  if (options.tags) {
    const tagDefinitions = Object.entries(options.tags).map(
      ([selector, definition]) => ({ ...definition, selector: selector || "*" })
    );
    options.selectors.push(...tagDefinitions);
    options.selectors = mergeDuplicatesPreferLast(options.selectors, (s3) => s3.selector);
  }
  function set(obj, path, value) {
    const valueKey = path.pop();
    for (const key of path) {
      let nested = obj[key];
      if (!nested) {
        nested = {};
        obj[key] = nested;
      }
      obj = nested;
    }
    obj[valueKey] = value;
  }
  if (options["baseElement"]) {
    const baseElement = options["baseElement"];
    set(
      options,
      ["baseElements", "selectors"],
      Array.isArray(baseElement) ? baseElement : [baseElement]
    );
  }
  if (options["returnDomByDefault"] !== void 0) {
    set(options, ["baseElements", "returnDomByDefault"], options["returnDomByDefault"]);
  }
  for (const definition of options.selectors) {
    if (definition.format === "anchor" && get(definition, ["options", "noLinkBrackets"])) {
      set(definition, ["options", "linkBrackets"], false);
    }
  }
}

// index.js
function randomId(length) {
  const elements = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i2 = 0; i2 < length; i2++) {
    result += elements[Math.floor(Math.random() * elements.length)];
  }
  return result;
}
async function streamToArrayBuffer(stream, streamSize) {
  const result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}
async function parseEmail(message) {
  const raw = await streamToArrayBuffer(message.raw, message.rawSize);
  const PostalMime = require_postal_mime();
  const parser = new PostalMime.default();
  const email = await parser.parse(raw);
  const id = randomId(32);
  const cache = {
    id,
    messageId: email.messageId,
    from: message.from,
    to: message.to,
    subject: email.subject
  };
  if (email.html) {
    cache.html = email.html;
  }
  if (email.text) {
    cache.text = email.text;
  } else if (email.html) {
    cache.text = convert(email.html, {});
  }
  return cache;
}
function canHandleMessage(message, env) {
  const {
    BLOCK_LIST,
    WHITE_LIST
  } = env;
  const matchAddress = (raw, address2) => {
    if (!raw) {
      return false;
    }
    let list = [];
    try {
      list = JSON.parse(raw);
    } catch (e3) {
      return false;
    }
    if (!Array.isArray(list)) {
      return false;
    }
    for (const item of list) {
      const regex = new RegExp(item);
      if (regex.test(address2)) {
        return true;
      }
    }
    return false;
  };
  const address = [];
  if (message.from) {
    address.push(message.from);
  }
  if (message.to) {
    address.push(message.to);
  }
  for (const addr of address) {
    if (!matchAddress(WHITE_LIST, addr)) {
      if (matchAddress(BLOCK_LIST, addr)) {
        return false;
      }
    }
  }
  return true;
}
async function sendTelegramRequest(token2, method, body) {
  return await fetch(`https://api.telegram.org/bot${token2}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}
async function sendMailToTelegram(message, env) {
  const {
    TELEGRAM_TOKEN,
    TELEGRAM_ID,
    MAIL_TTL,
    DOMAIN,
    DB
  } = env;
  let ttl = MAIL_TTL && parseInt(MAIL_TTL, 10);
  ttl = isNaN(ttl) ? 60 * 60 * 24 : ttl;
  const mail = await parseEmail(message);
  await DB.put(mail.id, JSON.stringify(mail), { expirationTtl: ttl });
  const text = `
${mail.subject}

-----------
From	:	${mail.from}
To		:	${mail.to}
  `;
  const preview = `https://${DOMAIN}/email/${mail.id}?mode=text`;
  const fullHTML = `https://${DOMAIN}/email/${mail.id}?mode=html`;
  await sendTelegramRequest(TELEGRAM_TOKEN, "sendMessage", {
    chat_id: TELEGRAM_ID,
    text,
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Preview",
            callback_data: `p:${mail.id}`
          },
          {
            text: "Text",
            url: preview
          },
          {
            text: "HTML",
            url: fullHTML
          }
        ]
      ]
    }
  });
}
async function telegramWebhookHandler(req, env) {
  const {
    TELEGRAM_TOKEN,
    DB
  } = env;
  const body = await req.json();
  const data = body?.callback_query?.data || "";
  const chatId = body?.callback_query?.message?.chat?.id;
  const messageId = body?.callback_query?.message?.message_id;
  if (data.startsWith("p:")) {
    const id = data.substring(2);
    const value = await DB.get(id).then((value2) => JSON.parse(value2)).catch(() => null);
    if (value?.text) {
      await sendTelegramRequest(TELEGRAM_TOKEN, "sendMessage", {
        chat_id: chatId,
        text: value.text.substring(0, 4096),
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Close",
                callback_data: `d:`
              }
            ]
          ]
        }
      });
      return;
    }
  }
  if (data === "d:") {
    await sendTelegramRequest(TELEGRAM_TOKEN, "deleteMessage", {
      chat_id: chatId,
      message_id: messageId
    });
    return;
  }
  console.log(`Unknown data: ${data}`);
}
async function fetchHandler(request, env, ctx) {
  const router = e();
  const {
    TELEGRAM_TOKEN,
    DOMAIN,
    DB
  } = env;
  router.get("/init", async () => {
    return sendTelegramRequest(TELEGRAM_TOKEN, "setWebhook", {
      url: `https://${DOMAIN}/telegram/${TELEGRAM_TOKEN}/webhook`
    });
  });
  router.post("/telegram/:token/webhook", async (req) => {
    if (req.params.token !== TELEGRAM_TOKEN) {
      return;
    }
    try {
      await telegramWebhookHandler(req, env);
    } catch (e3) {
      console.error(e3);
    }
    return new Response("OK");
  });
  router.get("/email/:id", async (req) => {
    const id = req.params.id;
    const mode = req.query.mode || "text";
    const value = await DB.get(id).then((value2) => JSON.parse(value2)).catch(() => null);
    if (value?.[mode]) {
      const headers = {};
      switch (mode) {
        case "html":
          headers["content-type"] = "text/html; charset=utf-8";
          break;
        default:
          headers["content-type"] = "text/plain; charset=utf-8";
          break;
      }
      return new Response(value[mode], {
        headers
      });
    } else {
      return new Response("Not found", {
        status: 404
      });
    }
  });
  router.all("*", async () => {
    return new Response("It works!");
  });
  return router.handle(request).catch((e3) => {
    return new Response(e3.message, {
      status: 500
    });
  });
}
async function emailHandler(message, env, ctx) {
  const {
    FORWARD_LIST
  } = env;
  if (!canHandleMessage(message, env)) {
    return;
  }
  try {
    await sendMailToTelegram(message, env);
  } catch (e3) {
    console.error(e3);
  }
  try {
    const forwardList = (FORWARD_LIST || "").split(",");
    for (const forward of forwardList) {
      try {
        await message.forward(forward.trim());
      } catch (e3) {
        console.error(e3);
      }
    }
  } catch (e3) {
    console.error(e3);
  }
}
var mail2telegram_default = {
  fetch: fetchHandler,
  email: emailHandler
};
export {
  mail2telegram_default as default
};
