const button = document.querySelector("#icon");
const currentYear = new Date().getFullYear();

button.addEventListener("click", () => {
  console.log("Pressed....");
  setDefault();
  const day = parseInt(document.querySelector("#input-day").value, 10);
  const month = parseInt(document.querySelector("#input-month").value, 10);
  const year = parseInt(document.querySelector("#input-year").value, 10);
  checkAndCalculate(day, month, year);
});

function checkAndCalculate(day, month, year) {
  if (!day || !month || !year) {
    setErrorColor("all");
    return;
  } else {
    if (day < 0 || day > 31) {
      const d = document.querySelector(".error-day");
      d.style.display = "block";
      setErrorColor("#input-day");
    }
    if (month < 0 || month > 12) {
      const m = document.querySelector(".error-month");
      m.style.display = "block";
      setErrorColor("#input-month");
    }
    if (year >= currentYear || year < 0) {
      const y = document.querySelector(".error-year");
      y.style.display = "block";
      setErrorColor("#input-year");
    } else {
      const resultDate = makeCalculations(day, month, year);
      const results = document.querySelectorAll(".res span");
      results.forEach((res, index) => {
        res.innerText = resultDate[index];
      });
    }
  }
}

function setDefault() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => {
    error.style.display = "none";
  });
  setErrorColor("default");
}

function setErrorColor(str) {
  if (str === "all" || str === "default") {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.style.borderColor = str === "all" ? "crimson" : "hsl(0, 0%, 86%)";
    });
  } else {
    const input = document.querySelector(`${str}`);
    input.style.borderColor = "crimson";
  }
}

function makeCalculations(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  const hasBirthdayPassed =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());
  if (!hasBirthdayPassed) {
    years--;
  }

  if (months < 0 || (months === 0 && days < 0)) {
    // Adjust the months and days if today is before the birthdate of the current month
    years--;
    months += 12;
  }

  if (days < 0) {
    // Adjust the days if today is before the birthdate of the current month and year
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
    months--;
  }

  return [years, months, days];
}
