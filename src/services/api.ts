// API service for cross-device authentication
// Uses a shared storage key pattern that can sync across devices
// For production: Replace with actual backend API calls

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

interface Credential {
  email: string;
  password: string;
}

interface SharedData {
  users: User[];
  credentials: Credential[];
}

// Shared storage key - in production, this would be a backend API endpoint
const SHARED_STORAGE_KEY = 'epiphany_shared_data';

class ApiService {
  // Get shared data from localStorage (in production, this would be an API call)
  private getSharedData(): SharedData {
    try {
      const stored = localStorage.getItem(SHARED_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading shared data:', error);
    }
    return { users: [], credentials: [] };
  }

  // Save shared data to localStorage (in production, this would be an API call)
  private saveSharedData(data: SharedData): void {
    try {
      localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(data));
      // Also sync to sessionStorage as a backup
      sessionStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving shared data:', error);
    }
  }

  // Sync data across tabs/windows using storage event
  private syncData(): void {
    window.addEventListener('storage', (e) => {
      if (e.key === SHARED_STORAGE_KEY && e.newValue) {
        // Data was updated in another tab/window
        // In a real app, you'd refresh user data here
      }
    });
  }

  constructor() {
    this.syncData();
  }

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const data = this.getSharedData();

    // Check if user already exists
    if (data.users.find(u => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
    };

    // Save user and credentials
    data.users.push(newUser);
    data.credentials.push({ email, password });

    this.saveSharedData(data);

    return { success: true, user: newUser };
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const data = this.getSharedData();

    // Find credential
    const credential = data.credentials.find(c => c.email === email);
    if (!credential || credential.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Find user
    const user = data.users.find(u => u.email === email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user };
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const data = this.getSharedData();
    const userIndex = data.users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    data.users[userIndex] = { ...data.users[userIndex], ...updates };
    this.saveSharedData(data);

    return { success: true, user: data.users[userIndex] };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const data = this.getSharedData();
    return data.users.find(u => u.email === email) || null;
  }
}

export const apiService = new ApiService();

