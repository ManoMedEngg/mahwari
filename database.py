import sqlite3
from datetime import date, datetime
from typing import List, Optional, Dict, Any

DB_NAME = "mahwari.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()
    
    # Cycles Table
    c.execute('''CREATE TABLE IF NOT EXISTS cycles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_date TEXT NOT NULL,
        end_date TEXT,
        notes TEXT
    )''')
    
    # Daily Logs (Water, Exercise)
    c.execute('''CREATE TABLE IF NOT EXISTS daily_logs (
        date TEXT PRIMARY KEY,
        water_intake INTEGER DEFAULT 0,
        exercise_type TEXT,
        symptoms TEXT
    )''')
    
    # User Settings (PIN, etc)
    c.execute('''CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )''')
    
    conn.commit()
    conn.close()

# --- Cycle Operations ---
def add_cycle(start_date: date, notes: str = ""):
    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT INTO cycles (start_date, notes) VALUES (?, ?)", 
              (start_date.isoformat(), notes))
    conn.commit()
    conn.close()

def get_all_cycles() -> List[Dict]:
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM cycles ORDER BY start_date ASC")
    rows = c.fetchall()
    conn.close()
    
    cycles = []
    for row in rows:
        cycles.append({
            "id": row["id"],
            "start_date": date.fromisoformat(row["start_date"]),
            "end_date": date.fromisoformat(row["end_date"]) if row["end_date"] else None,
            "notes": row["notes"]
        })
    return cycles

# --- Daily Log Operations ---
def update_daily_log(log_date: date, water: int = None, exercise: str = None, symptoms: str = None):
    conn = get_connection()
    c = conn.cursor()
    
    # Check if exists
    c.execute("SELECT * FROM daily_logs WHERE date = ?", (log_date.isoformat(),))
    existing = c.fetchone()
    
    if existing:
        if water is not None:
            c.execute("UPDATE daily_logs SET water_intake = ? WHERE date = ?", (water, log_date.isoformat()))
        if exercise is not None:
             c.execute("UPDATE daily_logs SET exercise_type = ? WHERE date = ?", (exercise, log_date.isoformat()))
        if symptoms is not None:
             c.execute("UPDATE daily_logs SET symptoms = ? WHERE date = ?", (symptoms, log_date.isoformat()))
    else:
        c.execute("INSERT INTO daily_logs (date, water_intake, exercise_type, symptoms) VALUES (?, ?, ?, ?)",
                  (log_date.isoformat(), water or 0, exercise, symptoms))
    
    conn.commit()
    conn.close()

def get_daily_log(log_date: date) -> Dict:
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM daily_logs WHERE date = ?", (log_date.isoformat(),))
    row = c.fetchone()
    conn.close()
    
    if row:
        return dict(row)
    return {"water_intake": 0, "exercise_type": None, "symptoms": None}

# --- Settings Operations ---
def set_setting(key: str, value: str):
    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (key, value))
    conn.commit()
    conn.close()

def get_setting(key: str) -> Optional[str]:
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT value FROM settings WHERE key = ?", (key,))
    row = c.fetchone()
    conn.close()
    return row["value"] if row else None
