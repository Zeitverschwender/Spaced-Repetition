export class RepeatingItem {
  constructor(id, title, streak) {
    this.id = id;
    this.title = title;
    this.streak = streak;
  }

  getNextNotification() {
    return "1 hour";
  }
}
