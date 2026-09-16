import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  isWishlistOpen: boolean;
}

const initialState: WishlistState = {
  items: [],
  isWishlistOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const newItem = action.payload;
      
      // Clean up legacy strings from persisted state
      state.items = state.items.filter(item => typeof item === 'object' && item !== null && item.id);

      const existingIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(newItem);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
    toggleWishlistDrawer(state) {
      state.isWishlistOpen = !state.isWishlistOpen;
    }
  },
});

export const { toggleWishlist, clearWishlist, toggleWishlistDrawer } = wishlistSlice.actions;

export const selectWishlistCount = (state: { wishlist: WishlistState }) => 
  state.wishlist.items.filter(item => typeof item === 'object' && item !== null && item.price !== undefined).length;

export default wishlistSlice.reducer;
