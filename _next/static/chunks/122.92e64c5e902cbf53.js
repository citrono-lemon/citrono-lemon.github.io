"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[122],{3122:function(e,t,a){a.r(t);var n=a(5893),i=a(7294),s=a(8925),d=a(1837);t.default=function(e){var t=e.className,a=e.id,o=e.width,r=e.height;return(0,i.useEffect)((function(){var e=new d.MxU({width:1*o,height:2*r,backgroundAlpha:0,antialias:!1});return e.stage.interactive=!0,document.getElementById("SpineModel".concat(a)).appendChild(e.view),e.loader.add("spineCharactor","/images/Spine/sd_player.json").load((function(t,a){var n=new s.PY(a.spineCharactor.spineData);n.x=e.screen.width/2,n.y=e.screen.height,n.buttonMode=!0,n.cursor="pointer",n.scale.set(1),n.scale.x*=-1,n.state.timeScale=0,n.state.setAnimation(0,"Idle2",!0);var i=.05;n.stateData.setMix("Idle","Jump",i),n.stateData.setMix("Idle2","Jump",i),n.stateData.setMix("Jump","Idle",i),n.stateData.setMix("Jump","Idle2",i),e.stage.addChild(n),e.stage.once("pointerover",(function(){n.state.timeScale=1,n.state.setAnimation(0,"Idle2",!0)}));var o=!1;e.stage.on("pointerdown",(function(){if(n.state.timeScale=1,!o){o=!0,n.state.setAnimation(0,"Jump",!0);var e=0,t=n.y,a=function(i){var s=-.4*Math.pow(e,2)+15*e;if(s<0)return o=!1,d.vB5.shared.remove(a),n.y=t,void(Math.random()>.1?n.state.setAnimation(0,"Idle2",!0):n.state.setAnimation(0,"Idle",!0));n.y=t+-1*s,e+=i};d.vB5.shared.add(a)}}))})),function(){null===e||void 0===e||e.destroy(!0)}}),[]),(0,n.jsx)("div",{id:"SpineModel".concat(a),className:t})}}}]);