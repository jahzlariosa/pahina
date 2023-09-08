export interface Post {
    id: number;
    attributes: {
        title: string;
        body: string;
        slug: string;
        featured_image: any;
        // Add other fields as needed
    };
}