import { useEffect, useState } from "react";
import '../style.css'


export default function NewReservation() {
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/hotels")
      .then(res => res.json())
      .then(data => setHotels(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservation = {
      hotelId: e.target.hotel.value,
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      checkIn: e.target.checkIn.value,
      checkOut: e.target.checkOut.value
    };

    const res = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation)
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="ribbon">
      <div className="form-container">
        <h2>New Reservation</h2>

        <form onSubmit={handleSubmit}>
          <label>Hotel</label>
          <select name="hotel">
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          <label>Full Name</label>
          <input name="fullName" required />

          <label>Email</label>
          <input name="email" type="email" required />

          <label>Check-In Date</label>
          <input name="checkIn" type="date" required />

          <label>Check-Out Date</label>
          <input name="checkOut" type="date" required />

          <button type="submit">Reserve</button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
}
