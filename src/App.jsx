import { useState } from "react";
import NewReservation from "./screens/NewReservation";
import ReservationLookup from "./screens/ReservationLookup";

function App() {
  const [screen, setScreen] = useState("new");

  return (
    <>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setScreen("new")}>New Reservation</button>
        <button onClick={() => setScreen("lookup")}>Lookup Reservation</button>
      </nav>

      {screen === "new" && <NewReservation />}
      {screen === "lookup" && <ReservationLookup />}
    </>
  );
}

export default App;
