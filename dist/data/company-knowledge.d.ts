export declare const companyKnowledge: {
    company: {
        name: string;
        description: string;
        founded: string;
        location: string;
        industry: string;
    };
    products: ({
        name: string;
        description: string;
        features: string[];
        technologies: {
            frontend: string[];
            backend: string[];
            database: string[];
            cloud: string[];
            devOps: string[];
        };
        developmentProcess: string[];
        benefits: string[];
        whyChooseUs: string[];
        platforms?: undefined;
        expertise?: undefined;
    } | {
        name: string;
        description: string;
        platforms: {
            name: string;
            features: string[];
        }[];
        developmentProcess: string[];
        expertise: string[];
        features?: undefined;
        technologies?: undefined;
        benefits?: undefined;
        whyChooseUs?: undefined;
    })[];
    faq: {
        question: string;
        answer: string;
    }[];
    policies: {
        refund: string;
        privacy: string;
        terms: string;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
        support: {
            email: string;
            phone: string;
        };
    };
};
