new Vue({
    el:".container",
    data:{
        addressList:[],
        addressListNum:3,
        moreFlag:true,
        currentIndex:0,
        shoppingMethod:1
    },
    mounted:function () {
        this.$nextTick(function () {
                this.getJson()
        })
    },
    methods:{
        getJson:function () {
            this.$http.get("data/address.json").then(res=>{
                    if (res.data.status == 0)
                        this.addressList = res.data.result;
                    else
                        alert("请求失败！")
            })
        },
        showMore:function () {
            this.moreFlag=!this.moreFlag
            if(this.moreFlag){
                this.addressListNum=3;
            }
            else {
                this.addressListNum=this.addressList.length;
            }
        },
        setDefault:function (Id) {
            this.addressList.forEach(item=>{
                if(item.addressId==Id){
                    item.isDefault=true
                }
                else {
                    item.isDefault=false
                }
            })
        }
    },
    filters:{

    },
    computed:{
        filterAddress:function () {
           return this.addressList.slice(0,this.addressListNum)
        }
    }
})