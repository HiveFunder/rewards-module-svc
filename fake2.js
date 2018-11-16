const faker = require('faker');
const fs = require('fs').promises;

let tiers;

function write() {
  let data = [];
  try {
    fs.writeFile('fakedata.csv',`projectId,pledgeAmount,name,description,item1,item2,item3,isLimited,limitCount,estDeliv,shipsTo,backers` + "\n");
  }
  finally {
	  for (let i = 1; i <= 4000000; i += 1) {
	  // arbitrary trap to semi-randomize reward tier levels for different projects
	    if (i % 8 === 0) {
		  tiers = [1, 5, 10, 25, 50];
		  } else if (i % 12 === 0) {
		    tiers = [1, 5, 10, 25, 50, 100];
		  } else if (i % 10 === 0) {
		    tiers = [1, 5, 10, 25, 50, 75, 100, 250, 500, 750];
		  } else {
		    tiers = [1, 5, 10, 25, 50, 75, 100];
		  }

		  for (let j = 0; j < tiers.length; j += 1) {
		    let isLimited = false;
		    let limitCount = null;
		    const estDeliv = `${faker.date.month()} ${faker.random.number({ min: 2019, max: 2022 })}`;
		    let backers = faker.random.number(500);

		    if (j === 8) {
		      isLimited = true;
		      limitCount = 30;
		      backers = faker.random.number(30);
		    }
		    if (j === 9) {
		      isLimited = true;
		      limitCount = 10;
		      backers = faker.random.number(10);
		    }

		    const random = {
		      projectId: i,
		      pledgeAmount: tiers[j],
		      name: faker.lorem.words(),
		      description: faker.lorem.paragraph(),
		      item1: faker.lorem.words(),
		      item2: faker.lorem.words(),
		      item3: faker.lorem.words(),
		      isLimited,
		      limitCount,
		      estDeliv,
		      shipsTo: faker.lorem.words(),
		      backers,
		    };
		    data.push(`${random.projectId},${random.pledgeAmount},${random.name},${random.description},${random.item1},${random.item2},${random.item3},${random.isLimited},${random.limitCount},${random.estDeliv},${random.shipsTo},${random.backers}` + "\n");
		  }

	    if (i % 100000 === 0) {
	      console.log(`${i} entries logged`);
	    }
	  }
	  fs.writeFile('fakedata.csv', data.join('\n'));
	}
};

write();
