let itemsData = [
    {
        id: 1,
        idUser: 1,
        title: "Test title",
        description: "Some description",
        location: "Oulu",
        category:"bikes",
        images: ["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: "Dmitrii +79226313400"
    },
    {
        id: 2,
        idUser: 2,
        title: "Test title2",
        description: "Some description",
        category:"bikes",
        location: "Oulu",
        images: ["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: "Dmitrii +79226313400"
    },
    {
        id: 3,
        idUser: 1,
        title: "Test title 3",
        category:"autos",
        description: "Some description",
        location: "Oulu",
        images: ["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2021",
        deliveryType: "shipping",
        contacts: "Dmitrii +79226313400"
    }
]

module.exports = {
    getItemById: (id) => itemsData.find(u => u.id == id),

    getItemByName: (itemName) => itemsData.find(u => u.itemName == itemName),

    getAllItems: (idUser) => {
        let result = [];
        itemsData.forEach(element => {
            (idUser == element.idUser ? result.push(element) : null)
        })
        return result;
    },
    getNewItemId: () => {
        return itemsData.length + 1;
    },
    addNewItem: (item) => {
        itemsData.push(item)
        return item
    },

    changeItem: (item) => {
        let result = null;
        itemsData.forEach((element, i) => {
            if (element.id == item.id && element.idUser == item.idUser) {
                itemsData[i] = {
                    ...itemsData[i],
                    ...item
                }
                result = itemsData[i];
            }
        });
        return result;
    },
    deleteItem: (id, idUser) => {
        let result = false;
        itemsData.forEach((element, i) => {
            if (element.id == id && element.idUser == idUser) {
              itemsData.splice(i, 1);
              result = true
            }
        });
        return result;
    },
    searchByCategory: (name) => {
        return itemsData.filter(({category}) => category.toLowerCase().indexOf(name.toLowerCase()) >= 0)
    },
    searchByLocation: (givenLocation) => {
        return itemsData.filter(({location}) => location.toLowerCase().indexOf(givenLocation.toLowerCase()) >= 0)
    },
    searchByDate: (givenDate) => {
        return itemsData.filter(({date}) => date.toLowerCase().indexOf(givenDate.toLowerCase()) >= 0)
    }
}