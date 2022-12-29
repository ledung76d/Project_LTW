import { UPDATE, ADD, REMOVE } from './actions'

const initialStore = {
  id: 1,
  contactNumber: '19365141641631',
  shippingAddress: [
    {
      id: 1,
      address: '2148 Straford Park, KY, Winchester, 40391, United States',
    },
  ],
  deliverySchedule: 'Express Delivery',
}

function reducer(state = initialStore, action) {
  if (action.type === UPDATE) {
    return { ...state, contactNumber: '' }
  }
  return state
}

export default reducer
