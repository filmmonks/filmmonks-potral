import { useState } from 'react';
import { toast } from 'react-toastify';

const useDeleteResource = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (key) => {
    const url = `http://localhost:5000/upload/${key}`;

    setIsLoading(true);
    setError(null);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        // Handle success response
        console.log('Resource deleted successfully');
        toast('Data is deleted');
      })
      .catch((error) => {
        setIsLoading(false);
        // Handle error
        console.error('Error deleting resource:', error);
        setError(error);
      });

    // Handle delete button click for the corresponding record
    console.log('Delete button clicked for record with key:', key);
  };

  return { handleDelete, isLoading, error };
};

export default useDeleteResource;
