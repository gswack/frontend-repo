import { useState } from "react";

export default function ReservationLookup() {
  const [query, setQuery] = useState("");
  const [reservation, setReservation] = useState(null);
  const [message, setMessage] = useState("");

  const lookup = async () => {
    try {
      const res = await fetch(
        `/reservations/lookup?query=${encodeURIComponent(query.trim())}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!data.found) {
        setReservation(null);
        setMessage("No reservation found.");
        return;
      }

      setReservation(data.reservation);
      setMessage("");

    } catch (err) {
      console.error("Lookup failed:", err);
      setMessage("Unable to lookup reservation.");
    }
  };

  const cancelReservation = async () => {
    await fetch(`/reservations/${reservation._id}`, {
      method: "DELETE"
    });

    setReservation(null);
    setMessage("Reservation canceled.");
  };

  return (
    <div className="ribbon">
      <div className="form-container">
        <h2>Check Reservation</h2>

        <label>Full Name or Email</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={lookup}>Search</button>

        {message && <p>{message}</p>}

        {reservation && (
          <div className="reservation-details">
            <h3>Reservation Found</h3>
            <p><strong>Name:</strong> {reservation.fullName}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Hotel ID:</strong> {reservation.hotelId}</p>
            <p><strong>Check-In:</strong> {reservation.checkIn}</p>
            <p><strong>Check-Out:</strong> {reservation.checkOut}</p>

            <button onClick={cancelReservation} style={{ background: "red" }}>
              Cancel Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
