import { SIZES } from "./constants";

export const selectSizeHelper = (size, xs, sm, md, lg, xl) => {
    switch (size) {
        case SIZES.XS: return xs;
        case SIZES.SM: return sm;
        case SIZES.MD: return md;
        case SIZES.LG: return lg;
        case SIZES.XL: return xl;
        default: return null;
    }
}