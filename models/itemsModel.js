let itemsData = [
    {
        id: 1,
        idUser: 1,
        title: "Bike",
        description: "Good bike, 24 gears, no winter tyres",
        location: "Oulu",
        category:"bikes",
        images: ["./uploads/bike-kidm.jpg"],
        price: 55,
        date: "19.07.2019",
        deliveryType: "shipping",
        contacts: "Dmitrii +79226313400"
    },
    {
        id: 2,
        idUser: 2,
        title: "Guitar",
        description: "Good guitar, 10 years old, sounds well",
        category:"music",
        location: "Oulu",
        images: ["./uploads/guitar1.jpg", "./uploads/guitar2.jpeg"],
        price: 110,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: "Nursultan +73123423100"
    },
    {
        id: 3,
        idUser: 1,
        title: "Chair",
        category:"home",
        description: "Moving out sale. Don't need it anymore",
        location: "Oulu",
        images: ["./uploads/chair.jpg"],
        price: 15,
        date: "19.01.2020",
        deliveryType: "shipping",
        contacts: "Dmitrii +79226313400"
    }
]

module.exports = {
    getItemById: (id) => itemsData.find(u => u.id == id),

    getItemByName: (itemName) => itemsData.find(u => u.itemName == itemName),

    getAllItems: (idUser) => {
        let result = [];
        if(idUser !== -1){
            itemsData.forEach(element => {
                (idUser == element.idUser ? result.push(element) : null)
            })
        } else {
            result = itemsData
        }

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