import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../theme/colors';
import type { Question } from '../data/lessons';

interface Props {
  question: Question;
  onAnswer: (answerId: string, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (answerId: string) => {
    if (showResult) return;
    setSelectedId(answerId);
  };

  const handleCheck = () => {
    if (!selectedId || showResult) return;
    const answer = question.answers.find(a => a.id === selectedId);
    const isCorrect = answer?.isCorrect ?? false;

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    const answer = question.answers.find(a => a.id === selectedId);
    const isCorrect = answer?.isCorrect ?? false;
    onAnswer(selectedId!, isCorrect);
    setSelectedId(null);
    setShowResult(false);
  };

  const correctAnswer = question.answers.find(a => a.isCorrect);
  const isCorrect = selectedId ? question.answers.find(a => a.id === selectedId)?.isCorrect : false;

  // Progress bar
  const progress = questionNumber / totalQuestions;

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{questionNumber}/{totalQuestions}</Text>
      </View>

      {/* Difficulty indicator */}
      <View style={styles.difficultyRow}>
        {[1, 2, 3].map(d => (
          <View key={d} style={[styles.diffDot, d <= question.difficulty && styles.diffDotActive]} />
        ))}
        <Text style={styles.diffText}>
          {question.difficulty === 1 ? 'Dễ' : question.difficulty === 2 ? 'Trung bình' : 'Khó'}
        </Text>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question.body}</Text>

      {/* Answers */}
      <View style={styles.answersContainer}>
        {question.answers.map((answer, idx) => {
          let borderColor = Colors.surfaceLight;
          let bgColor = Colors.surface;

          if (showResult) {
            if (answer.isCorrect) {
              borderColor = Colors.green;
              bgColor = '#1a3a1a';
            } else if (answer.id === selectedId && !answer.isCorrect) {
              borderColor = Colors.red;
              bgColor = '#3a1a1a';
            }
          } else if (answer.id === selectedId) {
            borderColor = Colors.blue;
            bgColor = Colors.surfaceHighlight;
          }

          return (
            <TouchableOpacity
              key={answer.id}
              style={[styles.answerButton, { borderColor, backgroundColor: bgColor }]}
              onPress={() => handleSelect(answer.id)}
              activeOpacity={0.7}
              disabled={showResult}
            >
              <Text style={styles.answerLabel}>
                {String.fromCharCode(65 + idx)}
              </Text>
              <Text style={styles.answerText}>{answer.text}</Text>
              {showResult && answer.isCorrect && (
                <Text style={styles.checkMark}>✓</Text>
              )}
              {showResult && answer.id === selectedId && !answer.isCorrect && (
                <Text style={styles.crossMark}>✗</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Result feedback */}
      {showResult && (
        <View style={[styles.feedbackBox, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <Text style={styles.feedbackTitle}>
            {isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng'}
          </Text>
          {!isCorrect && (
            <Text style={styles.feedbackAnswer}>
              Đáp án: {correctAnswer?.text}
            </Text>
          )}
          <Text style={styles.feedbackExplanation}>{question.explanation}</Text>
          <Text style={styles.feedbackConcept}>📖 Khái niệm: {question.concept.replace(/_/g, ' ')}</Text>
        </View>
      )}

      {/* Action button */}
      {!showResult ? (
        <TouchableOpacity
          style={[styles.checkButton, !selectedId && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={!selectedId}
        >
          <Text style={styles.checkButtonText}>KIỂM TRA</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            TIẾP TỤC {isCorrect ? '  +10 XP' : ''}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  progressBg: { flex: 1, height: 12, backgroundColor: Colors.surfaceLight, borderRadius: 6 },
  progressFill: { height: 12, backgroundColor: Colors.green, borderRadius: 6 },
  progressText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600', width: 40, textAlign: 'right' },
  difficultyRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 16 },
  diffDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.surfaceLight },
  diffDotActive: { backgroundColor: Colors.orange },
  diffText: { color: Colors.textMuted, fontSize: 12, marginLeft: 4 },
  questionText: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: 24, lineHeight: 28 },
  answersContainer: { gap: 12, marginBottom: 20 },
  answerButton: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderRadius: 12, borderWidth: 2, gap: 12,
  },
  answerLabel: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceLight,
    textAlign: 'center', lineHeight: 32, color: Colors.textSecondary, fontWeight: '700', fontSize: 14,
  },
  answerText: { flex: 1, fontSize: 16, color: Colors.textPrimary, lineHeight: 22 },
  checkMark: { fontSize: 20, color: Colors.green },
  crossMark: { fontSize: 20, color: Colors.red },
  feedbackBox: { padding: 16, borderRadius: 12, marginBottom: 16 },
  feedbackCorrect: { backgroundColor: '#1a3a1a', borderWidth: 1, borderColor: Colors.green },
  feedbackWrong: { backgroundColor: '#3a1a1a', borderWidth: 1, borderColor: Colors.red },
  feedbackTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  feedbackAnswer: { fontSize: 14, color: Colors.gold, marginBottom: 8, fontWeight: '600' },
  feedbackExplanation: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20, marginBottom: 8 },
  feedbackConcept: { fontSize: 13, color: Colors.textMuted, fontStyle: 'italic' },
  checkButton: {
    backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 'auto',
  },
  checkButtonDisabled: { backgroundColor: Colors.surfaceLight },
  checkButtonText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  continueButton: {
    backgroundColor: Colors.green, paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 'auto',
  },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
});
