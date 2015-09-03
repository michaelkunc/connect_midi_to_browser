console.log('is this thing on?');

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

function onMIDIMessage(event){
  data = event.data,
  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0] & 0xf,
  note  = data[1],
  velocity = data[2];

  switch (type) {
    case 144:
      noteOn(note,velocity);
      break;
    case 128:
      noteOff(note, velocity);
      break;
  }


  console.log('MIDI data', data);

}

function frequencyFromNoteNumber(note){
  return 440 * Math.pow(2, (note-69) / 12);
}


function noteOn(midiNote, velocity){
  player(midiNote, velocity);
}

function noteOff(midiNote, velocity){
  player(midiNote, velocity);
}



function onMIDIFailure(e){
  console.log("No access to your midi device " + e);
}