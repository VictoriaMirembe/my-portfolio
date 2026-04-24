"use client";
import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answered, setAnswered] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setAnswered(false);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`Error ${response.status}: ${text}`);
        return;
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(`Fetch failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === questions[current].answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setTopic("");
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setAnswered(false);
    setError("");
  };

  const q = questions[current];

  return (
    <main>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "60px 24px" }}>

        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: "#7c3aed", fontWeight: "bold", fontSize: "15px", marginBottom: "8px" }}>
            Experience the digital error
          </p>
          <h1 className="summariser-heading" style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "12px" }}>
            Quiz Generator
          </h1>
          <p style={{ fontSize: "17px", color: "#888", lineHeight: "1.6", marginBottom: "0" }}>
            Type any topic of your choice and Claude will generate a 5 question quiz for you instantly.
          </p>
        </div>

        {questions.length === 0 && !loading && (
          <div className="summariser-card" style={{ borderRadius: "12px", padding: "32px", border: "1px solid #e5e7eb" }}>
            <label className="summariser-label" style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "12px" }}>
              Enter a Topic of your choice
            </label>
            <input
              className="summariser-textarea"
              type="text"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                fontFamily: "Arial, sans-serif",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "#7c3aed"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              placeholder="e.g. Journalism, Programming, Artificail Intelligence..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            {error && (
              <p style={{ color: "#dc2626", marginTop: "12px", fontSize: "14px" }}>{error}</p>
            )}
            <button className="btn" onClick={handleGenerate} style={{ marginTop: "20px" }}>
              Generate Quiz
            </button>
          </div>
        )}

        {loading && (
          <div className="summariser-loading" style={{ borderRadius: "12px", padding: "40px", textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "3px solid #f3f0ff",
              borderTop: "3px solid #7c3aed",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }} />
            <p style={{ color: "#888", margin: 0 }}>Hold on Claude is generating your quiz...</p>
          </div>
        )}

        {questions.length > 0 && !finished && (
          <div className="summariser-card" style={{ borderRadius: "12px", padding: "32px", border: "1px solid #e5e7eb" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "14px", color: "#888" }}>
                Question {current + 1} of {questions.length}
              </span>
              <span className="tag" style={{ background: "#f3f0ff", color: "#7c3aed", padding: "4px 12px", borderRadius: "99px", fontSize: "13px", fontWeight: "bold" }}>
                {q.type === "true_false" ? "True / False" : "Multiple Choice"}
              </span>
            </div>

            <div style={{ background: "#f3f0ff", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
              <p className="summariser-summary-text" style={{ fontSize: "17px", fontWeight: "bold", margin: 0, lineHeight: "1.6" }}>
                {q.question}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {q.options.map((option) => {
                let borderColor = "#e5e7eb";
                let background = "white";
                let color = "#333";

                if (answered) {
                  if (option === q.answer) {
                    borderColor = "#16a34a";
                    background = "#f0fdf4";
                    color = "#16a34a";
                  } else if (option === selected && option !== q.answer) {
                    borderColor = "#dc2626";
                    background = "#fef2f2";
                    color = "#dc2626";
                  }
                } else if (selected === option) {
                  borderColor = "#7c3aed";
                  background = "#f3f0ff";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    style={{
                      padding: "14px 20px",
                      border: `2px solid ${borderColor}`,
                      borderRadius: "8px",
                      background,
                      color,
                      fontSize: "15px",
                      fontFamily: "Arial, sans-serif",
                      cursor: answered ? "default" : "pointer",
                      textAlign: "left",
                      fontWeight: option === q.answer && answered ? "bold" : "normal",
                      transition: "all 0.2s",
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, fontSize: "15px", color: selected === q.answer ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>
                  {selected === q.answer ? "✅ Correct!" : `❌ Correct answer: ${q.answer}`}
                </p>
                <button className="btn" onClick={handleNext}>
                  {current + 1 >= questions.length ? "See Results" : "Next Question"}
                </button>
              </div>
            )}
          </div>
        )}

        {finished && (
          <div className="summariser-card" style={{ borderRadius: "12px", padding: "40px", border: "1px solid #e5e7eb", textAlign: "center" }}>
            <p style={{ fontSize: "60px", marginBottom: "16px" }}>
              {score === questions.length ? "🏆" : score >= 3 ? "🎉" : "📚"}
            </p>
            <h2 className="summariser-heading" style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
              Quiz Complete!
            </h2>
            <p style={{ color: "#888", marginBottom: "24px" }}>
              You scored <strong style={{ color: "#7c3aed" }}>{score} out of {questions.length}</strong> on <strong>{topic}</strong>
            </p>
            <div className="summariser-summary-box" style={{ borderRadius: "8px", padding: "20px", marginBottom: "28px" }}>
              <p className="summariser-summary-text" style={{ margin: 0, fontSize: "15px" }}>
                {score === questions.length
                  ? "Perfect score! You really know your stuff."
                  : score >= 3
                  ? "Good job! A little more revision and you'll ace it."
                  : "Keep studying — you'll get there!"}
              </p>
            </div>
            <button className="btn" onClick={handleRestart}>
              Try Another Topic
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}