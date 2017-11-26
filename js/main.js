// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var myApp = new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0
    },
    filters:{
            formatMoney:function (money) {
                return "￥"+money.toFixed(2);
            }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.carView();
        })
    },
    methods:{
      //向后端申请数据，这里是data里的模拟后端数据
      carView:function() {
          this.$http.get("data/cartData.json").then(
              res=>{
                this.productList=res.data.result.list;
              }
          );
      },
      changeNum:function (item,flag) {
          if(flag>0){
              item.productQuantity++;
          }
          else {
              if (item.productQuantity > 1) {
                  item.productQuantity--;
              }
              else {
                  item.productQuantity=1;
              }
          }
          this.calcTotalMoney();
      },
        //单选
        selectedItem:function (item) {
            if(typeof item.check == 'undefined'){
                // Vue.set(item,"check",true);
                this.$set(item,"check",true);
            }
            else {
                item.check=!item.check
            }
            this.calcTotalMoney();
        },
        //全选/全不选
        selectedAll:function(flag) {
            this.productList.forEach((val)=> {
                if(typeof val.check == 'undefined'){
                    // Vue.set(val,"check",flag);
                    this.$set(val,"check",flag);
                }
                else {
                    val.check=flag;
                }
            });
            this.calcTotalMoney();
        },
        //总计价格
        //计算标记item的价格，所每次操作item标记的标记都要计算
        calcTotalMoney:function () {
            this.totalMoney = 0;
            this.productList.forEach(val=> {
                if(val.check){
                    this.totalMoney+=val.productQuantity*val.productPrice;
                }
            })
        },
        //删除item
        deleteItem:function (item) {
            this.productList.splice(this.productList.indexOf(item),1);
            this.calcTotalMoney()
        }
    }
});