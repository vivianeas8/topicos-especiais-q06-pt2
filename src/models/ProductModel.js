import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveItem(listItem, id) {
  const savedProducts = await getItems();
  listItem.id = id ? id : new Date().getTime();
  if (id) {
    const index = await savedProducts.findIndex((item) => item.id === id);
    savedProducts[index] = listItem;
  } else {
    savedProducts.push(listItem);
  }
  return AsyncStorage.setItem('products', JSON.stringify(savedProducts));
}

function getItems() {
  return AsyncStorage.getItem('products').then((response) => {
    if (response) return Promise.resolve(JSON.parse(response));
    else return Promise.resolve([]);
  });
}

async function getItem(id) {
  const savedProducts = await getItems();
  return savedProducts.find((item) => item.id === id);
}

async function deleteItem(id) {
  let savedProducts = await getItems();
  const index = await savedProducts.findIndex((item) => item.id === id);
  savedProducts.splice(index, 1);
  return AsyncStorage.setItem('products', JSON.stringify(savedProducts));
}

module.exports = {
  saveItem,
  getItems,
  getItem,
  deleteItem,
};
