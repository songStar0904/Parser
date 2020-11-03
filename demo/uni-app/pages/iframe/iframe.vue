<template>
	<view>
		<jyf-parser :html="html">加载中...</jyf-parser>
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				html: '<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=z3165l5pbae" allowfullscreen="true" style="width: 100%;"></iframe>'
			};
		}
	}
</script>

<style lang="scss">

</style>
