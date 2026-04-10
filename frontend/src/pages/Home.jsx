// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="bg-animated">
        <div className="bg-orb3" />
        <div className="bg-grid" />
      </div>

      <div className="page landing">

        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">ResumeAI ✦</div>
          <div className="navbar-links">
            <Link to="/login" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }}>
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
              Get Started Free →
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <div className="badge">
              <div className="badge-dot" />
              AI-Powered Resume Analysis
            </div>

            <h1 className="hero-title">
              Craft Your<br />
              <span className="hero-title-gradient">Dream Career</span><br />
              With AI
            </h1>

            <p className="hero-sub">
              Upload your resume and get instant AI-powered feedback.
              Score, analyze, and optimize to land your dream job faster.
            </p>

            <div className="hero-btns">
              <Link to="/signup" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: 16 }}>
                Analyze My Resume →
              </Link>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '16px 28px', fontSize: 16 }}>
                Sign In
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">10K+</div>
                <div className="stat-lbl">Resumes Analyzed</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-num">94%</div>
                <div className="stat-lbl">Success Rate</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-num">2 min</div>
                <div className="stat-lbl">Avg Analysis</div>
              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="hero-visual">
            <div className="hero-card glass">
              <div className="hero-card-score">
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                  Resume Score
                </div>
                <div className="hero-card-score-num">
                  82<span style={{ fontSize: 22, color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>/100</span>
                </div>
                <div className="hero-card-bar">
                  <div className="hero-card-fill" style={{ width: '82%' }} />
                </div>
                <span className="hero-card-tag">🔥 Excellent Match</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '✅', label: 'Strong work experience', color: '#50ff96' },
                  { icon: '⚠️', label: 'Add quantifiable results', color: '#ff8080' },
                  { icon: '💡', label: 'Include leadership keywords', color: 'rgba(255,140,50,0.9)' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10,
                    fontSize: 13,
                    color: item.color,
                    animation: `fadeInUp 0.5s ease ${i * 0.15 + 0.3}s both`
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="section-label">✦ Features</div>
          <h2 className="section-title">
            Everything you need to<br />
            <span className="hero-title-gradient">land the job</span>
          </h2>

          <div className="features-grid">
            {[
              { icon: '🤖', title: 'AI-Powered Analysis', desc: 'Llama AI reads your resume and gives you a score out of 100 with detailed breakdown.' },
              { icon: '🎯', title: 'ATS Optimization', desc: 'Discover missing keywords that ATS systems look for and boost your chances of getting through.' },
              { icon: '⚡', title: 'Instant Feedback', desc: 'Get your complete analysis in under 30 seconds. No waiting, no manual review.' },
              { icon: '💡', title: 'Action Items', desc: 'Not just problems — we give you specific, actionable steps to improve your resume.' },
              { icon: '📊', title: 'Detailed Scoring', desc: 'See exactly where you stand with strengths, weaknesses, and improvement areas.' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Your resume is analyzed and immediately deleted. We only store the feedback, never your file.' },
            ].map((f, i) => (
              <div key={i} className="feature-card glass">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="section-label">✦ How It Works</div>
          <h2 className="section-title">
            3 steps to your<br />
            <span className="hero-title-gradient">perfect resume</span>
          </h2>

          <div className="steps">
            {[
              { num: '01', title: 'Upload Your Resume', desc: 'Drag and drop your PDF resume. We support all formats and sizes up to 5MB.' },
              { num: '02', title: 'AI Analyzes It', desc: 'Our Llama AI reads every line of your resume and evaluates it against industry standards.' },
              { num: '03', title: 'Get Your Results', desc: 'Receive a detailed score, strengths, weaknesses, and specific action items to improve.' },
            ].map((s, i) => (
              <div key={i} className="step glass">
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="glass" style={{ padding: '60px 40px', borderRadius: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,80,120,0.08), rgba(255,140,50,0.08))', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="cta-title">
                Ready to land your<br />
                <span className="hero-title-gradient">dream job?</span>
              </div>
              <p className="cta-sub">
                Join thousands of job seekers who improved their resumes with AI.
                It's free, fast, and incredibly effective.
              </p>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '18px 48px', fontSize: 17 }}>
                Start For Free →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          Built with ❤️ using React + Node.js + AI by <span>ResumeAI</span>
        </footer>

      </div>
    </>
  );
};

export default Home;