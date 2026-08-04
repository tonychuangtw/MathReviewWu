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
]}

];

/* 目次骨架：尚未轉錄的單元（轉錄完成後逐一搬進上方陣列） */
var MATH_UNITS_TODO = [
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
