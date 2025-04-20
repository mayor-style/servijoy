import { useState, useEffect } from "react";
import { 
  ArrowUpDown, 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Info
} from "lucide-react";
import { format, parseISO } from "date-fns";

// Import our custom component implementations instead of shadcn/ui
import { Tooltip } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Alert, AlertDescription } from "./ui/alert";

const RecentTransactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  
  const itemsPerPage = 5;
  
  const statusColors = {
    Completed: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200" },
    Pending: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-800 dark:text-yellow-200" },
    Cancelled: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200" },
    Processing: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-200" }
  };
  
  const mockData = [
    {
      id: 1,
      user: "Jane Doe",
      service: "House Cleaning",
      amount: 100,
      status: "Completed",
      date: "2025-02-15T10:30:00",
      paymentMethod: "Credit Card"
    },
    {
      id: 2,
      user: "John Smith",
      service: "Plumbing",
      amount: 80,
      status: "Pending",
      date: "2025-02-14T14:45:00",
      paymentMethod: "PayPal"
    },
    {
      id: 3,
      user: "Emily Johnson",
      service: "Electrical Repair",
      amount: 120,
      status: "Completed",
      date: "2025-02-13T09:15:00",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 4,
      user: "Michael Brown",
      service: "Landscaping",
      amount: 200,
      status: "Processing",
      date: "2025-02-12T16:20:00",
      paymentMethod: "Credit Card"
    },
    {
      id: 5,
      user: "Sarah Wilson",
      service: "Pest Control",
      amount: 85,
      status: "Cancelled",
      date: "2025-02-11T11:10:00",
      paymentMethod: "Debit Card"
    },
    {
      id: 6,
      user: "Robert Lee",
      service: "Window Cleaning",
      amount: 60,
      status: "Completed",
      date: "2025-02-10T15:30:00",
      paymentMethod: "PayPal"
    },
    {
      id: 7,
      user: "Lisa Anderson",
      service: "HVAC Maintenance",
      amount: 150,
      status: "Pending",
      date: "2025-02-09T13:45:00",
      paymentMethod: "Credit Card"
    }
  ];

  // Fetch data
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  // Update filtered transactions when search or filters change
  useEffect(() => {
    filterTransactions();
  }, [transactions, searchQuery, statusFilter, sortConfig]);
  
  const fetchTransactions = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        setTransactions(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transactions. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
    setTimeout(() => setRefreshing(false), 1000);
  };
  
  const filterTransactions = () => {
    let filtered = [...transactions];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const key = sortConfig.key;
      
      if (key === "date") {
        return sortConfig.direction === "asc" 
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      
      if (key === "amount") {
        return sortConfig.direction === "asc" 
          ? a[key] - b[key] 
          : b[key] - a[key];
      }
      
      return sortConfig.direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    
    setFilteredTransactions(filtered);
  };
  
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc"
    }));
  };
  
  const exportData = () => {
    const csvContent = [
      ["ID", "User", "Service", "Amount", "Status", "Date", "Payment Method"],
      ...filteredTransactions.map(t => [
        t.id,
        t.user,
        t.service,
        `$${t.amount}`,
        t.status,
        format(parseISO(t.date), "MMM dd, yyyy"),
        t.paymentMethod
      ])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(3).fill().map((_, index) => (
      <tr key={`skeleton-${index}`} className="animate-pulse">
        <td className="px-4 py-2"><Skeleton className="h-6 w-24" /></td>
        <td className="px-4 py-2"><Skeleton className="h-6 w-32" /></td>
        <td className="px-4 py-2"><Skeleton className="h-6 w-16" /></td>
        <td className="px-4 py-2"><Skeleton className="h-6 w-20 rounded-full" /></td>
        <td className="px-4 py-2"><Skeleton className="h-6 w-24" /></td>
        <td className="px-4 py-2"><Skeleton className="h-6 w-8" /></td>
      </tr>
    ));
  };
  
  // Render sort indicator
  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-1 h-4 w-4 inline" />;
    return sortConfig.direction === "asc" 
      ? <ArrowUp className="ml-1.5 h-4 w-4 inline text-blue-500" /> 
      : <ArrowDown className="ml-1.5 h-4 w-4 inline text-blue-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          Recent Transactions
          <Tooltip content="View and manage your most recent transactions">
            <Info className="ml-2 h-4 w-4 text-gray-400" />
          </Tooltip>
        </h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportData}
            disabled={loading || filteredTransactions.length === 0}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-2 w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                {statusFilter === "all" ? "All Statuses" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["all", "Completed", "Pending", "Processing", "Cancelled"].map((status) => (
                <DropdownMenuItem 
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  {status === "all" ? "All Statuses" : status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Error alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {/* Empty state */}
      {!loading && filteredTransactions.length === 0 && (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Transactions table */}
      {(loading || filteredTransactions.length > 0) && (
        <div className="overflow-x-auto overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition">
            <thead className="bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 sticky top-0 z-10">
              <tr>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("user")}
                >
                  <span className="flex items-center">
                    User {renderSortIndicator("user")}
                  </span>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("service")}
                >
                  <span className="flex items-center">
                    Service {renderSortIndicator("service")}
                  </span>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <span className="flex items-center">
                    Amount {renderSortIndicator("amount")}
                  </span>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <span className="flex items-center">
                    Status {renderSortIndicator("status")}
                  </span>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <span className="flex items-center">
                    Date {renderSortIndicator("date")}
                  </span>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? renderSkeletons() : paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    {transaction.user}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    {transaction.service}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300 font-medium">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant="outline" 
                      className={`px-2 py-1 ${statusColors[transaction.status].bg} ${statusColors[transaction.status].text}`}
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    <Tooltip content={format(parseISO(transaction.date), "PPpp")}>
                      <span>{format(parseISO(transaction.date), "MMM dd, yyyy")}</span>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination */}
      {!loading && filteredTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;