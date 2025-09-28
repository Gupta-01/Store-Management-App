import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Store, Star, Plus, Search, Filter } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";

// Mock data
const stats = {
  totalUsers: 2847,
  totalStores: 156,
  totalRatings: 9234
};

const mockStores = [
  { id: 1, name: "Coffee Corner Café", email: "contact@coffeecorner.com", address: "123 Main St, Downtown", rating: 4.5 },
  { id: 2, name: "Tech Gadgets Plus", email: "info@techgadgets.com", address: "456 Tech Ave, Business District", rating: 4.2 },
  { id: 3, name: "Fresh Market Grocery", email: "hello@freshmarket.com", address: "789 Market Rd, Residential", rating: 3.8 },
];

const mockUsers = [
  { id: 1, name: "John Smith Customer Account", email: "john@example.com", address: "456 User Ave", role: "user" },
  { id: 2, name: "Store Manager Sarah Williams", email: "sarah@store.com", address: "789 Business Blvd", role: "store" },
  { id: 3, name: "Admin Assistant Mike Johnson", email: "mike@admin.com", address: "321 Admin St", role: "admin" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const StatCard = ({ title, value, icon: Icon, description }: any) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={() => onClick(id)}
      className={isActive ? "bg-gradient-primary text-primary-foreground" : ""}
    >
      {label}
    </Button>
  );

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="System administration and management"
      actions={
        <Button className="bg-gradient-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      }
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          description="Active platform users"
        />
        <StatCard
          title="Total Stores"
          value={stats.totalStores}
          icon={Store}
          description="Registered businesses"
        />
        <StatCard
          title="Total Ratings"
          value={stats.totalRatings}
          icon={Star}
          description="Submitted reviews"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <TabButton
          id="overview"
          label="Overview"
          isActive={activeTab === "overview"}
          onClick={setActiveTab}
        />
        <TabButton
          id="stores"
          label="Stores"
          isActive={activeTab === "stores"}
          onClick={setActiveTab}
        />
        <TabButton
          id="users"
          label="Users"
          isActive={activeTab === "users"}
          onClick={setActiveTab}
        />
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>
                {activeTab === "stores" ? "Store Management" : 
                 activeTab === "users" ? "User Management" : "System Overview"}
              </CardTitle>
              <CardDescription>
                {activeTab === "stores" ? "Manage registered stores and their information" : 
                 activeTab === "users" ? "Manage platform users and their roles" : "System statistics and recent activity"}
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "stores" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>{store.email}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>
                      <StarRating rating={store.rating} readonly size="sm" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "users" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : user.role === "store" ? "secondary" : "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm">New store registered: "Tech Gadgets Plus"</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                        <span className="text-sm">User "John Smith" submitted a rating</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-sm">Admin "Mike Johnson" added</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Rated Stores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockStores.sort((a, b) => b.rating - a.rating).map((store) => (
                        <div key={store.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{store.name}</span>
                          <StarRating rating={store.rating} readonly size="sm" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;