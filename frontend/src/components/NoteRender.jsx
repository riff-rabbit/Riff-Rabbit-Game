import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';



// const handleNotes = () => {
// let firstNote = 'D/4';
// let secondNote = 'F/4';
// }

function transformNoteString(note) {
    // Use a regular expression to match the note components
    const match = note.match(/^([A-G]#?)(\d)$/);

    if (!match) {
        throw new Error('Invalid note format');
    }

    const [, letter, octave] = match;
    const newOctave = parseInt(octave, 10) + 1;

    return `${letter}/${newOctave}`;
}


// let firstNote = 'D/4';
// let secondNote = 'F/4';
const NoteRender = ({roundNotes}) => {


    


    
    const VF = Vex.Flow;
    const noteRef = useRef(null);

    useEffect(() => {

        let processFirst, processSecond;

    if (roundNotes) {
        processFirst = transformNoteString(roundNotes.firstNote);
        processSecond = transformNoteString(roundNotes.secondNote);
        console.log("🚀 ~ NoteRender ~ processFirst:", processFirst);
        console.log("🚀 ~ NoteRender ~ processSecond:", processSecond);
    }
    // when it did work but duplciates : (noteRef.current && processFirst && processSecond) 
        if (noteRef.current) {
            if (processFirst && processSecond) {
            
            const renderer = new VF.Renderer(noteRef.current, VF.Renderer.Backends.SVG);
            renderer.resize(250, 200); // Set the size of the SVG element
            const context = renderer.getContext();
            const stave = new VF.Stave(10, 40, 200); // Position and width of the stave
            stave.addClef('treble').setContext(context).draw();

            // Define the notes to be displayed
            const note1 = new VF.StaveNote({
                keys: [processFirst],
                duration: 'q', // 'q' stands for quarter note
            });

            const note2 = new VF.StaveNote({
                keys: [processSecond],
                duration: 'q' // 'q' stands for quarter note
            });

            // Create a voice in 4/4 and add the notes
            const voice = new VF.Voice({num_beats: 2, beat_value: 4});
            voice.addTickables([note1, note2]);


            new VF.Formatter().joinVoices([voice]).format([voice], 100);
            voice.draw(context, stave);
        }
    }
    }, [roundNotes]);

    return (
        <div ref={noteRef}></div> 
    );
};

export default NoteRender;