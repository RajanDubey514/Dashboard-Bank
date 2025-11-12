import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { Download, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadDataButton = ({ data = [], fileName = "data" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 📘 Excel Download
  const handleDownloadExcel = () => {
    if (!data || data.length === 0)
      return alert("No data available to download");
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const timestamp = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `${fileName}_${timestamp}.xlsx`);
    setIsOpen(false);
  };

  // 📝 Word Download
  const handleDownloadWord = async () => {
    if (!data || data.length === 0)
      return alert("No data available to download");

    const headers = Object.keys(data[0]);
    const headerRow = new TableRow({
      children: headers.map(
        (header) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: header, bold: true })],
              }),
            ],
          })
      ),
    });

    const dataRows = data.map(
      (item) =>
        new TableRow({
          children: headers.map(
            (key) =>
              new TableCell({
                children: [new Paragraph(String(item[key] ?? ""))],
              })
          ),
        })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${fileName} Data`, bold: true, size: 28 }),
              ],
              spacing: { after: 300 },
            }),
            new Table({
              rows: [headerRow, ...dataRows],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const timestamp = new Date().toISOString().split("T")[0];
    saveAs(blob, `${fileName}_${timestamp}.docx`);
    setIsOpen(false);
  };

  // 📄 PDF Download (optimized look)
  const handleDownloadPDF = () => {
    if (!data || data.length === 0)
      return alert("No data available to download");

    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });

    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`${fileName} Data`, 40, 40);

    const headers = [Object.keys(data[0])];
    const body = data.map((item) => Object.values(item));

    autoTable(doc, {
      head: headers,
      body: body,
      startY: 60,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [30, 64, 175], // Deep blue
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      tableWidth: "auto",
      margin: { top: 60, left: 40, right: 40 },
    });

    doc.save(`${fileName}.pdf`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow transition-all duration-300 hover:shadow-lg"
        style={{ backgroundColor: "var(--color-primary)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary)")
        }
      >
        <Download size={14} />
        Download
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 overflow-hidden border border-gray-200"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
        >
          <button
            onClick={handleDownloadExcel}
            className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-opacity-90 hover:bg-[var(--color-primary-hover)] transition"
          >
            📘 Download Excel (.xlsx)
          </button>
          <button
            onClick={handleDownloadWord}
            className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-opacity-90 hover:bg-[var(--color-primary-hover)] transition"
          >
            📝 Download Word (.docx)
          </button>
          <button
            onClick={handleDownloadPDF}
            className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-opacity-90 hover:bg-[var(--color-primary-hover)] transition"
          >
            📄 Download PDF (.pdf)
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadDataButton;
