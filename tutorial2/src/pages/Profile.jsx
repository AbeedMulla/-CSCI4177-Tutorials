export default function Profile() {
  const data = JSON.parse(localStorage.getItem("tutorial2_profile") || "{}");

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Profile</h2>
      <p><b>First Name:</b> {data.firstName || ""}</p>
      <p><b>Last Name:</b> {data.lastName || ""}</p>
      <p><b>Email:</b> {data.email || ""}</p>
    </div>
  );
}