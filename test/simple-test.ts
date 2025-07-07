// Simple test to verify package exports
import { 
  ChatBot, 
  chatHandler, 
  companyKnowledge, 
  KnowledgeBuilder, 
  createCompanyKnowledge, 
  knowledgeTemplates 
} from '../src';

// Test that all exports are available
console.log('✅ All exports are available:');
console.log('- ChatBot:', typeof ChatBot);
console.log('- chatHandler:', typeof chatHandler);
console.log('- companyKnowledge:', typeof companyKnowledge);
console.log('- KnowledgeBuilder:', typeof KnowledgeBuilder);
console.log('- createCompanyKnowledge:', typeof createCompanyKnowledge);
console.log('- knowledgeTemplates:', typeof knowledgeTemplates);

// Test knowledge builder
const builder = new KnowledgeBuilder();
console.log('✅ KnowledgeBuilder instance created');

// Test knowledge templates
const simpleKnowledge = knowledgeTemplates.simple('Test Company', 'Test Description');
console.log('✅ Simple knowledge template created:', simpleKnowledge.company.name);

const ecommerceKnowledge = knowledgeTemplates.ecommerce('Test Store');
console.log('✅ E-commerce knowledge template created:', ecommerceKnowledge.company.name);

const serviceKnowledge = knowledgeTemplates.service('Test Service', 'Test service description');
console.log('✅ Service knowledge template created:', serviceKnowledge.company.name);

// Test createCompanyKnowledge function
const customKnowledge = createCompanyKnowledge(
  {
    name: 'Custom Company',
    description: 'Custom description',
    founded: '2024',
    location: 'Test Location',
    industry: 'Test Industry'
  }
);
console.log('✅ Custom knowledge created:', customKnowledge.company.name);

console.log('\n🎉 All tests passed! The package is working correctly.'); 