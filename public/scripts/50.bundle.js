"use strict";(self.webpackChunkNotificationWidget=self.webpackChunkNotificationWidget||[]).push([[50],{50:(e,t,l)=>{l.r(t),l.d(t,{default:()=>f});var o=l(110),r=l(696),c=l(676),a=l(752),i=l(697),n=l(803),s=l(540),u=l(312),m=l(61),d=l(965),p=l.n(d);function f(e){var t=e.project,l=e.notification,o=e.setExitPopup;switch(t.template){case u.If.SmPopup:return s.createElement(x,{project:t,notification:l,setExitPopup:o});case u.If.SmPopupNoImg:return s.createElement(h,{project:t,notification:l,setExitPopup:o});case u.If.LgPopup:return s.createElement(v,{project:t,notification:l,setExitPopup:o});case u.If.LgPopupNoImg:return s.createElement(E,{project:t,notification:l,setExitPopup:o});case u.If.Card:return s.createElement(y,{project:t,notification:l,setExitPopup:o});case u.If.CardNoImg:return s.createElement(b,{project:t,notification:l,setExitPopup:o});case u.If.Banner:return s.createElement(w,{project:t,notification:l,setExitPopup:o});case u.If.BannerNoImg:return s.createElement(F,{project:t,notification:l,setExitPopup:o});default:s.Fragment}}var g=function(e,t){var l,i,n,d,p=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"lg",f="lg"===p?28:"md"===p?24:20;switch(e){case u.Bx.Purchase:return s.createElement(o.A,{color:(0,m.j5)(null!==(l=t.accent_color)&&void 0!==l?l:"#7A81EB",.85),height:f,width:f});case u.Bx.Checkout:return s.createElement(r.A,{color:(0,m.j5)(null!==(i=t.accent_color)&&void 0!==i?i:"#7A81EB",.85),height:f,width:f});case u.Bx.SomeoneViewing:return s.createElement(c.A,{color:(0,m.j5)(null!==(n=t.accent_color)&&void 0!==n?n:"#7A81EB",.85),height:f,width:f});case u.Bx.ActiveVisitors:return s.createElement(a.A,{color:(0,m.j5)(null!==(d=t.accent_color)&&void 0!==d?d:"#7A81EB",.85),height:f,width:f})}},x=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null==a?void 0:a.product,f=a.event,x=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",h=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",v=null!==(o=c.text_color)&&void 0!==o?o:"#172554",E=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:x,borderColor:h},className:"relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] rounded-lg border shadow-lg py-4 gap-3 group"},s.createElement("div",{style:{backgroundColor:x,borderColor:h},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(v,.65),width:14,height:14})),s.createElement("div",{className:"flex items-center justify-center"},d&&null!=d&&d.image_url&&""!==(null==d?void 0:d.image_url)?s.createElement("div",{className:"w-16 h-16 min-w-16"},s.createElement(p(),{loader:function(){return d.image_url||""},width:110,height:110,alt:"product-img",src:d.image_url,className:"object-cover w-full h-full rounded-full"})):s.createElement("div",{className:"rounded-full flex items-center justify-center w-16 h-16 min-w-16 aspect-square",style:{backgroundColor:(0,m.j5)(E,.2)}},g(null==f?void 0:f.event_type,c,"sm"))),s.createElement("div",{className:"flex w-full gap-4 items-center ml-2"},s.createElement("div",{className:"flex flex-col w-full gap-2"},s.createElement("p",{style:{color:v},className:"text-[12.5px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-xs text-[11.5px] flex items-center gap-4",style:{color:(0,m.j5)(v,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]",style:{color:(0,m.j5)(v,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:E,color:x}))))))},h=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",p=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",f=null!==(o=c.text_color)&&void 0!==o?o:"#172554",g=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:d,borderColor:p},className:"relative flex w-fit h-fit pr-6 pl-4 max-w-[300px] rounded-lg border shadow-lg py-4 group"},s.createElement("div",{style:{backgroundColor:d,borderColor:p},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(f,.65),width:14,height:14})),s.createElement("div",{className:"flex w-full gap-4 items-center"},s.createElement("div",{className:"flex flex-col w-full gap-2"},s.createElement("p",{style:{color:f},className:"text-[13px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-xs flex items-center gap-4",style:{color:(0,m.j5)(f,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]",style:{color:(0,m.j5)(f,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:g,color:d}))))))},v=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null==a?void 0:a.product,f=a.event,x=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",h=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",v=null!==(o=c.text_color)&&void 0!==o?o:"#172554",E=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:x,borderColor:h},className:"relative flex flex-row w-fit h-fit min-h-[100px] max-w-[380px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg group"},s.createElement("div",{style:{backgroundColor:x,borderColor:h},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(v,.65),width:14,height:14})),s.createElement("div",{className:"flex items-center justify-center h-full w-full max-w-[110px]"},d&&null!=d&&d.image_url&&""!==d.image_url?s.createElement("div",{className:"h-[110px] w-[110px]"},s.createElement(p(),{loader:function(){return d.image_url||""},width:110,height:110,alt:"product-img",src:d.image_url,className:"object-cover w-full h-full rounded-l-lg"})):s.createElement("div",{className:"flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline",style:{backgroundColor:(0,m.j5)(E,.2),outlineColor:(0,m.j5)(E,.2)}},g(null==f?void 0:f.event_type,c))),s.createElement("div",{className:"flex w-full items-center pr-3 pl-5"},s.createElement("div",{className:"flex flex-col w-full lg:gap-[6px]"},s.createElement("p",{style:{color:v},className:"text-[14.5px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-[13px] flex items-center gap-4",style:{color:(0,m.j5)(v,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]",style:{color:(0,m.j5)(v,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:E,color:x}))))))},E=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",p=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",f=null!==(o=c.text_color)&&void 0!==o?o:"#172554",g=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:d,borderColor:p},className:"relative flex flex-row w-fit h-fit min-h-[110px] max-w-[340px] rounded-lg border shadow-lg gap-3 group"},s.createElement("div",{style:{backgroundColor:d,borderColor:p},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(f,.65),width:14,height:14})),s.createElement("div",{className:"flex w-full gap-3 items-center mx-3"},s.createElement("div",{className:"flex flex-col w-full gap-[6px] mx-2"},s.createElement("p",{style:{color:f},className:"text-[14.5px] leading-5 mt-1",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-[13px] flex items-center",style:{color:(0,m.j5)(f,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]",style:{color:(0,m.j5)(f,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:g,color:d}))))))},y=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null==a?void 0:a.product,f=a.event,x=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",h=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",v=null!==(o=c.text_color)&&void 0!==o?o:"#172554",E=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:x,borderColor:h},className:"relative flex flex-col w-fit h-fit min-h-[270px] max-w-[280px] rounded-lg border shadow-lg gap-3 group"},s.createElement("div",{style:{backgroundColor:x,borderColor:h},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(v,.65),width:14,height:14})),s.createElement("div",{className:"flex items-center justify-center h-full min-w-[270px]"},d&&null!=d&&d.image_url&&""!==d.image_url?s.createElement("div",{className:"h-[160px] w-full"},s.createElement(p(),{loader:function(){return d.image_url||""},width:90,height:90,alt:"product-img",src:d.image_url,className:"object-cover w-full h-full rounded-t-lg"})):s.createElement("div",{className:"flex h-full w-full max-h-[160px] items-center justify-center aspect-square rounded-t-lg outline-1 outline",style:{backgroundColor:(0,m.j5)(E,.2),outlineColor:(0,m.j5)(E,.2)}},g(null==f?void 0:f.event_type,c))),s.createElement("div",{className:"flex w-full gap-4 items-center"},s.createElement("div",{className:"flex flex-col w-full gap-[4px] mx-2 p-2"},s.createElement("p",{style:{color:v},className:"text-[13px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-[12px] flex items-center gap-4",style:{color:(0,m.j5)(v,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]",style:{color:(0,m.j5)(v,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:E,color:x}))))))},b=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",p=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",f=null!==(o=c.text_color)&&void 0!==o?o:"#172554",g=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:d,borderColor:p},className:"relative flex flex-col w-fit h-fit min-h-[160px] items-center justify-center max-w-[280px] rounded-lg border shadow-lg gap-3 group"},s.createElement("div",{style:{backgroundColor:d,borderColor:p},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(f,.65),width:14,height:14})),s.createElement("div",{className:"flex w-full gap-4 items-center"},s.createElement("div",{className:"flex flex-col w-full text-center items-center justify-center gap-[4px] px-5 py-3"},s.createElement("p",{style:{color:f},className:"text-[13px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"text-[12px] flex items-center gap-4",style:{color:(0,m.j5)(f,.65)}},a.time,s.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]",style:{color:(0,m.j5)(f,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:g,color:d}))))))},w=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null==a?void 0:a.product,f=a.event,x=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",h=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",v=null!==(o=c.text_color)&&void 0!==o?o:"#172554",E=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:x,borderColor:h},className:"relative flex flex-row px-5 h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg group"},s.createElement("div",{style:{backgroundColor:x,borderColor:h},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(v,.65),width:14,height:14})),s.createElement("div",{className:"flex items-center justify-center"},d&&null!=d&&d.image_url&&""!==d.image_url?s.createElement("div",{className:"w-12 h-12"},s.createElement(p(),{loader:function(){return d.image_url||""},width:48,height:48,alt:"product-img",src:d.image_url,className:"object-cover w-full h-full rounded-full"})):s.createElement("div",{className:"rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square",style:{backgroundColor:(0,m.j5)(E,.2)}},g(null==f?void 0:f.event_type,c,"md"))),s.createElement("div",{className:"flex w-full items-center justify-center"},s.createElement("div",{className:"flex flex-col items-center justify-center w-full px-5 py-2 gap-1"},s.createElement("p",{style:{color:v},className:"text-[13px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"flex flex-row gap-1 md:text-[12px] lg:text-[12px] text-[11px] leading-5",style:{color:(0,m.j5)(v,.65)}},a.time,s.createElement("p",null,"|"),s.createElement("p",{className:"flex items-center gap-[3px]",style:{color:(0,m.j5)(v,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:E,color:x}))))))},F=function(e){var t,l,o,r,c=e.project,a=e.notification,u=e.setExitPopup,d=null!==(t=c.bg_color)&&void 0!==t?t:"#FFFFFF",p=null!==(l=c.border_color)&&void 0!==l?l:"#FFFFFF",f=null!==(o=c.text_color)&&void 0!==o?o:"#172554",g=null!==(r=c.accent_color)&&void 0!==r?r:"#7A81EB";return s.createElement("div",{style:{backgroundColor:d,borderColor:p},className:"relative flex flex-col h-fit min-h-[60px] items-center justify-center max-w-screen-md rounded-lg border shadow-lg group"},s.createElement("div",{style:{backgroundColor:d,borderColor:p},onClick:function(){return u(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},s.createElement(i.A,{color:(0,m.j5)(f,.65),width:14,height:14})),s.createElement("div",{className:"flex w-full items-center justify-center"},s.createElement("div",{className:"flex flex-col items-center justify-center w-full px-5 py-2 gap-1"},s.createElement("p",{style:{color:f},className:"text-[13px] leading-5",dangerouslySetInnerHTML:{__html:a.message}}),s.createElement("div",{className:"flex flex-row gap-1 text-[12px] -mt-2",style:{color:(0,m.j5)(f,.65)}},a.time,s.createElement("p",null,"|"),s.createElement("p",{className:"flex items-center gap-[3px]",style:{color:(0,m.j5)(f,.65)}},"Verified by Taplo",s.createElement(n.A,{width:18,height:18,fill:g,color:d}))))))}}}]);