export class Task {
  constructor(
    public id: number,
    public summary?: string,
    public notes?: string,

    public captured_date?: Date,

    public target_date?: Date,
    public is_deadline?: boolean,
    public is_start_date?: boolean,

    public category?: string,

    public tags?: string[],

    public is_recurring?: boolean,
    public frequency?: string,
    public recurring_days?: string,
  ) { }

  public parseTags(): void {
    if (this.summary.length == 0) {
      return;
    }

    let tags: string[] = [];

    let words = this.summary.trim().split(' ');

    for (let word of words) {
      if (word.length > 0 && word.charAt(0)) {
        tags.push(word);
      }
    }

    this.tags = tags;
    this.processSpecialTags();
  }

  public processSpecialTags(): void {
    for (let tag of this.tags) {
      if (tag.split('/').length >= 2) {
        // date processing
        let date_parts = tag.split('/');
        let today = new Date();
        let month, day, year = 0;
        if (date_parts.length == 2) {
          [month, day] = date_parts.map((part: string) => parseInt(part));
          year = today.getFullYear(); // expecting a string for year
        }
        else if (date_parts.length == 3) {
          [month, day, year] = date_parts.map((part: string) => parseInt(part));
        }

        // month-1 because javascript likes it's months 0-indexed for some reason
        // the unary + operator converts them to numbers
        this.target_date = new Date(+year, +month-1, +day);
      }
      else if (tag.indexOf("#days-") != -1) {
        // days processing
        this.recurring_days = tag.substr(6);
      }
      else {
        // process keyword tags
        switch(tag.toLowerCase()) {
          case "#recurring": {
            this.is_recurring = true;
            break;
          }

          case "#daily": {
            this.frequency = "daily";
            break;
          }

          case "#weekly": {
            this.frequency = "weekly";
            break;
          }

          case "#montly": {
            this.frequency = "montly";
            break;
          }

          case "#starting-on": {
            this.is_start_date = true;
            break;
          }

          case "#deadline": {
            this.is_deadline = true;
            break;
          }

          // temporary for testing
          case "#next": {
            this.category = 'next';
            break;
          }

          case "#wait": {
            this.category = 'waiting';
            break;
          }

          case "#some": {
            this.category = 'someday';
            break;
          }

          case "#calendar": {
            this.category = 'calendar';
            break;
          }

          case "#complete": {
            this.category = 'completed';
            break;
          }
        }
      }
    }
  }

}
