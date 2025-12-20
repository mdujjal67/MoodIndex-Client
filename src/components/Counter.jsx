// src/components/Counter.jsx
import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ endValue, duration = 1500, suffix = '', precision = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    // 💡 State to track visibility
    const [isVisible, setIsVisible] = useState(false);

    // --- Intersection Observer Logic ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 💡 Set isVisible based on intersection
                setIsVisible(entry.isIntersecting);
            },
            {
                rootMargin: '0px', 
                threshold: 0.5 
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []); // Empty dependency array ensures observer setup runs once

    // --- Animation Logic (Runs when isVisible changes to true) ---
    useEffect(() => {
        // Only run the animation when the element becomes visible
        if (!isVisible) {
            // Reset count when not visible, so it can start from 0 next time
            setCount(0);
            return; 
        }

        const start = 0;
        const startTime = Date.now();

        const animateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            const currentValue = start + (endValue - start) * progress;

            setCount(parseFloat(currentValue.toFixed(precision)));

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                setCount(endValue);
            }
        };

        // Start the animation
        requestAnimationFrame(animateCount);
        
    }, [isVisible, endValue, duration, precision]); // 💡 Dependencies include isVisible

    // Format the number
    const formattedCount = count.toLocaleString('en-US', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    });

    return (
        <span ref={ref} className="text-4xl text-indigo-900 font-bold leading-none lg:text-6xl">
            {formattedCount}
            {suffix}
        </span>
    );
};

export default Counter;