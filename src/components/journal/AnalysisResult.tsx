import React from 'react';

export function AnalysisResult({ analysis, onClose }: { analysis: any, onClose: () => void }) {
    return (
        <div className="bg-card p-6 rounded-lg max-w-md w-full border border-border shadow-xl">
            <h2 className="text-lg font-bold mb-4">AI Analysis Result</h2>
            <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-60 mb-4">
                {JSON.stringify(analysis, null, 2)}
            </pre>
            <button onClick={onClose} className="px-4 py-2 bg-primary text-primary-foreground rounded w-full font-bold">Close</button>
        </div>
    );
}
