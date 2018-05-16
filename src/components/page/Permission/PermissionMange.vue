<template>
    <div>
        <breadcrumb :nav='breadcrumb'></breadcrumb>
    </div>
</template>
<script>
import breadcrumb from '../../common/Breadcrumb';
export default {
    components:{
        breadcrumb,
    },
    data () {
        return {
            breadcrumb:['权限管理','角色权限管理']
        }
    }
}
</script>
<style lang="less" scoped>

</style>


