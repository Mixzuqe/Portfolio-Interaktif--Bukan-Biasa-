"""
Personal Interactive Portfolio - Rizal Maulana
Flask-based server untuk website portfolio interaktif dan cinematic
"""

from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)
app.secret_key = 'rizal-portfolio-secret-2024'

# ─── Data Portfolio ────────────────────────────────────────────────────────────

PORTFOLIO_DATA = {
    "name": "Rizal Maulana",
    "title": "Software Engineer & Data Application Developer",
    "tagline": "I build digital experiences that matter.",
    "bio": "Seorang pengembang perangkat lunak yang berfokus pada pembangunan aplikasi web responsif dan solusi analisis data. Memiliki keahlian mendalam dalam Python, khususnya membangun aplikasi interaktif dengan Streamlit dan API backend yang kuat menggunakan Flask. Berdedikasi untuk mengubah ide kompleks menjadi antarmuka pengguna yang sederhana dan efisien.",
    "contact": {
        "email": "mixzu01@email.com",
        "linkedin": "https://www.linkedin.com/in/rizal-maulana0708",
        "github": "https://github.com/Mixzuqe"
    },
    "skills": [
        {"name": "Python", "level": 90, "icon": "🐍", "category": "Core"},
        {"name": "Flask", "level": 85, "icon": "⚗️", "category": "Backend"},
        {"name": "Streamlit", "level": 88, "icon": "📊", "category": "Data"},
        {"name": "Data Analysis", "level": 82, "icon": "📈", "category": "Data"},
        {"name": "REST API", "level": 80, "icon": "🔌", "category": "Backend"},
        {"name": "HTML/CSS/JS", "level": 75, "icon": "🎨", "category": "Frontend"},
        {"name": "SQL", "level": 78, "icon": "🗄️", "category": "Database"},
        {"name": "Git", "level": 80, "icon": "🔀", "category": "Tools"},
    ],
    "projects": [
        {
            "id": 1,
            "title": "Dashboard Analitik Real-time",
            "description": "Aplikasi Streamlit untuk memvisualisasikan data penjualan dengan filter dinamis.",
            "tech": ["Python", "Streamlit", "Pandas", "Plotly"],
            "category": "Data Visualization",
            "icon": "📊",
            "gradient": "from-violet-600 to-indigo-600",
            "color": "#7c3aed"
        },
        {
            "id": 2,
            "title": "API Manajemen Inventaris",
            "description": "Backend RESTful berbasis Flask untuk sistem logistik perusahaan.",
            "tech": ["Python", "Flask", "SQLAlchemy", "REST API"],
            "category": "Backend Engineering",
            "icon": "⚗️",
            "gradient": "from-cyan-600 to-blue-600",
            "color": "#0891b2"
        },
        {
            "id": 3,
            "title": "Chatbot Layanan Pelanggan",
            "description": "Integrasi NLP sederhana menggunakan Python dan Flask untuk otomasi layanan.",
            "tech": ["Python", "Flask", "NLP", "AI"],
            "category": "AI Integration",
            "icon": "🤖",
            "gradient": "from-emerald-600 to-teal-600",
            "color": "#059669"
        }
    ],
    "story_chapters": [
        {
            "year": "2020",
            "title": "The Beginning",
            "text": "Perjalanan dimulai dengan rasa ingin tahu tentang bagaimana dunia digital bekerja. Baris pertama kode ditulis, dan dunia tidak pernah sama lagi.",
            "icon": "🌱"
        },
        {
            "year": "2021",
            "title": "Deep Dive into Python",
            "text": "Jatuh cinta dengan Python — bahasa yang elegan dan powerful. Mulai membangun tool sederhana hingga aplikasi data yang kompleks.",
            "icon": "🐍"
        },
        {
            "year": "2022",
            "title": "Backend & Data",
            "text": "Eksplorasi Flask membuka pintu ke dunia backend engineering. Setiap API yang dibangun adalah jembatan antara data dan dunia.",
            "icon": "⚙️"
        },
        {
            "year": "2023",
            "title": "Building Real Solutions",
            "text": "Proyek nyata, dampak nyata. Membangun dashboard analitik, sistem inventaris, dan solusi AI yang digunakan oleh pengguna sungguhan.",
            "icon": "🚀"
        },
        {
            "year": "Now",
            "title": "The Present Chapter",
            "text": "Terus tumbuh, terus belajar. Fokus pada membangun solusi yang tidak hanya bekerja — tetapi memberikan pengalaman yang luar biasa.",
            "icon": "✨"
        }
    ]
}

# ─── Routes ────────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/api/portfolio')
def api_portfolio():
    """API endpoint untuk data portfolio"""
    return jsonify(PORTFOLIO_DATA)

# ─── Run ───────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    print("\n" + "="*50)
    print("  * Rizal Maulana - Interactive Portfolio")
    print("  Running at: http://127.0.0.1:5000")
    print("="*50 + "\n")
    app.run(debug=True, port=5000)
