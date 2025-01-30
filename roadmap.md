```markdown
# RiffRabit Roadmap

This document is a comprehensive guide to build the RiffRabit interval recognition game from scratch. It outlines the tech stack, database models, game logic, page structure, multiplayer features, and design choices.

---

## 1. Overview

**Goal**: RiffRabit is an online interval-recognition game where musicians hear two notes, identify the interval, and progress through multiple difficulty modes. Players can compete in single-player modes or challenge friends in asynchronous multiplayer tournaments.

**Core Tech Stack**:
- **Front End**: React (JSX), Redux, Tailwind CSS, Framer Motion
- **Back End**: Express.js, Knex
- **Database**: PostgreSQL (accessed via TablePlus)
- **Audio**: Tone.js for playback and Web Audio API for low-level audio processing
- **Sheet Music Rendering**: VexFlow
- **Authentication**: Passport.js (including optional Google OAuth)
- **Styling/Design**: Tailwind CSS + custom color palette + “Red Hat Display” font



**Key Folders**:
1. **frontend/src/components**: Reusable UI components (e.g., `IntervalSelectionComponent`, `LeaderboardComponent`, etc.).
2. **frontend/src/pages**: Main pages (e.g., `SignUpPage`, `GameplayPage`, `FriendsPage`, etc.).
3. **server/models**: Database models (`User`, `Challenge`, etc.) interacting with PostgreSQL via Knex.
4. **server/controllers**: Business logic that orchestrates requests/responses with the database.
5. **server/routes**: Express routes that map HTTP endpoints to controller methods.
6. **migrations/seeds**: Knex migrations to create and structure DB tables, plus seed data for testing.
7. **config**: Environment variables, secret keys, and database configs.

## 3. Database Schema

### 3.1 Entity Relationships
1. **Users**
   - `id`: PK
   - `username` (unique)
   - `password` (hashed)
   - `display_name`
   - `points` (numeric, default 0)
   - `high_score` (numeric, default 0)
   - `friends` (JSON/array) – list of user IDs
   - `email` (optional if using username only)
   - `google_id` (optional if using Google OAuth)
   - Session tokens / any other auth-related fields as needed

2. **Friends**  
   *Alternatively*, you could have a separate `friends` join table:
   - `user_id`
   - `friend_id`
   This approach is more normalized than storing `friends` as JSON. Choose whichever suits your needs best.

3. **Games**
   - `id`: PK
   - `game_type`: (e.g., “Green/Orange/Red,” or more specific names)
   - `difficulty`
   - `rules` (JSON storing details like ascending/descending, time per round, etc.)

4. **Rounds**
   - `id`: PK
   - `game_id` (FK → Games.id)
   - `sequence_of_notes` (JSON, storing the 2-note sequences or more advanced data)
   - `correct_interval`
   - `timing_constraints` (JSON if needed)

5. **Scores**
   - `id`: PK
   - `user_id` (FK → Users.id)
   - `game_id` (FK → Games.id)
   - `points_scored`
   - `date_played` (timestamp)

6. **Tournaments** (multiplayer session)
   - `id`: PK
   - `participants` (JSON array of user IDs) or a related table with many-to-many.
   - `game_settings` (JSON linking to a specific “game” or custom config)
   - `scores` (JSON or separate table referencing each user’s final score)
   - `outcome` (“pending”, “in_progress”, “completed”, etc.)

### 3.2 Example Migrations

**Users Table**:
```js
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('display_name');
    table.integer('points').defaultTo(0);
    table.integer('high_score').defaultTo(0);
    table.specificType('friends', 'text[]'); // or JSON type
    table.string('google_id'); // for Google OAuth
    table.timestamps(true, true);
  });
};
```

**Tournaments Table**:
```js
exports.up = function(knex) {
  return knex.schema.createTable('tournaments', table => {
    table.increments('id').primary();
    table.json('participants'); // or separate participants table
    table.json('game_settings');
    table.json('scores');       // store { user_id: score } pairs
    table.string('outcome').defaultTo('pending');
    table.timestamps(true, true);
  });
};
```

---

## 4. Model Summaries

### 4.1 Users Model
- **Fields**: `id`, `username`, `password`, `display_name`, `points`, `high_score`, `friends`, `google_id`.
- **Key Methods**:
  - `User.create({ username, password, ... })`: Hashes `password`, inserts user into DB.
  - `User.find(id)`: Finds user by primary key.
  - `User.findByUsername(username)`: Returns user object for authentication.
  - `User.updatePoints(id, newPoints)`: Updates a user’s points.
  - `User.updateUser(id, updates)`: Updates `friends`, `display_name`, etc.
  - `User.getTop5Users()`: Returns top 5 users by `points`.

### 4.2 Challenges / Tournaments Model
- **Fields**: `id`, `challenger`, `responder`, `preset`, `winner`, `rounds`, `status`.
- **Methods**:
  - `Challenge.create(challenger, responder, preset, rounds, status)`: Creates a new challenge.
  - `Challenge.updateChallengeStatus(id, status)`: Updates the `status` of an existing challenge.
  - `Challenge.updateChallengeResult(id, status, winnerId)`: Finalizes a challenge and sets the winner.
- **Relationships**:
  - `challenger` → `users.id`
  - `responder` → `users.id`
  - `winner` → `users.id`

*(Adjust naming if you use the “Tournaments” table instead of “Challenges.” The logic is similar.)*

---

## 5. Pages & Components

### 5.1 Pages
1. **SignUpPage**  
   - Collect username/email/password, handle form validation.
   - Call `User.create()` in the backend or relevant controller.

2. **LoginPage**  
   - Uses Passport.js or local strategy to authenticate.
   - Optional: “Sign in with Google” using Google OAuth.

3. **HomePage**  
   - Displays available game modes: Green, Orange, Red.
   - Shows a brief description, top scores, and current user’s high score.

4. **GameplayPage**  
   - Core interactive area:
     - Audio playback (Tone.js).
     - VexFlow for sheet music display.
     - Interval selection buttons (e.g., minor third, major third, perfect fifth, etc.).
   - Game logic (rounds, timer, scoreboard).

5. **ScorePage**  
   - Appears after each game to show final score, accuracy, and immediate stats.

6. **ProfilePage**  
   - Shows user’s display name, profile picture, total points, single-player high score, and any multiplayer stats (overall points, number of tournaments played, etc.).

7. **FriendsPage**  
   - **Friend List**: Displays current friends, a search bar to add new friends by username.
   - **Tournament Invites**: Current challenges, pending invites, or completed tournaments.

8. **SettingsPage**  
   - Allows changing password, editing display name, email, or linking/unlinking Google account.

### 5.2 Core Components
- **`GameSelectionPanel`**: Renders selectable game modes, re-used on HomePage or anywhere needed.
- **`GameConfigurationPanel`**: If any advanced config is needed before starting a game (e.g., choose difficulty).
- **`AudioPlayerComponent`**: Wraps Tone.js logic to play sequences. Pass the “round” data here to play intervals.
- **`SheetMusicComponent`**: Uses VexFlow for visual notation.
- **`IntervalSelectionComponent`**: Buttons for intervals. On click, checks correctness and dispatches to Redux for scoring.
- **`ProfileDetailComponent`**: Standard user info display.
- **`LeaderboardComponent`**: Displays top 5 or top 10 users. Possibly a global or embedded component.
- **`FriendListComponent`**: Renders friend data, add/remove friend functionality.
- **`TournamentSetupComponent`**: For challenging friends (defines what preset/difficulty to use).

---

## 6. Game Modes

### 6.1 Green (Easy)
1. **Octathon**: 
   - 10 rounds, 10 seconds per round. 
   - Locked first note (commonly “C”), ascending intervals within one octave.

2. **Octathon Turbo**: 
   - 10 rounds, 10 seconds per round. 
   - Locked first note, ascending & descending intervals within one octave.

### 6.2 Orange (Medium)
1. **Ascendethon**: 
   - 12 rounds, 10 seconds per round. 
   - Locked first note, ascending intervals over two octaves.
2. **Descendethon**: 
   - 12 rounds, 10 seconds per round. 
   - Locked first note, descending intervals over two octaves.

### 6.3 Red (Hard)
1. **Intervalley Mega**: 
   - 15 rounds, 5 seconds each. 
   - Locked first note, random ascending/descending over two octaves.
2. **Intervalley Maestro**: 
   - Infinite rounds (until user fails or quits), 5 seconds each. 
   - Both starting note and sequence are fully random over two octaves.

*(Maestro infinite mode is a placeholder—decide how the session ends or if it’s truly infinite.)*

---

## 7. Game Logic Details

### 7.1 Audio + Notes
- **Tone.js** Sampler for piano sounds.
- **Web Audio API** if needed for advanced manipulations.
- **Key Functions**:
  1. `getNoteIndex(note)`: e.g., “C3” → numeric index.
  2. `getNoteFromIndex(index)`: reverse mapping, numeric index → “C3”.
  3. `calculateInterval(noteA, noteB)`: returns “unison,” “minor third,” “perfect fifth,” etc.
  4. `generateGameRounds(preset)`: returns an array of round objects containing:
     ```js
     {
       firstNote: 'C3',
       secondNote: 'E3',
       correct: 'major third'
     }
     ```

### 7.2 Round Generation Flow
```js
function generateGameRounds(preset) {
  if (preset.rounds === Infinity) {
    // Currently not fully implemented
    return infinityGame();
  }
  let gameRounds = [];
  for (let i = 0; i < preset.rounds; i++) {
    const firstNote = preset.startOnC ? "C3" : getRandomNote(...);
    const secondNote = getSecondNote(firstNote, preset.direction, preset.octaves);
    const correct = calculateInterval(firstNote, secondNote);
    gameRounds.push({ firstNote, secondNote, correct });
  }
  return gameRounds;
}
```
- `getSecondNote()` ensures:
  - If ascending, secondNote > firstNote index (within `preset.octaves`).
  - If descending, secondNote < firstNote index.
  - If both, randomly pick ascending or descending offset, avoiding zero.

### 7.3 Scoring Logic
- **Single Player**: 
  - Each correct answer yields points.  
  - Total points updated in user’s `points` after the game or on the ScorePage.
- **Multiplayer**: 
  - Tournaments have a total pool of 150 points (for example). The winner takes the majority; in a tie, both get 75 points.
  - The result is stored in `tournaments.scores` or a separate scoreboard table.

---

## 8. Multiplayer Features

1. **Friend Management**:
   - Search users by username, add them as a friend if not already added.
   - Display friend list in `FriendsPage` or `ProfilePage`.

2. **Tournaments**:
   - **Challenge**: User picks a friend and a game mode → creates a `Tournament` record with status “pending.”
   - **Asynchronous Play**: Each user plays the same set of rounds whenever they can.
   - **Scoring**: Compare final scores; update the `winner` and `outcome`.
   - **Tie**: If both get the same final score, both receive partial points.

3. **Profile Integration**:
   - Show total multiplayer points, number of tournaments won, or any relevant stats.

---

## 9. Authentication & Security

1. **Local Strategy**:  
   - Store hashed `password` using bcrypt.  
   - Use `User.findByUsername` in Passport’s verify callback.
   - Issue session token or JWT.

2. **Google OAuth**:
   - Add Google sign-in button on `LoginPage`.
   - Upon success, store or update `google_id` in `users` table.

3. **Sessions / JWT**:  
   - Optionally store sessions server-side or use JWT for stateless auth.
   - Refresh tokens as needed.

---

## 10. Front-End Redux Flow

1. **State Slices**:
   - `auth`: user info, token, auth status.
   - `game`: current preset, rounds array, current round index, scoreboard.
   - `friends`: friend list, friend requests, tournament statuses.

2. **Actions**:
   - `loginSuccess(userData)`: sets `auth` info.
   - `logout()`: clears `auth`.
   - `fetchGameRounds(preset)`: calls `generateGameRounds`.
   - `submitAnswer(roundIndex, userAnswer)`: updates score if correct.
   - `endGame()`: triggers final scoreboard.

3. **Async Thunks**:
   - `loadTournaments()`: fetches user’s active or pending tournaments from back end.
   - `createTournament(challenger, friend, preset)`: sets up a new multiplayer challenge.

---

## 11. Animations

- **Framer Motion** used in the gameplay UI:
  - Animate the interval buttons (e.g., shake on incorrect, glow on correct).
  - Animate transitions between rounds (fade out/in).

---

## 12. Styling & Branding

### 12.1 Color Palette
```css
/* Example usage in Tailwind or custom classes */

--color-primary: #47B6FF; /* color-theme_1*dySZaEBWcafsfuPvPhhu9A-1 */
--color-secondary: #56FFFF;
--color-tertiary: #957FFF;
--color-dark1: #222233;
--color-dark2: #13111D;
```

### 12.2 Font
- **Red Hat Display** via Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300..900&display=swap" rel="stylesheet">
  ```
- Use in Tailwind or CSS:
  ```css
  body {
    font-family: 'Red Hat Display', sans-serif;
  }
  ```

---

## 13. Implementation Steps

1. **Setup & Boilerplate**  
   - Initialize `create-react-app` or preferred setup.  
   - Install dependencies: `npm install react redux tailwindcss framer-motion tone vexflow express knex pg passport`.
   - Configure Tailwind (postcss config, etc.).
   - Configure Redux store.

2. **Database & Server**  
   - Create migrations for `users`, `tournaments`, etc.  
   - Seed initial data.  
   - Implement `User` and `Tournament` models.  
   - Setup Express routes (e.g., `/api/users`, `/api/tournaments`, `/api/games`).

3. **Auth Flow**  
   - Implement Passport local strategy (`/auth/login`, `/auth/signup`).  
   - Optionally add Google OAuth strategy.

4. **Game Logic**  
   - Build or import `GameLogic.js` with `generateGameRounds(preset)`.  
   - Integrate with React components in `GameplayPage`.  
   - Connect Tone.js for note playback.

5. **Multiplayer Tournaments**  
   - Create endpoints (e.g., `POST /api/tournaments`) to challenge a friend.  
   - Retrieve tournament data and track each player’s progress.  
   - Determine winner, update points in the `users` table.

6. **Testing**  
   - Write unit tests for `calculateInterval`, `generateGameRounds`, etc.  
   - Test user flows (sign up, create challenge, etc.) with an integration test suite.

7. **Deployment**  
   - Configure environment variables for production (DB connection, OAuth keys, etc.).  
   - Build React front end and serve via Express or host separately (e.g., Netlify + Heroku).

---

## 14. Future Extensions

- **Infinite Mode**: Fully implement “Intervalley Maestro” with a real infinite loop or a definable exit condition.
- **Advanced Interval Display**: Show chord or scale-based intervals, not just “perfect fifth.”
- **Real-time Multiplayer**: Turn-based or synchronous challenge rather than asynchronous.
- **Mobile App**: Wrap in React Native for cross-platform deployment.

---

## 15. Final Notes

- **Main Focus**: Interval quiz functionality, flexible presets, single-player + multiplayer, and real-time audio feedback.
- **Keep It Modular**: Each piece (audio generation, interval calculation, scoreboard updates, etc.) should be loosely coupled.
- **Security Best Practices**: Always hash passwords, sanitize DB inputs with Knex, and verify user input server-side.
- **Data Integrity**: Make sure to handle ties, partial scores, and safe merges if multiple tournaments are in progress.
