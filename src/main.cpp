#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQuickStyle>
#include <QFont>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QStandardPaths>
#include <QDir>

static void initDatabase()
{
    QString dataPath = QStandardPaths::writableLocation(QStandardPaths::AppDataLocation);
    QDir().mkpath(dataPath);

    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
    db.setDatabaseName(dataPath + "/neostem.db");

    if (!db.open()) {
        qWarning() << "Cannot open database:" << db.lastError().text();
        return;
    }

    QSqlQuery query;
    query.exec(
        "CREATE TABLE IF NOT EXISTS progress ("
        "  question_id INTEGER NOT NULL,"
        "  step_id INTEGER NOT NULL,"
        "  stars INTEGER DEFAULT 0,"
        "  completed INTEGER DEFAULT 0,"
        "  data TEXT,"
        "  PRIMARY KEY (question_id, step_id)"
        ")"
    );
    query.exec(
        "CREATE TABLE IF NOT EXISTS badges ("
        "  badge_id TEXT PRIMARY KEY,"
        "  unlocked INTEGER DEFAULT 0,"
        "  unlock_date TEXT"
        ")"
    );
    query.exec(
        "CREATE TABLE IF NOT EXISTS dqb_state ("
        "  question_id INTEGER NOT NULL,"
        "  note_id INTEGER NOT NULL,"
        "  text TEXT,"
        "  answered INTEGER DEFAULT 0,"
        "  PRIMARY KEY (question_id, note_id)"
        ")"
    );
}

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    app.setApplicationName("NEO_STEM");
    app.setOrganizationName("BinhDanHocSTEM");
    app.setApplicationVersion("1.0.0");

#ifdef Q_OS_MACOS
    QFont defaultFont(".AppleSystemUIFont", 16);
#else
    QFont defaultFont("Noto Sans", 16);
#endif
    app.setFont(defaultFont);

    QQuickStyle::setStyle("Basic");

    initDatabase();

    QQmlApplicationEngine engine;

    using namespace Qt::StringLiterals;
    const QUrl url(u"qrc:/NEO_STEM/src/menu/MainMenu.qml"_s);
    QObject::connect(
        &engine, &QQmlApplicationEngine::objectCreationFailed,
        &app, []() { QCoreApplication::exit(-1); },
        Qt::QueuedConnection
    );
    engine.load(url);

    return app.exec();
}
