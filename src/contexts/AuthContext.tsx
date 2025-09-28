import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store';
  storeId?: string;
  rating?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  address: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data - in real app this would come from Supabase
const mockUsers: User[] = [
  {
    id: '1',
    name: 'System Administrator Account',
    email: 'admin@storerating.com',
    address: '123 Admin Street, Business District',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Smith Customer Account',
    email: 'john@example.com',
    address: '456 User Avenue, Residential Area',
    role: 'user'
  },
  {
    id: '3',
    name: 'Coffee Corner Store Manager',
    email: 'store@coffeecorner.com',
    address: '789 Store Boulevard, Commercial Zone',
    role: 'store',
    storeId: '1',
    rating: 4.5
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would be Supabase auth
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'Password123!') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (data: RegisterData) => {
    // Mock registration - in real app this would be Supabase
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      role: 'user'
    };
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const updatePassword = async (newPassword: string) => {
    // Mock password update - in real app this would be Supabase
    console.log('Password updated:', newPassword);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};