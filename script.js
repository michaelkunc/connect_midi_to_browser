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
  // console.log('MIDI access object', midiAccess);

  midi = midiAccess;
  var inputs = midi.inputs.values();

  for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIMessage(event){
  data = event.data,
  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0],
  note  = data[1],
  velocity = data[2];

  if (type == 144) {
    noteOn(note, velocity);
  } else {
    noteOff(note, velocity);
  }

  console.log('MIDI data', data);

}

// function frequencyFromNoteNumber(note){
//   return 440 * Math.pow(2, (note-69) / 12);
// }

// will eventually want to create a new osc object right now I am binding the osc to the window. which is
// why I can't play chords
function noteOn(midiNote, velocity){
  this.osc = context.createOscillator();
  this.osc.type = 'sine';

  this.osc.connect(context.destination);
  this.osc.start(context.currentTime);
}

function noteOff(midiNote, velocity){
  this.osc.stop(context.currentTime);
}



function onMIDIFailure(e){
  console.log("No access to your midi device " + e);
}