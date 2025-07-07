// Test to verify CSS import works
import { importChatbotStyles } from '../src';

console.log('Testing CSS import...');

try {
  const result = importChatbotStyles();
  console.log('✅ CSS import function works:', result);
  console.log('✅ No module resolution errors for CSS');
} catch (error) {
  console.error('❌ CSS import failed:', error);
}

console.log('🎉 CSS import test completed!'); 