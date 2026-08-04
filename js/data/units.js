/* MathReviewWu 資料層 — 國中數學總複習重點整理（吳老師家教講義轉錄）
 *
 * schema：
 * MATH_UNITS = [{
 *   id:      'u01'～'u62'（照講義目次序）
 *   book:    1-6（第幾冊）
 *   sec:     '1-1'（章-節）
 *   title:   單元名
 *   page:    講義起始頁碼
 *   concepts:[{
 *     id:    'u01c1'（單元 id + c 序號）
 *     title: 觀念標題（照講義編號小節）
 *     body:  觀念內容 HTML；數學式用 $...$（KaTeX inline）/$$...$$（display）
 *            重點詞用 <b class="key">…</b>（對應講義填空底線處）
 *            講義內建例子用 <div class="inline-ex">例 …</div>
 *     fig:   選填，img/figs/<fig>.svg 檔名（不含副檔名）
 *     examples:[{ q:'題目', steps:['解題步驟…'], ans:'答案' }]  // 原創例題
 *   }]
 * }]
 *
 * 轉錄原則：講義填空處答案直接寫入並以 <b class="key"> 標記；
 * 例題為原創（每觀念 1-2 題），步驟逐步、國中生看得懂。
 */
var MATH_UNITS = [

{ id:'u01', book:1, sec:'1-1', title:'負數與數線', page:1, concepts:[
  { id:'u01c1', title:'正數與負數', body:
    '<p>(1) 正數：比 0 <b class="key">大</b>的數。</p>'+
    '<p>(2) 負數：比 0 <b class="key">小</b>的數。</p>'+
    '<p>(3) 正、負是<b class="key">相對</b>的觀念。</p>'+
    '<p>註：0 既不是正數，也不是負數，稱為<b class="key">中立數</b>。</p>',
    fig:'u01-posneg',
    examples:[
      { q:'氣溫「零下 3 度」若記為 $-3^\\circ C$，那麼「零上 10 度」應記為多少？0 度是正數還是負數？',
        steps:['零上（比 0 高）用正數表示：$+10^\\circ C$（或直接寫 $10^\\circ C$）。','0 既不是正數也不是負數，是中立數。'],
        ans:'$+10^\\circ C$；0 不是正數也不是負數' },
      { q:'下列哪些是負數？ $-7,\\ 0,\\ +2,\\ -0.5,\\ 3$',
        steps:['負數是比 0 小的數，找出帶負號的：$-7$ 和 $-0.5$。','0 是中立數，$+2$ 和 $3$ 是正數。'],
        ans:'$-7$、$-0.5$' } ] },

  { id:'u01c2', title:'「運算符號」與「性質符號」', body:
    '<p>(1)「＋」「－」用來表示數的正、負時，稱這兩個符號為<b class="key">性質符號</b>。</p>'+
    '<p>(2)「＋」「－」用來表示加減運算時，稱這兩個符號為<b class="key">運算符號</b>。</p>'+
    '<p>(3) 同號數：<b class="key">性質符號相同的數</b>。</p>'+
    '<p>(4) 異號數：<b class="key">性質符號不同的數</b>。</p>'+
    '<p>(5) 整數 $\\mathbb{Z}$ 包含：正整數 $\\mathbb{N}$（$1,2,3,4,5,\\dots$）、$0$、負整數（$-1,-2,-3,-4,-5,\\dots$）。</p>',
    fig:'u01-integers',
    examples:[
      { q:'算式 $(-3)+(+5)$ 中，出現的四個「＋」「－」符號各是運算符號還是性質符號？',
        steps:['$(-3)$ 裡的「－」表示 3 的負：性質符號。','中間的「＋」表示加法運算：運算符號。','$(+5)$ 裡的「＋」表示 5 的正：性質符號。'],
        ans:'括號內的＋－是性質符號，中間的＋是運算符號' },
      { q:'$-4$ 與 $-9$ 是同號數還是異號數？$-4$ 與 $7$ 呢？',
        steps:['$-4$、$-9$ 性質符號都是「－」→ 同號數。','$-4$ 是負、$7$ 是正，性質符號不同 → 異號數。'],
        ans:'$-4$ 與 $-9$ 同號；$-4$ 與 $7$ 異號' } ] },

  { id:'u01c3', title:'數線', body:
    '<p>數線三元素：</p>'+
    '<p>(1) 原點：<b class="key">零（0）點</b>。</p>'+
    '<p>(2) 正向：<b class="key">箭頭方向（越往右邊數字越大）</b>。</p>'+
    '<p>(3) 單位長：<b class="key">每格代表多長</b>。</p>',
    fig:'u01-numberline',
    examples:[
      { q:'在數線上，若原點右邊 3 格處代表 6，則每 1 格（單位長）代表多少？原點左邊 2 格代表多少？',
        steps:['3 格代表 6 → 每格 $6\\div 3=2$。','左邊是負向：2 格代表 $-2\\times 2=-4$。'],
        ans:'單位長 2；左邊 2 格是 $-4$' } ] },

  { id:'u01c4', title:'數的大小', body:
    '<p>如果數線的正向朝右，那麼：</p>'+
    '<p>(1) 數線上的兩個數，右邊的數 <b class="key">＞</b> 左邊的數。</p>'+
    '<p>(2) 正數大於 0，負數小於 0，因此 <b class="key">負數 ＜ 0 ＜ 正數</b>。</p>',
    fig:'u01-compare',
    examples:[
      { q:'比較大小：$-6$、$0$、$4$、$-1$（由小到大排列）',
        steps:['負數 < 0 < 正數，先分三堆：負數 $-6,-1$；中立 $0$；正數 $4$。','負數中 $-6$ 在數線更左邊，$-6<-1$。'],
        ans:'$-6<-1<0<4$' } ] },

  { id:'u01c5', title:'三一律', body:
    '<p>對於任意兩數 $a$、$b$，下列三種關係<b class="key">恰有一種</b>成立：$a>b$、$a<b$、$a=b$。</p>',
    examples:[
      { q:'已知 $a$ 不大於 $b$，且 $a\\neq b$，依三一律可斷定什麼？',
        steps:['三種關係恰有一種成立：$a>b$、$a<b$、$a=b$。','「不大於」排除 $a>b$；「$a\\neq b$」排除 $a=b$。'],
        ans:'$a<b$' } ] },

  { id:'u01c6', title:'遞移律', body:
    '<p>比較 $a$、$b$、$c$ 三數的大小關係時：</p>'+
    '<p>(1) 若 $a>b$ 且 $b>c$，則 <b class="key">$a>c$</b>。</p>'+
    '<p>(2) 若 $a<b$ 且 $b<c$，則 <b class="key">$a<c$</b>。</p>'+
    '<p>(3) 若 $a=b$ 且 $b=c$，則 <b class="key">$a=c$</b>。</p>',
    examples:[
      { q:'已知甲數 > 乙數，丙數 < 乙數，比較甲、丙的大小。',
        steps:['丙 < 乙 且 乙 < 甲（甲>乙 反過來寫）。','由遞移律：丙 < 甲。'],
        ans:'甲數 > 丙數' } ] },

  { id:'u01c7', title:'相反數', body:
    '<p>(1) 在數線上，位於原點的左右兩邊，且與原點的<b class="key">距離相等</b>的兩個點，所表示的兩個數<b class="key">互為相反數</b>。</p>'+
    '<div class="inline-ex">例：4 的相反數為 <b class="key">−4</b>；−7 的相反數為 <b class="key">+7</b>。</div>'+
    '<p>(2) 相反數的數字部分<b class="key">相同</b>，性質符號<b class="key">相反</b>。</p>'+
    '<p>(3) 若 $a$ 是不為 0 的任意數，則 $-a$ 是 $a$ 的相反數，且 $-(-a)=<b class="key">a</b>$。</p>'+
    '<p>(4) 0 的相反數是 <b class="key">0</b>。</p>',
    fig:'u01-opposite',
    examples:[
      { q:'求 $-(-8)$ 與 $-\\left(+\\dfrac{2}{3}\\right)$ 的值。',
        steps:['$-(-8)$ 是「$-8$ 的相反數」$=8$。','$-\\left(+\\dfrac{2}{3}\\right)$ 是「$\\dfrac{2}{3}$ 的相反數」$=-\\dfrac{2}{3}$。'],
        ans:'$8$；$-\\dfrac{2}{3}$' },
      { q:'數線上 A、B 兩點互為相反數，且兩點距離 10，求這兩個數。',
        steps:['互為相反數 → 與原點等距、分居兩側。','兩點距離 10 → 各距原點 5。'],
        ans:'$5$ 和 $-5$' } ] },

  { id:'u01c8', title:'絕對值', body:
    '<p>(1) 在數線上，點 $A(a)$ 與原點之間的距離稱為 $a$ 的<b class="key">絕對值</b>，以 $|a|$ 表示。</p>'+
    '<p>(2) 一個數的絕對值一定是<b class="key">正數</b>或 <b class="key">0</b>。</p>'+
    '<div class="inline-ex">例：$|-5|=5$；$|0|=0$。</div>'+
    '<p>(3) 互為<b class="key">相反數</b>的兩數，其<b class="key">絕對值</b>相等，即 $|a|=|-a|$。</p>'+
    '<div class="inline-ex">例：$|3|=|-3|=3$。</div>'+
    '<p>(4) 絕對值愈大的負數，其值<b class="key">愈小</b>。</p>'+
    '<div class="inline-ex">例：$|-5|>|-3|$，而 $-5<-3$。</div>',
    fig:'u01-abs',
    examples:[
      { q:'求 $|-7|+|4|-|0|$ 的值。',
        steps:['$|-7|=7$、$|4|=4$、$|0|=0$。','$7+4-0=11$。'],
        ans:'$11$' },
      { q:'若 $|x|=6$，求 $x$ 的所有可能值。',
        steps:['絕對值是與原點的距離，距原點 6 的點有左右兩個。','$x=6$ 或 $x=-6$。'],
        ans:'$x=\\pm 6$' },
      { q:'比較 $-\\dfrac{5}{2}$ 與 $-2.3$ 的大小。',
        steps:['兩數都是負數，比絕對值：$\\left|-\\dfrac{5}{2}\\right|=2.5$，$|-2.3|=2.3$。','絕對值愈大的負數愈小：$2.5>2.3$ → $-\\dfrac{5}{2}<-2.3$。'],
        ans:'$-\\dfrac{5}{2}<-2.3$' } ] }
]}

];

/* 目次骨架：尚未轉錄的單元（轉錄完成後逐一搬進上方陣列） */
var MATH_UNITS_TODO = [
  {id:'u02',book:1,sec:'1-2',title:'整數的加減',page:3},
  {id:'u03',book:1,sec:'1-3',title:'整數的乘除與四則運算',page:5},
  {id:'u04',book:1,sec:'1-4',title:'指數律',page:7},
  {id:'u05',book:1,sec:'1-5',title:'科學記號',page:8},
  {id:'u06',book:1,sec:'2-1',title:'因數倍數',page:9},
  {id:'u07',book:1,sec:'2-2',title:'最大公因數、最小公倍數',page:11},
  {id:'u08',book:1,sec:'2-3',title:'分數的加減運算',page:13},
  {id:'u09',book:1,sec:'2-4',title:'分數的乘除與四則運算',page:15},
  {id:'u10',book:1,sec:'3-1',title:'以符號列式與運算',page:17},
  {id:'u11',book:1,sec:'3-2',title:'一元一次方程式',page:19},
  {id:'u12',book:1,sec:'3-3',title:'應用問題',page:21},
  {id:'u13',book:2,sec:'1-1',title:'二元一次方程式',page:22},
  {id:'u14',book:2,sec:'1-2',title:'二元一次聯立方程式',page:23},
  {id:'u15',book:2,sec:'2-1',title:'直角坐標平面',page:24},
  {id:'u16',book:2,sec:'2-2',title:'二元一次方程式的圖形',page:25},
  {id:'u17',book:2,sec:'1-3',title:'解二元一次聯立方程式',page:27},
  {id:'u18',book:2,sec:'1-4',title:'應用問題',page:28},
  {id:'u19',book:2,sec:'3-1',title:'比例式',page:29},
  {id:'u20',book:2,sec:'3-2',title:'連比例',page:31},
  {id:'u21',book:2,sec:'3-3',title:'正比、反比',page:32},
  {id:'u22',book:2,sec:'4-1',title:'變數與函數',page:33},
  {id:'u23',book:2,sec:'4-2',title:'線型函數的圖形',page:35},
  {id:'u24',book:2,sec:'5-1',title:'一元一次不等式',page:36},
  {id:'u25',book:2,sec:'5-2',title:'解一元一次不等式',page:37},
  {id:'u26',book:3,sec:'1-1',title:'乘法公式',page:39},
  {id:'u27',book:3,sec:'1-2',title:'多項式的加減運算',page:41},
  {id:'u28',book:3,sec:'1-3',title:'多項式的乘除運算',page:43},
  {id:'u29',book:3,sec:'2-1',title:'平方根與近似值',page:44},
  {id:'u30',book:3,sec:'2-2',title:'根式的運算',page:46},
  {id:'u31',book:3,sec:'2-3',title:'畢氏定理',page:47},
  {id:'u32',book:3,sec:'3-1',title:'提公因式因式分解',page:49},
  {id:'u33',book:3,sec:'3-2',title:'乘法公式因式分解',page:50},
  {id:'u34',book:3,sec:'3-3',title:'十字交乘法因式分解',page:51},
  {id:'u35',book:3,sec:'4-1',title:'解一元二次方程式',page:52},
  {id:'u36',book:3,sec:'4-2',title:'配方法與公式解',page:53},
  {id:'u37',book:4,sec:'1-1',title:'等差數列',page:55},
  {id:'u38',book:4,sec:'1-2',title:'等差級數',page:57},
  {id:'u39',book:4,sec:'2-1',title:'生活中的平面圖形',page:58},
  {id:'u40',book:4,sec:'2-2',title:'垂直、平分與線對稱',page:63},
  {id:'u41',book:4,sec:'2-3',title:'尺規作圖',page:65},
  {id:'u42',book:4,sec:'3-1',title:'三角形的內、外角',page:66},
  {id:'u43',book:4,sec:'3-2',title:'三角形的全等',page:67},
  {id:'u44',book:4,sec:'3-3',title:'中垂線與角平分線',page:70},
  {id:'u45',book:4,sec:'3-4',title:'三角形邊角關係',page:72},
  {id:'u46',book:4,sec:'4-1',title:'平行',page:74},
  {id:'u47',book:4,sec:'4-2',title:'平行四邊形',page:76},
  {id:'u48',book:4,sec:'4-3',title:'特殊四邊形',page:78},
  {id:'u49',book:5,sec:'1-1',title:'比例線段',page:82},
  {id:'u50',book:5,sec:'1-2',title:'縮放與相似多邊形',page:84},
  {id:'u51',book:5,sec:'1-3',title:'相似三角形的應用',page:87},
  {id:'u52',book:5,sec:'2-1',title:'點、直線、圓的關係',page:88},
  {id:'u53',book:5,sec:'2-2',title:'圓心角、圓周角與弦切角',page:91},
  {id:'u54',book:5,sec:'3-1',title:'推理證明',page:93},
  {id:'u55',book:5,sec:'3-2',title:'外心、內心、重心',page:94},
  {id:'u56',book:6,sec:'1-1',title:'二次函數的圖形',page:98},
  {id:'u57',book:6,sec:'1-2',title:'配方法與二次函數的極值',page:101},
  {id:'u58',book:6,sec:'1-3',title:'二次函數的應用',page:103},
  {id:'u59',book:6,sec:'2-1',title:'角柱與圓柱',page:103},
  {id:'u60',book:6,sec:'2-2',title:'角錐與圓錐',page:105},
  {id:'u61',book:6,sec:'3-1',title:'次數分配與資料展示',page:108},
  {id:'u62',book:6,sec:'3-2',title:'資料的分析',page:113},
  {id:'u63',book:6,sec:'3-3',title:'機率',page:116}
];
