import React from 'react';

export function ObjectViewer({ obj }: { obj: any }) {
    if (!obj) return null;
    return (
        <pre className="text-[10px] bg-muted/30 p-2 rounded overflow-x-auto border border-border/50 text-muted-foreground whitespace-pre-wrap break-words">
            {JSON.stringify(obj, null, 2)}
        </pre>
    );
}
