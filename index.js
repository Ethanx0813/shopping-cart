// Singleton Pattern: Shopping Cart
class ShoppingCart {
    constructor() {
      if (ShoppingCart.instance) {
        return ShoppingCart.instance;
      }
      this.items = [];
      ShoppingCart.instance = this;
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    addItem(item) {
      this.items.push(item);
      this.notifyObservers(item, 'added');
    }
  
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.notifyObservers(item, 'removed');
      }
    }
  
    notifyObservers(item, action) {
      this.observers.forEach(observer => observer.update(item, action, this.items));
    }
  }
  
  // Observer Pattern: User Notification
  class UserNotification {
    constructor(name) {
      this.name = name;
    }
  
    update(item, action, items) {
      console.log(`${this.name} received a notification: Item ${item} ${action}. Cart: ${items}`);
    }
  }
  
  // Factory Pattern: Payment Method
  class PaymentMethodFactory {
    createPaymentMethod(type) {
      switch (type) {
        case 'credit':
          return new CreditCardPayment();
        case 'paypal':
          return new PayPalPayment();
        default:
          throw new Error('Invalid payment method type');
      }
    }
  }
  
  class CreditCardPayment {
    processPayment() {
      console.log('Processing credit card payment...');
    }
  }
  
  class PayPalPayment {
    processPayment() {
      console.log('Processing PayPal payment...');
    }
  }
  
  // Usage
  const shoppingCart = new ShoppingCart();
  
  const user1 = new UserNotification('Alice');
  const user2 = new UserNotification('Bob');
  
  shoppingCart.addObserver(user1);
  shoppingCart.addObserver(user2);
  
  shoppingCart.addItem('Product A'); // Output: Alice received a notification: Item Product A added. Cart: Product A
  
  const paymentFactory = new PaymentMethodFactory();
  const creditPayment = paymentFactory.createPaymentMethod('credit');
  const paypalPayment = paymentFactory.createPaymentMethod('paypal');
  creditPayment.processPayment(); // Output: Processing credit card payment...
  