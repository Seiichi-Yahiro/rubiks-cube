var at={exports:{}},Ct=at.exports,St;function Tt(){return St||(St=1,function(jt,Jt){(function(W,S){jt.exports=S()})(typeof self<"u"?self:Ct,function(){return function(W){var S={};function v(u){if(S[u])return S[u].exports;var f=S[u]={i:u,l:!1,exports:{}};return W[u].call(f.exports,f,f.exports,v),f.l=!0,f.exports}return v.m=W,v.c=S,v.d=function(u,f,T){v.o(u,f)||Object.defineProperty(u,f,{configurable:!1,enumerable:!0,get:T})},v.r=function(u){Object.defineProperty(u,"__esModule",{value:!0})},v.n=function(u){var f=u&&u.__esModule?function(){return u.default}:function(){return u};return v.d(f,"a",f),f},v.o=function(u,f){return Object.prototype.hasOwnProperty.call(u,f)},v.p="",v(v.s=0)}([function(W,S,v){function u(t){if(!(this instanceof u))return new u(t);this._=t}var f=u.prototype;function T(t,n){for(var r=0;r<t;r++)n(r)}function j(t,n,r){return function(e,o){T(o.length,function(i){e(o[i],i,o)})}(function(e,o,i){n=t(n,e,o,i)},r),n}function B(t,n){return j(function(r,e,o,i){return r.concat([t(e,o,i)])},[],n)}function Lt(t,n){var r={v:0,buf:n};return T(t,function(){var e;r={v:r.v<<1|(e=r.buf,e[0]>>7),buf:function(o){var i=j(function(a,c,s,d){return a.concat(s===d.length-1?Buffer.from([c,0]).readUInt16BE(0):d.readUInt16BE(s))},[],o);return Buffer.from(B(function(a){return(a<<1&65535)>>8},i))}(r.buf)}}),r}function lt(){return typeof Buffer<"u"}function V(){if(!lt())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function pt(t){V();var n=j(function(i,a){return i+a},0,t);if(n%8!=0)throw new Error("The bits ["+t.join(", ")+"] add up to "+n+" which is not an even number of bytes; the total should be divisible by 8");var r,e=n/8,o=(r=function(i){return i>48},j(function(i,a){return i||(r(a)?a:i)},null,t));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new u(function(i,a){var c=e+a;return c>i.length?g(a,e.toString()+" bytes"):l(c,j(function(s,d){var h=Lt(d,s.buf);return{coll:s.coll.concat(h.v),buf:h.buf}},{coll:[],buf:i.slice(a,c)},t).coll)})}function E(t,n){return new u(function(r,e){return V(),e+n>r.length?g(e,n+" bytes for "+t):l(e+n,r.slice(e,e+n))})}function $(t,n){if(typeof(r=n)!="number"||Math.floor(r)!==r||n<0||n>6)throw new Error(t+" requires integer length in range [0, 6].");var r}function H(t){return $("uintBE",t),E("uintBE("+t+")",t).map(function(n){return n.readUIntBE(0,t)})}function K(t){return $("uintLE",t),E("uintLE("+t+")",t).map(function(n){return n.readUIntLE(0,t)})}function Q(t){return $("intBE",t),E("intBE("+t+")",t).map(function(n){return n.readIntBE(0,t)})}function X(t){return $("intLE",t),E("intLE("+t+")",t).map(function(n){return n.readIntLE(0,t)})}function D(t){return t instanceof u}function P(t){return{}.toString.call(t)==="[object Array]"}function N(t){return lt()&&Buffer.isBuffer(t)}function l(t,n){return{status:!0,index:t,value:n,furthest:-1,expected:[]}}function g(t,n){return P(n)||(n=[n]),{status:!1,index:-1,value:null,furthest:t,expected:n}}function y(t,n){if(!n||t.furthest>n.furthest)return t;var r=t.furthest===n.furthest?function(e,o){if(function(){if(u._supportsSet!==void 0)return u._supportsSet;var x=typeof Set<"u";return u._supportsSet=x,x}()&&Array.from){for(var i=new Set(e),a=0;a<o.length;a++)i.add(o[a]);var c=Array.from(i);return c.sort(),c}for(var s={},d=0;d<e.length;d++)s[e[d]]=!0;for(var h=0;h<o.length;h++)s[o[h]]=!0;var b=[];for(var m in s)({}).hasOwnProperty.call(s,m)&&b.push(m);return b.sort(),b}(t.expected,n.expected):n.expected;return{status:t.status,index:t.index,value:t.value,furthest:n.furthest,expected:r}}var Y={};function ht(t,n){if(N(t))return{offset:n,line:-1,column:-1};t in Y||(Y[t]={});for(var r=Y[t],e=0,o=0,i=0,a=n;a>=0;){if(a in r){e=r[a].line,i===0&&(i=r[a].lineStart);break}(t.charAt(a)===`
`||t.charAt(a)==="\r"&&t.charAt(a+1)!==`
`)&&(o++,i===0&&(i=a+1)),a--}var c=e+o,s=n-i;return r[n]={line:c,lineStart:i},{offset:n,line:c+1,column:s+1}}function A(t){if(!D(t))throw new Error("not a parser: "+t)}function Z(t,n){return typeof t=="string"?t.charAt(n):t[n]}function I(t){if(typeof t!="number")throw new Error("not a number: "+t)}function L(t){if(typeof t!="function")throw new Error("not a function: "+t)}function G(t){if(typeof t!="string")throw new Error("not a string: "+t)}var Ot=2,kt=3,_=8,qt=5*_,Pt=4*_,dt="  ";function tt(t,n){return new Array(n+1).join(t)}function nt(t,n,r){var e=n-t.length;return e<=0?t:tt(r,e)+t}function vt(t,n,r,e){return{from:t-n>0?t-n:0,to:t+r>e?e:t+r}}function At(t,n){var r,e,o,i,a,c=n.index,s=c.offset,d=1;if(s===t.length)return"Got the end of the input";if(N(t)){var h=s-s%_,b=s-h,m=vt(h,qt,Pt+_,t.length),x=B(function(p){return B(function(M){return nt(M.toString(16),2,"0")},p)},function(p,M){var z=p.length,q=[],R=0;if(z<=M)return[p.slice()];for(var U=0;U<z;U++)q[R]||q.push([]),q[R].push(p[U]),(U+1)%M==0&&R++;return q}(t.slice(m.from,m.to).toJSON().data,_));i=function(p){return p.from===0&&p.to===1?{from:p.from,to:p.to}:{from:p.from/_,to:Math.floor(p.to/_)}}(m),e=h/_,r=3*b,b>=4&&(r+=1),d=2,o=B(function(p){return p.length<=4?p.join(" "):p.slice(0,4).join(" ")+"  "+p.slice(4).join(" ")},x),(a=(8*(i.to>0?i.to-1:i.to)).toString(16).length)<2&&(a=2)}else{var F=t.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,i=vt(e,Ot,kt,F.length),o=F.slice(i.from,i.to),a=i.to.toString().length}var Gt=e-i.from;return N(t)&&(a=(8*(i.to>0?i.to-1:i.to)).toString(16).length)<2&&(a=2),j(function(p,M,z){var q,R=z===Gt,U=R?"> ":dt;return q=N(t)?nt((8*(i.from+z)).toString(16),a,"0"):nt((i.from+z+1).toString(),a," "),[].concat(p,[U+q+" | "+M],R?[dt+tt(" ",a)+" | "+nt("",r," ")+tt("^",d)]:[])},[],o).join(`
`)}function gt(t,n){return[`
`,"-- PARSING FAILED "+tt("-",50),`

`,At(t,n),`

`,(r=n.expected,r.length===1?`Expected:

`+r[0]:`Expected one of the following: 

`+r.join(", ")),`
`].join("");var r}function mt(t){return t.flags!==void 0?t.flags:[t.global?"g":"",t.ignoreCase?"i":"",t.multiline?"m":"",t.unicode?"u":"",t.sticky?"y":""].join("")}function rt(){for(var t=[].slice.call(arguments),n=t.length,r=0;r<n;r+=1)A(t[r]);return u(function(e,o){for(var i,a=new Array(n),c=0;c<n;c+=1){if(!(i=y(t[c]._(e,o),i)).status)return i;a[c]=i.value,o=i.index}return y(l(o,a),i)})}function O(){var t=[].slice.call(arguments);if(t.length===0)throw new Error("seqMap needs at least one argument");var n=t.pop();return L(n),rt.apply(null,t).map(function(r){return n.apply(null,r)})}function et(){var t=[].slice.call(arguments),n=t.length;if(n===0)return ut("zero alternates");for(var r=0;r<n;r+=1)A(t[r]);return u(function(e,o){for(var i,a=0;a<t.length;a+=1)if((i=y(t[a]._(e,o),i)).status)return i;return i})}function yt(t,n){return ft(t,n).or(k([]))}function ft(t,n){return A(t),A(n),O(t,n.then(t).many(),function(r,e){return[r].concat(e)})}function C(t){G(t);var n="'"+t+"'";return u(function(r,e){var o=e+t.length,i=r.slice(e,o);return i===t?l(o,i):g(e,n)})}function w(t,n){(function(o){if(!(o instanceof RegExp))throw new Error("not a regexp: "+o);for(var i=mt(o),a=0;a<i.length;a++){var c=i.charAt(a);if(c!=="i"&&c!=="m"&&c!=="u"&&c!=="s")throw new Error('unsupported regexp flag "'+c+'": '+o)}})(t),arguments.length>=2?I(n):n=0;var r=function(o){return RegExp("^(?:"+o.source+")",mt(o))}(t),e=""+t;return u(function(o,i){var a=r.exec(o.slice(i));if(a){if(0<=n&&n<=a.length){var c=a[0],s=a[n];return l(i+c.length,s)}return g(i,"valid match group (0 to "+a.length+") in "+e)}return g(i,e)})}function k(t){return u(function(n,r){return l(r,t)})}function ut(t){return u(function(n,r){return g(r,t)})}function ot(t){if(D(t))return u(function(n,r){var e=t._(n,r);return e.index=r,e.value="",e});if(typeof t=="string")return ot(C(t));if(t instanceof RegExp)return ot(w(t));throw new Error("not a string, regexp, or parser: "+t)}function Et(t){return A(t),u(function(n,r){var e=t._(n,r),o=n.slice(r,e.index);return e.status?g(r,'not "'+o+'"'):l(r,null)})}function it(t){return L(t),u(function(n,r){var e=Z(n,r);return r<n.length&&t(e)?l(r+1,e):g(r,"a character/byte matching "+t)})}function wt(t,n){arguments.length<2&&(n=t,t=void 0);var r=u(function(e,o){return r._=n()._,r._(e,o)});return t?r.desc(t):r}function ct(){return ut("fantasy-land/empty")}f.parse=function(t){if(typeof t!="string"&&!N(t))throw new Error(".parse must be called with a string or Buffer as its argument");var n,r=this.skip(st)._(t,0);return n=r.status?{status:!0,value:r.value}:{status:!1,index:ht(t,r.furthest),expected:r.expected},delete Y[t],n},f.tryParse=function(t){var n=this.parse(t);if(n.status)return n.value;var r=gt(t,n),e=new Error(r);throw e.type="ParsimmonError",e.result=n,e},f.assert=function(t,n){return this.chain(function(r){return t(r)?k(r):ut(n)})},f.or=function(t){return et(this,t)},f.trim=function(t){return this.wrap(t,t)},f.wrap=function(t,n){return O(t,this,n,function(r,e){return e})},f.thru=function(t){return t(this)},f.then=function(t){return A(t),rt(this,t).map(function(n){return n[1]})},f.many=function(){var t=this;return u(function(n,r){for(var e=[],o=void 0;;){if(!(o=y(t._(n,r),o)).status)return y(l(r,e),o);if(r===o.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=o.index,e.push(o.value)}})},f.tieWith=function(t){return G(t),this.map(function(n){if(function(o){if(!P(o))throw new Error("not an array: "+o)}(n),n.length){G(n[0]);for(var r=n[0],e=1;e<n.length;e++)G(n[e]),r+=t+n[e];return r}return""})},f.tie=function(){return this.tieWith("")},f.times=function(t,n){var r=this;return arguments.length<2&&(n=t),I(t),I(n),u(function(e,o){for(var i=[],a=void 0,c=void 0,s=0;s<t;s+=1){if(c=y(a=r._(e,o),c),!a.status)return c;o=a.index,i.push(a.value)}for(;s<n&&(c=y(a=r._(e,o),c),a.status);s+=1)o=a.index,i.push(a.value);return y(l(o,i),c)})},f.result=function(t){return this.map(function(){return t})},f.atMost=function(t){return this.times(0,t)},f.atLeast=function(t){return O(this.times(t),this.many(),function(n,r){return n.concat(r)})},f.map=function(t){L(t);var n=this;return u(function(r,e){var o=n._(r,e);return o.status?y(l(o.index,t(o.value)),o):o})},f.contramap=function(t){L(t);var n=this;return u(function(r,e){var o=n.parse(t(r.slice(e)));return o.status?l(e+r.length,o.value):o})},f.promap=function(t,n){return L(t),L(n),this.contramap(t).map(n)},f.skip=function(t){return rt(this,t).map(function(n){return n[0]})},f.mark=function(){return O(J,this,J,function(t,n,r){return{start:t,value:n,end:r}})},f.node=function(t){return O(J,this,J,function(n,r,e){return{name:t,value:r,start:n,end:e}})},f.sepBy=function(t){return yt(this,t)},f.sepBy1=function(t){return ft(this,t)},f.lookahead=function(t){return this.skip(ot(t))},f.notFollowedBy=function(t){return this.skip(Et(t))},f.desc=function(t){P(t)||(t=[t]);var n=this;return u(function(r,e){var o=n._(r,e);return o.status||(o.expected=t),o})},f.fallback=function(t){return this.or(k(t))},f.ap=function(t){return O(t,this,function(n,r){return n(r)})},f.chain=function(t){var n=this;return u(function(r,e){var o=n._(r,e);return o.status?y(t(o.value)._(r,o.index),o):o})},f.concat=f.or,f.empty=ct,f.of=k,f["fantasy-land/ap"]=f.ap,f["fantasy-land/chain"]=f.chain,f["fantasy-land/concat"]=f.concat,f["fantasy-land/empty"]=f.empty,f["fantasy-land/of"]=f.of,f["fantasy-land/map"]=f.map;var J=u(function(t,n){return l(n,ht(t,n))}),It=u(function(t,n){return n>=t.length?g(n,"any character/byte"):l(n+1,Z(t,n))}),Ft=u(function(t,n){return l(t.length,t.slice(n))}),st=u(function(t,n){return n<t.length?g(n,"EOF"):l(n,null)}),Mt=w(/[0-9]/).desc("a digit"),zt=w(/[0-9]*/).desc("optional digits"),Rt=w(/[a-z]/i).desc("a letter"),Ut=w(/[a-z]*/i).desc("optional letters"),Wt=w(/\s*/).desc("optional whitespace"),Dt=w(/\s+/).desc("whitespace"),bt=C("\r"),xt=C(`
`),Bt=C(`\r
`),_t=et(Bt,xt,bt).desc("newline"),Nt=et(_t,st);u.all=Ft,u.alt=et,u.any=It,u.cr=bt,u.createLanguage=function(t){var n={};for(var r in t)({}).hasOwnProperty.call(t,r)&&function(e){n[e]=wt(function(){return t[e](n)})}(r);return n},u.crlf=Bt,u.custom=function(t){return u(t(l,g))},u.digit=Mt,u.digits=zt,u.empty=ct,u.end=Nt,u.eof=st,u.fail=ut,u.formatError=gt,u.index=J,u.isParser=D,u.lazy=wt,u.letter=Rt,u.letters=Ut,u.lf=xt,u.lookahead=ot,u.makeFailure=g,u.makeSuccess=l,u.newline=_t,u.noneOf=function(t){return it(function(n){return t.indexOf(n)<0}).desc("none of '"+t+"'")},u.notFollowedBy=Et,u.of=k,u.oneOf=function(t){for(var n=t.split(""),r=0;r<n.length;r++)n[r]="'"+n[r]+"'";return it(function(e){return t.indexOf(e)>=0}).desc(n)},u.optWhitespace=Wt,u.Parser=u,u.range=function(t,n){return it(function(r){return t<=r&&r<=n}).desc(t+"-"+n)},u.regex=w,u.regexp=w,u.sepBy=yt,u.sepBy1=ft,u.seq=rt,u.seqMap=O,u.seqObj=function(){for(var t,n={},r=0,e=(t=arguments,Array.prototype.slice.call(t)),o=e.length,i=0;i<o;i+=1){var a=e[i];if(!D(a)){if(P(a)&&a.length===2&&typeof a[0]=="string"&&D(a[1])){var c=a[0];if(Object.prototype.hasOwnProperty.call(n,c))throw new Error("seqObj: duplicate key "+c);n[c]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(r===0)throw new Error("seqObj expects at least one named parser, found zero");return u(function(s,d){for(var h,b={},m=0;m<o;m+=1){var x,F;if(P(e[m])?(x=e[m][0],F=e[m][1]):(x=null,F=e[m]),!(h=y(F._(s,d),h)).status)return h;x&&(b[x]=h.value),d=h.index}return y(l(d,b),h)})},u.string=C,u.succeed=k,u.takeWhile=function(t){return L(t),u(function(n,r){for(var e=r;e<n.length&&t(Z(n,e));)e++;return l(e,n.slice(r,e))})},u.test=it,u.whitespace=Dt,u["fantasy-land/empty"]=ct,u["fantasy-land/of"]=k,u.Binary={bitSeq:pt,bitSeqObj:function(t){V();var n={},r=0,e=B(function(i){if(P(i)){var a=i;if(a.length!==2)throw new Error("["+a.join(", ")+"] should be length 2, got length "+a.length);if(G(a[0]),I(a[1]),Object.prototype.hasOwnProperty.call(n,a[0]))throw new Error("duplicate key in bitSeqObj: "+a[0]);return n[a[0]]=!0,r++,a}return I(i),[null,i]},t);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+t.join(", ")+"]");var o=B(function(i){return i[0]},e);return pt(B(function(i){return i[1]},e)).map(function(i){return j(function(a,c){return c[0]!==null&&(a[c[0]]=c[1]),a},{},B(function(a,c){return[a,i[c]]},o))})},byte:function(t){if(V(),I(t),t>255)throw new Error("Value specified to byte constructor ("+t+"=0x"+t.toString(16)+") is larger in value than a single byte.");var n=(t>15?"0x":"0x0")+t.toString(16);return u(function(r,e){var o=Z(r,e);return o===t?l(e+1,o):g(e,n)})},buffer:function(t){return E("buffer",t).map(function(n){return Buffer.from(n)})},encodedString:function(t,n){return E("string",n).map(function(r){return r.toString(t)})},uintBE:H,uint8BE:H(1),uint16BE:H(2),uint32BE:H(4),uintLE:K,uint8LE:K(1),uint16LE:K(2),uint32LE:K(4),intBE:Q,int8BE:Q(1),int16BE:Q(2),int32BE:Q(4),intLE:X,int8LE:X(1),int16LE:X(2),int32LE:X(4),floatBE:E("floatBE",4).map(function(t){return t.readFloatBE(0)}),floatLE:E("floatLE",4).map(function(t){return t.readFloatLE(0)}),doubleBE:E("doubleBE",8).map(function(t){return t.readDoubleBE(0)}),doubleLE:E("doubleLE",8).map(function(t){return t.readDoubleLE(0)})},W.exports=u}])})}(at)),at.exports}export{Tt as r};
