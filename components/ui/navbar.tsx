import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        window.addEventListener("scroll", () => {
            
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);
    return (
        <nav className="fixed top-10 w-full">
            <div></div>
        </nav>
    );
}
