import { useState, useEffect } from "react";
import { Loader2, AlertCircle, Inbox, RefreshCw } from "lucide-react";

const COLORS = {
  bg: "#151328",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.10)",
  textPrimary: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.4)",
  teal: "#8FD1C9",
  amber: "#F5A15A",
};

/* ============================================================
   CONCEPT 1 — CUSTOM HOOK: useFetch
   ============================================================ */

function useFetch(simulatedData, { delay = 1500, shouldFail = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      if (shouldFail) {
        setError("Could not reach the server. Check your connection.");
        setLoading(false);
      } else {
        setData(simulatedData);
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [reloadKey]);

  const retry = () => setReloadKey((k) => k + 1);

  return { data, loading, error, retry };
}

/* ============================================================
   CONCEPT 3 — CONDITIONAL RENDERING
   ============================================================ */

const fakeTasks = [
  { id: 1, title: "Design database schema for auth system" },
  { id: 2, title: "Setup MongoDB Atlas cluster" },
  { id: 3, title: "Write API documentation" },
];

function TaskList({ shouldFail }) {
  const { data, loading, error, retry } = useFetch(fakeTasks, {
    delay: 1500,
    shouldFail,
  });

  if (loading) {
    return (
      <div style={styles.stateBox}>
        <Loader2
          size={22}
          color={COLORS.teal}
          style={{ animation: "spin 0.9s linear infinite" }}
        />
        <p style={styles.stateText}>Loading tasks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.stateBox}>
        <AlertCircle size={22} color={COLORS.amber} />
        <p style={styles.stateText}>{error}</p>
        <button style={styles.retryBtn} onClick={retry}>
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={styles.stateBox}>
        <Inbox size={22} color={COLORS.textMuted} />
        <p style={styles.stateText}>No tasks yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((task) => (
        <div key={task.id} style={styles.taskRow}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Demo shell
   ============================================================ */

export default function HooksDemo() {
  const [mode, setMode] = useState("success"); // 'success' | 'error'
  const [mountKey, setMountKey] = useState(0);

  const remount = () => setMountKey((k) => k + 1);

  return (
    <div style={styles.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <p style={styles.eyebrow}>useEffect · custom hook · conditional rendering</p>
        <h1 style={styles.h1}>Hooks Demo</h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["success", "error"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                remount();
              }}
              style={{
                ...styles.modeBtn,
                backgroundColor: mode === m ? COLORS.teal : "transparent",
                color: mode === m ? COLORS.bg : COLORS.textMuted,
              }}
            >
              Simulate {m}
            </button>
          ))}
        </div>

        {/* mountKey forces a fresh mount so useEffect runs again from scratch */}
        <TaskList key={mountKey} shouldFail={mode === "error"} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: COLORS.bg,
    display: "flex",
    justifyContent: "center",
    padding: "56px 16px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: COLORS.teal,
    textTransform: "uppercase",
    margin: "0 0 8px 0",
  },
  h1: {
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.textPrimary,
    margin: "0 0 20px 0",
  },
  modeBtn: {
    borderRadius: 999,
    border: "none",
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: "40px 0",
    borderRadius: 16,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.surface,
  },
  stateText: {
    fontSize: 13,
    color: COLORS.textMuted,
    margin: 0,
    textAlign: "center",
    maxWidth: 240,
  },
  retryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    borderRadius: 10,
    border: "none",
    backgroundColor: COLORS.teal,
    color: COLORS.bg,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  taskRow: {
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.surface,
    padding: "14px 16px",
    fontSize: 14,
    color: COLORS.textPrimary,
  },
};