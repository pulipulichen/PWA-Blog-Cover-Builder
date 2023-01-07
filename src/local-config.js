let localConfig = {
  canvasSize: 1600,
  title: `這硬體相容Linux嗎?`,
  titleFont: `The Peak Font 隨峰體 Beta`,
  tags: `Linux
Ubuntu
GraphicCardDriver
Nvidia
Tuxedo`,
  tagFont: `Autour One`,
  backgroundImage: `./assets/background/bulletin-board-325721.jpg`,
  coverImage: `./assets/cover/white-faced-heron-7469267_960_720.jpg`,
  coverBackgroundColor: '#FFF',
  coverBackgroundPosition: 0.5,
  previewDebug: false,
  debugZoom: 0.5,
}

// ----------------------------------------------------------------

let localConfigEnv = {
  locale: 'zh-TW'
}

for (let name in localConfigEnv) {
  localConfig[name] = localConfigEnv[name]
}

export default localConfig