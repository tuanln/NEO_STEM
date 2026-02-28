// Zustand store - Toan bo state cho PoC
// Ket hop: student profile + quiz state + gamification

import { create } from 'zustand';

interface GameState {
  // Student
  name: string;
  xp: number;
  level: number;
  hearts: number;
  streakDays: number;
  completedLessons: string[];
  lessonStars: Record<string, number>; // lessonId -> 1|2|3

  // Quiz in progress
  currentLessonId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> answerId
  correctCount: number;

  // Actions
  startQuiz: (lessonId: string) => void;
  answerQuestion: (questionId: string, answerId: string, isCorrect: boolean) => void;
  nextQuestion: () => void;
  finishQuiz: (totalQuestions: number) => void;
  loseHeart: () => void;
  resetHearts: () => void;
  setName: (name: string) => void;
}

function calculateLevel(xp: number): number {
  if (xp >= 2500) return 7;
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 600) return 4;
  if (xp >= 300) return 3;
  if (xp >= 100) return 2;
  return 1;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Default state
  name: '',
  xp: 0,
  level: 1,
  hearts: 5,
  streakDays: 0,
  completedLessons: [],
  lessonStars: {},

  currentLessonId: null,
  currentQuestionIndex: 0,
  answers: {},
  correctCount: 0,

  setName: (name) => set({ name }),

  startQuiz: (lessonId) => set({
    currentLessonId: lessonId,
    currentQuestionIndex: 0,
    answers: {},
    correctCount: 0,
  }),

  answerQuestion: (questionId, answerId, isCorrect) => set((state) => ({
    answers: { ...state.answers, [questionId]: answerId },
    correctCount: state.correctCount + (isCorrect ? 1 : 0),
    xp: state.xp + (isCorrect ? 10 : 0),
    level: calculateLevel(state.xp + (isCorrect ? 10 : 0)),
  })),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1,
  })),

  finishQuiz: (totalQuestions) => set((state) => {
    const pct = state.correctCount / totalQuestions;
    const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
    const bonusXp = pct >= 0.9 ? 20 : pct >= 0.7 ? 10 : 0;
    const lessonId = state.currentLessonId!;
    const existingStars = state.lessonStars[lessonId] || 0;

    return {
      completedLessons: state.completedLessons.includes(lessonId)
        ? state.completedLessons
        : [...state.completedLessons, lessonId],
      lessonStars: {
        ...state.lessonStars,
        [lessonId]: Math.max(existingStars, stars),
      },
      xp: state.xp + bonusXp,
      level: calculateLevel(state.xp + bonusXp),
      currentLessonId: null,
      currentQuestionIndex: 0,
    };
  }),

  loseHeart: () => set((state) => ({
    hearts: Math.max(0, state.hearts - 1),
  })),

  resetHearts: () => set({ hearts: 5 }),
}));
