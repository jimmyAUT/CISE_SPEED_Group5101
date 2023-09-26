import React, { FormEvent, useState } from 'react';
import formStyles from '../../../styles/Form.module.scss';
import SortableTable from '@/components/table/SortableTable';
import { useRouter } from 'next/router';
import { searchArticles } from '@/api/search';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchYear, setSearchYear] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([searchArticles]);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'source', label: 'Source' },
    { key: 'pubyear', label: 'Publication Year' },
    { key: 'doi', label: 'DOI' },
    { key: 'score', label: 'Score' },
  ];

  const handleSearch = async () => {
    setLoading(true);

    const query = ({
      keyword: searchQuery,
      startYear,
      endYear,
      year: searchYear,
    });

    if (startYear && endYear) {
      query.startYear = startYear;
      query.endYear = endYear;
    } else if (searchYear) {
      query.year = searchYear;
    }
  
    try {
      const response = await searchArticles(query);
      if (Array.isArray(response) && response.length > 0) {
        setSearchResults(response);
      } else {
        console.log('No articles found for the specified year range.');
        setSearchResults([]); // Set searchResults to an empty array to clear any previous search results.
      }
    } catch (error) {
      console.error('Error searching articles:', error);
      setSearchResults([]); // Set searchResults to an empty array in case of an error.
    }
  
    //   if (response.length > 0) {
    //     setSearchResults(response);
    //   } else {
    //     console.log('No articles found for the specified year range.');
    //   }
    // } catch (error) {
    //   console.error('Error searching articles:', error);
    // }

    setLoading(false);
  };
  

  //   try {
  //     const response = await searchArticles(query);
  //     if (response.length !== 0) {
  //       setSearchResults(response);
  //     } else {
  //       // If no results found for the current year, try searching for the next year
  //       if (searchYear) {
  //         const nextYearQuery = JSON.stringify({
  //           keyword: searchQuery,
  //           year: String(parseInt(searchYear) + 1),
  //         });
  //         const nextYearResponse = await searchArticles(nextYearQuery);

  //         if (nextYearResponse.length !== 0) {
  //           setSearchResults(nextYearResponse);
  //         } else {
  //           console.log('No result');
  //         }
  //       } else {
  //         console.log('No result');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error searching article:', error);
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="container">
      <h2>Search SE Methods</h2>
      <div>
        <input
          type="text"
          placeholder="Search SE Method by Keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Year"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.length > 0 ? (
        <SortableTable headers={headers} data={searchResults} />
      ) : (
        <p>No articles found.</p>
      )}

      <button onClick={() => router.push('/')}>Home</button>
    </div>
  );
};

export default SearchPage;