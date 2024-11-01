import CategoriesAPI from "@/api/CategoriesAPI";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useProductsStore } from "./products";

export const useCategoriesStore = defineStore('categories', () => {

    const products = useProductsStore();
    const categories = ref([]);
    const setCurrentCategory = ref([]);
    const setCategoryName = ref('');

    async function fetchCategories() {
        try {
            const { data } = await CategoriesAPI.all();
            categories.value = data.data;

            //If we have, at least one category
            if (categories.value.length > 0) {
                setCurrentCategory.value = categories.value[0].id;
                setCategoryName.value = categories.value[0].name;
                // console.log(setCategoryName.value)
                await products.fetchProducts();
                
                //Filtering products, to get in the first instance the products of the first category
                const fetchProducts = products.products.filter(product => product.category_id === categories.value[0].id);
                products.productsByCategory.value = fetchProducts;
                // console.log(fetchProducts)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClickCategory = (id) => {
        //Getting the category id selected
        const category = categories.value.filter(category => category.id === id);
        if(category) {
            //Setting id and name of the current category
            setCurrentCategory.value = category[0].id;
            setCategoryName.value = category[0].name;
            // console.log(category[0])

            //Filtering products, to get only the products of the current category
            const fetchProducts = products.products.filter(product => product.category_id === id);
            products.productsByCategory.value = fetchProducts;
            // console.log(products.productsByCategory.value)
        }
    }

    return {
        categories,
        fetchCategories,
        setCurrentCategory,
        handleClickCategory,
        setCategoryName
    }
})