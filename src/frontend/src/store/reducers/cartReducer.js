import actionTypes from "../actions/actionTypes";

const initialCart = {
  numberCart: 0,
  Carts: [],
};

const appReducer = (state = initialCart, action) => {
  switch (action.type) {
    case actionTypes.GET_NUMBER_CART:
      return {
        ...state,
      };

    case actionTypes.ADD_CART:
      if (state.numberCart === 0) {
        let item = {
          pid: action.payload.pid,
          quantity: 1,
          title: action.payload.title,
          img: action.payload.img,
          unit: action.payload.unit,
          price: Number.parseFloat(
            (
              (Math.round(action.payload.price * 100) / 100) *
              (1 - action.payload.discount / 100)
            ).toFixed(2)
          ),
        };
        state.Carts.push(item);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.pid === action.payload.pid) {
            state.Carts[key].quantity++;
            check = true;
          }
        });
        if (check === false) {
          let item = {
            pid: action.payload.pid,
            quantity: 1,
            title: action.payload.title,
            img: action.payload.img,
            unit: action.payload.unit,
            price: Number.parseFloat(
              (
                (Math.round(action.payload.price * 100) / 100) *
                (1 - action.payload.discount / 100)
              ).toFixed(2)
            ),
          };
          state.Carts.push(item);
        }
      }

      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case actionTypes.INCREASE_QUANTITY:
      state.numberCart++;
      let id = action.payload;
      state.Carts.map((item, key) => {
        if (item.pid === id) {
          item.quantity++;
        }
      });
      return {
        ...state,
      };

    case actionTypes.DECREASE_QUANTITY:
      let pid = action.payload; //Paylod la id san pham muon tang so luon
      state.Carts.map((item, key) => {
        if (item.quantity >= 1 && item.pid === pid) {
          item.quantity--;
          state.numberCart--;
        }
      });
      let arr = state.Carts.filter((item) => item.quantity !== 0);
      state.Carts = arr;
      return {
        ...state,
        Carts: arr,
      };

    case actionTypes.DELETE_ITEM:
      let did = action.payload; //Paylod la id san pham muon tang so luon
      let arr1 = state.Carts.filter((item) => item.pid !== did);
      let number = 0;
      arr1.map((item) => {
        number = number + item.quantity;
      });
      state.Carts = arr1;
      return {
        numberCart: number,
        Carts: arr1,
      };

    case actionTypes.DELETE_CART:
      return {
        numberCart: 0,
        Carts: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
