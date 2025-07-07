"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knowledgeTemplates = exports.KnowledgeBuilder = void 0;
exports.createCompanyKnowledge = createCompanyKnowledge;
/**
 * Utility class to help build company knowledge data
 */
class KnowledgeBuilder {
    constructor() {
        this.knowledge = {};
    }
    /**
     * Set company information
     */
    setCompany(info) {
        this.knowledge.company = info;
        return this;
    }
    /**
     * Add products/services
     */
    addProducts(products) {
        this.knowledge.products = products;
        return this;
    }
    /**
     * Add FAQ items
     */
    addFAQ(faq) {
        this.knowledge.faq = faq;
        return this;
    }
    /**
     * Set company policies
     */
    setPolicies(policies) {
        this.knowledge.policies = policies;
        return this;
    }
    /**
     * Set contact information
     */
    setContact(contact) {
        this.knowledge.contact = contact;
        return this;
    }
    /**
     * Build and return the complete knowledge object
     */
    build() {
        if (!this.knowledge.company) {
            throw new Error('Company information is required');
        }
        return {
            company: this.knowledge.company,
            products: this.knowledge.products || [],
            faq: this.knowledge.faq || [],
            policies: this.knowledge.policies || {
                refund: 'Please contact support for refund information.',
                privacy: 'We respect your privacy. Please review our privacy policy.',
                terms: 'Please review our terms of service for complete information.'
            },
            contact: this.knowledge.contact || {
                email: 'contact@company.com',
                phone: '+1-000-000-0000',
                address: '123 Business St, City, State 12345',
                support: {
                    email: 'support@company.com',
                    phone: '+1-000-000-0001'
                }
            }
        };
    }
}
exports.KnowledgeBuilder = KnowledgeBuilder;
/**
 * Quick helper function to create company knowledge
 */
function createCompanyKnowledge(companyInfo, options) {
    const builder = new KnowledgeBuilder().setCompany(companyInfo);
    if (options === null || options === void 0 ? void 0 : options.products) {
        builder.addProducts(options.products);
    }
    if (options === null || options === void 0 ? void 0 : options.faq) {
        builder.addFAQ(options.faq);
    }
    if (options === null || options === void 0 ? void 0 : options.policies) {
        builder.setPolicies(options.policies);
    }
    if (options === null || options === void 0 ? void 0 : options.contact) {
        builder.setContact(options.contact);
    }
    return builder.build();
}
/**
 * Example usage and templates
 */
exports.knowledgeTemplates = {
    // Simple company template
    simple: (companyName, description) => ({
        company: {
            name: companyName,
            description,
            founded: '2024',
            location: 'Your Location',
            industry: 'Your Industry'
        },
        products: [],
        faq: [],
        policies: {
            refund: 'Please contact support for refund information.',
            privacy: 'We respect your privacy. Please review our privacy policy.',
            terms: 'Please review our terms of service for complete information.'
        },
        contact: {
            email: 'contact@company.com',
            phone: '+1-000-000-0000',
            address: '123 Business St, City, State 12345',
            support: {
                email: 'support@company.com',
                phone: '+1-000-000-0001'
            }
        }
    }),
    // E-commerce template
    ecommerce: (companyName) => ({
        company: {
            name: companyName,
            description: `${companyName} is an online retail store offering quality products with excellent customer service.`,
            founded: '2024',
            location: 'Online',
            industry: 'E-commerce'
        },
        products: [
            {
                name: 'Online Shopping',
                description: 'Browse and purchase products through our secure online platform.',
                features: ['Secure Payment', 'Fast Shipping', 'Easy Returns', '24/7 Support'],
                benefits: ['Convenient Shopping', 'Wide Selection', 'Competitive Prices']
            }
        ],
        faq: [
            {
                question: 'How do I place an order?',
                answer: 'Simply browse our products, add items to your cart, and proceed to checkout with your payment information.'
            },
            {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return policy for most items. Please contact our support team for assistance.'
            }
        ],
        policies: {
            refund: '30-day return policy for most items. Contact support for assistance.',
            privacy: 'We protect your personal information and never share it with third parties.',
            terms: 'By using our service, you agree to our terms and conditions.'
        },
        contact: {
            email: 'contact@company.com',
            phone: '+1-000-000-0000',
            address: '123 Business St, City, State 12345',
            support: {
                email: 'support@company.com',
                phone: '+1-000-000-0001'
            }
        }
    }),
    // Service business template
    service: (companyName, serviceDescription) => ({
        company: {
            name: companyName,
            description: `${companyName} provides professional services to help businesses and individuals achieve their goals.`,
            founded: '2024',
            location: 'Your Location',
            industry: 'Professional Services'
        },
        products: [
            {
                name: 'Professional Services',
                description: serviceDescription,
                features: ['Expert Consultation', 'Custom Solutions', 'Ongoing Support'],
                benefits: ['Professional Expertise', 'Tailored Solutions', 'Reliable Service']
            }
        ],
        faq: [
            {
                question: 'How do I get started?',
                answer: 'Contact us for a free consultation to discuss your needs and how we can help.'
            },
            {
                question: 'What are your rates?',
                answer: 'Our rates vary based on the scope of work. Please contact us for a personalized quote.'
            }
        ],
        policies: {
            refund: 'Service fees are non-refundable once work has begun. Contact us for details.',
            privacy: 'We maintain strict confidentiality of all client information.',
            terms: 'Services are provided according to our service agreement terms.'
        },
        contact: {
            email: 'contact@company.com',
            phone: '+1-000-000-0000',
            address: '123 Business St, City, State 12345',
            support: {
                email: 'support@company.com',
                phone: '+1-000-000-0001'
            }
        }
    })
};
