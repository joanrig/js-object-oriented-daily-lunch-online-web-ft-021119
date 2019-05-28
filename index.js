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
    return store.customers.filter(customer =>
      customer.neighborhoodId === this.id
    )
  }

  // broken
  meals() {
    let meals = this.deliveries().map(
      delivery => delivery.meal())
    return [... new Set(meals)]
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

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal){
      return sum + meal.price
    }, 0)
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

  static byPrice(){
    return store.meals.sort(function (a,b){
      return b.price - a.price
    })
  }
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
    return store.meals.find(meal => {
      return meal.id = this.mealId
    })
  }

  customer(){
    return store.customers.find(customer => customer.id = this.customerId
    )
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id = this.neighborhoodId
    )
  }
}
