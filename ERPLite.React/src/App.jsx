import { useState, useEffect } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = "http://localhost:5057/api/orders";

  // Fetch orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: parseInt(quantity), status }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const newOrder = await res.json();
      setOrders([...orders, newOrder]);
      setQuantity("");
      setStatus("Pending");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>🧾 ERPLite Orders</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            style={{ margin: "0 1rem", width: "100px" }}
          />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Complete</option>
          </select>
        </label>

        <button type="submit" disabled={loading} style={{ marginLeft: "1rem" }}>
          {loading ? "Adding..." : "Add Order"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="6" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.quantity}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
