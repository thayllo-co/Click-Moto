import { logger, consoleTransport, fileAsyncTransport } from "react-native-logs";
import RNFS, { DocumentDirectoryPath, readDir } from "react-native-fs";
import { zip } from "react-native-zip-archive";

const logsPath = `${DocumentDirectoryPath}/logs`;
const targetPath = `${DocumentDirectoryPath}/logs-package.zip`;
const today = new Date();
const date = today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
const config = {
    levels: {
        debug: 0,
        info: 1,
        success: 2,
        error: 3,
    },
    severity: "debug",
    // severity: __DEV__ ? "debug" : "error",
    // transport: consoleTransport,
    transport: [consoleTransport, fileAsyncTransport],
    // transport: __DEV__ ? consoleTransport : fileAsyncTransport,
    transportOptions: {
        colors: {
            info: "yellowBright",
            success: "greenBright",
            error: "redBright",
        },
        FS: RNFS,
        filePath: logsPath,
        fileName: `logs_${date}.txt`,
    },
    async: true,
    dateFormat: "local",
    printLevel: true,
    printDate: true,
    enabled: true
};


export const checkLogsFolder = async () => {
    try {
        log.info("📝 checkLogsFolder()");
        const logsFolderExists = await RNFS.exists(logsPath);
        if (!logsFolderExists) {
            log.info("📝 Making Directory...");
            await RNFS.mkdir(logsPath);
        }
        log.success("📝 checkLogsFolder() ", logsFolderExists);
    } catch (error) {
        log.error("📝 checkLogsFolder() ", error);
    }
};

export const zipLogs = async () => {
    try {
        log.info("📝 zipLogs()");
        const files = await readDir(logsPath);
        log.success("📝 zipLogs() ", files);
        const zipPath = await zip(logsPath, targetPath);
        log.success("📝 zipLogs() ", zipPath);
        return zipPath;
    } catch (error) {
        log.error("📝 zipLogs() ", error);
        return "";
    }
}

export const log = logger.createLogger(config);