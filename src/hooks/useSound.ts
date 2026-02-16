'use client';

/**
 * useSound Hook
 * 
 * PURPOSE:
 * Provides zero-latency programmatic audio synthesis using the Web Audio API.
 * Eliminates the need for external MP3/WAV files for UI feedback.
 */
export const useSound = () => {
    const playSynthesizedSound = (type: 'click' | 'success' | 'alert' | 'tick') => {
        if (typeof window === 'undefined') return;

        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        switch (type) {
            case 'click':
                // Short, percussive click
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, now);
                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);

                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'tick':
                // Very short high-pitched tick
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(1200, now);

                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

                oscillator.start(now);
                oscillator.stop(now + 0.05);
                break;

            case 'success':
                // Rising pleasant chime
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.2);

                gainNode.gain.setValueAtTime(0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'alert':
                // Low thud / warning
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, now);
                oscillator.frequency.exponentialRampToValueAtTime(40, now + 0.4);

                gainNode.gain.setValueAtTime(0.4, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.4);

                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;
        }

        // Clean up context after sound finishes
        setTimeout(() => {
            audioCtx.close();
        }, 1000);
    };

    return { playSynthesizedSound };
};
