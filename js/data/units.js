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
]},

{ id:'u02', book:1, sec:'1-2', title:'整數的加減', page:3, concepts:[
  { id:'u02c1', title:'整數的加法', body:
    '<p>※ 當運算符號遇到性質符號時：<b class="key">＋＋⇒＋</b>、<b class="key">－－⇒＋</b>、<b class="key">＋－⇒－</b>、<b class="key">－＋⇒－</b>。</p>'+
    '<p>(1) 設 $a$、$b$ 是正整數，則：</p>'+
    '<p>① 同號數相加：</p>'+
    '<p>　(a) 兩正數相加，其和為正。</p>'+
    '<div class="inline-ex">例：$(+3)+(+2)=+(3+2)=5$。</div>'+
    '<p>　(b) 兩負數相加，其和為負。$(-a)+(-b)=-(a+b)$。</p>'+
    '<div class="inline-ex">例：$(-4)+(-2)=-(4+2)=-6$。</div>'+
    '<p>　→ 符號相同時，<b class="key">兩數相加，用相同的性質符號</b>（同流合污型）。</p>'+
    '<p>② 異號數相加：</p>'+
    '<p>　(a) 當 $a>b$ 時，$(-a)+b$ 的結果是「<b class="key">負數</b>」，其和為 $-(a-b)$。</p>'+
    '<div class="inline-ex">例：$(-3)+(+1)=-(3-1)=-2$。</div>'+
    '<p>　(b) 當 $a<b$ 時，$(-a)+b$ 的結果是「<b class="key">正數</b>」，其和為 $(b-a)$。</p>'+
    '<div class="inline-ex">例：$(-2)+5=+(5-2)=3$。</div>'+
    '<p>　→ 符號不同時，<b class="key">（大數－小數），用大數的性質符號</b>（大欺小型）。</p>'+
    '<p>(2) 設 $a$ 是整數，則 $a+0=<b class="key">a</b>=0+a$。</p>'+
    '<p>(3) 兩個相反數的和為 <b class="key">0</b>，即 $a+(-a)=0=(-a)+a$。</p>',
    fig:'u02-add',
    examples:[
      { q:'計算 $(-7)+(-6)$ 與 $(-9)+4$。',
        steps:['$(-7)+(-6)$：同號（同流合污）→ 相加取同符號：$-(7+6)=-13$。','$(-9)+4$：異號（大欺小）→ 大數 9 減小數 4，取大數的負號：$-(9-4)=-5$。'],
        ans:'$-13$；$-5$' },
      { q:'計算 $(-12)+12+(-8)$。',
        steps:['$(-12)+12$ 是相反數相加 $=0$。','$0+(-8)=-8$。'],
        ans:'$-8$' } ] },

  { id:'u02c2', title:'整數的加法性質', body:
    '<p>設 $a$、$b$、$c$ 是整數，則：</p>'+
    '<p>(1) 加法<b class="key">交換律</b>：$a+b=<b class="key">b+a</b>$。</p>'+
    '<p>(2) 加法<b class="key">結合律</b>：$a+b+c=(a+b)+c=<b class="key">a+(b+c)</b>$。</p>',
    examples:[
      { q:'用交換律與結合律速算 $17+(-25)+83+25$。',
        steps:['交換律重排：$17+83+(-25)+25$。','結合律分組：$(17+83)+((-25)+25)=100+0$。'],
        ans:'$100$' } ] },

  { id:'u02c3', title:'整數的減法運算', body:
    '<p>設 $a$、$b$ 是整數，則 $a-b=a+(<b class="key">-b</b>)$（減法變加法，減數變<b class="key">相反數</b>）。</p>'+
    '<p>(1) 整數減正整數：</p>'+
    '<div class="inline-ex">例：$3-5=3+(-5)=-2$；$(-2)-5=(-2)+(-5)=-7$。</div>'+
    '<p>(2) 整數減負整數：</p>'+
    '<div class="inline-ex">例：$2-(-5)=2+5=7$；$(-2)-(-5)=(-2)+5=3$。</div>',
    examples:[
      { q:'計算 $(-6)-9$ 與 $4-(-11)$。',
        steps:['$(-6)-9=(-6)+(-9)$：同號相加 $=-15$。','$4-(-11)=4+11=15$。'],
        ans:'$-15$；$15$' },
      { q:'台北氣溫 $18^\\circ C$，哈爾濱氣溫 $-12^\\circ C$，兩地溫差幾度？',
        steps:['溫差 $=18-(-12)$。','減負變加正：$18+12=30$。'],
        ans:'$30^\\circ C$' } ] },

  { id:'u02c4', title:'去括號規則', body:
    '<p>設 $a$、$b$ 是整數，則 $-(a+b)=-a-b$、$-(a-b)=-a+b$。</p>'+
    '<div class="inline-ex">例：$-(2+5)=-2-5$；$-(2-5)=-2+5$。</div>'+
    '<p>(1) 當括號前為「＋」號，去括號時，括號內的【<b class="key">照抄</b>】。</p>'+
    '<p>(2) 當括號前為「－」號，去括號時，括號內的【<b class="key">變號</b>】。</p>',
    examples:[
      { q:'去括號後計算 $15-(6-9)$。',
        steps:['括號前是「－」→ 括號內變號：$15-6+9$。','$15-6=9$，$9+9=18$。'],
        ans:'$18$' },
      { q:'化簡 $-(a-3)+(2a+1)$。',
        steps:['「－」括號變號：$-a+3$；「＋」括號照抄：$2a+1$。','合併：$-a+2a+3+1=a+4$。'],
        ans:'$a+4$' } ] },

  { id:'u02c5', title:'數線上兩點間的距離', body:
    '<p>一數線上有 $A(a)$、$B(b)$ 兩點，則 $A$、$B$ 兩點間的距離可記作 $\\overline{AB}$：</p>'+
    '<p>$\\overline{AB}=<b class="key">|a-b|</b>=<b class="key">|b-a|</b>=$（$a$、$b$ 中<b class="key">大的數</b>）$-$（$a$、$b$ 中<b class="key">小的數</b>）。</p>'+
    '<div class="inline-ex">例：數線上兩點 $A(-7)$、$B(5)$，則 $A$、$B$ 兩點間的距離 $\\overline{AB}=|5-(-7)|=12$。</div>',
    fig:'u02-dist',
    examples:[
      { q:'數線上 $P(-3)$、$Q(9)$，求 $\\overline{PQ}$。',
        steps:['大的數減小的數：$9-(-3)$。','$9+3=12$。'],
        ans:'$12$' },
      { q:'數線上 $A(2)$ 與 $B$ 的距離是 5，求 $B$ 代表的數。',
        steps:['$B$ 可能在 $A$ 的右邊：$2+5=7$。','也可能在左邊：$2-5=-3$。'],
        ans:'$7$ 或 $-3$' } ] },

  { id:'u02c6', title:'線段的中點', body:
    '<p>數線上有 $A$、$B$、$C$ 三點，如果 $C$ 在 $A$、$B$ 之間，且到 $A$、$B$ 的距離相等，我們就稱 $C$ 點為 $A$、$B$（或 $\\overline{AB}$）的<b class="key">中點</b>。$C=\\dfrac{A+B}{2}$。</p>',
    examples:[
      { q:'數線上 $A(-4)$、$B(10)$，求 $\\overline{AB}$ 的中點 $C$。',
        steps:['$C=\\dfrac{A+B}{2}=\\dfrac{-4+10}{2}$。','$=\\dfrac{6}{2}=3$。'],
        ans:'$C(3)$' },
      { q:'$M(1)$ 是 $\\overline{PQ}$ 的中點，$P(-6)$，求 $Q$。',
        steps:['$\\dfrac{-6+Q}{2}=1$ → $-6+Q=2$。','$Q=8$。'],
        ans:'$Q(8)$' } ] }
]},

{ id:'u03', book:1, sec:'1-3', title:'整數的乘除與四則運算', page:5, concepts:[
  { id:'u03c1', title:'整數的乘法運算（先決定正負）', body:
    '<p>(1) <b class="key">同號</b>的兩整數相乘，其結果為<b class="key">正整數</b>。$(+)\\times(+)=(+)$、$(-)\\times(-)=(+)$。</p>'+
    '<p>(2) <b class="key">異號</b>的兩整數相乘，其結果為<b class="key">負整數</b>。$(+)\\times(-)=(-)$、$(-)\\times(+)=(-)$。</p>'+
    '<p>註：若 $a$ 為任意整數，則：</p>'+
    '<p>　(1) $a\\times 0=0\\times a=<b class="key">0</b>$。</p>'+
    '<div class="inline-ex">例：$(-3)\\times 0=0\\times(-3)=0$。</div>'+
    '<p>　(2) $a\\times 1=1\\times a=<b class="key">a</b>$。</p>'+
    '<div class="inline-ex">例：$(-4)\\times 1=1\\times(-4)=-4$。</div>'+
    '<p>　(3) $a\\times(-1)=(-1)\\times a=<b class="key">-a</b>$。</p>'+
    '<div class="inline-ex">例：$5\\times(-1)=(-1)\\times 5=-5$。</div>'+
    '<p>→ 若有<b class="key">偶數</b>個「負數」相乘，則其乘積為<b class="key">正數</b>；若有<b class="key">奇數</b>個「負數」相乘，則其乘積為<b class="key">負數</b>。</p>'+
    '<p>(3) 乘法運算規律：設 $a$、$b$、$c$ 是整數，則：</p>'+
    '<p>　&lt;1&gt; 乘法<b class="key">交換律</b>：$a\\times b=b\\times a$。</p>'+
    '<div class="inline-ex">例：$3\\times(-5)=(-5)\\times 3$。</div>'+
    '<p>　&lt;2&gt; 乘法<b class="key">結合律</b>：$a\\times b\\times c=(a\\times b)\\times c=a\\times(b\\times c)$。</p>'+
    '<div class="inline-ex">例：$[3\\times(-5)]\\times 2=3\\times[(-5)\\times 2]$。</div>'+
    '<p>　&lt;3&gt; 乘法對加（減）法的<b class="key">分配律</b>：</p>'+
    '<p>　　① $c\\times(a+b)=c\\times a+c\\times b$；$(a+b)\\times c=a\\times c+b\\times c$。</p>'+
    '<p>　　② $c\\times(a-b)=c\\times a-c\\times b$；$(a-b)\\times c=a\\times c-b\\times c$。</p>'+
    '<div class="inline-ex">例：$(-5)\\times 102=(-5)\\times(\\underline{100}+\\underline{2})=(-5)\\times 100+(-5)\\times 2$。</div>',
    examples:[
      { q:'計算 $(-6)\\times(-8)$ 與 $7\\times(-9)$。',
        steps:['$(-6)\\times(-8)$：同號相乘得正 → $6\\times 8=48$。','$7\\times(-9)$：異號相乘得負 → $-(7\\times 9)=-63$。'],
        ans:'$48$；$-63$' },
      { q:'計算 $(-2)\\times(-3)\\times(-5)$。',
        steps:['負數有 3 個（奇數個）→ 乘積為負。','數字相乘：$2\\times 3\\times 5=30$，加上負號。'],
        ans:'$-30$' },
      { q:'用分配律速算 $(-4)\\times 98$。',
        steps:['$98=100-2$，$(-4)\\times 98=(-4)\\times(100-2)$。','$=(-4)\\times 100-(-4)\\times 2=-400+8=-392$。'],
        ans:'$-392$' } ] },

  { id:'u03c2', title:'整數的除法運算（先決定正負）', body:
    '<p>(1) <b class="key">同號</b>的兩整數相除，其結果為<b class="key">正數</b>。</p>'+
    '<p>(2) <b class="key">異號</b>的兩整數相除，其結果為<b class="key">負數</b>。</p>'+
    '<p>(3)「0」除以「不為 0 的整數」，其結果皆是 <b class="key">0</b>。</p>'+
    '<p>整理：正整數除以正整數，結果為正數 $(+)\\div(+)=(+)$；負整數除以正整數，結果為負數 $(-)\\div(+)=(-)$；正整數除以負整數，結果為負數 $(+)\\div(-)=(-)$；負整數除以負整數，結果為正數 $(-)\\div(-)=(+)$。</p>',
    examples:[
      { q:'計算 $(-36)\\div(-4)$ 與 $45\\div(-9)$。',
        steps:['$(-36)\\div(-4)$：同號相除得正 → $36\\div 4=9$。','$45\\div(-9)$：異號相除得負 → $-(45\\div 9)=-5$。'],
        ans:'$9$；$-5$' },
      { q:'計算 $0\\div(-7)$。$(-7)\\div 0$ 有意義嗎？',
        steps:['$0$ 除以不為 0 的整數，結果是 $0$。','除數不可以是 $0$，$(-7)\\div 0$ 沒有意義。'],
        ans:'$0$；沒有意義' } ] },

  { id:'u03c3', title:'整數的四則運算', body:
    '<p>(1) 若只有加減或只有乘除運算時，通常由<b class="key">左而右</b>計算。</p>'+
    '<p>(2) 若同時有加、減、乘、除運算時，要<b class="key">先</b>做<b class="key">乘除</b>再做<b class="key">加減</b>。</p>'+
    '<p>(3) 若有括號時，<b class="key">括號內</b>的運算必須<b class="key">先算</b>，或利用去括號規則（乘法分配律）去括號後再算。</p>'+
    '<p>(4) 若算式中有絕對值，應優先計算<b class="key">絕對值內</b>的值，再做其他的運算。</p>',
    examples:[
      { q:'計算 $12-8\\div(-2)\\times 3$。',
        steps:['先乘除：$8\\div(-2)=-4$，$(-4)\\times 3=-12$。','再加減：$12-(-12)=12+12=24$。'],
        ans:'$24$' },
      { q:'計算 $|-6|+(-2)\\times[5-(-1)]$。',
        steps:['先算絕對值與括號：$|-6|=6$；$5-(-1)=6$。','乘法：$(-2)\\times 6=-12$。','$6+(-12)=-6$。'],
        ans:'$-6$' } ] }
]},

{ id:'u04', book:1, sec:'1-4', title:'指數律', page:7, concepts:[
  { id:'u04c1', title:'乘方的意義', body:
    '<p>若 $a$ 是不為 0 的整數，且 $n$ 為正整數，則：</p>'+
    '<p>(1) $a^n=\\underbrace{a\\times a\\times\\cdots\\times a}_{n\\text{ 個}}$，$a$ 稱為<b class="key">底數</b>、$n$ 稱為<b class="key">指數</b>，讀作「$a$ 的 $n$ 次方」。</p>'+
    '<div class="inline-ex">例：$5^3=5\\times 5\\times 5$；$(-2)^4=(-2)\\times(-2)\\times(-2)\\times(-2)$；$-3^4=-(3\\times 3\\times 3\\times 3)$。</div>'+
    '<p>(2) $a^0=<b class="key">1</b>$（零指數，規定）。</p>'+
    '<div class="inline-ex">例：$5^0=1$、$(-7)^0=1$、$12356^0=1$。</div>'+
    '<p>(3) $a^{-n}=\\dfrac{1}{a^n}$（負整數指數，規定）。</p>'+
    '<div class="inline-ex">例：$5^{-3}=\\dfrac{1}{5^3}$、$8^{-4}=\\dfrac{1}{8^4}$。</div>'+
    '<p>(4) $0^n=<b class="key">0</b>$。</p>'+
    '<div class="inline-ex">例：$0^5=0$、$0^{12}=0$。</div>'+
    '<p>(5) <b class="key">1 的任意次方都是 1</b>。</p>'+
    '<div class="inline-ex">例：$1^3=1$、$1^0=1$、$1^{-5}=1$。</div>'+
    '<p>→ 負數的乘方：負數的<b class="key">偶數</b>次方，其結果是<b class="key">正數</b>；負數的<b class="key">奇數</b>次方，其結果是<b class="key">負數</b>。</p>',
    examples:[
      { q:'求 $(-2)^4$、$-2^4$ 與 $(-2)^3$ 的值，並說明差別。',
        steps:['$(-2)^4$：底數是 $-2$，偶數次方得正 → $16$。','$-2^4$：指數只管 $2$，$=-(2^4)=-16$（負號在外面）。','$(-2)^3$：奇數次方得負 → $-8$。'],
        ans:'$16$；$-16$；$-8$' },
      { q:'求 $(-6)^0+3^{-2}$ 的值。',
        steps:['$(-6)^0=1$（零指數規定）。','$3^{-2}=\\dfrac{1}{3^2}=\\dfrac{1}{9}$。','$1+\\dfrac{1}{9}=\\dfrac{10}{9}$。'],
        ans:'$\\dfrac{10}{9}$' } ] },

  { id:'u04c2', title:'指數律', body:
    '<p>若 $a$、$b$ 是不為 0 的整數，且 $m$、$n$ 為整數，則：</p>'+
    '<p>(1) $a^m\\times a^n=$ <b class="key">$a^{m+n}$</b> —— 同底相乘，指數<b class="key">相加</b>。</p>'+
    '<div class="inline-ex">例：$5^3\\times 5^4=5^{3+4}=5^7$。</div>'+
    '<p>(2) $a^m\\div a^n=\\dfrac{a^m}{a^n}=$ <b class="key">$a^{m-n}$</b> —— 同底相除，指數<b class="key">相減</b>。</p>'+
    '<div class="inline-ex">例：$2^7\\div 2^3=2^{7-3}=2^4$。</div>'+
    '<p>(3) $(a^m)^n=$ <b class="key">$a^{m\\times n}$</b>。</p>'+
    '<div class="inline-ex">例：$(5^2)^4=5^{2\\times 4}=5^8$。</div>'+
    '<p>(4) $(a\\times b)^m=$ <b class="key">$a^m\\times b^m$</b>。</p>'+
    '<div class="inline-ex">例：$(3\\times 5)^4=3^4\\times 5^4$。</div>',
    examples:[
      { q:'化簡 $2^5\\times 2^3\\div 2^6$。',
        steps:['同底相乘指數相加：$2^{5+3}=2^8$。','同底相除指數相減：$2^{8-6}=2^2=4$。'],
        ans:'$2^2=4$' },
      { q:'化簡 $(3^2)^5\\div 3^7$。',
        steps:['$(3^2)^5=3^{2\\times 5}=3^{10}$。','$3^{10}\\div 3^7=3^{10-7}=3^3=27$。'],
        ans:'$3^3=27$' },
      { q:'若 $2^x=5$，求 $2^{x+3}$ 的值。',
        steps:['$2^{x+3}=2^x\\times 2^3$（同底相乘指數相加反用）。','$=5\\times 8=40$。'],
        ans:'$40$' } ] }
]},

{ id:'u05', book:1, sec:'1-5', title:'科學記號', page:8, concepts:[
  { id:'u05c1', title:'科學記號表示法', body:
    '<p>一個正數用科學記號表示成「<b class="key">$a\\times 10^n$</b>」的形式，其中 <b class="key">$1\\le a<10$ 且 $n$ 為整數</b>。</p>'+
    '<div class="inline-ex">例：$5\\times 10^4$、$2.36\\times 10^8$、$1.57\\times 10^{-6}$ 都是科學記號表示法。$50000=5\\times 10^4$，$0.0000038=3.8\\times 10^{-6}$。</div>'+
    '<p>(1) 科學記號 $a\\times 10^n$ 乘開後，整數部分是 <b class="key">$(n+1)$ 位數</b>，有 <b class="key">$n$ 個 0</b>。</p>'+
    '<p>(2) 科學記號 $a\\times 10^{-n}$ 乘開後，小數點後<b class="key">第 $n$ 位</b>才開始出現不為 0 的數字。</p>',
    examples:[
      { q:'把 32000000 與 0.00052 用科學記號表示。',
        steps:['$32000000=3.2\\times 10^7$（小數點左移 7 位，$1\\le 3.2<10$）。','$0.00052=5.2\\times 10^{-4}$（小數點右移 4 位）。'],
        ans:'$3.2\\times 10^7$；$5.2\\times 10^{-4}$' },
      { q:'$7.5\\times 10^5$ 乘開後是幾位數？$4\\times 10^{-3}$ 乘開後小數點後第幾位開始不為 0？',
        steps:['整數部分是 $(5+1)=6$ 位數：$750000$。','$4\\times 10^{-3}=0.004$，小數點後第 3 位開始不為 0。'],
        ans:'6 位數；第 3 位' } ] },

  { id:'u05c2', title:'科學記號的比較大小', body:
    '<p>當兩數用科學記號表示成 $A=a\\times 10^m$、$B=b\\times 10^n$，$m$、$n$ 為整數，其中 $1\\le a<10$、$1\\le b<10$，則：</p>'+
    '<p>(1) 若 <b class="key">$m>n$</b>，則 $a\\times 10^m>b\\times 10^n$。</p>'+
    '<div class="inline-ex">例：$6\\times 10^4>8\\times 10^2$。</div>'+
    '<p>(2) 若 <b class="key">$m=n$，且 $a>b$</b>，則 $a\\times 10^m>b\\times 10^n$。</p>'+
    '<div class="inline-ex">例：$8\\times 10^2>6\\times 10^2$。</div>',
    examples:[
      { q:'比較 $9.8\\times 10^6$ 與 $1.2\\times 10^7$ 的大小。',
        steps:['先比指數：$7>6$。','指數大的贏：$1.2\\times 10^7>9.8\\times 10^6$。'],
        ans:'$1.2\\times 10^7>9.8\\times 10^6$' } ] },

  { id:'u05c3', title:'科學記號的乘除運算', body:
    '<p>若 $A=a\\times 10^m$、$B=b\\times 10^n$ 均為科學記號的表示法，則：</p>'+
    '<p>(1) $A\\times B=(a\\times b)\\times(10^m\\times 10^n)=$ <b class="key">$(a\\times b)\\times 10^{m+n}$</b>。</p>'+
    '<div class="inline-ex">例：$(2\\times 10^4)\\times(4\\times 10^5)=(2\\times 4)\\times 10^{4+5}=8\\times 10^9$。</div>'+
    '<p>(2) $A\\div B=\\dfrac{a\\times 10^m}{b\\times 10^n}=$ <b class="key">$\\dfrac{a}{b}\\times 10^{m-n}$</b>。</p>'+
    '<div class="inline-ex">例：$(5\\times 10^2)\\div(8\\times 10^7)=\\dfrac{5\\times 10^2}{8\\times 10^7}=\\dfrac{5}{8}\\times 10^{2-7}=0.625\\times 10^{-5}=6.25\\times 10^{-6}$。</div>',
    examples:[
      { q:'計算 $(3\\times 10^5)\\times(6\\times 10^2)$，答案用科學記號表示。',
        steps:['$(3\\times 6)\\times 10^{5+2}=18\\times 10^7$。','$18$ 不在 $1\\le a<10$ 範圍，調整：$18\\times 10^7=1.8\\times 10^8$。'],
        ans:'$1.8\\times 10^8$' },
      { q:'計算 $(8\\times 10^6)\\div(4\\times 10^{-2})$。',
        steps:['$\\dfrac{8}{4}\\times 10^{6-(-2)}$。','$=2\\times 10^8$。'],
        ans:'$2\\times 10^8$' } ] },

  { id:'u05c4', title:'科學記號的加減運算', body:
    '<p>進行科學記號的加減運算時，先將科學記號的<b class="key">指數</b>部分<b class="key">化為相同</b>（次方大的），再利用分配律進行運算。</p>'+
    '<div class="inline-ex">例(1)：$7\\times 10^8+5\\times 10^8=(7+5)\\times 10^8=12\\times 10^8=1.2\\times 10^9$。<br>例(2)：$3\\times 10^{-5}-7\\times 10^{-6}=3\\times 10^{-5}-0.7\\times 10^{-5}=2.3\\times 10^{-5}$。</div>',
    examples:[
      { q:'計算 $4.2\\times 10^6+9\\times 10^5$。',
        steps:['化成同指數（取大的 $10^6$）：$9\\times 10^5=0.9\\times 10^6$。','$(4.2+0.9)\\times 10^6=5.1\\times 10^6$。'],
        ans:'$5.1\\times 10^6$' },
      { q:'計算 $6\\times 10^{-3}-8\\times 10^{-4}$。',
        steps:['化成 $10^{-3}$：$8\\times 10^{-4}=0.8\\times 10^{-3}$。','$(6-0.8)\\times 10^{-3}=5.2\\times 10^{-3}$。'],
        ans:'$5.2\\times 10^{-3}$' } ] }
]},

{ id:'u06', book:1, sec:'2-1', title:'因數倍數', page:9, concepts:[
  { id:'u06c1', title:'因數與倍數', body:
    '<p>(1) 因數：<b class="key">可以「整除」別人的數</b>。</p>'+
    '<p>(2) 倍數：<b class="key">可以被別人整除的數</b>。</p>'+
    '<p>(3) 整除：<b class="key">餘數 $=0$</b>。</p>'+
    '<p>(4) 對於 $a$、$b$、$c$ 三個整數，$b\\neq 0$，若 $a=b\\times c$，則 $a$ 是 $b$ 的<b class="key">倍數</b>，$b$ 是 $a$ 的<b class="key">因數</b>。</p>'+
    '<p>註：(1) 1 是任何整數的<b class="key">因數</b>；任何整數都是 1 的<b class="key">倍數</b>。</p>'+
    '<p>　(2) 0 <b class="key">不是</b>任何整數的<b class="key">因數</b>；0 是任意<b class="key">非零</b>整數的<b class="key">倍數</b>。</p>'+
    '<p>　(3) 在國中數學中，如果沒有特別指明，因數是指<b class="key">正因數</b>，倍數是指<b class="key">正倍數</b>。</p>',
    examples:[
      { q:'寫出 18 的所有因數，並判斷 18 是哪些數的倍數。',
        steps:['把 18 寫成兩數相乘：$1\\times 18$、$2\\times 9$、$3\\times 6$。','因數：1、2、3、6、9、18。','18 能被這些數整除，所以 18 同時是它們的倍數。'],
        ans:'因數 1、2、3、6、9、18' },
      { q:'判斷下列敘述對錯：「0 是 7 的倍數」、「7 是 0 的因數」。',
        steps:['$0=7\\times 0$，0 可以被 7 整除 → 0 是 7 的倍數（0 是任意非零整數的倍數）✓。','0 不能整除任何數（不能當除數）→ 0 不是任何整數的因數；但「7 是 0 的因數」問的是 7 整除 0，$0\\div 7=0$ 整除 ✓。'],
        ans:'兩句都對' } ] },

  { id:'u06c2', title:'倍數判別法', body:
    '<p>(1) <b class="key">2</b> 的倍數：個位數字為 <b class="key">0、2、4、6、8</b>。</p>'+
    '<p>(2) <b class="key">5</b> 的倍數：個位數字為 <b class="key">0 或 5</b>。</p>'+
    '<p>(3) <b class="key">4</b> 的倍數：末兩位數字為 <b class="key">00 或 4 的倍數</b>。</p>'+
    '<p>(4) <b class="key">9</b> 的倍數：各個數字和為 <b class="key">9 的倍數</b>。</p>'+
    '<p>(5) <b class="key">3</b> 的倍數：各個數字和為 <b class="key">3 的倍數</b>。</p>'+
    '<p>(6) <b class="key">11</b> 的倍數：<b class="key">奇數位數字和與偶數位數字和的差</b>為 <b class="key">11 的倍數或 0</b>。</p>'+
    '<p>(7) <b class="key">7</b> 的倍數：由個位數起每三位數為一節，各奇數節與偶數節的和相減為 7 的倍數者。</p>'+
    '<div class="inline-ex">例：$840889 \\Rightarrow 889-840=49$，由於 $49\\div 7=7$，故 840889 為 7 的倍數。</div>'+
    '<p>(8) <b class="key">13</b> 的倍數：由個位數起每三位數為一節，各奇數節與偶數節的和相減為 13 的倍數者。</p>'+
    '<div class="inline-ex">例：$117143 \\Rightarrow 143-117=26$，由於 $26\\div 13=2$，故 117143 為 13 的倍數。</div>',
    examples:[
      { q:'判斷 4356 是不是 3、4、9、11 的倍數。',
        steps:['數字和 $4+3+5+6=18$：是 9 的倍數（也是 3 的倍數）✓。','末兩位 56：$56\\div 4=14$ → 是 4 的倍數 ✓。','奇數位和 $6+3=9$、偶數位和 $5+4=9$，差 $=0$ → 是 11 的倍數 ✓。'],
        ans:'3、4、9、11 的倍數都是' },
      { q:'三位數 $\\overline{52\\square}$ 是 3 的倍數，$\\square$ 可能是哪些數字？',
        steps:['數字和 $5+2+\\square=7+\\square$ 要是 3 的倍數。','$7+\\square\\in\\{9,12,15\\}$ → $\\square=2,5,8$。'],
        ans:'$2$、$5$、$8$' } ] },

  { id:'u06c3', title:'質數與合數', body:
    '<p>(1) <b class="key">質數</b>：<b class="key">大於 1 的整數</b>中，除了 <b class="key">1 與本身</b>外，沒有其它因數者。</p>'+
    '<p>　① 最小的質數：<b class="key">2</b>。</p>'+
    '<p>　② 唯一的<b class="key">偶數質數</b>：<b class="key">2</b>。</p>'+
    '<p>　③ 質數有 <b class="key">2</b> 個因數。</p>'+
    '<p>(2) <b class="key">合數</b>：大於 1 的整數中，<b class="key">不是質數者</b>。</p>'+
    '<p>　① 最小的合數：<b class="key">4</b>。</p>'+
    '<p>註：1 <b class="key">不是質數</b>也<b class="key">不是合數</b>。</p>',
    examples:[
      { q:'1～20 中有哪些質數？共幾個？',
        steps:['逐一篩：2、3、5、7、11、13、17、19。','1 不是質數；4、6、8、9、10⋯ 是合數。'],
        ans:'2,3,5,7,11,13,17,19 共 8 個' },
      { q:'判斷 91 是質數還是合數。',
        steps:['試除小質數：$91\\div 7=13$。','$91=7\\times 13$ 有 1 和本身以外的因數 → 合數。'],
        ans:'合數（$7\\times 13$）' } ] },

  { id:'u06c4', title:'質因數', body:
    '<p><b class="key">質因數</b>：<b class="key">因數中為質數者</b>。</p>'+
    '<div class="inline-ex">例：12 的因數有 1、2、3、4、6、12，所以 12 的質因數是 <b class="key">2、3</b>。</div>',
    examples:[
      { q:'求 60 的所有質因數。',
        steps:['$60=2\\times 30=2\\times 2\\times 15=2^2\\times 3\\times 5$。','因數中是質數的：2、3、5。'],
        ans:'$2$、$3$、$5$' } ] },

  { id:'u06c5', title:'質因數分解（樹狀分解法、短除法）', body:
    '<p>將一個大於 1 的整數（<b class="key">合數</b>）分解成質數的<b class="key">連乘積</b>，這種分解過程稱為<b class="key">質因數分解</b>。</p>'+
    '<div class="inline-ex">例：$12=2\\times 2\\times 3$，12 的質因數為 2、3。</div>',
    examples:[
      { q:'用短除法將 84 做質因數分解。',
        steps:['$84\\div 2=42$，$42\\div 2=21$，$21\\div 3=7$，$7$ 是質數。','$84=2\\times 2\\times 3\\times 7$。'],
        ans:'$84=2^2\\times 3\\times 7$' } ] },

  { id:'u06c6', title:'標準分解式', body:
    '<p>將一個合數做質因數分解，寫成<b class="key">指數</b>的形式，並將<b class="key">底數由小排到大</b>，這樣的表示法稱為此合數的<b class="key">標準分解式</b>。</p>'+
    '<div class="inline-ex">例：$180=2^2\\times 3^2\\times 5$，$2^2\\times 3^2\\times 5$ 稱為 180 的標準分解式。</div>',
    examples:[
      { q:'寫出 360 的標準分解式。',
        steps:['$360=2\\times 180=2\\times 2\\times 90=2\\times 2\\times 2\\times 45=2^3\\times 45$。','$45=3^2\\times 5$。','合併：$360=2^3\\times 3^2\\times 5$。'],
        ans:'$360=2^3\\times 3^2\\times 5$' },
      { q:'若 $N=2^3\\times 3\\times 5^2$，$N$ 是多少？質因數有哪些？',
        steps:['$N=8\\times 3\\times 25$。','$=600$；質因數是底數：2、3、5。'],
        ans:'$N=600$；質因數 2、3、5' } ] }
]},

{ id:'u07', book:1, sec:'2-2', title:'最大公因數、最小公倍數', page:11, concepts:[
  { id:'u07c1', title:'公因數與最大公因數', body:
    '<p>(1) <b class="key">公因數</b>：<b class="key">因數中相同的</b>。</p>'+
    '<p>(2) <b class="key">最大公因數</b>：<b class="key">公因數中最大的</b>，符號：<b class="key">$(a,b)$</b>。方法：① <b class="key">列舉法</b>、② <b class="key">短除法</b>、③ <b class="key">標準分解式</b>。</p>'+
    '<p>→ 用標準分解式求最大公因數：先將每個正整數寫成標準分解式，再從共同質因數的乘方中取「<b class="key">次方最低者</b>」相乘，即得到它們的最大公因數。</p>'+
    '<p>(3) <b class="key">公因數</b>是<b class="key">最大公因數</b>的<b class="key">因數</b>。</p>'+
    '<div class="inline-ex">例：6 的因數：1、2、3、6；15 的因數：1、3、5、15。6 與 15 的公因數：<b class="key">1、3</b>；最大公因數 $(6,15)=<b class="key">3</b>$。</div>'+
    '<p>※ 最大公因數的英文為 Greatest Common Divisor（G.C.D.），或 Highest Common Factor（H.C.F.）。</p>',
    examples:[
      { q:'求 $(24,36)$，並列出 24 與 36 的所有公因數。',
        steps:['$24=2^3\\times 3$、$36=2^2\\times 3^2$。','共同質因數取次方低者：$2^2\\times 3=12$，故 $(24,36)=12$。','公因數是 12 的因數：1、2、3、4、6、12。'],
        ans:'$(24,36)=12$；公因數 1,2,3,4,6,12' } ] },

  { id:'u07c2', title:'互質', body:
    '<p><b class="key">互質</b>：<b class="key">兩數最大公因數 $=1$</b>。</p>'+
    '<div class="inline-ex">例：$(3,4)=1$，故 3 與 4 互質。</div>',
    examples:[
      { q:'8 和 15 互質嗎？9 和 15 呢？',
        steps:['$8=2^3$、$15=3\\times 5$，沒有共同質因數 → $(8,15)=1$ 互質。','$9=3^2$、$15=3\\times 5$，$(9,15)=3\\neq 1$ → 不互質。'],
        ans:'8、15 互質；9、15 不互質' } ] },

  { id:'u07c3', title:'公倍數與最小公倍數', body:
    '<p>(1) <b class="key">公倍數</b>：<b class="key">倍數中相同的</b>。</p>'+
    '<p>(2) <b class="key">最小公倍數</b>：<b class="key">公倍數中最小的</b>，符號：<b class="key">$[a,b]$</b>。方法：① <b class="key">列舉法</b>、② <b class="key">短除法</b>、③ <b class="key">標準分解式</b>。</p>'+
    '<p>→ 用標準分解式求最小公倍數：先將每個正整數寫成標準分解式，找出全部的質因數，再從所有的質因數中取「<b class="key">次方最高者</b>」相乘，即得到它們的最小公倍數。</p>'+
    '<p>(3) <b class="key">公倍數</b>是<b class="key">最小公倍數</b>的<b class="key">倍數</b>。</p>'+
    '<div class="inline-ex">例：6 的倍數：6、12、18、24⋯；9 的倍數：9、18、27、36⋯。6 與 9 的公倍數：<b class="key">18、36、54⋯</b>；最小公倍數 $[6,9]=<b class="key">18</b>$。</div>'+
    '<p>※ 最小公倍數的英文為 Least Common Multiple（L.C.M.）。</p>',
    examples:[
      { q:'求 $[8,12]$，並寫出 8 與 12 的最小三個公倍數。',
        steps:['$8=2^3$、$12=2^2\\times 3$。','全部質因數取次方高者：$2^3\\times 3=24$。','公倍數是 24 的倍數：24、48、72。'],
        ans:'$[8,12]=24$；公倍數 24,48,72' } ] },

  { id:'u07c4', title:'利用短除法求最大公因數、最小公倍數', body:
    '<p>(1) 求最大公因數：做到<b class="key">所有數沒有共同質因數</b>。</p>'+
    '<p>(2) 求最小公倍數：做到<b class="key">任 2 數沒有共同質因數</b>。</p>'+
    '<div class="inline-ex">例：求 30、140、490 的最大公因數和最小公倍數。$(30,140,490)=2\\times 5=10$；$[30,140,490]=2^2\\times 3\\times 5\\times 7^2=2940$。</div>',
    examples:[
      { q:'用短除法求 $(18,24)$ 與 $[18,24]$。',
        steps:['同除 2：得 9、12；再同除 3：得 3、4；3 與 4 互質，停。','最大公因數＝旁邊的數相乘：$2\\times 3=6$。','最小公倍數＝旁邊乘最後一排：$2\\times 3\\times 3\\times 4=72$。'],
        ans:'$(18,24)=6$；$[18,24]=72$' },
      { q:'三個數 12、20、30，求最大公因數與最小公倍數。',
        steps:['同除 2：6、10、15（三數已無共同質因數）→ $(12,20,30)=2$。','續求 LCM：任兩數還有公因數，2｜6,10→3,5,15；3｜3,15→1,5;5｜5,5→1,1（配合 15→5）。','$[12,20,30]=2\\times 2\\times 3\\times 5=60$。'],
        ans:'$(12,20,30)=2$；$[12,20,30]=60$' } ] },

  { id:'u07c5', title:'利用標準分解式求最大公因數、最小公倍數', body:
    '<p>(1) 求最大公因數：（<b class="key">共同出現才選取</b>）<b class="key">共同質因數中次方最小的相乘</b>。</p>'+
    '<p>(2) 求最小公倍數：（<b class="key">只要出現就選取</b>）<b class="key">質因數中次方大的相乘</b>。</p>'+
    '<div class="inline-ex">例：求 $350=2\\times 5^2\\times 7$ 與 $180=2^2\\times 3^2\\times 5$ 的最大公因數和最小公倍數。$(350,180)=2\\times 5$；$[350,180]=2^2\\times 3^2\\times 5^2\\times 7$。</div>',
    examples:[
      { q:'已知 $A=2^3\\times 3\\times 5^2$、$B=2\\times 3^2\\times 7$，求 $(A,B)$ 與 $[A,B]$。',
        steps:['共同質因數：2 和 3，取次方小的：$2^1\\times 3^1=6$。','全部質因數取次方大的：$2^3\\times 3^2\\times 5^2\\times 7$。'],
        ans:'$(A,B)=6$；$[A,B]=2^3\\times 3^2\\times 5^2\\times 7=12600$' } ] }
]},

{ id:'u08', book:1, sec:'2-3', title:'分數的加減運算', page:13, concepts:[
  { id:'u08c1', title:'負分數', body:
    '<p>對於 $a$、$b$ 兩個正整數，$\\dfrac{-b}{a}=\\dfrac{b}{-a}=-\\dfrac{b}{a}$。</p>'+
    '<div class="inline-ex">例：$\\dfrac{-7}{4}=\\dfrac{7}{-4}=-\\dfrac{7}{4}$。</div>',
    examples:[
      { q:'把 $\\dfrac{5}{-8}$ 與 $\\dfrac{-3}{-7}$ 化成標準寫法。',
        steps:['$\\dfrac{5}{-8}=-\\dfrac{5}{8}$（負號提到最前面）。','$\\dfrac{-3}{-7}$ 分子分母同負，負負得正 $=\\dfrac{3}{7}$。'],
        ans:'$-\\dfrac{5}{8}$；$\\dfrac{3}{7}$' } ] },

  { id:'u08c2', title:'等值分數', body:
    '<p>對於任意一個分數 $\\dfrac{a}{b}$（$a$、$b$ 皆為整數且 $b$ 不為 0）：</p>'+
    '<p>① 分子與分母<b class="key">同乘以</b>一個不為 0 的整數 $c$ 後，其值不變，即 $\\dfrac{a}{b}=\\dfrac{a\\times c}{b\\times c}$（<b class="key">擴分</b>）。</p>'+
    '<p>② 分子與分母<b class="key">同除以</b>一個不為 0 的整數 $c$ 後，其值不變，即 $\\dfrac{a}{b}=\\dfrac{a\\div c}{b\\div c}$（<b class="key">約分</b>）。</p>',
    examples:[
      { q:'把 $\\dfrac{3}{4}$ 擴分成分母為 20 的分數；把 $\\dfrac{18}{24}$ 約分成最簡分數。',
        steps:['$\\dfrac{3}{4}=\\dfrac{3\\times 5}{4\\times 5}=\\dfrac{15}{20}$。','$(18,24)=6$，$\\dfrac{18}{24}=\\dfrac{18\\div 6}{24\\div 6}=\\dfrac{3}{4}$。'],
        ans:'$\\dfrac{15}{20}$；$\\dfrac{3}{4}$' } ] },

  { id:'u08c3', title:'最簡分數', body:
    '<p>當一個分數的分子和分母<b class="key">互質</b>時，這個分數稱為<b class="key">最簡分數</b>，否則就不是最簡分數。</p>'+
    '<div class="inline-ex">例(1)：$-\\dfrac{11}{15}$：$(11,15)=1$，所以 $-\\dfrac{11}{15}$ 是最簡分數。<br>例(2)：$-\\dfrac{12}{14}$：$(12,14)=2\\neq 1$，所以 $-\\dfrac{12}{14}$ 不是最簡分數。</div>',
    examples:[
      { q:'判斷 $\\dfrac{21}{35}$ 是不是最簡分數；若不是，化成最簡分數。',
        steps:['$(21,35)=7\\neq 1$ → 不是最簡分數。','$\\dfrac{21\\div 7}{35\\div 7}=\\dfrac{3}{5}$。'],
        ans:'不是；$\\dfrac{3}{5}$' } ] },

  { id:'u08c4', title:'分數的比較大小', body:
    '<p>(1) 當分母是<b class="key">相同</b>的<b class="key">正整數</b>時，只要比較<b class="key">分子</b>的大小即可。</p>'+
    '<p>(2) 當分母是<b class="key">不同</b>的<b class="key">正整數</b>時，可以先<b class="key">通分</b>，再比較<b class="key">分子</b>的大小。</p>'+
    '<p>(3) 負分數的<b class="key">絕對值</b>愈大，其值<b class="key">愈小</b>。</p>'+
    '<div class="inline-ex">例：因為 $\\left|-\\dfrac{2}{3}\\right|>\\left|-\\dfrac{3}{5}\\right|$，所以 $-\\dfrac{2}{3}<-\\dfrac{3}{5}$。</div>',
    examples:[
      { q:'比較 $\\dfrac{5}{6}$ 與 $\\dfrac{7}{9}$ 的大小。',
        steps:['$[6,9]=18$，通分：$\\dfrac{5}{6}=\\dfrac{15}{18}$、$\\dfrac{7}{9}=\\dfrac{14}{18}$。','$15>14$ → $\\dfrac{5}{6}>\\dfrac{7}{9}$。'],
        ans:'$\\dfrac{5}{6}>\\dfrac{7}{9}$' },
      { q:'比較 $-\\dfrac{4}{7}$ 與 $-\\dfrac{5}{7}$ 的大小。',
        steps:['同分母負分數，比絕對值：$\\dfrac{5}{7}>\\dfrac{4}{7}$。','絕對值大的負數較小 → $-\\dfrac{5}{7}<-\\dfrac{4}{7}$。'],
        ans:'$-\\dfrac{4}{7}>-\\dfrac{5}{7}$' } ] },

  { id:'u08c5', title:'分數的加減', body:
    '<p>(1) <b class="key">同分母</b>分數相加減：只要把它們的分子<b class="key">相加減</b>做為新的分子，分母保持不變，即可得到結果。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{2}{3}\\right)+\\dfrac{7}{3}=\\dfrac{-2+7}{3}=\\dfrac{5}{3}$。</div>'+
    '<p>(2) <b class="key">異分母</b>分數相加減：可先將這幾個分數<b class="key">通分</b>化成相同的分母，分子再<b class="key">互相加減運算</b>即可。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{2}{3}\\right)-\\dfrac{1}{2}=\\left(-\\dfrac{4}{6}\\right)-\\dfrac{3}{6}=\\dfrac{-4-3}{6}=-\\dfrac{7}{6}$。</div>',
    examples:[
      { q:'計算 $\\dfrac{3}{4}-\\dfrac{5}{6}$。',
        steps:['$[4,6]=12$，通分：$\\dfrac{9}{12}-\\dfrac{10}{12}$。','$=\\dfrac{9-10}{12}=-\\dfrac{1}{12}$。'],
        ans:'$-\\dfrac{1}{12}$' },
      { q:'計算 $\\left(-\\dfrac{1}{2}\\right)+\\dfrac{2}{5}-\\left(-\\dfrac{3}{10}\\right)$。',
        steps:['去括號：$-\\dfrac{1}{2}+\\dfrac{2}{5}+\\dfrac{3}{10}$。','通分（分母 10）：$-\\dfrac{5}{10}+\\dfrac{4}{10}+\\dfrac{3}{10}$。','$=\\dfrac{-5+4+3}{10}=\\dfrac{2}{10}=\\dfrac{1}{5}$。'],
        ans:'$\\dfrac{1}{5}$' } ] },

  { id:'u08c6', title:'運算規律', body:
    '<p>對於 $a$、$b$、$c$ 三個數，我們有：</p>'+
    '<p>(1) 加法<b class="key">交換律</b>：$a+b=b+a$。</p>'+
    '<p>(2) 加法<b class="key">結合律</b>：$a+b+c=(a+b)+c=a+(b+c)$。</p>',
    examples:[
      { q:'用運算規律速算 $\\dfrac{2}{7}+\\dfrac{5}{9}+\\dfrac{5}{7}+\\dfrac{4}{9}$。',
        steps:['交換律重排同分母湊一起：$\\left(\\dfrac{2}{7}+\\dfrac{5}{7}\\right)+\\left(\\dfrac{5}{9}+\\dfrac{4}{9}\\right)$。','$=1+1=2$。'],
        ans:'$2$' } ] }
]},

{ id:'u09', book:1, sec:'2-4', title:'分數的乘除與四則運算', page:15, concepts:[
  { id:'u09c1', title:'倒數', body:
    '<p>(1) 意義：<b class="key">分子、分母顛倒的數</b>。</p>'+
    '<p>(2) 性質：<b class="key">倒數相乘等於 1</b>。</p>'+
    '<p>(3) 正負：<b class="key">倒數後正負不變</b>。</p>'+
    '<p>(4) <b class="key">0 沒有倒數</b>。</p>'+
    '<div class="inline-ex">例：$\\dfrac{2}{5}$ 的倒數為 $\\dfrac{5}{2}$；$-\\dfrac{7}{3}$ 的倒數為 $-\\dfrac{3}{7}$；$-4\\dfrac{2}{3}$ 的倒數為 $-\\dfrac{3}{14}$。</div>',
    examples:[
      { q:'求 $-\\dfrac{5}{9}$、$6$、$2\\dfrac{1}{4}$ 的倒數。',
        steps:['$-\\dfrac{5}{9}$ 顛倒 → $-\\dfrac{9}{5}$（正負不變）。','$6=\\dfrac{6}{1}$ → 倒數 $\\dfrac{1}{6}$。','$2\\dfrac{1}{4}=\\dfrac{9}{4}$（帶分數先化假分數）→ 倒數 $\\dfrac{4}{9}$。'],
        ans:'$-\\dfrac{9}{5}$；$\\dfrac{1}{6}$；$\\dfrac{4}{9}$' } ] },

  { id:'u09c2', title:'分數的乘法運算', body:
    '<p>(1) 先決定<b class="key">正、負</b>。</p>'+
    '<p>(2) <b class="key">分子 × 分子，分母 × 分母</b>：$\\dfrac{分子}{分母}\\times\\dfrac{分子}{分母}=\\dfrac{分子\\times 分子}{分母\\times 分母}$。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{2}{3}\\right)\\times\\dfrac{7}{5}=-\\dfrac{2\\times 7}{3\\times 5}=-\\dfrac{14}{15}$。</div>'+
    '<p>(3) 若算式中有帶分數，則要先將帶分數化成<b class="key">假分數</b>才能相乘。</p>'+
    '<p>(4) <b class="key">同號</b>的兩分數相乘（除），其結果為<b class="key">正數</b>；<b class="key">異號</b>的兩分數相乘（除），其結果為<b class="key">負數</b>。</p>'+
    '<p>(5) 當有<b class="key">偶數個</b>負數相乘時，其乘積為<b class="key">正數</b>；當有<b class="key">奇數個</b>負數相乘時，其乘積為<b class="key">負數</b>。</p>',
    examples:[
      { q:'計算 $\\left(-\\dfrac{3}{4}\\right)\\times\\left(-\\dfrac{8}{9}\\right)$。',
        steps:['同號相乘得正。','先約分：$\\dfrac{3}{4}\\times\\dfrac{8}{9}=\\dfrac{1}{1}\\times\\dfrac{2}{3}=\\dfrac{2}{3}$。'],
        ans:'$\\dfrac{2}{3}$' },
      { q:'計算 $1\\dfrac{1}{2}\\times\\left(-\\dfrac{4}{5}\\right)$。',
        steps:['帶分數化假分數：$1\\dfrac{1}{2}=\\dfrac{3}{2}$。','異號得負：$-\\dfrac{3}{2}\\times\\dfrac{4}{5}=-\\dfrac{12}{10}=-\\dfrac{6}{5}$。'],
        ans:'$-\\dfrac{6}{5}$' } ] },

  { id:'u09c3', title:'運算規律', body:
    '<p>設 $a$、$b$、$c$ 是任意數：</p>'+
    '<p>(1) 乘法<b class="key">交換律</b>：$a\\times b=b\\times a$。</p>'+
    '<p>(2) 乘法<b class="key">結合律</b>：$(a\\times b)\\times c=a\\times(b\\times c)$。</p>'+
    '<p>(3) <b class="key">分配律</b>：① $(a+b)\\times c=a\\times c+b\\times c$、$(a-b)\\times c=a\\times c-b\\times c$；② $c\\times(a+b)=c\\times a+c\\times b$、$c\\times(a-b)=c\\times a-c\\times b$。</p>',
    examples:[
      { q:'用分配律速算 $\\left(\\dfrac{5}{6}-\\dfrac{3}{4}\\right)\\times 12$。',
        steps:['分配：$\\dfrac{5}{6}\\times 12-\\dfrac{3}{4}\\times 12$。','$=10-9=1$。'],
        ans:'$1$' } ] },

  { id:'u09c4', title:'分數的除法運算', body:
    '<p>除以一個不為 0 的數等於乘以該數的<b class="key">倒數</b>。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{3}{5}\\right)\\div\\dfrac{7}{2}=\\left(-\\dfrac{3}{5}\\times\\dfrac{2}{7}\\right)=-\\dfrac{6}{35}$。</div>',
    examples:[
      { q:'計算 $\\dfrac{8}{15}\\div\\left(-\\dfrac{4}{5}\\right)$。',
        steps:['除變乘倒數：$\\dfrac{8}{15}\\times\\left(-\\dfrac{5}{4}\\right)$。','異號得負，約分：$-\\dfrac{8\\times 5}{15\\times 4}=-\\dfrac{2}{3}$。'],
        ans:'$-\\dfrac{2}{3}$' } ] },

  { id:'u09c5', title:'分數的乘方', body:
    '<p>若 $\\dfrac{b}{a}$ 為一個分數（$a\\neq 0$），$n$ 是正整數，則 $\\left(\\dfrac{b}{a}\\right)^n=\\dfrac{b^n}{a^n}$。</p>'+
    '<div class="inline-ex">例：$\\left(\\dfrac{3}{5}\\right)^4=\\dfrac{3^4}{5^4}$；$\\left(\\dfrac{-4}{7}\\right)^3=\\dfrac{(-4)^3}{7^3}$。</div>',
    examples:[
      { q:'計算 $\\left(-\\dfrac{2}{3}\\right)^3$ 與 $\\left(-\\dfrac{1}{2}\\right)^4$。',
        steps:['奇數次方得負：$-\\dfrac{2^3}{3^3}=-\\dfrac{8}{27}$。','偶數次方得正：$\\dfrac{1^4}{2^4}=\\dfrac{1}{16}$。'],
        ans:'$-\\dfrac{8}{27}$；$\\dfrac{1}{16}$' } ] },

  { id:'u09c6', title:'底數為分數的指數律', body:
    '<p>(1) 當底數 $a$、$b$ 為分數，$m$、$n$ 為非負整數時，則：</p>'+
    '<p>① $a^m\\times a^n=a^{m+n}$。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{1}{2}\\right)^6\\times\\left(-\\dfrac{1}{2}\\right)^3=\\left(-\\dfrac{1}{2}\\right)^{6+3}=\\left(-\\dfrac{1}{2}\\right)^9$。</div>'+
    '<p>② $(a^m)^n=a^{m\\times n}$。</p>'+
    '<div class="inline-ex">例：$\\left[\\left(-\\dfrac{1}{2}\\right)^6\\right]^3=\\left(-\\dfrac{1}{2}\\right)^{6\\times 3}=\\left(-\\dfrac{1}{2}\\right)^{18}$。</div>'+
    '<p>③ $(a\\times b)^n=a^n\\times b^n$。</p>'+
    '<div class="inline-ex">例：$\\left[\\left(-\\dfrac{1}{2}\\right)\\times\\left(-\\dfrac{1}{3}\\right)\\right]^3=\\left(-\\dfrac{1}{2}\\right)^3\\times\\left(-\\dfrac{1}{3}\\right)^3$。</div>'+
    '<p>(2) 當底數 $a$ 為分數，$m$、$n$ 為正整數，且 $m>n$ 時，則 $a^m\\div a^n=a^{m-n}$。</p>'+
    '<div class="inline-ex">例：$\\left(-\\dfrac{1}{2}\\right)^6\\div\\left(-\\dfrac{1}{2}\\right)^3=\\left(-\\dfrac{1}{2}\\right)^{6-3}=\\left(-\\dfrac{1}{2}\\right)^3$。</div>',
    examples:[
      { q:'化簡 $\\left(\\dfrac{2}{5}\\right)^4\\times\\left(\\dfrac{2}{5}\\right)^2\\div\\left(\\dfrac{2}{5}\\right)^5$。',
        steps:['同底相乘：$\\left(\\dfrac{2}{5}\\right)^{4+2}=\\left(\\dfrac{2}{5}\\right)^6$。','同底相除：$\\left(\\dfrac{2}{5}\\right)^{6-5}=\\dfrac{2}{5}$。'],
        ans:'$\\dfrac{2}{5}$' } ] },

  { id:'u09c7', title:'乘方的比較大小', body:
    '<p>對於任何一個正數 $a$ 及正整數 $n$：</p>'+
    '<p>(1) 當 $a<1$ 時，$a^n<1$，且 $n$ 的值愈大，$a^n$ 的值愈<b class="key">小</b>。</p>'+
    '<div class="inline-ex">例：$\\left(\\dfrac{2}{3}\\right)^3<\\left(\\dfrac{2}{3}\\right)^2$。</div>'+
    '<p>(2) 當 $a>1$ 時，$a^n>1$，且 $n$ 的值愈大，$a^n$ 的值愈<b class="key">大</b>。</p>'+
    '<div class="inline-ex">例：$1.2^3>1.2^2$。</div>',
    examples:[
      { q:'比較 $\\left(\\dfrac{4}{5}\\right)^{10}$、$\\left(\\dfrac{4}{5}\\right)^{7}$、$1$ 三數的大小。',
        steps:['$\\dfrac{4}{5}<1$ → 次方愈大值愈小：$\\left(\\dfrac{4}{5}\\right)^{10}<\\left(\\dfrac{4}{5}\\right)^{7}$。','小於 1 的正數任何次方都 $<1$。'],
        ans:'$\\left(\\dfrac{4}{5}\\right)^{10}<\\left(\\dfrac{4}{5}\\right)^{7}<1$' } ] },

  { id:'u09c8', title:'分數的四則運算', body:
    '<p>一般四則混合運算是由左向右依序計算，<b class="key">先</b>算<b class="key">乘、除</b>，<b class="key">後</b>算<b class="key">加、減</b>；若有括號時，應<b class="key">先做括號</b>內的計算。</p>',
    examples:[
      { q:'計算 $\\dfrac{1}{2}+\\dfrac{2}{3}\\div\\dfrac{4}{9}\\times\\left(-\\dfrac{1}{6}\\right)$。',
        steps:['先乘除（由左而右）：$\\dfrac{2}{3}\\div\\dfrac{4}{9}=\\dfrac{2}{3}\\times\\dfrac{9}{4}=\\dfrac{3}{2}$。','$\\dfrac{3}{2}\\times\\left(-\\dfrac{1}{6}\\right)=-\\dfrac{1}{4}$。','再加減：$\\dfrac{1}{2}+\\left(-\\dfrac{1}{4}\\right)=\\dfrac{1}{4}$。'],
        ans:'$\\dfrac{1}{4}$' },
      { q:'計算 $\\left(\\dfrac{5}{6}-\\dfrac{1}{2}\\right)\\div\\left(-\\dfrac{2}{9}\\right)$。',
        steps:['先括號：$\\dfrac{5}{6}-\\dfrac{3}{6}=\\dfrac{2}{6}=\\dfrac{1}{3}$。','除變乘倒數：$\\dfrac{1}{3}\\times\\left(-\\dfrac{9}{2}\\right)=-\\dfrac{3}{2}$。'],
        ans:'$-\\dfrac{3}{2}$' } ] }
]},

{ id:'u10', book:1, sec:'3-1', title:'以符號列式與運算', page:17, concepts:[
  { id:'u10c1', title:'代數式及其簡記', body:
    '<p><b class="key">代數式</b>：<b class="key">式子中包含文字符號與數字及其四則運算者</b>。</p>'+
    '<div class="inline-ex">例：$x+3$、$x-3$、$2\\times x$、$x\\div 2$、$x^2$、$x\\times y$。</div>',
    examples:[
      { q:'下列哪些是代數式？ $3+5$、$2x-1$、$a\\times b$、$100$',
        steps:['代數式要含文字符號：$2x-1$、$a\\times b$ 是。','$3+5$、$100$ 只有數字，不是代數式。'],
        ans:'$2x-1$、$a\\times b$' } ] },

  { id:'u10c2', title:'乘法的簡記', body:
    '<p>在一個代數式中，當文字符號與數字<b class="key">相乘</b>時，我們習慣上：</p>'+
    '<p>① 將數字寫在文字符號的<b class="key">左邊</b>，</p>'+
    '<p>② 且把乘號「×」改寫成「·」，或是<b class="key">省略不寫</b>。</p>'+
    '<div class="inline-ex">例：$(-2)\\times x=(-2)\\cdot x=-2x$；$(-1)\\times x=-x$；$\\left(-\\dfrac{4}{5}\\right)\\times x=-\\dfrac{4}{5}x=\\dfrac{-4x}{5}=-\\dfrac{4x}{5}$。</div>'+
    '<p>註：(1) 簡記時，<b class="key">數字</b>應<b class="key">寫在</b>英文字母的<b class="key">前面</b>。</p>'+
    '<p>　(2) $1\\times x=x$，<b class="key">數字 1 可以省略</b>；$(-1)\\times x=-x$；$0\\times x=0$。</p>',
    examples:[
      { q:'把 $x\\times(-3)$、$1\\times y$、$b\\times a\\times 5$ 用簡記寫出。',
        steps:['數字寫前面：$x\\times(-3)=-3x$。','1 省略：$1\\times y=y$。','$b\\times a\\times 5=5ab$（習慣上字母照字典序）。'],
        ans:'$-3x$；$y$；$5ab$' } ] },

  { id:'u10c3', title:'除法的簡記', body:
    '<p>(1) 將除號寫成<b class="key">分數</b>。</p>'+
    '<div class="inline-ex">例：$x\\div 5=\\dfrac{x}{5}$；$x\\div(-5)=\\dfrac{x}{-5}$。</div>'+
    '<p>(2) 將除號改成乘號（<b class="key">需倒數</b>）。</p>'+
    '<div class="inline-ex">例：$6\\div\\dfrac{2}{3}=6\\times\\dfrac{3}{2}=\\dfrac{6\\times 3}{2}$。</div>',
    examples:[
      { q:'把 $a\\div 7$ 與 $x\\div\\dfrac{3}{4}$ 用簡記寫出。',
        steps:['$a\\div 7=\\dfrac{a}{7}$。','$x\\div\\dfrac{3}{4}=x\\times\\dfrac{4}{3}=\\dfrac{4x}{3}$。'],
        ans:'$\\dfrac{a}{7}$；$\\dfrac{4x}{3}$' } ] },

  { id:'u10c4', title:'將文字敘述改寫成代數式／一元一次式', body:
    '<p>(1) 文字敘述 → 代數式：</p>'+
    '<p>比 $x$ 大（多）5 的數：<b class="key">$x+5$</b>；比 $y$ 小（少）3 的數：<b class="key">$y-3$</b>；$x$ 的 $\\dfrac{2}{3}$ 倍：<b class="key">$\\dfrac{2}{3}x$</b>；把 $a$ 分成 3 等分：<b class="key">$\\dfrac{a}{3}$</b>；比 $c$ 的 2 倍多 10：<b class="key">$2c+10$</b>；$d$ 打 7 折：<b class="key">$d\\times 0.7$</b>；「比」→「$=$」。</p>'+
    '<p>(2) <b class="key">一元一次式</b>：只含有一種文字符號（<b class="key">一元</b>），且文字符號的次數是 1（<b class="key">一次</b>）的代數式。</p>'+
    '<div class="inline-ex">例：$x+5$、$y-3$、$\\dfrac{a}{3}$ 稱為一元一次式。</div>'+
    '<p>(3) 一元一次式 $ax+b$ 中，$ax$ 稱為 $x$ 的<b class="key">一次項</b>，$a$ 稱為 $x$ 的<b class="key">一次項係數</b>，$b$ 稱為<b class="key">常數項</b>。</p>'+
    '<div class="inline-ex">例：$4x-1$ 的一次項為 $4x$，4 為一次項係數，$-1$ 為常數項。</div>',
    examples:[
      { q:'小明有 $x$ 元，買一支 35 元的筆後，剩下的錢比原來的一半少 5 元。列出等式。',
        steps:['買筆後剩 $x-35$ 元。','原來的一半少 5 元：$\\dfrac{x}{2}-5$。','「比」翻成等號：$x-35=\\dfrac{x}{2}-5$。'],
        ans:'$x-35=\\dfrac{x}{2}-5$' },
      { q:'寫出 $-\\dfrac{2x}{3}+7$ 的一次項係數與常數項。',
        steps:['一次項 $-\\dfrac{2x}{3}$ → 係數 $-\\dfrac{2}{3}$。','常數項 $7$。'],
        ans:'係數 $-\\dfrac{2}{3}$；常數項 $7$' } ] },

  { id:'u10c5', title:'求代數式的值', body:
    '<p>一個代數式的<b class="key">值</b>，是由文字符號所代表的數<b class="key">代入</b>該代數式後所得的值決定。</p>'+
    '<div class="inline-ex">例：當 $x=3$ 時，$4x-1=4\\times 3-1=11$。</div>',
    examples:[
      { q:'當 $x=-2$ 時，求 $-3x+7$ 與 $x^2-x$ 的值。',
        steps:['$-3\\times(-2)+7=6+7=13$。','$(-2)^2-(-2)=4+2=6$。'],
        ans:'$13$；$6$' } ] },

  { id:'u10c6', title:'代數式的乘法運算', body:
    '<p>做代數式的乘法運算時，可以先把代數式中的各<b class="key">數字相乘</b>，再乘以文字符號。</p>'+
    '<div class="inline-ex">例：$(-4x)\\times 5=[(-4)\\times 5]\\cdot x=-20x$。</div>'+
    '<p>設 $a$、$b$、$c$ 是任意數，則有 $a(bx)=(ab)x=abx$、$a(bx+c)=abx+ac$、$a(bx-c)=abx-ac$。</p>'+
    '<p>設 $a$、$b$ 是任意數，則有 $-(ax+b)=<b class="key">-ax-b</b>$、$-(ax-b)=<b class="key">-ax+b</b>$。</p>',
    examples:[
      { q:'化簡 $-2(3x-4)$。',
        steps:['分配：$-2\\times 3x+(-2)\\times(-4)$。','$=-6x+8$。'],
        ans:'$-6x+8$' },
      { q:'化簡 $\\dfrac{2}{3}(6x-9)$。',
        steps:['$\\dfrac{2}{3}\\times 6x=4x$；$\\dfrac{2}{3}\\times(-9)=-6$。','合併：$4x-6$。'],
        ans:'$4x-6$' } ] },

  { id:'u10c7', title:'代數式的加減運算', body:
    '<p>一元一次式的加減法運算，可以<b class="key">先去括號</b>，再分別合併一次項與常數項（<b class="key">同類項合併</b>）。</p>'+
    '<div class="inline-ex">例：$2x-7-4x+3=(2-4)x+(-7+3)=-2x-4$。</div>'+
    '<p>設 $a$、$b$ 是任意數，則有 $ax+bx=(a+b)x$、$ax-bx=(a-b)x$——數字互相加減，【<b class="key">未知數</b>】放後面。</p>'+
    '<p>設 $a$、$b$、$c$、$d$ 是任意數，則有 $(ax+b)+(cx+d)=(a+c)x+(b+d)$、$(ax+b)-(cx+d)=(a-c)x+(b-d)$。</p>',
    examples:[
      { q:'化簡 $(5x-2)-(3x+4)$。',
        steps:['去括號（後括號變號）：$5x-2-3x-4$。','同類項合併：$(5-3)x+(-2-4)=2x-6$。'],
        ans:'$2x-6$' },
      { q:'化簡 $3(2x-1)+2(1-4x)$。',
        steps:['分配：$6x-3+2-8x$。','合併：$(6-8)x+(-3+2)=-2x-1$。'],
        ans:'$-2x-1$' } ] }
]},

{ id:'u11', book:1, sec:'3-2', title:'一元一次方程式', page:19, concepts:[
  { id:'u11c1', title:'一元一次方程式與方程式的解', body:
    '<p>(1) 一元一次方程式的意義：</p>'+
    '<p>　一元：<b class="key">有一種未知數</b>。</p>'+
    '<p>　一次：<b class="key">未知數最高次方 $=1$</b>。</p>'+
    '<p>　方程式：<b class="key">出現「＝」符號</b>。</p>'+
    '<div class="inline-ex">例：$3x+5=14$、$y-3=17$、$2c+10=6$ 都是一元一次方程式。</div>'+
    '<p>(2) 方程式的解：若方程式中的未知數用某個數代入，能使這個方程式中左右兩邊的值相等，那麼這個數稱為此方程式的<b class="key">解</b>或<b class="key">根</b>；而求出方程式中未知數所代表的數的過程，稱為<b class="key">解方程式</b>。</p>'+
    '<div class="inline-ex">例：將 $x=3$ 代入 $3x+5=14$ 中，得到方程式的等號兩邊相等，所以 $x=3$ 是 $3x+5=14$ 的解。</div>',
    examples:[
      { q:'判斷 $x=2$ 與 $x=-1$ 何者是方程式 $5x-3=7$ 的解。',
        steps:['代 $x=2$：$5\\times 2-3=7$ ✓ 兩邊相等。','代 $x=-1$：$5\\times(-1)-3=-8\\neq 7$ ✗。'],
        ans:'$x=2$ 是解' },
      { q:'下列何者是一元一次方程式？① $2x+3$ ② $x^2=9$ ③ $\\dfrac{x}{4}=1$ ④ $x+y=5$',
        steps:['① 沒有等號，不是方程式。','② 次數是 2，不是一次。','④ 有兩種未知數，不是一元。','③ 一種未知數、一次、有等號 ✓。'],
        ans:'③' } ] },

  { id:'u11c2', title:'等量公理', body:
    '<p>任意一個方程式中，在等號的兩邊<b class="key">同加、減、乘、除以一個數</b>（除數不可為 0），則等號的兩邊仍會維持相等。即：若 $a=b$，則：</p>'+
    '<p>(1) $a+c=b+c$；(2) $a-c=b-c$；(3) $a\\times c=b\\times c$；(4) $a\\div c=b\\div c$（$c\\neq 0$）。</p>'+
    '<p>用天平想像：兩盤平衡時，兩邊<b class="key">同放上</b>、<b class="key">同拿走</b>、同<b class="key">變倍</b>、同<b class="key">等分</b>，天平仍然平衡。</p>'+
    '<div class="inline-ex">例：$3x=10$ 兩邊同加 4 → $3x+4=10+4$；$2x+2=12$ 兩邊同減 2 → $2x=10$；$2x=4$ 兩邊同乘 3 → $6x=12$；$2x=4$ 兩邊同除 2 → $x=2$。</div>',
    fig:'u11-balance',
    examples:[
      { q:'用等量公理解 $x-7=15$。',
        steps:['兩邊同加 7：$x-7+7=15+7$。','$x=22$。'],
        ans:'$x=22$' },
      { q:'用等量公理解 $\\dfrac{2x}{5}=6$。',
        steps:['兩邊同乘 5：$2x=30$。','兩邊同除 2：$x=15$。'],
        ans:'$x=15$' } ] },

  { id:'u11c3', title:'移項法則', body:
    '<p>一個數 $a$ 從方程式等號的<b class="key">一邊移到另一邊</b>，應遵守下列規則：</p>'+
    '<p>(1) $x-a=b \\Rightarrow x=b+a$（$-a$ 移過去變 $+a$）。</p>'+
    '<p>(2) $x+a=b \\Rightarrow x=b-a$（$+a$ 移過去變 $-a$）。</p>'+
    '<p>(3) $\\dfrac{x}{a}=b \\Rightarrow x=b\\times a$（$\\div a$ 移過去變 $\\times a$）。</p>'+
    '<p>(4) $ax=b \\Rightarrow x=b\\div a$（$\\times a$ 移過去變 $\\div a$，$a\\neq 0$）。</p>',
    examples:[
      { q:'解 $4x+9=1$。',
        steps:['$+9$ 移項變 $-9$：$4x=1-9=-8$。','$\\times 4$ 移項變 $\\div 4$：$x=-8\\div 4=-2$。'],
        ans:'$x=-2$' },
      { q:'解 $\\dfrac{x}{3}-2=5$。',
        steps:['$-2$ 移項：$\\dfrac{x}{3}=7$。','$\\div 3$ 移項變 $\\times 3$：$x=21$。'],
        ans:'$x=21$' },
      { q:'解 $2(3x-4)=10$。',
        steps:['先去括號：$6x-8=10$。','移項：$6x=18$。','$x=3$。'],
        ans:'$x=3$' } ] }
]},

{ id:'u12', book:1, sec:'3-3', title:'應用問題', page:21, concepts:[
  { id:'u12c1', title:'用一元一次方程式解應用問題的步驟', body:
    '<p>(1) <b class="key">設未知數</b>：依題意假設適當的未知數。</p>'+
    '<p>(2) <b class="key">列方程式</b>：根據題目找出相等的關係，列出一元一次方程式。</p>'+
    '<p>(3) <b class="key">解方程式</b>。</p>'+
    '<p>(4) <b class="key">寫答案</b>：依題意寫出正確答案，若<b class="key">不合題意的解則要捨棄</b>，即此題沒有解。</p>',
    examples:[
      { q:'一枝筆比一本筆記本貴 12 元，買 3 枝筆和 2 本筆記本共 156 元，求筆記本一本多少元？',
        steps:['設筆記本一本 $x$ 元，則筆一枝 $(x+12)$ 元。','列式：$3(x+12)+2x=156$。','去括號：$3x+36+2x=156$ → $5x=120$ → $x=24$。','驗算：筆 36 元，$3\\times 36+2\\times 24=108+48=156$ ✓。'],
        ans:'筆記本一本 24 元' },
      { q:'姊姊今年 15 歲，弟弟 9 歲，幾年後姊姊年齡是弟弟的 1.5 倍？',
        steps:['設 $x$ 年後，姊 $15+x$、弟 $9+x$。','列式：$15+x=1.5(9+x)$。','$15+x=13.5+1.5x$ → $1.5=0.5x$ → $x=3$。','驗算：3 年後姊 18、弟 12，$18=12\\times 1.5$ ✓。'],
        ans:'3 年後' },
      { q:'連續三個整數的和是 72，求這三個數。',
        steps:['設中間數 $x$，三數為 $x-1$、$x$、$x+1$。','$(x-1)+x+(x+1)=3x=72$ → $x=24$。'],
        ans:'23、24、25' } ] }
]},

{ id:'u13', book:2, sec:'1-1', title:'二元一次方程式', page:22, concepts:[
  { id:'u13c1', title:'二元一次式（二元一次多項式）', body:
    '<p><b class="key">二元</b>：含有<b class="key">兩種</b>文字符號，<b class="key">一次</b>：且這兩種文字符號的次數<b class="key">為 1 次</b>的<b class="key">代數式</b>，稱為<b class="key">二元一次式</b>。</p>'+
    '<div class="inline-ex">例：$x-2y$、$2x+9y$、$5x+3y+8$ 都稱為二元一次式。</div>',
    examples:[
      { q:'下列何者是二元一次式？① $3x+5$ ② $x+y^2$ ③ $2a-7b+1$',
        steps:['① 只有一種文字符號，是一元一次式。','② $y$ 的次數是 2，不合。','③ 兩種文字符號 $a$、$b$ 且都是一次 ✓。'],
        ans:'③' } ] },

  { id:'u13c2', title:'二元一次式的項與係數', body:
    '<p>型如 $ax+by+c$ 的式子稱為二元一次式，其中稱 $ax$ 為 <b class="key">$x$ 項</b>、$by$ 為 <b class="key">$y$ 項</b>及 $c$ 為<b class="key">常數項</b>；$a$ 為 <b class="key">$x$ 項係數</b>、$b$ 為 <b class="key">$y$ 項係數</b>。</p>'+
    '<div class="inline-ex">例：$3x-2y$：$x$ 項 $3x$、$y$ 項 $-2y$、常數項 0；$x$ 項係數 3、$y$ 項係數 $-2$。<br>$x+4y-5$：$x$ 項 $x$、$y$ 項 $4y$、常數項 $-5$；$x$ 項係數 1、$y$ 項係數 4。</div>',
    examples:[
      { q:'寫出 $-x+\\dfrac{2y}{3}+7$ 的各項係數與常數項。',
        steps:['$x$ 項 $-x$ → 係數 $-1$。','$y$ 項 $\\dfrac{2y}{3}$ → 係數 $\\dfrac{2}{3}$。','常數項 $7$。'],
        ans:'$x$ 係數 $-1$；$y$ 係數 $\\dfrac{2}{3}$；常數項 7' } ] },

  { id:'u13c3', title:'二元一次式的值', body:
    '<p>二元一次式的值是由二元一次式中的兩個文字符號所分別代表的數（$x$、$y$ <b class="key">代入求值</b>）共同決定的。</p>'+
    '<div class="inline-ex">例：當 $x=3$、$y=-2$ 時，$5x-6y$ 的值為 $5\\times 3-6\\times(-2)=15+12=<b class="key">27</b>$。</div>',
    examples:[
      { q:'當 $x=-1$、$y=4$ 時，求 $2x-3y+10$ 的值。',
        steps:['代入：$2\\times(-1)-3\\times 4+10$。','$=-2-12+10=-4$。'],
        ans:'$-4$' } ] },

  { id:'u13c4', title:'二元一次式的運算', body:
    '<p><b class="key">同類項</b>：<b class="key">文字符號相同的項</b>。兩個二元一次式的加、減運算就是合併其<b class="key">同類項</b>。</p>'+
    '<div class="inline-ex">例：$(3x-2y)+(x+4y-5)=(3x+x)+(-2y+4y)-5=4x+2y-5$。</div>',
    examples:[
      { q:'化簡 $(5x+y-3)-(2x-4y+1)$。',
        steps:['去括號（後括號變號）：$5x+y-3-2x+4y-1$。','合併同類項：$(5-2)x+(1+4)y+(-3-1)=3x+5y-4$。'],
        ans:'$3x+5y-4$' } ] },

  { id:'u13c5', title:'二元一次方程式', body:
    '<p><b class="key">二元</b>：<b class="key">有兩種未知數</b>；<b class="key">一次</b>：<b class="key">未知數最高次數 $=1$</b>；<b class="key">方程式</b>：<b class="key">出現「＝」符號</b>。</p>'+
    '<div class="inline-ex">例：$3x+4y=185$、$x+6y+1=0$、$y=-3x+7$ 都稱為二元一次方程式。</div>',
    examples:[
      { q:'「一枝筆 $x$ 元、一顆糖 $y$ 元，買 2 枝筆和 5 顆糖共 100 元」，列出二元一次方程式。',
        steps:['筆共 $2x$ 元、糖共 $5y$ 元。','合計：$2x+5y=100$。'],
        ans:'$2x+5y=100$' } ] },

  { id:'u13c6', title:'二元一次方程式的解', body:
    '<p>(1) 如果一組 $x$、$y$ 的值代入二元一次方程式，能使方程式的<b class="key">等號</b>成立，那麼這一組 $x$、$y$ 的值就是這個二元一次方程式的<b class="key">一組解</b>。</p>'+
    '<p>(2) 二元一次方程式有<b class="key">無限多組解</b>。</p>'+
    '<div class="inline-ex">例：將 $x=5$、$y=-1$ 代入 $x+6y=-1$ 中，可得 $5+6\\times(-1)=-1$，所以 $x=5$、$y=-1$ 是 $x+6y=-1$ 的一組解。</div>',
    examples:[
      { q:'判斷 $(x,y)=(2,3)$ 與 $(4,1)$ 哪組是 $2x+y=7$ 的解？',
        steps:['代 $(2,3)$：$2\\times 2+3=7$ ✓。','代 $(4,1)$：$2\\times 4+1=9\\neq 7$ ✗。'],
        ans:'$(2,3)$ 是解' },
      { q:'寫出 $x+2y=6$ 的三組整數解。',
        steps:['取 $y=0$ → $x=6$；$y=1$ → $x=4$；$y=2$ → $x=2$。','二元一次方程式的解有無限多組，這只是其中三組。'],
        ans:'$(6,0)$、$(4,1)$、$(2,2)$（不唯一）' } ] }
]},

{ id:'u14', book:2, sec:'1-2', title:'二元一次聯立方程式', page:23, concepts:[
  { id:'u14c1', title:'二元一次聯立方程式及其解的意義', body:
    '<p>將兩個二元一次方程式併在一起稱為 $x$ 與 $y$ 的<b class="key">二元一次聯立方程式</b>，或是 $x$ 與 $y$ 的<b class="key">二元一次方程組</b>。</p>'+
    '<p>而同時能滿足這兩個式子的解稱為二元一次聯立方程式的<b class="key">解</b>。</p>',
    examples:[
      { q:'判斷 $(x,y)=(3,1)$ 是不是聯立方程式 $\\begin{cases}x+y=4\\\\ 2x-y=5\\end{cases}$ 的解。',
        steps:['代入第一式：$3+1=4$ ✓。','代入第二式：$2\\times 3-1=5$ ✓。','兩式同時成立，是聯立方程式的解。'],
        ans:'是' },
      { q:'$(x,y)=(2,2)$ 滿足 $x+y=4$，它是上一題聯立方程式的解嗎？',
        steps:['代入第二式：$2\\times 2-2=2\\neq 5$ ✗。','聯立方程式的解必須「同時」滿足兩式。'],
        ans:'不是' } ] }
]},

{ id:'u15', book:2, sec:'2-1', title:'直角坐標平面', page:24, concepts:[
  { id:'u15c1', title:'數對', body:
    '<p>(1) 將兩個數寫成 <b class="key">$(a,b)$</b> 的形式，稱為<b class="key">數對</b>。</p>'+
    '<p>(2) 若 $a\\neq b$，則 $(a,b)$ 和 $(b,a)$ 所代表的<b class="key">位置</b>不同。</p>',
    examples:[
      { q:'$(2,5)$ 和 $(5,2)$ 代表同一個位置嗎？',
        steps:['數對有順序性，$2\\neq 5$。','$(2,5)$ 是「橫 2 縱 5」，$(5,2)$ 是「橫 5 縱 2」，位置不同。'],
        ans:'不同' } ] },

  { id:'u15c2', title:'直角坐標平面', body:
    '<p>由兩條互相<b class="key">垂直</b>且有<b class="key">共同原點</b>的數線所構成的平面稱為<b class="key">直角坐標平面</b>，其中<b class="key">水平</b>的數線稱為 <b class="key">$x$ 軸</b>，<b class="key">鉛垂</b>的數線稱為 <b class="key">$y$ 軸</b>。</p>',
    fig:'u15-plane',
    examples:[
      { q:'坐標平面上，$x$ 軸和 $y$ 軸的交點叫什麼？坐標是多少？',
        steps:['兩軸的共同交點是原點 $O$。','坐標 $(0,0)$。'],
        ans:'原點 $O(0,0)$' } ] },

  { id:'u15c3', title:'坐標表示法', body:
    '<p>在坐標平面上，當數對 $(m,n)$ 表示 $P$ 點的位置，$(m,n)$ 就稱為 $P$ 點的<b class="key">坐標</b>，記作 $P(m,n)$。</p>'+
    '<p>其中 $m$ 稱為 $P$ 點的 <b class="key">$x$ 坐標</b>或<b class="key">橫坐標</b>，$|m|$ 為 $P$ 點到 <b class="key">$y$ 軸</b>的距離；$n$ 稱為 $P$ 點的 <b class="key">$y$ 坐標</b>或<b class="key">縱坐標</b>，$|n|$ 為 $P$ 點到 <b class="key">$x$ 軸</b>的距離。</p>',
    examples:[
      { q:'點 $P(-3,5)$ 到 $x$ 軸、$y$ 軸的距離各是多少？',
        steps:['到 $x$ 軸的距離 $=|y|=|5|=5$。','到 $y$ 軸的距離 $=|x|=|-3|=3$。'],
        ans:'到 $x$ 軸 5；到 $y$ 軸 3' } ] },

  { id:'u15c4', title:'x 軸、y 軸上的點坐標', body:
    '<p>(1) 坐標為 $(m,0)$ 的點都會在 <b class="key">$x$ 軸</b>上，$x$ 軸上任意一點的坐標可以用 <b class="key">$(m,0)$</b> 的形式來表示。</p>'+
    '<div class="inline-ex">例：$(0.3,0)$、$(-5,0)$、$\\left(\\dfrac{4}{3},0\\right)$ 都是 $x$ 軸上的點。</div>'+
    '<p>(2) 坐標為 $(0,n)$ 的點都會在 <b class="key">$y$ 軸</b>上，$y$ 軸上任意一點的坐標可以用 <b class="key">$(0,n)$</b> 的形式來表示。</p>'+
    '<div class="inline-ex">例：$(0,7)$、$(0,-2.4)$、$\\left(0,-\\dfrac{9}{5}\\right)$ 都是 $y$ 軸上的點。</div>'+
    '<p>(3) 原點的坐標為 <b class="key">$(0,0)$</b>，既在 $x$ 軸上，也在 $y$ 軸上。</p>',
    examples:[
      { q:'點 $A(a,0)$ 距離原點 6，求 $a$。',
        steps:['$A$ 在 $x$ 軸上，距原點 6 → $|a|=6$。','$a=6$ 或 $a=-6$。'],
        ans:'$a=\\pm 6$' } ] },

  { id:'u15c5', title:'坐標平面上的象限', body:
    '<p>(1) 在坐標平面上，$x$ 軸與 $y$ 軸將坐標平面分成<b class="key">六個部份</b>（包含 4 個區域和 2 軸），每個<b class="key">區域</b>都稱為<b class="key">象限</b>：</p>'+
    '<p>① 第一象限：<b class="key">$(+,+)$</b>　② 第二象限：<b class="key">$(-,+)$</b>　③ 第三象限：<b class="key">$(-,-)$</b>　④ 第四象限：<b class="key">$(+,-)$</b>　⑤ $x$ 軸：$(m,0)$　⑥ $y$ 軸：$(0,n)$。</p>'+
    '<p>(2) 兩軸上的點<b class="key">不屬於任何一個象限</b>。</p>'+
    '<p>(3) 原點的坐標為 $(0,0)$，同時在 $x$ 軸、$y$ 軸上。</p>',
    fig:'u15-quadrants',
    examples:[
      { q:'點 $A(3,-2)$、$B(-1,-5)$、$C(0,4)$ 各在第幾象限？',
        steps:['$A(+,-)$ → 第四象限。','$B(-,-)$ → 第三象限。','$C$ 的 $x$ 坐標是 0 → 在 $y$ 軸上，不屬於任何象限。'],
        ans:'A 第四象限；B 第三象限；C 在 y 軸上' },
      { q:'若點 $P(a,b)$ 在第二象限，那麼點 $Q(-a,-b)$ 在第幾象限？',
        steps:['第二象限 → $a<0$、$b>0$。','$-a>0$、$-b<0$ → $(+,-)$。'],
        ans:'第四象限' } ] }
]},

{ id:'u16', book:2, sec:'2-2', title:'二元一次方程式的圖形', page:25, concepts:[
  { id:'u16c1', title:'二元一次方程式的圖形（解的圖形）', body:
    '<p>(1) 每個二元一次方程式的圖形都是<b class="key">一條直線</b>，直線上的每個點都是此方程式的<b class="key">一組解</b>。</p>'+
    '<p>(2) 找出二元一次方程式的 <b class="key">2 組解</b>，把它們描在坐標平面上，通過這兩點的直線就是這個二元一次方程式的<b class="key">（解的）圖形</b>。</p>'+
    '<div class="inline-ex">例：畫 $y=3x+2$ 的圖形——取 $x=0$ 得 $y=2$、取 $x=1$ 得 $y=5$，過 $(0,2)$、$(1,5)$ 畫直線即可。</div>'+
    '<p>(3) 方程式 $x=0$ 的圖形就是 <b class="key">$y$ 軸</b>。</p>'+
    '<p>(4) 方程式 $y=0$ 的圖形就是 <b class="key">$x$ 軸</b>。</p>',
    fig:'u16-line',
    examples:[
      { q:'畫 $2x+y=4$ 的圖形要找哪兩點最方便？',
        steps:['取 $x=0$ → $y=4$，得 $(0,4)$（$y$ 軸截點）。','取 $y=0$ → $x=2$，得 $(2,0)$（$x$ 軸截點）。','過這兩點畫直線。'],
        ans:'$(0,4)$ 與 $(2,0)$' } ] },

  { id:'u16c2', title:'x=m 及 y=n 的圖形', body:
    '<p>(1) 方程式 $x=m$ 的圖形是一條<b class="key">垂直</b> $x$ 軸（<b class="key">平行</b> $y$ 軸）於 $(m,0)$ 的直線。</p>'+
    '<p>(2) 方程式 $y=n$ 的圖形是一條<b class="key">平行</b> $x$ 軸（<b class="key">垂直</b> $y$ 軸）於 $(0,n)$ 的直線。</p>',
    examples:[
      { q:'直線 $x=3$ 與 $y=-2$ 的交點坐標是多少？',
        steps:['$x=3$ 是過 $(3,0)$ 的鉛直線；$y=-2$ 是過 $(0,-2)$ 的水平線。','交點同時滿足兩式：$(3,-2)$。'],
        ans:'$(3,-2)$' } ] },

  { id:'u16c3', title:'ax+by=c 的圖形與原點', body:
    '<p>已知二元一次方程式 $ax+by=c$ 中，$a$、$b$ 皆不為 0：</p>'+
    '<p>(1) 若 <b class="key">$c\\neq 0$</b>，則圖形為<b class="key">不通過</b>原點的直線。</p>'+
    '<p>(2) 若 <b class="key">$c=0$</b>，則圖形為<b class="key">通過</b>原點的直線。</p>',
    examples:[
      { q:'不畫圖判斷 $3x-5y=0$ 與 $3x-5y=15$ 誰通過原點。',
        steps:['$3x-5y=0$：$c=0$ → 通過原點（代 $(0,0)$：$0=0$ ✓）。','$3x-5y=15$：$c\\neq 0$ → 不通過原點。'],
        ans:'$3x-5y=0$ 通過原點' } ] },

  { id:'u16c4', title:'聯立方程式的圖形幾何意義', body:
    '<p>聯立方程式的解 ↔ 圖形的<b class="key">交點坐標</b>。</p>'+
    '<p>(1) 兩條直線<b class="key">交於一點</b>：當聯立方程式<b class="key">恰有一組解</b>時。</p>'+
    '<p>(2) 兩條直線<b class="key">重合</b>：當聯立方程式有<b class="key">無限多組解</b>時（有<b class="key">無限多</b>個交點）。</p>'+
    '<div class="inline-ex">例：$x-y=3$ 與 $2x-2y=6$ 的圖形為兩重合的直線。</div>'+
    '<p>(3) 兩條直線<b class="key">平行</b>：當聯立方程式<b class="key">無解</b>時（<b class="key">無</b>交點）。</p>'+
    '<div class="inline-ex">例：$x-y=3$ 與 $2x-2y=4$ 的圖形為兩平行的直線。</div>'+
    '<p>從<b class="key">係數比例</b>判斷 $\\begin{cases}a_1x+b_1y=c_1\\\\ a_2x+b_2y=c_2\\end{cases}$ 解的圖形：</p>'+
    '<p>(1) 若 $\\dfrac{a_1}{a_2}=\\dfrac{b_1}{b_2}=\\dfrac{c_1}{c_2}$，則 $L_1$ 與 $L_2$ <b class="key">重合</b>。</p>'+
    '<p>(2) 若 $\\dfrac{a_1}{a_2}=\\dfrac{b_1}{b_2}\\neq\\dfrac{c_1}{c_2}$，則 $L_1$ 與 $L_2$ <b class="key">平行</b>。</p>'+
    '<p>(3) 若 $\\dfrac{a_1}{a_2}\\neq\\dfrac{b_1}{b_2}$，則 $L_1$ 與 $L_2$ <b class="key">交於一點</b>。</p>',
    fig:'u16-three',
    examples:[
      { q:'不解方程式，判斷 $\\begin{cases}2x+3y=6\\\\ 4x+6y=8\\end{cases}$ 的解的情形。',
        steps:['係數比：$\\dfrac{2}{4}=\\dfrac{1}{2}$、$\\dfrac{3}{6}=\\dfrac{1}{2}$、$\\dfrac{6}{8}=\\dfrac{3}{4}$。','$\\dfrac{a_1}{a_2}=\\dfrac{b_1}{b_2}\\neq\\dfrac{c_1}{c_2}$ → 兩線平行。'],
        ans:'無解（兩直線平行）' },
      { q:'判斷 $\\begin{cases}x-2y=5\\\\ 3x+y=1\\end{cases}$ 的解的情形。',
        steps:['$\\dfrac{1}{3}\\neq\\dfrac{-2}{1}$。','係數比不等 → 交於一點。'],
        ans:'恰有一組解（交於一點）' } ] }
]},

{ id:'u17', book:2, sec:'1-2', title:'解二元一次聯立方程式', page:27, concepts:[
  { id:'u17c1', title:'解二元一次聯立方程式', body:
    '<p>(1) 我們可以用<b class="key">代入消去法</b>或<b class="key">加減消去法</b>解二元一次聯立方程式。</p>'+
    '<p>(2) 不論是用哪一種方法解二元一次聯立方程式，都要先設法<b class="key">消掉</b>其中一個未知數，化簡成<b class="key">一元一次方程式</b>後，再來求解。</p>',
    examples:[
      { q:'用代入消去法解 $\\begin{cases}y=2x-1\\\\ 3x+y=9\\end{cases}$。',
        steps:['第一式已解出 $y$，代入第二式：$3x+(2x-1)=9$。','$5x=10$ → $x=2$。','代回：$y=2\\times 2-1=3$。'],
        ans:'$x=2$、$y=3$' },
      { q:'用加減消去法解 $\\begin{cases}2x+3y=7\\\\ 2x-y=3\\end{cases}$。',
        steps:['兩式相減消去 $x$：$(2x+3y)-(2x-y)=7-3$。','$4y=4$ → $y=1$。','代回第二式：$2x-1=3$ → $x=2$。'],
        ans:'$x=2$、$y=1$' } ] },

  { id:'u17c2', title:'二元一次聯立方程式解的情形', body:
    '<p>二元一次聯立方程式解的情形可能是<b class="key">恰有一組解</b>、<b class="key">無解</b>或<b class="key">無限多組解</b>。</p>'+
    '<div class="inline-ex">例：$\\begin{cases}3x+y=4\\\\ x-2y=1\\end{cases}$ 恰有<b class="key">一組解</b>；$\\begin{cases}2x+3y=5\\\\ 4x+6y=10\\end{cases}$ 有<b class="key">無限多組</b>解；$\\begin{cases}x+2y=4\\\\ x+2y=5\\end{cases}$ <b class="key">無解</b>。</div>',
    examples:[
      { q:'解 $\\begin{cases}x+2y=4\\\\ x+2y=5\\end{cases}$ 時會發生什麼事？',
        steps:['兩式相減：$0=-1$，矛盾。','同一個 $x+2y$ 不可能同時等於 4 和 5 → 無解（圖形是兩平行線）。'],
        ans:'無解' } ] },

  { id:'u17c3', title:'補充：斜截式與兩點求直線', body:
    '<p>Q：為什麼不是假設 $ax+by+c=0$？而是 $y=ax+b$？</p>'+
    '<p>$ax+by+c=0 \\Rightarrow \\dfrac{a}{b}x+y=-\\dfrac{c}{b} \\Rightarrow y=-\\dfrac{a}{b}x-\\dfrac{c}{b}$，設 $m=-\\dfrac{a}{b}$、$k=-\\dfrac{c}{b}$，得 $y=mx+k$【<b class="key">斜截式</b>】。</p>'+
    '<p>※ 兩點求直線的方法：</p>'+
    '<p>(1) 代數式：假設 <b class="key">$y=ax+b$</b>，把兩點代入解 $a$、$b$。</p>'+
    '<p>(2) 兩點式：$\\dfrac{x-x_1}{y-y_1}=\\dfrac{x_2-x_1}{y_2-y_1}$。</p>'+
    '<p>(3) 截距式：$\\dfrac{x}{a}+\\dfrac{y}{b}=1$（$a$、$b$ 為 $x$、$y$ 截距）。</p>',
    examples:[
      { q:'求通過 $(0,3)$ 與 $(2,7)$ 的直線方程式。',
        steps:['設 $y=ax+b$。','代 $(0,3)$：$b=3$。','代 $(2,7)$：$2a+3=7$ → $a=2$。'],
        ans:'$y=2x+3$' } ] }
]},

{ id:'u18', book:2, sec:'1-3', title:'應用問題', page:28, concepts:[
  { id:'u18c1', title:'用聯立方程式解應用問題的步驟', body:
    '<p>(1) <b class="key">設未知數</b>：依題意假設<b class="key">兩個</b>適當的未知數。</p>'+
    '<p>(2) <b class="key">列方程式</b>：根據題目找出相等的關係，列出<b class="key">二元一次聯立方程式</b>。</p>'+
    '<p>(3) <b class="key">解聯立方程式</b>。</p>'+
    '<p>(4) <b class="key">寫答案</b>：依題意寫出正確答案，若不合題意的解則要捨棄，即此題沒有解。</p>',
    examples:[
      { q:'雞兔同籠，共 10 個頭、28 隻腳，雞兔各幾隻？',
        steps:['設雞 $x$ 隻、兔 $y$ 隻。','頭：$x+y=10$；腳：$2x+4y=28$。','第一式 ×2：$2x+2y=20$，與腳式相減：$2y=8$ → $y=4$。','$x=10-4=6$。驗算：$2\\times 6+4\\times 4=28$ ✓。'],
        ans:'雞 6 隻、兔 4 隻' },
      { q:'兩數的和是 25，大數是小數的 4 倍，求兩數。',
        steps:['設大數 $x$、小數 $y$：$x+y=25$、$x=4y$。','代入：$4y+y=25$ → $y=5$。','$x=20$。'],
        ans:'20 和 5' },
      { q:'門票全票 100 元、半票 60 元，共賣 30 張、收入 2600 元，全票賣幾張？',
        steps:['設全票 $x$ 張、半票 $y$ 張：$x+y=30$、$100x+60y=2600$。','第一式 ×60：$60x+60y=1800$，相減：$40x=800$ → $x=20$。','$y=10$，驗算：$2000+600=2600$ ✓。'],
        ans:'全票 20 張' } ] }
]},

{ id:'u19', book:2, sec:'3-1', title:'比例式', page:29, concepts:[
  { id:'u19c1', title:'比、比值', body:
    '<p>(1) <b class="key">比</b>：設 $a$、$b$ 為 <b class="key">2</b> 個數，且 $b\\neq 0$，則 $a$ 與 $b$ 的比記為 <b class="key">$a:b$</b>，其中 $a$ 稱為比的<b class="key">前項</b>，$b$ 稱為比的<b class="key">後項</b>。</p>'+
    '<p>(2) <b class="key">比值</b>：$a:b$（$b\\neq 0$）的比值為 <b class="key">$\\dfrac{a}{b}$</b>，表示前項是後項的 $\\dfrac{a}{b}$ 倍。</p>',
    examples:[
      { q:'寫出 $15:6$ 的前項、後項與比值。',
        steps:['前項 15、後項 6。','比值 $=\\dfrac{15}{6}=\\dfrac{5}{2}$。'],
        ans:'前項 15、後項 6、比值 $\\dfrac{5}{2}$' } ] },

  { id:'u19c2', title:'比的相等', body:
    '<p>(1) 如果 $a:b$ 與 $c:d$ 兩個比的<b class="key">比值相等</b>（即 $\\dfrac{a}{b}=\\dfrac{c}{d}$），則它們的<b class="key">比就相等</b>，記為 <b class="key">$a:b=c:d$</b>。</p>'+
    '<p>(2) $a:b=(a\\times m):(b\\times m)$、$a:b=(a\\div m):(b\\div m)$，$m\\neq 0$。</p>'+
    '<p>※ <b class="key">繁分數</b>：一個分數的分子或分母也是分數時，就稱為繁分數。</p>'+
    '<div class="inline-ex">例如：$\\dfrac{\\ \\frac{2}{7}\\ }{\\ \\frac{4}{5}\\ }=\\dfrac{2}{7}\\div\\dfrac{4}{5}$。</div>',
    examples:[
      { q:'判斷 $6:9$ 與 $10:15$ 是否相等。',
        steps:['比值：$\\dfrac{6}{9}=\\dfrac{2}{3}$、$\\dfrac{10}{15}=\\dfrac{2}{3}$。','比值相等 → 兩比相等。'],
        ans:'相等' },
      { q:'化簡繁分數 $\\dfrac{\\ \\frac{3}{4}\\ }{\\ \\frac{9}{8}\\ }$。',
        steps:['寫成除法：$\\dfrac{3}{4}\\div\\dfrac{9}{8}=\\dfrac{3}{4}\\times\\dfrac{8}{9}$。','約分：$=\\dfrac{2}{3}$。'],
        ans:'$\\dfrac{2}{3}$' } ] },

  { id:'u19c3', title:'比的運算性質', body:
    '<p>(1) 因為 $\\dfrac{a}{b}=\\dfrac{a\\times m}{b\\times m}$（$m\\neq 0$），所以 <b class="key">$a:b=(a\\times m):(b\\times m)$</b>。</p>'+
    '<div class="inline-ex">例：$3:5=(3\\times 2):(5\\times 2)$；$7:(-9)=[7\\times(-3)]:[(-9)\\times(-3)]$。</div>'+
    '<p>(2) 因為 $\\dfrac{a}{b}=\\dfrac{a\\div m}{b\\div m}$（$m\\neq 0$），所以 <b class="key">$a:b=(a\\div m):(b\\div m)$</b>。</p>'+
    '<div class="inline-ex">例：$12:8=(12\\div 4):(8\\div 4)$；$30:(-25)=(30\\div 5):[(-25)\\div 5]$。</div>',
    examples:[
      { q:'把 $\\dfrac{2}{3}:\\dfrac{1}{2}$ 化成整數比。',
        steps:['兩項同乘分母的最小公倍數 6。','$\\left(\\dfrac{2}{3}\\times 6\\right):\\left(\\dfrac{1}{2}\\times 6\\right)=4:3$。'],
        ans:'$4:3$' } ] },

  { id:'u19c4', title:'最簡整數比', body:
    '<p>當 $a$、$b$ 都是<b class="key">整數，且它們的最大公因數是 1</b> 時，我們稱 $a:b$ 是<b class="key">最簡整數比</b>，此時比值 $\\dfrac{a}{b}$ 會是<b class="key">最簡分數</b>。</p>',
    examples:[
      { q:'把 $24:36$ 化成最簡整數比。',
        steps:['$(24,36)=12$。','兩項同除 12：$2:3$。'],
        ans:'$2:3$' },
      { q:'把 $0.4:1.2$ 化成最簡整數比。',
        steps:['同乘 10 化整數：$4:12$。','同除 $(4,12)=4$：$1:3$。'],
        ans:'$1:3$' } ] },

  { id:'u19c5', title:'比例式', body:
    '<p>(1) 當 $a:b$ 和 $c:d$（$b\\neq 0$，$d\\neq 0$）兩個<b class="key">比相等</b>時，可以記為 $a:b=c:d$，這個等式通常稱為<b class="key">比例式</b>，其中 $a$ 和 $d$ 稱為這個比例式的<b class="key">外項</b>，$b$ 和 $c$ 稱為這個比例式的<b class="key">內項</b>。</p>'+
    '<p>(2) 比例式的<b class="key">外項乘積等於內項乘積</b>，也就是若 $a:b=c:d$，則 <b class="key">$a\\times d=b\\times c$</b>。</p>',
    examples:[
      { q:'解比例式 $x:6=5:3$。',
        steps:['外項乘積＝內項乘積：$3x=30$。','$x=10$。'],
        ans:'$x=10$' },
      { q:'糖與水以 $2:7$ 調配糖水，若糖用 30 克，水要幾克？',
        steps:['設水 $x$ 克：$2:7=30:x$。','$2x=210$ → $x=105$。'],
        ans:'105 克' } ] },

  { id:'u19c6', title:'比例式的性質', body:
    '<p>設 $a$、$b$ 都是不為 0 的數，且 $x:y=a:b$，則：</p>'+
    '<p>(1) <b class="key">$\\dfrac{x}{a}=\\dfrac{y}{b}$</b>（或 $x:a=y:b$）。</p>'+
    '<p>(2) 可設 <b class="key">$x=ar$、$y=br$</b>（$r\\neq 0$）。</p>'+
    '<div class="inline-ex">例：若 $x:y=4:3$，則 $\\dfrac{x}{4}=\\dfrac{y}{3}$，且可設 $x=4r$、$y=3r$，$r\\neq 0$。</div>',
    examples:[
      { q:'已知 $x:y=5:2$ 且 $x+y=28$，求 $x$、$y$。',
        steps:['設 $x=5r$、$y=2r$。','$5r+2r=28$ → $r=4$。','$x=20$、$y=8$。'],
        ans:'$x=20$、$y=8$' },
      { q:'甲、乙兩人分 3600 元，若甲：乙 $=7:5$，兩人各得多少？',
        steps:['設甲 $=7r$、乙 $=5r$：$12r=3600$ → $r=300$。','甲 $=2100$、乙 $=1500$。'],
        ans:'甲 2100 元、乙 1500 元' } ] }
]},

{ id:'u20', book:2, sec:'3-2', title:'連比例', page:31, concepts:[
  { id:'u20c1', title:'連比、連比例式', body:
    '<p>設 $a$、$b$、$c$ 都是不為 0 的數：</p>'+
    '<p>(1) <b class="key">$a:b:c$</b> 這樣的比稱為<b class="key">連比</b>。</p>'+
    '<p>(2) $x:y=a:b$、$y:z=b:c$、$x:z=a:c$，可以表示成 <b class="key">$x:y:z=a:b:c$</b>，稱為<b class="key">連比例式</b>。</p>'+
    '<div class="inline-ex">例(1)：若 $x:y=3:5$、$y:z=5:4$，則 $x:y:z=<b class="key">3:5:4</b>$。<br>例(2)：若 $x:y=2:3$、$x:z=2:4$，則 $x:y:z=<b class="key">2:3:4</b>$。<br>例(3)：若 $y:z=5:4$、$x:z=3:4$，則 $x:y:z=<b class="key">3:5:4</b>$。</div>',
    examples:[
      { q:'若 $x:y=2:5$、$y:z=3:4$，求 $x:y:z$。',
        steps:['$y$ 在兩比中分別是 5 和 3，取 $[5,3]=15$ 統一。','$x:y=2:5=6:15$；$y:z=3:4=15:20$。','合併：$x:y:z=6:15:20$。'],
        ans:'$6:15:20$' } ] },

  { id:'u20c2', title:'連比的運算性質', body:
    '<p>若 $a$、$b$、$c$ 是三個不為 0 的數，則：</p>'+
    '<p>(1) $a:b:c=(a\\times m):(b\\times m):(c\\times m)$（$m\\neq 0$）。</p>'+
    '<p>(2) $a:b:c=(a\\div m):(b\\div m):(c\\div m)$（$m\\neq 0$）。</p>'+
    '<div class="inline-ex">例：$12:16:20=(12\\div 4):(16\\div 4):(20\\div 4)=3:4:5$。</div>',
    examples:[
      { q:'把 $\\dfrac{1}{2}:\\dfrac{2}{3}:\\dfrac{5}{6}$ 化成整數比。',
        steps:['同乘分母的最小公倍數 $[2,3,6]=6$。','$3:4:5$。'],
        ans:'$3:4:5$' } ] },

  { id:'u20c3', title:'連比例式的意義', body:
    '<p>三個不為 0 的數 $x$、$y$、$z$，若滿足 $x:y:z=a:b:c$，就稱為連比例式，其意義為 <b class="key">$x:y=a:b$、$y:z=b:c$、$z:x=c:a$</b>。</p>'+
    '<div class="inline-ex">例：若 $x:y:z=3:4:5$，則 $x:y=3:4$、$y:z=4:5$、$x:z=3:5$。</div>',
    examples:[
      { q:'若 $x:y:z=2:7:9$，寫出 $x:z$ 與 $y:z$。',
        steps:['直接取對應項：$x:z=2:9$。','$y:z=7:9$。'],
        ans:'$x:z=2:9$；$y:z=7:9$' } ] },

  { id:'u20c4', title:'最簡整數比（三項）', body:
    '<p>設 $a$、$b$、$c$ 都是不為 0 的整數，且三數的<b class="key">最大公因數是 1</b>，則稱 $a:b:c$ 為<b class="key">最簡整數比</b>。</p>'+
    '<div class="inline-ex">例：$2:3:4$ 是最簡整數比，而 $3:6:9$ 不是最簡整數比。</div>',
    examples:[
      { q:'把 $18:24:30$ 化成最簡整數比。',
        steps:['$(18,24,30)=6$。','同除 6：$3:4:5$。'],
        ans:'$3:4:5$' } ] },

  { id:'u20c5', title:'連比例式的性質', body:
    '<p>設 $a$、$b$、$c$ 都是不為 0 的數，且 $x:y:z=a:b:c$，則：</p>'+
    '<p>(1) $x:y:z=ma:mb:mc$，$m\\neq 0$。</p>'+
    '<p>(2) $\\dfrac{x}{a}=\\dfrac{y}{b}=\\dfrac{z}{c}$。</p>'+
    '<p>(3) 可設 <b class="key">$x=ar$、$y=br$、$z=cr$</b>，$r\\neq 0$。</p>'+
    '<div class="inline-ex">例：若 $x:y:z=2:3:4$，則 $x:y:z=2m:3m:4m$（$m\\neq 0$）、$\\dfrac{x}{2}=\\dfrac{y}{3}=\\dfrac{z}{4}$，且可設 $x=2r$、$y=3r$、$z=4r$（$r\\neq 0$）。</div>',
    examples:[
      { q:'三角形三邊長比為 $3:4:5$，周長 60，求三邊長。',
        steps:['設三邊 $3r$、$4r$、$5r$。','$3r+4r+5r=12r=60$ → $r=5$。','三邊 15、20、25。'],
        ans:'15、20、25' },
      { q:'已知 $x:y:z=1:2:5$ 且 $x+y+z=32$，求 $z-x$。',
        steps:['設 $x=r$、$y=2r$、$z=5r$：$8r=32$ → $r=4$。','$z-x=5r-r=4r=16$。'],
        ans:'$16$' } ] }
]},

{ id:'u21', book:2, sec:'3-3', title:'正比、反比', page:32, concepts:[
  { id:'u21c1', title:'定義名詞', body:
    '<p><b class="key">常數</b>：<b class="key">固定不變的數</b>。</p>'+
    '<p><b class="key">變數</b>：<b class="key">會變動的數</b>。</p>'+
    '<p>(1) 自變數（$x$）：<b class="key">自己會改變的數</b>。</p>'+
    '<p>(2) 應變數（$y$）：<b class="key">因應 $x$ 改變，而改變的數</b>。</p>',
    examples:[
      { q:'「一枝筆 12 元，買 $x$ 枝共 $y$ 元」中，哪個是常數？哪個是自變數、應變數？',
        steps:['12（單價）固定不變 → 常數。','$x$ 自己變 → 自變數；$y$ 跟著 $x$ 變 → 應變數。'],
        ans:'常數 12；自變數 $x$；應變數 $y$' } ] },

  { id:'u21c2', title:'正比', body:
    '<p>兩個變數 $x$、$y$，當 $x$ 值改變時，$y$ 值也隨著改變，且保持 $y$ 值為 $x$ 值的某個<b class="key">固定倍數</b>（以 $k$ 倍表示，$k\\neq 0$），可以寫成關係式 <b class="key">$\\dfrac{y}{x}=k$</b> 或 <b class="key">$y=kx$</b>，那麼我們就說「$y$ 與 $x$ <b class="key">成正比</b>」。</p>'+
    '<div class="inline-ex">例：買一株 10 元的康乃馨 $x$ 株，總價為 $y$ 元，則 $y=10x$，$y$ 與 $x$ 成正比。</div>',
    examples:[
      { q:'已知 $y$ 與 $x$ 成正比，且 $x=4$ 時 $y=10$，求 $x=6$ 時的 $y$。',
        steps:['$y=kx$ → $k=\\dfrac{10}{4}=\\dfrac{5}{2}$。','$y=\\dfrac{5}{2}\\times 6=15$。'],
        ans:'$y=15$' },
      { q:'時速固定 60 公里，行駛 $x$ 小時的距離 $y$ 公里。$y$ 與 $x$ 成正比嗎？$k$ 是多少？',
        steps:['$y=60x$，是 $y=kx$ 的形式。','固定倍數 $k=60$。'],
        ans:'成正比，$k=60$' } ] },

  { id:'u21c3', title:'反比', body:
    '<p>兩個不為 0 的變數 $x$、$y$，當 $x$ 值改變時，$y$ 值也隨著改變，且保持 $x$ 值和 $y$ 值的<b class="key">乘積</b>是某個<b class="key">固定的數</b>（以 $k$ 表示，$k\\neq 0$），可以寫成關係式 <b class="key">$xy=k$</b>，那麼我們就說「$y$ 與 $x$ <b class="key">成反比</b>」。</p>'+
    '<div class="inline-ex">例：買 $x$ 株 $y$ 元的康乃馨，共花 500 元，則 $xy=500$，$y$ 與 $x$ 成反比。</div>',
    examples:[
      { q:'已知 $y$ 與 $x$ 成反比，且 $x=3$ 時 $y=8$，求 $x=6$ 時的 $y$。',
        steps:['$xy=k$ → $k=3\\times 8=24$。','$6y=24$ → $y=4$。'],
        ans:'$y=4$' },
      { q:'一件工作 12 人做要 10 天完成，若工作量固定，$x$ 人做要 $y$ 天，寫出關係式並求 8 人要幾天。',
        steps:['總工作量 $=12\\times 10=120$（人日）固定 → $xy=120$，成反比。','$8y=120$ → $y=15$。'],
        ans:'$xy=120$；15 天' } ] }
]}

];

/* 目次骨架：尚未轉錄的單元（轉錄完成後逐一搬進上方陣列） */
var MATH_UNITS_TODO = [
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
