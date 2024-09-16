import dynamic from "next/dynamic";

const WidgetDynamicWrapper = dynamic(() => import("./WidgetComponent"), {
  ssr: false,
});

export default WidgetDynamicWrapper;
