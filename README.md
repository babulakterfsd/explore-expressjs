# Tourguru Backend : Travel the world with tourGuru

- indexing use kore db theke data tolar beparta arektu fast kora jay. in fact, mongodb je \_id use kore, oitao indexing e. kono document theke kono property diye data find korte gele mongo er prottekta document khuje dekhte hoy. jeta ektu time beshi laage. kintu kono ekta property ke orthat column er upor depend kore index create kore rakhle setake mongodb alada vabe aager thekei priorty / sort kore rakhe, tai data get korte tulonamulok kom somoy laage. normally, je property diye beshi beshi query kora hoy setake index kore niye sort kore rakha hoy. tai bole abar paikari haare indexing kora jabe na. karon ei sorting ta extra jayga ney db te.

  -db.tourpackages.createIndex({price: 1}, {name: "priceIndex"}) // creates an index
  -db.tourpackages.getIndexes() // shows all the indexes
  -db.tourpackages.dropIndex("priceIndex") // deletes an index
  -db.tourpackages.dropIndex("priceIndex") // deletes an index
  -db.tourpackages.dropIndexes() // deletes all the indexes
