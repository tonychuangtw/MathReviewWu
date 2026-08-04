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
]},

{ id:'u22', book:2, sec:'4-1', title:'變數與函數', page:33, concepts:[
  { id:'u22c1', title:'函數的意義與判斷', body:
    '<p>函數符號：<b class="key">$f(x)$</b>。</p>'+
    '<p>(1) 如果每一個 $x$ 都有一個 $y$ 與之對應（而且<b class="key">只有一個</b> $y$ 與之對應），則稱 <b class="key">$y$ 是 $x$ 的函數</b>，以 $y=f(x)$ 表示（function of $x$，簡稱 f of x）。</p>'+
    '<p>(2) 圖形上，由 $x$ 軸畫<b class="key">垂直線</b>，只與圖形<b class="key">交於一點</b>，則為函數的圖形。</p>'+
    '<p>判斷函數的方法：</p>'+
    '<p>1、文字：「$y$ 是 $x$ 的函數」→ 看 $x$ —— 排除 2 種：一個 $x$ 對到多個 $y$（劈腿型）、有 $x$ 沒對到 $y$（獨居型）。</p>'+
    '<p>2、圖形：由 $x$ 軸畫<b class="key">垂線</b>檢驗（鉛直線測試）。</p>',
    examples:[
      { q:'「每個學生 $x$ 對應他的身高 $y$」是函數嗎？「每個身高 $y$ 對應有這身高的學生 $x$」呢？',
        steps:['每個學生只有一個身高 → 一對一或多對一，是函數。','同一身高可能有很多學生 → 一個輸入對多個輸出（劈腿型），不是函數。'],
        ans:'前者是；後者不是' },
      { q:'圓（如 $x^2+y^2=25$ 的圖形）是函數的圖形嗎？',
        steps:['畫鉛直線 $x=0$，與圓交於 $(0,5)$、$(0,-5)$ 兩點。','一個 $x$ 對到兩個 $y$ → 不是函數的圖形。'],
        ans:'不是' } ] },

  { id:'u22c2', title:'函數的分類', body:
    '<p>$f(x)=0$：<b class="key">零函數</b>。</p>'+
    '<p>$f(x)=5$：<b class="key">零次函數（常數函數）</b>。</p>'+
    '<p>$f(x)=100-x$：<b class="key">一次函數</b>。</p>'+
    '<p>$f(x)=2x^2+\\dfrac{9}{5}x+32$：<b class="key">二次函數</b>。</p>'+
    '<p>$f(x)=-2x^3+3x^2-5x+7$：<b class="key">三次函數</b>。</p>'+
    '<p>分類整理：零函數、零次函數合稱<b class="key">常數函數</b>；常數函數與一次函數 $y=ax+b$ 合稱<b class="key">線型函數</b>。</p>'+
    '<p><b class="key">二次函數</b>：形如 $y=ax^2+bx+c$，其中 $a\\neq 0$ 且 $x$ 的最高次數為 2；三次函數：$y=ax^3+bx^2+cx+d$（$a\\neq 0$）。</p>',
    examples:[
      { q:'$y=7$、$y=3x-2$、$y=x^2$ 各是哪類函數？哪些是線型函數？',
        steps:['$y=7$：常數函數（零次）。','$y=3x-2$：一次函數。','$y=x^2$：二次函數。','線型函數＝常數函數＋一次函數 → 前兩個。'],
        ans:'常數／一次／二次；前兩個是線型函數' } ] },

  { id:'u22c3', title:'函數值', body:
    '<p>設函數 $y=f(x)$，則 <b class="key">$f(a)$</b> 代表 $x=a$ 時所對應的<b class="key">函數值</b>。</p>'+
    '<div class="inline-ex">例：若函數 $f(x)=2x+3$，則 $f(5)=2\\times 5+3=<b class="key">13</b>$，代表 $x=5$ 時所對應的函數值為 13。</div>',
    examples:[
      { q:'設 $f(x)=-3x+1$，求 $f(2)$ 與 $f(-1)$。',
        steps:['$f(2)=-3\\times 2+1=-5$。','$f(-1)=-3\\times(-1)+1=4$。'],
        ans:'$f(2)=-5$；$f(-1)=4$' },
      { q:'設 $f(x)=ax+5$ 且 $f(3)=11$，求 $a$ 與 $f(-2)$。',
        steps:['$f(3)=3a+5=11$ → $a=2$。','$f(x)=2x+5$，$f(-2)=1$。'],
        ans:'$a=2$；$f(-2)=1$' } ] }
]},

{ id:'u23', book:2, sec:'4-2', title:'線型函數的圖形', page:35, concepts:[
  { id:'u23c1', title:'函數圖形', body:
    '<p>在坐標平面上，將滿足 $y=f(x)$ 關係的所有點 $(x,y)$ 描畫出來，則所得到的圖形就是函數 $f(x)$ 的<b class="key">圖形</b>。</p>'+
    '<div class="inline-ex">例：已知 $x$ 與 $f(x)$ 的對應表（如 $x=1$ 時 $f(x)=-2$、$x=-1$ 時 $f(x)=3$⋯），把每組 $(x,f(x))$ 描到坐標平面上，就是這個函數的圖形。</div>',
    examples:[
      { q:'函數 $f(x)=2x-1$ 的圖形通過 $(3,a)$，求 $a$。',
        steps:['圖形上的點滿足 $y=f(x)$。','$a=f(3)=2\\times 3-1=5$。'],
        ans:'$a=5$' } ] },

  { id:'u23c2', title:'線型函數', body:
    '<p>函數 $f(x)=ax+b$ 稱為<b class="key">線型函數</b>，其圖形是<b class="key">一條直線</b>。</p>'+
    '<p>(1) 當 $a\\neq 0$ 時，$f(x)=ax+b$ 為<b class="key">一次函數</b>（斜直線）。</p>'+
    '<p>(2) 當 $a=0$ 時，$f(x)=b$ 為<b class="key">常數函數</b>（水平線）。</p>'+
    '<p>※ 兩點求直線：已知兩點 $(x_1,y_1)$、$(x_2,y_2)$，可假設 $y=ax+b$ 代入解出 $a$、$b$。</p>',
    examples:[
      { q:'線型函數 $f(x)=ax+b$ 的圖形通過 $(1,4)$ 與 $(3,10)$，求 $f(x)$。',
        steps:['代 $(1,4)$：$a+b=4$；代 $(3,10)$：$3a+b=10$。','相減：$2a=6$ → $a=3$，$b=1$。'],
        ans:'$f(x)=3x+1$' },
      { q:'$f(x)=5$ 的圖形長什麼樣子？',
        steps:['$a=0$ 的常數函數。','圖形是通過 $(0,5)$ 的水平線。'],
        ans:'水平線 $y=5$' } ] }
]},

{ id:'u24', book:2, sec:'5-1', title:'一元一次不等式', page:36, concepts:[
  { id:'u24c1', title:'認識不等式', body:
    '<p><b class="key">不等式</b>：<b class="key">不是「＝」的式子</b>，包含 <b class="key">＞、＜、≧、≦</b>。</p>'+
    '<p><b class="key">一元一次不等式</b>：若不等式中只有<b class="key">一種未知數</b>，且未知數的<b class="key">次數為 1</b>（一次），則此不等式就稱為一元一次不等式。</p>',
    examples:[
      { q:'下列何者是一元一次不等式？① $2x+1=5$ ② $3x-2>7$ ③ $x^2\\le 4$',
        steps:['① 是等式不是不等式。','③ 次數是 2。','② 一種未知數、一次、不等號 ✓。'],
        ans:'②' } ] },

  { id:'u24c2', title:'習慣用語和不等號的對照表', body:
    '<p>(1) 大於、超過、高於：<b class="key">＞</b>。</p>'+
    '<p>(2) 小於、未滿、低於、不到、不夠、不足：<b class="key">＜</b>。</p>'+
    '<p>(3) 不小於、不低於、至少、以上（含）：<b class="key">≧</b>。</p>'+
    '<p>(4) 不大於、不超過、不逾、不高於、至多、以下（含）：<b class="key">≦</b>。</p>',
    examples:[
      { q:'把「身高 $x$ 至少 140 公分才能搭乘」和「重量 $y$ 未滿 30 公斤」寫成不等式。',
        steps:['「至少」含 140 → $x\\ge 140$。','「未滿」不含 30 → $y<30$。'],
        ans:'$x\\ge 140$；$y<30$' },
      { q:'「$x$ 不超過 25」和「$x$ 不低於 8」用不等式表示。',
        steps:['不超過 → 至多 → $x\\le 25$。','不低於 → 至少 → $x\\ge 8$。'],
        ans:'$x\\le 25$；$x\\ge 8$' } ] },

  { id:'u24c3', title:'一元一次不等式的解', body:
    '<p>使一元一次不等式<b class="key">成立</b>的數，稱為該不等式的<b class="key">解</b>。</p>',
    examples:[
      { q:'$x=3$、$x=5$、$x=7$ 中，哪些是 $2x-4>6$ 的解？',
        steps:['$x=3$：$2$ > 6？否。','$x=5$：$6>6$？否（不含等於）。','$x=7$：$10>6$ ✓。'],
        ans:'只有 $x=7$' } ] },

  { id:'u24c4', title:'圖示一元一次不等式的解', body:
    '<p>在數線上圖示：<b class="key">＞、＜ 用空心圓</b>（不含端點）、<b class="key">≧、≦ 用實心圓</b>（含端點），再往解的方向畫箭頭。</p>'+
    '<p>$x<a$：空心圓向左；$x\\le a$：實心圓向左；$x>a$：空心圓向右；$x\\ge a$：實心圓向右；$a<x<b$：兩空心圓之間；$a\\le x\\le b$：兩實心圓之間。</p>',
    fig:'u24-ineq',
    examples:[
      { q:'「$x\\ge -2$」在數線上怎麼畫？',
        steps:['$\\ge$ 含等於 → 在 $-2$ 畫實心圓。','解往右 → 向右畫箭頭。'],
        ans:'實心圓於 $-2$、向右箭頭' } ] }
]},

{ id:'u25', book:2, sec:'5-2', title:'解一元一次不等式', page:37, concepts:[
  { id:'u25c1', title:'不等式的加減運算規則', body:
    '<p>若 $a>b$，則：</p>'+
    '<p>(1) $a+c$ <b class="key">＞</b> $b+c$。</p>'+
    '<p>(2) $a-c$ <b class="key">＞</b> $b-c$。</p>'+
    '<div class="inline-ex">例：若 $5>-2$，則 $5+3>(-2)+3$；$5-3>(-2)-3$。</div>'+
    '<p>→ 兩邊同加、同減一個數，不等號方向<b class="key">不變</b>。</p>',
    examples:[
      { q:'解不等式 $x-6>2$。',
        steps:['兩邊同加 6（方向不變）。','$x>8$。'],
        ans:'$x>8$' } ] },

  { id:'u25c2', title:'不等式的乘除運算規則', body:
    '<p>(1) 若 $a>b$ 且 $c>0$，則：① $ac$ <b class="key">＞</b> $bc$；② $a\\div c$ <b class="key">＞</b> $b\\div c$。</p>'+
    '<p>(2) 若 $a>b$ 且 <b class="key">$c<0$（負數）</b>，則：① $ac$ <b class="key">＜</b> $bc$；② $a\\div c$ <b class="key">＜</b> $b\\div c$。</p>'+
    '<div class="inline-ex">例：若 $6>1$，則 (1) $6\\times 3>1\\times 3$、$6\\div 3>1\\div 3$；(2) $6\\times(-3)<1\\times(-3)$、$6\\div(-3)<1\\div(-3)$。</div>'+
    '<p>→ 除了<b class="key">乘以一個負數</b>或<b class="key">除以一個負數</b>要<b class="key">改變</b>不等式的<b class="key">方向</b>外，其他運算方法與一元一次方程式【移項法則】相同。</p>',
    examples:[
      { q:'解不等式 $-3x>12$。',
        steps:['兩邊同除 $-3$（負數！方向要反）。','$x<-4$。'],
        ans:'$x<-4$' },
      { q:'解不等式 $5-2x\\le 11$。',
        steps:['移項：$-2x\\le 6$。','同除 $-2$，方向反轉：$x\\ge -3$。'],
        ans:'$x\\ge -3$' } ] },

  { id:'u25c3', title:'不等式解的表示', body:
    '<p>一元一次不等式可用像 <b class="key">$x>a$、$x<a$、$x\\le a$、$x\\ge a$</b> 這類的不等式來表示它們的解。</p>',
    examples:[
      { q:'解 $4x-1<2x+7$ 並表示解。',
        steps:['移項：$4x-2x<7+1$。','$2x<8$ → $x<4$。'],
        ans:'$x<4$' } ] },

  { id:'u25c4', title:'應用問題', body:
    '<p>在解應用問題時，必須考慮答案的<b class="key">合理性</b>（如人數是非負整數、長度為正等）。</p>',
    examples:[
      { q:'某遊樂設施每次最多載 8 人，全班 35 人至少要坐幾趟才能全部玩到？',
        steps:['設 $x$ 趟：$8x\\ge 35$。','$x\\ge \\dfrac{35}{8}=4.375$。','趟數是整數 → 至少 5 趟（合理性）。'],
        ans:'5 趟' },
      { q:'買一枝 25 元的筆若干枝，總價不超過 200 元，最多能買幾枝？',
        steps:['設 $x$ 枝：$25x\\le 200$。','$x\\le 8$，枝數為非負整數。'],
        ans:'最多 8 枝' } ] }
]},

{ id:'u26', book:3, sec:'1-1', title:'乘法公式', page:39, concepts:[
  { id:'u26c1', title:'分配律', body:
    '<p>乘法對加法的分配律：<b class="key">$a(b+c)=ab+ac$</b>。</p>'+
    '<p>乘法對減法的分配律：<b class="key">$a(b-c)=ab-ac$</b>。</p>'+
    '<p>乘法具有交換律：$(b+c)a=a(b+c)$、$(b-c)a=a(b-c)$。</p>'+
    '<p>$a$、$b$、$c$、$d$ 為任意數時，<b class="key">$(a+b)(c+d)=ac+ad+bc+bd$</b>（面積上＝甲＋乙＋丙＋丁四塊）。</p>'+
    '<div class="inline-ex">例：$12\\tfrac{1}{2}\\times 20\\tfrac{1}{3}=\\left(12+\\tfrac{1}{2}\\right)\\left(20+\\tfrac{1}{3}\\right)=12\\times 20+12\\times\\tfrac{1}{3}+\\tfrac{1}{2}\\times 20+\\tfrac{1}{2}\\times\\tfrac{1}{3}$。</div>',
    examples:[
      { q:'展開 $(x+3)(y+5)$。',
        steps:['照 $(a+b)(c+d)=ac+ad+bc+bd$。','$=xy+5x+3y+15$。'],
        ans:'$xy+5x+3y+15$' } ] },

  { id:'u26c2', title:'和的（完全）平方公式', body:
    '<p>$a$、$b$ 為任意數時，<b class="key">$(a+b)^2=a^2+2ab+b^2$</b>。</p>'+
    '<p>(1) 從<b class="key">面積</b>來看：邊長 $(a+b)$ 的正方形切成 $a^2$、兩塊 $ab$、$b^2$ 四塊。</p>'+
    '<p>(2) 用<b class="key">分配律</b>的規則來計算：$(a+b)^2=(a+b)\\times(a+b)=a^2+ab+ba+b^2=a^2+2ab+b^2$。</p>'+
    '<p>(3) 等號兩邊對調，可得 $a^2+2ab+b^2=(a+b)^2$。</p>'+
    '<div class="inline-ex">例：$205^2=(200+5)^2=200^2+2\\times 200\\times 5+5^2=42025$。</div>',
    fig:'u26-square',
    examples:[
      { q:'速算 $103^2$。',
        steps:['$103=100+3$：$(100+3)^2=100^2+2\\times 100\\times 3+3^2$。','$=10000+600+9=10609$。'],
        ans:'$10609$' },
      { q:'展開 $(2x+3)^2$。',
        steps:['$a=2x$、$b=3$：$(2x)^2+2\\times 2x\\times 3+3^2$。','$=4x^2+12x+9$。'],
        ans:'$4x^2+12x+9$' } ] },

  { id:'u26c3', title:'差的（完全）平方公式', body:
    '<p>$a$、$b$ 為任意數時，<b class="key">$(a-b)^2=a^2-2ab+b^2$</b>。</p>'+
    '<p>(1) 從<b class="key">面積</b>來看可以得到：$(a-b)^2=a^2-2ab+b^2$。</p>'+
    '<p>(2) 用<b class="key">分配律</b>的規則來計算：$(a-b)^2=(a-b)\\times(a-b)=a^2-ab-ba+b^2=a^2-2ab+b^2$。</p>'+
    '<p>(3) 等號兩邊對調，可得 $a^2-2ab+b^2=(a-b)^2$。</p>'+
    '<div class="inline-ex">例：$199^2=(200-1)^2=200^2-2\\times 200\\times 1+1^2=39601$。</div>',
    examples:[
      { q:'速算 $98^2$。',
        steps:['$98=100-2$：$(100-2)^2=100^2-2\\times 100\\times 2+2^2$。','$=10000-400+4=9604$。'],
        ans:'$9604$' },
      { q:'展開 $(3x-4)^2$。',
        steps:['$a=3x$、$b=4$：$(3x)^2-2\\times 3x\\times 4+4^2$。','$=9x^2-24x+16$。'],
        ans:'$9x^2-24x+16$' } ] },

  { id:'u26c4', title:'平方差公式', body:
    '<p>$a$、$b$ 為任意數時，<b class="key">$(a+b)(a-b)=a^2-b^2$</b>。</p>'+
    '<p>(1) 從<b class="key">面積</b>來看：邊長 $a$ 的大正方形剪去邊長 $b$ 的小正方形，剩餘面積 $a^2-b^2$；把剩餘部分分割成甲、乙重新組合，可拼成 $(a+b)(a-b)$ 的長方形 → $a^2-b^2=(a+b)(a-b)$。</p>'+
    '<p>(2) 用<b class="key">分配律</b>的規則來計算：$(a+b)\\times(a-b)=a^2-ab+ba-b^2=a^2-b^2$。</p>'+
    '<p>(3) 等號兩邊對調，可得 $(a+b)(a-b)=a^2-b^2$。</p>'+
    '<div class="inline-ex">例：$205\\times 195=(200+5)(200-5)=200^2-5^2=39975$。</div>',
    fig:'u26-diffsq',
    examples:[
      { q:'速算 $102\\times 98$。',
        steps:['$(100+2)(100-2)=100^2-2^2$。','$=10000-4=9996$。'],
        ans:'$9996$' },
      { q:'展開 $(5x+2y)(5x-2y)$。',
        steps:['$a=5x$、$b=2y$：$a^2-b^2$。','$=25x^2-4y^2$。'],
        ans:'$25x^2-4y^2$' } ] }
]},

{ id:'u27', book:3, sec:'1-2', title:'多項式的加減運算', page:41, concepts:[
  { id:'u27c1', title:'認識多項式', body:
    '<p>1. 像 $2x$、$3x^2$、$x^2+2x+3$ 這類由數和文字符號 $x$ 進行加法和乘法運算所構成的式子，我們稱為 $x$ 的<b class="key">多項式</b>。</p>'+
    '<p>2. 當 $x$ 出現在<b class="key">分母、絕對值</b>或是<b class="key">根號</b>內的時候，則<b class="key">不是</b> $x$ 的<b class="key">多項式</b>。</p>'+
    '<div class="inline-ex">例：$4$、$2x$、$3x^2$、$x^2+2x+3$ 是 $x$ 的多項式。</div>'+
    '<p>3. <b class="key">項</b>：在多項式中，「＋」、「－」所隔開的每一部分。</p>'+
    '<p>4. 在 $x$ 的多項式 $ax^2+bx+c$ 中：<b class="key">二次項</b>（或 $x^2$ 項）是 $ax^2$，係數為 $a$；<b class="key">一次項</b>（或 $x$ 項）是 $bx$，係數為 $b$；<b class="key">常數項</b>（或零次項）是 $c$；<b class="key">項數</b>是三。</p>'+
    '<div class="inline-ex">例：在 $x$ 的多項式 $5x^3-3x^2+1$ 中，二次項是 $-3x^2$，係數為 $-3$；一次項是 $0x$，係數為 $0$；常數項是 $1$；項數是三。</div>',
    examples:[
      { q:'下列何者不是 $x$ 的多項式？① $x^2-7$ ② $\\dfrac{3}{x}+1$ ③ $\\sqrt{x}+2$ ④ $\\dfrac{x}{3}+2$',
        steps:['② $x$ 在分母 → 不是。','③ $x$ 在根號內 → 不是。','④ 是 $\\dfrac{1}{3}x+2$，$x$ 不在分母 → 是多項式。'],
        ans:'②、③ 不是' } ] },

  { id:'u27c2', title:'多項式的次數、單項式與常數多項式', body:
    '<p>5. 在一個多項式中，係數不為 0 且次數最高的項稱為<b class="key">最高次項</b>，而最高次項的次數稱為此多項式的<b class="key">次數</b>。</p>'+
    '<div class="inline-ex">例：$x^3+5x^2-x+1$ 的次數是 3。</div>'+
    '<p>6. (1) 單項式：<b class="key">項數為 1 項的多項式</b>。</p>'+
    '<p>(2) 單項式為常數項時，則稱此單項式為<b class="key">常數多項式</b>。</p>'+
    '<p>(3) 當常數多項式不為 0 時，規定這個多項式的次數是 0，稱為<b class="key">零次多項式</b>。</p>'+
    '<p>(4) 當常數多項式為 0 時，稱為<b class="key">零多項式</b>（不討論次數）。</p>',
    examples:[
      { q:'寫出 $7$、$0$、$-4x^5$、$2x^2-x$ 各自的次數。',
        steps:['$7$：零次多項式，次數 0。','$0$：零多項式，不討論次數。','$-4x^5$：單項式，次數 5。','$2x^2-x$：次數 2。'],
        ans:'0；不討論；5；2' } ] },

  { id:'u27c3', title:'升冪排列、降冪排列', body:
    '<p>1. 將 $x$ 的多項式的各項按照 $x$ 的次數<b class="key">由小到大</b>的排列稱為<b class="key">升冪排列</b>；按照 $x$ 的次數<b class="key">由大到小</b>的排列稱為<b class="key">降冪排列</b>。</p>'+
    '<p>2. 多項式四則運算完後的結果需以升冪（或降冪）<b class="key">排列整齊</b>。</p>'+
    '<div class="inline-ex">例：$3x^2+6x^3-4+8x$ 按升冪排列為 $-4+8x+3x^2+6x^3$；按降冪排列為 $6x^3+3x^2+8x-4$。</div>',
    examples:[
      { q:'把 $5x-2x^3+7-x^2$ 按降冪排列。',
        steps:['次數由大到小：$-2x^3$、$-x^2$、$5x$、$7$。'],
        ans:'$-2x^3-x^2+5x+7$' } ] },

  { id:'u27c4', title:'同類項與多項式的加減運算', body:
    '<p>3. 我們將<b class="key">未知數</b>及<b class="key">其次方</b>均相同的項稱為<b class="key">同類項</b>。</p>'+
    '<div class="inline-ex">例：$2x^2$ 與 $-\\dfrac{1}{3}x^2$ 是同類項；$3$ 與 $-4$ 是同類項。</div>'+
    '<p>4. 兩個多項式相加減時，就是將同類項<b class="key">合併計算</b>（係數相加減）。可用 (1) 直式 (2) 橫式 (3) 分離係數法。</p>'+
    '<div class="inline-ex">例(1)：$(x^2+3x+2)+(2x^2+2x+2)=(1+2)x^2+(3+2)x+(2+2)=3x^2+5x+4$。<br>例(2)：$(x^2+5x+1)-(2+3x^2+x)=x^2+5x+1-2-3x^2-x=(1-3)x^2+(5-1)x+(1-2)=-2x^2+4x-1$。</div>',
    examples:[
      { q:'計算 $(4x^2-x+3)+(x^2+5x-8)$。',
        steps:['同類項合併：$(4+1)x^2+(-1+5)x+(3-8)$。','$=5x^2+4x-5$。'],
        ans:'$5x^2+4x-5$' },
      { q:'計算 $(2x^2+3)-(x^2-4x+7)$。',
        steps:['去括號變號：$2x^2+3-x^2+4x-7$。','合併：$x^2+4x-4$。'],
        ans:'$x^2+4x-4$' } ] }
]},

{ id:'u28', book:3, sec:'1-3', title:'多項式的乘除運算', page:43, concepts:[
  { id:'u28c1', title:'指數簡記與乘法規律', body:
    '<p>※ 指數簡記：同底相乘，<b class="key">指數相加</b>。</p>'+
    '<div class="inline-ex">例：$x\\cdot x=x^{1+1}=x^2$；$x\\cdot x^2=x^{1+2}=x^3$；$x^2\\cdot x^3=x^{2+3}=x^5$。</div>'+
    '<p>※ 乘法交換率、結合率：<b class="key">數字×數字、文字×文字</b>。</p>'+
    '<div class="inline-ex">例：$4x\\cdot x=4\\cdot x\\cdot x=4x^2$；$2x\\cdot 3x^2=2\\cdot 3\\cdot x\\cdot x^2=(2\\times 3)x^{1+2}=6x^3$。</div>',
    examples:[
      { q:'化簡 $5x^2\\cdot(-3x^4)$。',
        steps:['數字相乘：$5\\times(-3)=-15$。','文字相乘：$x^2\\cdot x^4=x^6$。'],
        ans:'$-15x^6$' } ] },

  { id:'u28c2', title:'多項式的乘法', body:
    '<p>1、單項式 × 單項式（橫式：分配律）。</p>'+
    '<div class="inline-ex">例：$(-2x)\\times 3x=-6x^2$。</div>'+
    '<p>2、單項式 × 多項式（橫式：分配律）。</p>'+
    '<div class="inline-ex">例：$-4x\\cdot(x+1)=-4x^2-4x$。</div>'+
    '<p>3、多項式 × 多項式：<b class="key">橫式</b>（分配律）或<b class="key">直式</b>（含分離係數法）。</p>'+
    '<div class="inline-ex">例：$(x+2)(x+3)=x^2+3x+2x+6=x^2+5x+6$。</div>'+
    '<p>4、乘法公式：(1) $(a+b)^2=a^2+2ab+b^2$；(2) $(a-b)^2=a^2-2ab+b^2$；(3) $a^2-b^2=(a+b)(a-b)$。</p>',
    examples:[
      { q:'展開 $(2x-1)(x+4)$。',
        steps:['分配：$2x\\cdot x+2x\\cdot 4-1\\cdot x-1\\cdot 4$。','$=2x^2+8x-x-4=2x^2+7x-4$。'],
        ans:'$2x^2+7x-4$' },
      { q:'展開 $(x+3)(x^2-2x+5)$。',
        steps:['逐項分配：$x^3-2x^2+5x+3x^2-6x+15$。','合併：$x^3+x^2-x+15$。'],
        ans:'$x^3+x^2-x+15$' } ] },

  { id:'u28c3', title:'多項式的除法', body:
    '<p>1、單項式 ÷ 單項式（寫成分數約分）。</p>'+
    '<div class="inline-ex">例：$6x^2\\div 2x=\\dfrac{6x^2}{2x}=3x$。</div>'+
    '<p>2、多項式 ÷ 單項式（分數＆長除法）。</p>'+
    '<div class="inline-ex">例：$(x^2+2x)\\div x=\\dfrac{x^2+2x}{x}=x+2$。</div>'+
    '<p>3、多項式 ÷ 多項式（直式＆分離係數）：①除式為一次式；②除式為二次式。</p>'+
    '<div class="inline-ex">例：$(2x^2-x-6)\\div(2x+3)$ 用長除法得商 $x-2$、餘式 $0$。</div>'+
    '<p>4、<b class="key">除法原理</b>：<b class="key">被除式＝除式×商式＋餘式</b>。</p>',
    examples:[
      { q:'求 $(x^2+5x+7)\\div(x+2)$ 的商式與餘式。',
        steps:['長除法：$x^2\\div x=x$，$x(x+2)=x^2+2x$，餘 $3x+7$。','$3x\\div x=3$，$3(x+2)=3x+6$，餘 $1$。','商 $x+3$、餘 $1$。驗算：$(x+2)(x+3)+1=x^2+5x+7$ ✓。'],
        ans:'商 $x+3$、餘式 $1$' },
      { q:'某多項式除以 $x-3$ 得商 $2x+1$、餘 $4$，求這個多項式。',
        steps:['除法原理：被除式 $=(x-3)(2x+1)+4$。','$=2x^2-5x-3+4=2x^2-5x+1$。'],
        ans:'$2x^2-5x+1$' } ] }
]},

{ id:'u29', book:3, sec:'2-1', title:'平方根與近似值', page:44, concepts:[
  { id:'u29c1', title:'√a 的意義（a>0）', body:
    '<p>(1) 若一個正方形的面積為 $a$，則它的邊長為 <b class="key">$\\sqrt{a}$</b>，滿足 <b class="key">$(\\sqrt{a})^2=a$</b>。</p>'+
    '<div class="inline-ex">例：若一個正方形的面積為 2，則它的邊長為 $\\sqrt{2}$，滿足 $(\\sqrt{2})^2=2$。</div>'+
    '<p>(2) 對於任意正數 $a$，則 $\\sqrt{a}$ 是一個<b class="key">正數</b>，且 $(\\sqrt{a})^2=a$。</p>'+
    '<div class="inline-ex">例：16 是正數，所以 $\\sqrt{16}$ 是<b class="key">正數</b>，且 $(\\sqrt{16})^2=16$。</div>'+
    '<p>(3) 若 $a$、$b$ 皆為正數，且 $a>b$，則 <b class="key">$\\sqrt{a}>\\sqrt{b}$</b>。</p>'+
    '<div class="inline-ex">例：$5>3$，所以 $\\sqrt{5}>\\sqrt{3}$。</div>'+
    '<p>(4) 若 $a$ 為正數，則 $(\\sqrt{a})^2=<b class="key">a</b>$。</p>'+
    '<div class="inline-ex">例：$(\\sqrt{5})^2=5$。</div>',
    examples:[
      { q:'面積 49 平方公分的正方形，邊長是多少？$(\\sqrt{7})^2$ 呢？',
        steps:['邊長 $=\\sqrt{49}=7$ 公分。','$(\\sqrt{7})^2=7$。'],
        ans:'7 公分；7' },
      { q:'比較 $\\sqrt{11}$、$3$、$\\sqrt{15}$ 的大小。',
        steps:['$3=\\sqrt{9}$。','$9<11<15$ → $\\sqrt{9}<\\sqrt{11}<\\sqrt{15}$。'],
        ans:'$3<\\sqrt{11}<\\sqrt{15}$' } ] },

  { id:'u29c2', title:'√(a²) 的化簡', body:
    '<p>(1) 若 $a\\ge 0$，則 $\\sqrt{a^2}=<b class="key">a</b>$。</p>'+
    '<div class="inline-ex">例：$\\sqrt{6^2}=6$。</div>'+
    '<p>(2) 若 $a<0$，則 $\\sqrt{a^2}=<b class="key">-a</b>$。</p>'+
    '<div class="inline-ex">例：$\\sqrt{(-5)^2}=-(-5)=5$。</div>'+
    '<p>(3) <b class="key">完全平方數</b>：<b class="key">若一個數 $a$ 是某個整數的平方，就稱 $a$ 為完全平方數</b>。</p>',
    examples:[
      { q:'化簡 $\\sqrt{(-9)^2}$ 與 $\\sqrt{3^2}$。',
        steps:['$\\sqrt{(-9)^2}=\\sqrt{81}=9=-(-9)$。','$\\sqrt{3^2}=3$。'],
        ans:'9；3' },
      { q:'1～50 中的完全平方數有哪些？',
        steps:['$1^2,2^2,\\dots,7^2=1,4,9,16,25,36,49$。'],
        ans:'1, 4, 9, 16, 25, 36, 49' } ] },

  { id:'u29c3', title:'求 √a 的值或近似值的方法', body:
    '<p>$a>0$，求 $\\sqrt{a}$ 的值或近似值的求法：</p>'+
    '<p>(1) 利用<b class="key">標準分解式</b>求值。</p>'+
    '<p>(2) 利用<b class="key">十分逼近法</b>。</p>'+
    '<p>(3) 利用<b class="key">查表法</b>（乘方開方表）。</p>'+
    '<p>(4) 直接開方法。</p>'+
    '<p>(5) 利用電算器。</p>',
    examples:[
      { q:'用標準分解式求 $\\sqrt{144}$。',
        steps:['$144=2^4\\times 3^2$。','$\\sqrt{144}=2^2\\times 3=12$。'],
        ans:'$12$' },
      { q:'用十分逼近法估 $\\sqrt{7}$ 到小數第一位。',
        steps:['$2^2=4<7<9=3^2$ → 在 2 與 3 之間。','$2.6^2=6.76<7<7.29=2.7^2$。','$\\sqrt{7}\\approx 2.6$（介於 2.6 與 2.7）。'],
        ans:'約 2.6' } ] },

  { id:'u29c4', title:'有理數與無理數', body:
    '<p>(1) <b class="key">有理數</b>：<b class="key">可以寫成 $\\dfrac{n}{m}$ 形式</b>，且 $(m,n)=1$。</p>'+
    '<p>(2) <b class="key">無理數</b>：<b class="key">不能表示成分數形式者</b>。</p>',
    examples:[
      { q:'$\\sqrt{2}$、$\\sqrt{9}$、$0.5$、$\\pi$ 哪些是有理數？',
        steps:['$\\sqrt{9}=3=\\dfrac{3}{1}$、$0.5=\\dfrac{1}{2}$ → 有理數。','$\\sqrt{2}$、$\\pi$ 無法寫成分數 → 無理數。'],
        ans:'$\\sqrt{9}$、$0.5$ 是有理數' } ] },

  { id:'u29c5', title:'平方根的意義', body:
    '<p>(1) $a>0$，如果一個數的平方等於 $a$，這個數就稱為 $a$ 的<b class="key">平方根</b>（又稱為二次方根）。</p>'+
    '<p>(2) $\\sqrt{a}$ 表示正數 $a$ 的<b class="key">正平方根</b>。</p>'+
    '<p>(3) $-\\sqrt{a}$ 表示正數 $a$ 的<b class="key">負平方根</b>。</p>'+
    '<div class="inline-ex">例：2 的平方根為 $\\pm\\sqrt{2}$，且 $(\\pm\\sqrt{2})^2=2$，其中 $\\sqrt{2}$ 為正平方根，$-\\sqrt{2}$ 為負平方根。</div>'+
    '<p>整理：① 若 <b class="key">$a>0$</b>，則 $a$ 的平方根為 <b class="key">$\\pm\\sqrt{a}$</b>；② 對於每個正數 $a$，$(\\pm\\sqrt{a})^2=<b class="key">a</b>$；③ 若 <b class="key">$a=0$</b>，則 $a$ 的平方根為 <b class="key">0</b>，即 $\\sqrt{0}=0$；④ 若 <b class="key">$a<0$</b>，則 $a$ <b class="key">沒有平方根</b>。</p>',
    examples:[
      { q:'求 36 的平方根與 $\\sqrt{36}$，兩者一樣嗎？',
        steps:['36 的平方根：平方等於 36 的數 → $\\pm 6$（兩個）。','$\\sqrt{36}$ 只表示正平方根 → $6$。'],
        ans:'平方根 $\\pm 6$；$\\sqrt{36}=6$，不一樣' },
      { q:'$-9$ 有平方根嗎？為什麼？',
        steps:['任何數的平方都 $\\ge 0$，不可能等於 $-9$。','$a<0$ 沒有平方根。'],
        ans:'沒有' } ] }
]},

{ id:'u30', book:3, sec:'2-2', title:'根式的運算', page:46, concepts:[
  { id:'u30c1', title:'根式的表示', body:
    '<p>若 $a\\neq 0$、$b\\ge 0$，則 $a\\times\\sqrt{b}$ 寫成 <b class="key">$a\\sqrt{b}$</b>；$\\sqrt{b}\\div a$ 寫成 <b class="key">$\\dfrac{\\sqrt{b}}{a}$</b> 或 <b class="key">$\\dfrac{1}{a}\\sqrt{b}$</b>。</p>'+
    '<div class="inline-ex">例：$5\\times\\sqrt{3}=5\\sqrt{3}$；$\\sqrt{7}\\div 2=\\dfrac{\\sqrt{7}}{2}=\\dfrac{1}{2}\\sqrt{7}$。</div>',
    examples:[
      { q:'把 $\\sqrt{5}\\times(-3)$ 與 $\\sqrt{11}\\div 4$ 用簡記寫出。',
        steps:['$-3\\sqrt{5}$。','$\\dfrac{\\sqrt{11}}{4}$（或 $\\dfrac{1}{4}\\sqrt{11}$）。'],
        ans:'$-3\\sqrt{5}$；$\\dfrac{\\sqrt{11}}{4}$' } ] },

  { id:'u30c2', title:'根式的乘法運算', body:
    '<p>若 $a\\ge 0$、$b\\ge 0$，則 <b class="key">$\\sqrt{a}\\times\\sqrt{b}=\\sqrt{a\\times b}$</b>。</p>'+
    '<div class="inline-ex">例：$\\sqrt{2}\\times\\sqrt{5}=\\sqrt{2\\times 5}=\\sqrt{10}$。</div>',
    examples:[
      { q:'計算 $\\sqrt{3}\\times\\sqrt{12}$。',
        steps:['$=\\sqrt{3\\times 12}=\\sqrt{36}$。','$=6$。'],
        ans:'$6$' },
      { q:'計算 $2\\sqrt{5}\\times 3\\sqrt{10}$。',
        steps:['數字乘數字、根式乘根式：$6\\sqrt{50}$。','$\\sqrt{50}=\\sqrt{25\\times 2}=5\\sqrt{2}$ → $6\\times 5\\sqrt{2}=30\\sqrt{2}$。'],
        ans:'$30\\sqrt{2}$' } ] },

  { id:'u30c3', title:'根式的除法運算', body:
    '<p>若 $a\\ge 0$、$b>0$，則 <b class="key">$\\dfrac{\\sqrt{a}}{\\sqrt{b}}=\\sqrt{\\dfrac{a}{b}}$</b>；$\\sqrt{a}\\div\\sqrt{b}=\\sqrt{\\dfrac{a}{b}}$。</p>'+
    '<div class="inline-ex">例：$\\dfrac{\\sqrt{2}}{\\sqrt{5}}=\\sqrt{\\dfrac{2}{5}}$；$\\sqrt{35}\\div\\sqrt{5}=\\sqrt{\\dfrac{35}{5}}=\\sqrt{7}$。</div>',
    examples:[
      { q:'計算 $\\sqrt{48}\\div\\sqrt{3}$。',
        steps:['$=\\sqrt{48\\div 3}=\\sqrt{16}$。','$=4$。'],
        ans:'$4$' } ] },

  { id:'u30c4', title:'最簡根式', body:
    '<p>一個數 $a\\sqrt{b}$，其中 $a$ 為整數、分數或小數，$b$ 為正整數，且 $b$ 的標準分解式中<b class="key">質因數的次數都是 1</b>，我們稱 $a\\sqrt{b}$ 為<b class="key">最簡根式</b>。</p>'+
    '<div class="inline-ex">例：$3\\sqrt{2}$、$-7\\sqrt{3}$、$\\dfrac{1}{2}\\sqrt{6}$ 都是最簡根式。</div>',
    examples:[
      { q:'把 $\\sqrt{72}$ 化成最簡根式。',
        steps:['$72=2^3\\times 3^2=36\\times 2$。','$\\sqrt{72}=\\sqrt{36}\\times\\sqrt{2}=6\\sqrt{2}$。'],
        ans:'$6\\sqrt{2}$' } ] },

  { id:'u30c5', title:'分母有理化', body:
    '<p>將分母化為<b class="key">不帶有根式</b>的過程，稱為<b class="key">分母有理化</b>。</p>'+
    '<p>(1) 分母為單一根號：分子分母同乘該根號。</p>'+
    '<div class="inline-ex">例：$\\dfrac{1}{\\sqrt{5}}=\\dfrac{1}{\\sqrt{5}\\times\\sqrt{5}}\\times\\sqrt{5}=\\dfrac{\\sqrt{5}}{(\\sqrt{5})^2}=\\dfrac{\\sqrt{5}}{5}$。</div>'+
    '<p>(2) 乘以<b class="key">共軛根式</b>：利用平方差公式消根號。</p>'+
    '<div class="inline-ex">例：$\\dfrac{1}{\\sqrt{5}-\\sqrt{3}}=\\dfrac{\\sqrt{5}+\\sqrt{3}}{(\\sqrt{5}-\\sqrt{3})(\\sqrt{5}+\\sqrt{3})}=\\dfrac{\\sqrt{5}+\\sqrt{3}}{(\\sqrt{5})^2-(\\sqrt{3})^2}=\\dfrac{\\sqrt{5}+\\sqrt{3}}{2}$。</div>',
    examples:[
      { q:'將 $\\dfrac{6}{\\sqrt{3}}$ 分母有理化。',
        steps:['分子分母同乘 $\\sqrt{3}$：$\\dfrac{6\\sqrt{3}}{3}$。','$=2\\sqrt{3}$。'],
        ans:'$2\\sqrt{3}$' },
      { q:'將 $\\dfrac{2}{\\sqrt{7}+\\sqrt{5}}$ 分母有理化。',
        steps:['同乘共軛 $\\sqrt{7}-\\sqrt{5}$：$\\dfrac{2(\\sqrt{7}-\\sqrt{5})}{7-5}$。','$=\\dfrac{2(\\sqrt{7}-\\sqrt{5})}{2}=\\sqrt{7}-\\sqrt{5}$。'],
        ans:'$\\sqrt{7}-\\sqrt{5}$' } ] },

  { id:'u30c6', title:'根式的加減運算（同類方根）', body:
    '<p>根式的加減運算是將<b class="key">同類方根</b>合併，不同類則<b class="key">不能加減運算</b>。</p>'+
    '<div class="inline-ex">例：$2\\sqrt{3}+4\\sqrt{6}+3\\sqrt{3}-3\\sqrt{6}=(2\\sqrt{3}+3\\sqrt{3})+(4\\sqrt{6}-3\\sqrt{6})=5\\sqrt{3}+\\sqrt{6}$。</div>',
    examples:[
      { q:'計算 $\\sqrt{8}+\\sqrt{18}$。',
        steps:['先化最簡根式：$\\sqrt{8}=2\\sqrt{2}$、$\\sqrt{18}=3\\sqrt{2}$。','同類方根合併：$5\\sqrt{2}$。'],
        ans:'$5\\sqrt{2}$' },
      { q:'計算 $3\\sqrt{5}-\\sqrt{20}+\\sqrt{12}$。',
        steps:['$\\sqrt{20}=2\\sqrt{5}$、$\\sqrt{12}=2\\sqrt{3}$。','$3\\sqrt{5}-2\\sqrt{5}=\\sqrt{5}$；$2\\sqrt{3}$ 不同類不能併。'],
        ans:'$\\sqrt{5}+2\\sqrt{3}$' } ] }
]},

{ id:'u31', book:3, sec:'2-3', title:'畢氏定理', page:47, concepts:[
  { id:'u31c1', title:'畢氏定理', body:
    '<p>1. 畢氏定理：任意直角三角形，其<b class="key">兩股平方和</b>等於<b class="key">斜邊平方</b>。</p>'+
    '<div class="inline-ex">例：直角三角形 $ABC$ 中，$a^2+b^2=c^2$（$c$ 為斜邊）。</div>'+
    '<p>註：常見的直角三角形三邊長 $a$、$b$、$c$ 分別有 <b class="key">3、4、5</b>；<b class="key">6、8、10</b>；<b class="key">5、12、13</b>；<b class="key">7、24、25</b>；<b class="key">8、15、17</b>；<b class="key">9、40、41</b>；<b class="key">20、21、29</b>。</p>'+
    '<p>2. 已知一個直角三角形兩邊的長度，可利用畢氏定理求出<b class="key">第三邊</b>的長度。</p>'+
    '<div class="inline-ex">例：某一直角三角形的兩股長為 3、5，則斜邊長 $=\\sqrt{3^2+5^2}=\\sqrt{34}$。</div>',
    fig:'u31-pyth',
    examples:[
      { q:'直角三角形兩股 9、12，求斜邊。',
        steps:['$\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}$。','$=15$（3:4:5 的 3 倍）。'],
        ans:'$15$' },
      { q:'直角三角形斜邊 13、一股 5，求另一股。',
        steps:['另一股 $=\\sqrt{13^2-5^2}=\\sqrt{169-25}=\\sqrt{144}$。','$=12$。'],
        ans:'$12$' } ] },

  { id:'u31c2', title:'畢氏定理的證明', body:
    '<p>1. 大正方形＝三角形×4＋小正方形：$(a+b)^2=\\dfrac{a\\times b}{2}\\times 4+c^2$ → $a^2+2ab+b^2=2ab+c^2$ → <b class="key">$a^2+b^2=c^2$</b>。</p>'+
    '<p>2. 趙爽的證明法（<b class="key">弦圖</b>）：大正方形＝三角形×4＋小正方形：$c^2=\\dfrac{a\\times b}{2}\\times 4+(a-b)^2=2ab+(a^2-2ab+b^2)$ → $c^2=a^2+b^2$。</p>'+
    '<p>3. 美國第 20 任總統（詹姆士·加菲爾德）：梯形＝直角三角形×2＋等腰直角三角形：$\\dfrac{(a+b)(a+b)}{2}=\\dfrac{a\\times b}{2}\\times 2+\\dfrac{c\\times c}{2}$ → $(a+b)^2=2ab+c^2$ → $a^2+b^2=c^2$。</p>',
    examples:[
      { q:'用「大正方形＝4 個直角三角形＋小正方形」的圖，說明為什麼 $a^2+b^2=c^2$。',
        steps:['邊長 $(a+b)$ 的大正方形面積 $=(a+b)^2=a^2+2ab+b^2$。','它由 4 個直角三角形（共 $4\\times\\dfrac{ab}{2}=2ab$）和中間邊長 $c$ 的正方形（$c^2$）組成。','$a^2+2ab+b^2=2ab+c^2$ → 消去 $2ab$ 得 $a^2+b^2=c^2$。'],
        ans:'兩種算面積方式相等，消去 $2ab$ 即得' } ] },

  { id:'u31c3', title:'直角三角形斜邊上的高', body:
    '<p>直角三角形斜邊上的高 $=$ <b class="key">$\\dfrac{兩股乘積}{斜邊}$</b>，即 $h=\\dfrac{a\\times b}{c}$。</p>'+
    '<div class="inline-ex">例：兩股 5、12、斜邊 13 的直角三角形，面積 $=\\dfrac{5\\times 12}{2}=\\dfrac{13\\times h}{2}$ → $h=\\dfrac{5\\times 12}{13}=\\dfrac{60}{13}$。</div>',
    examples:[
      { q:'直角三角形兩股 6、8，求斜邊上的高。',
        steps:['斜邊 $=\\sqrt{6^2+8^2}=10$。','$h=\\dfrac{6\\times 8}{10}=\\dfrac{48}{10}=4.8$。'],
        ans:'$4.8$' } ] },

  { id:'u31c4', title:'兩點距離', body:
    '<p>坐標平面上兩點 $A(x_1,y_1)$、$B(x_2,y_2)$ 的距離為 <b class="key">$\\overline{AB}=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$</b>。</p>'+
    '<p>證明：作水平線與鉛直線得直角三角形，$\\overline{AC}=x_2-x_1$、$\\overline{BC}=y_2-y_1$，由 $\\overline{AB}^2=\\overline{BC}^2+\\overline{AC}^2$ 得 $\\overline{AB}=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$。</p>',
    examples:[
      { q:'求 $A(1,2)$、$B(4,6)$ 的距離。',
        steps:['$\\overline{AB}=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}$。','$=\\sqrt{25}=5$。'],
        ans:'$5$' },
      { q:'求 $P(-2,3)$、$Q(3,-9)$ 的距離。',
        steps:['$\\sqrt{(3-(-2))^2+(-9-3)^2}=\\sqrt{25+144}$。','$=\\sqrt{169}=13$。'],
        ans:'$13$' } ] }
]},

{ id:'u32', book:3, sec:'3-1', title:'提公因式因式分解', page:49, concepts:[
  { id:'u32c1', title:'因式與倍式', body:
    '<p>因式：<b class="key">可以「整除」別人的式子</b>；倍式：<b class="key">可以「被整除」的式子</b>；整除：<b class="key">餘式 $=0$</b>。</p>'+
    '<p>$A$、$B$、$C$ 皆為非零多項式，若 <b class="key">$A=B\\times C$</b>，則稱 $B$ 與 $C$ 是 $A$ 的<b class="key">因式</b>，$A$ 是 $B$ 與 $C$ 的<b class="key">倍式</b>。</p>'+
    '<div class="inline-ex">例：$(x^2-5x+4)\\div(x-4)=x-1$，也可以寫成 $x^2-5x+4=(x-4)(x-1)$，所以 $x-4$ 和 $x-1$ 是 $x^2-5x+4$ 的<b class="key">因式</b>，而 $x^2-5x+4$ 是 $x-4$ 和 $x-1$ 的<b class="key">倍式</b>。</div>',
    examples:[
      { q:'$x+3$ 是 $x^2+x-6$ 的因式嗎？',
        steps:['$x^2+x-6=(x+3)(x-2)$，餘式 0。','能整除 → 是因式。'],
        ans:'是（$x^2+x-6=(x+3)(x-2)$）' } ] },

  { id:'u32c2', title:'因式分解及其方法', body:
    '<p>(1) 將一個 $x$ 的二次式寫成兩個<b class="key">一次式</b>的乘積，叫做這個二次式的<b class="key">因式分解</b>。</p>'+
    '<div class="inline-ex">例：$x^2-5x+4$ 的因式分解為 $x^2-5x+4=(x-4)(x-1)$。</div>'+
    '<p>(2) 因式分解的方法：① <b class="key">除法（餘式＝0）</b>；② <b class="key">提出公因式</b>；③ <b class="key">分組提公因式</b>；④ <b class="key">乘法公式</b>；⑤ <b class="key">十字交乘法</b>；⑥ <b class="key">雙十字交乘法</b>。</p>'+
    '<p>$A\\cdot B+A\\cdot C \\;\\rightleftarrows\\; A\\cdot(B+C)$（→ 因式分解；← 乘積展開）。</p>',
    examples:[
      { q:'「$(x+1)(x+2)=x^2+3x+2$」和「$x^2+3x+2=(x+1)(x+2)$」各是什麼操作？',
        steps:['前者把乘積展開 → 乘積展開。','後者把二次式寫成一次式乘積 → 因式分解。'],
        ans:'展開；因式分解' } ] },

  { id:'u32c3', title:'公因式與提出公因式', body:
    '<p>如果多項式 $C$ 同時為多項式 $A$ 和多項式 $B$ 的因式，我們就說多項式 $C$ 為多項式 $A$ 和多項式 $B$ 的<b class="key">公因式</b>。</p>'+
    '<div class="inline-ex">例：$x+2$ 是 $(x+2)^2$ 的因式，也是 $(x+2)(x-5)$ 的因式，所以 $x+2$ 是兩者的<b class="key">公因式</b>。</div>'+
    '<p><b class="key">提出公因式</b>：因式分解時，如果式子的各項都有一次以上的公因式，可以將<b class="key">公因式</b>提出來，完成因式分解。</p>'+
    '<div class="inline-ex">例(1)：$-5x^2+3x=(-5x+3)x$。<br>例(2)：$(x+2)^2+(x+2)(x-5)=(x+2)[(x+2)+(x-5)]=(x+2)(2x-3)$。</div>',
    examples:[
      { q:'因式分解 $6x^2-9x$。',
        steps:['各項公因式 $3x$。','$6x^2-9x=3x(2x-3)$。'],
        ans:'$3x(2x-3)$' },
      { q:'因式分解 $(2x-1)(x+4)-(2x-1)(x-2)$。',
        steps:['提出公因式 $(2x-1)$：$(2x-1)[(x+4)-(x-2)]$。','中括號內 $=6$。'],
        ans:'$6(2x-1)$' } ] },

  { id:'u32c4', title:'分組提公因式分解', body:
    '<p>我們可以利用<b class="key">分組提出公因式</b>的方法做因式分解。</p>'+
    '<div class="inline-ex">例：$x^2-4x+ax-4a=(x^2-4x)+(ax-4a)$（分組）$=x(x-4)+a(x-4)$（各組提公因式）$=(x+a)(x-4)$（提出公因式）。</div>',
    examples:[
      { q:'因式分解 $xy+3x+2y+6$。',
        steps:['分組：$(xy+3x)+(2y+6)=x(y+3)+2(y+3)$。','提出 $(y+3)$：$(x+2)(y+3)$。'],
        ans:'$(x+2)(y+3)$' } ] }
]},

{ id:'u33', book:3, sec:'3-2', title:'乘法公式因式分解', page:50, concepts:[
  { id:'u33c1', title:'利用乘法公式做因式分解', body:
    '<p>可利用<b class="key">平方差</b>公式、<b class="key">和的平方</b>公式或<b class="key">差的平方</b>公式做因式分解：</p>'+
    '<p>(1) <b class="key">平方差公式</b>：$a^2-b^2=(a+b)(a-b)$。</p>'+
    '<div class="inline-ex">例：$x^2-4=x^2-2^2=(x+2)(x-2)$。</div>'+
    '<p>(2) <b class="key">和的平方公式</b>：$a^2+2ab+b^2=(a+b)^2$。</p>'+
    '<div class="inline-ex">例：$x^2+6x+9=x^2+2(x)(3)+3^2=(x+3)^2$。</div>'+
    '<p>(3) <b class="key">差的平方公式</b>：$a^2-2ab+b^2=(a-b)^2$。</p>'+
    '<div class="inline-ex">例：$x^2-8x+16=x^2-2(x)(4)+4^2=(x-4)^2$。</div>',
    examples:[
      { q:'因式分解 $9x^2-25$。',
        steps:['$=(3x)^2-5^2$。','平方差：$(3x+5)(3x-5)$。'],
        ans:'$(3x+5)(3x-5)$' },
      { q:'因式分解 $4x^2+20x+25$。',
        steps:['$=(2x)^2+2(2x)(5)+5^2$。','和的平方：$(2x+5)^2$。'],
        ans:'$(2x+5)^2$' } ] },

  { id:'u33c2', title:'綜合運用因式分解法', body:
    '<p>(1) <b class="key">先</b>提出係數的公因數，<b class="key">再</b>利用乘法公式做因式分解。</p>'+
    '<div class="inline-ex">例：$2y^2+28y+98=2(y^2+14y+49)=2(y+7)^2$。</div>'+
    '<p>(2) <b class="key">先</b>分組<b class="key">再</b>利用乘法公式。</p>'+
    '<div class="inline-ex">例：$9x^2-4y^2+6x+1=(9x^2+6x+1)-4y^2=(3x+1)^2-(2y)^2=(3x+1+2y)(3x+1-2y)$。</div>',
    examples:[
      { q:'因式分解 $3x^2-27$。',
        steps:['先提 3：$3(x^2-9)$。','平方差：$3(x+3)(x-3)$。'],
        ans:'$3(x+3)(x-3)$' },
      { q:'因式分解 $x^2+2x+1-y^2$。',
        steps:['分組：$(x^2+2x+1)-y^2=(x+1)^2-y^2$。','平方差：$(x+1+y)(x+1-y)$。'],
        ans:'$(x+1+y)(x+1-y)$' } ] }
]},

{ id:'u34', book:3, sec:'3-3', title:'十字交乘法因式分解', page:51, concepts:[
  { id:'u34c1', title:'二次多項式的係數與因式分解', body:
    '<p>若二次多項式 $x^2+px+q$ 可以因式分解成 $(x+a)(x+b)$，即 $(x+a)(x+b)=x^2+ax+bx+ab=x^2+(a+b)x+ab$。</p>'+
    '<p>把等號的兩邊互換：$x^2+(a+b)x+ab=(x+a)(x+b)$，我們就得到 $x^2+px+q$ 中 <b class="key">$p=a+b$</b>（$a$ 與 $b$ 的和）、<b class="key">$q=ab$</b>（$a$ 與 $b$ 的乘積）。</p>'+
    '<div class="inline-ex">例：$x^2+6x+8=(x+2)(x+4)$，其中 $6=2+4$、$8=2\\times 4$。</div>',
    examples:[
      { q:'找兩數，其和為 7、積為 12，並因式分解 $x^2+7x+12$。',
        steps:['積 12 的組合：1×12、2×6、3×4；和為 7 → 3 和 4。','$x^2+7x+12=(x+3)(x+4)$。'],
        ans:'$(x+3)(x+4)$' } ] },

  { id:'u34c2', title:'利用十字交乘法做因式分解', body:
    '<p>用<b class="key">十字交乘</b>將一個二次多項式化為兩個一次多項式的乘積，這種因式分解的方法稱為<b class="key">十字交乘法</b>。</p>'+
    '<p>(1) 二次項<b class="key">係數為 1</b> 的十字交乘法：$x^2+(a+b)x+ab$ 可因式分解為 $(x+a)(x+b)$。</p>'+
    '<div class="inline-ex">例：$x^2+6x+8$——直行寫 $x$、$x$，右行試 $+4$、$+2$：交叉相乘 $4x+2x=6x$ ✓，所以 $x^2+6x+8=(x+4)(x+2)$。</div>'+
    '<p>(2) 二次項<b class="key">係數不為 1</b> 的十字交乘法：$prx^2+(ps+qr)x+qs$ 可因式分解為 $(px+q)(rx+s)$。</p>'+
    '<div class="inline-ex">例：$3x^2-13x-10$——左行 $3$、$1$，右行 $+2$、$-5$：交叉 $3\\times(-5)+1\\times 2=-15+2=-13$ ✓，所以 $3x^2-13x-10=(3x+2)(x-5)$。</div>',
    examples:[
      { q:'因式分解 $x^2-2x-15$。',
        steps:['找積 $-15$、和 $-2$ 的兩數：$-5$ 和 $3$。','$(x-5)(x+3)$。'],
        ans:'$(x-5)(x+3)$' },
      { q:'因式分解 $2x^2+7x+3$。',
        steps:['左行 $2$、$1$；右行試 $+1$、$+3$。','交叉：$2\\times 3+1\\times 1=7$ ✓。'],
        ans:'$(2x+1)(x+3)$' } ] }
]},

{ id:'u35', book:3, sec:'4-1', title:'解一元二次方程式', page:52, concepts:[
  { id:'u35c1', title:'一元二次方程式', body:
    '<p>(1) <b class="key">一元</b>：<b class="key">有一種未知數</b>；(2) <b class="key">二次</b>：<b class="key">未知數最高次數 $=2$</b>；(3) <b class="key">方程式</b>：<b class="key">出現「＝」</b>。</p>'+
    '<p>一個方程式經化簡後可寫成 <b class="key">$ax^2+bx+c=0$（其中 $a\\neq 0$）</b>的形式，就稱此方程式為 $x$ 的<b class="key">一元二次方程式</b>。</p>'+
    '<div class="inline-ex">例：$x^2+5x+4=0$、$-4x^2+6x=-4$、$(3x-1)^2=(2x+3)^2$ 等都是 $x$ 的一元二次方程式。</div>'+
    '<p>已知 $A$、$B$ 為兩數：1. 若 <b class="key">$A\\times B=0$，則 $A=0$ 或 $B=0$</b>；2. 若 $|A|+|B|=0$，則 $A=0$ <b class="key">且</b> $B=0$；3. 若 $A^2+B^2=0$，則 $A=0$ 且 $B=0$；4. 若 $\\sqrt{A}+\\sqrt{B}=0$，則 $A=0$ 且 $B=0$。</p>',
    examples:[
      { q:'若 $(x-3)(x+7)=0$，$x$ 是多少？',
        steps:['乘積為 0 → 其中一個因子為 0。','$x-3=0$ 或 $x+7=0$。'],
        ans:'$x=3$ 或 $x=-7$' },
      { q:'若 $|a-2|+|b+5|=0$，求 $a$、$b$。',
        steps:['絕對值都 $\\ge 0$，和為 0 → 兩個都是 0（「且」）。','$a=2$、$b=-5$。'],
        ans:'$a=2$ 且 $b=-5$' } ] },

  { id:'u35c2', title:'一元二次方程式的解', body:
    '<p><b class="key">解</b>或<b class="key">根</b>：<b class="key">一元二次方程式的答案，使等號兩邊相等的數字</b>。</p>',
    examples:[
      { q:'驗證 $x=1$ 與 $x=2$ 是否為 $x^2-3x+2=0$ 的解。',
        steps:['$x=1$：$1-3+2=0$ ✓。','$x=2$：$4-6+2=0$ ✓。','二次方程式最多有兩個解，兩個都是。'],
        ans:'都是解' } ] },

  { id:'u35c3', title:'因式分解解一元二次方程式', body:
    '<p>一元二次方程式 $ax^2+bx+c=0$（其中 $a\\neq 0$），若 $ax^2+bx+c=A\\times B$，可利用「有兩數 $A$、$B$，若 $A\\times B=0$，則 <b class="key">$A=0$ 或 $B=0$</b>」求解。</p>'+
    '<div class="inline-ex">例：解 $x^2+5x+4=0$，可得 $(x+1)(x+4)=0$，所以 $x+1=0$ 或 $x+4=0$，即 $x=-1$ 或 $x=-4$。</div>',
    examples:[
      { q:'解 $x^2-x-12=0$。',
        steps:['十字交乘：$(x-4)(x+3)=0$。','$x=4$ 或 $x=-3$。'],
        ans:'$x=4$ 或 $x=-3$' },
      { q:'解 $3x^2=12x$。',
        steps:['移項：$3x^2-12x=0$，提公因式 $3x(x-4)=0$。','$x=0$ 或 $x=4$（注意不能兩邊直接除以 $x$，會丟掉 $x=0$ 這個解）。'],
        ans:'$x=0$ 或 $x=4$' } ] }
]},

{ id:'u36', book:3, sec:'4-2', title:'配方法與公式解', page:53, concepts:[
  { id:'u36c1', title:'利用平方根概念解一元二次方程式', body:
    '<p>$x^2=k$（$k\\ge 0$）及 $(ax+b)^2=c$（$a\\neq 0$、$c>0$）⇒ <b class="key">去平方，右邊開根號加 ±</b>。</p>'+
    '<div class="inline-ex">例(1)：$x^2=25$ → $x=\\pm\\sqrt{25}=\\pm 5$。<br>例(2)：$(2x+3)^2=8$ → $2x+3=\\pm\\sqrt{8}$ → $2x=-3\\pm\\sqrt{8}$ → $x=\\dfrac{-3\\pm 2\\sqrt{2}}{2}$。</div>',
    examples:[
      { q:'解 $(x-5)^2=36$。',
        steps:['去平方加 ±：$x-5=\\pm 6$。','$x=11$ 或 $x=-1$。'],
        ans:'$x=11$ 或 $x=-1$' } ] },

  { id:'u36c2', title:'將 x²+px 配成完全平方式', body:
    '<p>將形如 $x^2+px$ 的式子加上 <b class="key">$\\left(\\dfrac{p}{2}\\right)^2$</b>，可以配成完全平方式 $\\left(x+\\dfrac{p}{2}\\right)^2$。</p>'+
    '<div class="inline-ex">例：$x^2+14x+(\\underline{7})^2=(x+\\underline{7})^2$。</div>',
    examples:[
      { q:'$x^2-10x$ 要加上多少才能配成完全平方式？配完是什麼？',
        steps:['$p=-10$，加 $\\left(\\dfrac{-10}{2}\\right)^2=25$。','$x^2-10x+25=(x-5)^2$。'],
        ans:'加 25；$(x-5)^2$' } ] },

  { id:'u36c3', title:'利用配方法解一元二次方程式', body:
    '<p>利用<b class="key">配方法</b>解一元二次方程式的<b class="key">步驟</b>如下：</p>'+
    '<p>(1) 利用等量公理使 $x^2$ 項的係數變為 <b class="key">1</b>。</p>'+
    '<p>(2) <b class="key">常數項</b>移到等號右邊，將方程式整理為 $x^2+Bx=C$ 的形式。</p>'+
    '<p>(3) 等號兩邊同加 $\\left(\\dfrac{B}{2}\\right)^2$。</p>'+
    '<p>(4) 等號左邊配方成<b class="key">完全平方式</b>。</p>'+
    '<p>(5) 利用<b class="key">平方根</b>的概念解出 $x$。</p>'+
    '<div class="inline-ex">例：$3x^2+6x-6=0$ → ① $x^2+2x-2=0$ → ② $x^2+2x=2$ → ③ $x^2+2x+\\left(\\dfrac{2}{2}\\right)^2=2+\\left(\\dfrac{2}{2}\\right)^2$ → ④ $(x+1)^2=3$ → ⑤ $x+1=\\pm\\sqrt{3}$，$x=-1\\pm\\sqrt{3}$。</div>',
    examples:[
      { q:'用配方法解 $x^2-6x+2=0$。',
        steps:['移常數：$x^2-6x=-2$。','兩邊加 $9$：$x^2-6x+9=7$。','$(x-3)^2=7$ → $x-3=\\pm\\sqrt{7}$。'],
        ans:'$x=3\\pm\\sqrt{7}$' } ] },

  { id:'u36c4', title:'一元二次方程式的公式解', body:
    '<p>當 $a\\neq 0$ 且 $b^2-4ac\\ge 0$，一元二次方程式 $ax^2+bx+c=0$ 的<b class="key">公式解</b>為</p>'+
    '<p>$$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$</p>'+
    '<p>（證明：把 $ax^2+bx+c=0$ 兩邊除以 $a$ 後配方即得。）</p>',
    examples:[
      { q:'用公式解 $2x^2+3x-2=0$。',
        steps:['$a=2$、$b=3$、$c=-2$：$b^2-4ac=9+16=25$。','$x=\\dfrac{-3\\pm 5}{4}$。','$x=\\dfrac{1}{2}$ 或 $x=-2$。'],
        ans:'$x=\\dfrac{1}{2}$ 或 $x=-2$' } ] },

  { id:'u36c5', title:'判別式與方程式的解', body:
    '<p>一元二次方程式 $ax^2+bx+c=0$（$a\\neq 0$）的<b class="key">判別式</b> $D=b^2-4ac$ 與方程式的解：</p>'+
    '<p>(1) 當 $b^2-4ac>0$ 時，方程式有<b class="key">兩相異實根</b>，兩根為 $x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$（<b class="key">2 解</b>）。</p>'+
    '<p>(2) 當 $b^2-4ac=0$ 時，方程式有<b class="key">兩相等實根</b>，此時稱 $x=-\\dfrac{b}{2a}$ 為<b class="key">重根</b>（<b class="key">1 解</b>）。</p>'+
    '<p>(3) 當 $b^2-4ac<0$ 時，方程式<b class="key">無實根</b>（<b class="key">無解</b>）。</p>',
    examples:[
      { q:'不解方程式，判斷 $x^2+4x+5=0$ 與 $x^2+4x+4=0$ 各有幾個解。',
        steps:['前者：$D=16-20=-4<0$ → 無實根。','後者：$D=16-16=0$ → 重根（1 解，$x=-2$）。'],
        ans:'無解；1 解（重根）' },
      { q:'$x^2+6x+k=0$ 有重根，求 $k$。',
        steps:['重根 → $D=36-4k=0$。','$k=9$。'],
        ans:'$k=9$' } ] },

  { id:'u36c6', title:'根與係數的關係', body:
    '<p>一元二次方程式 $ax^2+bx+c=0$（$a\\neq 0$）的兩根為 $\\alpha$、$\\beta$，則：</p>'+
    '<p>(1) 兩根之和 <b class="key">$\\alpha+\\beta=-\\dfrac{b}{a}$</b>。</p>'+
    '<p>(2) 兩根之積 <b class="key">$\\alpha\\beta=\\dfrac{c}{a}$</b>。</p>'+
    '<p>證明：$x=\\alpha$ 或 $x=\\beta$ → $(x-\\alpha)(x-\\beta)=0$ → $x^2-(\\alpha+\\beta)x+\\alpha\\beta=0$，對照 $x^2+\\dfrac{b}{a}x+\\dfrac{c}{a}=0$ ⇒ $\\alpha+\\beta=-\\dfrac{b}{a}$、$\\alpha\\beta=\\dfrac{c}{a}$。</p>',
    examples:[
      { q:'$2x^2-8x+5=0$ 的兩根為 $\\alpha$、$\\beta$，求 $\\alpha+\\beta$ 與 $\\alpha\\beta$。',
        steps:['$\\alpha+\\beta=-\\dfrac{-8}{2}=4$。','$\\alpha\\beta=\\dfrac{5}{2}$。'],
        ans:'$4$；$\\dfrac{5}{2}$' },
      { q:'兩根之和為 3、之積為 $-10$ 的一元二次方程式（首項係數 1）是什麼？其根為何？',
        steps:['$x^2-(和)x+(積)=0$ → $x^2-3x-10=0$。','因式分解 $(x-5)(x+2)=0$ → $x=5$ 或 $-2$。'],
        ans:'$x^2-3x-10=0$；根 5、$-2$' } ] }
]},

{ id:'u37', book:4, sec:'1-1', title:'等差數列', page:55, concepts:[
  { id:'u37c1', title:'複習：循環小數', body:
    '<p>1、分數 ⇒ 化成<b class="key">循環小數</b>：</p>'+
    '<div class="inline-ex">例：$\\dfrac{1}{3}=0.3333\\ldots=0.\\overline{3}$；$\\dfrac{7}{11}=0.636363\\ldots=0.\\overline{63}$；$\\dfrac{11}{90}=0.12222\\ldots=0.1\\overline{2}$。</div>'+
    '<p>2、循環小數 ⇒ 化成<b class="key">分數</b>：</p>'+
    '<div class="inline-ex">例：$0.\\overline{2}=\\dfrac{2}{9}$；$0.\\overline{54}=\\dfrac{54}{99}$；$0.\\overline{123}=\\dfrac{123}{999}$；$0.1\\overline{23}=\\dfrac{123-1}{990}$。</div>',
    examples:[
      { q:'把 $0.\\overline{45}$ 化成最簡分數。',
        steps:['兩位循環：$\\dfrac{45}{99}$。','約分（同除 9）：$\\dfrac{5}{11}$。'],
        ans:'$\\dfrac{5}{11}$' } ] },

  { id:'u37c2', title:'數列與其分類', body:
    '<p><b class="key">數列</b>：<b class="key">數字排成一列</b>。第 1、2、3、4 項以符號 $a_1$、$a_2$、$a_3$、$a_4$ 表示。</p>'+
    '<div class="inline-ex">例：自然數 1,2,3,4；偶數 2,4,6,8；奇數 1,3,5,7；亂數 5,−1,−2,4。</div>'+
    '<p>數列可分為 1.<b class="key">無規則數列</b> 2.<b class="key">有規則數列</b>。有規則性的數列包括：</p>'+
    '<p>1、特殊規則數列；2、圖形數列；3、<b class="key">等差數列</b>：（後項）−（前項）＝<b class="key">定數</b>；4、<b class="key">等比數列</b>：（後項）÷（前項）＝<b class="key">定數</b>；5、調和數列：<b class="key">倒數後成 AP</b>；6、費氏數列：<b class="key">1、1、2、3、5、8⋯</b>；7、遞迴數列：<b class="key">後項與前幾項相關</b>。</p>',
    examples:[
      { q:'數列 3, 6, 12, 24⋯ 和 2, 5, 8, 11⋯ 各是哪種數列？',
        steps:['前者後項÷前項＝2 固定 → 等比數列。','後者後項−前項＝3 固定 → 等差數列。'],
        ans:'等比；等差' } ] },

  { id:'u37c3', title:'等差數列與公差', body:
    '<p><b class="key">等差數列</b>：數列中，任意相連兩項，後項減前項的<b class="key">差均固定</b>。<b class="key">公差</b>：（後項）減（前項）＝（公差）。</p>'+
    '<p>1. 一個數列 $a_1,a_2,\\ldots,a_n$，若 $a_2-a_1=a_3-a_2=\\cdots=a_n-a_{n-1}=d$，則此數列是<b class="key">公差為 $d$</b> 的等差數列。</p>'+
    '<p>2. 等差數列中，任意相鄰兩項的差都等於<b class="key">公差</b>，故：</p>'+
    '<p>(1) <b class="key">公差＝後項－前項</b>，即 $d=a_n-a_{n-1}$。</p>'+
    '<p>(2) <b class="key">後項＝前項＋公差</b>，即 $a_n=a_{n-1}+d$。</p>'+
    '<p>(3) 前項＝後項－公差，即 $a_{n-1}=a_n-d$。</p>',
    examples:[
      { q:'等差數列 7, 4, 1, ⋯ 的公差是多少？第 4 項是多少？',
        steps:['$d=4-7=-3$。','$a_4=1+(-3)=-2$。'],
        ans:'$d=-3$；$a_4=-2$' } ] },

  { id:'u37c4', title:'等差數列的一般項公式', body:
    '<p>符號：首項 $a_1$、末項（第 $n$ 項）$a_n$、項數 $n$、公差 $d$。</p>'+
    '<div class="inline-ex">例：等差數列（A.P.）1、3、5、7、9、11：$a_1=1$、$d=2$；$a_2=a_1+d=3$；$a_3=a_1+2d=5$；$a_4=a_1+3d=7$；$a_5=a_1+(5-1)d=9$。</div>'+
    '<p>公式：<b class="key">$a_n=a_1+(n-1)\\times d$</b>，即<b class="key">末項＝首項＋（項數－1）×公差</b>——不用背，但不能忘記！</p>',
    examples:[
      { q:'等差數列首項 5、公差 4，求第 20 項。',
        steps:['$a_{20}=5+(20-1)\\times 4$。','$=5+76=81$。'],
        ans:'$81$' },
      { q:'等差數列 2, 9, 16, ⋯ 中，93 是第幾項？',
        steps:['$d=7$：$93=2+(n-1)\\times 7$。','$(n-1)=13$ → $n=14$。'],
        ans:'第 14 項' } ] },

  { id:'u37c5', title:'等差中項', body:
    '<p><b class="key">等差中項</b>：<b class="key">等差數列位於正中間的項</b>。</p>'+
    '<p>若 $a$、$b$、$c$ 三數成等差數列（A.P.），則公差 $d=<b class="key">b-a</b>=<b class="key">c-b</b>$ ⇒ <b class="key">$2b=a+c$</b> 或 <b class="key">$b=\\dfrac{a+c}{2}$</b>。</p>'+
    '<p>推廣：$a_{10}$ 是 $a_9$ 和 $a_{11}$ 的等差中項，也是 $a_3$ 和 $a_{17}$、$a_2$ 和 $a_{18}$、$a_1$ 和 $a_{19}$ 的等差中項（前後對稱的兩項）。</p>',
    examples:[
      { q:'若 $4$、$x$、$16$ 成等差數列，求 $x$。',
        steps:['等差中項：$x=\\dfrac{4+16}{2}$。','$=10$。'],
        ans:'$x=10$' },
      { q:'等差數列中 $a_5=12$、$a_9=28$，求 $a_7$。',
        steps:['$a_7$ 是 $a_5$、$a_9$ 的等差中項。','$a_7=\\dfrac{12+28}{2}=20$。'],
        ans:'$20$' } ] }
]},

{ id:'u38', book:4, sec:'1-2', title:'等差級數', page:57, concepts:[
  { id:'u38c1', title:'級數與等差級數', body:
    '<p>1. <b class="key">級數</b>：<b class="key">將數列中的各項相加起來</b>。</p>'+
    '<p>2. <b class="key">等差級數</b>：<b class="key">將等差數列中的各項加起來</b>。符號：$S_n=a_1+a_2+\\cdots+a_n$。公式：$S_n=\\dfrac{(a_1+a_n)\\times n}{2}$。</p>'+
    '<p>數學家高斯（Carl Friedrich Gauss, 1777～1855）10 歲時解出「$1+2+3+\\cdots+99+100=?$」：正著寫一遍、倒著寫一遍相加，$2S=\\underbrace{101+101+\\cdots+101}_{100 個}$，$S=\\dfrac{101\\times 100}{2}=5050$。</p>',
    examples:[
      { q:'仿高斯法求 $1+2+\\cdots+50$。',
        steps:['首末配對：$1+50=51$，共 $\\dfrac{50}{2}=25$ 對。','$51\\times 25=1275$。'],
        ans:'$1275$' } ] },

  { id:'u38c2', title:'等差級數前 n 項的和', body:
    '<p>一個等差級數從第 1 項加到第 $n$ 項的和，稱為此等差級數<b class="key">前 $n$ 項的和</b>，以 $S_n$ 表示，即 $S_n=<b class="key">a_1+a_2+\\cdots+a_n</b>$。</p>'+
    '<div class="inline-ex">例：等差級數 $3+6+9+12+15+18$ 中，$S_1=3$；$S_2=3+6$；$S_3=3+6+9$；⋯；$S_6=3+6+9+12+15+18$。</div>',
    examples:[
      { q:'上例中 $S_4$ 是多少？',
        steps:['$S_4=3+6+9+12$。','$=30$。'],
        ans:'$30$' } ] },

  { id:'u38c3', title:'等差級數前 n 項和的公式', body:
    '<p>若等差級數的和 $S_n=a_1+a_2+\\cdots+a_n$，公差為 $d$，則：</p>'+
    '<p>【公式(一)】等差級數的和 $=\\dfrac{項數\\times(首項＋末項)}{2}$，即 <b class="key">$S_n=\\dfrac{n(a_1+a_n)}{2}$</b>。</p>'+
    '<p>【公式(二)】<b class="key">$S_n=\\dfrac{n[2a_1+(n-1)d]}{2}$</b>（把 $a_n=a_1+(n-1)d$ 代入公式一）。</p>'+
    '<p>【公式(三)】<b class="key">$S_n=$（等差中項）$\\times n$</b>。</p>',
    examples:[
      { q:'求等差級數 $5+8+11+\\cdots$ 前 20 項的和。',
        steps:['$a_1=5$、$d=3$：公式(二) $S_{20}=\\dfrac{20[2\\times 5+19\\times 3]}{2}$。','$=10\\times(10+57)=670$。'],
        ans:'$670$' },
      { q:'等差級數 $2+5+8+\\cdots+59$ 共幾項？和是多少？',
        steps:['$59=2+(n-1)\\times 3$ → $n=20$。','$S_{20}=\\dfrac{20(2+59)}{2}=610$。'],
        ans:'20 項；和 610' } ] }
]},

{ id:'u39', book:4, sec:'2-1', title:'生活中的平面圖形', page:58, concepts:[
  { id:'u39c1', title:'點、線', body:
    '<p><b class="key">點</b>：<b class="key">表示位置、不占空間、沒有大小</b>。</p>'+
    '<p><b class="key">線</b>：<b class="key">點連續移動所經的路線、沒有粗細</b>。分為 1、<b class="key">曲線</b>；2、<b class="key">直線</b>。</p>'+
    '<p>(1) 直線 AB：$\\overleftrightarrow{AB}$。註：<b class="key">兩點</b>決定一條直線。</p>'+
    '<p>(2) 線段 AB：$\\overline{AB}$。</p>'+
    '<p>(3) 射線 AB：$\\overrightarrow{AB}$（與 $\\overrightarrow{BA}$ 不同）。</p>',
    examples:[
      { q:'$\\overrightarrow{AB}$ 和 $\\overrightarrow{BA}$ 一樣嗎？$\\overline{AB}$ 和 $\\overline{BA}$ 呢？',
        steps:['射線有起點和方向：$\\overrightarrow{AB}$ 從 A 出發、$\\overrightarrow{BA}$ 從 B 出發 → 不同。','線段只是 A、B 之間的部分，沒有方向 → 相同。'],
        ans:'射線不同；線段相同' } ] },

  { id:'u39c2', title:'角及其分類', body:
    '<p><b class="key">角</b>：以「∠」表示角的符號，記作「$\\angle ABC$」（或 $\\angle CBA$），讀作「角 $ABC$」（或角 $CBA$），頂點寫中間。</p>'+
    '<p>根據角的度數，可以分類如下：</p>'+
    '<p>(1) 銳角：<b class="key">$<90^\\circ$</b>；(2) 直角：<b class="key">$=90^\\circ$</b>；(3) 鈍角：<b class="key">$>90^\\circ$</b>；(4) 平角：<b class="key">$=180^\\circ$</b>；(5) 周角：<b class="key">$=360^\\circ$</b>。</p>',
    examples:[
      { q:'$35^\\circ$、$90^\\circ$、$120^\\circ$、$180^\\circ$ 各屬哪類角？',
        steps:['$35^\\circ<90^\\circ$ 銳角；$90^\\circ$ 直角。','$120^\\circ$ 鈍角；$180^\\circ$ 平角。'],
        ans:'銳角／直角／鈍角／平角' } ] },

  { id:'u39c3', title:'餘角與補角', body:
    '<p><b class="key">餘角</b>：若 $\\angle 1+\\angle 2=90^\\circ$，則稱 $\\angle 1$ 是 $\\angle 2$ 的<b class="key">餘角</b>，且 $\\angle 2$ 是 $\\angle 1$ 的<b class="key">餘角</b>；$\\angle 1$、$\\angle 2$ 互為餘角，簡稱<b class="key">互餘</b>。</p>'+
    '<p><b class="key">補角</b>：若 $\\angle 1+\\angle 2=180^\\circ$，則稱 $\\angle 1$ 是 $\\angle 2$ 的<b class="key">補角</b>，且 $\\angle 2$ 是 $\\angle 1$ 的<b class="key">補角</b>；$\\angle 1$、$\\angle 2$ 互為補角，簡稱<b class="key">互補</b>。</p>',
    examples:[
      { q:'$52^\\circ$ 的餘角和補角各是多少？',
        steps:['餘角：$90^\\circ-52^\\circ=38^\\circ$。','補角：$180^\\circ-52^\\circ=128^\\circ$。'],
        ans:'餘角 $38^\\circ$；補角 $128^\\circ$' },
      { q:'某角的補角是它餘角的 3 倍，求這個角。',
        steps:['設角 $x$：$180-x=3(90-x)$。','$180-x=270-3x$ → $2x=90$ → $x=45^\\circ$。'],
        ans:'$45^\\circ$' } ] },

  { id:'u39c4', title:'對頂角', body:
    '<p><b class="key">對頂角</b>：<b class="key">對頂角相等</b>。兩直線相交時，$\\angle 1$ 和 $\\angle 3$ 互為對頂角且 $\\angle 2$ 和 $\\angle 4$ 互為對頂角：$\\angle 1=\\angle 3$、$\\angle 2=\\angle 4$。</p>',
    examples:[
      { q:'兩直線相交，其中一角為 $70^\\circ$，求其餘三個角。',
        steps:['對頂角相等 → 對面也是 $70^\\circ$。','相鄰角互補：$180^\\circ-70^\\circ=110^\\circ$，其對頂角也是 $110^\\circ$。'],
        ans:'$70^\\circ$、$110^\\circ$、$110^\\circ$' } ] },

  { id:'u39c5', title:'多邊形：凸、凹與對角線', body:
    '<p>(1) <b class="key">凸多邊形</b>：<b class="key">將任一邊延長，其他各邊都在此延長線同一側</b>；或：<b class="key">所有對角線都在多邊形內部</b>。</p>'+
    '<p>(2) <b class="key">凹多邊形</b>：將任一邊延長，<b class="key">不是</b>所有其他各邊都在此延長線同一側；或：<b class="key">不是所有對角線都完全在多邊形內部</b>。</p>'+
    '<p><b class="key">對角線</b>：<b class="key">任兩不相鄰頂點的連線</b>（如四邊形的 $\\overline{AC}$、$\\overline{BD}$）。</p>',
    examples:[
      { q:'五邊形有幾條對角線？',
        steps:['每個頂點可連到不相鄰的 $5-3=2$ 個頂點。','$\\dfrac{5\\times 2}{2}=5$ 條（除以 2 因為每條算了兩次）。'],
        ans:'5 條' } ] },

  { id:'u39c6', title:'三角形的內角與外角', body:
    '<p>①<b class="key">內角</b>：三角形內部的角，$\\angle A$、$\\angle B$、$\\angle C$。</p>'+
    '<p>②<b class="key">外角</b>：由內角的其中一邊<b class="key">延伸出去</b>的角（每個內角有 2 個相等的外角）。</p>'+
    '<p>③<b class="key">內角和</b>：三角形內角和 <b class="key">$180^\\circ$</b>。</p>'+
    '<p>④<b class="key">外角和</b>：三角形外角和 <b class="key">$360^\\circ$</b>。</p>'+
    '<p>⑤<b class="key">外角定理</b>：三角形任一外角等於<b class="key">兩個遠內角（內對角）相加</b>。</p>'+
    '<p>⑥<b class="key">銳角三角形</b>：三內角均 $<90^\\circ$；⑦<b class="key">鈍角三角形</b>：有一內角 $>90^\\circ$；⑧<b class="key">直角三角形</b>：有一內角 $=90^\\circ$。<b class="key">勾股定理</b>：直角三角形中，任意兩股平方和等於<b class="key">斜邊平方</b>，$a^2+b^2=c^2$。</p>',
    examples:[
      { q:'三角形兩內角為 $65^\\circ$、$48^\\circ$，求第三個內角與 $65^\\circ$ 角的外角。',
        steps:['內角和 180°：第三角 $=180-65-48=67^\\circ$。','外角 $=180-65=115^\\circ$（也等於遠內角和 $48+67=115$ ✓）。'],
        ans:'$67^\\circ$；外角 $115^\\circ$' },
      { q:'三角形一外角為 $130^\\circ$，其中一個遠內角為 $55^\\circ$，求另一個遠內角。',
        steps:['外角定理：$130=55+x$。','$x=75^\\circ$。'],
        ans:'$75^\\circ$' } ] },

  { id:'u39c7', title:'等腰三角形與正三角形', body:
    '<p>&lt;2&gt; <b class="key">等腰三角形</b>：①<b class="key">兩腰等長</b>；②<b class="key">兩底角相等</b>；③<b class="key">重要性質</b>：等腰三角形<b class="key">頂角平分線</b>必<b class="key">垂直</b>、<b class="key">平分</b>底邊。</p>'+
    '<p>&lt;3&gt; <b class="key">正三角形</b>：①三邊等長；②三角等大（各 $60^\\circ$）；③<b class="key">面積公式</b>：$\\triangle$ 面積 $=\\dfrac{\\sqrt{3}}{4}\\times a^2$，高 $=\\dfrac{\\sqrt{3}}{2}\\times a$。</p>',
    examples:[
      { q:'等腰三角形頂角 $40^\\circ$，求底角。',
        steps:['兩底角相等，設為 $x$：$40+2x=180$。','$x=70^\\circ$。'],
        ans:'$70^\\circ$' },
      { q:'邊長 6 的正三角形，高和面積各是多少？',
        steps:['高 $=\\dfrac{\\sqrt{3}}{2}\\times 6=3\\sqrt{3}$。','面積 $=\\dfrac{\\sqrt{3}}{4}\\times 36=9\\sqrt{3}$。'],
        ans:'高 $3\\sqrt{3}$；面積 $9\\sqrt{3}$' } ] },

  { id:'u39c8', title:'平行四邊形的性質', body:
    '<p>&lt;4&gt; <b class="key">平行四邊形</b>（對角線交於 $O$）：</p>'+
    '<p>① 兩雙對邊分別<b class="key">平行</b>（$\\overline{AB}\\parallel\\overline{CD}$ 且 $\\overline{AD}\\parallel\\overline{BC}$）。</p>'+
    '<p>② 兩雙對邊分別<b class="key">相等</b>（$\\overline{AB}=\\overline{CD}$ 且 $\\overline{AD}=\\overline{BC}$）。</p>'+
    '<p>③ 一雙對邊<b class="key">平行且相等</b>。</p>'+
    '<p>④ 兩組對角分別<b class="key">相等</b>（$\\angle A=\\angle C$ 且 $\\angle B=\\angle D$）。</p>'+
    '<p>⑤ 一雙對邊平行、一組對角相等。</p>'+
    '<p>⑥ <b class="key">對角線：互相平分</b>（$\\overline{OA}=\\overline{OC}$ 且 $\\overline{OB}=\\overline{OD}$）。</p>',
    fig:'u39-pgram',
    examples:[
      { q:'平行四邊形 $ABCD$ 中 $\\angle A=70^\\circ$，求其餘三個角。',
        steps:['對角相等：$\\angle C=70^\\circ$。','鄰角互補（同側內角）：$\\angle B=\\angle D=110^\\circ$。'],
        ans:'$\\angle C=70^\\circ$、$\\angle B=\\angle D=110^\\circ$' },
      { q:'平行四邊形對角線交於 $O$，$\\overline{AC}=12$、$\\overline{BD}=8$，求 $\\overline{OA}$、$\\overline{OB}$。',
        steps:['對角線互相平分。','$\\overline{OA}=6$、$\\overline{OB}=4$。'],
        ans:'$\\overline{OA}=6$；$\\overline{OB}=4$' } ] },

  { id:'u39c9', title:'特殊四邊形與正 N 邊形', body:
    '<p>&lt;5&gt; <b class="key">長方形</b>：<b class="key">4 個角都 $=90^\\circ$</b>。①對邊相等；②對角線：<b class="key">互相平分且相等</b>；③長方形為<b class="key">平行四邊形</b>的一種。</p>'+
    '<p>&lt;6&gt; <b class="key">菱形</b>：<b class="key">4 個邊都等長</b>。對角線：<b class="key">互相垂直、平分</b>。</p>'+
    '<p>&lt;7&gt; <b class="key">箏形（鳶形）</b>：<b class="key">2 雙鄰邊分別等長</b>。對角線：互相<b class="key">垂直</b>，只<b class="key">平分</b>其中一條對角線。</p>'+
    '<p>&lt;8&gt; <b class="key">正方形</b>：<b class="key">4 邊等長、4 個角 $90^\\circ$</b>。①對角線：<b class="key">互相垂直、平分且相等</b>；②正方形為<b class="key">長方形</b>、③<b class="key">菱形</b>、④<b class="key">平行四邊形</b>的一種。</p>'+
    '<p>&lt;9&gt; <b class="key">梯形</b>：只有一雙對邊<b class="key">平行</b>，另一雙對邊<b class="key">不平行</b>。對角線：<b class="key">不垂直、不平分、不等長</b>。</p>'+
    '<p>&lt;10&gt; <b class="key">等腰梯形</b>：兩腰等長的梯形。①兩腰<b class="key">相等</b>；②兩底角<b class="key">相等</b>；③對角線：<b class="key">等長</b>。</p>'+
    '<p>&lt;11&gt; <b class="key">正 N 邊形</b>：每一個內角都<b class="key">相等</b>，且每一邊都<b class="key">相等</b>。</p>',
    examples:[
      { q:'哪些四邊形的對角線互相垂直？哪些對角線等長？',
        steps:['垂直：菱形、正方形、箏形。','等長：長方形、正方形、等腰梯形。'],
        ans:'垂直：菱形／正方形／箏形；等長：長方形／正方形／等腰梯形' },
      { q:'「正方形是菱形」對嗎？「菱形是正方形」呢？',
        steps:['正方形四邊等長 → 滿足菱形定義 ✓。','菱形的角不一定 90° → 不一定是正方形。'],
        ans:'前者對；後者不一定' } ] },

  { id:'u39c10', title:'多邊形的內角與對角線性質', body:
    '<p>$N$ 邊形（$N\\ge 3$）的通式：</p>'+
    '<p>・每一頂點可以畫出 <b class="key">$N-3$</b> 條對角線；對角線總數 <b class="key">$\\dfrac{N\\times(N-3)}{2}$</b>。</p>'+
    '<p>・每一頂點對角線可將圖形分成 <b class="key">$N-2$</b> 個三角形。</p>'+
    '<p>・內角和 <b class="key">$(N-2)\\times 180^\\circ$</b>（三角形 $180^\\circ$、四邊形 $360^\\circ$、五邊形 $540^\\circ$、六邊形 $720^\\circ$）。</p>'+
    '<p>・外角和一律 <b class="key">$360^\\circ$</b>。</p>'+
    '<p>・正多邊形每一內角 <b class="key">$\\dfrac{(N-2)\\times 180^\\circ}{N}$</b>（正三角形 $60^\\circ$、正方形 $90^\\circ$、正五邊形 $108^\\circ$、正六邊形 $120^\\circ$）；每一外角 <b class="key">$\\dfrac{360^\\circ}{N}$</b>。</p>',
    examples:[
      { q:'正八邊形每個內角、每個外角各幾度？對角線共幾條？',
        steps:['外角 $=360\\div 8=45^\\circ$；內角 $=180-45=135^\\circ$。','對角線 $=\\dfrac{8\\times 5}{2}=20$ 條。'],
        ans:'內角 $135^\\circ$、外角 $45^\\circ$、對角線 20 條' },
      { q:'某正多邊形每個外角 $30^\\circ$，它是正幾邊形？內角和是多少？',
        steps:['$N=360\\div 30=12$。','內角和 $=(12-2)\\times 180=1800^\\circ$。'],
        ans:'正十二邊形；$1800^\\circ$' } ] },

  { id:'u39c11', title:'圓的基本名詞與弧長、扇形', body:
    '<p>(1) <b class="key">圓心</b>：$O$；<b class="key">半徑</b>：$\\overline{OA}$。</p>'+
    '<p>(2) <b class="key">直徑</b>：$\\overline{CD}$（過圓心的弦）；<b class="key">弦</b>：$\\overline{AB}$。</p>'+
    '<p>(3) <b class="key">優弧</b>：$\\overset{\\frown}{ACB}$（大於半圓）；<b class="key">劣弧</b>：$\\overset{\\frown}{ADB}$（小於半圓）。</p>'+
    '<p>(4) <b class="key">弓形</b>：弦與弧圍成；<b class="key">扇形</b>：兩半徑與弧圍成（$AOB$）。</p>'+
    '<p>(5) <b class="key">圓心角</b>：<b class="key">頂點在圓心上的角</b>。</p>'+
    '<p>(6) <b class="key">弧長＝圓周長 $\\times\\dfrac{x}{360}$</b>（$x$ 為圓心角度數）。</p>'+
    '<p>(7) <b class="key">扇形面積＝圓面積 $\\times\\dfrac{x}{360}$</b>。</p>',
    examples:[
      { q:'半徑 6、圓心角 $60^\\circ$ 的扇形，求弧長與面積（圓周率用 $\\pi$）。',
        steps:['弧長 $=2\\pi\\times 6\\times\\dfrac{60}{360}=2\\pi$。','面積 $=\\pi\\times 6^2\\times\\dfrac{60}{360}=6\\pi$。'],
        ans:'弧長 $2\\pi$；面積 $6\\pi$' },
      { q:'弦和直徑有什麼關係？',
        steps:['直徑是通過圓心的弦。','直徑是圓中最長的弦。'],
        ans:'直徑是最長的弦' } ] }
]},

{ id:'u40', book:4, sec:'2-2', title:'垂直、平分與線對稱', page:63, concepts:[
  { id:'u40c1', title:'垂直與點到直線的距離', body:
    '<p>一、<b class="key">垂直</b>：1、直線 $L_1$ 與直線 $L_2$ 的交角成 <b class="key">$90^\\circ$</b>，我們說 $L_1$ 與 $L_2$ 互相<b class="key">垂直</b>，或說 $L_1$ 與 $L_2$ 互為<b class="key">垂線</b>。2、而交點 $O$ 就稱為<b class="key">垂足</b>。3、以符號「<b class="key">⊥</b>」來表示垂直。4、$L_1$ 垂直於 $L_2$，可記作「$L_1\\perp L_2$」。</p>'+
    '<p>二、<b class="key">點到直線的距離</b>：線外一點到某直線的<b class="key">垂直距離</b>，即 $d(A,L)=\\overline{AB}$（$B$ 為垂足）。</p>',
    examples:[
      { q:'為什麼點到直線的距離要沿「垂直」方向量？',
        steps:['從 $A$ 到直線上各點的線段中，垂直的那條最短。','其他斜線段都是直角三角形的斜邊，比股（垂直距離）長。'],
        ans:'垂直線段最短，故取垂直距離' } ] },

  { id:'u40c2', title:'平分與中點', body:
    '<p>三、<b class="key">平分</b>：1、若 $M$ 把 $\\overline{AB}$ 分成相等的兩個部分，即 $\\overline{AM}=\\overline{MB}$，則稱 $M$ <b class="key">平分</b> $\\overline{AB}$。2、$M$ 為 $\\overline{AB}$ 之<b class="key">中點</b>。</p>',
    examples:[
      { q:'$\\overline{AB}=14$，$M$ 為中點，$N$ 為 $\\overline{MB}$ 中點，求 $\\overline{AN}$。',
        steps:['$\\overline{AM}=\\overline{MB}=7$。','$\\overline{MN}=3.5$ → $\\overline{AN}=7+3.5=10.5$。'],
        ans:'$10.5$' } ] },

  { id:'u40c3', title:'垂直平分線（中垂線）與角平分線', body:
    '<p>四、<b class="key">垂直平分線（中垂線）</b>：1、過已知線段<b class="key">中點</b>且與該線段<b class="key">垂直</b>的直線。2、【重要性質】中垂線上任一點，到此線段的兩端點<b class="key">等距離</b>。</p>'+
    '<p>五、<b class="key">角平分線（分角線）</b>：1、將已知角<b class="key">平分</b>為兩個<b class="key">相等</b>的角的射線。2、【重要性質】角平分線上任一點，到此角的兩邊<b class="key">等距離</b>。</p>',
    examples:[
      { q:'$P$ 在 $\\overline{AB}$ 的中垂線上，$\\overline{PA}=8$，求 $\\overline{PB}$。',
        steps:['中垂線上的點到兩端點等距。','$\\overline{PB}=\\overline{PA}=8$。'],
        ans:'$8$' },
      { q:'$Q$ 在 $\\angle ABC$ 的角平分線上，$Q$ 到邊 $BA$ 的距離為 5，求 $Q$ 到邊 $BC$ 的距離。',
        steps:['角平分線上的點到兩邊等距。','距離也是 5。'],
        ans:'$5$' } ] },

  { id:'u40c4', title:'線對稱圖形及其性質', body:
    '<p>六、<b class="key">線對稱圖形</b>：1、將一個圖形沿著一條直線對摺，如果直線兩側的部分能<b class="key">完全重疊</b>，這樣的圖形稱為<b class="key">線對稱圖形</b>。2、而這條對摺線稱為該圖形的<b class="key">對稱軸</b>。3、對應疊合的點稱為<b class="key">對稱點</b>。4、對應疊合的角稱為<b class="key">對稱角</b>。5、對應疊合的線段稱為<b class="key">對稱線段</b>。</p>'+
    '<p>七、線對稱圖形的<b class="key">性質</b>：對稱軸為任意兩對稱點連接線段的<b class="key">垂直平分線</b>。→ <b class="key">線對稱圖形的對稱軸必垂直平分任意兩對稱點所連接的線段</b>。</p>',
    examples:[
      { q:'正方形、等腰三角形、平行四邊形各有幾條對稱軸？',
        steps:['正方形：4 條（兩條對角線＋兩條中線）。','等腰三角形：1 條（頂角平分線）。','一般平行四邊形：0 條（點對稱但非線對稱）。'],
        ans:'4 條／1 條／0 條' },
      { q:'$A$、$B$ 是線對稱圖形的一組對稱點，對稱軸為 $L$。$\\overline{AB}=10$，$A$ 到 $L$ 的距離是多少？',
        steps:['$L$ 垂直平分 $\\overline{AB}$。','距離 $=10\\div 2=5$。'],
        ans:'$5$' } ] }
]},

{ id:'u41', book:4, sec:'2-3', title:'尺規作圖', page:65, concepts:[
  { id:'u41c1', title:'尺規作圖的意義', body:
    '<p>繪製幾何圖形時，若只用<b class="key">直尺</b>和<b class="key">圓規</b>兩種工具，並規定圓規只拿來<b class="key">畫弧</b>，直尺只用來<b class="key">畫直線</b>，而<b class="key">不使用直尺的刻度</b>，符合這樣規則的作圖就稱為<b class="key">尺規作圖</b>。</p>',
    examples:[
      { q:'尺規作圖中，可以用直尺量出 5 公分再畫線嗎？',
        steps:['不行——規定不能使用直尺的刻度。','長度只能用圓規「複製」既有線段來轉移。'],
        ans:'不可以，長度靠圓規轉移' } ] },

  { id:'u41c2', title:'六種基本作圖', body:
    '<p>利用尺規作圖作出基本作圖：</p>'+
    '<p>(1) <b class="key">等線段</b>作圖——圓規量取原線段長，在新射線上畫弧截取。</p>'+
    '<p>(2) <b class="key">等角</b>作圖——以弧截出原角的兩交點，複製到新射線上再交弧。</p>'+
    '<p>(3) <b class="key">垂直平分線</b>作圖——以兩端點為圓心、大於半長為半徑畫弧，連兩弧交點。</p>'+
    '<p>(4) <b class="key">角平分線</b>作圖——先在兩邊截等距兩點，再以此兩點畫等弧，連頂點與弧交點。</p>'+
    '<p>(5) <b class="key">過線上一點作垂線</b>——以該點為圓心畫弧得兩交點，作此兩點的中垂線。</p>'+
    '<p>(6) <b class="key">過線外一點作垂線</b>——以該點為圓心畫弧交直線於兩點，作此兩點的中垂線。</p>'+
    '<div class="inline-ex">HW：已知 $\\angle AOB=90^\\circ$，利用尺規作圖，將 $\\angle AOB$ 三等分。（提示：$90^\\circ\\div 3=30^\\circ$，可利用正三角形作出 $60^\\circ$ 再平分。）</div>',
    examples:[
      { q:'不能直接用量角器，怎麼用尺規把 $90^\\circ$ 角三等分？',
        steps:['在 $\\overrightarrow{OB}$ 上取 $P$，以 $O$、$P$ 為圓心、$\\overline{OP}$ 為半徑互畫弧交於 $S$ → $\\triangle OPS$ 是正三角形，$\\angle SOB=60^\\circ$。','把 $\\angle SOB$ 用角平分線作圖平分 → 得 $30^\\circ$。','$90^\\circ$ 被分成 $30^\\circ+30^\\circ+30^\\circ$。'],
        ans:'先作 $60^\\circ$（正三角形），再平分成 $30^\\circ$' } ] }
]},

{ id:'u42', book:4, sec:'3-1', title:'三角形的內、外角', page:66, concepts:[
  { id:'u42c1', title:'三角形內角和定理與外角和定理', body:
    '<p>1、任意三角形的<b class="key">內角和 $=180^\\circ$</b>，即 $\\angle A+\\angle B+\\angle C=180^\\circ$（把三個角撕下來可拼成一個平角）。</p>'+
    '<p>2、任意三角形的一組<b class="key">外角和 $=360^\\circ$</b>，即 $\\angle 1+\\angle 2+\\angle 3=360^\\circ$。</p>',
    examples:[
      { q:'三角形三內角比為 $2:3:4$，求三個內角。',
        steps:['設 $2r$、$3r$、$4r$：$9r=180$ → $r=20$。','三角 $40^\\circ$、$60^\\circ$、$80^\\circ$。'],
        ans:'$40^\\circ$、$60^\\circ$、$80^\\circ$' } ] },

  { id:'u42c2', title:'三角形外角定理', body:
    '<p>$\\triangle$ 的任一外角等於<b class="key">兩遠內角相加</b>，即 $\\angle 1=\\angle B+\\angle C$；$\\angle 2=\\angle A+\\angle C$；$\\angle 3=\\angle A+\\angle B$。</p>',
    examples:[
      { q:'$\\triangle ABC$ 中 $\\angle A=42^\\circ$、$\\angle B=71^\\circ$，求 $\\angle C$ 的外角。',
        steps:['外角定理：$\\angle C$ 的外角 $=\\angle A+\\angle B$。','$=42+71=113^\\circ$。'],
        ans:'$113^\\circ$' } ] },

  { id:'u42c3', title:'n 邊形內角和', body:
    '<p>$n$ 邊形的內角和為 <b class="key">$(n-2)\\times 180^\\circ$</b>。</p>'+
    '<p>原理：過一頂點的對角線數 $=n-3$ 條，可將 $n$ 邊形切成 $n-2$ 個三角形：四邊形 1 條對角線 2 個三角形（$360^\\circ$）；五邊形 2 條 3 個（$540^\\circ$）；六邊形 3 條 4 個（$720^\\circ$）；七邊形 4 條 5 個（$900^\\circ$）。</p>',
    examples:[
      { q:'十邊形的內角和是多少？',
        steps:['$(10-2)\\times 180^\\circ$。','$=1440^\\circ$。'],
        ans:'$1440^\\circ$' },
      { q:'某多邊形內角和為 $1080^\\circ$，它是幾邊形？',
        steps:['$(n-2)\\times 180=1080$ → $n-2=6$。','$n=8$。'],
        ans:'八邊形' } ] },

  { id:'u42c4', title:'n 邊形外角和與正 n 邊形', body:
    '<p>四、<b class="key">$n$ 邊形外角和</b>：任意 $n$ 邊形的一組外角和為 <b class="key">$360^\\circ$</b>。</p>'+
    '<p>五、<b class="key">正 $n$ 邊形</b>的外角與內角：</p>'+
    '<p>(1) 正 $n$ 邊形的<b class="key">每一個外角</b>為 $\\dfrac{360^\\circ}{n}$。</p>'+
    '<p>(2) 正 $n$ 邊形的<b class="key">每一個內角</b>為 $\\dfrac{(n-2)\\times 180^\\circ}{n}$ 或 $180^\\circ-\\dfrac{360^\\circ}{n}$。</p>',
    examples:[
      { q:'正五邊形每個外角、內角各是多少？',
        steps:['外角 $=360\\div 5=72^\\circ$。','內角 $=180-72=108^\\circ$。'],
        ans:'外角 $72^\\circ$；內角 $108^\\circ$' } ] }
]},

{ id:'u43', book:4, sec:'3-2', title:'三角形的全等', page:67, concepts:[
  { id:'u43c1', title:'全等的意義與符號', body:
    '<p>1、意義：<b class="key">兩圖形經平移、旋轉、翻轉後會重合，完全相等、一模一樣</b>。</p>'+
    '<p>2、符號：(1) 全等：<b class="key">≅</b>；(2) 邊：<b class="key">S</b>（Side）；(3) 角：<b class="key">A</b>（Angle）；(4) 直角：<b class="key">R</b>（Right angle）；(5) 斜邊：<b class="key">H</b>（Hypotenuse）。</p>'+
    '<p>3、對應點：$A\\leftrightarrow D$、$B\\leftrightarrow E$、$C\\leftrightarrow F$。</p>'+
    '<p>4、對應邊：$\\overline{AB}=\\overline{DE}$、$\\overline{BC}=\\overline{EF}$、$\\overline{AC}=\\overline{DF}$。</p>'+
    '<p>5、對應角：$\\angle A=\\angle D$、$\\angle B=\\angle E$、$\\angle C=\\angle F$。</p>'+
    '<p>6、全等 ⇒ (1) <b class="key">對應角相等</b> (2) <b class="key">對應邊相等</b>。</p>',
    examples:[
      { q:'若 $\\triangle ABC\\cong\\triangle PQR$，$\\overline{AB}=7$、$\\angle C=50^\\circ$，能知道 $\\triangle PQR$ 的什麼？',
        steps:['對應邊：$\\overline{PQ}=\\overline{AB}=7$。','對應角：$\\angle R=\\angle C=50^\\circ$。'],
        ans:'$\\overline{PQ}=7$、$\\angle R=50^\\circ$' } ] },

  { id:'u43c2', title:'SSS 與 SAS 全等性質', body:
    '<p>【三角形的全等性質】（5 種）：由<b class="key">尺規作圖</b>發現，給定下列三條件只能畫出<b class="key">唯一一種</b>三角形。</p>'+
    '<p>1、<b class="key">SSS 全等性質</b>：在 $\\triangle ABC$ 和 $\\triangle DEF$ 中，若 (1) $\\overline{AB}=\\overline{DE}$ (2) $\\overline{BC}=\\overline{EF}$ (3) $\\overline{AC}=\\overline{DF}$，則 $\\triangle ABC\\cong\\triangle DEF$（三邊對應相等）。</p>'+
    '<p>2、<b class="key">SAS 全等性質</b>：若 (1) $\\overline{AB}=\\overline{DE}$ (2) $\\angle A=\\angle D$（<b class="key">夾角</b>）(3) $\\overline{AC}=\\overline{DF}$，則 $\\triangle ABC\\cong\\triangle DEF$（兩邊與其夾角對應相等）。</p>',
    examples:[
      { q:'兩三角形三邊分別是 5、7、9 與 9、5、7，全等嗎？依據？',
        steps:['三邊對應相等（順序可重排）。','依 SSS 全等。'],
        ans:'全等（SSS）' },
      { q:'SAS 的「A」為什麼一定要是兩邊的夾角？',
        steps:['若角不夾在兩邊中間（SSA），同樣條件可能畫出兩種不同三角形。','夾角固定住兩邊的張口，圖形才唯一。'],
        ans:'非夾角（SSA）不保證唯一，不能判定全等' } ] },

  { id:'u43c3', title:'RHS 與 ASA 全等性質', body:
    '<p>3、<b class="key">RHS 全等性質</b>（直角三角形）：若 (1) $\\angle C=\\angle F=90^\\circ$ (2) $\\overline{AB}=\\overline{DE}$（斜邊）(3) $\\overline{AC}=\\overline{DF}$（一股），則 $\\triangle ABC\\cong\\triangle DEF$。（利用畢氏定理可得 $\\overline{BC}=\\overline{EF}$，再利用 SSS 得全等。）</p>'+
    '<p>4、<b class="key">ASA 全等性質</b>：若 (1) $\\angle A=\\angle D$ (2) $\\overline{AB}=\\overline{DE}$（<b class="key">夾邊</b>）(3) $\\angle B=\\angle E$，則 $\\triangle ABC\\cong\\triangle DEF$（兩角與其夾邊對應相等）。</p>',
    examples:[
      { q:'兩直角三角形斜邊都是 10、一股都是 6，全等嗎？另一股是多少？',
        steps:['直角＋斜邊＋一股 → RHS 全等。','另一股 $=\\sqrt{10^2-6^2}=8$。'],
        ans:'全等（RHS）；另一股 8' } ] },

  { id:'u43c4', title:'AAS 全等與不全等的例子', body:
    '<p>5、<b class="key">AAS 全等性質</b>：若 (1) $\\angle A=\\angle D$ (2) $\\angle B=\\angle E$ (3) $\\overline{BC}=\\overline{EF}$，則 $\\triangle ABC\\cong\\triangle DEF$。AAS 其實是以 $\\triangle$ 內角和 $180^\\circ$ 得 $\\angle C=\\angle F$，再利用 <b class="key">ASA</b> 全等。</p>'+
    '<p>三、【不全等的例子】：</p>'+
    '<p>1、<b class="key">SSA 不全等</b>：若 (1) $\\overline{AB}=\\overline{DE}$ (2) $\\overline{AC}=\\overline{DF}$ (3) $\\angle B=\\angle E$（角不是夾角），則 $\\triangle ABC$ <b class="key">不全等於</b> $\\triangle DEF$——此時 $\\angle C$ 與 $\\angle F$ <b class="key">相等或互補</b>，圖形不唯一。</p>'+
    '<p>2、<b class="key">AAA 不全等</b>：三角對應相等只保證形狀相同，例如<b class="key">兩個邊長不相等的正三角形</b>。</p>',
    examples:[
      { q:'全等性質共有哪 5 種？哪兩組條件「不能」判定全等？',
        steps:['5 種：SSS、SAS、ASA、AAS、RHS。','不能：SSA（角非夾角）、AAA（只同形狀不同大小）。'],
        ans:'SSS/SAS/ASA/AAS/RHS；SSA 與 AAA 不行' } ] }
]},

{ id:'u44', book:4, sec:'3-3', title:'中垂線與角平分線', page:70, concepts:[
  { id:'u44c1', title:'垂直平分線的性質與判別', body:
    '<p>【<b class="key">垂直平分線的性質</b>】：一線段的垂直平分線上任一點到此線段<b class="key">兩端點等距離</b>。</p>'+
    '<p>證明：$L$ 為 $\\overline{AB}$ 的垂直平分線、$C$ 在 $L$ 上、$D$ 為交點，在 $\\triangle CAD$ 和 $\\triangle CBD$ 中：$\\overline{AD}=\\overline{BD}$、$\\angle CDA=\\angle CDB=90^\\circ$、$\\overline{CD}=\\overline{CD}$（共用邊）∴ $\\triangle CAD\\cong\\triangle CBD$（SAS），故 $\\overline{CA}=\\overline{CB}$。</p>'+
    '<p>【<b class="key">垂直平分線的判別</b>】：若一點到某線段的兩端點<b class="key">距離相等</b>，則該點在此線段的<b class="key">垂直平分線（中垂線）</b>上。</p>',
    examples:[
      { q:'$\\overline{PA}=\\overline{PB}$、$\\overline{QA}=\\overline{QB}$，$P$、$Q$ 兩點連線和 $\\overline{AB}$ 有什麼關係？',
        steps:['$P$、$Q$ 都到 $A$、$B$ 等距 → 都在 $\\overline{AB}$ 的中垂線上。','兩點決定一條直線 → $\\overleftrightarrow{PQ}$ 就是 $\\overline{AB}$ 的中垂線。'],
        ans:'$\\overleftrightarrow{PQ}$ 是 $\\overline{AB}$ 的垂直平分線' } ] },

  { id:'u44c2', title:'角平分線的性質與判別', body:
    '<p>【<b class="key">角平分線性質</b>】：角平分線上任一點到此角<b class="key">兩邊垂直距離相等</b>。</p>'+
    '<p>證明：$\\overrightarrow{AP}$ 為 $\\angle EAF$ 的角平分線、$D$ 在其上，$DC\\perp AE$、$DB\\perp AF$，在 $\\triangle ACD$ 和 $\\triangle ABD$ 中：$\\angle 1=\\angle 2$、$\\angle ACD=\\angle ABD=90^\\circ$、$\\overline{AD}=\\overline{AD}$（共用邊）∴ $\\triangle ACD\\cong\\triangle ABD$（AAS），故 $\\overline{DC}=\\overline{DB}$。</p>'+
    '<p>【<b class="key">角平分線的判別</b>】：若某角內部的一點到此角的兩邊<b class="key">距離相等</b>，則該點在此角的<b class="key">角平分線（分角線）</b>上。</p>',
    examples:[
      { q:'三角形三條角平分線的交點（內心）有什麼特性？',
        steps:['在每條角平分線上 → 到每個角的兩邊等距。','所以內心到三邊等距，可作內切圓。'],
        ans:'到三邊等距（內切圓圓心）' } ] },

  { id:'u44c3', title:'等腰三角形的性質（證明）', body:
    '<p>【<b class="key">等腰三角形的性質</b>】：1、等腰三角形的<b class="key">兩底角</b>會<b class="key">相等</b>。</p>'+
    '<p>證明：$\\triangle ABC$ 為等腰三角形（$\\overline{AB}=\\overline{AC}$），在 $\\overline{BC}$ 上取中點 $D$ 並連接 $\\overline{AD}$，在 $\\triangle ABD$ 和 $\\triangle ACD$ 中：$\\overline{AB}=\\overline{AC}$（已知）、$\\overline{BD}=\\overline{CD}$（$D$ 為中點）、$\\overline{AD}=\\overline{AD}$（共用邊）∴ $\\triangle ABD\\cong\\triangle ACD$（SSS），故 $\\angle B=\\angle C$。</p>',
    examples:[
      { q:'等腰三角形一個底角是 $65^\\circ$，求頂角。',
        steps:['兩底角相等：$65^\\circ+65^\\circ=130^\\circ$。','頂角 $=180-130=50^\\circ$。'],
        ans:'$50^\\circ$' } ] },

  { id:'u44c4', title:'等腰三角形的其他性質、直角判別與正三角形', body:
    '<p>2、等腰三角形底邊的<b class="key">中垂線</b>會<b class="key">通過頂點</b>，且<b class="key">平分頂角</b>。</p>'+
    '<p>3、等腰三角形的<b class="key">頂角平分線</b>會<b class="key">垂直平分底邊</b>（用 SAS 全等證明 $\\overline{BD}=\\overline{CD}$、$\\angle ADB=\\angle ADC=90^\\circ$）。</p>'+
    '<p>四、【<b class="key">由邊長判別直角三角形</b>】：若三角形滿足一邊長的平方等於另兩邊長的平方和，則此三角形為<b class="key">直角三角形</b>（畢氏定理的逆定理）。</p>'+
    '<p>五、【<b class="key">正三角形的判別性質</b>】：1、正三角形<b class="key">三個邊等長</b>且<b class="key">三個角都等於 $60^\\circ$</b>；2、正三角形的高 $=\\dfrac{\\sqrt{3}}{2}a$；3、正三角形的面積 $=\\dfrac{\\sqrt{3}}{4}a^2$。</p>',
    examples:[
      { q:'三邊為 7、24、25 的三角形是什麼三角形？',
        steps:['檢查：$7^2+24^2=49+576=625=25^2$。','滿足畢氏逆定理 → 直角三角形。'],
        ans:'直角三角形' },
      { q:'邊長 10 的正三角形，高與面積各是多少？',
        steps:['高 $=\\dfrac{\\sqrt{3}}{2}\\times 10=5\\sqrt{3}$。','面積 $=\\dfrac{\\sqrt{3}}{4}\\times 100=25\\sqrt{3}$。'],
        ans:'高 $5\\sqrt{3}$；面積 $25\\sqrt{3}$' } ] }
]},

{ id:'u45', book:4, sec:'3-4', title:'三角形邊角關係', page:72, concepts:[
  { id:'u45c1', title:'三角形的三邊長關係', body:
    '<p>1、任意<b class="key">兩邊之和大於第三邊</b>：$a+b>c$、$b+c>a$、$c+a>b$。</p>'+
    '<p>2、任意<b class="key">兩邊之差小於第三邊</b>：$|a-b|<c$、$|b-c|<a$、$|c-a|<b$。</p>'+
    '<p>3、<b class="key">結論</b>：$|a-b|<c<a+b$。</p>',
    examples:[
      { q:'兩邊長 5、9，第三邊 $x$ 的範圍？若 $x$ 是整數有幾種可能？',
        steps:['$|9-5|<x<9+5$ → $4<x<14$。','整數：5～13，共 9 種。'],
        ans:'$4<x<14$；9 種' },
      { q:'邊長 3、4、8 能組成三角形嗎？',
        steps:['檢查兩邊和：$3+4=7<8$。','違反兩邊之和大於第三邊 → 不能。'],
        ans:'不能' } ] },

  { id:'u45c2', title:'三角形的外角大於任一內對角', body:
    '<p>由外角定理 $\\angle 1=\\angle A+\\angle B$，所以 <b class="key">$\\angle 1>\\angle A$ 且 $\\angle 1>\\angle B$</b>（外角大於任一遠內角）。</p>',
    examples:[
      { q:'$\\triangle ABC$ 中 $\\angle C$ 的外角為 $95^\\circ$，$\\angle A$ 可能是 $100^\\circ$ 嗎？',
        steps:['外角必大於遠內角 $\\angle A$。','$100^\\circ>95^\\circ$ 矛盾 → 不可能。'],
        ans:'不可能' } ] },

  { id:'u45c3', title:'三角形的邊角關係', body:
    '<p>1、<b class="key">等邊對等角，等角對等邊</b>。</p>'+
    '<p>2、【<b class="key">大邊對大角</b>】：當 $\\overline{AC}>\\overline{BC}$ 時 ⇒ $\\angle B>\\angle A$。</p>'+
    '<p>3、【<b class="key">大角對大邊</b>】：當 $\\angle C>\\angle B$ 時 ⇒ $\\overline{AB}>\\overline{AC}$。</p>',
    examples:[
      { q:'$\\triangle ABC$ 中 $\\angle A=70^\\circ$、$\\angle B=60^\\circ$、$\\angle C=50^\\circ$，哪條邊最長？',
        steps:['大角對大邊：最大角 $\\angle A$ 對邊 $\\overline{BC}$。'],
        ans:'$\\overline{BC}$ 最長' },
      { q:'$\\triangle ABC$ 三邊 $\\overline{AB}=6$、$\\overline{BC}=8$、$\\overline{CA}=10$，比較三內角大小。',
        steps:['大邊對大角：$\\overline{CA}>\\overline{BC}>\\overline{AB}$。','對角依序：$\\angle B>\\angle A>\\angle C$。'],
        ans:'$\\angle B>\\angle A>\\angle C$' } ] },

  { id:'u45c4', title:'樞紐定理與逆樞紐定理', body:
    '<p>已知兩個三角形的<b class="key">兩組邊分別對應相等</b>（不同三角形）：</p>'+
    '<p>1、<b class="key">樞紐定理</b>：若 $\\angle D>\\angle A$，則 $\\overline{EF}>\\overline{BC}$（夾角愈大，對邊愈長——像時鐘兩針張愈開，針尖距離愈遠）。</p>'+
    '<p>2、<b class="key">逆樞紐定理</b>：若 $\\overline{EF}>\\overline{BC}$，則 $\\angle D>\\angle A$。</p>',
    examples:[
      { q:'時鐘 3 點與 5 點時，時針分針針尖的距離哪個遠？用什麼定理說明？',
        steps:['兩針長度固定（兩組邊相等），5 點時夾角較大。','樞紐定理：夾角大 → 對邊（針尖距離）大。'],
        ans:'5 點較遠（樞紐定理）' } ] },

  { id:'u45c5', title:'特殊直角三角形邊長比與三線段判別', body:
    '<p>六、特殊直角三角形的邊長比：</p>'+
    '<p>1、$30^\\circ$、$60^\\circ$、$90^\\circ$ 的直角三角形：三邊比為 <b class="key">$1:\\sqrt{3}:2$</b>（$30^\\circ$ 對 1、$60^\\circ$ 對 $\\sqrt{3}$、$90^\\circ$ 對 2）。</p>'+
    '<p>2、$45^\\circ$、$45^\\circ$、$90^\\circ$ 的直角三角形：邊長比 <b class="key">$1:1:\\sqrt{2}$</b>。</p>'+
    '<p>七、正三角形邊長為 $a$：高 $=\\dfrac{\\sqrt{3}}{2}a$、面積 $=\\dfrac{\\sqrt{3}}{4}a^2$。</p>'+
    '<p>【<b class="key">三線段形成三角形的判別</b>】：已知三條線段，如果兩條<b class="key">較短</b>線段的和大於<b class="key">最長</b>線段，則此三線段可以形成一個三角形。</p>',
    examples:[
      { q:'$30^\\circ$–$60^\\circ$–$90^\\circ$ 三角形斜邊 12，求另兩邊。',
        steps:['比 $1:\\sqrt{3}:2$，斜邊對應 2 → 單位 $=6$。','$30^\\circ$ 對邊 $=6$；$60^\\circ$ 對邊 $=6\\sqrt{3}$。'],
        ans:'$6$ 與 $6\\sqrt{3}$' },
      { q:'等腰直角三角形股長 5，斜邊多長？',
        steps:['比 $1:1:\\sqrt{2}$。','斜邊 $=5\\sqrt{2}$。'],
        ans:'$5\\sqrt{2}$' } ] }
]},

{ id:'u46', book:4, sec:'4-1', title:'平行', page:74, concepts:[
  { id:'u46c1', title:'平行線的意義與性質', body:
    '<p>一、平行線的意義：<b class="key">兩直線可以找到一條共同的垂直線</b>。</p>'+
    '<p>二、平行的符號：<b class="key">∥</b>。</p>'+
    '<p>三、平行線的性質：</p>'+
    '<p>1、已知 $L_1\\parallel L_2$，則 (1) $L_1$ 與 $L_2$ <b class="key">永不相交</b>；(2) $L_1$ 與 $L_2$ 的距離<b class="key">處處相等</b>。</p>'+
    '<p>2、已知 $L_1\\parallel L_2$，若直線 $M\\perp L_1$，則 <b class="key">$M\\perp L_2$</b>。</p>'+
    '<p>3、已知 $L_1\\parallel L_2$、$L_2\\parallel L_3$，則 <b class="key">$L_1\\parallel L_2\\parallel L_3$</b>（平行具遞移性）。</p>',
    examples:[
      { q:'鐵軌為什麼處處等寬？用平行線的哪個性質解釋？',
        steps:['兩軌平行。','平行線間的距離處處相等。'],
        ans:'平行線距離處處相等' } ] },

  { id:'u46c2', title:'截線與截角', body:
    '<p>兩條直線 $L_1$、$L_2$ 被一條直線 $L$ 所截，形成八個交角，則稱 $L$ 為<b class="key">截線</b>，八個交角 $\\angle 1\\sim\\angle 8$ 為<b class="key">截角</b>（上方 $L_1$ 處為 $\\angle 1\\angle 2\\angle 3\\angle 4$、下方 $L_2$ 處為 $\\angle 5\\angle 6\\angle 7\\angle 8$）：</p>'+
    '<p>1、<b class="key">同位角</b>：<b class="key">相對位置相同的角</b>（4 組）：$\\angle 1$ 與 $\\angle 5$、$\\angle 2$ 與 $\\angle 6$、$\\angle 3$ 與 $\\angle 7$、$\\angle 4$ 與 $\\angle 8$。</p>'+
    '<p>2、<b class="key">內錯角</b>：<b class="key">兩直線內交錯的角</b>（2 組）：$\\angle 3$ 與 $\\angle 6$、$\\angle 4$ 與 $\\angle 5$。</p>'+
    '<p>3、<b class="key">同側內角</b>：<b class="key">兩直線內同側的角</b>（2 組）：$\\angle 3$ 與 $\\angle 5$、$\\angle 4$ 與 $\\angle 6$。</p>'+
    '<p>4、<b class="key">外錯角</b>：<b class="key">兩直線外交錯的角</b>（2 組）：$\\angle 1$ 與 $\\angle 8$、$\\angle 2$ 與 $\\angle 7$。</p>'+
    '<p>5、<b class="key">同側外角</b>：<b class="key">兩直線外同側的角</b>（2 組）：$\\angle 1$ 與 $\\angle 7$、$\\angle 2$ 與 $\\angle 8$。</p>',
    examples:[
      { q:'截線圖中，內錯角和同位角各有幾組？',
        steps:['內錯角 2 組、同位角 4 組。'],
        ans:'內錯角 2 組；同位角 4 組' } ] },

  { id:'u46c3', title:'平行線的截線性質', body:
    '<p>已知兩平行線被一直線所截，則：</p>'+
    '<p>1、同位角<b class="key">相等</b>。</p>'+
    '<p>2、內錯角<b class="key">相等</b>。</p>'+
    '<p>3、同側內角<b class="key">互補</b>。</p>',
    examples:[
      { q:'$L_1\\parallel L_2$ 被截線所截，一個同側內角為 $68^\\circ$，它的同側內角夥伴、內錯角夥伴各幾度？',
        steps:['同側內角互補：$180-68=112^\\circ$。','內錯角相等：$68^\\circ$。'],
        ans:'$112^\\circ$；$68^\\circ$' },
      { q:'截線與 $L_1$ 成 $75^\\circ$，$L_1\\parallel L_2$，截線與 $L_2$ 成幾度？',
        steps:['同位角相等。','也是 $75^\\circ$。'],
        ans:'$75^\\circ$' } ] },

  { id:'u46c4', title:'平行線的判別與製作', body:
    '<p>六、<b class="key">平行線的判別</b>：已知兩直線被一直線所截：</p>'+
    '<p>1、若有一組<b class="key">同位角相等</b>，則此兩直線互相平行。</p>'+
    '<p>2、若有一組<b class="key">內錯角相等</b>，則此兩直線互相平行。</p>'+
    '<p>3、若有一組<b class="key">同側內角互補</b>，則此兩直線互相平行。</p>'+
    '<p>七、平行線的製作：1、<b class="key">直角三角板</b>（共同垂線）；2、<b class="key">畫同位角</b>。</p>',
    examples:[
      { q:'截線截兩直線，形成的內錯角分別為 $63^\\circ$ 與 $63^\\circ$，兩直線平行嗎？',
        steps:['一組內錯角相等。','由判別 → 互相平行。'],
        ans:'平行' } ] }
]},

{ id:'u47', book:4, sec:'4-2', title:'平行四邊形', page:76, concepts:[
  { id:'u47c1', title:'平行四邊形的定義', body:
    '<p>平行四邊形的定義：<b class="key">兩雙對邊分別平行</b>，即 $\\overline{AD}\\parallel\\overline{BC}$ 且 $\\overline{AB}\\parallel\\overline{CD}$。</p>',
    examples:[
      { q:'四邊形 $ABCD$ 只知道 $\\overline{AB}\\parallel\\overline{CD}$，能斷定是平行四邊形嗎？',
        steps:['定義要「兩雙」對邊分別平行。','只有一雙平行可能是梯形。'],
        ans:'不能（可能是梯形）' } ] },

  { id:'u47c2', title:'平行四邊形的性質（含證明脈絡）', body:
    '<p>1、兩組對角<b class="key">相等</b>，鄰角<b class="key">互補</b>：$\\angle A=\\angle C$、$\\angle B=\\angle D$、$\\angle A+\\angle B=180^\\circ$、$\\angle B+\\angle C=180^\\circ$（由平行的同側內角互補推得）。</p>'+
    '<p>2、兩組對邊<b class="key">分別相等</b>。</p>'+
    '<p>3、任一條對角線將平行四邊形分成兩個<b class="key">全等三角形</b>（內錯角相等＋共用邊 → ASA 全等）。</p>'+
    '<p>4、兩條對角線<b class="key">互相平分</b>（$\\triangle AOB\\cong\\triangle COD$，ASA → $\\overline{OA}=\\overline{OC}$、$\\overline{OB}=\\overline{OD}$）。</p>'+
    '<p>5、兩條對角線將其面積<b class="key">四等分</b>（等底同高 → $\\triangle AOB$、$\\triangle BOC$、$\\triangle COD$、$\\triangle AOD$ 面積相等）。</p>',
    examples:[
      { q:'平行四邊形 $ABCD$ 面積 48，對角線交於 $O$，求 $\\triangle AOB$ 的面積。',
        steps:['兩對角線把面積四等分。','$48\\div 4=12$。'],
        ans:'$12$' },
      { q:'平行四邊形相鄰兩角比為 $2:3$，求四個角。',
        steps:['鄰角互補：$2r+3r=180$ → $r=36$。','兩角 $72^\\circ$、$108^\\circ$；對角相等 → $72^\\circ,108^\\circ,72^\\circ,108^\\circ$。'],
        ans:'$72^\\circ$、$108^\\circ$ 各兩個' } ] },

  { id:'u47c3', title:'平行四邊形的判別性質', body:
    '<p>滿足下列情形之一者為<b class="key">平行四邊形</b>：</p>'+
    '<p>1、<b class="key">兩雙對邊分別平行</b>（$\\overline{AD}\\parallel\\overline{BC}$ 且 $\\overline{AB}\\parallel\\overline{CD}$）。</p>'+
    '<p>2、<b class="key">兩雙對邊分別相等</b>（$\\overline{AB}=\\overline{CD}$ 且 $\\overline{AD}=\\overline{BC}$）。</p>'+
    '<p>3、<b class="key">兩組對角分別相等</b>（$\\angle A=\\angle C$ 且 $\\angle B=\\angle D$）。</p>'+
    '<p>4、<b class="key">一雙對邊平行且相等</b>。</p>'+
    '<p>5、<b class="key">一雙對邊平行、一組對角相等</b>。</p>'+
    '<p>6、<b class="key">兩對角線互相平分</b>（$\\overline{OA}=\\overline{OC}$ 且 $\\overline{OB}=\\overline{OD}$）。</p>',
    examples:[
      { q:'四邊形 $ABCD$ 中 $\\overline{AB}\\parallel\\overline{CD}$ 且 $\\overline{AB}=\\overline{CD}$，是平行四邊形嗎？依據哪條判別？',
        steps:['一雙對邊平行且相等。','判別 4 → 是平行四邊形。'],
        ans:'是（判別 4）' },
      { q:'兩條對角線互相平分的四邊形一定是平行四邊形嗎？',
        steps:['判別 6：對角線互相平分 → 平行四邊形。'],
        ans:'一定是' } ] }
]},

{ id:'u48', book:4, sec:'4-3', title:'特殊四邊形', page:78, concepts:[
  { id:'u48c1', title:'長方形的對角線與斜邊中點性質', body:
    '<p>1、【<b class="key">長方形（矩形）的對角線</b>】：</p>'+
    '<p>(1) 兩條對角線<b class="key">互相平分且等長</b>（長方形為平行四邊形的一種 → 互相平分；再由 SAS 全等得 $\\overline{AC}=\\overline{BD}$）。</p>'+
    '<p>(2) 兩條對角線<b class="key">等長且互相平分</b>的四邊形是<b class="key">長方形</b>（$\\overline{OA}=\\overline{OB}=\\overline{OC}=\\overline{OD}$ → 等腰三角形拼出四個角各 $90^\\circ$）。</p>'+
    '<p>【<b class="key">直角三角形斜邊中點性質</b>】：直角三角形斜邊中點到三頂點的<b class="key">距離相等</b>（把直角三角形補成長方形看對角線）。</p>',
    examples:[
      { q:'直角三角形斜邊長 26，斜邊中點到直角頂點的距離是多少？',
        steps:['斜邊中點到三頂點等距 → 距離＝斜邊的一半。','$26\\div 2=13$。'],
        ans:'$13$' } ] },

  { id:'u48c2', title:'菱形的對角線', body:
    '<p>2、【<b class="key">菱形的對角線</b>】：(1) 兩條對角線<b class="key">互相垂直、平分</b>，且<b class="key">平分對角</b>。</p>'+
    '<p>證明脈絡：$\\overline{AB}=\\overline{BC}=\\overline{CD}=\\overline{DA}$ → $\\triangle ABC\\cong\\triangle ADC$（SSS）⇒ $\\overline{AC}$ 平分 $\\angle A$、$\\angle C$；同理 $\\overline{BD}$ 平分 $\\angle B$、$\\angle D$；再由 $\\triangle AOB\\cong\\triangle AOD$（SAS）⇒ 兩鄰角相等且互補 $=90^\\circ$，即 $\\overline{AC}\\perp\\overline{BD}$。</p>',
    examples:[
      { q:'菱形兩對角線長 12、16，求邊長與面積。',
        steps:['對角線垂直平分 → 半對角線 6、8 構成直角三角形。','邊長 $=\\sqrt{6^2+8^2}=10$。','面積 $=\\dfrac{12\\times 16}{2}=96$（對角線乘積的一半）。'],
        ans:'邊長 10；面積 96' } ] },

  { id:'u48c3', title:'菱形的判別與面積、箏形的對角線', body:
    '<p>(2) 兩條對角線<b class="key">互相垂直平分</b>的四邊形是<b class="key">菱形</b>。</p>'+
    '<p>(3) <b class="key">菱形的面積</b> $=\\dfrac{\\overline{AC}\\times\\overline{BD}}{2}$（拆成上下兩個三角形相加）。</p>'+
    '<p>3、【<b class="key">箏形的對角線</b>】：(1) 其中一條對角線<b class="key">垂直平分</b>另一條對角線，且<b class="key">平分</b>兩個內角。(2) 一條對角線垂直平分另一條對角線的四邊形是<b class="key">箏形</b>。</p>',
    examples:[
      { q:'箏形兩對角線長 10、14，求面積。',
        steps:['箏形面積也是對角線乘積的一半。','$\\dfrac{10\\times 14}{2}=70$。'],
        ans:'$70$' } ] },

  { id:'u48c4', title:'正方形的對角線與特殊四邊形面積公式', body:
    '<p>4、【<b class="key">正方形的對角線</b>】：(1) 兩條對角線互相<b class="key">垂直、平分且相等</b>。(2) 兩條對角線<b class="key">等長且互相垂直平分</b>的四邊形是<b class="key">正方形</b>。</p>'+
    '<p>（正方形為菱形的一種 → 對角線互相垂直、平分；正方形為長方形的一種 → 對角線互相平分、等長。）</p>'+
    '<p>二、【<b class="key">特殊四邊形面積公式</b>】：箏形、菱形與正方形的面積皆 $=\\dfrac{\\overline{AC}\\times\\overline{BD}}{2}$。</p>',
    examples:[
      { q:'正方形對角線長 8，求面積。',
        steps:['兩對角線等長且垂直：面積 $=\\dfrac{8\\times 8}{2}$。','$=32$。'],
        ans:'$32$' } ] },

  { id:'u48c5', title:'梯形中線與面積、等腰梯形的性質', body:
    '<p>三、【<b class="key">梯形中線長和面積公式</b>】：</p>'+
    '<p>1、<b class="key">中線</b>：梯形<b class="key">兩腰中點的連線段</b>。(1) 梯形中線會與<b class="key">上、下底平行</b>；(2) 梯形中線長 $=\\dfrac{上底+下底}{2}$。</p>'+
    '<p>2、梯形面積 $=\\dfrac{(上底+下底)\\times 高}{2}=$ <b class="key">中線長 × 高</b>。</p>'+
    '<p>四、【<b class="key">等腰梯形的性質</b>】：1、兩組底角分別<b class="key">相等</b>；2、兩條對角線<b class="key">等長</b>。</p>',
    examples:[
      { q:'梯形上底 6、下底 14、高 5，求中線長與面積。',
        steps:['中線 $=\\dfrac{6+14}{2}=10$。','面積 $=10\\times 5=50$。'],
        ans:'中線 10；面積 50' },
      { q:'等腰梯形一底角為 $70^\\circ$，求其餘三個角。',
        steps:['同底的另一底角相等：$70^\\circ$。','同側上下底角互補（兩底平行）：$180-70=110^\\circ$，另一個也是 $110^\\circ$。'],
        ans:'$70^\\circ$、$110^\\circ$、$110^\\circ$' } ] },

  { id:'u48c6', title:'特殊四邊形的包含關係與性質總表', body:
    '<p>五、【<b class="key">包含關係</b>】：1、菱形是<b class="key">箏形</b>；2、正方形是<b class="key">菱形</b>，也是<b class="key">長方形</b>；3、長方形、菱形、正方形都是<b class="key">平行四邊形</b>（正方形＝菱形與長方形的交集）。</p>'+
    '<p>六、【<b class="key">性質總表</b>】：</p>'+
    '<p>・對邊平行／對邊等長／對角相等／對角線互相平分：平行四邊形、菱形、長方形、正方形都 ✓。</p>'+
    '<p>・四邊等長：菱形、正方形 ✓。四角相等（$90^\\circ$）：長方形、正方形 ✓。</p>'+
    '<p>・對角線互相垂直：箏形、菱形、正方形 ✓。</p>'+
    '<p>・對角線等長：長方形、正方形、等腰梯形 ✓。</p>',
    examples:[
      { q:'哪一種四邊形的對角線「又互相垂直、又互相平分、又等長」？',
        steps:['垂直：箏形／菱形／正方形；平分：平行四邊形家族；等長：長方形／正方形／等腰梯形。','三者交集只有正方形。'],
        ans:'正方形' } ] }
]},

{ id:'u49', book:5, sec:'1-1', title:'比例線段', page:82, concepts:[
  { id:'u49c1', title:'三角形底邊與面積的關係', body:
    '<p>(1) <b class="key">等底同高，面積相同</b>：$\\triangle ABC=\\dfrac{\\overline{BC}\\times\\overline{AP}}{2}$，若 $\\overline{AP}=\\overline{DQ}$（兩頂點在平行線上），則 $\\triangle ABC=\\triangle DBC$。</p>'+
    '<p>(2) <b class="key">高相同，面積比等於底邊長比</b>：$\\triangle ABD:\\triangle ACD=\\dfrac{\\overline{BD}\\times\\overline{AE}}{2}:\\dfrac{\\overline{CD}\\times\\overline{AE}}{2}=\\overline{BD}:\\overline{CD}$。</p>',
    examples:[
      { q:'$D$ 在 $\\overline{BC}$ 上且 $\\overline{BD}:\\overline{DC}=2:3$，$\\triangle ABC$ 面積 40，求 $\\triangle ABD$。',
        steps:['同高 → 面積比＝底邊比 $=2:3$。','$\\triangle ABD=40\\times\\dfrac{2}{5}=16$。'],
        ans:'$16$' } ] },

  { id:'u49c2', title:'平行線截比例線段性質（與逆敘述）', body:
    '<p>若 $\\triangle ABC$ 中，$D$、$E$ 分別為 $\\overline{AB}$、$\\overline{AC}$ 上一點，且 <b class="key">$\\overline{DE}\\parallel\\overline{BC}$</b>，則：</p>'+
    '<p>&lt;1&gt; $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$。</p>'+
    '<p>&lt;2&gt; $\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}$。</p>'+
    '<p>&lt;3&gt; $\\overline{DB}:\\overline{AB}=\\overline{EC}:\\overline{AC}$。</p>'+
    '<p>&lt;4&gt; $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}$。</p>'+
    '<p><b class="key">逆敘述</b>：$D$、$E$ 分別在 $\\overline{AB}$、$\\overline{AC}$ 上，(1) 若 $\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$，或 (2) $\\overline{AD}:\\overline{AB}=\\overline{AE}:\\overline{AC}$，或 (3) $\\overline{DB}:\\overline{AB}=\\overline{EC}:\\overline{AC}$，則 <b class="key">$\\overline{DE}\\parallel\\overline{BC}$</b>。</p>',
    examples:[
      { q:'$\\overline{DE}\\parallel\\overline{BC}$，$\\overline{AD}=4$、$\\overline{DB}=6$、$\\overline{AE}=6$，求 $\\overline{EC}$。',
        steps:['$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$ → $4:6=6:\\overline{EC}$。','$4\\overline{EC}=36$ → $\\overline{EC}=9$。'],
        ans:'$9$' },
      { q:'承上，$\\overline{BC}=15$，求 $\\overline{DE}$。',
        steps:['$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}=4:10$。','$\\overline{DE}=15\\times\\dfrac{2}{5}=6$。'],
        ans:'$6$' } ] },

  { id:'u49c3', title:'三角形兩邊中點連線性質', body:
    '<p>$\\triangle ABC$ 中，$D$、$E$ 分別為 $\\overline{AB}$、$\\overline{AC}$ 的<b class="key">中點</b>，則：</p>'+
    '<p>(1) <b class="key">$\\overline{DE}\\parallel\\overline{BC}$</b>。</p>'+
    '<p>(2) <b class="key">$\\overline{DE}=\\dfrac{1}{2}\\overline{BC}$</b>。</p>',
    examples:[
      { q:'三角形兩邊中點連線長 7，第三邊多長？',
        steps:['中點連線是第三邊的一半。','$7\\times 2=14$。'],
        ans:'$14$' } ] },

  { id:'u49c4', title:'比例線段的應用：三平行線、中點坐標、內外分比', body:
    '<p>4、平行線截比例線段性質的應用：$L_1\\parallel L_2\\parallel L_3$，分別與 $M_1$ 相交於 $A$、$B$、$C$ 三點，與 $M_2$ 相交於 $D$、$E$、$F$ 三點，則 <b class="key">$\\overline{AB}:\\overline{BC}=\\overline{DE}:\\overline{EF}$</b>。</p>'+
    '<p>5、利用尺規作圖做比例線段：可在 $\\overline{AB}$ 上作出 $C$，使 $\\overline{AC}:\\overline{CB}=1:2$（作輔助射線等分後平行截取）。</p>'+
    '<p>6、坐標平面上線段的中點坐標：$A(a_1,b_1)$、$B(a_2,b_2)$，$\\overline{AB}$ 的中點坐標為 <b class="key">$\\left(\\dfrac{a_1+a_2}{2},\\dfrac{b_1+b_2}{2}\\right)$</b>。</p>'+
    '<p>7、三角形<b class="key">內分比</b>性質：$\\angle BAC$ 的角平分線與 $\\overline{BC}$ 相交於 $D$，則 <b class="key">$\\overline{AB}:\\overline{AC}=\\overline{BD}:\\overline{DC}$</b>。</p>'+
    '<p>8、三角形<b class="key">外分比</b>性質：$\\angle BAC$ 的外角平分線與 $\\overleftrightarrow{BC}$ 相交於 $D$，則 $\\overline{AB}:\\overline{AC}=\\overline{BD}:\\overline{DC}$。</p>',
    examples:[
      { q:'$A(-2,5)$、$B(6,-1)$，求 $\\overline{AB}$ 中點。',
        steps:['$x=\\dfrac{-2+6}{2}=2$；$y=\\dfrac{5-1}{2}=2$。'],
        ans:'$(2,2)$' },
      { q:'$\\triangle ABC$ 中 $\\overline{AB}=8$、$\\overline{AC}=6$，$\\angle A$ 的角平分線交 $\\overline{BC}$ 於 $D$，$\\overline{BC}=7$，求 $\\overline{BD}$。',
        steps:['內分比：$\\overline{BD}:\\overline{DC}=8:6=4:3$。','$\\overline{BD}=7\\times\\dfrac{4}{7}=4$。'],
        ans:'$4$' } ] }
]},

{ id:'u50', book:5, sec:'1-2', title:'縮放與相似多邊形', page:84, concepts:[
  { id:'u50c1', title:'縮放的性質', body:
    '<p>(1) 一線段經過縮放後仍是<b class="key">線段</b>，且該線段與原線段<b class="key">平行</b>，或在同一直線上。</p>'+
    '<p>(2) 線段縮放 $k$ 倍後，縮放後的線段長為原線段長的 <b class="key">$k$ 倍</b>。</p>'+
    '<p>(3) 任意一角經過 $r$ 倍縮放後，其角度<b class="key">不變</b>。</p>',
    examples:[
      { q:'線段長 6 以 $O$ 為中心放大 2.5 倍後多長？角 $40^\\circ$ 放大 2.5 倍後幾度？',
        steps:['線段：$6\\times 2.5=15$。','角度縮放不變：仍 $40^\\circ$。'],
        ans:'$15$；$40^\\circ$' } ] },

  { id:'u50c2', title:'點、線段、角、三角形的縮放', body:
    '<p><b class="key">點的縮放</b>：$A&#39;$ 點是以 $O$ 點為縮放中心，將 $A$ 點沿 $\\overrightarrow{OA}$ 縮放 $k$ 倍的點（$\\overline{OA&#39;}=k\\overline{OA}$）。</p>'+
    '<p><b class="key">線段的縮放</b>：將 $A$、$B$ 兩點分別縮放 $k$ 倍得到對應點 $A&#39;$、$B&#39;$，連接 $\\overline{A&#39;B&#39;}$。</p>'+
    '<p><b class="key">角的縮放</b>：將 $A$、$B$、$C$ 三點縮放後連接 $\\overrightarrow{B&#39;A&#39;}$、$\\overrightarrow{B&#39;C&#39;}$。</p>'+
    '<p><b class="key">三角形的縮放</b>：縮放中心可在三角形外部或內部，將各頂點分別縮放 $k$ 倍距離後連成 $\\triangle A&#39;B&#39;C&#39;$。</p>'+
    '<p>結論：若 $\\triangle ABC$ 縮放 $r$ 倍得到 $\\triangle A&#39;B&#39;C&#39;$，則縮放後對應角的角度<b class="key">不變</b>，對應的邊長變成原來的 <b class="key">$r$ 倍</b>。</p>',
    examples:[
      { q:'以 $O$ 為中心把 $\\triangle ABC$ 放大 3 倍，若 $\\overline{OA}=2$，$\\overline{OA&#39;}$ 是多少？若 $\\overline{BC}=5$，$\\overline{B&#39;C&#39;}$ 呢？',
        steps:['$\\overline{OA&#39;}=3\\times 2=6$。','對應邊長 $r$ 倍：$\\overline{B&#39;C&#39;}=15$。'],
        ans:'$6$；$15$' } ] },

  { id:'u50c3', title:'相似多邊形', body:
    '<p>意義：(1) <b class="key">長得很像</b>；(2) <b class="key">經過縮小或放大後的圖形</b>；(3) <b class="key">放大後的角度不變</b>且<b class="key">每一邊放大的倍數相同</b>。</p>'+
    '<p>定義：(1) <b class="key">對應角相等</b>且 (2) <b class="key">對應邊成比例</b>。符號：<b class="key">$\\sim$</b>，讀作「<b class="key">相似於</b>」。</p>'+
    '<p>(1) 兩個圖形中，如果其中一個經過縮放後，會與另一個<b class="key">全等</b>，此時我們就稱這兩個圖形<b class="key">相似</b>。</p>'+
    '<p>(2) 兩個相似的多邊形，對應邊會<b class="key">成比例</b>，對應角會<b class="key">相等</b>。</p>'+
    '<p>(3) 任意兩個正 $n$ 邊形都<b class="key">相似</b>（兩正三角形、兩正方形、兩等腰直角三角形也必相似）。</p>'+
    '<p>(4) 兩個邊數大於 3 的多邊形，如果只有<b class="key">對應邊成比例</b>或<b class="key">對應角相等</b>，則這兩個多邊形<b class="key">不一定</b>相似（例：兩長方形對應角都相等但不一定相似；兩菱形對應邊成比例但不一定相似）。</p>',
    examples:[
      { q:'任兩個正方形一定相似嗎？任兩個長方形呢？',
        steps:['正方形：角全 90°、四邊等長 → 對應角相等且邊成比例 → 一定相似。','長方形：角相等但長寬比可能不同 → 不一定。'],
        ans:'正方形一定；長方形不一定' } ] },

  { id:'u50c4', title:'三角形的相似性質（AA、SAS、SSS）', body:
    '<p>(1) <b class="key">AA（AAA）相似性質</b>：若兩個三角形的兩組（三組）<b class="key">對應角</b>相等，則這兩個三角形相似。</p>'+
    '<div class="inline-ex">例：$\\triangle ABC$ 與 $\\triangle DEF$ 中，若 $\\angle A=\\angle D$、$\\angle B=\\angle E$，則 $\\triangle ABC\\sim\\triangle DEF$。</div>'+
    '<p>(2) <b class="key">SAS 相似性質</b>：若兩個三角形有一組<b class="key">對應角</b>相等，且夾此等角的兩組<b class="key">對應邊</b>成比例，則這兩個三角形相似。</p>'+
    '<div class="inline-ex">例：若 $\\angle A=\\angle D$，$\\dfrac{\\overline{AB}}{\\overline{DE}}=\\dfrac{\\overline{AC}}{\\overline{DF}}$，則 $\\triangle ABC\\sim\\triangle DEF$。</div>'+
    '<p>(3) <b class="key">SSS 相似性質</b>：若兩個三角形的三組<b class="key">對應邊</b>成比例，則這兩個三角形相似。</p>'+
    '<div class="inline-ex">例：若 $\\dfrac{\\overline{AB}}{\\overline{DE}}=\\dfrac{\\overline{BC}}{\\overline{EF}}=\\dfrac{\\overline{AC}}{\\overline{DF}}$，則 $\\triangle ABC\\sim\\triangle DEF$。</div>',
    examples:[
      { q:'兩三角形三邊分別為 3、4、5 與 6、8、10，相似嗎？依據？',
        steps:['$\\dfrac{3}{6}=\\dfrac{4}{8}=\\dfrac{5}{10}=\\dfrac{1}{2}$。','三邊成比例 → SSS 相似。'],
        ans:'相似（SSS）' },
      { q:'$\\triangle ABC\\sim\\triangle DEF$，$\\overline{AB}=4$、$\\overline{DE}=10$、$\\overline{BC}=6$，求 $\\overline{EF}$。',
        steps:['相似比 $=4:10=2:5$。','$\\overline{EF}=6\\times\\dfrac{5}{2}=15$。'],
        ans:'$15$' } ] }
]},

{ id:'u51', book:5, sec:'1-3', title:'相似三角形的應用', page:87, concepts:[
  { id:'u51c1', title:'簡易測量與對應線段、面積關係', body:
    '<p>1、<b class="key">簡易測量</b>：利用相似三角形<b class="key">對應邊成比例</b>的性質，可以進行簡易測量（影子量塔高等）。</p>'+
    '<p>2、相似三角形的對應線段與面積關係：</p>'+
    '<p>(1) 對應邊的比＝對應<b class="key">高</b>的比＝對應<b class="key">角平分線</b>的比＝對應<b class="key">中線</b>的比。</p>'+
    '<p>(2) 面積的比＝對應<b class="key">邊長平方</b>比。</p>',
    examples:[
      { q:'身高 1.6 公尺的人影長 2 公尺，同時刻樹影長 15 公尺，樹多高？',
        steps:['相似三角形：$\\dfrac{樹高}{15}=\\dfrac{1.6}{2}$。','樹高 $=15\\times 0.8=12$ 公尺。'],
        ans:'12 公尺' },
      { q:'兩相似三角形相似比 $2:3$，面積比是多少？小三角形面積 20，大的呢？',
        steps:['面積比＝邊長平方比 $=4:9$。','$20\\times\\dfrac{9}{4}=45$。'],
        ans:'$4:9$；$45$' } ] },

  { id:'u51c2', title:'直角三角形的相似關係（母子相似）', body:
    '<p>直角 $\\triangle ABC$ 中，$\\angle BAC=90^\\circ$，$\\overline{AD}\\perp\\overline{BC}$ 於 $D$ 點，則：</p>'+
    '<p>(1) <b class="key">$\\triangle ABC\\sim\\triangle DBA\\sim\\triangle DAC$</b>。</p>'+
    '<p>(2) <b class="key">$\\overline{AB}^2=\\overline{BD}\\times\\overline{BC}$</b>。</p>'+
    '<p>(3) <b class="key">$\\overline{AC}^2=\\overline{CD}\\times\\overline{BC}$</b>。</p>'+
    '<p>(4) <b class="key">$\\overline{AD}^2=\\overline{BD}\\times\\overline{CD}$</b>。</p>',
    examples:[
      { q:'直角三角形斜邊被高分成 $\\overline{BD}=4$、$\\overline{DC}=9$，求斜邊上的高 $\\overline{AD}$。',
        steps:['母子相似：$\\overline{AD}^2=\\overline{BD}\\times\\overline{CD}=36$。','$\\overline{AD}=6$。'],
        ans:'$6$' },
      { q:'承上，求股 $\\overline{AB}$。',
        steps:['$\\overline{AB}^2=\\overline{BD}\\times\\overline{BC}=4\\times 13=52$。','$\\overline{AB}=2\\sqrt{13}$。'],
        ans:'$2\\sqrt{13}$' } ] },

  { id:'u51c3', title:'多邊形各邊中點連線性質', body:
    '<p>(1) 三角形三邊中點連線性質：$\\triangle ABC$ 中，$D$、$E$、$F$ 分別為三邊中點，則：① $\\triangle DEF\\sim\\triangle ABC$；② $\\triangle DEF$ 周長 $=\\dfrac{1}{2}\\triangle ABC$ 周長；③ $\\triangle DEF$ 面積 $=\\dfrac{1}{4}\\triangle ABC$ 面積。</p>'+
    '<p>(2) 四邊形四邊中點連線性質：四邊形 $ABCD$ 中，$E$、$F$、$G$、$H$ 為各邊中點，$\\overline{AC}$、$\\overline{DB}$ 為對角線，則：① 四邊形 $EFGH$ 是<b class="key">平行四邊形</b>；② 四邊形 $EFGH$ 周長 $=\\overline{DB}+\\overline{AC}$；③ 四邊形 $EFGH$ 面積 $=\\dfrac{1}{2}\\times$ 四邊形 $ABCD$ 面積。</p>',
    examples:[
      { q:'$\\triangle ABC$ 周長 36、面積 48，其三邊中點構成的 $\\triangle DEF$ 周長與面積？',
        steps:['周長減半：18。','面積四分之一：12。'],
        ans:'周長 18；面積 12' } ] }
]},

{ id:'u52', book:5, sec:'2-1', title:'點、直線、圓的關係', page:88, concepts:[
  { id:'u52c1', title:'點與圓、直線與圓的位置關係', body:
    '<p>1、點與圓的位置關係（$r$ 為半徑）：點在<b class="key">圓內</b>：$\\overline{OP}<r$；點在<b class="key">圓上</b>：$\\overline{OP}=r$；點在<b class="key">圓外</b>：$\\overline{OP}>r$。</p>'+
    '<p>2、直線與圓的位置關係（$\\overline{OP}$ 為圓心到直線的距離）：</p>'+
    '<p>・<b class="key">不相交</b>：交點 <b class="key">0</b> 個，$\\overline{OP}>r$。</p>'+
    '<p>・<b class="key">割線</b>：交點 <b class="key">2</b> 個，$\\overline{OP}<r$。</p>'+
    '<p>・<b class="key">切線</b>：交點 <b class="key">1</b> 個，$\\overline{OP}=r$（切線 ⊥ 過切點的半徑）。</p>',
    examples:[
      { q:'圓半徑 5，圓心到直線 $L$ 的距離為 5、到直線 $M$ 的距離為 3，$L$、$M$ 各與圓什麼關係？',
        steps:['$L$：距離 $=r$ → 切線（1 交點）。','$M$：距離 $<r$ → 割線（2 交點）。'],
        ans:'$L$ 切線；$M$ 割線' } ] },

  { id:'u52c2', title:'圓的切線段長性質', body:
    '<p>設 $P$ 為圓 $O$ 外一點，$\\overline{PA}$、$\\overline{PB}$ 分別切圓 $O$ 於 $A$、$B$ 兩點，則：</p>'+
    '<p>(1) <b class="key">$\\overline{PA}=\\overline{PB}$</b>（切線段等長）。</p>'+
    '<p>(2) $\\overline{PO}$ <b class="key">平分</b> $\\angle APB$。</p>'+
    '<p>(3) $\\overline{PO}$ <b class="key">垂直平分</b> $\\overline{AB}$。</p>',
    examples:[
      { q:'$P$ 到圓心 $O$ 距離 13，圓半徑 5，求切線段 $\\overline{PA}$。',
        steps:['切線垂直半徑 → 直角三角形 $OAP$。','$\\overline{PA}=\\sqrt{13^2-5^2}=12$。'],
        ans:'$12$' } ] },

  { id:'u52c3', title:'圓外切四邊形', body:
    '<p>四邊形 $ABCD$ 的四邊分別與圓 $O$ 相切，稱四邊形 $ABCD$ 為圓 $O$ 的<b class="key">外切四邊形</b>，且稱圓 $O$ 為四邊形 $ABCD$ 的<b class="key">內切圓</b>。</p>'+
    '<p>若一個四邊形為圓 $O$ 的外切四邊形，則此四邊形<b class="key">兩組對邊的和會相等</b>：$\\overline{AD}+\\overline{BC}=\\overline{AB}+\\overline{CD}$。</p>',
    examples:[
      { q:'圓外切四邊形三邊依序為 7、9、12，求第四邊。',
        steps:['對邊和相等：$7+12=9+x$。','$x=10$。'],
        ans:'$10$' } ] },

  { id:'u52c4', title:'弦的性質與弦心距', body:
    '<p>5、弦的性質：</p>'+
    '<p>(1) 過圓心且與弦垂直的直線，必<b class="key">平分</b>此弦。</p>'+
    '<p>(2) 過圓心且平分弦的直線，必<b class="key">垂直</b>此弦。</p>'+
    '<p>(3) 一弦的垂直平分線必通過其所在圓的<b class="key">圓心</b>。</p>'+
    '<p>6、<b class="key">弦心距</b>的性質：圓心到弦的距離稱為此弦的<b class="key">弦心距</b>。在同一圓中：</p>'+
    '<p>(1) 若兩弦不等長，則愈長的弦，其弦心距愈<b class="key">短</b>；愈短的弦，其弦心距愈<b class="key">長</b>。</p>'+
    '<p>(2) 若兩弦等長，則其弦心距<b class="key">相等</b>；若兩弦的弦心距相等，則此兩弦<b class="key">等長</b>。</p>',
    examples:[
      { q:'半徑 10 的圓中，一弦的弦心距為 6，求弦長。',
        steps:['半徑、弦心距、半弦構成直角三角形。','半弦 $=\\sqrt{10^2-6^2}=8$ → 弦長 16。'],
        ans:'$16$' } ] },

  { id:'u52c5', title:'兩圓的位置關係與公切線數量', body:
    '<p>連接兩圓圓心的直線稱為<b class="key">連心線</b>，$\\overline{O_1O_2}$ 稱為<b class="key">連心線段長</b>。設 $r_1>r_2$：</p>'+
    '<p>・<b class="key">外離</b>：無交點；公切線 外 2、內 2、共 <b class="key">4</b>；$\\overline{O_1O_2}>r_1+r_2$。</p>'+
    '<p>・<b class="key">外切</b>：交於 1 點；外 2、內 1、共 <b class="key">3</b>；$\\overline{O_1O_2}=r_1+r_2$。</p>'+
    '<p>・<b class="key">相交於兩點</b>：交於 2 點；外 2、內 0、共 <b class="key">2</b>；$r_1-r_2<\\overline{O_1O_2}<r_1+r_2$。</p>'+
    '<p>・<b class="key">內切</b>：交於 1 點；外 1、內 0、共 <b class="key">1</b>；$\\overline{O_1O_2}=r_1-r_2$。</p>'+
    '<p>・<b class="key">內離</b>：無交點；共 <b class="key">0</b>；$0<\\overline{O_1O_2}<r_1-r_2$。</p>'+
    '<p>補充（兩圓外切，$A$、$B$、$C$ 為外、內公切線切點，$M$ 為內公切線上交點）：(1) $\\overline{MA}=\\overline{MB}=\\overline{MC}$；(2) 切線與弦的角度各為半弧；(3) $\\angle ABC=90^\\circ$，即 $\\triangle ABC$ 必為直角三角形。</p>',
    examples:[
      { q:'兩圓半徑 7、3，圓心距 10、4、12 時各是什麼位置關係？',
        steps:['$10=7+3$ → 外切。','$4=7-3$ → 內切。','$12>10$ → 外離。'],
        ans:'外切／內切／外離' },
      { q:'半徑 8、5 的兩圓相交於兩點，圓心距 $d$ 的範圍？',
        steps:['$r_1-r_2<d<r_1+r_2$。','$3<d<13$。'],
        ans:'$3<d<13$' } ] },

  { id:'u52c6', title:'公切線段長', body:
    '<p>8、<b class="key">公切線</b>：若某直線同時是兩圓的切線，我們稱它為兩圓的<b class="key">公切線</b>。</p>'+
    '<p>(1) <b class="key">外公切線段長</b>：$\\overline{AB}=\\sqrt{\\overline{O_1O_2}^2-(r_1-r_2)^2}$。</p>'+
    '<p>(2) <b class="key">內公切線段長</b>：$\\overline{AB}=\\sqrt{\\overline{O_1O_2}^2-(r_1+r_2)^2}$。</p>',
    examples:[
      { q:'兩圓半徑 6、2，圓心距 10，求外公切線段長與內公切線段長。',
        steps:['外：$\\sqrt{10^2-(6-2)^2}=\\sqrt{84}=2\\sqrt{21}$。','內：$\\sqrt{10^2-(6+2)^2}=\\sqrt{36}=6$。'],
        ans:'外 $2\\sqrt{21}$；內 $6$' } ] }
]},

{ id:'u53', book:5, sec:'2-2', title:'圓心角、圓周角與弦切角', page:91, concepts:[
  { id:'u53c1', title:'圓心角與弧的度數', body:
    '<p>(0) <b class="key">優弧與劣弧</b>：圓上的 $A$、$B$ 兩點將圓周分成兩個弧，小於半圓的弧稱為<b class="key">劣弧</b>，以 $\\overset{\\frown}{AB}$ 表示；大於半圓的弧稱為<b class="key">優弧</b>，通常會在弧上加一點 $C$，以 $\\overset{\\frown}{ACB}$ 表示。</p>'+
    '<p>(1) <b class="key">圓心角</b>：<b class="key">頂點在圓心上的角</b>。(2) 圓心角的度數＝<b class="key">其所夾 $\\overset{\\frown}{AB}$ 的度數</b>。(3) 弧的度數：圓上一弧的度數就是它所對<b class="key">圓心角</b>的度數。(4) 弧的長度：圓周長 $\\times\\dfrac{x^\\circ}{360^\\circ}$。</p>'+
    '<p>(6)【等圓心角對等弧】在同圓或等圓中，度數相等的兩弧<b class="key">等長</b>。(7)【等圓心角對等弦】兩圓心角相等 ⇔ 所對的弦等長。(8)【等弦對等弧】兩弧度數相等 ⇔ 所對的弦等長。</p>',
    examples:[
      { q:'半徑 9 的圓中，$120^\\circ$ 的弧長是多少？',
        steps:['圓周長 $=18\\pi$。','弧長 $=18\\pi\\times\\dfrac{120}{360}=6\\pi$。'],
        ans:'$6\\pi$' } ] },

  { id:'u53c2', title:'圓周角的度數', body:
    '<p>(1) <b class="key">圓周角</b>：<b class="key">頂點在圓周上的角</b>。</p>'+
    '<p>(2) 圓周角的度數＝<b class="key">其所夾弧度數的一半</b>，也等於<b class="key">所對圓心角的一半</b>。</p>'+
    '<p>(3) 直徑或半圓所對的圓周角必為<b class="key">直角</b>。</p>'+
    '<p>(4)【<b class="key">平行線截等弧</b>】若兩條直線平行，則此兩條平行線在圓上所截出的兩弧度數<b class="key">相等</b>（$\\overset{\\frown}{AC}=\\overset{\\frown}{BD}$）。</p>',
    examples:[
      { q:'同一弧所對的圓心角為 $84^\\circ$，圓周角是多少？',
        steps:['圓周角＝圓心角的一半。','$42^\\circ$。'],
        ans:'$42^\\circ$' },
      { q:'$\\overline{AB}$ 是直徑，$C$ 在圓上且 $\\angle CAB=35^\\circ$，求 $\\angle ABC$。',
        steps:['直徑所對圓周角 $\\angle ACB=90^\\circ$。','$\\angle ABC=180-90-35=55^\\circ$。'],
        ans:'$55^\\circ$' } ] },

  { id:'u53c3', title:'圓內接四邊形與弦切角', body:
    '<p>3、圓內接四邊形：(1) 四邊形 $ABCD$ 稱為圓 $O$ 的<b class="key">內接四邊形</b>，圓 $O$ 稱為四邊形 $ABCD$ 的<b class="key">外接圓</b>。(2) 圓內接四邊形的<b class="key">對角互補</b>：$\\angle A+\\angle C=180^\\circ$、$\\angle B+\\angle D=180^\\circ$。(3)【判別】對角互補的四邊形有<b class="key">外接圓</b>。</p>'+
    '<p>4、弦切角：(1) <b class="key">弦切角</b>：<b class="key">弦與切線所夾的角</b>。(2) 弦切角的度數等於<b class="key">其所夾弧度數的一半</b>：$\\angle BAC=\\dfrac{1}{2}\\overset{\\frown}{AB}$。</p>',
    examples:[
      { q:'圓內接四邊形 $ABCD$ 中 $\\angle A=95^\\circ$、$\\angle B=80^\\circ$，求 $\\angle C$、$\\angle D$。',
        steps:['對角互補：$\\angle C=180-95=85^\\circ$。','$\\angle D=180-80=100^\\circ$。'],
        ans:'$\\angle C=85^\\circ$、$\\angle D=100^\\circ$' },
      { q:'切線與弦所夾的弦切角為 $65^\\circ$，其所夾的弧是幾度？',
        steps:['弦切角＝所夾弧的一半。','弧 $=130^\\circ$。'],
        ans:'$130^\\circ$' } ] },

  { id:'u53c4', title:'圓內角、圓外角與圓冪性質', body:
    '<p>5、<b class="key">圓內角</b>：<b class="key">頂點在圓內的角</b>，度數等於<b class="key">（大弧＋小弧）的一半</b>：$\\angle APC=\\dfrac{1}{2}(\\overset{\\frown}{AC}+\\overset{\\frown}{BD})$。</p>'+
    '<p>6、<b class="key">圓外角</b>：<b class="key">頂點在圓外的角</b>，度數等於<b class="key">（大弧－小弧）的一半</b>：$\\angle P=\\dfrac{1}{2}(\\overset{\\frown}{AB}-\\overset{\\frown}{CD})$。</p>'+
    '<p>7、<b class="key">圓冪性質</b>：</p>'+
    '<p>(1) <b class="key">內冪</b>：兩弦 $\\overline{AB}$、$\\overline{CD}$ 相交於圓內 $P$ 點，則 $\\overline{PA}\\times\\overline{PB}=\\overline{PC}\\times\\overline{PD}$。</p>'+
    '<p>(2) <b class="key">外冪</b>：兩弦延長線於圓外相交於 $P$，則 $\\overline{PA}\\times\\overline{PB}=\\overline{PC}\\times\\overline{PD}$。</p>'+
    '<p>(3) <b class="key">切割線性質</b>：$\\overline{PA}$ 切圓於 $A$，割線交圓於 $C$、$D$，則 $\\overline{PA}^2=\\overline{PC}\\times\\overline{PD}$。</p>',
    examples:[
      { q:'兩弦交於圓內 $P$，$\\overline{PA}=4$、$\\overline{PB}=6$、$\\overline{PC}=3$，求 $\\overline{PD}$。',
        steps:['內冪：$4\\times 6=3\\times\\overline{PD}$。','$\\overline{PD}=8$。'],
        ans:'$8$' },
      { q:'$\\overline{PA}$ 切圓於 $A$，割線交圓於 $C$、$D$，$\\overline{PC}=4$、$\\overline{CD}=5$，求 $\\overline{PA}$。',
        steps:['$\\overline{PD}=4+5=9$。','$\\overline{PA}^2=4\\times 9=36$ → $\\overline{PA}=6$。'],
        ans:'$6$' } ] }
]},

{ id:'u54', book:5, sec:'3-1', title:'推理證明', page:93, concepts:[
  { id:'u54c1', title:'推理與證明的格式', body:
    '<p>1、推理與證明：(1) 將「題目所給的條件」寫在<b class="key">已知</b>；(2) 將「要說明的結論」寫在<b class="key">求證</b>；(3) 將「推導或說明的過程」寫在<b class="key">證明</b>。</p>'+
    '<p>2、思路分析與證明：推理證明的思考與分析，可先從「<b class="key">結論</b>」推論到「<b class="key">題目所給的條件</b>」；但在寫作推理的過程中，則是依據分析的結果，由「<b class="key">題目所給的條件</b>」逐步推理至「<b class="key">結論</b>」。</p>',
    examples:[
      { q:'要證「等腰三角形兩底角相等」，已知、求證各寫什麼？',
        steps:['已知：$\\triangle ABC$ 中 $\\overline{AB}=\\overline{AC}$。','求證：$\\angle B=\\angle C$。'],
        ans:'已知 $\\overline{AB}=\\overline{AC}$；求證 $\\angle B=\\angle C$' } ] },

  { id:'u54c2', title:'代數證明', body:
    '<p>(1) 偶數都可以表示成 <b class="key">$2n$</b> 的形式，其中 $n$ 為整數。</p>'+
    '<p>(2) 奇數都可以表示成 <b class="key">$2n+1$</b> 的形式，其中 $n$ 為整數。</p>',
    examples:[
      { q:'證明：兩個奇數的和必為偶數。',
        steps:['設兩奇數為 $2m+1$、$2n+1$（$m,n$ 為整數）。','和 $=2m+2n+2=2(m+n+1)$，是 2 的倍數。'],
        ans:'和可寫成 $2k$ 形式 → 偶數' } ] },

  { id:'u54c3', title:'幾何證明與輔助線', body:
    '<p>4、幾何證明常用性質：</p>'+
    '<p>(1) 梯形兩腰中點連線性質：(a) 梯形兩腰中點連線與兩底<b class="key">平行</b>；(b) 梯形兩腰中點的連線段長等於<b class="key">兩底和的一半</b>。</p>'+
    '<p>(2) 三角形內分比性質：$\\angle BAC$ 的角平分線與 $\\overline{BC}$ 交於 $D$，則 $\\overline{AB}:\\overline{AC}=\\overline{BD}:\\overline{DC}$。</p>'+
    '<p>5、<b class="key">輔助線</b>：(1) 幾何推理進行中，有時需要在原圖形上添加一些<b class="key">線條</b>或<b class="key">圖形</b>，協助進行推理證明或計算，這種添加的線條或圖形就稱為<b class="key">輔助線</b>；(2) 不同的思路會產生不同的輔助線畫法與證法。</p>'+
    '<p>6、四邊形四邊中點連線性質：四邊形各邊中點連線所形成的四邊形是<b class="key">平行四邊形</b>，其周長為原四邊形<b class="key">兩對角線</b>的和。</p>',
    examples:[
      { q:'梯形上底 8、下底 14，兩腰中點連線多長？',
        steps:['兩底和的一半。','$(8+14)\\div 2=11$。'],
        ans:'$11$' },
      { q:'四邊形兩對角線長 10、16，其四邊中點連成的四邊形周長是多少？',
        steps:['中點四邊形周長＝兩對角線的和。','$10+16=26$。'],
        ans:'$26$' } ] }
]},

{ id:'u55', book:5, sec:'3-2', title:'外心、內心、重心', page:94, concepts:[
  { id:'u55c1', title:'三角形的外心', body:
    '<p>① 三角形<b class="key">外心</b>的符號：<b class="key">$O$</b>（Outer）。</p>'+
    '<p>② 三角形<b class="key">外接圓</b>的<b class="key">圓心</b>（圓 $O$ 稱為 $\\triangle ABC$ 的<b class="key">外接圓</b>，$\\triangle ABC$ 稱為圓 $O$ 的<b class="key">內接三角形</b>）。</p>'+
    '<p>③ 外心到三角形<b class="key">三頂點等距離</b>（＝<b class="key">半徑 $R$</b>）。</p>'+
    '<p>④ 外心是三角形三邊<b class="key">中垂線</b>的<b class="key">交點</b>。</p>'+
    '<p>⑤ 外心的位置：&lt;1&gt; 銳角三角形：<b class="key">在 △ 內部</b>；&lt;2&gt; 鈍角三角形：<b class="key">在 △ 外部</b>；&lt;3&gt; 直角三角形：<b class="key">在斜邊中點</b>。</p>'+
    '<p>⑥ 公式：<b class="key">$\\angle BOC=2\\angle A$</b>（銳角三角形）$=360^\\circ-2\\angle A$（鈍角三角形）。</p>'+
    '<p>多邊形的外心：如果一個多邊形各邊的<b class="key">中垂線</b>交於同一點，此點稱為多邊形的<b class="key">外心</b>，外心到<b class="key">各頂點</b>的距離相等，且此多邊形有<b class="key">外接圓</b>。</p>',
    examples:[
      { q:'直角三角形兩股 6、8，外接圓半徑是多少？',
        steps:['斜邊 $=10$，直角三角形外心在斜邊中點。','$R=10\\div 2=5$。'],
        ans:'$5$' },
      { q:'銳角 $\\triangle ABC$ 的外心 $O$，$\\angle A=50^\\circ$，求 $\\angle BOC$。',
        steps:['$\\angle BOC=2\\angle A$。','$=100^\\circ$。'],
        ans:'$100^\\circ$' } ] },

  { id:'u55c2', title:'三角形的內心', body:
    '<p>① 三角形<b class="key">內心</b>的符號：<b class="key">$I$</b>（Inner）。</p>'+
    '<p>② 三角形<b class="key">內切圓</b>的<b class="key">圓心</b>（圓 $I$ 稱為 $\\triangle ABC$ 的<b class="key">內切圓</b>，$\\triangle ABC$ 稱為圓 $I$ 的<b class="key">外切三角形</b>）。</p>'+
    '<p>③ 內心到三角形<b class="key">三邊等距離</b>（＝<b class="key">半徑 $r$</b>）。</p>'+
    '<p>④ 三角形<b class="key">三角平分線</b>的<b class="key">交點</b>。</p>'+
    '<p>⑤ 位置：內心在三角形<b class="key">內部</b>。</p>'+
    '<p>⑥ 公式：(1) $\\triangle ABC$ 面積 $=S\\times r$（$S=\\dfrac{a+b+c}{2}$ 周長的一半、$r$＝內切圓半徑）；(2) <b class="key">直角三角形：$a+b=c+2r$</b>（兩股和＝斜邊長＋2 倍內切圓半徑）；(3) $\\angle BIC=90^\\circ+\\dfrac{1}{2}\\angle A$。</p>'+
    '<p>【三角形內心與面積】若 $I$ 為內心，則 $\\triangle AIB:\\triangle BIC:\\triangle CIA=\\overline{AB}:\\overline{BC}:\\overline{CA}$。</p>'+
    '<p>多邊形的內心：各內角的<b class="key">角平分線</b>交於同一點時，此點為多邊形的<b class="key">內心</b>，到<b class="key">各邊</b>距離相等，有<b class="key">內切圓</b>；內切圓半徑 $r$、周長 $S$ 時面積 $=\\dfrac{1}{2}\\times S\\times r$。</p>',
    examples:[
      { q:'直角三角形兩股 6、8、斜邊 10，求內切圓半徑。',
        steps:['$a+b=c+2r$ → $6+8=10+2r$。','$r=2$。'],
        ans:'$r=2$' },
      { q:'$\\triangle ABC$ 中 $\\angle A=70^\\circ$，$I$ 為內心，求 $\\angle BIC$。',
        steps:['$\\angle BIC=90^\\circ+\\dfrac{1}{2}\\times 70^\\circ$。','$=125^\\circ$。'],
        ans:'$125^\\circ$' } ] },

  { id:'u55c3', title:'三角形的重心', body:
    '<p>(1) 三角形<b class="key">重心</b>的符號：<b class="key">$G$</b>。</p>'+
    '<p>(2) 三角形<b class="key">重量中心</b>（質量中心、幾何中心）。</p>'+
    '<p>(3) 三角形<b class="key">三中線</b>的<b class="key">交點</b>（<b class="key">中線</b>：<b class="key">頂點</b>和<b class="key">對邊中點</b>連線）。</p>'+
    '<p>(4) 三中線將原三角形分成 <b class="key">6 塊等面積</b>小三角形。</p>'+
    '<p>(5) 中線<b class="key">長度比 $2:1$</b>：$\\overline{AG}:\\overline{GD}=\\overline{BG}:\\overline{GE}=\\overline{CG}:\\overline{GF}=2:1$。</p>'+
    '<p>(6) 位置：重心在三角形<b class="key">內部</b>。</p>',
    examples:[
      { q:'中線 $\\overline{AD}=12$，重心 $G$ 把它分成幾比幾？$\\overline{AG}$ 多長？',
        steps:['$\\overline{AG}:\\overline{GD}=2:1$。','$\\overline{AG}=12\\times\\dfrac{2}{3}=8$。'],
        ans:'$2:1$；$\\overline{AG}=8$' },
      { q:'$\\triangle ABC$ 面積 36，重心與三頂點連線分成的 6 小塊，每塊面積多少？',
        steps:['三中線分成 6 塊等面積。','$36\\div 6=6$。'],
        ans:'$6$' } ] },

  { id:'u55c4', title:'正多邊形三心合一、垂心與尤拉線', body:
    '<p>(1) 正三角形的重心、外心與內心是<b class="key">同一點</b>；(2) 正多邊形的外心、內心與重心是<b class="key">同一點</b>。</p>'+
    '<p><b class="key">垂心</b>：三角形的三個<b class="key">高</b>或其延長線交於一點，此交點稱為三角形的<b class="key">垂心</b>，通常以 <b class="key">$H$</b> 表示。銳角三角形的垂心位於三角形<b class="key">內部</b>；直角三角形的垂心即為<b class="key">直角的頂點</b>；鈍角三角形的垂心位於三角形<b class="key">外部</b>。</p>'+
    '<p><b class="key">尤拉線</b>：瑞士數學家暨物理學家尤拉（Leonhard Euler，1707–1783）證明了在任意三角形中，垂心（$H$）、外心（$O$）、重心（$G$）<b class="key">三點共線</b>，通過這三點的直線稱為<b class="key">尤拉線</b>，且重心到外心的距離是重心到垂心距離的<b class="key">一半</b>。</p>',
    examples:[
      { q:'直角三角形的垂心在哪裡？外心在哪裡？',
        steps:['垂心＝直角頂點。','外心＝斜邊中點。'],
        ans:'直角頂點；斜邊中點' },
      { q:'尤拉線上 $\\overline{GH}=6$，求 $\\overline{GO}$。',
        steps:['重心到外心是重心到垂心的一半。','$\\overline{GO}=3$。'],
        ans:'$3$' } ] }
]}

];

/* 目次骨架：尚未轉錄的單元（轉錄完成後逐一搬進上方陣列） */
var MATH_UNITS_TODO = [
  {id:'u56',book:6,sec:'1-1',title:'二次函數的圖形',page:98},
  {id:'u57',book:6,sec:'1-2',title:'配方法與二次函數的極值',page:101},
  {id:'u58',book:6,sec:'1-3',title:'二次函數的應用',page:103},
  {id:'u59',book:6,sec:'2-1',title:'角柱與圓柱',page:103},
  {id:'u60',book:6,sec:'2-2',title:'角錐與圓錐',page:105},
  {id:'u61',book:6,sec:'3-1',title:'次數分配與資料展示',page:108},
  {id:'u62',book:6,sec:'3-2',title:'資料的分析',page:113},
  {id:'u63',book:6,sec:'3-3',title:'機率',page:116}
];
