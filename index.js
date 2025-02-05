const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Main route - this can be used to redirect or document the API
app.get("/", (req, res) => {
  res.send("Welcome to the Number Classification API! Use /api/classify-number?number=your_number");
});

// API route for classification
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({ error: "Please provide a valid number." });
  }

  const num = parseInt(number);

  // Check properties
  const isPrime = checkPrime(num);
  const isPerfect = checkPerfect(num);
  const isArmstrong = checkArmstrong(num);
  const digitSum = getDigitSum(num);
  const parity = num % 2 === 0 ? "even" : "odd";

  let properties = [parity];
  if (isArmstrong) properties.unshift("armstrong");

  // Fetch Fun Fact
  let funFact = "";
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    funFact = response.data;
  } catch (error) {
    funFact = "No fun fact available.";
  }

  res.json({
    number: num,
    is_prime: isPrime,
    is_perfect: isPerfect,
    properties,
    digit_sum: digitSum,
    fun_fact: funFact,
  });
});

// Helper functions
function checkPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function checkPerfect(n) {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) sum += n / i;
    }
  }
  return sum === n && n !== 1;
}

function checkArmstrong(n) {
  const digits = n.toString().split("").map(Number);
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, digits.length), 0);
  return sum === n;
}

function getDigitSum(n) {
  return n.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
