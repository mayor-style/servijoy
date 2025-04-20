import React, { useState } from "react";
import { Search, Plus, FileDown, Filter, X, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/AdminHomePage/ui/dropdown-menu";
import { Button } from "../../components/AdminHomePage/ui/button";
import { Input } from "../../components/AdminHomePage/ui/input";
import { Badge } from "../../components/AdminHomePage/ui/badge";

const UsersVendorsHeader = ({ 
  onSearch = () => {}, 
  onAddUser = () => {}, 
  onAddVendor = () => {}, 
  onExport = () => {},
  onFilterChange = () => {},
  totalUsers = 0,
  totalVendors = 0
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      const newFilters = [...activeFilters, filter];
      setActiveFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const removeFilter = (filter) => {
    const newFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const filterOptions = [
    { label: "Active", value: "status:active" },
    { label: "Inactive", value: "status:inactive" },
    { label: "Admin", value: "role:admin" },
    { label: "User", value: "role:user" },
    { label: "Vendor", value: "type:vendor" }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8 transition-all border border-gray-100 dark:border-gray-800">
      {/* Header Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            Users & Vendors Management
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {totalUsers} Users
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {totalVendors} Vendors
              </Badge>
            </div>
          </h1>
          <div className="text-gray-600 dark:text-gray-400 text-sm mt-1 flex items-center">
            <a href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Dashboard
            </a>
            <span className="mx-2">/</span>
            <span className="font-medium">Users & Vendors</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, role, or status..."
              className="pl-10 pr-32 py-2 w-full border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Advanced
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isAdvancedSearch ? 'rotate-180' : ''}`} />
              </Button>
              <Button type="submit" variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>
          </div>
        </form>

        {isAdvancedSearch && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                  <option value="">Any Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                  <option value="">Any Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                  <option value="">All Types</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                Reset
              </Button>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge 
                key={filter} 
                variant="outline" 
                className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {filterOptions.find(f => f.value === filter)?.label}
                <button onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => {
                setActiveFilters([]);
                onFilterChange([]);
              }}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-grow space-y-2 sm:space-y-0 sm:space-x-2 flex flex-wrap">
          <Button 
            onClick={onAddUser}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
          <Button 
            onClick={onAddVendor}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => addFilter("status:active")}>Active Users</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addFilter("status:inactive")}>Inactive Users</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => addFilter("role:admin")}>Admins</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addFilter("role:user")}>Regular Users</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => addFilter("type:vendor")}>Vendors Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                onClick={onExport}
                variant="outline" 
                className="border-gray-300 dark:border-gray-700"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UsersVendorsHeader;