import { Outlet } from "react-router";
import { CartProvider } from "./context/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { PaymentModal } from "./components/PaymentModal";
import "../styles/fonts.css";

export function Root() {
  return (
    <CartProvider>
      <div
        className="min-h-screen"
        style={{
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#FAFAF7",
          scrollBehavior: "smooth",
        }}
      >
        <Outlet />
        <CartDrawer />
        <PaymentModal />
      </div>
    </CartProvider>
  );
}
