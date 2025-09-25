import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Products() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "0", stock: "0" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    const { data } = await axios.get(`${API}/api/products`);
    setItems(data.items || []);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      await axios.post(`${API}/api/products`, {
        name: form.name, price: +form.price || 0, stock: +form.stock || 0
      });
      setForm({ name: "", price: "0", stock: "0" });
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Error al guardar");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Productos</h2>
      <form onSubmit={onSubmit} style={{ display:"grid", gap:8, maxWidth:420 }}>
        <input required placeholder="Nombre"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input type="number" step="0.01" placeholder="Precio"
               value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
        <input type="number" placeholder="Stock"
               value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})}/>
        <button disabled={loading}>{loading ? "Guardando..." : "Agregar"}</button>
        {err && <div style={{ color:"crimson" }}>{err}</div>}
      </form>

      <table style={{ marginTop:12, width:"100%", maxWidth:560 }}>
        <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr></thead>
        <tbody>
          {items.length ? items.map(p => (
            <tr key={p.id}><td>{p.name}</td><td>{p.price}</td><td>{p.stock}</td></tr>
          )) : <tr><td colSpan="3">Sin productos</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
