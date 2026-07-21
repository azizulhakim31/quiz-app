# Quiz Mania

A fun and interactive quiz application that tests your knowledge across various categories and difficulty levels. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Beautiful UI** - Modern and responsive design
- **Multiple Categories** - General Knowledge, Science, Computers, and more
- **Difficulty Levels** - Easy, Medium, and Hard questions
- **Timer** - 15-second countdown for each question
- **Progress Tracking** - Visual progress bar and question counter
- **Instant Feedback** - See correct answers immediately

## APIs Used

### Open Trivia Database API

**Base URL:** `https://opentdb.com/api.php`

This application uses the **[Open Trivia Database](https://opentdb.com/)** - a free, crowdsourced, difficulty-rated trivia database API.

**Parameters Used:**
- `amount` - Number of questions (5, 10, 15, or 20)
- `difficulty` - Question difficulty level (easy, medium, hard)
- `type` - Question type (set to "multiple" for multiple choice)
- `category` - Quiz category ID (optional - if not specified, questions from any category)

**Example Request:**
```
https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&category=17
```

**Response Format:**
Returns JSON with quiz questions including:
- `question` - The quiz question
- `correct_answer` - The correct answer
- `incorrect_answers` - Array of 3 incorrect answers
- `difficulty` - Question difficulty level
- `category` - Question category

## How to Use

1. Open `index.html` in your web browser
2. Select your preferred:
   - **Difficulty Level** - Easy, Medium, or Hard
   - **Number of Questions** - 5, 10, 15, or 20
   - **Category** - Choose a specific category or Any Category
3. Click **Start** to begin the quiz
4. Answer each question within 15 seconds
5. View your final score and restart if desired

## Project Structure

```
quiz-app/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── script.js       # Quiz logic and API integration
├── README.md       # Project documentation
└── LICENSE         # License information
```

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Logic and API integration
- **Fetch API** - HTTP requests to Open Trivia Database

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Live Demo

https://quiz-mania-nu.vercel.app/
