
declare type LoggerLevelType = "fatal" | "error" | "warning" | "log" | "info" | "debug";

declare interface LoggerProps {
  level: LoggerLevelType;
  message: string;
}