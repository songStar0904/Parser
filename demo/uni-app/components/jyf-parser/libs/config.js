/* 配置文件 */
var cfg = {
	// 出错占位图
	errorImg: null,
	// 视频源正则
	videoReg: {
		tx: /https:\/\/v\.qq\.com.*vid=(\w*)/
	},
	// 过滤器函数
	filter(node, cxt) {
		// 轻站拓展
		if (node.name == 'iframe') {
			console.log("iframe", node);
			cxt.bubble(); // 使得 不被 rich-text 包含
			let src = node.attrs.src
			let reg = this.videoReg.tx
			if (reg.test(src)) {
				node.attrs.mode = 'tx'
				// safeGetValue 只是一个取值的函数，可自行编写自己的取值函数。
				node.attrs.vid = safeGetValue([1], node.attrs.src.match(reg)) || "";
			}
		}
		// 此函数作用类似于ramda的path和pathOr，用于安全取值。
		function safeGetValue() {
			const argsLength = arguments.length
	
			if (argsLength !== 2 && argsLength !== 3) {
				throw '必须为两个或者三个参数'
			}
			var defaultValue
			if (argsLength === 3) {
				var [_defaultValue, keys, item] = arguments
				defaultValue = _defaultValue
			} else {
				var [keys, item] = arguments
			}
			if (!Array.isArray(keys)) {
				throw '参数有误，取值的keys必须为数组'
			}
			try {
				keys.forEach(key => {
					item = item[key]
				})
			} catch (e) {
				return defaultValue
			}
			return item
		};
	},
	// 代码高亮函数
	highlight: null,
	// 文本处理函数
	onText: null,
	// 实体编码列表
	entities: {
		quot: '"',
		apos: "'",
		semi: ';',
		nbsp: '\xA0',
		ensp: '\u2002',
		emsp: '\u2003',
		ndash: '–',
		mdash: '—',
		middot: '·',
		lsquo: '‘',
		rsquo: '’',
		ldquo: '“',
		rdquo: '”',
		bull: '•',
		hellip: '…'
	},
	blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
	boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
	// 块级标签，将被转为 div
	blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
	// 将被移除的标签
	ignoreTags: makeMap('area,base,canvas,frame,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
	// 只能被 rich-text 显示的标签
	richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
	// 自闭合的标签
	selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
	// 信任的标签
	trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video,iframe'),
	// 默认的标签样式
	userAgentStyles: {
		address: 'font-style:italic',
		big: 'display:inline;font-size:1.2em',
		blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
		caption: 'display:table-caption;text-align:center',
		center: 'text-align:center',
		cite: 'font-style:italic',
		dd: 'margin-left:40px',
		mark: 'background-color:yellow',
		pre: 'font-family:monospace;white-space:pre;overflow:scroll',
		s: 'text-decoration:line-through',
		small: 'display:inline;font-size:0.8em',
		u: 'text-decoration:underline'
	}
}

function makeMap(str) {
	var map = Object.create(null),
		list = str.split(',');
	for (var i = list.length; i--;)
		map[list[i]] = true;
	return map;
}

// #ifdef MP-WEIXIN
if (wx.canIUse('editor')) {
	cfg.blockTags.pre = void 0;
	cfg.ignoreTags.rp = true;
	Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
	Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}
// #endif

// #ifdef APP-PLUS
cfg.ignoreTags.iframe = void 0;
Object.assign(cfg.trustTags, makeMap('embed,iframe'));
// #endif

module.exports = cfg;
