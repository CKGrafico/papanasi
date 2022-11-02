export enum DebugLevel {
  None = 0,
  Log = 1,
  Breakpoint = 2
}

let debugLevel = DebugLevel.None;

const debugStrategies = {
  [DebugLevel.None]: () => null,
  [DebugLevel.Log]: (message: string) => console.log(message),
  [DebugLevel.Breakpoint]: (message: string) => {
    console.log(message);
    debugger;
  }
};

export function setDebugLevel(level: DebugLevel) {
  debugLevel = level;
}

export function debug(message: string) {
  debugStrategies[debugLevel](message);
}
