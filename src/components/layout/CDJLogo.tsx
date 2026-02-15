'use client';

import { motion } from 'framer-motion';

export const CDJLogo = () => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut" as const,
                staggerChildren: 0.2
            }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-6"
        >
            <motion.div variants={logoVariants} className="relative w-64 md:w-[450px]">
                <img
                    src="/assets/CDJ.svg"
                    alt="CDJ Logo"
                    className="w-full h-auto brightness-200"
                />
            </motion.div>

            <motion.p
                variants={logoVariants}
                className="text-white/40 font-mono text-[10px] tracking-[0.6em] uppercase mt-4"
            >
                Synchronizing Professional Workspace
            </motion.p>
        </motion.div>
    );
};
