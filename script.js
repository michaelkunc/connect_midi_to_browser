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

function onMIDIMessage(message){
  data = message.data;
  console.log('MIDI data', data);

}


function onMIDIFailure(e){
  console.log("No access to your midi device " + e);
}