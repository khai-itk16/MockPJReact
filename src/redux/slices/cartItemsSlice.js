import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter((e) => e.id === newItem.id);
      if (duplicate.length > 0) {
        state.value = state.value.filter((e) => e.id !== newItem.id);
        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            name: newItem.name,
            image: newItem.image,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    minusItem: (state, action) => {
      const payload = action.payload;
      const items = state.value.filter((e) => e.id === payload.id);
      if (items.length > 0) {
        state.value = state.value.filter((e) => e.id !== payload.id);
        if (items[0].quantity > 1) {
          state.value = [
            ...state.value,
            {
              id: items[0].id,
              name: items[0].name,
              image: items[0].image,
              price: items[0].price,
              quantity: items[0].quantity - 1,
            },
          ];
        }
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter((e) => e.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    removeCart: (state, action) => {
      state.value = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, minusItem, removeCart } =
  cartItemsSlice.actions;
export default cartItemsSlice.reducer;
