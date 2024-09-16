export const playMusicSound = (sound: string) => {
  const audio = new Audio(sound)
  audio.play()
}
