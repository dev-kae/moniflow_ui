export class RequestDataSource {
  constructor() {
    this.today = new Date();
  }

  getMonthlyData() {
    const data = [];
    for (let month = 0; month <= this.today.getMonth(); month++) {
      data.push({
        name: this.monthName(month),
        requests: this.randomInt(1000, 3000),
      });
    }
    return data;
  }

  getDailyDataByMonth(monthIndex) {
    const year = this.today.getFullYear();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const month = this.monthName(monthIndex);
    const data = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = String(d).padStart(2, "0");
      data.push({
        name: `${dayStr} ${month}`,
        requests: this.randomInt(200, 1000),
      });
    }

    return data;
  }

  getDailyData() {
    return this.getDailyDataByMonth(this.today.getMonth());
  }

  getHourlyDataByDate(dateStr) {
    const data = [];

    if (!dateStr || isNaN(Date.parse(dateStr))) {
      return [];
    }

    const date = new Date(dateStr);
    const seed = date.getTime() % 100000;
    const rng = this.seededRandom(seed);

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = String(h).padStart(2, "0");
        const minute = String(m).padStart(2, "0");
        data.push({
          name: `${hour}:${minute}`,
          requests: Math.floor(rng() * 50),
        });
      }
    }

    if (date.getDate() % 2 === 0) {
      data.push({ name: "00:03", requests: 10 });
      data.push({ name: "12:47", requests: 22 });
    }

    return data.sort((a, b) => a.name.localeCompare(b.name));
  }

  getDataByView(view, options = {}) {
    switch (view) {
      case "month":
        return this.getMonthlyData();
      case "day":
        if (typeof options.monthIndex === "number") {
          return this.getDailyDataByMonth(options.monthIndex);
        }
        return this.getDailyData();
      case "hour":
        return [];
      default:
        return [];
    }
  }

  getTotalRequests(data) {
    return data.reduce((sum, item) => sum + (item.requests || 0), 0);
  }

  monthName(index) {
    const meses = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];
    return meses[index] || "Mês";
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  seededRandom(seed) {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }
}
