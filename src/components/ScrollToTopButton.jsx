import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
                fixed bottom-6 right-6 z-9999
                bg-[#00396a] text-white
                p-3 rounded-full shadow-lg
                transition-all duration-300
                hover:bg-gray-600
                cursor-pointer
                "

        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
