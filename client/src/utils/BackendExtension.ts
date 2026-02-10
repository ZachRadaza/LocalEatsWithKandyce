import type { Category, Item } from "../schemas/schemas";

export const ExtensionService = {
    async fetchCategories(): Promise<Category[]>{
        //const categories: Category[] = [];
        const categories: Category[] = [
            { id: "1234", name: "Dessert" },
            { id: "4534", name: "Main" },
            { id: "2043", name: "Sides" },
            { id: "0973", name: "Burgers" },
            { id: "2450", name: "Pastires"}
        ];

        return categories;
    },

    async fetchMenuItems(category: Category): Promise<Item[]>{
        //const items: Item[] = [];
        const items: Item[] = [
            {
                id: "1",
                name: "Chicken",
                description: "Chicken made from chicken",
                imageLink: "https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg",
                contains: ["nuts, yup"],
                vegan: false,
                category: category,
                price: 7.99
            },
            {
                id: "2",
                name: "Pork",
                description: "Chicken made from chicken",
                imageLink: "https://cdn11.bigcommerce.com/s-25ghynqpgv/images/stencil/1920x1280/uploaded_images/group-of-brown-and-white-chickens.jpg?t=1710291482",
                contains: [],
                vegan: false,
                category: category,
                price: 3.99
            },
            {
                id: "3",
                name: "Pig",
                description: "Chicken made from chicken",
                imageLink: "https://media.4-paws.org/d/f/3/c/df3c1ed5bbbaad8c28d458afccad9d53593128bc/VIER%20PFOTEN_2019-10-10_041-3302x2201-2650x1834-1920x1329.jpg",
                contains: ["nuts, yup"],
                vegan: false,
                category: category,
                price: 6.99
            },
            {
                id: "4",
                name: "Cow",
                description: "Chicken made from chicken",
                imageLink: "https://www.zoomontana.org/images/img_F9bLYnsrn97MS5FCJHQzLB/chicken.jpg?fit=outside&w=1600&h=2400",
                contains: ["nuts, yup"],
                vegan: false,
                category: category,
                price: 4.99
            },
        ];
        

        return items;
    },

    
};