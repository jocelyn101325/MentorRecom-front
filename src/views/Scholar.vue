<!--<template>-->
<!--&lt;!&ndash;  template中只能有一个根节点，一般用div&ndash;&gt;-->
<!--    <div>-->
<!--        <table>-->
<!--            <tr>-->
<!--                <td>编号</td>-->
<!--                <td>图书名称</td>-->
<!--                <td>作者</td>-->
<!--            </tr>-->
<!--            <tr v-for="item in scholars">-->
<!--                <td>{{item.id}}</td>-->
<!--                <td>{{item.name}}</td>-->
<!--                <td>{{item.author}}</td>-->
<!--            </tr>-->
<!--        </table>-->
<!--        {{msg}}-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--    name: "Scholar",-->
<!--    data(){-->
<!--        return {-->
<!--            msg:'Hello Vue',-->
<!--            scholars:[-->
<!--            ]-->
<!--        }-->
<!--    },-->
<!--    created() {-->
<!--        const _this = this;-->
<!--        axios.get('http://localhost:8011/').then(function (resp){-->
<!--            _this.scholars = resp.data;-->
<!--        })-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--</style>-->