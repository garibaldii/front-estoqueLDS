import { PanelProvider } from "@/context/PanelContext";
import { InverterProvider } from "@/context/InverterContext";
import { OrderProvider } from "@/context/OrderContext";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <InverterProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </InverterProvider>
    </PanelProvider>
  );
}
