import { useDispatch as useBaseDispatch } from 'react-redux';
import type { AppDispatch } from 'src/store/configure-store';

export const useDispatch = () => useBaseDispatch<AppDispatch>();
