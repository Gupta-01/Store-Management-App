import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Edit, Star } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockStores = [
  { 
    id: 1, 
    name: "Coffee Corner Café", 
    address: "123 Main St, Downtown", 
    rating: 4.5, 
    userRating: 5,
    totalRatings: 234
  },
  { 
    id: 2, 
    name: "Tech Gadgets Plus", 
    address: "456 Tech Ave, Business District", 
    rating: 4.2, 
    userRating: 0,
    totalRatings: 189
  },
  { 
    id: 3, 
    name: "Fresh Market Grocery", 
    address: "789 Market Rd, Residential", 
    rating: 3.8, 
    userRating: 4,
    totalRatings: 156
  },
  { 
    id: 4, 
    name: "BookWorm Library Café", 
    address: "321 Reading Lane, Arts District", 
    rating: 4.7, 
    userRating: 0,
    totalRatings: 98
  },
];

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState(mockStores);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [tempRating, setTempRating] = useState(0);
  const { toast } = useToast();

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRatingSubmit = () => {
    if (selectedStore && tempRating > 0) {
      const updatedStores = stores.map(store => {
        if (store.id === selectedStore.id) {
          const newTotalRatings = store.userRating === 0 ? store.totalRatings + 1 : store.totalRatings;
          const oldTotal = store.rating * (store.userRating === 0 ? store.totalRatings : store.totalRatings);
          const oldUserRating = store.userRating === 0 ? 0 : store.userRating;
          const newRating = (oldTotal - oldUserRating + tempRating) / newTotalRatings;
          
          return {
            ...store,
            userRating: tempRating,
            rating: newRating,
            totalRatings: newTotalRatings
          };
        }
        return store;
      });
      
      setStores(updatedStores);
      setSelectedStore(null);
      setTempRating(0);
      
      toast({
        title: "Rating submitted!",
        description: `You rated ${selectedStore.name} ${tempRating} stars.`,
      });
    }
  };

  const openRatingDialog = (store: any) => {
    setSelectedStore(store);
    setTempRating(store.userRating || 0);
  };

  return (
    <DashboardLayout
      title="Store Directory"
      subtitle="Discover and rate amazing stores in your area"
    >
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Find Stores</CardTitle>
          <CardDescription>
            Search for stores by name or address to view details and submit ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="hover:shadow-medium transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <Badge variant={store.userRating > 0 ? "default" : "secondary"}>
                  {store.userRating > 0 ? "Rated" : "Not Rated"}
                </Badge>
              </div>
              <CardDescription className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{store.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Rating</span>
                  <span className="text-sm text-muted-foreground">({store.totalRatings} reviews)</span>
                </div>
                <StarRating rating={store.rating} readonly />
              </div>

              {store.userRating > 0 && (
                <div>
                  <span className="text-sm font-medium mb-2 block">Your Rating</span>
                  <StarRating rating={store.userRating} readonly />
                </div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gradient-primary text-primary-foreground"
                    onClick={() => openRatingDialog(store)}
                  >
                    {store.userRating > 0 ? (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Update Rating
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Rate Store
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate {selectedStore?.name}</DialogTitle>
                    <DialogDescription>
                      {selectedStore?.userRating > 0 
                        ? "Update your previous rating for this store"
                        : "Share your experience by rating this store"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Your Rating</Label>
                      <div className="flex justify-center">
                        <StarRating
                          rating={tempRating}
                          onRatingChange={setTempRating}
                          size="lg"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current overall rating:</span>
                        <StarRating rating={selectedStore?.rating || 0} readonly size="sm" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on {selectedStore?.totalRatings} reviews
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedStore(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleRatingSubmit}
                      disabled={tempRating === 0}
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      Submit Rating
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No stores found</h3>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;