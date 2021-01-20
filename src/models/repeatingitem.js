export class RepeatingItem {
  constructor(_id, title, streak, description) {
    this._id = _id;
    this.title = title;
    this.streak = streak;
    this.description = description;
  }

  getStreak() {
    return "5";
  }
  getNextNotification() {
    return "1 hour";
  }
}
