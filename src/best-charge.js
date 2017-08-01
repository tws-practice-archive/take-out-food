/*输入：已选择的商品[String]
* 输出：最优惠的优惠方式,从测试结果来看应该是清单字符串。String
* */
/*商品类*/

class Item {
  constructor(id, name, price, count) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
  }

  toString() {
    return `${this.name} x ${this.count} = ${this.price * this.count}元`
  }
}

function getTotalPrice(itemList) {
  let total = 0;
  for (let {id, name, price, count} of itemList) {
    total += price * count;
  }
  return total;
}

function chooseBestPromotion(itemList) {
  let promotions = loadPromotions();
  let reg = /^满(\d+)减(\d+)元$/;
  let cut1 = 0, cut2 = 0;
  let bestcut;
  let cutList = [];
  let result = "";
  for (let i of promotions) {
    if (reg.test(i.type)) {
      let temp = i.type.split(reg);
      let price1 = Number(temp[1]);
      let price2 = Number(temp[2]);
      let total = getTotalPrice(itemList);
      cut1 = total > price1 ? price2 : 0;
    } else {
      for (let j of i.items) {
        for (let {id, name, price, count} of itemList) {
          if (id === j) {
            cutList.push({id, name});
            cut2 += price * count / 2;
          }
        }
      }
    }
  }
  if (cut1 === 0 && cut2 === 0) {
    return {cut: 0, info: null};
  }
  if (cut1 > cut2) {
    result = `使用优惠:`;
    result += `\n${promotions[0].type}，省${cut1}元`;
    result += `\n-----------------------------------`;
    bestcut = cut1;
  } else {
    let flag = true;
    result = `使用优惠:`;
    result += `\n${promotions[1].type}(`;
    for (let i of cutList) {
      if (flag) {
        result += i.name;
        flag = false;
      } else {
        result += `，` + i.name;
      }
    }
    result += `)，省${cut2}元`;
    result += `\n-----------------------------------`;
    bestcut = cut2;
  }
  return {cut: bestcut, info: result};
}

function printMessage(itemList, cut, info) {
  let message = `============= 订餐明细 =============`;
  for (let i of itemList) {
    message += `\n${i.toString()}`;
  }
  message += `\n-----------------------------------`;
  if (info) {
    message += '\n' + info;
  }
  let total = getTotalPrice(itemList);
  message += `\n总计：${total - cut}元`;
  message += `\n===================================`;
  return message;
}

/*主函数*/
function bestCharge(selectedItems) {
  let itemList = makeList(selectedItems);//列表已经生成，基本信息已经具备，剩下的就是选择最好的优惠方案
  let {cut, info} = chooseBestPromotion(itemList);
  let result = printMessage(itemList, cut, info);
  return result;
}

/*生成商品数量列表*/
function makeList(selectedItems) {
  let allItem = loadAllItems();
  let itemMap = new Map();
  let itemList = [];
  for (let i of selectedItems) {
    let temp = i.split('x');
    let id = temp[0].trim();
    let count = Number(temp[1].trim());
    itemMap.set(id, itemMap.has(id) ? itemMap.get(id) + count : count);
  }
  for (let [id, count] of itemMap) {
    for (let {id: idd, name, price} of allItem) {
      if (idd == id) {
        itemList.push(new Item(id, name, price, count));
      }
    }
  }
  return itemList;
}
