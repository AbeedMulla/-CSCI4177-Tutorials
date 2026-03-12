const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

let users = [
  {
    id: "1",
    email: "abc@abc.ca",
    firstName: "ABC"
  },
  {
    id: "2",
    email: "xyz@xyz.ca",
    firstName: "XYZ"
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "Tutorial 4 API is running",
    success: true
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users: users
  });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    });
  }

  res.status(200).json({
    message: "User retrieved",
    success: true,
    user: user
  });
});

app.post("/add", (req, res) => {
  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({
      message: "Email and firstName are required",
      success: false
    });
  }

  const newUser = {
    id: Date.now().toString(),
    email: email,
    firstName: firstName
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added",
    success: true
  });
});

app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const { email, firstName } = req.body;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    });
  }

  if (!email && !firstName) {
    return res.status(400).json({
      message: "At least one field is required",
      success: false
    });
  }

  if (email) {
    user.email = email;
  }

  if (firstName) {
    user.firstName = firstName;
  }

  res.status(200).json({
    message: "User updated",
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});