function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("please enter valid positive numbers for weight and height");
    return;
  }

  const bmi = weight / (height * height);
  document.getElementById("bmiResult").textContent = bmi.toFixed(2);
  document.getElementById("bmiCategory").textContent = getBMICategory(bmi);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal BMI";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "OverWeight";
  } else {
    return "obesity";
  }
}
