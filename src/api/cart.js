import { uniqBy, countBy } from "lodash"; // libreria
import { PRODUCTS } from "../utils/constants";

// -----------------------------------------añadir productos al carrito
export function addProductCartApi(product) { 
  const products = getCartApi();
  products.push(product);
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
}

// obtener los productos que hay en el localStorage
export function getCartApi() {
  const products = localStorage.getItem(PRODUCTS);
  if (!products) return [];
  return JSON.parse(products); // volver el strin en una array
}

// productos y la cantidad de ellos
export async function getProductCartApi() {
  const idProducts = getCartApi(); // todo los  del carrito
  if (idProducts.lenght === 0) return null; // no hay productos en el carrito
  try {
    const products = getCartApi(); //todos los productos que el usuario tenga en el carrito

    // cuantos productos hay de cada uno
    const productsCount = countBy(products, (product) => {
      return product.name;
    });

    // combina los iguales y el total que hay de ese mismo producto
    const combined = uniqBy(products, (product) => {
      const productTemp = product; // guardamos copia del producto
      productTemp.quantity = productsCount[product.name]; // se añade el total de productos que hay de ese mismo producto
      return productTemp.name;
    });

    return combined;
  } catch (error) {
    console.log(error);
    return null;
  }
} 

// eliminando producto del carrito
export function deleteProductCartApi(product) {
  const products = getCartApi();
  const index = products.findIndex((item) => item.id === product.id);
  if (index > -1) {
    products.splice(index, 1);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
  }
}

// eliminando todos los productos por
export function deleteAllProductCartApi(product) {
  const products = getCartApi();
  const index = products.findIndex((item) => item.id === product.id);//es muiy especifico 
  if (index > -1) {
    products.splice(index, 1);
    localStorage.setItem(PRODUCTS, JSON.stringify(products));
    deleteAllProductCartApi(product); // función recursiva
  }
}

export function deleteCartApi(){
  localStorage.removeItem(PRODUCTS)
}


/*
*desrrollado por : juan esteban quirama , para IDT 
*este archivo contiene las funcionalidades del carrito 
*libreria lodash para combinar productos
*
*/
