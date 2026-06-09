"use client";
import { createContext, useState } from "react";

export interface QuestionContexts {
    showQuestion: boolean;
    setShowQuestion: (v: boolean) => void;
}

export const QuestionContext = createContext<QuestionContexts | undefined>(
    undefined,
);
export default function QuizProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showQuestion, setShowQuestion] = useState<boolean>(false);

    return (
        <QuestionContext
            value={{
                showQuestion,
                setShowQuestion,
            }}
        >
            {children}
        </QuestionContext>
    );
}
