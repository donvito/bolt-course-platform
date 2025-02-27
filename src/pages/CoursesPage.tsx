import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, LayoutGrid, List, Star, Clock, 
  BarChart3, ChevronDown, X, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import { coursesData } from '../data/courses';

type ViewMode = 'grid' | 'list';
type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';

interface CourseFilters {
  category: string | null;
  level: string | null;
  priceRange: [number, number];
  searchTerm: string;
}

export const CoursesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [filters, setFilters] = useState<CourseFilters>({
    category: null,
    level: null,
    priceRange: [0, 500],
    searchTerm: '',
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close sort dropdown when clicking outside
      if (showSortDropdown && !(event.target as Element).closest('.sort-dropdown')) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);

  // Extract unique categories and levels from courses
  const categories = Array.from(new Set(coursesData.map(course => course.category)));
  const levels = Array.from(new Set(coursesData.map(course => course.level)));

  // Filter and sort courses
  const filteredCourses = coursesData.filter(course => {
    // Filter by category
    if (filters.category && course.category !== filters.category) return false;
    
    // Filter by level
    if (filters.level && course.level !== filters.level) return false;
    
    // Filter by price range
    if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) return false;
    
    // Filter by search term
    if (filters.searchTerm && !course.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.rating * 100) - (a.rating * 100);
      case 'newest':
        return 0; // Assuming we don't have date data, this is a placeholder
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleCategoryChange = (category: string | null) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleLevelChange = (level: string | null) => {
    setFilters(prev => ({ ...prev, level }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    setFilters(prev => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = newValue;
      return { ...prev, priceRange: newRange };
    });
  };

  const handleSortOptionClick = (option: SortOption) => {
    setSortBy(option);
    setShowSortDropdown(false);
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      level: null,
      priceRange: [0, 500],
      searchTerm: '',
    });
  };

  // Function to get the sort label based on the current sort option
  const getSortLabel = () => {
    switch (sortBy) {
      case 'popular': return 'Most Popular';
      case 'newest': return 'Newest';
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'rating': return 'Highest Rated';
      default: return 'Sort By';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h5 className="text-accent-primary font-semibold tracking-wider">EXPLORE COURSES</h5>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
          Discover Your <span className="gradient-text">Perfect</span> Course
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Browse our comprehensive library of courses taught by industry experts and take your skills to the next level.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for courses..."
                className="glass-input w-full pl-10 py-2"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="glass-button flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="glass-button flex items-center gap-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>{getSortLabel()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute z-20 right-0 mt-2 w-48 glass-card divide-y divide-white/10 shadow-xl">
                    <button
                      onClick={() => handleSortOptionClick('popular')}
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${sortBy === 'popular' ? 'text-accent-primary' : ''}`}
                    >
                      Most Popular
                    </button>
                    <button
                      onClick={() => handleSortOptionClick('newest')}
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${sortBy === 'newest' ? 'text-accent-primary' : ''}`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => handleSortOptionClick('price-low')}
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${sortBy === 'price-low' ? 'text-accent-primary' : ''}`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => handleSortOptionClick('price-high')}
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${sortBy === 'price-high' ? 'text-accent-primary' : ''}`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => handleSortOptionClick('rating')}
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${sortBy === 'rating' ? 'text-accent-primary' : ''}`}
                    >
                      Highest Rated
                    </button>
                  </div>
                )}
              </div>
              
              <div className="glass-card flex divide-x divide-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'text-accent-primary' : ''} hover:text-accent-primary transition-colors`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'text-accent-primary' : ''} hover:text-accent-primary transition-colors`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-accent-primary" />
                <span>Filter Courses</span>
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-accent-primary transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={filters.category === null}
                      onChange={() => handleCategoryChange(null)}
                      className="mr-2"
                    />
                    <label htmlFor="category-all">All Categories</label>
                  </div>
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${index}`}
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Levels */}
              <div>
                <h4 className="font-medium mb-3">Level</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="level-all"
                      name="level"
                      checked={filters.level === null}
                      onChange={() => handleLevelChange(null)}
                      className="mr-2"
                    />
                    <label htmlFor="level-all">All Levels</label>
                  </div>
                  {levels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`level-${index}`}
                        name="level"
                        checked={filters.level === level}
                        onChange={() => handleLevelChange(level)}
                        className="mr-2"
                      />
                      <label htmlFor={`level-${index}`}>{level}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="md:col-span-2">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full accent-accent-primary"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full accent-accent-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">
            Showing <span className="font-medium">{sortedCourses.length}</span> results
          </p>
          
          {/* Active filters */}
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <div className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                <span>{filters.category}</span>
                <button onClick={() => handleCategoryChange(null)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.level && (
              <div className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                <span>{filters.level}</span>
                <button onClick={() => handleLevelChange(null)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500) && (
              <div className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 500] }))}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses - Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCourses.map((course, index) => (
            <div key={index} className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative">
                <Link to={`/courses/${index}`}>
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                </Link>
                <div className="absolute top-3 left-3 bg-accent-primary/90 text-white text-xs px-2 py-1 rounded-full">
                  {course.category}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <Link to={`/courses/${index}`} className="block">
                  <h3 className="font-bold text-lg hover:text-accent-primary transition-colors">{course.title}</h3>
                </Link>
                <p className="text-sm text-gray-400">by {course.instructor}</p>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-400 text-sm">(120+ reviews)</span>
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.hours} hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">${course.price}</p>
                    <p className="text-sm text-gray-400 line-through">${course.originalPrice}</p>
                  </div>
                  <Link
                    to={`/courses/${index}`}
                    className="glass-button text-sm bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Courses - List View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {sortedCourses.map((course, index) => (
            <div key={index} className="glass-card p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-shadow">
              <Link to={`/courses/${index}`} className="md:w-1/4">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3 bg-accent-primary/90 text-white text-xs px-2 py-1 rounded-full">
                    {course.category}
                  </div>
                </div>
              </Link>
              <div className="md:w-3/4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-2">
                  <div>
                    <Link to={`/courses/${index}`} className="block">
                      <h3 className="text-xl font-bold mb-1 hover:text-accent-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-2">by {course.instructor}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <div className="font-bold text-lg">${course.price}</div>
                    <div className="text-sm text-gray-400 line-through">${course.originalPrice}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {course.description || "This comprehensive course will take you from beginner to professional. Learn through real-world projects designed to reinforce your skills."}
                </p>
                
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-400">(120+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{course.hours} hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/courses/${index}`}
                    className="glass-button text-sm bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 mt-4 md:mt-0"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {sortedCourses.length === 0 && (
        <div className="glass-card p-8 text-center">
          <div className="flex justify-center mb-4">
            <Search className="w-12 h-12 text-accent-primary opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Courses Found</h3>
          <p className="text-gray-300 mb-6">
            We couldn't find any courses matching your current filters.
          </p>
          <button 
            onClick={clearFilters}
            className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination - Simplified for the demo */}
      {sortedCourses.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="flex glass-card">
            <button className="px-4 py-2 border-r border-white/10 hover:bg-white/10 transition-colors">Previous</button>
            <button className="px-4 py-2 bg-accent-primary/20 border-r border-white/10">1</button>
            <button className="px-4 py-2 border-r border-white/10 hover:bg-white/10 transition-colors">2</button>
            <button className="px-4 py-2 border-r border-white/10 hover:bg-white/10 transition-colors">3</button>
            <button className="px-4 py-2 hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};