# How to build

```npm install```
```npm run tauri dev```
This will launch the development server and compile the app. Changes to anything in /src-tauri will trigger a recompile.

## Dependencies
- npm
- tauri
- rust
Tauri lists dependencies to build tauri projects.
https://tauri.app/start/prerequisites/

I recommend using the nix-shell, but if that isn't available, packages can be installed according to your distribution.
Mac and Windows users just need to follow the instructions to install XCode and MS C++ build tools respectively, along with rust.
