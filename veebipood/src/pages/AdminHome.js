import { Link } from "react-router-dom";

function AdminHome() {
  return (
  <div>
    <Link to="/admin/lisa-toode">
      <button>Lisa toode</button>
    </Link>
    <Link to="/admin/halda-tooteid">
      <button>Muuda/kustuta tooteid</button>
    </Link>
  </div>)
}

export default AdminHome;