(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{9014:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(9622)}])},8418:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(c){a=!0,i=c}finally{try{r||null==s.return||s.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.default=void 0;var a,i=(a=n(7294))&&a.__esModule?a:{default:a},o=n(6273),s=n(387),c=n(7190);var l={};function u(e,t,n,r){if(e&&o.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,a=s.useRouter(),f=i.default.useMemo((function(){var t=r(o.resolveHref(a,e.href,!0),2),n=t[0],i=t[1];return{href:n,as:e.as?o.resolveHref(a,e.as):i||n}}),[a,e.href,e.as]),d=f.href,h=f.as,p=e.children,v=e.replace,x=e.shallow,m=e.scroll,y=e.locale;"string"===typeof p&&(p=i.default.createElement("a",null,p));var g=(t=i.default.Children.only(p))&&"object"===typeof t&&t.ref,w=r(c.useIntersection({rootMargin:"200px"}),2),j=w[0],b=w[1],N=i.default.useCallback((function(e){j(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,j]);i.default.useEffect((function(){var e=b&&n&&o.isLocalURL(d),t="undefined"!==typeof y?y:a&&a.locale,r=l[d+"%"+h+(t?"%"+t:"")];e&&!r&&u(a,d,h,{locale:t})}),[h,d,b,y,n,a]);var E={ref:N,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,i,s,c){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&o.isLocalURL(n))&&(e.preventDefault(),null==s&&r.indexOf("#")>=0&&(s=!1),t[a?"replace":"push"](n,r,{shallow:i,locale:c,scroll:s}))}(e,a,d,h,v,x,m,y)},onMouseEnter:function(e){o.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(a,d,h,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var _="undefined"!==typeof y?y:a&&a.locale,k=a&&a.isLocaleDomain&&o.getDomainLocale(h,_,a&&a.locales,a&&a.domainLocales);E.href=k||o.addBasePath(o.addLocale(h,_,a&&a.defaultLocale))}return i.default.cloneElement(t,E)};t.default=f},7190:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(c){a=!0,i=c}finally{try{r||null==s.return||s.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!o,c=a.useRef(),l=r(a.useState(!1),2),u=l[0],f=l[1],d=a.useCallback((function(e){c.current&&(c.current(),c.current=void 0),n||u||e&&e.tagName&&(c.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=s.get(t);if(n)return n;var r=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(t,n={id:t,observer:a,elements:r}),n}(n),a=r.id,i=r.observer,o=r.elements;return o.set(e,t),i.observe(e),function(){o.delete(e),i.unobserve(e),0===o.size&&(i.disconnect(),s.delete(a))}}(e,(function(e){return e&&f(e)}),{rootMargin:t}))}),[n,t,u]);return a.useEffect((function(){if(!o&&!u){var e=i.requestIdleCallback((function(){return f(!0)}));return function(){return i.cancelIdleCallback(e)}}}),[u]),[d,u]};var a=n(7294),i=n(9311),o="undefined"!==typeof IntersectionObserver;var s=new Map},5685:function(e,t,n){"use strict";n.d(t,{A:function(){return l}});var r=n(5893),a=(n(7294),n(9008)),i=(n(3602),function(e){e.className;return(0,r.jsx)("footer",{className:" bg-gray-100",children:(0,r.jsx)("p",{className:"p-2 text-center text-lg",children:" \xa9 2021- \u30ec\u30e2\u30f3/CITRONO."})})}),o=n(1664),s=n(1163),c=function(e){e.className;var t,n=null!==(t=(0,s.useRouter)().pathname.split("/")[1])&&void 0!==t?t:"";return(0,r.jsx)("div",{className:"flex ",children:(0,r.jsx)("div",{className:"w-screen bg-green-600 shadow-md py-3 px-2",children:(0,r.jsxs)("nav",{className:"m-1 flex items-center",children:[(0,r.jsx)(o.default,{href:"/",children:(0,r.jsx)("a",{children:(0,r.jsx)("img",{src:"/images/logo.svg",className:"md:h-7 h-6 md:px-10 hover:opacity-70 transition duration-300"})})}),(0,r.jsx)("div",{className:"m-1 flex justify-center items-center",children:[{page:"news",title:"News"},{page:"works",title:"Works"}].map((function(e){return(0,r.jsx)(o.default,{href:"/"+e.page,children:(0,r.jsx)("a",{className:"mx-3",children:n==e.page?(0,r.jsxs)("span",{className:" text-lg text-gray-200 hover:text-white border-b-4 border-yellow-500 transition duration-300 ",children:[" ",e.title," "]}):(0,r.jsxs)("span",{className:"text-lg text-gray-200 hover:text-white transition duration-300",children:[" ",e.title," "]})})},"navbar-"+e.page)}))})]})})})},l=function(e){var t=e.children,n=e.title,o=void 0===n?"":n;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.default,{children:[(0,r.jsxs)("title",{children:[""==o?"CITRONO":o+" - CITRONO"," "]}),(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,r.jsxs)("div",{className:"flex flex-col min-h-screen bg-gray-100",children:[(0,r.jsx)(c,{}),(0,r.jsxs)("main",{className:"flex-grow md:p-10 p-1",children:[" ",t," "]}),(0,r.jsx)(i,{})]})]})}},9622:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var r=n(5893),a=n(5685);function i(){return(0,r.jsx)(a.A,{children:(0,r.jsxs)("div",{className:"bg-white shadow-md p-10",children:[(0,r.jsx)("h1",{className:"text-5xl text-center py-12",children:" 404 "}),(0,r.jsx)("div",{className:"text-xl py-12 text-center text-gray-600",children:" \u30da\u30fc\u30b8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f "})]})})}},9008:function(e,t,n){e.exports=n(5443)},1664:function(e,t,n){e.exports=n(8418)},1163:function(e,t,n){e.exports=n(387)}},function(e){e.O(0,[774,888,179],(function(){return t=9014,e(e.s=t);var t}));var t=e.O();_N_E=t}]);