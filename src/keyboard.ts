export interface ShortcutEvent {
  key: string;
  code: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey?: boolean;
  repeat: boolean;
}
export type Shortcut = 'close' | 'undo' | 'toggle' | null;
export function shortcutFor(event: ShortcutEvent, editing: boolean, nativeSpace: boolean): Shortcut {
  if (event.key === 'Escape') return 'close';
  if (editing || event.repeat) return null;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.altKey && !event.shiftKey) return 'undo';
  // Space on a focused button/input keeps its native activation behavior.
  if (event.code === 'Space' && !nativeSpace && !event.ctrlKey && !event.metaKey && !event.altKey) return 'toggle';
  return null;
}
