// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let NeighborhoodId = 0
let CustomerId = 0
let MealId = 0
let DeliveryId = 0



class Neighborhood {
  constructor(name, price, user) {
    this.id = ++NeighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>
      delivery.neighborhoodId === this.id
    )
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customers())
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meals())
  }
}


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++CustomerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id
    )
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }
}


class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++MealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }

  // byPrice() {
  //
  // }
}



class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++DeliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.filter(meal => {
      return meal.deliveryId = this.id
    })
  }

  customer(){
    return store.customers.filter(customer => {
      return customer.deliveryId = this.id
    })

  }

  neighborhood() {
    return store.neighborhoods.filter(neighborhood => {
      return neighborhood.deliveryId = this.id
    })

  }




}
