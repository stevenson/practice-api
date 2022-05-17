const { createLogger, format, transports } = require('winston');
const util = require('util');
const _ = require('lodash');

let logger;

const formatOptions = { colors: true, depth: 4 };

function configure({ level = 'debug', appName = '', json = true } = {}) {
    const loggerFormat = json
        ? format.combine(
            format.label({ label: appName }),
            format.timestamp(),
            format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
            format.json(),
        )
        : format.combine(
            format(info => _.assign(
                info,
                { message: util.formatWithOptions(formatOptions, info.message) },
            ))(),
            format.timestamp(),
            format.padLevels(),
            format.colorize(),
            format.printf(
                ({
                    // eslint-disable-next-line no-shadow
                    level,
                    message,
                    label,
                    timestamp,
                    ...rest
                }) => {
                    const params = rest[Symbol.for('splat')];
                    const paramsString = (params || []).map(p => util.formatWithOptions(formatOptions, p)).join(' ');
                    return `${timestamp} ${level} ${message} ${paramsString}`;
                },
            ),
        );

    logger = createLogger({
        level,
        format: loggerFormat,
        transports: [
            new transports.Console({ handleExceptions: true }),
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
}

function getLogger() {
    return logger;
}

const originalExports = {
    configure,
    getLogger,
};

// Forward to logger if not in originalExports
module.exports = new Proxy(originalExports, {
    get(target, name) {
        return target[name] || (logger[name] ? logger[name].bind(logger) : logger[name]);
    },
});
