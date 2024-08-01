// Automatically generated by GDevelop.js/scripts/generate-types.js
declare class gdLoadingScreen {
  constructor(): void;
  isGDevelopLogoShownDuringLoadingScreen(): boolean;
  showGDevelopLogoDuringLoadingScreen(show: boolean): gdLoadingScreen;
  getGDevelopLogoStyle(): string;
  setGDevelopLogoStyle(value: string): gdLoadingScreen;
  getBackgroundImageResourceName(): string;
  setBackgroundImageResourceName(value: string): gdLoadingScreen;
  getBackgroundColor(): number;
  setBackgroundColor(value: number): gdLoadingScreen;
  getBackgroundFadeInDuration(): number;
  setBackgroundFadeInDuration(value: number): gdLoadingScreen;
  getMinDuration(): number;
  setMinDuration(value: number): gdLoadingScreen;
  getLogoAndProgressFadeInDuration(): number;
  setLogoAndProgressFadeInDuration(value: number): gdLoadingScreen;
  getLogoAndProgressLogoFadeInDelay(): number;
  setLogoAndProgressLogoFadeInDelay(value: number): gdLoadingScreen;
  getShowProgressBar(): boolean;
  setShowProgressBar(value: boolean): gdLoadingScreen;
  getProgressBarMaxWidth(): number;
  setProgressBarMaxWidth(value: number): gdLoadingScreen;
  getProgressBarMinWidth(): number;
  setProgressBarMinWidth(value: number): gdLoadingScreen;
  getProgressBarWidthPercent(): number;
  setProgressBarWidthPercent(value: number): gdLoadingScreen;
  getProgressBarHeight(): number;
  setProgressBarHeight(value: number): gdLoadingScreen;
  getProgressBarColor(): number;
  setProgressBarColor(value: number): gdLoadingScreen;
  serializeTo(element: gdSerializerElement): void;
  unserializeFrom(element: gdSerializerElement): void;
  delete(): void;
  ptr: number;
};