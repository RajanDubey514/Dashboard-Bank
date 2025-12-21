import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomerUrl from "./salesPage/CustomerUrl";
import ProductUrl from "./productPage/ProductUrl";
import ShowBillOfMaterial from "./boi/show/ShowBillOfMaterial";
import ShowuserManagment from "./userManagement/show/ShowuserManagment";
import Supplier from "./supplier/Supplier"

export default function AdminRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    switch (page) {
      case "product":
        setCurrentComponent(<ProductUrl />);
        break;
      case "account":
        setCurrentComponent(<CustomerUrl />);
        break;
      case "usermanagement":
        setCurrentComponent(<ShowuserManagment />);
        break;
      // case "bom":
      //   setCurrentComponent(<ShowBillOfMaterial />);
      //   break;
      case "supplier":
        setCurrentComponent(<Supplier />);
        break;
      default:
        setCurrentComponent(
          <div className="p-4 text-center text-lg font-medium">
            Invalid Admin Page
          </div>
        );
    }
  }, [page]);

  return currentComponent;
}
