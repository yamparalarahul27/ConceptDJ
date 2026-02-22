import { useState } from 'react';

export function useJournalSubmission(positionId: string, isDemo: boolean) {
    const [isPending, setIsPending] = useState(false);

    const mutate = (payload: any, options?: { onSuccess: (res: any) => void }) => {
        setIsPending(true);
        setTimeout(() => {
            setIsPending(false);
            options?.onSuccess({ data: { aiScore: 8, aiReview: 'Mock evaluation completed.' }, analysis: null });
        }, 1000);
    };

    return { mutate, isPending };
}
