// Scene-graph test double only. GPU rendering is covered by Playwright separately.
export const stats = { created: 0, destroyed: 0, drawn: 0 };
export class Container {
  children = [];
  x=0; y=0;
  position = { set:(x,y)=>{this.x=x;this.y=y;} };
  constructor() { stats.created++; }
  addChild(...children) { this.children.push(...children); return children[0]; }
  destroy() { stats.destroyed++; this.children.forEach(child => child.destroy()); }
}
export class Graphics extends Container {
  clears = 0;
  clear() { this.clears++; return this; }
  poly() { stats.drawn++; return this; }
  fill() { return this; }
  moveTo() { return this; }
  lineTo() { return this; }
  stroke() { return this; }
  circle() { stats.drawn++; return this; }
  ellipse() { stats.drawn++; return this; }
  rect() { stats.drawn++; return this; }
}
export class Text extends Container {
  anchor = { set() {} };
  position = { set() {} };
  constructor({ text, style }) { super(); this.text = text; this.style = style; }
}
