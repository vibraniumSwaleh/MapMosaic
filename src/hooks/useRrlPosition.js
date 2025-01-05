import { useSearchParams } from 'react-router-dom';

function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  console.log('called');
  console.log('useUrlPosition: ', lat, lng);

  return [lat, lng];
}

export { useUrlPosition };
