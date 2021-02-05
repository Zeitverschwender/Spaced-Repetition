const msInADay = 1000 * 60 * 60 * 24;

export class RepeatingItem {
  getFormattedNextNotification = (totalDays, streak) => {
    if (totalDays === streak) {
      return "today";
    }
    if (totalDays - streak === 1) {
      return "tomorrow";
    }
    return `after ${totalDays - streak} days`;
  };
  updateNextNotification = () => {
    let totalDays = 0;
    for (let i = 0; i < this.phase; i++) {
      totalDays += this.interval.days[i];
    }
    if (totalDays - this.streak < 0) {
      this.streakPassed = true;
      this.nextNotification = "Passed";
    } else {
      this.nextNotification = this.getFormattedNextNotification(
        totalDays,
        this.streak
      );
    }
  };
  updateStreak = () => {
    this.streak = Math.max(
      1,
      Math.ceil((Date.now() - new Date(this.streakStart)) / msInADay)
    );
  };
  constructor({ _id, title, description, streakStart, interval, phase }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.streakStart = streakStart;
    this.interval = interval;
    this.phase = phase;
    this.streakPassed = false;

    if (!streakStart) {
      this.streak = 0;
    } else {
      this.updateStreak();
    }
    if (this.interval == null) {
      this.nextNotification = "loading";
    } else {
      this.updateNextNotification();
    }
  }

  continueStreak() {
    this.streakPassed = false;
    this.phase += 1;
    this.updateNextNotification();
  }
  resetStreak() {
    this.streakStart = Date.now();
    this.phase = 1;
    this.streakPassed = false;
    this.updateStreak();
    this.updateNextNotification();
  }
}
