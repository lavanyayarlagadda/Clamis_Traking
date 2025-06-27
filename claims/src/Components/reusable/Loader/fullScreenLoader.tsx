
import { Box } from '@mui/material';
import Loader from './loader';


interface PageLoaderProps {
  text?: string;
  variant?: 'cross' | 'heart' | 'pulse';
}
 const FullScreenLoader = ({ text = 'Loading Healthcare Data...', variant = 'cross' }: PageLoaderProps) => (
  <Box
    sx={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 1300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Loader size="lg" variant={variant} text={text} />
  </Box>
);
export default FullScreenLoader;
