"use client";
import { useState } from "react";

export default function SummariserPage() {
  const [articleText, setArticleText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarise = async () => {
    if (!articleText.trim()) {
      setError("Please paste some article text first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleText }),
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`Error ${response.status}: ${text}`);
        return;
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(`Fetch failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleClear = () => {
    setArticleText("");
    setSummary("");
    setError("");
  };

  return (
    <main>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 24px" }}>

        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: "#7c3aed", fontWeight: "bold", fontSize: "15px", marginBottom: "8px" }}>
            AI Powered
          </p>
          <h1 className="summariser-heading" style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "12px" }}>
            Article Summariser
          </h1>
          <p style={{ fontSize: "17px", color: "#888", lineHeight: "1.6", marginBottom: "0" }}>
            Paste any article below and Claude will generate a clear, structured summary for you instantly.
          </p>
        </div>

        <div className="summariser-card" style={{ borderRadius: "12px", padding: "32px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
          <label className="summariser-label" style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "12px" }}>
            Article Text
          </label>
          <textarea
            className="summariser-textarea"
            rows={10}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontFamily: "Arial, sans-serif",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              outline: "none",
              resize: "vertical",
              lineHeight: "1.6",
              boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            placeholder="Paste your article text here..."
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
          />

          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button className="btn" onClick={handleSummarise} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Summarising..." : "Summarise Article"}
            </button>
            <button className="btn-outline" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "16px",
            color: "#dc2626",
            fontSize: "15px",
            marginBottom: "24px",
          }}>
            {error}
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
            <p style={{ color: "#888", margin: 0 }}>Claude is reading the article...</p>
          </div>
        )}

        {summary && (
          <div className="summariser-card" style={{ borderRadius: "12px", padding: "32px", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 className="summariser-heading" style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
                Summary
              </h2>
              <button className="btn-outline" onClick={handleCopy} style={{ fontSize: "14px", padding: "8px 20px" }}>
                Copy
              </button>
            </div>

            <div className="summariser-summary-box" style={{ borderRadius: "8px", padding: "24px" }}>
              <p className="summariser-summary-text" style={{ lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0, fontSize: "15px" }}>
                {summary}
              </p>
            </div>
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