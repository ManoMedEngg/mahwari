import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import date, datetime, timedelta
import hashlib

# Local Modules
import database
import logic
import translations

# --- Configuration ---
st.set_page_config(
    page_title="Mahwari",
    page_icon="assets/fevicon.ico",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# --- Custom CSS (Deep Red Dark Theme) ---
st.markdown("""
<style>
    /* Global Theme Overrides */
    [data-testid="stAppViewContainer"] {
        background-color: #1a0505; /* Deep Dark Red/Black */
        color: #f0e6e6;
    }
    [data-testid="stSidebar"] {
        background-color: #2b0a0a;
    }
    .stButton>button {
        background-color: #8a1c1c;
        color: white;
        border-radius: 20px;
        border: none;
        padding: 10px 24px;
        font-weight: 600;
        transition: all 0.3s;
    }
    .stButton>button:hover {
        background-color: #b32424;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
    }
    h1, h2, h3 {
        color: #ffcccc !important;
        font-family: 'Helvetica Neue', sans-serif;
    }
    .stMetricValue {
        color: #ff4d4d !important;
    }
    
    /* Phase Card Styling */
    .phase-card {
        padding: 20px;
        border-radius: 15px;
        background: linear-gradient(145deg, #2b0a0a, #1a0505);
        box-shadow: 5px 5px 15px #0d0202, -5px -5px 15px #3d0e0e;
        margin-bottom: 20px;
        text-align: center;
        border: 1px solid #4a1212;
    }
    .big-day {
        font-size: 3em;
        font-weight: bold;
        color: #ff3333;
    }
    .sub-text {
        color: #cc9999;
        font-size: 1.1em;
    }
</style>
""", unsafe_allow_html=True)

# --- Session State Init ---
if 'lang' not in st.session_state:
    st.session_state.lang = 'en'
if 'authenticated' not in st.session_state:
    # Check if PIN exists
    database.init_db()
    pin = database.get_setting("user_pin")
    if not pin:
        st.session_state.authenticated = True # First run, no PIN
        st.session_state.first_run = True
    else:
        st.session_state.authenticated = False
        st.session_state.first_run = False

# --- Helper Functions ---
def t(key):
    return translations.get_text(st.session_state.lang, key)

def check_pin(input_pin):
    stored_hash = database.get_setting("user_pin")
    input_hash = hashlib.sha256(input_pin.encode()).hexdigest()
    if input_hash == stored_hash:
        st.session_state.authenticated = True
        st.rerun()
    else:
        st.error("Incorrect PIN")

def set_pin(new_pin):
    if len(new_pin) == 4 and new_pin.isdigit():
        hashed = hashlib.sha256(new_pin.encode()).hexdigest()
        database.set_setting("user_pin", hashed)
        st.session_state.authenticated = True
        st.success("PIN Set Successfully")
        st.rerun()
    else:
        st.error("PIN must be 4 digits")

# --- Views ---

def login_view():
    st.markdown(f"<div style='text-align: center; padding-top: 100px;'><h1>{t('app_name')}</h1></div>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1,2,1])
    with col2:
        if st.session_state.get('first_run', False):
            st.subheader(t('pin_setup'))
            new_pin = st.text_input("Create 4-digit PIN", type="password",  key="setup_pin")
            if st.button("Set PIN"):
                set_pin(new_pin)
        else:
            st.subheader(t('pin_enter'))
            pin = st.text_input("PIN", type="password", key="login_pin")
            if st.button("Unlock"):
                check_pin(pin)

def dashboard_view():
    st.title(t('dashboard'))
    
    # Load Data
    cycles = database.get_all_cycles()
    start_dates = [c['start_date'] for c in cycles]
    analyzer = logic.CycleAnalyzer(start_dates)
    
    if not start_dates:
        st.info("No cycle data found. Please log your first period in the Calendar.")
        return

    last_period = start_dates[-1]
    today = date.today()
    
    phase, fertility = analyzer.get_phase(today, last_period)
    cycle_day = (today - last_period).days + 1
    next_period = analyzer.predict_next_period(last_period)
    
    # Hero Card
    st.markdown(f"""
    <div class="phase-card">
        <div class="sub-text">{t('cycle_day')}</div>
        <div class="big-day">{cycle_day}</div>
        <div class="sub-text" style="color: #ffcccc; margin-top: 10px;">{t(phase.lower().split(' ')[0])}</div>
        <br>
        <div style="font-size: 0.9em; opacity: 0.8;">{t('fertility')}: {t(fertility.lower())}</div>
    </div>
    """, unsafe_allow_html=True)
    
    # Quick Stats
    col1, col2 = st.columns(2)
    with col1:
        st.metric(label=t('next_period'), value=next_period.strftime("%b %d"))
    with col2:
        cycle_avg = analyzer.avg_cycle_length
        st.metric(label="Avg Cycle", value=f"{cycle_avg} Days")

    if analyzer.is_pcos:
         st.warning(t('pcos_alert'))

    # Visualizations
    st.subheader("Cycle Trends")
    if len(cycles) > 1:
        # Prepare data for Gradient Chart
        df = pd.DataFrame(cycles)
        df['cycle_length'] = df['start_date'].diff().dt.days.shift(-1)
        df = df.dropna()  # Drop the last one as it has no next period yet to calc length
        
        if not df.empty:
            fig = px.bar(df, x='start_date', y='cycle_length', 
                         color='cycle_length', 
                         color_continuous_scale=['#ff9999', '#cc0000', '#660000'],
                         labels={'start_date': 'Date', 'cycle_length': 'Length (Days)'})
            fig.update_layout(
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                font_color='#f0e6e6'
            )
            st.plotly_chart(fig, use_container_width=True)

def calendar_view():
    st.title(t('calendar'))
    
    st.subheader(t('log_period'))
    with st.form("log_period_form"):
        d = st.date_input("Start Date", value=date.today())
        notes = st.text_area("Notes")
        submitted = st.form_submit_button(t('save'))
        if submitted:
            database.add_cycle(d, notes)
            st.success("Logged successfully!")
            st.rerun()

    st.subheader("History")
    cycles = database.get_all_cycles()
    for c in reversed(cycles):
        with st.expander(f"{c['start_date'].strftime('%Y-%m-%d')}"):
            st.write(f"Notes: {c['notes']}")

def health_view():
    st.title(t('health'))
    
    today = date.today()
    log = database.get_daily_log(today)
    
    col1, col2 = st.columns(2)
    
    # Water Tracker
    with col1:
        st.markdown(f"### 💧 {t('water_tracker')}")
        current_water = log['water_intake']
        st.metric("Glasses", f"{current_water}/8")
        if st.button("Add Glass"):
            database.update_daily_log(today, water=current_water + 1)
            st.rerun()
            
    # Exercise Guide
    with col2:
        st.markdown(f"### 🧘‍♀️ {t('exercise_guide')}")
        # Determine Guide based on Phase logic (simplified re-calc for now)
        cycles = database.get_all_cycles()
        recommendation = "Relax and stretch."
        if cycles:
            analyzer = logic.CycleAnalyzer([c['start_date'] for c in cycles])
            phase, _ = analyzer.get_phase(today, cycles[-1]['start_date'])
            
            if "Menstrual" in phase:
                recommendation = "Light Yoga, Walking, Rest."
            elif "Follicular" in phase:
                recommendation = "Cardio, Running, HIIT."
            elif "Ovulation" in phase:
                recommendation = "High Intensity, Strength Training."
            else: # Luteal
                recommendation = "Low Impact, Pilates, Swimming."
                
        st.info(recommendation)

    st.markdown("### Daily Symptoms")
    symptoms = st.text_area("How do you feel today?", value=log['symptoms'] or "")
    if st.button("Save Symptoms"):
        database.update_daily_log(today, symptoms=symptoms)
        st.success("Saved")

def settings_view():
    st.title(t('settings'))
    
    # Language
    lang_options = {"English": "en", "Urdu": "ur", "Tamil": "ta"}
    # Reverse lookup for display
    current_label = [k for k, v in lang_options.items() if v == st.session_state.lang][0]
    selected_lang = st.selectbox(t('language'), list(lang_options.keys()), index=list(lang_options.keys()).index(current_label))
    
    if lang_options[selected_lang] != st.session_state.lang:
        st.session_state.lang = lang_options[selected_lang]
        st.rerun()
        
    st.markdown("---")
    st.subheader("Reset PIN")
    new_pin = st.text_input("New PIN", type="password", key="reset_pin")
    if st.button("Update PIN"):
        set_pin(new_pin)

# --- Main Routing ---
if not st.session_state.authenticated:
    login_view()
else:
    # Sidebar
    with st.sidebar:
        st.image("assets/logo.png" if "logo.png" in "assets" else None, width=100) # Placeholder if no logo
        page = st.radio("Menu", ["Dashboard", "Calendar", "Health", "Settings"], 
                        format_func=lambda x: t(x.lower()))
    
    if page == "Dashboard":
        dashboard_view()
    elif page == "Calendar":
        calendar_view()
    elif page == "Health":
        health_view()
    elif page == "Settings":
        settings_view()

