import { useEffect, useState } from "react";
import "../style.css";

export default function NewReservation() {
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  const hotelImages = {
    Hilton: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Hilton_Hotel.jpg",
    Marriott: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Marriott_Hotel.jpg",
    Sheraton: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Sheraton_Hotel.jpg",
  };

  useEffect(() => {
    fetch("/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkIn = new Date(e.target.checkIn.value);
    const checkOut = new Date(e.target.checkOut.value);

    if (checkOut <= checkIn) {
      setMessage("Check-Out date must be after Check-In.");
      return;
    }

    setLoading(true);
    setMessage("");

    const reservation = {
      hotelId: e.target.hotel.value,
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      checkIn: e.target.checkIn.value,
      checkOut: e.target.checkOut.value,
    };

    const res = await fetch("/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });

    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
  };

  return (
    <div className="ribbon">
      <div className="form-container">
        <h2>New Reservation</h2>

        <form onSubmit={handleSubmit}>
          <label>Hotel</label>
          <select
            name="hotel"
            onChange={(e) => setSelectedHotel(e.target.value)}
          >
            {hotels.map((h) => (
              <option key={h.id} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>

          {selectedHotel && hotelImages[selectedHotel] && (
            <img
              src={hotelImages[selectedHotel]}
              alt="Hotel preview"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "8px",
              }}
            />
          )}

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

        {loading && <div className="spinner"></div>}

        <p>{message}</p>
      </div>
    </div>
  );
}
