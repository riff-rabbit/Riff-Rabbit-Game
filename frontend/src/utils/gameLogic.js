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
    startOnC: false,
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
// export const intervals = [
//   "unison",
//   "minor second",
//   "major second",
//   "minor third",
//   "major third",
//   "perfect fourth",
//   "tritone",
//   "perfect fifth",
//   "minor sixth",
//   "major sixth",
//   "minor seventh",
//   "major seventh",
//   "octave",
// ];

export const intervals = [
  "unison",          // 0
  "minor second",    // 1
  "major second",    // 2
  "minor third",     // 3
  "major third",     // 4
  "perfect fourth",  // 5
  "tritone",         // 6
  "perfect fifth",   // 7
  "minor sixth",     // 8
  "major sixth",     // 9
  "minor seventh",   // 10
  "major seventh",   // 11
  "octave",          // 12
];


export function getNoteIndex(note) {
  return noteNames.indexOf(note.slice(0, -1)) + parseInt(note.slice(-1)) * 12;
}

export function getNoteFromIndex(index) {
  const note = noteNames[index % 12];
  const octave = Math.floor(index / 12);
  return note + octave;
}

// export function calculateInterval(firstNote, secondNote) {
//   const firstIndex = getNoteIndex(firstNote);
//   const secondIndex = getNoteIndex(secondNote);
//   const distance = Math.abs(secondIndex - firstIndex);
//   return intervals[distance % 12];
// }

// export function calculateInterval(firstNote, secondNote) {
//   const firstIndex = getNoteIndex(firstNote);
//   const secondIndex = getNoteIndex(secondNote);
//   const distance = Math.abs(secondIndex - firstIndex);
  
//   // Check if the notes are the same and in the same octave
//   if (distance === 0) {
//     return "unison";
//   } else {
//     return intervals[distance % 12];
//   }
// }

// export function calculateInterval(firstNote, secondNote) {
//   const firstIndex = getNoteIndex(firstNote);
//   const secondIndex = getNoteIndex(secondNote);
//   const distance = Math.abs(secondIndex - firstIndex);
  
//   if (distance === 0) {
//     return "unison";
//   } else {
//     const octaveCount = Math.floor(distance / 12);
//     const intervalIndex = distance % 12;
//     if (intervalIndex === 0 && octaveCount > 0) {
//       return octaveCount + " octave" + (octaveCount > 1 ? "s" : "");
//     } else {
//       return intervals[intervalIndex];
//     }
//   }
// }

export function calculateInterval(firstNote, secondNote) {
  const firstIndex = getNoteIndex(firstNote);
  const secondIndex = getNoteIndex(secondNote);
  const distance = Math.abs(secondIndex - firstIndex);

  if (distance === 0) {
    return "unison";
  } else if (distance % 12 === 0) {
    // Any multiple of 12 semitones is considered an octave
    return "octave";
  } else {
    const intervalIndex = distance % 12;
    return intervals[intervalIndex];
  }
}



export function generateGameRounds(preset) {
  if (preset.rounds !== Infinity) {
    const game = [];
    const { rounds, startOnC, direction, octaves } = preset;
    const noteRangeStart = 48; // C3
    const noteRangeEnd = noteRangeStart + octaves * 12 - 1;

    for (let i = 0; i < rounds; i++) {
      
      // turn this into a "generateSingleRound" function
      let firstNote, secondNote;
      if (startOnC) {
        firstNote = "C3";
      } else {
        const randomIndex = noteRangeStart + Math.floor(Math.random() * 12);
        firstNote = getNoteFromIndex(randomIndex);
      }

      let secondNoteIndex;


      if (direction === "ascending") {
        const minIndex = getNoteIndex(firstNote) + 1; // Ensures no unison in ascending
        const maxIndex = Math.min(minIndex + (octaves * 12 - 1), noteRangeEnd);
        secondNoteIndex = minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
      } else if (direction === "descending") {
        const minIndex = getNoteIndex(firstNote) - (octaves * 12 - 1);
        const maxIndex = getNoteIndex(firstNote) - 1;
        secondNoteIndex =
          maxIndex - Math.floor(Math.random() * (maxIndex - minIndex + 1));
      }

      else {
        let randomOffset;
        do {
          randomOffset = Math.floor(Math.random() * (octaves * 12));
        } while (randomOffset === 0); // Prevents selecting the same note index
      
        if (Math.random() < 0.5) {
          secondNoteIndex = Math.max(getNoteIndex(firstNote) - randomOffset, noteRangeStart);
        } else {
          secondNoteIndex = Math.min(getNoteIndex(firstNote) + randomOffset, noteRangeEnd);
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




   // if (direction === "ascending") {
      //   const minIndex = getNoteIndex(firstNote) + 1;
      //   const maxIndex = Math.min(minIndex + (octaves * 12 - 1), noteRangeEnd);
      //   secondNoteIndex =
      //     minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
      //   } else if (direction === "descending") {
      //     const minIndex = getNoteIndex(firstNote) - (octaves * 12 - 1);
      //     const maxIndex = getNoteIndex(firstNote) - 1;
      //     secondNoteIndex =
      //       maxIndex - Math.floor(Math.random() * (maxIndex - minIndex + 1));
      //   }
      // else {
      //   let randomOffset = Math.floor(Math.random() * (octaves * 12));
      //   if (Math.random() < 0.5) {
      //     secondNoteIndex = Math.max(
      //       getNoteIndex(firstNote) - randomOffset,
      //       noteRangeStart
      //     );
      //   } else {
      //     secondNoteIndex = Math.min(
      //       getNoteIndex(firstNote) + randomOffset,
      //       noteRangeEnd
      //     );
      //   }
      // }