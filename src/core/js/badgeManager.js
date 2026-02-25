// badgeManager.js - Badge unlock logic
.pragma library

.import "progressManager.js" as PM

function checkAndUnlockBadges(questionId, stepId, stars) {
    var newBadges = []

    // "Bước đầu tiên" - Complete any step
    if (!isBadgeUnlocked("first_step")) {
        unlockBadge("first_step")
        newBadges.push("first_step")
    }

    // Step-type badges
    if (stepId === 0 && !isBadgeUnlocked("explorer")) {
        // "Nhà thám hiểm" - Complete any phenomenon step
        unlockBadge("explorer")
        newBadges.push("explorer")
    }

    if (stepId === 1 && !isBadgeUnlocked("question_master")) {
        unlockBadge("question_master")
        newBadges.push("question_master")
    }

    if (stepId === 2 && !isBadgeUnlocked("young_scientist")) {
        unlockBadge("young_scientist")
        newBadges.push("young_scientist")
    }

    if (stepId === 3 && !isBadgeUnlocked("architect")) {
        unlockBadge("architect")
        newBadges.push("architect")
    }

    if (stepId === 4 && !isBadgeUnlocked("challenger")) {
        unlockBadge("challenger")
        newBadges.push("challenger")
    }

    // Question master badges
    if (PM.isQuestionComplete(questionId)) {
        var masterBadge = "master_q" + questionId
        if (!isBadgeUnlocked(masterBadge)) {
            unlockBadge(masterBadge)
            newBadges.push(masterBadge)
        }
    }

    // "Hoàn hảo" - 75 stars total
    if (PM.getTotalStars() >= 75 && !isBadgeUnlocked("perfect")) {
        unlockBadge("perfect")
        newBadges.push("perfect")
    }

    // "Tự lực cánh sinh" - Complete any question with 3 stars on all steps
    if (PM.isQuestionComplete(questionId)) {
        var progress = PM.getQuestionProgress(questionId)
        var allThree = true
        for (var i = 0; i < progress.length; i++) {
            if (progress[i].stars < 3) { allThree = false; break }
        }
        if (allThree && !isBadgeUnlocked("self_reliant")) {
            unlockBadge("self_reliant")
            newBadges.push("self_reliant")
        }
    }

    // "Trí tuệ thám dò" - Complete all 5 phenomenon steps
    var allPhenomenons = true
    for (var q = 1; q <= 5; q++) {
        var p = PM.getStepProgress(q, 0)
        if (!p || !p.completed) { allPhenomenons = false; break }
    }
    if (allPhenomenons && !isBadgeUnlocked("adventurer")) {
        unlockBadge("adventurer")
        newBadges.push("adventurer")
    }

    return newBadges
}

function unlockBadge(badgeId) {
    var db = PM.getDb()
    db.transaction(function(tx) {
        tx.executeSql(
            "INSERT OR REPLACE INTO badges (badge_id, unlocked, unlock_date) VALUES (?, 1, ?)",
            [badgeId, new Date().toISOString()]
        )
    })
}

function isBadgeUnlocked(badgeId) {
    var db = PM.getDb()
    var unlocked = false
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT unlocked FROM badges WHERE badge_id = ?",
            [badgeId]
        )
        if (rs.rows.length > 0) {
            unlocked = rs.rows.item(0).unlocked === 1
        }
    })
    return unlocked
}

function getUnlockedBadges() {
    var db = PM.getDb()
    var badges = []
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT * FROM badges WHERE unlocked = 1 ORDER BY unlock_date"
        )
        for (var i = 0; i < rs.rows.length; i++) {
            badges.push({
                id: rs.rows.item(i).badge_id,
                unlockDate: rs.rows.item(i).unlock_date
            })
        }
    })
    return badges
}

function getUnlockedCount() {
    var db = PM.getDb()
    var count = 0
    db.readTransaction(function(tx) {
        var rs = tx.executeSql("SELECT COUNT(*) as cnt FROM badges WHERE unlocked = 1")
        count = rs.rows.item(0).cnt
    })
    return count
}
