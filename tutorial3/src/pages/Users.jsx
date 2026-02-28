import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}/users`);
        if (!res.ok) throw new Error("Failed to load users.");

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.users || data.data || []);
        setUsers(list);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [users, search]);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Users</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        style={{ width: "100%", padding: 10, marginBottom: 16 }}
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {filteredUsers.map((u) => {
          const userId = u._id; 
          const email = u.email || "(No email)";
          const initial = (email[0] || "?").toUpperCase();

          return (
            <div
              key={userId}
              onClick={() => navigate(`/users/${userId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "1px solid #444",
                borderRadius: 12,
                padding: 12,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {initial}
              </div>

              <div>
                <div style={{ fontWeight: 700 }}>{email}</div>
                {u.name && <div style={{ opacity: 0.8 }}>{u.name}</div>}
              </div>
            </div>
          );
        })}

        {!loading && !error && filteredUsers.length === 0 && <p>No users found.</p>}
      </div>
    </div>
  );
}