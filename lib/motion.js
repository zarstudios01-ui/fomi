/**
 * Every animated interaction in the app pulls its timing from here.
 * Durations are deliberately short — the product should feel fast,
 * not demo-reel. If a component needs a duration not listed below,
 * that's a sign to reconsider the interaction, not to invent a new number.
 */
export const MOTION = {
  hover: 150, // color/background transitions on hover
  press: 100, // button active/press feedback
  panel: 250, // side panel / drawer slide (tablet Creative Direction)
  sheet: 300, // bottom sheet slide-up (mobile Creative Direction)
  reveal: 450, // generation result fading/rising into place
};

// Tailwind duration utility class names matching the values above,
// so components reference MOTION_CLASSES.hover instead of retyping
// "duration-150" and risking drift from the constant.
export const MOTION_CLASSES = {
  hover: "duration-150",
  press: "duration-100",
  panel: "duration-[250ms]",
  sheet: "duration-300",
  reveal: "duration-[450ms]",
};
