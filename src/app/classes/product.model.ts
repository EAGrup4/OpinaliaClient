export class Product {
  constructor(
    public name: string,
    public category: string,
    public company: string,
    public specifications: string[],
    public images: string[],
    public components: string[],
    public _id: string
  ) {}
}
