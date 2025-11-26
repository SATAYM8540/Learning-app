import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const ensureAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@onlinelearn.com";
  const name = process.env.ADMIN_NAME || "Super Admin";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  let user = await User.findOne({ email });

  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
      refreshTokens: []
    });
    console.log("Admin user created:", email);
  } else if (user.role !== "admin") {
    user.role = "admin";
    await user.save();
    console.log("Existing user promoted to admin:", email);
  } else {
    console.log("Admin user already exists:", email);
  }
};
