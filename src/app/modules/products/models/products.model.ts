export interface IProduct {
    id?: number,
    title?: string,
    price?: number,
    description?: string,
    category?:string,
    image?: string,
    rating?: IRating
}

interface IRating {
    rate?: number,
    count?: number
}

export class Product implements IProduct{
    constructor(
        public title?:string,
        public price?:number,
        public description?:string,
        public category?:string,
        public image?:string,
        public rating?:IRating,
    ){}
}