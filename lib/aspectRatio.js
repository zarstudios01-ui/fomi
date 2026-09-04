const ASPECT_CLASS = {
  "16:9": "aspect-[16/9]",
  "9:16": "aspect-[9/16]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-[1/1]",
  "2:3": "aspect-[2/3]",
};

export function aspectRatioClass(ratio) {
  return ASPECT_CLASS[ratio] || ASPECT_CLASS["16:9"];
}
