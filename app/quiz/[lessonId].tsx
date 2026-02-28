import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { useGameStore } from '../../src/store/useGameStore';
import { getLessonById } from '../../src/data/lessons';
import { QuestionCard } from '../../src/components/QuestionCard';

export default function QuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const lesson = getLessonById(lessonId);

  const {
    currentQuestionIndex, hearts, startQuiz,
    answerQuestion, nextQuestion, loseHeart, finishQuiz,
    correctCount,
  } = useGameStore();

  useEffect(() => {
    if (lesson) startQuiz(lesson.id);
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Bài học không tìm thấy</Text>
      </SafeAreaView>
    );
  }

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Quiz finished
  if (!currentQuestion || currentQuestionIndex >= questions.length) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;

    // Finish quiz
    useEffect(() => {
      finishQuiz(questions.length);
    }, []);

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>
            {pct >= 90 ? '🎉' : pct >= 70 ? '👍' : '💪'}
          </Text>
          <Text style={styles.resultTitle}>
            {pct >= 90 ? 'XUẤT SẮC!' : pct >= 70 ? 'RẤT TỐT!' : 'CỐ GẮNG THÊM!'}
          </Text>
          <Text style={styles.resultScore}>{correctCount}/{questions.length} câu đúng</Text>
          <Text style={styles.resultPct}>{pct}%</Text>

          {/* Stars */}
          <View style={styles.starsRow}>
            {[1, 2, 3].map(s => (
              <Text key={s} style={s <= stars ? styles.starFilled : styles.starEmpty}>
                {s <= stars ? '★' : '☆'}
              </Text>
            ))}
          </View>

          {/* XP earned */}
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{correctCount * 10 + (pct >= 90 ? 20 : pct >= 70 ? 10 : 0)} XP</Text>
          </View>

          {/* Lesson connection */}
          <View style={styles.connectionCard}>
            <Text style={styles.connectionTitle}>📚 {lesson.gdpt2018}</Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={() => router.replace('/(tabs)/learn')}>
            <Text style={styles.doneButtonText}>TIẾP TỤC</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Out of hearts
  if (hearts <= 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>💔</Text>
          <Text style={styles.resultTitle}>Hết trái tim!</Text>
          <Text style={styles.resultScore}>Bạn đã trả lời {correctCount}/{questions.length} câu đúng</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              useGameStore.getState().resetHearts();
              startQuiz(lesson.id);
            }}
          >
            <Text style={styles.retryButtonText}>THỬ LẠI (5 ❤️)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAnswer = (answerId: string, isCorrect: boolean) => {
    answerQuestion(currentQuestion.id, answerId, isCorrect);
    if (!isCorrect) loseHeart();

    // Auto advance after a short delay
    setTimeout(() => {
      nextQuestion();
    }, 100);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with close + hearts */}
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.heartsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={styles.heartIcon}>{i < hearts ? '❤️' : '🤍'}</Text>
          ))}
        </View>
      </View>

      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  errorText: { color: Colors.red, fontSize: 16, textAlign: 'center', marginTop: 100 },
  quizHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  closeButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: Colors.textSecondary, fontSize: 18, fontWeight: '700' },
  heartsRow: { flexDirection: 'row', gap: 4 },
  heartIcon: { fontSize: 18 },
  resultContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  resultEmoji: { fontSize: 64, marginBottom: 16 },
  resultTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  resultScore: { fontSize: 18, color: Colors.textSecondary, marginBottom: 4 },
  resultPct: { fontSize: 48, fontWeight: '800', color: Colors.green, marginBottom: 16 },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  starFilled: { fontSize: 36, color: Colors.starGold },
  starEmpty: { fontSize: 36, color: Colors.starEmpty },
  xpBadge: {
    backgroundColor: Colors.gold, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, marginBottom: 24,
  },
  xpText: { color: '#1a1a1a', fontSize: 18, fontWeight: '800' },
  connectionCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: Colors.surfaceLight, width: '100%',
  },
  connectionTitle: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
  doneButton: {
    backgroundColor: Colors.green, paddingVertical: 16, paddingHorizontal: 60, borderRadius: 12,
  },
  doneButtonText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  retryButton: {
    backgroundColor: Colors.blue, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, marginTop: 20,
  },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  backButton: { marginTop: 16 },
  backButtonText: { color: Colors.textMuted, fontSize: 15 },
});
