import { CompanyKnowledge, CompanyInfo, Product, FAQ, Policies, ContactInfo } from '../types/chat';
/**
 * Utility class to help build company knowledge data
 */
export declare class KnowledgeBuilder {
    private knowledge;
    /**
     * Set company information
     */
    setCompany(info: CompanyInfo): this;
    /**
     * Add products/services
     */
    addProducts(products: Product[]): this;
    /**
     * Add FAQ items
     */
    addFAQ(faq: FAQ[]): this;
    /**
     * Set company policies
     */
    setPolicies(policies: Policies): this;
    /**
     * Set contact information
     */
    setContact(contact: ContactInfo): this;
    /**
     * Build and return the complete knowledge object
     */
    build(): CompanyKnowledge;
}
/**
 * Quick helper function to create company knowledge
 */
export declare function createCompanyKnowledge(companyInfo: CompanyInfo, options?: {
    products?: Product[];
    faq?: FAQ[];
    policies?: Policies;
    contact?: ContactInfo;
}): CompanyKnowledge;
/**
 * Example usage and templates
 */
export declare const knowledgeTemplates: {
    simple: (companyName: string, description: string) => CompanyKnowledge;
    ecommerce: (companyName: string) => CompanyKnowledge;
    service: (companyName: string, serviceDescription: string) => CompanyKnowledge;
};
