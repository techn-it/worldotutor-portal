import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    return res.json({ success: true, user: { id: decoded.id, role: decoded.role, name: decoded.name, email: decoded.email } });
  } catch (err) {
    return res.json({ success: false });
  }
}