import { useEffect } from 'react';

const SearchComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=e55f0e82f80b44372';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="gcse-search"></div>
    </div>
  );
};

export default SearchComponent;