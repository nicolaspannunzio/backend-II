import ProductRepository from "../repositories/product.repository.js";

class ProductService {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    addProduct = async(productData) => {
        try {
            return await this.productRepository.createProduct(productData);
        } catch (error) {
            throw new Error("Error adding a product.");
        }
    };

    async getProducts(paramFilters = {}) {
        try {
            const $and = [];

            if (paramFilters.category) $and.push({ category: paramFilters.category });
            if (paramFilters.title) $and.push({ title: paramFilters.title });
            if (paramFilters.code) $and.push({ code: paramFilters.code });
            if (paramFilters.available) $and.push({ available: paramFilters.available });

            const filters = $and.length > 0 ? { $and } : {};

            let sort = {};
            if (paramFilters.sort) {
                sort.price = paramFilters.sort === "asc" ? 1 : -1;
            }

            const limit = paramFilters.limit ? parseInt(paramFilters.limit) : 10;
            const page = paramFilters.page ? parseInt(paramFilters.page) : 1;

            const productsFound = await this.productRepository.paginate(filters, {
                limit: limit,
                page: page,
                sort: sort,
                lean: true,
                pagination: true,
            });

            productsFound.docs = productsFound.docs.map(({ id, ...productWithoutId }) => productWithoutId);
            return productsFound;
        } catch (error) {
            throw new Error("There was an error retrieving the products.");
        }
    }

    getProductById = async (id) => {
        try {
            const product = await this.productRepository.getProductById(id);
            return product;
        } catch (error) {
            throw new Error("There was an error retrieving the product by ID.");
        }
    };

    deleteProductById = async (id) => {
        try {
            await this.productRepository.deleteProduct(id);
            return "Product Deleted";
        } catch (error) {
            throw new Error("There was an error deleting the product.");
        }
    };

    updateProduct = async (id, productData) => {
        try {
            const updatedProduct = await this.productRepository.updateProduct(id, productData);
            return updatedProduct;
        } catch (error) {
            throw new Error("There was an error updating the product.");
        }
    };

    toggleAvailability = async (id) => {
        try {
            const product = await this.productRepository.getProductById(id);
            if (product) {
                product.available = !product.available;
                await product.save();
                return product;
            } else {
                return "Product not found";
            }
        } catch (error) {
            throw new Error("There was an error changing the product's availability.");
        }
    };

    explain = async () => {
        try {
            const filters = { $and: [{ category: "BATERIA" }, { title: "55457" }] };
            return await this.productRepository.explain(filters);
        } catch (error) {
            throw new Error("There was an error retrieving the data.");
        }
    };
}

export default ProductService;
