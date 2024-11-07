// import React, { useEffect, useRef } from "react";
// import Vex from "vexflow";

// function transformNoteString(note) {
//   const match = note.match(/^([A-G]#?)(\d)$/);

//   if (!match) {
//     throw new Error("Invalid note format");
//   }

//   const [, letter, octave] = match;
//   const newOctave = parseInt(octave, 10) + 1;

//   return { key: `${letter[0]}/${newOctave}`, accidental: letter.length > 1 ? "#" : null };
// }

// const NoteRender = ({ roundNotes }) => {
//   const VF = Vex.Flow;
//   const noteRef = useRef(null);

//   useEffect(() => {
//     if (noteRef.current) {
//       // Clear the previous notation
//       noteRef.current.innerHTML = "";

//       let processFirst, processSecond;

//       if (roundNotes) {
//         processFirst = transformNoteString(roundNotes.firstNote);
//         processSecond = transformNoteString(roundNotes.secondNote);
//         console.log("🚀 ~ NoteRender ~ processFirst:", processFirst);
//         console.log("🚀 ~ NoteRender ~ processSecond:", processSecond);
//       }

//       if (processFirst && processSecond) {
//         const renderer = new VF.Renderer(
//           noteRef.current,
//           VF.Renderer.Backends.SVG
//         );
//         renderer.resize(250, 200); // Set the size of the SVG element
//         const context = renderer.getContext();
//         const stave = new VF.Stave(10, 40, 200); // Position and width of the stave
//         stave.addClef("treble").setContext(context).draw();

//         // Define the notes to be displayed
//         const note1 = new VF.StaveNote({
//           keys: [processFirst.key],
//           duration: "q", // 'q' stands for quarter note
//         });

//         const note2 = new VF.StaveNote({
//           keys: [processSecond.key],
//           duration: "q", // 'q' stands for quarter note
//         });

//         // Add accidentals if present
//         if (processFirst.accidental) {
//           note1.addAccidental(0, new VF.Accidental(processFirst.accidental));
//         }
//         if (processSecond.accidental) {
//           note2.addAccidental(0, new VF.Accidental(processSecond.accidental));
//         }

//         // Create a voice in 4/4 and add the notes
//         const voice = new VF.Voice({ num_beats: 2, beat_value: 4 });
//         voice.addTickables([note1, note2]);

//         new VF.Formatter().joinVoices([voice]).format([voice], 100);
//         voice.draw(context, stave);
//       }
//     }
//   }, [roundNotes]);

//   return <div className="bg-white rounded-lg flex w-full align-middle items-center justify-center h-20" ref={noteRef}></div>;
// };

// export default NoteRender;
// NoteRender.jsx
import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

function transformNoteString(note) {
  const match = note.match(/^([A-G]#?)(\d)$/);

  if (!match) {
    throw new Error("Invalid note format");
  }

  const [, letter, octave] = match;
  const newOctave = parseInt(octave, 10) + 1;

  return {
    key: `${letter[0]}/${newOctave}`,
    accidental: letter.length > 1 ? "#" : null,
  };
}

const NoteRender = ({ roundNotes, feedback }) => {
  const VF = Vex.Flow;
  const noteRef = useRef(null);

  useEffect(() => {
    if (noteRef.current) {
      // Clear the previous notation
      noteRef.current.innerHTML = "";

      let processFirst, processSecond;

      if (roundNotes) {
        processFirst = transformNoteString(roundNotes.firstNote);
        processSecond = transformNoteString(roundNotes.secondNote);
        console.log("🚀 ~ NoteRender ~ processFirst:", processFirst);
        console.log("🚀 ~ NoteRender ~ processSecond:", processSecond);
      }

      if (processFirst && processSecond) {
        const renderer = new VF.Renderer(
          noteRef.current,
          VF.Renderer.Backends.SVG
        );
        renderer.resize(250, 200); // Set the size of the SVG element
        const context = renderer.getContext();
        const stave = new VF.Stave(10, 40, 200); // Position and width of the stave
        stave.addClef("treble").setContext(context).draw();

        // Define the notes to be displayed
        const note1 = new VF.StaveNote({
          keys: [processFirst.key],
          duration: "q", // 'q' stands for quarter note
        });

        const note2 = new VF.StaveNote({
          keys: [processSecond.key],
          duration: "q", // 'q' stands for quarter note
        });

        // Add accidentals if present
        if (processFirst.accidental) {
          note1.addAccidental(0, new VF.Accidental(processFirst.accidental));
        }
        if (processSecond.accidental) {
          note2.addAccidental(0, new VF.Accidental(processSecond.accidental));
        }

        // Create a voice in 4/4 and add the notes
        const voice = new VF.Voice({ num_beats: 2, beat_value: 4 });
        voice.addTickables([note1, note2]);

        new VF.Formatter().joinVoices([voice]).format([voice], 100);
        voice.draw(context, stave);
      }
    }
  }, [roundNotes]);

  // Apply classes based on feedback
  const feedbackClass =
    feedback === "correct"
      ? "correct-glow"
      : feedback === "incorrect"
      ? "incorrect-glow"
      : "";

  return (
    <div
      className={`bg-white rounded-lg flex w-full align-middle items-center justify-center h-20 ${feedbackClass}`}
      ref={noteRef}
    ></div>
  );
};

export default NoteRender;
