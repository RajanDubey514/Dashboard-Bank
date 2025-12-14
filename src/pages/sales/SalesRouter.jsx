import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaxSalesInvoice from "./taxSalesInvoice/show/TaxSalesInvoice";


export default function SalesRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    switch (page) {
      case "tax_Sales_invoice":
        setCurrentComponent(<TaxSalesInvoice />);
        break;
      // case "account":
      //   setCurrentComponent(<CustomerUrl />);
      //   break;
      // case "usermanagement":
      //   setCurrentComponent(<ShowuserManagment />);
      //   break;
      // case "bom":
      //   setCurrentComponent(<ShowBillOfMaterial />);
      //   break;
      // case "supplier":
      //   setCurrentComponent(<Supplier />);
      //   break;
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
