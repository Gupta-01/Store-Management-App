import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Star, MessageSquare } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";

// Mock data for store dashboard
const storeData = {
  name: "Coffee Corner Café",
  averageRating: 4.5,
  totalRatings: 234,
  recentRatings: [
    { id: 1, userName: "John Smith Customer Account", rating: 5, date: "2024-01-15", comment: "Amazing coffee and great service!" },
    { id: 2, userName: "Emma Wilson Frequent Visitor", rating: 4, date: "2024-01-14", comment: "Good atmosphere, will come back" },
    { id: 3, userName: "Michael Brown Coffee Lover", rating: 5, date: "2024-01-13", comment: "Best espresso in town!" },
    { id: 4, userName: "Sarah Davis Weekend Regular", rating: 4, date: "2024-01-12", comment: "Love the cozy environment" },
    { id: 5, userName: "Alex Thompson First Timer", rating: 3, date: "2024-01-11", comment: "Good but could be better" },
  ]
};

const ratingDistribution = [
  { stars: 5, count: 145, percentage: 62 },
  { stars: 4, count: 58, percentage: 25 },
  { stars: 3, count: 23, percentage: 10 },
  { stars: 2, count: 5, percentage: 2 },
  { stars: 1, count: 3, percentage: 1 },
];

const StoreDashboard = () => {
  const StatCard = ({ title, value, icon: Icon, description, trend }: any) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          {trend && <TrendingUp className="w-3 h-3 mr-1 text-success" />}
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout
      title={`${storeData.name} Dashboard`}
      subtitle="Monitor your store's ratings and customer feedback"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Average Rating"
          value={storeData.averageRating.toFixed(1)}
          icon={Star}
          description="Based on all customer reviews"
          trend={true}
        />
        <StatCard
          title="Total Reviews"
          value={storeData.totalRatings}
          icon={MessageSquare}
          description="Customer feedback received"
        />
        <StatCard
          title="Recent Activity"
          value="5"
          icon={Users}
          description="New ratings this week"
          trend={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>
              Breakdown of customer ratings by star count
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium">{item.stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <Progress value={item.percentage} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground w-16 text-right">
                  {item.count} ({item.percentage}%)
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overall Rating Display */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>
              Your store's current rating summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {storeData.averageRating.toFixed(1)}
              </div>
              <StarRating rating={storeData.averageRating} readonly size="lg" />
              <p className="text-sm text-muted-foreground mt-2">
                Based on {storeData.totalRatings} customer reviews
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-xl font-semibold text-success">92%</div>
                <div className="text-xs text-muted-foreground">Positive Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-info">4.5</div>
                <div className="text-xs text-muted-foreground">Avg This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Reviews</CardTitle>
          <CardDescription>
            Latest feedback from customers who rated your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeData.recentRatings.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.userName}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={review.rating} readonly size="sm" />
                      <Badge variant={review.rating >= 4 ? "default" : review.rating >= 3 ? "secondary" : "destructive"}>
                        {review.rating}/5
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.comment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Key metrics and trends for your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Strengths</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High customer satisfaction (4.5/5 average)</li>
                <li>• Consistent positive feedback</li>
                <li>• 87% of ratings are 4 stars or higher</li>
                <li>• Recent upward trend in ratings</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Opportunities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Address occasional service speed concerns</li>
                <li>• Maintain quality consistency</li>
                <li>• Encourage more customer feedback</li>
                <li>• Focus on converting 3-star to 4+ star ratings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default StoreDashboard;