import { PanelProvider } from "@/context/PanelContext";
import { InverterProvider } from "@/context/InverterContext";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
      <PanelProvider>
        <InverterProvider>
        {children}
        </InverterProvider>
      </PanelProvider>
  );
}
