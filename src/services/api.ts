// API service for authentication
// Connects to the local Express backend

const API_URL = '/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export class ApiService {

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  static async createBooking(bookingData: any) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return await response.json();
  }

  static async getUserBookings(userId: string) {
    const response = await fetch(`${API_URL}/bookings/${userId}`);
    return await response.json();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/users/email/${email}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // --- Events API ---

  async getEvents(): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Get events error:', error);
      return [];
    }
  }

  async createEvent(eventData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      return await response.json();
    } catch (error) {
      console.error('Create event error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async deleteEvent(eventId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Delete event error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // --- Products API ---

  async getProducts(): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.warn('Backend unavailable (products), using mock data instead');
      return [];
    }
  }

  async getUserProducts(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/products/user/${userId}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.warn('Backend unavailable (user products), using local data');
      return [];
    }
  }

  async createProduct(productData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error('Create product error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async deleteProduct(productId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Delete product error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // --- Experiences API ---

  async getExperiences(): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/experiences`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.warn('Backend unavailable (experiences), using mock data instead');
      return [];
    }
  }
}

export const apiService = new ApiService();

