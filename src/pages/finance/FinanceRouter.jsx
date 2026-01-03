import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PaymentVoucher from "./paymentvoucher/show/PaymentVoucher";
import RecieptVoucher from "./recieptvoucher/show/RecieptVoucher";
import BankEntry from "./bankentry/show/BankEntry";
import CreditNote from "./creditNote/show/CreditNote";
import DebitNote from "./debitNote/show/DebitNote";
import PattyCash from "./pettycash/show/PattyCash";

export default function FinanceRouter() {
  const [params] = useSearchParams();
  const page = params.get("page");
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    switch (page) {
      case "payment_voucher":
        setCurrentComponent(<PaymentVoucher />);
        break;
      case "reciept_voucher":
        setCurrentComponent(<RecieptVoucher />);
        break;
      case "bank_entry":
        setCurrentComponent(<BankEntry />);
        break;
      case "credit_note":
        setCurrentComponent(<CreditNote />);
        break;
      case "debit_note": 
        setCurrentComponent(<DebitNote />);
        break;
      case "petty_cash": 
        setCurrentComponent(<PattyCash />);
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

