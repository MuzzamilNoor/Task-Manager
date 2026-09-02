import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

const COLORS = {
  bg: "#151328",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.10)",
  textPrimary: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.4)",
  teal: "#8FD1C9",
  amber: "#F5A15A",
};

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    const body =
      mode === "login" ? { email, password } : { name, email, password };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      onAuthSuccess(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: COLORS.teal,
            textTransform: "uppercase",
            margin: "0 0 8px 0",
            textAlign: "center",
          }}
        >
          Task Manager
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: "0 0 28px 0",
            textAlign: "center",
          }}
        >
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 24,
          }}
        >
          {mode === "register" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {error && (
            <p style={{ color: COLORS.amber, fontSize: 13, margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderRadius: 12,
              border: "none",
              backgroundColor: COLORS.teal,
              color: COLORS.bg,
              padding: "12px 18px",
              fontSize: 14,
              fontWeight: 700,
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.7 : 1,
              marginTop: 4,
            }}
          >
            {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
            {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            color: COLORS.textMuted,
          }}
        >
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            style={{ color: COLORS.teal, cursor: "pointer", fontWeight: 600 }}
          >
            {mode === "login" ? "Register" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  borderRadius: 10,
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.bg,
  color: COLORS.textPrimary,
  padding: "11px 14px",
  fontSize: 14,
  outline: "none",
};