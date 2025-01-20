"use strict";(self.webpackChunkNotificationWidget=self.webpackChunkNotificationWidget||[]).push([[50],{50:(t,l,e)=>{e.r(l),e.d(l,{default:()=>g});var o=e(8110),a=e(9696),p=e(9676),r=e(4752),i=e(8697),n=e(6803),c=e(6540),s=e(8312),d=e(61),u=e(9965),m=e.n(u),v=e(4074),f=e.n(v),x=e(1106),h=e.n(x);function g(t){var l=t.project,e=t.notification,o=t.setExitPopup;switch(l.template){case s.If.SmPopup:return c.createElement(y,{project:l,notification:e,setExitPopup:o});case s.If.SmPopupNoImg:return c.createElement(b,{project:l,notification:e,setExitPopup:o});case s.If.LgPopup:return c.createElement(w,{project:l,notification:e,setExitPopup:o});case s.If.LgPopupNoImg:return c.createElement(F,{project:l,notification:e,setExitPopup:o});case s.If.Card:return c.createElement(N,{project:l,notification:e,setExitPopup:o});case s.If.CardNoImg:return c.createElement(j,{project:l,notification:e,setExitPopup:o});case s.If.Banner:return c.createElement(_,{project:l,notification:e,setExitPopup:o});case s.If.BannerNoImg:return c.createElement(C,{project:l,notification:e,setExitPopup:o});default:c.Fragment}}var E=function(t,l){var e,i,n,u,m=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"md",v="lg"===m?38:"md"===m?28:20;switch(t){case s.Bx.Purchase:return c.createElement(o.A,{color:(0,d.j5)(null!==(e=l.accent_color)&&void 0!==e?e:"#7A81EB",.85),height:v,width:v});case s.Bx.Checkout:return c.createElement(a.A,{color:(0,d.j5)(null!==(i=l.accent_color)&&void 0!==i?i:"#7A81EB",.85),height:v,width:v});case s.Bx.SomeoneViewing:return c.createElement(p.A,{color:(0,d.j5)(null!==(n=l.accent_color)&&void 0!==n?n:"#7A81EB",.85),height:v,width:v});case s.Bx.ActiveUsers:return c.createElement(r.A,{color:(0,d.j5)(null!==(u=l.accent_color)&&void 0!==u?u:"#7A81EB",.85),height:v,width:v})}},y=function(t){var l,e,o,a,p,r,s,u,v=t.project,f=t.notification,x=t.setExitPopup,g=null==f?void 0:f.product,y=f.event,b=null!==(l=v.bg_color)&&void 0!==l?l:"#FFFFFF",w=null!==(e=v.border_color)&&void 0!==e?e:"#FFFFFF",F=null!==(o=v.text_color)&&void 0!==o?o:"#172554",N=null!==(a=v.accent_color)&&void 0!==a?a:"#7A81EB",j=""!==(null===(p=f.event)||void 0===p?void 0:p.header)&&null!==(null===(r=f.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:b,borderColor:w},className:"taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-pr-6 taplo-pl-4 taplo-py-3 taplo-max-w-[330px] taplo-min-w-[280px] taplo-min-h-[80px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group"},c.createElement("div",{style:{backgroundColor:b,borderColor:w},onClick:function(){return x(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(F,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-items-center taplo-justify-center"},g&&null!=g&&g.image_url&&""!==(null==g?void 0:g.image_url)?c.createElement("div",{className:"taplo-w-12 taplo-h-12 taplo-min-w-12"},c.createElement(m(),{loader:function(){return g.image_url||""},unoptimized:!0,width:48,height:48,alt:"product-img",src:g.image_url,className:"taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-full"})):c.createElement("div",{className:"taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-w-12 taplo-h-12 taplo-min-w-12 taplo-aspect-square",style:{backgroundColor:(0,d.j5)(N,.2)}},E(null==y?void 0:y.event_type,v,"sm"))),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center taplo-ml-2"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full"},j&&c.createElement("div",{className:"taplo-flex taplo-justify-between taplo-leading-5"},c.createElement("p",{style:{color:F},className:"taplo-text-[13.5px] taplo-font-bold"},null===(u=f.event)||void 0===u?void 0:u.header),c.createElement("div",{className:"taplo-absolute taplo-bottom-[2px] taplo-right-3 taplo-text-[10px] taplo-flex taplo-items-center taplo-gap-[2px]",style:{color:(0,d.j5)(F,.65)}},f.time," | Verified by Taplo"," ",c.createElement(n.A,{width:18,height:18,fill:N,color:b}))),c.createElement("p",{style:{color:F},className:"".concat(j?"taplo-text-[11.5px] taplo-mb-4 taplo-mt-1":"taplo-text-[12.5px]"," taplo-leading-4"),dangerouslySetInnerHTML:{__html:f.message}}),!j&&c.createElement("div",{className:"taplo-text-[11px] taplo-flex taplo-items-center taplo-mt-1 taplo-leading-4",style:{color:(0,d.j5)(F,.65)}},f.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-[2px] taplo-link-hover hover:taplo-underline taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[10px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(F,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:N,color:b}))))))},b=function(t){var l,e,o,a,p,r,s,u,m=t.project,v=t.notification,f=t.setExitPopup,x=null!==(l=m.bg_color)&&void 0!==l?l:"#FFFFFF",g=null!==(e=m.border_color)&&void 0!==e?e:"#FFFFFF",E=null!==(o=m.text_color)&&void 0!==o?o:"#172554",y=null!==(a=m.accent_color)&&void 0!==a?a:"#7A81EB",b=""!==(null===(p=v.event)||void 0===p?void 0:p.header)&&null!==(null===(r=v.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-px-5 taplo-max-w-[330px] taplo-min-w-[280px] taplo-min-h-[80px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-py-4 taplo-gap-3 taplo-group"},c.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(E,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full"},b&&c.createElement("div",{className:"taplo-flex taplo-justify-between taplo-leading-5"},c.createElement("p",{style:{color:E},className:"taplo-text-[14px] taplo-font-bold"},null===(u=v.event)||void 0===u?void 0:u.header),c.createElement("div",{className:"taplo-absolute taplo-bottom-1 taplo-right-2 taplo-text-[10.5px] taplo-flex taplo-items-center taplo-gap-1",style:{color:(0,d.j5)(E,.65)}},v.time," |"," ",c.createElement(h(),{className:"taplo-flex taplo-gap-[2px] taplo-link-hover",href:"https://www.taplo.io"},"Verified by Taplo"," ",c.createElement(n.A,{width:18,height:18,fill:y,color:x,className:"taplo-mt-[1px]"})))),c.createElement("p",{style:{color:E},className:"".concat(b?"taplo-text-[12px] taplo-mt-2 taplo-mb-3":"taplo-text-[13px]"," taplo-leading-4"),dangerouslySetInnerHTML:{__html:v.message}}),!b&&c.createElement("div",{className:"taplo-text-[11.5px] taplo-flex taplo-items-center taplo-mt-1 taplo-leading-4",style:{color:(0,d.j5)(E,.65)}},v.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-1 taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(E,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:y,color:x}))))))},w=function(t){var l,e,o,a,p,r,s,u,v=t.project,f=t.notification,x=t.setExitPopup,g=null==f?void 0:f.product,y=f.event,b=null!==(l=v.bg_color)&&void 0!==l?l:"#FFFFFF",w=null!==(e=v.border_color)&&void 0!==e?e:"#FFFFFF",F=null!==(o=v.text_color)&&void 0!==o?o:"#172554",N=null!==(a=v.accent_color)&&void 0!==a?a:"#7A81EB",j=""!==(null===(p=f.event)||void 0===p?void 0:p.header)&&null!==(null===(r=f.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:b,borderColor:w},className:"taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-min-h-[120px] taplo-h-fit taplo-max-w-[400px] taplo-min-w-[330px] taplo-md:min-w-[380px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group"},c.createElement("div",{style:{backgroundColor:b,borderColor:w},onClick:function(){return x(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(F,.65),width:14,height:14})),c.createElement("div",{className:"taplo-relative taplo-h-auto taplo-w-[180px] taplo-flex taplo-flex-grow"},g&&null!=g&&g.image_url&&""!==g.image_url?c.createElement("div",{className:"taplo-flex taplo-relative taplo-w-full taplo-h-full"},c.createElement(m(),{loader:function(){return g.image_url||""},unoptimized:!0,alt:"product-img",fill:!0,src:g.image_url,className:"taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-l-lg"})):c.createElement("div",{className:"taplo-flex taplo-h-full taplo-w-full taplo-items-center taplo-justify-center taplo-aspect-square taplo-rounded-l-lg taplo-outline-1 taplo-outline",style:{backgroundColor:(0,d.j5)(N,.2),outlineColor:(0,d.j5)(N,.2)}},E(null==y?void 0:y.event_type,v))),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center taplo-pr-4 taplo-pl-5 taplo-py-4"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full"},j&&c.createElement("p",{style:{color:F},className:"taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-2"},null===(u=f.event)||void 0===u?void 0:u.header),c.createElement("p",{style:{color:F},className:"".concat(j?"taplo-text-[13px]":"taplo-text-[14px]"," taplo-leading-4 taplo-mb-1"),dangerouslySetInnerHTML:{__html:f.message}}),c.createElement("div",{className:"taplo-text-[11.5px] taplo-leading-5",style:{color:(0,d.j5)(F,.65)}},f.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(F,.65)}},"Verified by Taplo",c.createElement(n.A,{width:20,height:20,fill:N,color:b}))))))},F=function(t){var l,e,o,a,p,r,s,u,m=t.project,v=t.notification,f=t.setExitPopup,x=null!==(l=m.bg_color)&&void 0!==l?l:"#FFFFFF",g=null!==(e=m.border_color)&&void 0!==e?e:"#FFFFFF",E=null!==(o=m.text_color)&&void 0!==o?o:"#172554",y=null!==(a=m.accent_color)&&void 0!==a?a:"#7A81EB",b=""!==(null===(p=v.event)||void 0===p?void 0:p.header)&&null!==(null===(r=v.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"taplo-relative taplo-flex taplo-flex-row taplo-w-fit taplo-h-fit taplo-min-h-[90px] taplo-max-w-[360px] taplo-min-w-[300px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group"},c.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(E,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center taplo-px-5 taplo-py-4"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full"},b&&c.createElement("p",{style:{color:E},className:"taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-2"},null===(u=v.event)||void 0===u?void 0:u.header),c.createElement("p",{style:{color:E},className:"".concat(b?"taplo-text-[13px]":"taplo-text-[14px]"," taplo-leading-4 taplo-mb-1"),dangerouslySetInnerHTML:{__html:v.message}}),c.createElement("div",{className:"taplo-text-[11.5px] taplo-leading-5",style:{color:(0,d.j5)(E,.65)}},v.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-1 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(E,.65)}},"Verified by Taplo",c.createElement(n.A,{width:20,height:20,fill:y,color:x}))))))},N=function(t){var l,e,o,a,p,r,s,u,v=t.project,f=t.notification,x=t.setExitPopup,g=null==f?void 0:f.product,y=f.event,b=null!==(l=v.bg_color)&&void 0!==l?l:"#FFFFFF",w=null!==(e=v.border_color)&&void 0!==e?e:"#FFFFFF",F=null!==(o=v.text_color)&&void 0!==o?o:"#172554",N=null!==(a=v.accent_color)&&void 0!==a?a:"#7A81EB",j=""!==(null===(p=f.event)||void 0===p?void 0:p.header)&&null!==(null===(r=f.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:b,borderColor:w},className:"taplo-relative taplo-flex taplo-flex-col taplo-h-fit taplo-min-h-[250px] taplo-w-[250px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group"},c.createElement("div",{style:{backgroundColor:b,borderColor:w},onClick:function(){return x(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(F,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-items-center taplo-justify-center taplo-h-full taplo-w-full"},g&&null!=g&&g.image_url&&""!==g.image_url?c.createElement("div",{className:"taplo-relative taplo-h-[140px] taplo-w-full"},c.createElement(m(),{loader:function(){return g.image_url||""},unoptimized:!0,fill:!0,alt:"product-img",src:g.image_url,className:"taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-t-lg"})):c.createElement("div",{className:"taplo-flex taplo-h-full taplo-w-full taplo-max-h-[140px] taplo-items-center taplo-justify-center taplo-aspect-square taplo-rounded-t-lg taplo-outline-1 taplo-outline",style:{backgroundColor:(0,d.j5)(N,.2),outlineColor:(0,d.j5)(N,.2)}},E(null==y?void 0:y.event_type,v,"lg"))),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-gap-4 taplo-items-center"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full taplo-gap-[4px] taplo-mx-2 taplo-p-2"},j&&c.createElement("div",{className:"taplo-flex taplo-gap-[2px]"},c.createElement("p",{style:{color:F},className:"taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-1"},null===(u=f.event)||void 0===u?void 0:u.header)),c.createElement("div",{style:{color:F},className:"".concat(j?"taplo-text-[12px]":"taplo-text-[13px]"," taplo-leading-4 taplo-mb-1"),dangerouslySetInnerHTML:{__html:f.message}}),c.createElement("div",{className:"taplo-text-[11px] taplo-leading-5",style:{color:(0,d.j5)(F,.65)}},f.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-2 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[10.5px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(F,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:N,color:b}))))))},j=function(t){var l,e,o,a,p,r,s,u,m=t.project,v=t.notification,f=t.setExitPopup,x=null!==(l=m.bg_color)&&void 0!==l?l:"#FFFFFF",g=null!==(e=m.border_color)&&void 0!==e?e:"#FFFFFF",E=null!==(o=m.text_color)&&void 0!==o?o:"#172554",y=null!==(a=m.accent_color)&&void 0!==a?a:"#7A81EB",b=""!==(null===(p=v.event)||void 0===p?void 0:p.header)&&null!==(null===(r=v.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return c.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"taplo-relative taplo-flex taplo-flex-col taplo-w-fit taplo-h-fit taplo-min-h-[130px] taplo-py-5 taplo-items-center taplo-justify-center taplo-max-w-[280px] taplo-min-w-[260px] taplo-rounded-lg taplo-border taplo-shadow-lg taplo-gap-3 taplo-group"},c.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(E,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-gap-4 taplo-items-center"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-w-full taplo-text-center taplo-items-center taplo-justify-center taplo-gap-[4px] taplo-px-5 taplo-py-3"},b&&c.createElement("div",{className:"taplo-flex taplo-gap-[2px]"},c.createElement("p",{style:{color:E},className:"taplo-text-[15px] taplo-leading-5 taplo-font-bold taplo-mb-1"},null===(u=v.event)||void 0===u?void 0:u.header)),c.createElement("div",{style:{color:E},className:"".concat(b?"taplo-text-[13px]":"taplo-text-[14px]"," taplo-leading-4 taplo-mb-1"),dangerouslySetInnerHTML:{__html:v.message}}),c.createElement("div",{className:"taplo-text-[12px] taplo-leading-5",style:{color:(0,d.j5)(E,.65)}},v.time,c.createElement(h(),{className:"taplo-absolute taplo-bottom-[2px] taplo-link-hover taplo-right-2 taplo-flex taplo-items-center taplo-gap-[3px] taplo-text-[11px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(E,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:y,color:x}))))))},_=function(t){var l,e,o,a,p,r,s,u,v=t.project,x=t.notification,g=t.setExitPopup,y=null==x?void 0:x.product,b=x.event,w=null!==(l=v.bg_color)&&void 0!==l?l:"#FFFFFF",F=null!==(e=v.border_color)&&void 0!==e?e:"#FFFFFF",N=null!==(o=v.text_color)&&void 0!==o?o:"#172554",j=null!==(a=v.accent_color)&&void 0!==a?a:"#7A81EB",_=""!==(null===(p=x.event)||void 0===p?void 0:p.header)&&null!==(null===(r=x.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=x.event)||void 0===s?void 0:s.header),C=f().sanitize('<span class="taplo-font-semibold">'.concat(null===(u=x.event)||void 0===u?void 0:u.header," | </span>"));return c.createElement("div",{style:{backgroundColor:w,borderColor:F},className:"taplo-relative taplo-flex taplo-flex-row taplo-pr-5 taplo-pl-3 taplo-h-fit taplo-min-h-[60px] taplo-min-w-[300px] taplo-max-w-[700px] taplo-items-center taplo-justify-center taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group"},c.createElement("div",{style:{backgroundColor:w,borderColor:F},onClick:function(){return g(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(N,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-items-center taplo-justify-center"},y&&null!=y&&y.image_url&&""!==y.image_url?c.createElement("div",{className:"taplo-w-10 taplo-h-10"},c.createElement(m(),{loader:function(){return y.image_url||""},unoptimized:!0,width:40,height:40,alt:"product-img",src:y.image_url,className:"taplo-object-cover taplo-w-full taplo-h-full taplo-rounded-full"})):c.createElement("div",{className:"taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-w-10 taplo-h-10 taplo-min-w-10 taplo-aspect-square",style:{backgroundColor:(0,d.j5)(j,.2)}},E(null==b?void 0:b.event_type,v,"sm"))),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center taplo-justify-center"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-items-center taplo-justify-center taplo-w-full taplo-pl-4 taplo-py-2 taplo-gap-1"},c.createElement("div",{className:"taplo-inline-flex taplo-items-center taplo-gap-1"},c.createElement("p",{style:{color:N},className:"taplo-text-[13px] taplo-leading-4 taplo-text-center",dangerouslySetInnerHTML:{__html:_?C+x.message:x.message}})),c.createElement("div",{className:"taplo-flex taplo-flex-row taplo-gap-1 taplo-text-[11px] taplo-leading-5",style:{color:(0,d.j5)(N,.65)}},x.time,c.createElement("p",null,"|"),c.createElement(h(),{className:"taplo-flex taplo-link-hover taplo-items-center taplo-gap-[3px]",href:"https://www.taplo.io",style:{color:(0,d.j5)(N,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:j,color:w}))))))},C=function(t){var l,e,o,a,p,r,s,u,m=t.project,v=t.notification,x=t.setExitPopup,g=null!==(l=m.bg_color)&&void 0!==l?l:"#FFFFFF",E=null!==(e=m.border_color)&&void 0!==e?e:"#FFFFFF",y=null!==(o=m.text_color)&&void 0!==o?o:"#172554",b=null!==(a=m.accent_color)&&void 0!==a?a:"#7A81EB",w=""!==(null===(p=v.event)||void 0===p?void 0:p.header)&&null!==(null===(r=v.event)||void 0===r?void 0:r.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header),F=f().sanitize('<span class="taplo-font-semibold">'.concat(null===(u=v.event)||void 0===u?void 0:u.header," | </span>"));return c.createElement("div",{style:{backgroundColor:g,borderColor:E},className:"taplo-relative taplo-flex taplo-flex-col taplo-h-fit taplo-min-h-[60px] taplo-min-w-[300px] taplo-max-w-[700px] taplo-items-center taplo-justify-center taplo-rounded-lg taplo-border taplo-shadow-lg taplo-group"},c.createElement("div",{style:{backgroundColor:g,borderColor:E},onClick:function(){return x(!0)},className:"taplo-absolute taplo--top-3 taplo--right-3 taplo-rounded-full taplo-flex taplo-items-center taplo-justify-center taplo-border taplo-shadow-lg taplo-p-1 taplo-opacity-0 taplo-transition-opacity taplo-duration-300 taplo-group-hover:opacity-100 taplo-cursor-pointer taplo-hover:taplo-bg-opacity-75"},c.createElement(i.A,{color:(0,d.j5)(y,.65),width:14,height:14})),c.createElement("div",{className:"taplo-flex taplo-w-full taplo-items-center taplo-justify-center"},c.createElement("div",{className:"taplo-flex taplo-flex-col taplo-items-center taplo-justify-center taplo-w-full taplo-px-5 taplo-py-2 taplo-gap-1"},c.createElement("div",{className:"taplo-inline-flex taplo-items-center taplo-gap-1"},c.createElement("p",{style:{color:y},className:"taplo-text-[13px] taplo-leading-4 taplo-text-center",dangerouslySetInnerHTML:{__html:w?F+v.message:v.message}})),c.createElement("div",{className:"taplo-flex taplo-flex-row taplo-gap-1 taplo-text-[11px] taplo-leading-5",style:{color:(0,d.j5)(y,.65)}},v.time,c.createElement("p",null,"|"),c.createElement(h(),{className:"taplo-flex taplo-items-center taplo-gap-[3px] taplo-link-hover",href:"https://www.taplo.io",style:{color:(0,d.j5)(y,.65)}},"Verified by Taplo",c.createElement(n.A,{width:18,height:18,fill:b,color:g}))))))}}}]);