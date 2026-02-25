// progressManager.js - SQLite-backed progress CRUD
.pragma library

function getDb() {
    var db = LocalStorage.openDatabaseSync("NeoStemDB", "1.0", "NEO_STEM Progress", 1000000)

    db.transaction(function(tx) {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS progress (" +
            "  question_id INTEGER NOT NULL," +
            "  step_id INTEGER NOT NULL," +
            "  stars INTEGER DEFAULT 0," +
            "  completed INTEGER DEFAULT 0," +
            "  data TEXT," +
            "  PRIMARY KEY (question_id, step_id)" +
            ")"
        )
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS badges (" +
            "  badge_id TEXT PRIMARY KEY," +
            "  unlocked INTEGER DEFAULT 0," +
            "  unlock_date TEXT" +
            ")"
        )
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS dqb_state (" +
            "  question_id INTEGER NOT NULL," +
            "  note_id INTEGER NOT NULL," +
            "  text TEXT," +
            "  answered INTEGER DEFAULT 0," +
            "  PRIMARY KEY (question_id, note_id)" +
            ")"
        )
    })

    return db
}

// Progress CRUD
function saveStepProgress(questionId, stepId, stars, data) {
    var db = getDb()
    db.transaction(function(tx) {
        tx.executeSql(
            "INSERT OR REPLACE INTO progress (question_id, step_id, stars, completed, data) VALUES (?, ?, ?, 1, ?)",
            [questionId, stepId, stars, data || ""]
        )
    })
}

function getStepProgress(questionId, stepId) {
    var db = getDb()
    var result = null
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT * FROM progress WHERE question_id = ? AND step_id = ?",
            [questionId, stepId]
        )
        if (rs.rows.length > 0) {
            result = {
                stars: rs.rows.item(0).stars,
                completed: rs.rows.item(0).completed === 1,
                data: rs.rows.item(0).data
            }
        }
    })
    return result
}

function getQuestionProgress(questionId) {
    var db = getDb()
    var results = []
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT * FROM progress WHERE question_id = ? ORDER BY step_id",
            [questionId]
        )
        for (var i = 0; i < rs.rows.length; i++) {
            results.push({
                stepId: rs.rows.item(i).step_id,
                stars: rs.rows.item(i).stars,
                completed: rs.rows.item(i).completed === 1
            })
        }
    })
    return results
}

function getTotalStars() {
    var db = getDb()
    var total = 0
    db.readTransaction(function(tx) {
        var rs = tx.executeSql("SELECT COALESCE(SUM(stars), 0) as total FROM progress")
        total = rs.rows.item(0).total
    })
    return total
}

function getQuestionStars(questionId) {
    var db = getDb()
    var total = 0
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT COALESCE(SUM(stars), 0) as total FROM progress WHERE question_id = ?",
            [questionId]
        )
        total = rs.rows.item(0).total
    })
    return total
}

function isQuestionComplete(questionId) {
    var db = getDb()
    var complete = false
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT COUNT(*) as cnt FROM progress WHERE question_id = ? AND completed = 1",
            [questionId]
        )
        complete = rs.rows.item(0).cnt >= 5
    })
    return complete
}

// DQB State
function saveDQBNote(questionId, noteId, text, answered) {
    var db = getDb()
    db.transaction(function(tx) {
        tx.executeSql(
            "INSERT OR REPLACE INTO dqb_state (question_id, note_id, text, answered) VALUES (?, ?, ?, ?)",
            [questionId, noteId, text, answered ? 1 : 0]
        )
    })
}

function getDQBNotes(questionId) {
    var db = getDb()
    var notes = []
    db.readTransaction(function(tx) {
        var rs = tx.executeSql(
            "SELECT * FROM dqb_state WHERE question_id = ? ORDER BY note_id",
            [questionId]
        )
        for (var i = 0; i < rs.rows.length; i++) {
            notes.push({
                text: rs.rows.item(i).text,
                answered: rs.rows.item(i).answered === 1
            })
        }
    })
    return notes
}

// Reset
function resetAll() {
    var db = getDb()
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM progress")
        tx.executeSql("DELETE FROM badges")
        tx.executeSql("DELETE FROM dqb_state")
    })
}
