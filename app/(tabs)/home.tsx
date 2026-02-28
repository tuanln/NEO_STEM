import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { useGameStore } from '../../src/store/useGameStore';
import { LESSONS, getTotalQuestions } from '../../src/data/lessons';

export default function HomeScreen() {
  const router = useRouter();
  const { xp, level, hearts, streakDays, completedLessons } = useGameStore();

  const levelNames = ['', 'Người mới', 'Khám phá', 'Học viên', 'Nghiên cứu sinh', 'Nhà khoa học', 'Chuyên gia', 'STEM Master'];
  const totalQ = getTotalQuestions();

  // Find next lesson to do
  const nextLesson = LESSONS.find(l => !completedLessons.includes(l.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header Stats */}
        <View style={styles.header}>
          <Text style={styles.logo}>🔬 NEO STEM</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>🔥 {streakDays}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>⭐ {xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{'❤️'.repeat(hearts)}{'🤍'.repeat(5 - hearts)}</Text>
              <Text style={styles.statLabel}>Tim</Text>
            </View>
          </View>
        </View>

        {/* Level Badge */}
        <View style={styles.levelCard}>
          <Text style={styles.levelNumber}>Level {level}</Text>
          <Text style={styles.levelName}>{levelNames[level]}</Text>
          <View style={styles.levelProgress}>
            <View style={styles.levelProgressBg}>
              <View style={[styles.levelProgressFill, { width: `${Math.min(100, (xp % 300) / 3)}%` }]} />
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsRow}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{completedLessons.length}</Text>
            <Text style={styles.quickStatLabel}>Bài hoàn thành</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{LESSONS.length}</Text>
            <Text style={styles.quickStatLabel}>Tổng bài học</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{totalQ}</Text>
            <Text style={styles.quickStatLabel}>Câu hỏi</Text>
          </View>
        </View>

        {/* Continue Learning */}
        {nextLesson && (
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => router.push(`/lesson/${nextLesson.id}`)}
          >
            <View style={styles.continueLeft}>
              <Text style={styles.continueIcon}>{nextLesson.icon}</Text>
            </View>
            <View style={styles.continueRight}>
              <Text style={styles.continueLabel}>Tiếp tục khám phá</Text>
              <Text style={styles.continueTitle}>{nextLesson.title}</Text>
              <Text style={styles.continueGrade}>Lớp {nextLesson.grade} • {nextLesson.questions.length} câu hỏi</Text>
            </View>
            <Text style={styles.continueArrow}>→</Text>
          </TouchableOpacity>
        )}

        {/* OpenSciEd Method Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 Phương pháp OpenSciEd</Text>
          <Text style={styles.infoText}>
            Mỗi bài học bắt đầu bằng một <Text style={styles.bold}>hiện tượng thực tế</Text> tại Việt Nam.
            Bạn sẽ khám phá, đặt câu hỏi, và tìm hiểu khoa học đằng sau!
          </Text>
          <Text style={styles.infoQuote}>
            "Hiện tượng thú vị là chìa khóa — mỗi câu chuyện học tập là hành trình giải mã."
          </Text>
        </View>

        {/* Grade Overview */}
        <Text style={styles.sectionTitle}>Chương trình GDPT 2018</Text>
        {([6, 7, 8, 9] as const).map(grade => {
          const gradeLessons = LESSONS.filter(l => l.grade === grade);
          const completed = gradeLessons.filter(l => completedLessons.includes(l.id)).length;
          const gradeColors = { 6: Colors.grade6, 7: Colors.grade7, 8: Colors.grade8, 9: Colors.grade9 };

          return (
            <TouchableOpacity
              key={grade}
              style={[styles.gradeCard, { borderLeftColor: gradeColors[grade] }]}
              onPress={() => router.push('/(tabs)/learn')}
            >
              <Text style={styles.gradeTitle}>Lớp {grade}</Text>
              <Text style={styles.gradeProgress}>{completed}/{gradeLessons.length} bài</Text>
              <View style={styles.gradeBar}>
                <View style={[styles.gradeBarFill, {
                  width: `${(completed / gradeLessons.length) * 100}%`,
                  backgroundColor: gradeColors[grade],
                }]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 20 },
  logo: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 16 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 16 },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  levelCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  levelNumber: { fontSize: 14, color: Colors.gold, fontWeight: '700' },
  levelName: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginTop: 4 },
  levelProgress: { marginTop: 12 },
  levelProgressBg: { height: 8, backgroundColor: Colors.surfaceLight, borderRadius: 4 },
  levelProgressFill: { height: 8, backgroundColor: Colors.gold, borderRadius: 4 },
  quickStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  quickStat: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  quickStatNumber: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  quickStatLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  continueCard: {
    backgroundColor: Colors.green, borderRadius: 16, padding: 20, flexDirection: 'row',
    alignItems: 'center', marginBottom: 20,
  },
  continueLeft: { marginRight: 16 },
  continueIcon: { fontSize: 36 },
  continueRight: { flex: 1 },
  continueLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  continueTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginTop: 2 },
  continueGrade: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  continueArrow: { fontSize: 24, color: '#fff', fontWeight: '700' },
  infoCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 20, marginBottom: 24,
    borderWidth: 1, borderColor: Colors.blue, borderLeftWidth: 4,
  },
  infoTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  infoText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  bold: { fontWeight: '700', color: Colors.textPrimary },
  infoQuote: { fontSize: 13, color: Colors.textMuted, fontStyle: 'italic', marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  gradeCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 12,
    borderLeftWidth: 4, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  gradeTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, width: 60 },
  gradeProgress: { fontSize: 13, color: Colors.textSecondary, width: 60 },
  gradeBar: { flex: 1, height: 8, backgroundColor: Colors.surfaceLight, borderRadius: 4 },
  gradeBarFill: { height: 8, borderRadius: 4 },
});
