import AccountNav from "../AccountNav";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./BookingPage.css";

export default function BookingsPage() {
  const { getTickets, tickets, user } = useContext(UserContext);

  useEffect(() => {
    getTickets();
  }, []);

  const downloadTicket = (ticket, format) => {
    const ticketContainer = document.getElementById(`ticket-${ticket.id}`);
    if (format === "pdf") {
      html2canvas(ticketContainer).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 page width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`ticket_${ticket.id}.pdf`);
      });
    } else {
      html2canvas(ticketContainer).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = `ticket_${ticket.id}.png`;
        link.click();
      });
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="ticket-wrapper">
        {tickets?.length > 0 &&
          tickets.map((ticket, index) => (
            <div key={index} className="ticket-container" id={`ticket-${ticket.id}`}>
              <div className="ticket-header" style={{ display: "flex", alignItems: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-6 h-6">
                  <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-xl text-blue-700">HappyTrip</span>
              </div>
              <div className="ticket-header" style={{ display: "flex", alignItems: "center" }}>
                <div className="ticket-details">
                  <h2 className="ticket-title">{ticket.text}</h2>
                  <span className="ticket-price">Ціна: ${ticket.price} Ⓝ</span>
                  <br />
                  <span className="ticket-owner">Власник: {user.firstname} {user.lastname}</span>
                  <br />
                  <span className="ticket-owner"> {ticket.sender} </span>
                </div>
                <div className="qr-code-container">
                  <QRCode value={`Власник: ${user.firstname} ${user.lastname} ${ticket.sender}, Ціна: ${ticket.price} Ⓝ`} />
                </div>
              </div>
            </div>
          ))}
        {tickets?.length > 0 && (
          <div className="download-buttons">
            <button className="download-button" onClick={() => downloadTicket(tickets[0], "png")}>
              Download PNG
            </button>
            <button className="download-button" onClick={() => downloadTicket(tickets[0], "pdf")}>
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
