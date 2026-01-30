# 🩸 Mahwari (Python Edition)

**A Privacy-First, Aesthetic, and Intelligent Period Tracking Application.**

> *"Your cycle, your data. Local, secure, and insightful."*

---

## ✨ Features

- **🔒 Privacy First**: All data is stored locally on your machine using SQLite (`mahwari.db`). No cloud uploads.
- **🛡️ Secure Access**: Protect your data with a secure 4-digit PIN.
- **🧬 Intelligent Phase/PCOS Detection**:
  - Automatically calculates **Follicular, Ovulation, and Luteal** phases.
  - ⚠️ **PCOS Alert**: Detects irregular cycles (High Variance or Long Cycles).
- **🎨 Deep Red Aesthetic**: A stunning, custom-themed UI designed for comfort and elegance.
- **📊 Interactive Visualizations**: Visualize cycle trends with beautiful gradient charts.
- **🧘 Holistic Health**:
  - 💧 **Water Tracker**: Daily hydration logging.
  - 🧘‍♀️ **Exercise Guide**: Phase-based activity suggestions (e.g., Yoga for Menstrual, HIIT for Ovulation).
- **🌐 Multi-Language Support**: Fully localized for **English**, **Urdu (اردو)**, and **Tamil (தமிழ்)**.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### 🛠️ Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ManoMedEngg/mahwari.git
    cd mahwari
    ```

2.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Application**
    ```bash
    streamlit run app.py
    ```

---

## 📱 Usage Guide

1.  **First Launch**: Create your personal **4-digit PIN**.
2.  **Dashboard**: View your current cycle day, phase, and fertility status at a glance.
3.  **Calendar**: Log your period start dates. The app needs at least 2 cycles to start giving accurate predictions.
4.  **Health**: Track your daily water intake and view exercise recommendations tailored to your hormonal phase.
5.  **Settings**: Toggle languages or reset your PIN.

---

## 🏗️ Project Structure

```bash
📦 mahwari
 ┣ 📂 assets/          # Images and Icons
 ┣ 📜 app.py           # Main Application UI (Streamlit)
 ┣ 📜 logic.py         # Medical Algorithms & Phase Calculation
 ┣ 📜 database.py      # SQLite Database Manager
 ┣ 📜 translations.py  # Localization (EN, UR, TA)
 ┗ 📜 requirements.txt # Project Dependencies
```

## 🛠️ Built With

- **Python** 🐍
- **Streamlit** (UI Framework)
- **SQLite** (Local Database)
- **Plotly** (Visualizations)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
