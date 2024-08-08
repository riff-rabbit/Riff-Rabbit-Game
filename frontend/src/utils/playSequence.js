import * as Tone from 'tone';

const playSequence = async (note1, note2) => {
  // Start the audio context
  await Tone.start();
  console.log("Audio context started");

  // Create a sampler
  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
      const now = Tone.now();
      sampler.triggerAttackRelease(note1, "8n", now);
      sampler.triggerAttackRelease(note2, "8n", now + 0.5);
    }
  }).toDestination();
};

export default playSequence