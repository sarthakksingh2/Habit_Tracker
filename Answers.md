1. How to run: Give the exact command(s) or steps to run your project on a fresh machine. If anything needs installing, list it. If you've deployed it, include the URL.
Answer : 
 Requirements:

A modern web browser 
VS Code recommended

Steps to run locally:

Clone the repository:
git clone <your-repository-url>

Open the project folder:
cd Habit_Tracker
Open the project in VS Code
Install the “Live Server” extension in VS Code
Right click index.html
Click:
Open with Live Server

The project will run locally in the browser.

Deployment URL:
https://sarthakksingh2.github.io/Habit_Tracker/

2. Stack & design choices: Why did you pick this frontend stack for this task? Then walk us through 2 specific visual or interaction decisions you made — not "I used blue," but something like "I made the timer take 60% of the viewport because…" or "I picked a grid over a list because…" Point to the part of the app each decision affects.

Answer: I choseD vanilla HTML, CSS, and JavaScript because the assignment focuses heavily on frontend fundamentals, design, and state management rather than framework-specific knowledge. Using plain JavaScript kept the project lightweight, easy to debug, and fast to load while still demonstrating DOM manipulation, event handling, persistence, and responsive UI development.

Design Decision 1 — Weekly Grid Layout

I used a table/grid layout instead of stacked cards because habit tracking is comparison-oriented. Users should be able to scan horizontally across a week and immediately understand consistency patterns. The grid structure improves readability and makes streak patterns visually obvious even with many habits.

This affects:

Weekly habit visibility
Fast visual scanning
Daily comparison behavior

Design Decision 2 — Highlighting Today’s Column

I visually highlighted the current day column using a soft tinted background rather than a strong accent color. This keeps the interface calm while still helping users immediately orient themselves inside the week view.

This affects:

Faster navigation
Reduced cognitive load
Better visual hierarchy

3. Responsive & accessibility: How does your app behave on a 360px-wide phone vs. a 1440px laptop? What's one accessibility consideration you handled (keyboard nav, focus states, color contrast, screen reader labels, anything specific)? What's one you knowingly skipped and why?

Answer: 
On a 1440px desktop screen
The layout stays centered using a max-width container
The weekly table becomes easier to scan
Spacing increases to reduce visual clutter.

On a 360px mobile screen
The habit grid becomes horizontally scrollable
Buttons become larger for touch interaction
Inputs stretch to full width
Layout stacks vertically for readability.

Accessibility consideration implemented:

I added keyboard interaction support for:
Enter key to add habits
Enter key to save edits
Escape key to cancel editing

I also added aria-labels to habit check buttons so screen readers can identify habits and dates correctly.

Accessibility consideration skipped:

I did not fully implement advanced screen reader announcements for dynamic updates like streak changes or habit deletion confirmations. With another day, I would improve this using ARIA live regions and more detailed focus management.

4. AI usage: List every place you used AI (which tool, what you asked, what it gave you). For at least one of these, describe something you changed about the AI output and why. Be specific — "I tweaked the styling" is not an answer; "the AI gave me a grid with fixed columns and I switched it to auto-fit minmax so the cards reflow on narrow screens" is.

Answer: 
ChatGPT and Claude

Used for:

Planning project structure
Brainstorming UI ideas
Generating initial JavaScript logic
Improving streak calculation logic
Writing README and ANSWERS documentation
Specific AI output I changed

The AI initially suggested a simpler card-based layout for habits. I changed this to a weekly table/grid because a grid makes habit consistency easier to scan visually across multiple days.

The AI also generated fixed-width layouts initially, which did not behave well on smaller screens. I changed the implementation to use horizontal scrolling and responsive stacking so the interface remained usable on mobile devices.

5. Honest gap: What's one thing in your submission that isn't polished enough, and what would you do to fix it with another day?

Answer : 
The least polished part of my submission is the animation and interaction feedback system. While the functionality works correctly, the transitions between state changes are still fairly basic.

With another day, I would:

Add smoother animations for toggles and week navigation
Improve mobile scrolling behavior for larger habit lists
Add drag-and-drop habit reordering
Improve accessibility testing and screen reader support
Refine the visual polish of streak indicators and edit interactions