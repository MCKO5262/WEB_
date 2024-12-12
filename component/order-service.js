export class OrderService {
  static async getOrders() {
    try {
      const response = await fetch('/json/order.json');
      if (!response.ok) {
        throw new Error('Failed to load orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }
}