import { Link } from "react-router-dom";

function AdminHome() {
  return (
  <div>
    <Link to="/admin/lisa">
      <button className="btn btn-secondary">LISA TOODE</button>
    </Link>
    <Link to="/admin/tooted">
      <button className="btn btn-secondary">HALDA TOOTEID</button>
    </Link>
    <Link to="/admin/kategooriad">
      <button className="btn btn-secondary">HALDA KATEGOORIAID</button>
    </Link>
    <Link to="/admin/lisa-kasutaja">
      <button className="btn btn-secondary">LISA KASUTAJA</button>
    </Link>
  </div>)
}

export default AdminHome;