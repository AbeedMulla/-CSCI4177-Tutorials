import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../api";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}/users/${id}`);
        if (!res.ok) throw new Error("Failed to load user details.");

        const data = await res.json();
        const u = data.user || data.data || data;
        setUser(u);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  const userId = user?._id ?? user?.id ?? "";
  const email = user?.email ?? user?.username ?? "";
  const picture = user?.picture ?? user?.avatar ?? user?.profilePicture ?? user?.image ?? "";

 
  const fullName =
    user?.name ??
    `${user?.firstName ?? user?.first_name ?? ""} ${user?.lastName ?? user?.last_name ?? ""}`.trim();

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <button onClick={() => navigate("/users")} style={{ padding: 10, cursor: "pointer" }}>
        ← Back to Users
      </button>

      <h1 style={{ marginTop: 16 }}>User Detail</h1>

      {loading && <p>Loading user...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {user && (
        <div style={{ marginTop: 16, border: "1px solid #444", borderRadius: 12, padding: 16 }}>
          {picture && (
            <img
              src={picture}
              alt={fullName || "User"}
              style={{ width: 90, height: 90, borderRadius: "50%", marginBottom: 12 }}
            />
          )}

          <p><b>ID:</b> {userId || "N/A"}</p>
          <p><b>Name:</b> {fullName || "N/A"}</p>
          <p><b>Email:</b> {email || "N/A"}</p>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>Raw API Response</h3>
          <pre style={{ padding: 12, borderRadius: 8, overflow: "auto" }}>
{JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}