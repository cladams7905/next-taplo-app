// Embeddable Widget Component

interface WidgetConfig {
  apiUrl: string;
}

const WidgetComponent = ({ apiUrl }: WidgetConfig) => {
  // Your notification logic here
  return <div>Your notifications here</div>;
};

export default WidgetComponent;
