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
}


function onMIDIFailure(e){
  console.log("No access to your midi device " + e);
}