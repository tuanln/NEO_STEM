import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { getLessonById } from '../../src/data/lessons';

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Bài học không tìm thấy</Text>
      </SafeAreaView>
    );
  }

  const gradeColors: Record<number, string> = {
    6: Colors.grade6, 7: Colors.grade7, 8: Colors.grade8, 9: Colors.grade9,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Quay lại</Text>
        </TouchableOpacity>

        {/* Grade + Order badge */}
        <View style={[styles.gradeBadge, { backgroundColor: gradeColors[lesson.grade] }]}>
          <Text style={styles.gradeBadgeText}>Lớp {lesson.grade} • Bài {lesson.order}</Text>
        </View>

        {/* Phenomenon card - The core of OpenSciEd */}
        <View style={styles.phenomenonCard}>
          <Text style={styles.phenomenonIcon}>{lesson.icon}</Text>
          <Text style={styles.phenomenonTitle}>{lesson.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>🔭 HIỆN TƯỢNG NEO</Text>
          <Text style={styles.phenomenonText}>{lesson.phenomenon}</Text>

          <View style={styles.wonderBox}>
            <Text style={styles.wonderLabel}>💭 {lesson.wonderPrompt}</Text>
          </View>
        </View>

        {/* Driving Question - Heart of OpenSciEd */}
        <View style={styles.drivingQuestionCard}>
          <Text style={styles.dqLabel}>❓ CÂU HỎI DẪN DẮT</Text>
          <Text style={styles.dqText}>{lesson.drivingQuestion}</Text>
        </View>

        {/* GDPT 2018 reference */}
        <View style={styles.refCard}>
          <Text style={styles.refLabel}>📚 Chương trình GDPT 2018</Text>
          <Text style={styles.refText}>{lesson.gdpt2018}</Text>
        </View>

        {/* Quiz info */}
        <View style={styles.quizInfo}>
          <Text style={styles.quizInfoText}>
            🧪 {lesson.questions.length} câu hỏi khám phá
          </Text>
          <Text style={styles.quizInfoSub}>
            Trả lời để hiểu khoa học đằng sau hiện tượng!
          </Text>
        </View>

        {/* Start Quiz button */}
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: gradeColors[lesson.grade] }]}
          onPress={() => router.push(`/quiz/${lesson.id}`)}
        >
          <Text style={styles.startButtonText}>BẮT ĐẦU KHÁM PHÁ</Text>
          <Text style={styles.startButtonSub}>{lesson.questions.length} câu hỏi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  errorText: { color: Colors.red, fontSize: 16, textAlign: 'center', marginTop: 100 },
  backButton: { marginBottom: 16 },
  backText: { color: Colors.blue, fontSize: 15, fontWeight: '600' },
  gradeBadge: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  gradeBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  phenomenonCard: {
    backgroundColor: Colors.surface, borderRadius: 20, padding: 24, marginBottom: 16,
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  phenomenonIcon: { fontSize: 48, textAlign: 'center', marginBottom: 12 },
  phenomenonTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginBottom: 16 },
  divider: { height: 1, backgroundColor: Colors.surfaceLight, marginBottom: 16 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: Colors.blue, marginBottom: 8, letterSpacing: 1 },
  phenomenonText: { fontSize: 16, color: Colors.textSecondary, lineHeight: 24 },
  wonderBox: {
    marginTop: 16, padding: 16, borderRadius: 12,
    backgroundColor: Colors.surfaceHighlight, borderLeftWidth: 3, borderLeftColor: Colors.orange,
  },
  wonderLabel: { fontSize: 15, color: Colors.orange, fontWeight: '600', fontStyle: 'italic' },
  drivingQuestionCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 2, borderColor: Colors.gold,
  },
  dqLabel: { fontSize: 13, fontWeight: '700', color: Colors.gold, marginBottom: 8, letterSpacing: 1 },
  dqText: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, lineHeight: 26 },
  refCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  refLabel: { fontSize: 12, fontWeight: '600', color: Colors.textMuted, marginBottom: 4 },
  refText: { fontSize: 14, color: Colors.textSecondary },
  quizInfo: { alignItems: 'center', marginBottom: 20 },
  quizInfoText: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  quizInfoSub: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  startButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: 1 },
  startButtonSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
});
