# 📊 Number Classification API

This is a simple **Number Classification API** that takes a number and returns its mathematical properties along with a fun fact.

## 🚀 Features
- **Checks if a number is:**
  - Prime
  - Perfect
  - Armstrong
  - Odd or Even
- **Calculates the sum of digits**
- **Fetches a fun fact** about the number using the [Numbers API](http://numbersapi.com/)
- **Handles CORS** for cross-origin requests

---

## 📡 API Endpoint
### GET /api/classify-number?number={your_number}

### ✅ **Success Response (`200 OK`)**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

