import { GameStats, GitHubEventType, XPHistoryEntry, TITLES } from '../types';

export class GitHubRPG {
  private level: number;
  private xp: number;
  private xpHistory: XPHistoryEntry[];

  constructor() {
    this.level = 1;
    this.xp = 0;
    this.xpHistory = [];
  }

  public getNextLevelXP(): number {
    return 50 * this.level;
  }

  public getTitle(): string {
    const index = Math.min(this.level - 1, TITLES.length - 1);
    return TITLES[index];
  }

  public addXP(amount: number, eventType: GitHubEventType): GameStats & { leveledUp: boolean } {
    this.xp += amount;
    
    const nextLevelXP = this.getNextLevelXP();
    const leveledUp = this.xp >= nextLevelXP;
    
    if (leveledUp) {
      this.levelUp();
    }

    this.xpHistory.unshift({
      amount,
      eventType,
      timestamp: new Date().toISOString(),
      level: this.level
    });

    if (this.xpHistory.length > 10) {
      this.xpHistory.pop();
    }

    return {
      level: this.level,
      xp: this.xp,
      nextLevelXP: this.getNextLevelXP(),
      title: this.getTitle(),
      xpHistory: this.xpHistory,
      leveledUp
    };
  }

  private levelUp(): void {
    this.level++;
    this.xp = 0;
  }

  public getStats(): GameStats {
    return {
      level: this.level,
      xp: this.xp,
      nextLevelXP: this.getNextLevelXP(),
      title: this.getTitle(),
      xpHistory: this.xpHistory
    };
  }

  public getXPProgress(): number {
    const nextLevelXP = this.getNextLevelXP();
    return (this.xp / nextLevelXP) * 100;
  }
} 