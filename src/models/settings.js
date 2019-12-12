import {Schema} from "mongoose";

export const settingSchema = new Schema ({
  /* settings Schema */
  vegetarian: {
    type: Boolean,
    default: false
  },
  vegan: {
    type: Boolean,
    default: false
  },
  glutenFree: {
    type: Boolean,
    default: false
  },
  dairyFree: {
    type: Boolean,
    default: false
  }
});