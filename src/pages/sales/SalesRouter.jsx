import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaxSalesInvoice from "./taxSalesInvoice/show/TaxSalesInvoice";
import DeliveryChallan from "./deliveryChallan/show/DeliveryChallan";
import SalesOrder from "./salesOrder/show/SalesOrder";
import SalesReturn from "./salesReturn/show/SalesReturn";


export default function SalesRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    switch (page) {
      case "tax_sales_invoice":
        setCurrentComponent(<TaxSalesInvoice />);
        break;
      case "sales_order":
        setCurrentComponent(<SalesOrder />);
        break;
      case "delivery_challan":
        setCurrentComponent(<DeliveryChallan />);
        break;
      case "sales_return":
        setCurrentComponent(<SalesReturn />);
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
