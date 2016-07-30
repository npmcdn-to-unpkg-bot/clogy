import LOGGING_LEVELS from '../constants/loggingLevels';

const DEFAULT_LOGGING_TYPE = 'log';

// I prefer default export rather than named export
export default {
  logToConsole
};

////////////////////////

function isLogLevelValid(currentLogLevel) {
  return !!(
    currentLogLevel &&
    currentLogLevel >= LOGGING_LEVELS.range.min &&
    currentLogLevel <= LOGGING_LEVELS.range.max
  );
}

function isNoneLogLevel(currentLogLevel) {
  return currentLogLevel === LOGGING_LEVELS.types.none;
}

function isLoggingAllowed(currentLogLevel, loggingType) {
  return (
    LOGGING_LEVELS.types[loggingType] >= currentLogLevel
  );
}

function isConsoleDefined() {

  // No need of ===, typeof returns a string
  return typeof(console) != 'undefined';
}

function getDateTime() {
  const d = new Date();
  const date = d.toDateString();

  // 0 means first matched string, which will be true always unless someone
  // overrides the result
  const time = d.toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];

  // NOTE: hey..!! see, 3 is not a magic number, if you think it is, then
  // it's just milliseconds in 3 digits (000-999)
  const appendMilliseconds = `00${d.getMilliseconds()}`.slice(-3);

  return `${date} ${time}.${appendMilliseconds}`;
}

function justLogItDude(loggingType, args) {
  const consoleLoggingType = console[loggingType] || console[DEFAULT_LOGGING_TYPE];
  Function.prototype.bind.call(consoleLoggingType, console).apply(console, args);
}

// Function style programming;
// No mutating params, no state known beforehand
function logToConsole(logToConsoleParams, args) {
  const { currentLogLevel, loggingType, options = {} } = logToConsoleParams;

  if (!isLogLevelValid(currentLogLevel)) {
    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
  }

  if (
    isNoneLogLevel(currentLogLevel) ||
    !isConsoleDefined() ||
    !isLoggingAllowed(currentLogLevel, loggingType)) {
    return;
  }

  /////////////////////////////////////////////
  const consoleOptions = [];

  if (options.showDateTime) {

    // Better readability than consoleOptions[consoleOptions.length] = value
    consoleOptions.push(`${getDateTime()}: `);
  }

  if (options.prefix) {
    consoleOptions.push(options.prefix);
  }

  justLogItDude(loggingType, [...consoleOptions, ...args]);
}