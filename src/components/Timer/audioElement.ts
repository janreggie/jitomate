// For audio (see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API).
// @ts-ignore webkitAudioContext may exist in other browsers
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
const audioElement = document.querySelector('audio')! // Exclamation pt b/c YES, IT EXISTS! Check /index.html
const track = audioContext.createMediaElementSource(audioElement)
track.connect(audioContext.destination)

export default audioElement
