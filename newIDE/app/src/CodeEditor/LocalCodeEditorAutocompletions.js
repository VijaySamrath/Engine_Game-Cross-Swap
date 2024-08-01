//@flow
import { findGDJS } from '../GameEngineFinder/LocalGDJSFinder';
import optionalRequire from '../Utils/OptionalRequire';
const fs = optionalRequire('fs');
const path = optionalRequire('path');

export const setupAutocompletions = (monaco: any) => {
  const importAllJsFilesFromFolder = (folderPath: string) =>
    fs.readdir(folderPath, (error: ?Error, filenames: Array<string>) => {
      if (error) {
        console.error(
          'Unable to read GDJS files for setting up autocompletions:',
          error
        );
        return;
      }

      filenames.forEach(filename => {
        const isDirectory = fs
          .lstatSync(path.join(folderPath, filename))
          .isDirectory();
        if (
          (filename.endsWith('.ts') || filename.endsWith('.js')) &&
          // Dialogue tree uses a folder called `bondage.js` that should not be read as a file.
          !isDirectory
        ) {
          const fullPath = path.join(folderPath, filename);
          fs.readFile(fullPath, 'utf8', (fileError, content) => {
            if (fileError) {
              console.error(
                `Unable to read ${fullPath} for setting up autocompletions:`,
                fileError
              );
              return;
            }

            monaco.languages.typescript.javascriptDefaults.addExtraLib(
              content,
              fullPath
            );
          });
        }
      });
    });

  findGDJS().then(({ gdjsRoot }) => {
    // Autocompletions are generated by reading the sources of the game engine
    // (much like how autocompletions work in Visual Studio Code) - *not* the built files.
    // The built files are stripped of their types and documentation, so it would
    // not work.
    //
    // We could also use the TypeScript compiler to emit .d.ts files when building GDJS,
    // but this would make TypeScript slower (at least 2x slower) and we would still need
    // to copy and read an equivalent number of files.
    const runtimePath = path.join(gdjsRoot, 'Runtime-sources');
    const runtimeTypesPath = path.join(runtimePath, 'types');
    const runtimeLibsPath = path.join(runtimePath, 'libs');
    const runtimePixiRenderersPath = path.join(runtimePath, 'pixi-renderers');
    const runtimeHowlerSoundManagerPath = path.join(
      runtimePath,
      'howler-sound-manager'
    );
    const runtimeFontfaceobserverFontManagerPath = path.join(
      runtimePath,
      'fontfaceobserver-font-manager'
    );
    const extensionsPath = path.join(runtimePath, 'Extensions');
    const eventToolsPath = path.join(runtimePath, 'events-tools');

    importAllJsFilesFromFolder(runtimePath);
    importAllJsFilesFromFolder(runtimeTypesPath);
    importAllJsFilesFromFolder(runtimeLibsPath);
    importAllJsFilesFromFolder(runtimePixiRenderersPath);
    importAllJsFilesFromFolder(runtimeHowlerSoundManagerPath);
    importAllJsFilesFromFolder(runtimeFontfaceobserverFontManagerPath);
    importAllJsFilesFromFolder(eventToolsPath);
    fs.readdir(extensionsPath, (error: ?Error, folderNames: Array<string>) => {
      if (error) {
        console.error(
          'Unable to read Extensions folders for setting up autocompletions:',
          error
        );
        return;
      }

      folderNames
        .filter(
          folderName =>
            !folderName.endsWith('.txt') &&
            !folderName.endsWith('.md') &&
            !folderName.endsWith('.flow.js') &&
            !folderName.endsWith('.d.ts') &&
            !folderName.endsWith('.gitignore')
        )
        .forEach(folderName =>
          importAllJsFilesFromFolder(path.join(extensionsPath, folderName))
        );
    });

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
/** Represents the scene being played. */
var runtimeScene = new gdjs.RuntimeScene();

/**
 * The instances of objects that are passed to your JavaScript function.
 * @type {gdjs.RuntimeObject[]}
 */
var objects = [];

/**
 * @type {EventsFunctionContext}
 */
var eventsFunctionContext = {};
`,
      'this-mock-the-context-of-events.js'
    );
  });
};