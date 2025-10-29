import { useState } from 'react';
import Groq from 'groq-sdk';
import './index.css';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, 
});

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getGroqResponse = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse('');
        try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente prestativo.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama3-8b-8192', 
      });

      setResponse(completion.choices[0]?.message?.content || 'Nenhuma resposta.');
    } catch (error) {
      console.error('Erro ao buscar resposta da Groq:', error);
      setResponse('Erro ao conectar com a API. Verifique sua chave e o console.');
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };
    return (
    <div className="dashboard-container">
      <header>
        <h1>Meu Dashboard IA</h1>
        <p>Powered by React & Groq API (Llama 3)</p>
      </header>
      
      <main>
        <div className="chat-interface">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite seu prompt aqui..."
            rows="4"
            disabled={isLoading}
          />
                    <button onClick={getGroqResponse} disabled={isLoading}>
            {isLoading ? 'Pensando...' : 'Enviar'}
          </button>
        </div>
        
        {response && (
          <div className="response-area">
            <h3>Resposta da IA:</h3>
            <pre>{response}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
