let itemsData = [
    {
        id:1,
        idUser: 1,
        title: "Test title",
        description: "Some description",
        Location: "Oulu",
        images:["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: {
            name: "Dmitrii",
            phone: +79226313400
        }
    },
    {
        id:2,
        idUser: 2,
        title: "Test title2",
        description: "Some description",
        Location: "Oulu",
        images:["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: {
            name: "Dmitrii",
            phone: +79226313400
        }
    },
    {
        id:3,
        idUser: 1,
        title: "Test title 3",
        description: "Some description",
        Location: "Oulu",
        images:["uploads/i1.png", "uploads/i2.png"],
        price: 15,
        date: "19.07.2020",
        deliveryType: "shipping",
        contacts: {
            name: "Dmitrii",
            phone: +79226313400
        }
    }
]

module.exports = {
    getItemById: (id) => itemsData.find(u => u.id == id),

    getItemByName: (itemName) => itemsData.find(u => u.itemName == itemName),

    getAllItems: (idUser) => {
        let result = [];
        itemsData.forEach(element => {
            (idUser == element.idUser ? result.push(element): null )
    })
    return result;
},

    addNewItem: (item) => {
        itemsData.push(item)
        return item
    },

    changeItem: (item) => {
        console.log('item: ', item);
        let result = null;
        itemsData.forEach((element, i) => {
            if (element.id == item.id) {
              itemsData[i] = { 
                  id: item.id,
                  ...item
                }
                console.log('itemsData[i]: ', itemsData[i]);
                result = itemsData[i] ;
                
            } 
        });
        return result;
        
    }
  }