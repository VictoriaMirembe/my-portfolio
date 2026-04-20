'use client';

import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import Wrapper from '../components/Wrapper';

export default function Analyser() {
  const [article, setArticle] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyse() {
    if (!article.trim()) return;

    setLoading(true);
    setResult('');

    const response = await fetch('/api/analyse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article })
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <Wrapper>
      <main>
        <h1>AI Article Analyser</h1>
        <p>Paste a news article below and Victoria's AI Analyser will check it for disinformation.</p>

        <div style={{ marginTop: '32px', maxWidth: '800px' }}>

          <div className="form-group">
            <label>Paste your article here</label>
            <textarea
              rows={10}
              placeholder="Paste the full article text here..."
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            />
          </div>

          <button
            className="btn"
            onClick={handleAnalyse}
            disabled={loading}
            style={{ marginTop: '16px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Analysing...' : '🔍 Analyse Article'}
          </button>

          {/* Result */}
          {result && (
            <div className="card" style={{ marginTop: '32px', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              <h2 style={{ marginBottom: '16px', color: '#7c3aed' }}>Analysis Result</h2>
              <ReactMarkdown>
                {result}
              </ReactMarkdown>
            </div>
          )}

        </div>
      </main>
    </Wrapper>
  );
}