pragma Singleton
import QtQuick

QtObject {
    signal badgeUnlocked(string badgeId, string badgeName)

    function checkBadges(questionId, stepId, stars) {
        var newBadges = []

        // "Bước đầu tiên" - Complete any step
        if (!ProgressTracker.isBadgeUnlocked("first_step")) {
            ProgressTracker.unlockBadge("first_step")
            newBadges.push("first_step")
        }

        // Step-type badges
        if (stepId === 0 && !ProgressTracker.isBadgeUnlocked("explorer")) {
            ProgressTracker.unlockBadge("explorer")
            newBadges.push("explorer")
        }
        if (stepId === 1 && !ProgressTracker.isBadgeUnlocked("question_master")) {
            ProgressTracker.unlockBadge("question_master")
            newBadges.push("question_master")
        }
        if (stepId === 2 && !ProgressTracker.isBadgeUnlocked("young_scientist")) {
            ProgressTracker.unlockBadge("young_scientist")
            newBadges.push("young_scientist")
        }
        if (stepId === 3 && !ProgressTracker.isBadgeUnlocked("architect")) {
            ProgressTracker.unlockBadge("architect")
            newBadges.push("architect")
        }
        if (stepId === 4 && !ProgressTracker.isBadgeUnlocked("challenger")) {
            ProgressTracker.unlockBadge("challenger")
            newBadges.push("challenger")
        }

        // Question master badges
        if (ProgressTracker.isQuestionComplete(questionId)) {
            var masterBadge = "master_q" + questionId
            if (!ProgressTracker.isBadgeUnlocked(masterBadge)) {
                ProgressTracker.unlockBadge(masterBadge)
                newBadges.push(masterBadge)
            }
        }

        // "Hoàn hảo" - 300 stars total (20 questions × 15 stars)
        if (ProgressTracker.getTotalStars() >= 300 && !ProgressTracker.isBadgeUnlocked("perfect")) {
            ProgressTracker.unlockBadge("perfect")
            newBadges.push("perfect")
        }

        // "Tự lực cánh sinh" - Complete any question with 3 stars on all steps
        if (ProgressTracker.isQuestionComplete(questionId)) {
            var progress = ProgressTracker.getQuestionProgress(questionId)
            var allThree = true
            for (var i = 0; i < progress.length; i++) {
                if (progress[i].stars < 3) { allThree = false; break }
            }
            if (allThree && !ProgressTracker.isBadgeUnlocked("self_reliant")) {
                ProgressTracker.unlockBadge("self_reliant")
                newBadges.push("self_reliant")
            }
        }

        // "Trí tuệ thám dò" - Complete all 20 phenomenon steps
        var allPhenomenons = true
        for (var q = 1; q <= 20; q++) {
            var p = ProgressTracker.getStepProgress(q, 0)
            if (!p || !p.completed) { allPhenomenons = false; break }
        }
        if (allPhenomenons && !ProgressTracker.isBadgeUnlocked("adventurer")) {
            ProgressTracker.unlockBadge("adventurer")
            newBadges.push("adventurer")
        }

        // Emit signals for each new badge
        for (var b = 0; b < newBadges.length; b++) {
            var name = NeoConstants.badgeNames[newBadges[b]] || newBadges[b]
            badgeUnlocked(newBadges[b], name)
        }

        return newBadges
    }

    function isBadgeUnlocked(badgeId) {
        return ProgressTracker.isBadgeUnlocked(badgeId)
    }

    function getUnlockedBadges() {
        return ProgressTracker.getUnlockedBadges()
    }

    function getUnlockedCount() {
        return ProgressTracker.getUnlockedBadgeCount()
    }

    function getBadgeIcon(badgeId) {
        var icons = {
            "first_step": "👣",
            "explorer": "🔭",
            "question_master": "❓",
            "young_scientist": "🔬",
            "architect": "🏗",
            "challenger": "🏆",
            "master_q1": "🍚",
            "master_q2": "🌫",
            "master_q3": "🌳",
            "master_q4": "🧊",
            "master_q5": "🧂",
            "perfect": "💎",
            "speed_demon": "⚡",
            "self_reliant": "🦅",
            "adventurer": "🧭"
        }
        return icons[badgeId] || "🏅"
    }
}
