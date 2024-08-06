export const presets = [
  {
    name: "Octathon",
    rounds: 10,
    startOnC: true,
    direction: "ascending",
    octaves: 1,
    secondsPerRound: 10,
  },
  {
    name: "Octathon Turbo",
    rounds: 10,
    startOnC: true,
    direction: "both",
    octaves: 1,
    secondsPerRound: 10,
  },
  {
    name: "Ascendethon",
    rounds: 12,
    startOnC: true,
    direction: "ascending",
    octaves: 2,
    secondsPerRound: 10,
  },
  {
    name: "Descendethon",
    rounds: 12,
    startOnC: true,
    direction: "descending",
    octaves: 2,
    secondsPerRound: 10,
  },
  {
    name: "Intervalley Mega",
    rounds: 15,
    startOnC: true,
    direction: "both",
    octaves: 2,
    secondsPerRound: 5,
  },
  {
    name: "Intervalley Maestro",
    rounds: Infinity,
    startOnC: false,
    direction: "both",
    octaves: 2,
    secondsPerRound: 5,
  },
];

export const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
export const intervals = [
  "unison",
  "minor second",
  "major second",
  "minor third",
  "major third",
  "perfect fourth",
  "tritone",
  "perfect fifth",
  "minor sixth",
  "major sixth",
  "minor seventh",
  "major seventh",
  "octave",
];

export function getNoteIndex(note) {
  return noteNames.indexOf(note.slice(0, -1)) + parseInt(note.slice(-1)) * 12;
}

export function getNoteFromIndex(index) {
  const note = noteNames[index % 12];
  const octave = Math.floor(index / 12);
  return note + octave;
}

export function calculateInterval(firstNote, secondNote) {
  const firstIndex = getNoteIndex(firstNote);
  const secondIndex = getNoteIndex(secondNote);
  const distance = Math.abs(secondIndex - firstIndex);
  return intervals[distance % 12];
}

export function generateGameRounds(preset) {
  if (preset.rounds !== Infinity) {
    const game = [];
    const { rounds, startOnC, direction, octaves } = preset;
    const noteRangeStart = 48; // C3
    const noteRangeEnd = noteRangeStart + octaves * 12 - 1;

    for (let i = 0; i < rounds; i++) {
      
      let firstNote, secondNote;
      if (startOnC) {
        firstNote = "C3";
      } else {
        const randomIndex = noteRangeStart + Math.floor(Math.random() * 12);
        firstNote = getNoteFromIndex(randomIndex);
      }

      let secondNoteIndex;
      if (direction === "ascending") {
        const minIndex = getNoteIndex(firstNote) + 1;
        const maxIndex = Math.min(minIndex + (octaves * 12 - 1), noteRangeEnd);
        secondNoteIndex =
          minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
      } else if (direction === "descending") {
        const maxIndex = getNoteIndex(firstNote) - 1;
        const minIndex = Math.max(
          maxIndex - (octaves * 12 - 1),
          noteRangeStart
        );
        secondNoteIndex =
          minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
      } else {
        let randomOffset = Math.floor(Math.random() * (octaves * 12));
        if (Math.random() < 0.5) {
          secondNoteIndex = Math.max(
            getNoteIndex(firstNote) - randomOffset,
            noteRangeStart
          );
        } else {
          secondNoteIndex = Math.min(
            getNoteIndex(firstNote) + randomOffset,
            noteRangeEnd
          );
        }
      }

      secondNote = getNoteFromIndex(secondNoteIndex);
      const correct = calculateInterval(firstNote, secondNote);

      game.push({
        firstNote,
        secondNote,
        correct,
      });
    }

    return game;
  } else {
    console.log("Infinite game not yet implemented");
    infinityGame();
    return []
  }
}

export function infinityGame() {
  console.log("game function called");
  let roundsPlayed = 0;

  const playRound = () => {
    roundsPlayed++

  }

} 