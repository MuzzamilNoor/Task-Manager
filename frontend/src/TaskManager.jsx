import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { Check, Plus, Trash2, Flame, Minus, ArrowDown } from "lucide-react";
 import { useAuth } from "./AuthContext";

const COLORS = {
  bg: "#151328",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.10)",
  borderSoft: "rgba(255,255,255,0.05)",
  textPrimary: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.35)",
  textFaint: "rgba(255,255,255,0.25)",
  teal: "#8FD1C9",
  tealDark: "#151328",
  amber: "#F5A15A",
  amberBg: "rgba(245,161,90,0.12)",
  lavender: "#9C97C4",
  lavenderBg: "rgba(156,151,196,0.12)",
  tealBg: "rgba(143,209,201,0.12)",
};

/* ============================================================
   CONCEPT 1: COMPONENT
   ============================================================ */

export function PriorityBadge({ priority }) {
  const config = {
    high: { label: "High", color: COLORS.amber, bg: COLORS.amberBg, Icon: Flame },
    medium: { label: "Medium", color: COLORS.teal, bg: COLORS.tealBg, Icon: Minus },
    low: { label: "Low", color: COLORS.lavender, bg: COLORS.lavenderBg, Icon: ArrowDown },
  };
  const { label, color, bg, Icon } = config[priority];

  return (
    <span
      style={{
        color,
        backgroundColor: bg,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={11} strokeWidth={2.5} />
      {label}
    </span>
  );
}

/* ============================================================
   CONCEPT 2: PROPS
   ============================================================ */

function TaskCard({ task, onToggle, onDelete }) {
  const { _id, title, priority, completed } = task;
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        borderRadius: 16,
        border: `1px solid ${completed ? COLORS.borderSoft : hover ? "rgba(255,255,255,0.2)" : COLORS.border}`,
        backgroundColor: completed ? "rgba(255,255,255,0.02)" : hover ? COLORS.surfaceHover : COLORS.surface,
        padding: "16px 18px",
        transition: "all 0.2s ease",
      }}
    >
      <button
        onClick={() => onToggle(_id)}
        aria-label="Toggle complete"
        style={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${completed ? COLORS.teal : "rgba(255,255,255,0.25)"}`,
          backgroundColor: completed ? COLORS.teal : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        {completed && <Check size={14} strokeWidth={3} color={COLORS.bg} />}
      </button>

      <p
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          margin: 0,
          fontWeight: 500,
          fontSize: 15,
          color: completed ? COLORS.textFaint : COLORS.textPrimary,
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </p>

      {!completed && <PriorityBadge priority={priority} />}

      <button
        onClick={() => onDelete(_id)}
        aria-label="Delete task"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: hover ? COLORS.amber : "transparent",
          transition: "color 0.15s ease",
          padding: 2,
          display: "flex",
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

/* ============================================================
   CONCEPT 3: Hooks
   ============================================================ */
   
  
export default function App() {
const { token, logout } = useAuth();
const { data: fetchedTasks, loading, error, refetch } = useFetch("/tasks", token);
const [tasks, setTasks] = useState([]);

useEffect(() => {
  
  if (fetchedTasks) setTasks(fetchedTasks);
}, [fetchedTasks]);

  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [newTitle, setNewTitle] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [newPriority, setNewPriority] = useState("medium");
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  function toggleTask(id) {
  const task = tasks.find((t) => t._id === id);
  fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
    body: JSON.stringify({ completed: !task.completed }),
  })
    .then((res) => res.json())
    .then((updated) => {
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    });
}

function deleteTask(id) {
  fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { 
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    });
}

 function addTask(e) {
  e.preventDefault();
  const trimmed = newTitle.trim();
   if (!trimmed) return;

  fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title: trimmed, priority: newPriority }),
  })
    .then((res) => res.json())
    .then((newTask) => {
      setTasks((prev) => [newTask, ...prev]);
      setNewTitle("");
      setNewPriority("medium");
    });
}

if (loading) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.bg, color: COLORS.textPrimary }}>
      Loading tasks...
    </div>
  );
}

if (error) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.bg, color: COLORS.amber }}>
      <p>Error: {error}</p>
      <button onClick={refetch} style={{ padding: "8px 16px", borderRadius: 8, border: "none", backgroundColor: COLORS.teal, cursor: "pointer" }}>
        Retry
      </button>
    </div>
  );
}
  const circumference = 2 * Math.PI * 27;

  return (
    
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: COLORS.bg,
        display: "flex",
        justifyContent: "center",
        padding: "56px 16px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxSizing: "border-box",
      }}
      
    >
      
      <div style={{ width: "100%", maxWidth: 560 }}>
        {}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <button
  onClick={logout}
  style={{
    background: "none",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    color: COLORS.textMuted,
    padding: "6px 12px",
    fontSize: 12,
    cursor: "pointer",
  }}
>
  Logout
</button>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: COLORS.teal,
                textTransform: "uppercase",
                margin: "0 0 8px 0",
              }}
            >
              Task Manager
            </p>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.textPrimary,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {doneCount} of {total} done
            </h1>
           
          </div>
          <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
            <svg viewBox="0 0 64 64" width={64} height={64} style={{ transform: "rotate(-90deg)" }}>
              <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke={COLORS.teal}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
            </svg>
            
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.textPrimary,
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {}
        <form onSubmit={addTask} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Add new task..."
            style={{
              flex: 1,
              minWidth: 0,
              borderRadius: 12,
              border: `1px solid ${inputFocused ? "rgba(143,209,201,0.5)" : COLORS.border}`,
              backgroundColor: inputFocused ? COLORS.surfaceHover : COLORS.surface,
              padding: "12px 16px",
              fontSize: 14,
              color: COLORS.textPrimary,
              outline: "none",
              transition: "all 0.15s ease",
            }}
          />
<select
  value={newPriority}
  onChange={(e) => setNewPriority(e.target.value)}
  style={{
    flexShrink: 0,
    minWidth: 110,
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    padding: "12px 14px",
    fontSize: 14,
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
  }}
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderRadius: 12,
              border: "none",
              backgroundColor: COLORS.teal,
              color: COLORS.bg,
              padding: "12px 18px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add
          </button>
        </form>

        {}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                borderRadius: 999,
                border: "none",
                padding: "7px 14px",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "capitalize",
                cursor: "pointer",
                backgroundColor: filter === f ? "rgba(255,255,255,0.92)" : "transparent",
                color: filter === f ? COLORS.bg : COLORS.textMuted,
                transition: "all 0.15s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {visibleTasks.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0", fontSize: 14, color: COLORS.textFaint }}>
              There is no task to show. {filter === "active" ? "Add a new task or switch to 'All' or 'Completed'." : filter === "completed" ? "Complete a task or switch to 'All' or 'Active'." : "Add a new task using the form above."}
            </p>
          ) : (
            visibleTasks.map((task) => (
              <TaskCard key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}