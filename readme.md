# YouTube Music [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

![Screenshot](screenshot.jpg "Screenshot")

**Electron wrapper around YouTube Music featuring:**

- Native look & feel, aims at keeping the original interface
- Framework for custom plugins: change YouTube Music to your needs (style, content, features), enable/disable plugins in one click

## Download

You can check out the [latest release](https://github.com/th-ch/youtube-music/releases/latest) to quickly find the latest version.
Here are the links to the current version:

- [Mac](https://github.com/th-ch/youtube-music/releases/download/v1.0.0/youtube-music-1.0.0.dmg)
- [Windows](https://github.com/th-ch/youtube-music/releases/download/v1.0.0/youtube-music-setup-1.0.0.exe)
- [Linux](https://github.com/th-ch/youtube-music/releases/download/v1.0.0/youtube-music-1.0.0-x86_64.AppImage)

## Available plugins:

- **Ad Blocker**: block all ads and tracking out of the box
- **No Google Login**: remove Google login buttons and links from the interface
- **Shortcuts**: use your usual shortcuts (media keys, Ctrl/CMD + F…) to control YouTube Music
- **Navigation**: next/back navigation arrows directly integrated in the interface, like in your favorite browser

## Dev

```
git clone https://github.com/th-ch/youtube-music
cd youtube-music
npm install
npm start
```

## Build your own plugins

Using plugins, you can:

- manipulate the app - the `BrowserWindow` from electron is passed to the plugin handler
- change the front by manipulating the HTML/CSS

### Creating a plugin

Create a folder in `plugins/YOUR-PLUGIN-NAME`:

- if you need to manipulate the BrowserWindow, create a file `back.js` with the following template:

```
module.exports = win => {
	// win is the BrowserWindow object
};
```

- if you need to change the front, create a file `front.js` with the following template:

```
module.exports = () => {
	// This function will be called as a preload script
	// So you can use front features like `document.querySelector`
};
```

### Common use cases

- injecting custom CSS: create a `style.css` file in the same folder then:

```
// back.js
module.exports = win => {
	injectCSS(win.webContents, path.join(__dirname, "style.css"));
};
```

- changing the HTML:

```
// front.js
module.exports = () => {
	// Remove the login button
	document.querySelector('.sign-in-link.ytmusic-nav-bar').remove();
};
```

- communicating between the front and back: can be done using the ipcMain module from electron. See `utils.js` file and example in `navigation` plugin.

## Build

```
$ npm run build
```

Builds the app for macOS, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).

## License

MIT © [th-ch](https://github.com/th-ch/youtube-music)
