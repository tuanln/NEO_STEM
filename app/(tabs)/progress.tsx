import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { useGameStore } from '../../src/store/useGameStore';
import { LESSONS } from '../../src/data/lessons';

export default function ProgressScreen() {
  const { xp, level, hearts, streakDays, completedLessons, lessonStars } = useGameStore();

  const levelNames = ['', 'Người mới', 'Khám phá', 'Học viên', 'Nghiên cứu sinh', 'Nhà khoa học', 'Chuyên gia', 'STEM Master'];

  // Calculate stats per grade
  const gradeStats = ([6, 7, 8, 9] as const).map(grade => {
    const gradeLessons = LESSONS.filter(l => l.grade === grade);
    const completed = gradeLessons.filter(l => completedLessons.includes(l.id)).length;
    const totalStars = gradeLessons.reduce((sum, l) => sum + (lessonStars[l.id] || 0), 0);
    const maxStars = gradeLessons.length * 3;
    return { grade, total: gradeLessons.length, completed, totalStars, maxStars };
  });

  const totalStars = Object.values(lessonStars).reduce((s, v) => s + v, 0);
  const maxStars = LESSONS.length * 3;

  // Concepts learned
  const conceptsLearned = new Set<string>();
  completedLessons.forEach(lid => {
    const lesson = LESSONS.find(l => l.id === lid);
    if (lesson) {
      lesson.questions.forEach(q => conceptsLearned.add(q.concept));
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>📊 Tiến độ học tập</Text>

        {/* Overview cards */}
        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { borderColor: Colors.gold }]}>
            <Text style={styles.overviewValue}>⭐ {xp}</Text>
            <Text style={styles.overviewLabel}>Điểm XP</Text>
          </View>
          <View style={[styles.overviewCard, { borderColor: Colors.orange }]}>
            <Text style={styles.overviewValue}>🔥 {streakDays}</Text>
            <Text style={styles.overviewLabel}>Ngày streak</Text>
          </View>
        </View>

        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { borderColor: Colors.green }]}>
            <Text style={styles.overviewValue}>{completedLessons.length}/{LESSONS.length}</Text>
            <Text style={styles.overviewLabel}>Bài hoàn thành</Text>
          </View>
          <View style={[styles.overviewCard, { borderColor: Colors.purple }]}>
            <Text style={styles.overviewValue}>{totalStars}/{maxStars}</Text>
            <Text style={styles.overviewLabel}>Tổng sao</Text>
          </View>
        </View>

        {/* Level info */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>Level {level}</Text>
            <Text style={styles.levelName}>{levelNames[level]}</Text>
          </View>
          <View style={styles.levelBarBg}>
            <View style={[styles.levelBarFill, { width: `${Math.min(100, (xp % 300) / 3)}%` }]} />
          </View>
        </View>

        {/* Per grade progress */}
        <Text style={styles.sectionTitle}>Tiến độ theo lớp</Text>
        {gradeStats.map(({ grade, total, completed, totalStars: gs, maxStars: ms }) => {
          const gradeColors: Record<number, string> = { 6: Colors.grade6, 7: Colors.grade7, 8: Colors.grade8, 9: Colors.grade9 };
          return (
            <View key={grade} style={styles.gradeRow}>
              <View style={styles.gradeInfo}>
                <Text style={[styles.gradeTitle, { color: gradeColors[grade] }]}>Lớp {grade}</Text>
                <Text style={styles.gradeSub}>{completed}/{total} bài • {'★'.repeat(gs)}{'☆'.repeat(ms - gs)}</Text>
              </View>
              <View style={styles.gradeBarBg}>
                <View style={[styles.gradeBarFill, {
                  width: `${(completed / total) * 100}%`,
                  backgroundColor: gradeColors[grade],
                }]} />
              </View>
            </View>
          );
        })}

        {/* Concepts mastered */}
        <Text style={styles.sectionTitle}>Khái niệm đã học ({conceptsLearned.size})</Text>
        <View style={styles.conceptsWrap}>
          {Array.from(conceptsLearned).map(c => (
            <View key={c} style={styles.conceptBadge}>
              <Text style={styles.conceptText}>{c.replace(/_/g, ' ')}</Text>
            </View>
          ))}
          {conceptsLearned.size === 0 && (
            <Text style={styles.emptyText}>Hoàn thành bài học để mở khóa khái niệm!</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginBottom: 20 },
  overviewRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  overviewCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    alignItems: 'center', borderWidth: 1,
  },
  overviewValue: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  overviewLabel: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  levelCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 20, marginBottom: 24,
    borderWidth: 1, borderColor: Colors.gold,
  },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  levelTitle: { fontSize: 16, fontWeight: '800', color: Colors.gold },
  levelName: { fontSize: 14, color: Colors.textSecondary },
  levelBarBg: { height: 10, backgroundColor: Colors.surfaceLight, borderRadius: 5 },
  levelBarFill: { height: 10, backgroundColor: Colors.gold, borderRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12, marginTop: 8 },
  gradeRow: { marginBottom: 16 },
  gradeInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  gradeTitle: { fontSize: 15, fontWeight: '700' },
  gradeSub: { fontSize: 12, color: Colors.textMuted },
  gradeBarBg: { height: 8, backgroundColor: Colors.surfaceLight, borderRadius: 4 },
  gradeBarFill: { height: 8, borderRadius: 4 },
  conceptsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  conceptBadge: {
    backgroundColor: Colors.surfaceLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
  },
  conceptText: { fontSize: 12, color: Colors.textSecondary, textTransform: 'capitalize' },
  emptyText: { fontSize: 14, color: Colors.textMuted, fontStyle: 'italic' },
});
