/* 
  In inventory, there are different categories. 
    => array of objects [{ category: String, items:[{name, wt}] }]
  In each category, there are multiple items.
  Every item is an object - has a name, a default quantity
*/

let defaultFee = 240;

const inventory = [
  {
    category: 'Desks',
    items: [
      {
        name: 'large straight',
        wt: 90,
      }, 
      {
        name: 'Sm Straight',
        wt: 55,
      },
      {
        name: 'L 1.3',
        wt: '65',
      },
      {
        name: 'L 1.8',
        wt: 90,
        
      },
      {
        name: '120 degree',
        wt: 65,
        twt: 0,
      },
      {
        name: 'Desk risers',
        wt: 25
      }
    ]
  },
  {
    category: 'Chairs',
    items: [
      {
        name: 'Boardroom',
        wt: 30
      },
      {
        name: 'Task',
        wt: 21
      },
      {
        name: 'Poof',
        wt: 10
      },
      {
        name: 'Reception',
        wt: 20
      },
      {
        name: 'Stacker',
        wt: 15
      },
      {
        name: 'Couch',
        wt: 100
      },
      {
        name: 'Lounge Chair',
        wt: 35
      },
    ]
  }, 
  {
    category: 'Tech',
    items: [
      {
        name: 'Fan',
        wt: 10
      },
      {
        name: 'Heater',
        wt: 10
      },
      {
        name: 'Printer',
        wt: 10
      },
      {
        name: 'Shredder',
        wt: 30
      },
      {
        name: 'TV',
        wt: 10
      },
    ]
  }, 
  {
    category: 'Partioning',
    items: [
      {
        name: 'Partition Shelves',
        wt: 3
      },
      {
        name: 'Dividers',
        wt: 10
      },
      {
        name: 'Partitions',
        wt: 20
      },
    ]
  },
  {
    category: 'Tables',
    items: [
      {
        name: 'Coffee Table',
        wt: 20
      },
      {
        name: 'Round Table',
        wt: 60
      },
      {
        name: 'Sm Table',
        wt: 50
      },
      {
        name: 'Table - BBQ',
        wt: 80
      },
      {
        name: 'Table - Boardroom lg',
        wt: 150
      },
      {
        name: 'Table - Boardroom sm',
        wt: 80
      },
      {
        name: 'Table - Cafe',
        wt: 50
      },
      {
        name: 'Table Lg',
        wt: 80
      },
      {
        name: 'Table - Folding',
        wt: 30
      },
      {
        name: 'Table - Trolley',
        wt: 40
      },
    ]
  },
  
]

// Elements Selected
const table = document.getElementById('inventoryTable')
const footer = document.getElementById('tFooter')
const totalQuantityCell = document.getElementById('totalQuantity')
const totalWeightCell = document.getElementById('totalWeight');
const defaultFeeCell = document.getElementById('defaultFee');
const totalFeeCell = document.getElementById('totalFee');

createTable(inventory);

defaultFeeCell.addEventListener('change', (e) => {
  
  calculateAndSetTotalFee()
});



function createTable(inventory){

  for(const obj of inventory){
    const tBody = document.createElement('tbody');
    const headRow = document.createElement('tr');
    headRow.classList.add('head-row')
    const headData = document.createElement('td');
    headData.setAttribute('colspan', 5);
    headData.classList.add('head-row')
    headData.textContent = obj.category;
    headRow.appendChild(headData);
    tBody.appendChild(headRow);

    // populate the columns
    for(const item of obj.items){
      // create a row for item
      const tRow = document.createElement('tr');

      // td - name
      const nameTd = document.createElement('td')
      nameTd.textContent = item.name

      // td - wt
      const qTd = document.createElement('td')
      const qTdInput = document.createElement('input');
      qTdInput.setAttribute('type', 'number');
      qTdInput.setAttribute('value', item.wt);
      qTdInput.setAttribute('min', 0)
      qTdInput.addEventListener('change', updateQuantities)
      qTd.classList.add('td-input')
      qTd.appendChild(qTdInput);

      // td - total quantity - has input and changeable
      const totalQuantityTd = document.createElement('td');
      const totalInput = document.createElement('input');
      totalInput.setAttribute('type', 'number')
      totalInput.setAttribute('min', 0)
      // totalInput.value = 0
      totalInput.addEventListener('change', updateQuantities)
      totalQuantityTd.classList.add('td-input')
      totalQuantityTd.appendChild(totalInput);

      // td - twt (empty) - no input value must be calculated
      const totalTd = document.createElement('td')
      totalTd.textContent = '0'

      // td - comments (empty)
      const commendTd = document.createElement('td')
      
      // append all tds to row
      tRow.appendChild(nameTd);
      tRow.appendChild(qTd);
      tRow.appendChild(totalQuantityTd);
      tRow.appendChild(totalTd);
      tRow.appendChild(commendTd);
      tBody.appendChild(tRow)
    }

    table.appendChild(tBody);
  }
  
  totalQuantityCell.textContent = 0;
  totalWeightCell.textContent = 0

  defaultFeeCell.value = defaultFee;
  totalFeeCell.textContent = '$0.0';
}

function updateQuantities(e){
  console.log('change')
  
  const parentRow = e.target.parentElement.parentElement

  const wt = parentRow.cells[1].firstChild.value ? parentRow.cells[1].firstChild.value : 0;
  const qty = parentRow.cells[2].firstChild.value ? parentRow.cells[2].firstChild.value : 0;
  parentRow.cells[1].firstChild.value = wt;
  parentRow.cells[2].firstChild.value = qty;

  parentRow.cells[3].textContent = parseInt(wt) * parseInt(qty);
  calculateTotalQuantity()
}

function calculateTotalQuantity(){
  let totalQty = 0;
  let totalWeight = 0;
  for(const body of table.tBodies){
    let i = 0;
    for(let tr of body.childNodes){
      if(!tr.classList.contains('head-row')){
        console.log(i++, tr.childNodes[2].firstChild.value)
        totalQty += (parseInt(tr.childNodes[2].firstChild.value ? tr.childNodes[2].firstChild.value : 0));
        totalWeight += parseInt(tr.childNodes[3].textContent)
      }
    }
   
  }
  console.log('Quantity Sum', totalQty);
  console.log('weight Sum', totalWeight)

  totalQuantityCell.textContent = totalQty;
  totalWeightCell.textContent = totalWeight; 

  calculateAndSetTotalFee();
}

function calculateAndSetTotalFee(){
  const totalQty = parseInt(totalQuantityCell.textContent ? totalQuantityCell.textContent : 0)
  console.log(totalQty)
  const standardFee = parseInt(defaultFeeCell.value ? defaultFeeCell.value : 0)
  const finalFee = (standardFee * totalQty)/1000;
  console.log(finalFee)
  totalFeeCell.textContent = `$${finalFee}`
}