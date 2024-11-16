"use strict";(self.webpackChunkNotificationWidget=self.webpackChunkNotificationWidget||[]).push([[50],{50:(e,t,l)=>{l.r(t),l.d(t,{default:()=>x});var o=l(110),r=l(696),i=l(676),n=l(752),a=l(697),c=l(803),d=l(540),s=l(312),u=l(61),m=l(965),p=l.n(m),v=l(74),f=l.n(v);function x(e){var t=e.project,l=e.notification,o=e.setExitPopup;switch(t.template){case s.If.SmPopup:return d.createElement(h,{project:t,notification:l,setExitPopup:o});case s.If.SmPopupNoImg:return d.createElement(E,{project:t,notification:l,setExitPopup:o});case s.If.LgPopup:return d.createElement(y,{project:t,notification:l,setExitPopup:o});case s.If.LgPopupNoImg:return d.createElement(b,{project:t,notification:l,setExitPopup:o});case s.If.Card:return d.createElement(w,{project:t,notification:l,setExitPopup:o});case s.If.CardNoImg:return d.createElement(F,{project:t,notification:l,setExitPopup:o});case s.If.Banner:return d.createElement(N,{project:t,notification:l,setExitPopup:o});case s.If.BannerNoImg:return d.createElement(j,{project:t,notification:l,setExitPopup:o});default:d.Fragment}}var g=function(e,t){var l,a,c,m,p=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"md",v="lg"===p?38:"md"===p?28:20;switch(e){case s.Bx.Purchase:return d.createElement(o.A,{color:(0,u.j5)(null!==(l=t.accent_color)&&void 0!==l?l:"#7A81EB",.85),height:v,width:v});case s.Bx.Checkout:return d.createElement(r.A,{color:(0,u.j5)(null!==(a=t.accent_color)&&void 0!==a?a:"#7A81EB",.85),height:v,width:v});case s.Bx.SomeoneViewing:return d.createElement(i.A,{color:(0,u.j5)(null!==(c=t.accent_color)&&void 0!==c?c:"#7A81EB",.85),height:v,width:v});case s.Bx.ActiveUsers:return d.createElement(n.A,{color:(0,u.j5)(null!==(m=t.accent_color)&&void 0!==m?m:"#7A81EB",.85),height:v,width:v})}},h=function(e){var t,l,o,r,i,n,s,m,v=e.project,f=e.notification,x=e.setExitPopup,h=null==f?void 0:f.product,E=f.event,y=null!==(t=v.bg_color)&&void 0!==t?t:"#FFFFFF",b=null!==(l=v.border_color)&&void 0!==l?l:"#FFFFFF",w=null!==(o=v.text_color)&&void 0!==o?o:"#172554",F=null!==(r=v.accent_color)&&void 0!==r?r:"#7A81EB",N=""!==(null===(i=f.event)||void 0===i?void 0:i.header)&&null!==(null===(n=f.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:y,borderColor:b},className:"relative flex flex-row w-fit h-fit pr-6 pl-4 max-w-[330px] min-w-[280px] min-h-[80px] rounded-lg border shadow-lg py-3 gap-3 group"},d.createElement("div",{style:{backgroundColor:y,borderColor:b},onClick:function(){return x(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(w,.65),width:14,height:14})),d.createElement("div",{className:"flex items-center justify-center"},h&&null!=h&&h.image_url&&""!==(null==h?void 0:h.image_url)?d.createElement("div",{className:"w-12 h-12 min-w-12"},d.createElement(p(),{loader:function(){return h.image_url||""},unoptimized:!0,width:48,height:48,alt:"product-img",src:h.image_url,className:"object-cover w-full h-full rounded-full"})):d.createElement("div",{className:"rounded-full flex items-center justify-center w-12 h-12 min-w-12 aspect-square",style:{backgroundColor:(0,u.j5)(F,.2)}},g(null==E?void 0:E.event_type,v,"sm"))),d.createElement("div",{className:"flex w-full items-center ml-2"},d.createElement("div",{className:"flex flex-col w-full"},N&&d.createElement("div",{className:"flex justify-between leading-5"},d.createElement("p",{style:{color:w},className:"text-[13.5px] font-bold"},null===(m=f.event)||void 0===m?void 0:m.header),d.createElement("div",{className:"absolute bottom-[2px] right-3 text-[10px] flex items-center gap-[2px]",style:{color:(0,u.j5)(w,.65)}},f.time," | Verified by Taplo"," ",d.createElement(c.A,{width:18,height:18,fill:F,color:y}))),d.createElement("p",{style:{color:w},className:"".concat(N?"text-[11.5px] mb-4 mt-1":"text-[12.5px]"," leading-4"),dangerouslySetInnerHTML:{__html:f.message}}),!N&&d.createElement("div",{className:"text-[11px] flex items-center mt-1 leading-4",style:{color:(0,u.j5)(w,.65)}},f.time,d.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10px]",style:{color:(0,u.j5)(w,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:F,color:y}))))))},E=function(e){var t,l,o,r,i,n,s,m,p=e.project,v=e.notification,f=e.setExitPopup,x=null!==(t=p.bg_color)&&void 0!==t?t:"#FFFFFF",g=null!==(l=p.border_color)&&void 0!==l?l:"#FFFFFF",h=null!==(o=p.text_color)&&void 0!==o?o:"#172554",E=null!==(r=p.accent_color)&&void 0!==r?r:"#7A81EB",y=""!==(null===(i=v.event)||void 0===i?void 0:i.header)&&null!==(null===(n=v.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"relative flex flex-row w-fit h-fit px-5 max-w-[330px] min-w-[280px] min-h-[80px] rounded-lg border shadow-lg py-4 gap-3 group"},d.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(h,.65),width:14,height:14})),d.createElement("div",{className:"flex w-full items-center"},d.createElement("div",{className:"flex flex-col w-full"},y&&d.createElement("div",{className:"flex justify-between leading-5"},d.createElement("p",{style:{color:h},className:"text-[14px] font-bold"},null===(m=v.event)||void 0===m?void 0:m.header),d.createElement("div",{className:"absolute bottom-1 right-2 text-[10.5px] flex items-center gap-1",style:{color:(0,u.j5)(h,.65)}},v.time," |"," ",d.createElement("div",{className:"flex gap-[2px]"},"Verified by Taplo"," ",d.createElement(c.A,{width:18,height:18,fill:E,color:x,className:"mt-[1px]"})))),d.createElement("p",{style:{color:h},className:"".concat(y?"text-[12px] mt-2 mb-3":"text-[13px]"," leading-4"),dangerouslySetInnerHTML:{__html:v.message}}),!y&&d.createElement("div",{className:"text-[11.5px] flex items-center mt-1 leading-4",style:{color:(0,u.j5)(h,.65)}},v.time,d.createElement("p",{className:"absolute bottom-1 right-1 flex items-center gap-[3px] text-[11px]",style:{color:(0,u.j5)(h,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:E,color:x}))))))},y=function(e){var t,l,o,r,i,n,s,m,v=e.project,f=e.notification,x=e.setExitPopup,h=null==f?void 0:f.product,E=f.event,y=null!==(t=v.bg_color)&&void 0!==t?t:"#FFFFFF",b=null!==(l=v.border_color)&&void 0!==l?l:"#FFFFFF",w=null!==(o=v.text_color)&&void 0!==o?o:"#172554",F=null!==(r=v.accent_color)&&void 0!==r?r:"#7A81EB",N=""!==(null===(i=f.event)||void 0===i?void 0:i.header)&&null!==(null===(n=f.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:y,borderColor:b},className:"relative flex flex-row w-fit min-h-[120px] h-fit max-w-[400px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg group"},d.createElement("div",{style:{backgroundColor:y,borderColor:b},onClick:function(){return x(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(w,.65),width:14,height:14})),d.createElement("div",{className:"relative h-auto w-[180px] flex flex-grow"},h&&null!=h&&h.image_url&&""!==h.image_url?d.createElement("div",{className:"flex relative w-full h-full"},d.createElement(p(),{loader:function(){return h.image_url||""},unoptimized:!0,alt:"product-img",fill:!0,src:h.image_url,className:"object-cover w-full h-full rounded-l-lg"})):d.createElement("div",{className:"flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline",style:{backgroundColor:(0,u.j5)(F,.2),outlineColor:(0,u.j5)(F,.2)}},g(null==E?void 0:E.event_type,v))),d.createElement("div",{className:"flex w-full items-center pr-4 pl-5 py-4"},d.createElement("div",{className:"flex flex-col w-full"},N&&d.createElement("p",{style:{color:w},className:"text-[15px] leading-5 font-bold mb-2"},null===(m=f.event)||void 0===m?void 0:m.header),d.createElement("p",{style:{color:w},className:"".concat(N?"text-[13px]":"text-[14px]"," leading-4 mb-1"),dangerouslySetInnerHTML:{__html:f.message}}),d.createElement("div",{className:"text-[11.5px] leading-5",style:{color:(0,u.j5)(w,.65)}},f.time,d.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]",style:{color:(0,u.j5)(w,.65)}},"Verified by Taplo",d.createElement(c.A,{width:20,height:20,fill:F,color:y}))))))},b=function(e){var t,l,o,r,i,n,s,m,p=e.project,v=e.notification,f=e.setExitPopup,x=null!==(t=p.bg_color)&&void 0!==t?t:"#FFFFFF",g=null!==(l=p.border_color)&&void 0!==l?l:"#FFFFFF",h=null!==(o=p.text_color)&&void 0!==o?o:"#172554",E=null!==(r=p.accent_color)&&void 0!==r?r:"#7A81EB",y=""!==(null===(i=v.event)||void 0===i?void 0:i.header)&&null!==(null===(n=v.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"relative flex flex-row w-fit h-fit min-h-[90px] max-w-[360px] min-w-[300px] rounded-lg border shadow-lg gap-3 group"},d.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(h,.65),width:14,height:14})),d.createElement("div",{className:"flex w-full items-center px-5 py-4"},d.createElement("div",{className:"flex flex-col w-full"},y&&d.createElement("p",{style:{color:h},className:"text-[15px] leading-5 font-bold mb-2"},null===(m=v.event)||void 0===m?void 0:m.header),d.createElement("p",{style:{color:h},className:"".concat(y?"text-[13px]":"text-[14px]"," leading-4 mb-1"),dangerouslySetInnerHTML:{__html:v.message}}),d.createElement("div",{className:"text-[11.5px] leading-5",style:{color:(0,u.j5)(h,.65)}},v.time,d.createElement("p",{className:"absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[11px]",style:{color:(0,u.j5)(h,.65)}},"Verified by Taplo",d.createElement(c.A,{width:20,height:20,fill:E,color:x}))))))},w=function(e){var t,l,o,r,i,n,s,m,v=e.project,f=e.notification,x=e.setExitPopup,h=null==f?void 0:f.product,E=f.event,y=null!==(t=v.bg_color)&&void 0!==t?t:"#FFFFFF",b=null!==(l=v.border_color)&&void 0!==l?l:"#FFFFFF",w=null!==(o=v.text_color)&&void 0!==o?o:"#172554",F=null!==(r=v.accent_color)&&void 0!==r?r:"#7A81EB",N=""!==(null===(i=f.event)||void 0===i?void 0:i.header)&&null!==(null===(n=f.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=f.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:y,borderColor:b},className:"relative flex flex-col h-fit min-h-[250px] w-[250px] rounded-lg border shadow-lg gap-3 group"},d.createElement("div",{style:{backgroundColor:y,borderColor:b},onClick:function(){return x(!0)},className:"absolute -top-3 -right-3 rounded-full z-50 flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(w,.65),width:14,height:14})),d.createElement("div",{className:"flex items-center justify-center h-full w-full"},h&&null!=h&&h.image_url&&""!==h.image_url?d.createElement("div",{className:"relative h-[140px] w-full"},d.createElement(p(),{loader:function(){return h.image_url||""},unoptimized:!0,fill:!0,alt:"product-img",src:h.image_url,className:"object-cover w-full h-full rounded-t-lg"})):d.createElement("div",{className:"flex h-full w-full max-h-[140px] items-center justify-center aspect-square rounded-t-lg outline-1 outline",style:{backgroundColor:(0,u.j5)(F,.2),outlineColor:(0,u.j5)(F,.2)}},g(null==E?void 0:E.event_type,v,"lg"))),d.createElement("div",{className:"flex w-full gap-4 items-center"},d.createElement("div",{className:"flex flex-col w-full gap-[4px] mx-2 p-2"},N&&d.createElement("div",{className:"flex gap-[2px]"},d.createElement("p",{style:{color:w},className:"text-[15px] leading-5 font-bold mb-1"},null===(m=f.event)||void 0===m?void 0:m.header)),d.createElement("div",{style:{color:w},className:"".concat(N?"text-[12px]":"text-[13px]"," leading-4 mb-1"),dangerouslySetInnerHTML:{__html:f.message}}),d.createElement("div",{className:"text-[11px] leading-5",style:{color:(0,u.j5)(w,.65)}},f.time,d.createElement("div",{className:"absolute bottom-[2px] right-2 flex items-center gap-[3px] text-[10.5px]",style:{color:(0,u.j5)(w,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:F,color:y}))))))},F=function(e){var t,l,o,r,i,n,s,m,p=e.project,v=e.notification,f=e.setExitPopup,x=null!==(t=p.bg_color)&&void 0!==t?t:"#FFFFFF",g=null!==(l=p.border_color)&&void 0!==l?l:"#FFFFFF",h=null!==(o=p.text_color)&&void 0!==o?o:"#172554",E=null!==(r=p.accent_color)&&void 0!==r?r:"#7A81EB",y=""!==(null===(i=v.event)||void 0===i?void 0:i.header)&&null!==(null===(n=v.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header);return d.createElement("div",{style:{backgroundColor:x,borderColor:g},className:"relative flex flex-col w-fit h-fit min-h-[130px] py-5 items-center justify-center max-w-[280px] min-w-[260px] rounded-lg border shadow-lg gap-3 group"},d.createElement("div",{style:{backgroundColor:x,borderColor:g},onClick:function(){return f(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(h,.65),width:14,height:14})),d.createElement("div",{className:"flex w-full gap-4 items-center"},d.createElement("div",{className:"flex flex-col w-full text-center items-center justify-center gap-[4px] px-5 py-3"},y&&d.createElement("div",{className:"flex gap-[2px]"},d.createElement("p",{style:{color:h},className:"text-[15px] leading-5 font-bold mb-1"},null===(m=v.event)||void 0===m?void 0:m.header)),d.createElement("div",{style:{color:h},className:"".concat(y?"text-[13px]":"text-[14px]"," leading-4 mb-1"),dangerouslySetInnerHTML:{__html:v.message}}),d.createElement("div",{className:"text-[12px] leading-5",style:{color:(0,u.j5)(h,.65)}},v.time,d.createElement("div",{className:"absolute bottom-[2px] right-2 flex items-center gap-[3px] text-[11px]",style:{color:(0,u.j5)(h,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:E,color:x}))))))},N=function(e){var t,l,o,r,i,n,s,m,v=e.project,x=e.notification,h=e.setExitPopup,E=null==x?void 0:x.product,y=x.event,b=null!==(t=v.bg_color)&&void 0!==t?t:"#FFFFFF",w=null!==(l=v.border_color)&&void 0!==l?l:"#FFFFFF",F=null!==(o=v.text_color)&&void 0!==o?o:"#172554",N=null!==(r=v.accent_color)&&void 0!==r?r:"#7A81EB",j=""!==(null===(i=x.event)||void 0===i?void 0:i.header)&&null!==(null===(n=x.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=x.event)||void 0===s?void 0:s.header),_=f().sanitize('<span class="font-semibold">'.concat(null===(m=x.event)||void 0===m?void 0:m.header," | </span>"));return d.createElement("div",{style:{backgroundColor:b,borderColor:w},className:"relative flex flex-row pr-5 pl-3 h-fit min-h-[60px] min-w-[300px] max-w-[700px] items-center justify-center rounded-lg border shadow-lg group"},d.createElement("div",{style:{backgroundColor:b,borderColor:w},onClick:function(){return h(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(F,.65),width:14,height:14})),d.createElement("div",{className:"flex items-center justify-center"},E&&null!=E&&E.image_url&&""!==E.image_url?d.createElement("div",{className:"w-10 h-10"},d.createElement(p(),{loader:function(){return E.image_url||""},unoptimized:!0,width:40,height:40,alt:"product-img",src:E.image_url,className:"object-cover w-full h-full rounded-full"})):d.createElement("div",{className:"rounded-full flex items-center justify-center w-10 h-10 min-w-10 aspect-square",style:{backgroundColor:(0,u.j5)(N,.2)}},g(null==y?void 0:y.event_type,v,"sm"))),d.createElement("div",{className:"flex w-full items-center justify-center"},d.createElement("div",{className:"flex flex-col items-center justify-center w-full pl-4 py-2 gap-1"},d.createElement("div",{className:"inline-flex items-center gap-1"},d.createElement("p",{style:{color:F},className:"text-[13px] leading-4 text-center",dangerouslySetInnerHTML:{__html:j?_+x.message:x.message}})),d.createElement("div",{className:"flex flex-row gap-1 text-[11px] leading-5",style:{color:(0,u.j5)(F,.65)}},x.time,d.createElement("p",null,"|"),d.createElement("div",{className:"flex items-center gap-[3px]",style:{color:(0,u.j5)(F,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:N,color:b}))))))},j=function(e){var t,l,o,r,i,n,s,m,p=e.project,v=e.notification,x=e.setExitPopup,g=null!==(t=p.bg_color)&&void 0!==t?t:"#FFFFFF",h=null!==(l=p.border_color)&&void 0!==l?l:"#FFFFFF",E=null!==(o=p.text_color)&&void 0!==o?o:"#172554",y=null!==(r=p.accent_color)&&void 0!==r?r:"#7A81EB",b=""!==(null===(i=v.event)||void 0===i?void 0:i.header)&&null!==(null===(n=v.event)||void 0===n?void 0:n.header)&&void 0!==(null===(s=v.event)||void 0===s?void 0:s.header),w=f().sanitize('<span class="font-semibold">'.concat(null===(m=v.event)||void 0===m?void 0:m.header," | </span>"));return d.createElement("div",{style:{backgroundColor:g,borderColor:h},className:"relative flex flex-col h-fit min-h-[60px] min-w-[300px] max-w-[700px] items-center justify-center rounded-lg border shadow-lg group"},d.createElement("div",{style:{backgroundColor:g,borderColor:h},onClick:function(){return x(!0)},className:"absolute -top-3 -right-3 rounded-full flex items-center justify-center border shadow-lg p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer hover:bg-opacity-75"},d.createElement(a.A,{color:(0,u.j5)(E,.65),width:14,height:14})),d.createElement("div",{className:"flex w-full items-center justify-center"},d.createElement("div",{className:"flex flex-col items-center justify-center w-full px-5 py-2 gap-1"},d.createElement("div",{className:"inline-flex items-center gap-1"},d.createElement("p",{style:{color:E},className:"text-[13px] leading-4 text-center",dangerouslySetInnerHTML:{__html:b?w+v.message:v.message}})),d.createElement("div",{className:"flex flex-row gap-1 text-[11px] leading-5",style:{color:(0,u.j5)(E,.65)}},v.time,d.createElement("p",null,"|"),d.createElement("div",{className:"flex items-center gap-[3px]",style:{color:(0,u.j5)(E,.65)}},"Verified by Taplo",d.createElement(c.A,{width:18,height:18,fill:y,color:g}))))))}}}]);