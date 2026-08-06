interface LockoutRecord {
  failedAttempts: number;
  lockoutUntil: number | null;
}

export class LockoutService {
  private records: Map<string, LockoutRecord> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

  isLockedOut(key: string): { locked: boolean; remainingSeconds?: number } {
    const record = this.records.get(key);
    if (!record || !record.lockoutUntil) {
      return { locked: false };
    }

    if (Date.now() > record.lockoutUntil) {
      // Lockout expired
      this.records.delete(key);
      return { locked: false };
    }

    const remainingSeconds = Math.ceil((record.lockoutUntil - Date.now()) / 1000);
    return { locked: true, remainingSeconds };
  }

  recordFailedAttempt(key: string): { locked: boolean; attemptsLeft: number } {
    let record = this.records.get(key);
    if (!record) {
      record = { failedAttempts: 0, lockoutUntil: null };
      this.records.set(key, record);
    }

    record.failedAttempts += 1;

    if (record.failedAttempts >= this.MAX_ATTEMPTS) {
      record.lockoutUntil = Date.now() + this.LOCKOUT_DURATION_MS;
      return { locked: true, attemptsLeft: 0 };
    }

    return { locked: false, attemptsLeft: this.MAX_ATTEMPTS - record.failedAttempts };
  }

  resetAttempts(key: string): void {
    this.records.delete(key);
  }
}

export const lockoutService = new LockoutService();
