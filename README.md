# 🌍 Earth 2 - Web Game

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-%233ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)

An interactive web-based judgment game where players evaluate abducted human specimens to decide who deserves a spot on the new colony, **Earth 2**, or face elimination.

## 📋 Summary
- [Technologies](#-technologies)
- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [What I Learned](#-what-i-learned)
- [Future Improvements](#-future-improvements)
- [How to Run](#-How-to-run)

---

## 🛠 Technologies
- **HTML5**: Structured semantic layout for modals, game dashboard, and card elements.
- **CSS3**: Custom styling, grid layout architecture, responsive rules, and smooth transitions.
- **JavaScript (ES6+):** Game flow control, bilingual dictionary logic, asynchronous Supabase API requests, and dynamic DOM manipulation.
- **Supabase:** Cloud backend database handling candidate profiles, pros/cons metadata, and real-time community voting counts via RPC functions.

## ✨ Features
- **Bilingual Interface:** Fully supports switching between English and Portuguese dynamically at the start of the game.
- **Resource Management Limit:** Players are restricted to saving a maximum of 6 candidates to the new colony, after which the green button locks out.
- **Community Consensus Statistics:** Integrated voting system that reveals community approval percentages (Earth 2 vs. Defeated) after each candidate judgment.
- **Dynamic Content Translation Mapping:** Automatically matches and translates backend localized career attributes and characteristics based on user language preferences.

## 📂 Project Architecture
The project is organized into core frontend assets:
* `index.html`: Main layout structuring the introduction overlay modal, character display, statistics progress bar, and action buttons.
* `style.css`: Defines visual styling, variables, flex/grid rules, and responsiveness for mobile layouts.
* `script.js`: Engine handling Supabase client configuration, state management, candidate iteration, and event listeners.

## 📚 What I Learned
- **Cloud Database Integration:** Connecting a vanilla JavaScript frontend to Supabase to fetch records and execute remote procedure calls (RPC).
- **Asynchronous State Control:** Managing UI visibility transitions (`style.visibility` and `style.display`) between game phases (intro, active selection, voting stats, and completion screen)[cite: 2].
- **Bilingual Data Handling:** Creating modular dictionary mappings to swap text content seamlessly without reloading the application.

## 🔮 Future Improvements
- [ ] Add sound effects for button clicks, approvals, and rejections.
- [ ] Add a dashboard visualization off all your choices at the end.
- [ ] Show the number of votes each candidate got (Earth 2 and Defeated).

## 🚀 How to Run

1. **Install dependencies:**
   This project requires Node.js. Install the required dependencies:
   ```bash
   npm install
   ```

2. **Start the development server:**
  Run the development script using the command line (cmd):
   ```bash
   npm run dev
   ```
