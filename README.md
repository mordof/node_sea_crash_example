## What is this Repo for?

Investigating a Node SEA app that uses node-raylib for making raylib games in javascript. However the SEA bundled version either fails to initialize the DLL (the original raylib 4.5 released version), or completely silently crashes with no feedback (the fresh compile raylib 5.5 version).

## How to use/test?

My latest test, while making this, was with Node version 24.6.0. However I've also tried LTS v22, and LTS v20 with the same behavior described here.

As mentioned above, there's two versions of the node-raylib DLL supplied and setup in this project. The original is the one found in node-raylib's releases, which is based on the c++ raylib version 4.5.  The fresh_compile version is from node-raylib's master branch compiled by me, which is based on the c++ raylib version 5.5. Both versions have been fully set up to test running as the script directly, as well as being bundled into a SEA to be launched.

First, let's run the two versions as scripts so we confirm they are working as intended. I've set up the `src/original.js` and `src/fresh_compile.js` so that they can be easily run as scripts, and with no modification, can be bundled into the SEA.

### Running the script versions

To run the original, run `npm run script_original`. This will bring up a raylib window congratulating you on your first raylib window.
To run the fresh compile, run `npm run script_fresh_compile`. The behavior will match that of the script_original's. 

The only thing different between the two is the dll loaded, and the wrapper added around the dll (to match the version of the dll interface).

### Prepping for bundling the SEA apps

Since we're using the `postject` package, run `npm i` to install that. (the commands use npx so it may work without installing, I am unsure - haven't bothered to test).

### Bundling the SEA apps

#### Bundling the Original

run `npm run build_original`. 

This copies, the Node exe being utilized and places it in the dist folder, renaming it to `original.exe`.
It then builds the Blob (referring to `original_sea.json` for details), placing it also in the dist folder.
Lastly, it injects the Blob it just made into the `original.exe` (the postject command has the `--overwrite` flag, so if this gets run again with changes, those changes _will_ be injected).

To run the bundle, run `./dist/original.exe`.  

The behavior I've been getting is that the DLL failed to initialize. No amount of attempts at relocating the dll to match original structures or other attempts would work to resolve this.

#### Bundling the Fresh Compile

run `npm run build_fresh_compile`. 

(these steps are the same as the Original, just with the names adjusted, fyi)
This copies, the Node exe being utilized and places it in the dist folder, renaming it to `fresh_compile.exe`.
It then builds the Blob (referring to `fresh_compile_sea.json` for details), placing it also in the dist folder.
Lastly, it injects the Blob it just made into the `fresh_compile.exe` (the postject command has the `--overwrite` flag, so if this gets run again with changes, those changes _will_ be injected).

To run the bundle, run `./dist/fresh_compile.exe`.  

The behavior I've been getting here is different from the original. This version silently crashes without any error messages, or trace that I can find (except the last program status does show as failed, but I couldn't find an exit code using powershell).