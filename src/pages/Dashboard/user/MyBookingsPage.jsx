import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UpcomingBookings from "./components/MyBookingsSections/UpcomingBookings";
import PastBookings from "./components/MyBookingsSections/PastBookings";
import PendingRequests from "./components/MyBookingsSections/PendingRequests";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../@/components/ui/card";
import { Loader2, AlertCircle, Calendar, Clock, ClipboardList } from "lucide-react";
import { Button } from "../../../../@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../../@/components/ui/alert";

const MyBookings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("requests");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      setIsRefreshing(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const config = { withCredentials: true };

      const [upcomingRes, pastRes, pendingRes] = await Promise.all([
        axios.get(`${baseUrl}/api/orders/user?type=upcoming`, config),
        axios.get(`${baseUrl}/api/orders/user?type=past`, config),
        axios.get(`${baseUrl}/api/orders/user?type=pending`, config),
      ]);

      setUpcomingBookings(upcomingRes.data.data || []);
      setPastBookings(pastRes.data.data || []);
      setPendingRequests(pendingRes.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  // Count badges
  const bookingCounts = {
    requests: pendingRequests.length,
    upcoming: upcomingBookings.length,
    past: pastBookings.length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Loading Your Bookings
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we fetch your booking information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-2" />
            <CardTitle className="text-red-500 dark:text-red-400">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              className="w-full" 
              onClick={() => {
                setLoading(true);
                fetchBookings();
              }}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case "requests":
        return "You don't have any pending booking requests.";
      case "upcoming":
        return "You don't have any upcoming bookings.";
      case "past":
        return "You don't have any past bookings yet.";
      default:
        return "No bookings to display.";
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl text-gray-900 dark:text-white font-bold">My Bookings</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setIsRefreshing(true);
            fetchBookings();
          }}
          disabled={isRefreshing}
          className="flex items-center gap-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400"
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-300 dark:bg-gray-800">
            <TabsTrigger 
              value="requests" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Pending Requests</span>
              <span className="sm:hidden">Requests</span>
              {bookingCounts.requests > 0 && (
                <span className="bg-primary text-primary-foreground dark:bg-primary-600 dark:text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
                  {bookingCounts.requests}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
              {bookingCounts.upcoming > 0 && (
                <span className="bg-primary text-primary-foreground dark:bg-primary-600 dark:text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
                  {bookingCounts.upcoming}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary dark:data-[state=active]:text-primary-foreground"
            >
              <Clock className="h-4 w-4" />
              <span>Past</span>
              {bookingCounts.past > 0 && (
                <span className="bg-primary text-primary-foreground dark:bg-primary-600 dark:text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
                  {bookingCounts.past}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="w-full">
            <TabsContent value="requests" className="mt-0">
              {pendingRequests.length > 0 ? (
                <PendingRequests requests={pendingRequests} onStatusChange={fetchBookings} />
              ) : (
                <EmptyState message={getEmptyStateMessage()} icon={<ClipboardList />} />
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              {upcomingBookings.length > 0 ? (
                <UpcomingBookings bookings={upcomingBookings} onStatusChange={fetchBookings} />
              ) : (
                <EmptyState message={getEmptyStateMessage()} icon={<Calendar />} />
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              {pastBookings.length > 0 ? (
                <PastBookings pastBookings={pastBookings} />
              ) : (
                <EmptyState message={getEmptyStateMessage()} icon={<Clock />} />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Empty state component for when there are no bookings
const EmptyState = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="text-gray-400 dark:text-gray-500 mb-4">
      {React.cloneElement(icon, { className: 'h-12 w-12 text-gray-400 dark:text-gray-500' })}
    </div>
    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
      No bookings found
    </h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
      {message}
    </p>
  </div>
);

export default MyBookings;