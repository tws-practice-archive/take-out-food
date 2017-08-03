/*此方法为了调用bestCharge函数，所以应该是需要根据用户选择的商品来生成一个像spec里面那样的id数组*/
function calculatePrice() {
  let selectArray=$('.item :input');
  let result=[];
  for(let i of selectArray){
    if(i.selectedIndex!==0){
      result.push(`${i.name} x ${i.selectedIndex}`);
    }
  }
  let message=bestCharge(result);
  let m=$('#message')
  m.text(message);
}

function initAll() {
  let selectArray=$('.item :input');
  for(let i of selectArray){
    i.selectedIndex=0;
  }
  let m=$('#message')
  m.text("");
}

function showItems(items) {
  let it = $('#items');
  for (let item of items) {
    it.html(it.html() + itemToHtml(item));
  }
}

function itemToHtml(s) {
  let result = '';
  result += `<div class="item">
        <P class="itemname">名称：${s.name}</P>
        <P class="itemprice">价格：${s.price}元</P>
        <p class="itemcount">数量:</p>
        <select name=${s.id}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select>
    </div>`;
  return result;
}

function showPromotions(promotions) {
  let pro = $('#promotions');
  for (let i of promotions) {
    pro.html(pro.html() + promotionToHtml(i));
  }
}

function promotionToHtml(i) {
  let result = '';
  if (!i.items) {
    result += `<p class="yh">${i.type}</p>`;
  } else {
    result += `<p class="yh">${i.type}(${idToName(i.items)})`
  }
  return result;
}

function idToName(ids) {
  let result='';
  let allItems=loadAllItems();
  for(let i of ids){
    for(let j of allItems){
      if(i===j.id){
        result+=j.name+',';
      }
    }
  }
  return result.slice(0,-1);
}
