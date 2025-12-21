import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PurchaseOrder from "./purchaseOrder/show/PurchaseOrder";
import PurchaseGrn from "./purchaseGrn/show/PurchaseGrn";
import PurchaseInvoice from "./purchaseInvoice/show/PurchaseInvoice";
import PurchaseReturn from "./purchaseReturn/show/PurchaseReturn";

export default function PurchaseRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    switch (page) {
      case "purchase_order":
        setCurrentComponent(<PurchaseOrder />);
        break;
      case "purchase_DC_GRN":
        setCurrentComponent(<PurchaseGrn />);
        break;
      case "purchase_invoice":
        setCurrentComponent(<PurchaseInvoice />);
        break;
      case "purchase_return":
        setCurrentComponent(<PurchaseReturn />);
        break;
      default:
        setCurrentComponent(
          <div className="p-4 text-center text-lg font-medium">
            Invalid Sales Page
          </div>
        );
    }
  }, [page]);

  return currentComponent;
}
