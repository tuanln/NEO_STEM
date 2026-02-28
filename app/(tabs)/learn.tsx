import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';
import { useGameStore } from '../../src/store/useGameStore';
import { LESSONS, getLessonsByGrade } from '../../src/data/lessons';

const GRADES = [6, 7, 8, 9] as const;
const GRADE_COLORS = { 6: Colors.grade6, 7: Colors.grade7, 8: Colors.grade8, 9: Colors.grade9 };
const GRADE_LABELS = { 6: 'KHTN 6', 7: 'KHTN 7', 8: 'KHTN 8', 9: 'KHTN 9 + Tin học' };

export default function LearnScreen() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<6 | 7 | 8 | 9>(6);
  const { completedLessons, lessonStars } = useGameStore();

  const lessons = getLessonsByGrade(selectedGrade);

  const isLessonUnlocked = (lesson: typeof LESSONS[0], index: number): boolean => {
    if (index === 0) return true;
    // Unlock if previous lesson is completed
    const prevLesson = lessons[index - 1];
    return completedLessons.includes(prevLesson.id);
  };

  const renderStars = (lessonId: string) => {
    const stars = lessonStars[lessonId] || 0;
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3].map(s => (
          <Text key={s} style={s <= stars ? styles.starFilled : styles.starEmpty}>
            {s <= stars ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Grade selector */}
      <View style={styles.gradeSelector}>
        {GRADES.map(g => (
          <TouchableOpacity
            key={g}
            style={[
              styles.gradeTab,
              selectedGrade === g && { backgroundColor: GRADE_COLORS[g] },
            ]}
            onPress={() => setSelectedGrade(g)}
          >
            <Text style={[
              styles.gradeTabText,
              selectedGrade === g && styles.gradeTabTextActive,
            ]}>
              Lớp {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.gradeLabel}>{GRADE_LABELS[selectedGrade]}</Text>

      {/* Learning Path */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.pathContainer}>
        {lessons.map((lesson, index) => {
          const unlocked = isLessonUnlocked(lesson, index);
          const completed = completedLessons.includes(lesson.id);

          return (
            <View key={lesson.id} style={styles.nodeWrapper}>
              {/* Connector line */}
              {index > 0 && (
                <View style={[
                  styles.connector,
                  completed && { backgroundColor: GRADE_COLORS[selectedGrade] },
                ]} />
              )}

              {/* Lesson node */}
              <TouchableOpacity
                style={[
                  styles.lessonNode,
                  completed && { borderColor: GRADE_COLORS[selectedGrade], backgroundColor: `${GRADE_COLORS[selectedGrade]}20` },
                  !unlocked && styles.lessonNodeLocked,
                  unlocked && !completed && { borderColor: GRADE_COLORS[selectedGrade] },
                ]}
                onPress={() => {
                  if (unlocked) router.push(`/lesson/${lesson.id}`);
                }}
                disabled={!unlocked}
                activeOpacity={0.7}
              >
                <Text style={styles.lessonIcon}>
                  {unlocked ? lesson.icon : '🔒'}
                </Text>

                <View style={styles.lessonInfo}>
                  <Text style={[
                    styles.lessonOrder,
                    { color: GRADE_COLORS[selectedGrade] },
                  ]}>
                    Bài {lesson.order}
                  </Text>
                  <Text style={[
                    styles.lessonTitle,
                    !unlocked && styles.textLocked,
                  ]}>
                    {lesson.title}
                  </Text>
                  <Text style={[
                    styles.lessonQuestions,
                    !unlocked && styles.textLocked,
                  ]}>
                    {lesson.questions.length} câu hỏi
                  </Text>
                </View>

                {completed && renderStars(lesson.id)}
                {unlocked && !completed && (
                  <View style={[styles.playButton, { backgroundColor: GRADE_COLORS[selectedGrade] }]}>
                    <Text style={styles.playButtonText}>▶</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Next grade teaser */}
        {selectedGrade < 9 && (
          <View style={styles.nextGradeTeaser}>
            <Text style={styles.nextGradeText}>
              Hoàn thành Lớp {selectedGrade} để mở khóa Lớp {selectedGrade + 1}!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  gradeSelector: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  gradeTab: {
    flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  gradeTabText: { fontSize: 14, fontWeight: '700', color: Colors.textMuted },
  gradeTabTextActive: { color: '#fff' },
  gradeLabel: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', marginTop: 8, marginBottom: 4 },
  scrollView: { flex: 1 },
  pathContainer: { padding: 20, paddingBottom: 40, alignItems: 'center' },
  nodeWrapper: { alignItems: 'center', width: '100%', maxWidth: 360 },
  connector: { width: 3, height: 24, backgroundColor: Colors.surfaceLight, marginVertical: 4 },
  lessonNode: {
    width: '100%', flexDirection: 'row', alignItems: 'center', padding: 16,
    borderRadius: 16, borderWidth: 2, borderColor: Colors.surfaceLight,
    backgroundColor: Colors.surface, gap: 14,
  },
  lessonNodeLocked: { opacity: 0.4, borderColor: Colors.surfaceLight },
  lessonIcon: { fontSize: 32, width: 44, textAlign: 'center' },
  lessonInfo: { flex: 1 },
  lessonOrder: { fontSize: 12, fontWeight: '700' },
  lessonTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginTop: 2 },
  lessonQuestions: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  textLocked: { color: Colors.textMuted },
  starsRow: { flexDirection: 'row', gap: 2 },
  starFilled: { fontSize: 18, color: Colors.starGold },
  starEmpty: { fontSize: 18, color: Colors.starEmpty },
  playButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  playButtonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  nextGradeTeaser: {
    marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 1,
    borderColor: Colors.surfaceLight, borderStyle: 'dashed',
  },
  nextGradeText: { fontSize: 14, color: Colors.textMuted, textAlign: 'center' },
});
