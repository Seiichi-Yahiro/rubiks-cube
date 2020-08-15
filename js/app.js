!function(e){function t(t){for(var r,i,c=t[0],u=t[1],s=t[2],f=0,m=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(l&&l(t);m.length;)m.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var l=u;o.push([125,1]),n()}({115:function(e,t,n){},120:function(e,t,n){},123:function(e,t,n){},124:function(e,t,n){},125:function(e,t,n){"use strict";n.r(t);var r,a,o,i,c=n(0),u=n.n(c),s=n(15),l=n.n(s),f=n(23),m=n(16),d={setCubeDimension:Object(m.b)("SET_CUBE_DIMENSION"),setCubeScale:Object(m.b)("SET_CUBE_SCALE"),setRotationAnimationSpeed:Object(m.b)("SET_ROTATION_ANIMATION_SPEED"),updateCubicles:Object(m.b)("UPDATE_CUBICLES"),applyRotationCommands:Object(m.b)("APPLY_ROTATION_COMMANDS"),resetCube:Object(m.b)("RESET_CUBE")},p=n(7),b=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},y=function(e,t){return Object(p.zip)(e,t).map((function(e){var t=b(e,2),n=t[0],r=t[1];return(null!=n?n:0)*(null!=r?r:0)})).reduce(p.add,0)},v=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},E=function(e){return e/180*Math.PI},h=function(e,t,n){return[[1,0,0,0],[0,1,0,0],[0,0,1,0],[e,t,n,1]]},O=function(e){var t=E(e),n=Math.sin(t),r=Math.cos(t);return[[1,0,0,0],[0,r,n,0],[0,-n,r,0],[0,0,0,1]]},g=function(e){var t=E(e),n=Math.sin(t),r=Math.cos(t);return[[r,0,-n,0],[0,1,0,0],[n,0,r,0],[0,0,0,1]]},C=function(e){return[[e,0,0,0],[0,e,0,0],[0,0,e,0],[0,0,0,1]]},R=function(e){var t=v(e,4),n=t[0],r=t[1],a=t[2],o=t[3];return Object(p.zip)(n,r,a,o)},N=function(e,t){var n=v(t,4),r=n[0],a=n[1],o=n[2],i=n[3],c=R(e);return[c.map(Object(p.partial)(y,r)),c.map(Object(p.partial)(y,a)),c.map(Object(p.partial)(y,o)),c.map(Object(p.partial)(y,i))]},S=function(e,t){return R(t).map((function(t){return y(t,e)}))},j=function(e){return"matrix3d("+e.flat().join(",")+")"};!function(e){e.BLUE="#3d81f6",e.GREEN="#009d54",e.RED="#dc422f",e.ORANGE="#ff6c00",e.WHITE="#ffffff",e.YELLOW="#fdcc09",e.DEFAULT="#383838",e.TRANSPARENT="transparent"}(r||(r={})),function(e){e.FRONT="FRONT",e.BACK="BACK",e.LEFT="LEFT",e.RIGHT="RIGHT",e.UP="UP",e.DOWN="DOWN"}(a||(a={})),function(e){e[e.CLOCKWISE=1]="CLOCKWISE",e[e.ANTI_CLOCKWISE=-1]="ANTI_CLOCKWISE"}(o||(o={})),function(e){e[e.UP=180]="UP",e[e.LEFT=90]="LEFT",e[e.RIGHT=-90]="RIGHT",e[e.DOWN=0]="DOWN"}(i||(i={}));var T,U=function(e){return void 0!==e.iterations};!function(e){e[e.X=0]="X",e[e.Y=1]="Y",e[e.Z=2]="Z"}(T||(T={}));var w,L,P=function(e){var t,n,r,a=e.axis,o=e.rotation;switch(a){case T.X:return O(o);case T.Y:return g(o);case T.Z:return t=E(o),n=Math.sin(t),[[r=Math.cos(t),n,0,0],[-n,r,0,0],[0,0,1,0],[0,0,0,1]]}},x=function(e){var t=e.axis,n=e.rotation;switch(t){case T.X:return"rotateX("+n+"deg)";case T.Y:return"rotateY("+n+"deg)";case T.Z:return"rotateZ("+n+"deg)"}},D=function(e){switch(e.toUpperCase()){case"L":case"R":case"M":case"X":return T.X;case"U":case"D":case"E":case"Y":return T.Y;case"F":case"B":case"S":case"Z":return T.Z;default:throw new Error(e+" is not a valid cube notation Letter!")}},A=function(e,t){switch(e){case"F":case"U":case"L":return[1];case"f":case"u":case"l":return t<3?[1]:t>3?[2]:[1,2];case"B":case"D":case"R":return[t];case"b":case"d":case"r":return t<3?[t]:t>3?[t-1]:[t-1,t];case"X":case"Y":case"Z":case"x":case"y":case"z":return Object(p.range)(1,t+1);case"M":case"E":case"S":return n=Math.ceil(t/2),t%2==0?[n,n+1]:[n];case"m":case"e":case"s":switch(t){case 1:return[1];case 2:return[1,2];default:return Object(p.range)(2,t)}default:throw new Error(e+" is not a valid cube notation Letter!")}var n},I=function(e){switch(e.toUpperCase()){case"F":case"D":case"R":case"E":case"S":case"X":case"Z":return 90;case"B":case"U":case"L":case"M":case"Y":return-90;default:throw new Error(e+" is not a valid cube notation Letter!")}},_=function(e){return function(t,n,r){if(e)switch(t.toUpperCase()){case"B":case"D":case"R":return Object(p.range)(r-n[0]+1,r+1);default:return Object(p.range)(1,n[0]+1)}else switch(t.toUpperCase()){case"B":case"D":case"R":return n.map((function(e){return r+1-e}));default:return n}}},k=function(e){return function(t){return e?-1*t:t}},M=function(e){return function(t){return e?180*Math.sign(t):t}},F=function(e){return!e.status},G=function(e){return e.status},B=function(){return(B=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},W=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},Y=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(W(arguments[t]));return e},H=((w={})[a.FRONT]=r.BLUE,w[a.BACK]=r.GREEN,w[a.LEFT]=r.ORANGE,w[a.RIGHT]=r.RED,w[a.UP]=r.YELLOW,w[a.DOWN]=r.WHITE,w),z=function(e,t){var n,r=t/2;return(n={},n[a.FRONT]=h(0,0,r),n[a.BACK]=N(h(0,0,-r),g(180)),n[a.LEFT]=N(h(-r,0,0),g(-90)),n[a.RIGHT]=N(h(r,0,0),g(90)),n[a.UP]=N(h(0,-r,0),O(90)),n[a.DOWN]=N(h(0,r,0),O(-90)),n)[e]},K=function(e,t,n,r){var a=W(e,3),o=a[0],i=a[1],c=a[2],u=(r+1)*t*(n/2),s=t*n;return h(o*s-u,i*s-u,-c*s+u)},Z=function(e,t,n){var r=.5*(n+1),a=e.map((function(e,t){return 2===t?-e+r:e-r}));return S(Y(a,[1]),t).slice(0,3).map((function(e,t){return 2===t?-e+r:e+r})).map(Math.round)},X=function(e,t,n){var r,o=W(t,3),i=o[0],c=o[1],u=o[2];return(r={},r[a.FRONT]=1===u,r[a.BACK]=u===n,r[a.LEFT]=1===i,r[a.RIGHT]=i===n,r[a.UP]=1===c,r[a.DOWN]=c===n,r)[e]},q=function(e,t,n){var o=Object(p.range)(1,n+1);return o.flatMap((function(e){return o.flatMap((function(t){return o.map((function(n){return[n,t,e]}))}))})).filter((function(e){return function(e,t){return e.some((function(e){return 1===e||e===t}))}(e,n)})).map((function(o){return{id:o,axis:o,faces:Object.values(a).map((function(t){return function(e,t,n,a){return{id:e,color:X(e,t,a)?H[e]:r.DEFAULT,transform:z(e,n)}}(t,o,e,n)})),transform:K(o,e,t,n)}}))},V=function(e,t){var n=t.slices,r=t.axis;return n.includes(e[r])},J=function(e,t,n){return U(t)?Object(p.range)(0,t.iterations).reduce((function(e,r){return t.commands.reduce((function(e,t){return J(e,t,n)}),e)}),e):e.map((function(e){if(V(e.axis,t)){var r=P(t);return B(B({},e),{axis:Z(e.axis,r,n),transform:N(r,e.transform)})}return e}))},Q=Object(p.curry)((function(e,t,n,r){var o,c,u=W((o={},o[a.FRONT]=[[-1,0,0],[0,1,0]],o[a.BACK]=[[1,0,0],[0,1,0]],o[a.LEFT]=[[0,0,-1],[0,1,0]],o[a.RIGHT]=[[0,0,1],[0,1,0]],o[a.UP]=[[-1,0,0],[0,0,1]],o[a.DOWN]=[[-1,0,0],[0,0,-1]],o)[n],2),s=u[0],l=u[1],f=(c={},c[i.DOWN]=s,c[i.RIGHT]=l,c[i.UP]=s.map((function(e){return-1*e})),c[i.LEFT]=l.map((function(e){return-1*e})),c)[r],m=S(Y(f,[0]),t).slice(0,3).map(Math.round),d=Object(p.zip)(e,m).map((function(e){var t=W(e,2);return t[0]*t[1]})),b=d.findIndex((function(e){return 0!==e})),y=d[b];return{axis:b,slices:[Math.abs(y)],rotation:90*Math.sign(y)}})),$={dimension:3,size:300,gapFactor:1.01,scale:1,rotationDuration:750,cubicles:[],rotation:N(O(-45),g(-45))},ee=Object(m.c)($,(function(e){e.addCase(d.setCubeDimension,(function(e,t){e.dimension=t.payload})).addCase(d.setCubeScale,(function(e,t){e.scale=t.payload})).addCase(d.setRotationAnimationSpeed,(function(e,t){e.rotationDuration=t.payload})).addCase(d.updateCubicles,(function(e,t){e.cubicles=t.payload})).addCase(d.applyRotationCommands,(function(e,t){e.cubicles=t.payload.reduce((function(t,n){return J(t,n,e.dimension)}),e.cubicles)}))})),te=n(20),ne={play:Object(m.b)("PLAY"),stop:Object(m.b)("STOP"),pause:Object(m.b)("PAUSE"),unPause:Object(m.b)("UN_PAUSE"),updateNotation:Object(m.b)("UPDATE_NOTATION"),parsedNotation:Object(m.b)("PARSED_NOTATION"),setCurrentRotationCommand:Object(m.b)("SET_CURRENT_ROTATION_COMMAND")};!function(e){e.STOPPED="STOPPED",e.PLAYING="PLAYING",e.PAUSED="PAUSED"}(L||(L={}));var re,ae={notation:"",rotationCommands:{status:!0,value:[]},status:L.STOPPED},oe=Object(m.c)(ae,(function(e){e.addCase(ne.updateNotation,(function(e,t){e.notation=t.payload})).addCase(ne.parsedNotation,(function(e,t){e.rotationCommands=t.payload})).addCase(ne.play,(function(e,t){e.status=L.PLAYING})).addCase(ne.unPause,(function(e,t){e.status=L.PLAYING})).addCase(ne.pause,(function(e,t){e.status=L.PAUSED})).addCase(ne.stop,(function(e,t){e.status=L.STOPPED})).addCase(ne.setCurrentRotationCommand,(function(e,t){e.currentCommand=t.payload})).addCase(d.applyRotationCommands,(function(e,t){e.currentCommand=void 0}))})),ie=Object(f.c)({cube:ee,player:oe}),ce=function(e){return Object(te.c)(e)},ue=(n(93),function(e){return void 0!==e.classNames}),se=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.map((function(e){return"object"==typeof e?ue(e)?e.hasClasses?e.classNames.join(" "):"":Object.keys(e).filter((function(t){return e[t]})).join(" "):e})).filter((function(e){return null==e?void 0:e.length})).join(" ")},le=u.a.memo((function(e){var t=e.className,n=void 0===t?"":t;return u.a.createElement("g",{className:se("arrow",n)},u.a.createElement("line",{x1:0,y1:40,x2:0,y2:-40}),u.a.createElement("line",{x1:0,y1:-40,x2:-40,y2:0}),u.a.createElement("line",{x1:0,y1:-40,x2:-40,y2:0,style:{transform:"scale(-1, 1)"}}))})),fe=function(e){var t=e.direction,n=e.rotate;return u.a.createElement("g",{className:"face-arrow-wrapper",style:{transform:"rotate("+t+"deg)"},onClick:function(){return n(t)}},u.a.createElement("rect",{width:"100%",height:"100%",className:"face-arrow-wrapper__box"}),u.a.createElement(le,{className:"face-arrow"}))},me=function(e){var t=e.rotate;return u.a.createElement("svg",{viewBox:"0 0 100 100",className:"face-arrows-svg"},u.a.createElement("g",{className:"face-arrows-wrapper"},u.a.createElement(fe,{direction:i.UP,rotate:t}),u.a.createElement(fe,{direction:i.DOWN,rotate:t}),u.a.createElement(fe,{direction:i.LEFT,rotate:t}),u.a.createElement(fe,{direction:i.RIGHT,rotate:t})))},de=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},pe=u.a.memo((function(e){var t=e.transform,n=e.color,a=e.generateArrowCommand,o=de(Object(c.useState)(!1),2),i=o[0],s=o[1],l=Object(te.b)(),f={backgroundColor:n,transform:j(t)};return u.a.createElement("div",{className:"rubiks-cube__face",style:f,onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)}},i&&n!==r.DEFAULT&&n!==r.TRANSPARENT&&u.a.createElement(me,{rotate:function(e){return l(ne.play([a(e)]))}}))})),be=u.a.memo((function(e){var t=e.axis,n=e.faces,r=e.animatedTransform,a=e.transform,o=e.size,i=e.rotationDuration,c={transform:r+j(a),width:o,height:o,transition:"rotate(0)"===r?"":"transform "+i+"ms"},s=Q(t,a);return u.a.createElement("div",{className:"rubiks-cube__cubicle",style:c},n.map((function(e){var t=e.id,n=e.transform,r=e.color;return u.a.createElement(pe,{key:t,transform:n,color:r,generateArrowCommand:s(t)})})))})),ye=(n(115),function(){function e(e){var t=this;this.value=e,this.isSome=function(){return!t.isNone()},this.isNone=function(){return Object(p.isNil)(t.value)},this.unwrap=function(){if(t.isNone())throw Error("Provided value must not be empty");return t.value},this.expect=function(e){if(t.isNone())throw Error(e);return t.value},this.unwrapOr=function(e){return t.isNone()?Object(p.isFunction)(e)?e():e:t.value},this.ifIsSome=function(e){return t.isSome()&&e(t.value),t},this.ifIsNone=function(e){return t.isNone()&&e(),t},this.equals=function(e){return t.isNone()&&e.isNone()||t.isSome()&&e.contains(t.unwrap())}}return e.some=function(t){if(Object(p.isNil)(t))throw Error("Provided value must not be empty");var n=Object(p.isFunction)(t)?t():t;return n instanceof e?n:new e(n)},e.none=function(){return new e(null)},e.of=function(t){return Object(p.isNil)(t)?e.none():e.some(t)},e.tryOf=function(t){try{var n=t();return e.of(n)}catch(t){return e.none()}},e.prototype.map=function(t){var n=this;return this.isNone()?this:e.of((function(){return t(n.value)}))},e.prototype.mapOr=function(e,t){return this.isNone()?Object(p.isFunction)(t)?t():t:e(this.value)},e.prototype.filter=function(t){return this.isSome()&&t(this.unwrap())?this:e.none()},e.prototype.and=function(t){return this.isSome()?e.of(t):this},e.prototype.or=function(t){return this.isNone()?e.of(t):this},e.prototype.xor=function(t){var n=e.of(t);return this.isSome()&&n.isNone()?this:this.isNone()&&n.isSome()?n:e.none()},e.prototype.try=function(t){try{return this.map(t)}catch(t){return e.none()}},e.prototype.contains=function(e){return!!this.isSome()&&this.unwrap()===e},e}()),ve=n(11),Ee=n.n(ve),he=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},Oe=function(e){return Ee.a.createLanguage({separator:function(e){return Ee.a.alt(Ee.a.optWhitespace.then(Ee.a.alt(e.comma,Ee.a.lookahead(e.lParenthesis.or(e.rParenthesis)),Ee.a.eof)),Ee.a.whitespace.atLeast(1)).result("")},comma:function(){return Ee.a.string(",").desc(",")},lParenthesis:function(){return Ee.a.string("(").desc("(")},rParenthesis:function(){return Ee.a.string(")").desc(")")},lBracket:function(){return Ee.a.string("[").desc("[")},rBracket:function(){return Ee.a.string("]").desc("]")},wide:function(){return Ee.a.regexp(/[W]/i).result(!0).fallback(!1)},prime:function(){return Ee.a.string("'").desc("'").result(!0).fallback(!1)},double:function(){return Ee.a.string("2").desc("2").result(!0).fallback(!1)},number:function(){return Ee.a.regexp(/\d+/).map(Number).desc("number")},numberInDimension:function(){return Ee()((function(t,n){var r=t.substr(n).match(/^\d+/);if(r){var a=r[0],o=Number(a);if(o>0&&o<=e)return Ee.a.makeSuccess(n+a.length,o)}return Ee.a.makeFailure(n,"1-"+e)}))},slices:function(e){return e.numberInDimension.trim(Ee.a.optWhitespace).sepBy1(e.comma).map((function(e){return e.sort()})).wrap(e.lBracket,e.rBracket)},sliceableLetter:function(){return Ee.a.regexp(/[LRUDFB]/i)},notSliceableLetter:function(){return Ee.a.regexp(/[MESXYZ]/i)},letter:function(e){return Ee.a.alt(e.sliceableLetter,e.notSliceableLetter)},simpleCommand:function(t){return Ee.a.seq(t.letter,t.prime,t.double).map((function(t){var n=he(t,3),r=n[0],a=n[1],o=n[2];return{axis:D(r),rotation:M(o)(k(a)(I(r))),slices:A(r,e)}}))},slicedCommand:function(t){return Ee.a.seq(Ee.a.alt(Ee.a.seq(t.numberInDimension.map((function(e){return[e]})),t.sliceableLetter,t.wide),Ee.a.seq(t.slices,t.sliceableLetter,Ee.a.succeed(!1))),t.prime,t.double).map((function(t){var n=he(t,3),r=he(n[0],3),a=r[0],o=r[1],i=r[2],c=n[1],u=n[2];return{axis:D(o),rotation:M(u)(k(c)(I(o))),slices:_(i)(o,a,e)}}))},loop:function(e){return Ee.a.seq(e.rotationCommands.wrap(e.lParenthesis,e.rParenthesis),e.number.fallback(1)).map((function(e){var t=he(e,2);return{commands:t[0],iterations:t[1]}}))},rotationCommands:function(e){return Ee.a.optWhitespace.then(Ee.a.alt(e.simpleCommand,e.slicedCommand,e.loop)).skip(e.separator).many()}})};!function(e){e.FRONT="rotateY(0deg)",e.RIGHT="rotateY(90deg)"}(re||(re={}));var ge,Ce=u.a.memo((function(e){var t=e.size,n=e.cubicleSize,r=e.cubeDimension,a=Object(te.b)(),i=t/2,c=function(e,t){return{width:n,transform:e+" translate3d(0, "+i+"px, "+i+"px) rotateX(-90deg) translateY(-"+n/2+"px) rotateZ("+90*t+"deg) translateY(-"+n*(r/2-.5)+"px)",cursor:"pointer",position:"absolute"}},s=function(e,t){return{width:n,transform:e+" rotateZ("+90*t+"deg) translate3d(0, -"+n*(r/2+.5)+"px, "+i+"px)",cursor:"pointer",position:"absolute"}},l=u.a.createElement("svg",{className:"cube-arrows-svg",viewBox:"-50 -50 100 100"},u.a.createElement(le,{className:"cube-arrow"})),f=function(e){var t=Oe(r).rotationCommands.tryParse(e);a(ne.play(t))};return u.a.createElement("div",{className:"display-contents"},u.a.createElement("div",{onClick:function(){return f("Z'")},style:c(re.FRONT,o.ANTI_CLOCKWISE)},l),u.a.createElement("div",{onClick:function(){return f("Z")},style:c(re.FRONT,o.CLOCKWISE)},l),u.a.createElement("div",{onClick:function(){return f("X'")},style:c(re.RIGHT,o.ANTI_CLOCKWISE)},l),u.a.createElement("div",{onClick:function(){return f("X")},style:c(re.RIGHT,o.CLOCKWISE)},l),u.a.createElement("div",{onClick:function(){return f("Y'")},style:s(re.RIGHT,o.CLOCKWISE)},l),u.a.createElement("div",{onClick:function(){return f("Y")},style:s(re.FRONT,o.ANTI_CLOCKWISE)},l))})),Re=u.a.memo((function(e){var t=e.cubicleSize,n=ce((function(e){return e.cube.cubicles})),r=ce((function(e){return e.cube.rotationDuration})),a=ye.of(ce((function(e){return e.player.currentCommand})));return u.a.createElement("div",{className:"display-contents"},n.map((function(e){var n=e.id,o=e.faces,i=e.transform,c=e.axis,s=a.filter((function(e){return V(c,e)})).map(x).unwrapOr("rotate(0)");return u.a.createElement(be,{key:n.join(","),axis:c,faces:o,animatedTransform:s,transform:i,size:t,rotationDuration:r})})))})),Ne=function(){var e,t,n=ce((function(e){return e.cube.dimension})),r=ce((function(e){return e.cube.size})),a=ce((function(e){return e.cube.scale})),o=ce((function(e){return e.cube.rotation})),i=ce((function(e){return e.player.status}))===L.STOPPED,c=r/n,s={width:r,height:r,transform:j(N(o,C(a)))};return u.a.createElement("div",{className:"app__cube"},u.a.createElement("div",{className:se("rubiks-cube",{"rubiks-cube--is-transitioning":!i}),style:s},u.a.createElement("div",{style:(e=r*(n-1)/(2*n),t=h(e,e,0),{transform:j(t),transformStyle:"preserve-3d"})},u.a.createElement(Re,{cubicleSize:c}),n>1&&u.a.createElement(Ce,{cubeDimension:n,size:r,cubicleSize:c}))))},Se=n(161),je=n(77),Te=n(189),Ue=n(165),we=u.a.memo((function(){var e=Object(te.b)(),t=ce((function(e){return e.cube.dimension})),n=ce((function(e){return e.cube.scale})),r=ce((function(e){return e.cube.rotationDuration})),a=ce((function(e){return e.player.status}))!==L.STOPPED;return u.a.createElement(Se.a,{disablePadding:!0,dense:!0,className:"interface-list"},u.a.createElement(Ue.a,{className:"interface-list__item--settings"},u.a.createElement(je.a,{id:"cube-dimension-slider"},"Cube dimension"),u.a.createElement(Te.a,{"aria-labelledby":"cube-dimension-slider",valueLabelDisplay:"auto",marks:!0,step:1,min:1,max:5,defaultValue:Object(c.useMemo)((function(){return t}),[]),onChangeCommitted:function(t,n){return e(d.setCubeDimension(n))},disabled:a})),u.a.createElement(Ue.a,{className:"interface-list__item--settings"},u.a.createElement(je.a,{id:"scale-slider"},"Scale"),u.a.createElement(Te.a,{"aria-labelledby":"scale-slider",valueLabelDisplay:"auto",marks:!0,step:.1,min:.2,max:2,defaultValue:Object(c.useMemo)((function(){return n}),[]),onChangeCommitted:function(t,n){return e(d.setCubeScale(n))},disabled:a})),u.a.createElement(Ue.a,{className:"interface-list__item--settings"},u.a.createElement(je.a,{id:"animation-duration-slider"},"Animation duration"),u.a.createElement(Te.a,{"aria-labelledby":"animation-duration-slider",valueLabelDisplay:"auto",min:100,max:2e3,step:50,defaultValue:Object(c.useMemo)((function(){return r}),[]),onChangeCommitted:function(t,n){return e(d.setRotationAnimationSpeed(n))}})))})),Le=(n(120),n(169)),Pe=r.YELLOW,xe=r.ORANGE,De=r.RED,Ae=r.GREEN,Ie=r.BLUE,_e=r.DEFAULT,ke=r.TRANSPARENT,Me={name:"2 Look CFOP",groups:[{name:"OLL",groups:[{name:"Edges",algorithms:[{name:"Dot",notation:"F (R U R' U') F' f (R U R' U') f'",startConfiguration:[[ke,ke,ke,ke,ke],[ke,_e,_e,_e,ke],[ke,_e,Pe,_e,ke],[ke,_e,_e,_e,ke],[ke,ke,ke,ke,ke]]},{name:"L",notation:"f (R U R' U') f'",startConfiguration:[[ke,ke,ke,ke,ke],[ke,_e,_e,_e,ke],[ke,_e,Pe,Pe,ke],[ke,_e,Pe,_e,ke],[ke,ke,ke,ke,ke]]},{name:"Line",notation:"F (R U R' U') F'",startConfiguration:[[ke,ke,ke,ke,ke],[ke,_e,_e,_e,ke],[ke,Pe,Pe,Pe,ke],[ke,_e,_e,_e,ke],[ke,ke,ke,ke,ke]]}]},{name:"Corners",groups:[{name:"No Corners solved",algorithms:[{name:"H",notation:"F (R U R' U')3 F'",startConfiguration:[[ke,Pe,ke,Pe,ke],[ke,_e,Pe,_e,ke],[ke,Pe,Pe,Pe,ke],[ke,_e,Pe,_e,ke],[ke,Pe,ke,Pe,ke]]},{name:"Pi",notation:"R U2 (R2 U' R2 U' R2) U2 R",startConfiguration:[[ke,ke,ke,Pe,ke],[Pe,_e,Pe,_e,ke],[ke,Pe,Pe,Pe,ke],[Pe,_e,Pe,_e,ke],[ke,ke,ke,Pe,ke]]}]},{name:"1 Corner solved",algorithms:[{name:"Sune",notation:"R U R' U R U2 R'",startConfiguration:[[ke,Pe,ke,ke,ke],[ke,_e,Pe,_e,Pe],[ke,Pe,Pe,Pe,ke],[ke,Pe,Pe,_e,ke],[ke,ke,ke,Pe,ke]]},{name:"Anti-Sune",notation:"L' U' L U' L' U2 L",startConfiguration:[[ke,ke,ke,Pe,ke],[Pe,_e,Pe,_e,ke],[ke,Pe,Pe,Pe,ke],[ke,_e,Pe,Pe,ke],[ke,Pe,ke,ke,ke]]}]},{name:"2 Corners solved",algorithms:[{name:"L",notation:"x (R' U R D') (R' U' R D) x'",startConfiguration:[[ke,ke,ke,ke,ke],[ke,Pe,Pe,_e,Pe],[ke,Pe,Pe,Pe,ke],[ke,_e,Pe,Pe,ke],[ke,Pe,ke,ke,ke]]},{name:"T",notation:"x (L U R' U') (L' U R U') x'",startConfiguration:[[ke,Pe,ke,ke,ke],[ke,_e,Pe,Pe,ke],[ke,Pe,Pe,Pe,ke],[ke,_e,Pe,Pe,ke],[ke,Pe,ke,ke,ke]]},{name:"U",notation:"R2 D R' U2 R D' R' U2 R'",startConfiguration:[[ke,ke,ke,ke,ke],[ke,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,ke],[ke,_e,Pe,_e,ke],[ke,Pe,ke,Pe,ke]]}]}]},{name:"Parity",algorithms:[{name:"Edge flipped",notation:"(2R2 B2 U2) (2L U2) (2R' U2) (2R U2) (F2 2R F2) (2L' B2 2R2)",startConfiguration:[[ke,ke,ke,ke,ke,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,_e,_e,Pe,ke],[ke,ke,Pe,Pe,ke,ke]]}]}]},{name:"PLL",groups:[{name:"Corners",algorithms:[{name:"Diagonal",notation:"(F R U' R' U' R U R' F') (R U R' U' R' F R F')",startConfiguration:[[ke,_e,ke,_e,ke],[_e,Pe,Pe,Pe,_e],[ke,Pe,Pe,Pe,ke],[_e,Pe,Pe,Pe,_e],[ke,_e,ke,_e,ke]]},{name:"Adjacent",notation:"(R U R' U' R' F) R2 (U' R' U' R U R' F')",startConfiguration:[[ke,_e,ke,_e,ke],[xe,Pe,Pe,Pe,_e],[ke,Pe,Pe,Pe,ke],[xe,Pe,Pe,Pe,_e],[ke,_e,ke,_e,ke]]}]},{name:"Edges",groups:[{name:"3 Edges",algorithms:[{name:"Right to Left",notation:"R U' R U R U R U' R' U' R2",startConfiguration:[[ke,Ae,Ae,Ae,ke],[xe,Pe,Pe,Pe,ke],[_e,Pe,Pe,Pe,xe],[xe,Pe,Pe,Pe,ke],[ke,Ie,_e,Ie,ke]]},{name:"Left to Right",notation:"R2 U R U R' U' R' U' R' U R'",startConfiguration:[[ke,Ae,Ae,Ae,ke],[ke,Pe,Pe,Pe,De],[De,Pe,Pe,Pe,_e],[ke,Pe,Pe,Pe,De],[ke,Ie,_e,Ie,ke]]}]},{name:"4 Edges",algorithms:[{name:"Cross",notation:"M2 U' M2 U2 M2 U' M2",startConfiguration:[[ke,Ae,Ie,Ae,ke],[xe,Pe,Pe,Pe,De],[De,Pe,Pe,Pe,xe],[xe,Pe,Pe,Pe,De],[ke,Ie,Ae,Ie,ke]]},{name:"Diagonal",notation:"M' U' M2 U' M2 U' M' U2 M2",startConfiguration:[[ke,Ae,xe,Ae,ke],[xe,Pe,Pe,Pe,De],[Ae,Pe,Pe,Pe,Ie],[xe,Pe,Pe,Pe,De],[ke,Ie,De,Ie,ke]]}]}]},{name:"Parity",algorithms:[{name:"Corners / Edges swapped",notation:"2R2 U2 2R2 u2 2R2 2U2",startConfiguration:[[ke,Ae,Ie,Ie,Ae,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Pe,Pe,Pe,Pe,ke],[ke,Ie,Ae,Ae,Ie,ke]]}]}]}]},Fe={name:"Misc",algorithms:[{name:"Sexy",notation:"R U R' U'"}]},Ge=n(166),Be=u.a.memo((function(e){var t=e.configuration;return u.a.createElement("div",{className:"start-configuration"},t.flatMap((function(e,t){return e.map((function(e,n){return u.a.createElement(u.a.Fragment,{key:t+"-"+n},e!==r.TRANSPARENT&&u.a.createElement("div",{className:"start-configuration__face",style:{backgroundColor:e,gridRow:t+1,gridColumn:n+1}}))}))})))})),We=n(168),Ye=n(182),He=function(){return(He=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},ze=function(e,t){return""===e?t:e+" / "+t},Ke=function(e,t){return void 0===t&&(t=""),function(e){return void 0!==e.algorithms}(e)?[He(He({},e),{name:ze(t,e.name)})]:e.groups.flatMap((function(n){return Ke(n,ze(t,e.name))}))},Ze=function(){return(Ze=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},Xe=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},qe=[Me,Fe].flatMap((function(e){return Ke(e)})),Ve=function(){var e=Object(te.b)(),t=ce((function(e){return e.player.status})),n=Xe(Object(c.useState)(qe),2),r=n[0],a=n[1];return u.a.createElement(Se.a,{disablePadding:!0,dense:!0,className:"interface-list interface-algorithm-list"},u.a.createElement(Ge.a,{className:"interface-algorithm-list__filer"},u.a.createElement(Ye.a,{label:"Search",fullWidth:!0,onChange:function(e){return a((t=e.target.value.toLocaleLowerCase(),qe.map((function(e){if(e.name.toLocaleLowerCase().includes(t))return e;var n=e.algorithms.filter((function(e){return e.name.toLocaleLowerCase().includes(t)}));return 0!==n.length?Ze(Ze({},e),{algorithms:n}):void 0})).filter((function(e){return void 0!==e}))));var t}})),r.map((function(n,r){return u.a.createElement(u.a.Fragment,{key:n.name+r},u.a.createElement(Ge.a,{className:"interface-list__item interface-algorithm-list__header"},u.a.createElement(We.a,null),n.name,u.a.createElement(We.a,null)),n.algorithms.map((function(n){return u.a.createElement(Ue.a,{key:n.name+r,className:"interface-list__item--moves",button:!0,onClick:function(){return e(ne.updateNotation(n.notation))},disabled:t!==L.STOPPED},n.startConfiguration&&u.a.createElement(Be,{configuration:n.startConfiguration}),u.a.createElement(Le.a,{primary:n.name,secondary:n.notation}))})))})))},Je=n(96),Qe=n.n(Je),$e=n(186),et=n(170),tt=n(171),nt=function(e){var t=e.title,n=e.isOpen,r=e.setMenu,a=e.children;return u.a.createElement(Ue.a,{className:"interface-list__item"},u.a.createElement($e.a,{expanded:n,TransitionProps:{unmountOnExit:!0},className:"interface-category"},u.a.createElement(et.a,{onClick:r,expandIcon:u.a.createElement(Qe.a,null),className:"interface-category__summary"},u.a.createElement(je.a,null,t)),u.a.createElement(tt.a,{className:"interface-category__details"},a)))},rt=n(126),at=n(190),ot=(n(123),n(172)),it=n(173),ct=n(174),ut=n(175),st=n(176),lt=n(177),ft=function(e){var t=e.notation,n=e.error;return u.a.createElement(u.a.Fragment,null,u.a.createElement(je.a,{className:"MuiInputBase-root",style:{display:"initial",position:"absolute",top:30}},u.a.createElement("span",{style:{visibility:"hidden",whiteSpace:"pre-wrap"}},t.substring(0,n.index.offset)),u.a.createElement("span",{style:{position:"relative"}},u.a.createElement("span",{style:{color:"#f44336",position:"absolute",top:14}},"^"))),u.a.createElement("div",{style:{marginTop:5,marginBottom:5}},n.expected.map((function(e){return u.a.createElement(at.a,{style:{marginRight:2},key:e,color:"secondary",size:"small",label:e})}))))},mt=u.a.memo((function(){var e=Object(te.b)(),t=ce((function(e){return e.cube.dimension})),n=ce((function(e){return e.player.notation})),r=ce((function(e){return e.player.status})),a=ce((function(e){return e.player.rotationCommands})),o=Object(c.useCallback)((function(t){return e(ne.updateNotation(t.target.value))}),[]),i=F(a),s=0===n.length,l=r===L.STOPPED;return u.a.createElement("div",{className:"algorithm-player"},u.a.createElement(Ye.a,{label:"Algorithm",fullWidth:!0,value:n,onChange:o,disabled:!l,error:i,spellCheck:!1,multiline:!0}),F(a)&&u.a.createElement(ft,{notation:n,error:a}),u.a.createElement("div",{className:"algorithm-player__buttons"},u.a.createElement("div",null,r===L.PLAYING?u.a.createElement(rt.a,{onClick:function(){return e(ne.pause())}},u.a.createElement(ot.a,null)):u.a.createElement(rt.a,{onClick:function(){r===L.STOPPED&&G(a)?e(ne.play(a.value)):r===L.PAUSED&&e(ne.unPause())},disabled:s||i},u.a.createElement(it.a,null)),u.a.createElement(rt.a,{onClick:function(){return e(ne.stop())},disabled:l},u.a.createElement(ct.a,null)),u.a.createElement(rt.a,{onClick:function(){G(a)&&e(d.applyRotationCommands(a.value))},disabled:!l||s||i},u.a.createElement(ut.a,null))),u.a.createElement("div",null,u.a.createElement(rt.a,{onClick:function(){return e(ne.updateNotation(function(e){var t="LRUDFB".split(""),n="",r="",a=!1,o=function(e){var o,i="",c=!1;do{i=(null!==(o=Object(p.sample)(e))&&void 0!==o?o:"")+Object(p.sample)(t),c=Object(p.sample)([!0,!1])}while(r===i&&a!==c);r=i,a=c,n+=i+(c?"' ":" ")};if(e>3){var i=Object(p.range)(2,e),c=Object(p.range)(0,i.length);Object(p.range)(20).forEach((function(){return o(Object(p.sampleSize)(i,Object(p.sample)(c)))}))}else Object(p.range)(20).forEach((function(){return o([])}));return n}(t)))},disabled:!l},u.a.createElement(st.a,null)),u.a.createElement(rt.a,{onClick:function(){return e(d.resetCube())},disabled:!l},u.a.createElement(lt.a,null)))))})),dt=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i};!function(e){e.ALGORITHMS="ALGORITHMS",e.SETTINGS="SETTINGS",e.NONE="NONE"}(ge||(ge={}));var pt=function(){var e=dt(Object(c.useState)(ge.SETTINGS),2),t=e[0],n=e[1],r=function(e){return n((function(t){return t===e?ge.NONE:e}))};return u.a.createElement("div",{className:"app__interface"},u.a.createElement(Se.a,null,u.a.createElement(Ue.a,{className:"interface-list__item"},u.a.createElement(mt,null)),u.a.createElement(nt,{isOpen:t===ge.ALGORITHMS,setMenu:Object(c.useCallback)((function(){return r(ge.ALGORITHMS)}),[]),title:"Algorithms"},u.a.createElement(Ve,null)),u.a.createElement(nt,{isOpen:t===ge.SETTINGS,setMenu:Object(c.useCallback)((function(){return r(ge.SETTINGS)}),[]),title:"Settings"},u.a.createElement(we,null))))},bt=(n(124),function(){var e=Object(te.b)();return Object(c.useEffect)((function(){e(d.resetCube())}),[]),u.a.createElement("div",{className:"app"},u.a.createElement(pt,null),u.a.createElement(Ne,null))}),yt=n(181),vt=n(183),Et=n(97),ht=n(185),Ot=n(71),gt=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},Ct=[function(e,t){return e.pipe(Object(Et.a)(d.setCubeDimension.type,d.resetCube.type),Object(ht.a)(t),Object(Ot.a)((function(e){var t=gt(e,2),n=(t[0],t[1]);return d.updateCubicles(q(n.cube.size/n.cube.dimension,n.cube.gapFactor,n.cube.dimension))})))}],Rt=n(84),Nt=n(179),St=n(184),jt=n(180),Tt=n(188),Ut=n(187),wt=n(178),Lt=n(127),Pt=function(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},xt=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},Dt=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function At(e){var t,n,r,a,o,i,c;return Pt(this,(function(u){switch(u.label){case 0:u.trys.push([0,10,11,12]),t=Dt(e),n=t.next(),u.label=1;case 1:if(n.done)return[3,9];if(r=n.value,!U(r))return[3,6];a=0,u.label=2;case 2:return a<r.iterations?[5,Dt(At(r.commands))]:[3,5];case 3:u.sent(),u.label=4;case 4:return a++,[3,2];case 5:return[3,8];case 6:return[4,r];case 7:u.sent(),u.label=8;case 8:return n=t.next(),[3,1];case 9:return[3,12];case 10:return o=u.sent(),i={error:o},[3,12];case 11:try{n&&!n.done&&(c=t.return)&&c.call(t)}finally{if(i)throw i.error}return[7];case 12:return[2]}}))}var It=[function(e,t){return e.pipe(Object(Et.a)(d.setCubeDimension.type,ne.updateNotation.type),Object(ht.a)(t),Object(Ot.a)((function(e){var t=xt(e,2),n=(t[0],t[1]);return Oe(n.cube.dimension).rotationCommands.parse(n.player.notation)})),Object(Ot.a)(ne.parsedNotation))},function(e,t){var n=e.pipe(Object(Rt.a)(ne.play.match)),r=e.pipe(Object(Rt.a)(ne.unPause.match)),a=e.pipe(Object(Rt.a)(ne.stop.match)),o=ye.none(),i=new Ut.a;n.pipe(Object(Rt.a)((function(e){return o.isNone()})),Object(Ot.a)((function(e){return e.payload})),Object(Ot.a)(At)).subscribe((function(e){o=ye.some(e),i.next(!0)})),r.subscribe((function(e){return i.next(!0)})),a.subscribe((function(e){o=ye.none()}));var c=i.pipe(Object(ht.a)(t),Object(Rt.a)((function(e){var t=xt(e,2);t[0];return t[1].player.status===L.PLAYING})),Object(Ot.a)((function(e){return o.map((function(e){return e.next().value})).map(ne.setCurrentRotationCommand).unwrapOr(ne.stop)}))),u=Object(wt.a)(window,"transitionend").pipe(Object(Rt.a)((function(e){return"transform"===e.propertyName&&e.target.className.includes("rubiks-cube__cubicle")}))),s=e.pipe(Object(Rt.a)(ne.setCurrentRotationCommand.match),Object(Ot.a)((function(e){return[e.payload]})),Object(Ot.a)(d.applyRotationCommands),Object(Nt.a)((function(e){return u.pipe(Object(St.a)(),Object(jt.a)(e))})));return e.pipe(Object(Rt.a)(d.applyRotationCommands.match),Object(Tt.a)(10)).subscribe((function(e){return i.next(!0)})),Object(Lt.a)(c,s)}],_t=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},kt=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(_t(arguments[t]));return e},Mt=yt.a.apply(void 0,kt(Ct,It)),Ft=Object(vt.a)(),Gt=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},Bt=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(Gt(arguments[t]));return e}(Object(m.d)({thunk:!1}),[Ft]),Wt=function(){var e=Object(m.a)({reducer:ie,middleware:Bt});return Ft.run(Mt),e};window.addEventListener("load",(function e(){window.removeEventListener("load",e);var t=Wt();l.a.render(u.a.createElement(te.a,{store:t},u.a.createElement(bt,null)),document.getElementById("root"))}))},93:function(e,t,n){}});
//# sourceMappingURL=app.js.map