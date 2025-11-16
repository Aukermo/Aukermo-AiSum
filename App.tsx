
import React, { useState, useCallback } from 'react';
import { summarizeText, humanizeText } from './services/geminiService';
import Header from './components/Header';
import TextArea from './components/TextArea';
import SummaryDisplay from './components/SummaryDisplay';
import Loader from './components/Loader';
import ActionButton from './components/ActionButton';
import TabButton from './components/TabButton';
import SettingsGroup from './components/SettingsGroup';

type Tab = 'summarizer' | 'humanizer';

const SUMMARY_LENGTH_OPTIONS = ['short', 'medium', 'detailed'] as const;
const SUMMARY_STYLE_OPTIONS = ['abstractive', 'extractive'] as const;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('summarizer');

  const [summarizerInput, setSummarizerInput] = useState<string>('');
  const [summarizerOutput, setSummarizerOutput] = useState<string>('');
  const [summaryLength, setSummaryLength] = useState<string>('medium');
  const [summaryStyle, setSummaryStyle] = useState<string>('abstractive');

  const [humanizerInput, setHumanizerInput] = useState<string>('');
  const [humanizerOutput, setHumanizerOutput] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async () => {
    if (!summarizerInput.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummarizerOutput('');
    try {
      const result = await summarizeText(summarizerInput, summaryLength, summaryStyle);
      setSummarizerOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [summarizerInput, summaryLength, summaryStyle]);

  const handleHumanize = useCallback(async () => {
    if (!humanizerInput.trim()) {
      setError('Please enter some text to humanize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHumanizerOutput('');
    try {
      const result = await humanizeText(humanizerInput);
      setHumanizerOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [humanizerInput]);
  
  const currentInput = activeTab === 'summarizer' ? summarizerInput : humanizerInput;
  const currentHandler = activeTab === 'summarizer' ? handleSummarize : handleHumanize;
  const currentOutput = activeTab === 'summarizer' ? summarizerOutput : humanizerOutput;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="w-full max-w-4xl min-h-[95vh] bg-black bg-opacity-30 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col p-6 md:p-10">
        <Header />

        <div className="flex items-center justify-center gap-2 my-6 p-1 bg-gray-800/80 rounded-lg border border-gray-700/50">
          <TabButton label="Summarizer" isActive={activeTab === 'summarizer'} onClick={() => setActiveTab('summarizer')} />
          <TabButton label="Humanizer" isActive={activeTab === 'humanizer'} onClick={() => setActiveTab('humanizer')} />
        </div>

        <main className="flex-grow flex flex-col gap-8">
          <div className="flex-grow flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-300">
              {activeTab === 'summarizer' ? 'Enter Text to Summarize' : 'Enter Text to Humanize'}
            </h2>
            <TextArea
              value={currentInput}
              onChange={(e) => activeTab === 'summarizer' ? setSummarizerInput(e.target.value) : setHumanizerInput(e.target.value)}
              placeholder={activeTab === 'summarizer' ? "Paste your article, report, or any long text here..." : "Paste your text here to make it sound more natural..."}
              disabled={isLoading}
            />
          </div>

          {activeTab === 'summarizer' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <SettingsGroup
                label="Summary Length"
                options={SUMMARY_LENGTH_OPTIONS}
                selectedValue={summaryLength}
                onSelect={setSummaryLength}
              />
              <SettingsGroup
                label="Summary Style"
                options={SUMMARY_STYLE_OPTIONS}
                selectedValue={summaryStyle}
                onSelect={setSummaryStyle}
              />
            </div>
          )}

          <div className="flex-shrink-0 flex items-center justify-center">
            <ActionButton
              onClick={currentHandler}
              disabled={isLoading || !currentInput.trim()}
              isLoading={isLoading}
              label={activeTab === 'summarizer' ? 'Summarize' : 'Humanize'}
            />
          </div>

          <div className="flex-grow flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-300">Generated Output</h2>
            <div className="relative flex-grow">
              {isLoading && !currentOutput && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                  <Loader />
                </div>
              )}
              {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
              <SummaryDisplay summary={currentOutput} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
