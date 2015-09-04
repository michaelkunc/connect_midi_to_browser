console.log('is this thing on?');

var context = new AudioContext(),
  masterVolume = context.createGain();
  masterVolume.connect(context.destination);


// requesting midi access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert('No MIDI support in your browser');
}

function onMIDISuccess(midiAccess){
  console.log('MIDI access object', midiAccess);

  midi = midiAccess;
  var inputs = midi.inputs.values();

  for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function Note(waveform, context, note, velocity)
{
  this.note = note;
  this.velocity = velocity;
  this.osc = context.createOscillator();
  this.type = waveform;
  this.osc.connect(context.destination);
}

Note.prototype.noteOn(){

  this.osc.start(context.currentTime);
}

Note.prototype.noteOff(){
  this.osc.stop(context.currentTime);
}

// function frequencyFromNoteNumber(note){
//   return 440 * Math.pow(2, (note-69) / 12);
// }

function onMIDIMessage(event){
  data = event.data,
  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0],
  note  = data[1],
  velocity = data[2];
  var sound;
  if (type == 144) {
     sound = new Note('sine', context, note, velocity);
  } else {
    sound.noteOff();
  }

  console.log('MIDI data', data);

}

function onMIDIFailure(e){
  console.log("No access to your midi device " + e);
}